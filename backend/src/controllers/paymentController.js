const paymentService = require('../services/paymentService');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess, sendCreated, sendPaginated } = require('../utils/response');

const getAll = asyncHandler(async (req, res) => {
    const result = await paymentService.getAll(req.query);
    sendPaginated(res, result);
});

const getById = asyncHandler(async (req, res) => {
    const payment = await paymentService.getById(req.params.id);
    sendSuccess(res, payment);
});

const create = asyncHandler(async (req, res) => {
    const payment = await paymentService.create(req.body);
    sendCreated(res, payment, 'Payment recorded');
});

const refund = asyncHandler(async (req, res) => {
    const payment = await paymentService.refund(req.params.id);
    sendSuccess(res, payment, 'Payment refunded');
});

module.exports = { getAll, getById, create, refund };
