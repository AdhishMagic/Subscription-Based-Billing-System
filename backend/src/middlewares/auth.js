const authService = require('../services/authService');
const AppError = require('../utils/AppError');

/**
 * Authenticate JWT access token from Authorization header.
 */
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(AppError.unauthorized('No token provided'));
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = authService.verifyAccessToken(token);
        req.user = decoded;
        next();
    } catch (err) {
        return next(AppError.unauthorized('Invalid or expired token'));
    }
};

/**
 * Role-based authorization middleware factory.
 * @param  {...string} allowedRoles - Roles permitted to access the route.
 */
const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return next(AppError.forbidden('Insufficient permissions'));
        }
        next();
    };
};

module.exports = { authenticate, authorize };
