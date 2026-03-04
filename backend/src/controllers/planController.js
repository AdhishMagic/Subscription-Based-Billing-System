const planService = require('../services/planService');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess, sendCreated, sendPaginated } = require('../utils/response');

const getAll = asyncHandler(async (req, res) => {
    const result = await planService.getAll(req.query);
    sendPaginated(res, result);
});

const getById = asyncHandler(async (req, res) => {
    const plan = await planService.getById(req.params.id);
    sendSuccess(res, plan);
});

const create = asyncHandler(async (req, res) => {
    const plan = await planService.create(req.body);
    sendCreated(res, plan, 'Plan created');
});

const update = asyncHandler(async (req, res) => {
    const plan = await planService.update(req.params.id, req.body);
    sendSuccess(res, plan, 'Plan updated');
});

const remove = asyncHandler(async (req, res) => {
    await planService.delete(req.params.id);
    sendSuccess(res, null, 'Plan deleted');
});

module.exports = { getAll, getById, create, update, remove };
