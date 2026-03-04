const discountService = require('../services/discountService');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess, sendCreated, sendPaginated } = require('../utils/response');

const getAll = asyncHandler(async (req, res) => {
    const result = await discountService.getAll(req.query);
    sendPaginated(res, result);
});

const getById = asyncHandler(async (req, res) => {
    const discount = await discountService.getById(req.params.id);
    sendSuccess(res, discount);
});

const create = asyncHandler(async (req, res) => {
    const discount = await discountService.create(req.body);
    sendCreated(res, discount, 'Discount created');
});

const update = asyncHandler(async (req, res) => {
    const discount = await discountService.update(req.params.id, req.body);
    sendSuccess(res, discount, 'Discount updated');
});

const remove = asyncHandler(async (req, res) => {
    await discountService.delete(req.params.id);
    sendSuccess(res, null, 'Discount deleted');
});

module.exports = { getAll, getById, create, update, remove };
