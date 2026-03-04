const productService = require('../services/productService');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess, sendCreated, sendPaginated } = require('../utils/response');

const getAll = asyncHandler(async (req, res) => {
    const result = await productService.getAll(req.query);
    sendPaginated(res, result);
});

const getById = asyncHandler(async (req, res) => {
    const product = await productService.getById(req.params.id);
    sendSuccess(res, product);
});

const create = asyncHandler(async (req, res) => {
    const product = await productService.create(req.body);
    sendCreated(res, product, 'Product created');
});

const update = asyncHandler(async (req, res) => {
    const product = await productService.update(req.params.id, req.body);
    sendSuccess(res, product, 'Product updated');
});

const remove = asyncHandler(async (req, res) => {
    await productService.delete(req.params.id);
    sendSuccess(res, null, 'Product deleted');
});

module.exports = { getAll, getById, create, update, remove };
