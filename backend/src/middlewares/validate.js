const AppError = require('../utils/AppError');

/**
 * Zod validation middleware factory.
 * @param {import('zod').ZodSchema} schema - Zod schema to validate against.
 * @param {'body'|'query'|'params'} source - Request property to validate.
 */
const validate = (schema, source = 'body') => {
    return (req, res, next) => {
        const result = schema.safeParse(req[source]);
        if (!result.success) {
            return next(result.error); // Will be caught by errorHandler as ZodError
        }
        req[source] = result.data; // Replace with parsed/transformed data
        next();
    };
};

module.exports = validate;
