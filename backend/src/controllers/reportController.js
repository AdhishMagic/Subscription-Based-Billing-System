const reportService = require('../services/reportService');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/response');

const getDashboardStats = asyncHandler(async (req, res) => {
    const stats = await reportService.getDashboardStats();
    sendSuccess(res, stats);
});

const getRevenueReport = asyncHandler(async (req, res) => {
    const report = await reportService.getRevenueReport(req.query);
    sendSuccess(res, report);
});

const getSubscriptionReport = asyncHandler(async (req, res) => {
    const report = await reportService.getSubscriptionReport();
    sendSuccess(res, report);
});

const getChurnReport = asyncHandler(async (req, res) => {
    // Placeholder for churn analytics
    sendSuccess(res, { message: 'Churn report — coming soon' });
});

const exportReport = asyncHandler(async (req, res) => {
    // Placeholder for CSV/PDF export
    sendSuccess(res, { message: 'Export — coming soon' });
});

module.exports = {
    getDashboardStats,
    getRevenueReport,
    getSubscriptionReport,
    getChurnReport,
    exportReport,
};
