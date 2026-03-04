const express = require('express');
const router = express.Router();
const reportController = require('../../controllers/reportController');
const { authenticate, authorize } = require('../../middlewares/auth');
const { ROLES } = require('../../utils/constants');

router.use(authenticate);

router.get('/dashboard', authorize(ROLES.ADMIN, ROLES.INTERNAL), reportController.getDashboardStats);
router.get('/revenue', authorize(ROLES.ADMIN, ROLES.INTERNAL), reportController.getRevenueReport);
router.get('/subscriptions', authorize(ROLES.ADMIN, ROLES.INTERNAL), reportController.getSubscriptionReport);
router.get('/churn', authorize(ROLES.ADMIN, ROLES.INTERNAL), reportController.getChurnReport);
router.get('/export/:type', authorize(ROLES.ADMIN, ROLES.INTERNAL), reportController.exportReport);

module.exports = router;
