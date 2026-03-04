const customerService = require('../services/customerService');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess, sendCreated, sendPaginated } = require('../utils/response');

const getAll = asyncHandler(async (req, res) => {
    const result = await customerService.getAll(req.query);
    sendPaginated(res, result);
});

const getById = asyncHandler(async (req, res) => {
    const customer = await customerService.getById(req.params.id);
    sendSuccess(res, customer);
});

const create = asyncHandler(async (req, res) => {
    const customer = await customerService.create(req.body);
    sendCreated(res, customer, 'Customer created');
});

const update = asyncHandler(async (req, res) => {
    const customer = await customerService.update(req.params.id, req.body);
    sendSuccess(res, customer, 'Customer updated');
});

const remove = asyncHandler(async (req, res) => {
    await customerService.delete(req.params.id);
    sendSuccess(res, null, 'Customer deleted');
});

module.exports = { getAll, getById, create, update, remove };
