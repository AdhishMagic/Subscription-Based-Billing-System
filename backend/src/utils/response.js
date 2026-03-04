/**
 * Standardised API response helpers.
 */
const sendSuccess = (res, data = null, message = 'Success', statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};

const sendCreated = (res, data = null, message = 'Created') => {
    return sendSuccess(res, data, message, 201);
};

const sendPaginated = (res, { docs, total, page, limit }) => {
    return res.status(200).json({
        success: true,
        message: 'Success',
        data: docs,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    });
};

module.exports = { sendSuccess, sendCreated, sendPaginated };
