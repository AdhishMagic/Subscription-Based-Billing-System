const quotationTemplateService = require('../services/quotationTemplateService');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess, sendCreated, sendPaginated } = require('../utils/response');

const getAll = asyncHandler(async (req, res) => {
    const result = await quotationTemplateService.getAll(req.query);
    sendPaginated(res, result);
});

const getById = asyncHandler(async (req, res) => {
    const template = await quotationTemplateService.getById(req.params.id);
    sendSuccess(res, template);
});

const create = asyncHandler(async (req, res) => {
    const template = await quotationTemplateService.create(req.body);
    sendCreated(res, template, 'Template created');
});

const update = asyncHandler(async (req, res) => {
    const template = await quotationTemplateService.update(req.params.id, req.body);
    sendSuccess(res, template, 'Template updated');
});

const remove = asyncHandler(async (req, res) => {
    await quotationTemplateService.delete(req.params.id);
    sendSuccess(res, null, 'Template deleted');
});

module.exports = { getAll, getById, create, update, remove };
