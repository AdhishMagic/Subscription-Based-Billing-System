const express = require('express');
const router = express.Router();
const customerController = require('../../controllers/customerController');
const { authenticate, authorize } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { createCustomerSchema, updateCustomerSchema } = require('../../validations/customerValidation');
const { ROLES } = require('../../utils/constants');

router.use(authenticate);

router.get('/', authorize(ROLES.ADMIN, ROLES.INTERNAL), customerController.getAll);
router.get('/:id', authorize(ROLES.ADMIN, ROLES.INTERNAL, ROLES.PORTAL), customerController.getById);
router.post('/', authorize(ROLES.ADMIN, ROLES.INTERNAL), validate(createCustomerSchema), customerController.create);
router.put('/:id', authorize(ROLES.ADMIN, ROLES.INTERNAL), validate(updateCustomerSchema), customerController.update);
router.delete('/:id', authorize(ROLES.ADMIN), customerController.remove);

module.exports = router;
