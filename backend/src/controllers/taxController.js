const taxService = require('../services/taxService');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess, sendCreated, sendPaginated } = require('../utils/response');

const getAll = asyncHandler(async (req, res) => {
    const result = await taxService.getAll(req.query);
    sendPaginated(res, result);
});

const getById = asyncHandler(async (req, res) => {
    const tax = await taxService.getById(req.params.id);
    sendSuccess(res, tax);
});

const create = asyncHandler(async (req, res) => {
    const tax = await taxService.create(req.body);
    sendCreated(res, tax, 'Tax created');
});

const update = asyncHandler(async (req, res) => {
    const tax = await taxService.update(req.params.id, req.body);
    sendSuccess(res, tax, 'Tax updated');
});

const remove = asyncHandler(async (req, res) => {
    await taxService.delete(req.params.id);
    sendSuccess(res, null, 'Tax deleted');
});

module.exports = { getAll, getById, create, update, remove };
