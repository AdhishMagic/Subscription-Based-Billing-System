const { ZodError } = require('zod');
const AppError = require('../utils/AppError');
const logger = require('../utils/logger');

/**
 * Centralized error handling middleware.
 * Must be the last middleware registered in Express.
 */
const errorHandler = (err, req, res, next) => {
    // Zod validation errors
    if (err instanceof ZodError) {
        const errors = err.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
        }));
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors,
        });
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map((e) => ({
            field: e.path,
            message: e.message,
        }));
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors,
        });
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue).join(', ');
        return res.status(409).json({
            success: false,
            message: `Duplicate value for: ${field}`,
        });
    }

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        return res.status(400).json({
            success: false,
            message: `Invalid ${err.path}: ${err.value}`,
        });
    }

    // Custom operational errors
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors,
        });
    }

    // Unexpected errors
    logger.error(err);
    return res.status(500).json({
        success: false,
        message:
            process.env.NODE_ENV === 'development'
                ? err.message
                : 'Internal server error',
    });
};

module.exports = errorHandler;
