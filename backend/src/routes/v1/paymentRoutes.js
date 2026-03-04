const express = require('express');
const router = express.Router();
const paymentController = require('../../controllers/paymentController');
const { authenticate, authorize } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { createPaymentSchema } = require('../../validations/paymentValidation');
const { ROLES } = require('../../utils/constants');

router.use(authenticate);

router.get('/', authorize(ROLES.ADMIN, ROLES.INTERNAL), paymentController.getAll);
router.get('/:id', authorize(ROLES.ADMIN, ROLES.INTERNAL), paymentController.getById);
router.post('/', authorize(ROLES.ADMIN, ROLES.INTERNAL), validate(createPaymentSchema), paymentController.create);
router.post('/:id/refund', authorize(ROLES.ADMIN), paymentController.refund);

module.exports = router;
