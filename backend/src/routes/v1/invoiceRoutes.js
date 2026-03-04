const express = require('express');
const router = express.Router();
const invoiceController = require('../../controllers/invoiceController');
const { authenticate, authorize } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { createInvoiceSchema, updateInvoiceSchema } = require('../../validations/invoiceValidation');
const { ROLES } = require('../../utils/constants');

router.use(authenticate);

router.get('/', authorize(ROLES.ADMIN, ROLES.INTERNAL, ROLES.PORTAL), invoiceController.getAll);
router.get('/:id', authorize(ROLES.ADMIN, ROLES.INTERNAL, ROLES.PORTAL), invoiceController.getById);
router.post('/', authorize(ROLES.ADMIN, ROLES.INTERNAL), validate(createInvoiceSchema), invoiceController.create);
router.put('/:id', authorize(ROLES.ADMIN, ROLES.INTERNAL), validate(updateInvoiceSchema), invoiceController.update);
router.delete('/:id', authorize(ROLES.ADMIN), invoiceController.remove);

router.post('/:id/send', authorize(ROLES.ADMIN, ROLES.INTERNAL), invoiceController.send);
router.patch('/:id/mark-paid', authorize(ROLES.ADMIN, ROLES.INTERNAL), invoiceController.markPaid);

module.exports = router;
