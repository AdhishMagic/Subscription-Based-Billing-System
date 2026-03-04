const express = require('express');
const router = express.Router();
const discountController = require('../../controllers/discountController');
const { authenticate, authorize } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { createDiscountSchema, updateDiscountSchema } = require('../../validations/discountValidation');
const { ROLES } = require('../../utils/constants');

router.use(authenticate);

router.get('/', authorize(ROLES.ADMIN), discountController.getAll);
router.get('/:id', authorize(ROLES.ADMIN), discountController.getById);
router.post('/', authorize(ROLES.ADMIN), validate(createDiscountSchema), discountController.create);
router.put('/:id', authorize(ROLES.ADMIN), validate(updateDiscountSchema), discountController.update);
router.delete('/:id', authorize(ROLES.ADMIN), discountController.remove);

module.exports = router;
