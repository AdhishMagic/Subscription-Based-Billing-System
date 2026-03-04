const subscriptionService = require('../services/subscriptionService');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess, sendCreated, sendPaginated } = require('../utils/response');

const getAll = asyncHandler(async (req, res) => {
    const result = await subscriptionService.getAll(req.query);
    sendPaginated(res, result);
});

const getById = asyncHandler(async (req, res) => {
    const subscription = await subscriptionService.getById(req.params.id);
    sendSuccess(res, subscription);
});

const create = asyncHandler(async (req, res) => {
    const userName = req.user?.name || 'System';
    const subscription = await subscriptionService.create(req.body, userName);
    sendCreated(res, subscription, 'Subscription created');
});

const update = asyncHandler(async (req, res) => {
    const subscription = await subscriptionService.update(req.params.id, req.body);
    sendSuccess(res, subscription, 'Subscription updated');
});

const remove = asyncHandler(async (req, res) => {
    await subscriptionService.delete(req.params.id);
    sendSuccess(res, null, 'Subscription deleted');
});

const pause = asyncHandler(async (req, res) => {
    const userName = req.user?.name || 'System';
    const subscription = await subscriptionService.pause(req.params.id, userName);
    sendSuccess(res, subscription, 'Subscription paused');
});

const resume = asyncHandler(async (req, res) => {
    const userName = req.user?.name || 'System';
    const subscription = await subscriptionService.resume(req.params.id, userName);
    sendSuccess(res, subscription, 'Subscription resumed');
});

const cancel = asyncHandler(async (req, res) => {
    const userName = req.user?.name || 'System';
    const subscription = await subscriptionService.cancel(req.params.id, userName);
    sendSuccess(res, subscription, 'Subscription cancelled');
});

const transition = asyncHandler(async (req, res) => {
    const userName = req.user?.name || 'System';
    const subscription = await subscriptionService.transitionStatus(req.params.id, userName);
    sendSuccess(res, subscription, 'Status transitioned');
});

module.exports = { getAll, getById, create, update, remove, pause, resume, cancel, transition };
