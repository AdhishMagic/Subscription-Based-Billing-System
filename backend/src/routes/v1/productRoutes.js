const express = require('express');
const router = express.Router();
const productController = require('../../controllers/productController');
const { authenticate, authorize } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { createProductSchema, updateProductSchema } = require('../../validations/productValidation');
const { ROLES } = require('../../utils/constants');

router.use(authenticate);

router.get('/', authorize(ROLES.ADMIN, ROLES.INTERNAL), productController.getAll);
router.get('/:id', authorize(ROLES.ADMIN, ROLES.INTERNAL), productController.getById);
router.post('/', authorize(ROLES.ADMIN, ROLES.INTERNAL), validate(createProductSchema), productController.create);
router.put('/:id', authorize(ROLES.ADMIN, ROLES.INTERNAL), validate(updateProductSchema), productController.update);
router.delete('/:id', authorize(ROLES.ADMIN), productController.remove);

module.exports = router;
