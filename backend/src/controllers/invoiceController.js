const invoiceService = require('../services/invoiceService');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess, sendCreated, sendPaginated } = require('../utils/response');

const getAll = asyncHandler(async (req, res) => {
    const result = await invoiceService.getAll(req.query);
    sendPaginated(res, result);
});

const getById = asyncHandler(async (req, res) => {
    const invoice = await invoiceService.getById(req.params.id);
    sendSuccess(res, invoice);
});

const create = asyncHandler(async (req, res) => {
    const invoice = await invoiceService.create(req.body);
    sendCreated(res, invoice, 'Invoice created');
});

const update = asyncHandler(async (req, res) => {
    const invoice = await invoiceService.update(req.params.id, req.body);
    sendSuccess(res, invoice, 'Invoice updated');
});

const remove = asyncHandler(async (req, res) => {
    await invoiceService.delete(req.params.id);
    sendSuccess(res, null, 'Invoice deleted');
});

const send = asyncHandler(async (req, res) => {
    const invoice = await invoiceService.send(req.params.id);
    sendSuccess(res, invoice, 'Invoice sent');
});

const markPaid = asyncHandler(async (req, res) => {
    const invoice = await invoiceService.markPaid(req.params.id);
    sendSuccess(res, invoice, 'Invoice marked as paid');
});

module.exports = { getAll, getById, create, update, remove, send, markPaid };
