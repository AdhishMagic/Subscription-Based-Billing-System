const express = require('express');
const router = express.Router();
const taxController = require('../../controllers/taxController');
const { authenticate, authorize } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { createTaxSchema, updateTaxSchema } = require('../../validations/taxValidation');
const { ROLES } = require('../../utils/constants');

router.use(authenticate);

router.get('/', authorize(ROLES.ADMIN), taxController.getAll);
router.get('/:id', authorize(ROLES.ADMIN), taxController.getById);
router.post('/', authorize(ROLES.ADMIN), validate(createTaxSchema), taxController.create);
router.put('/:id', authorize(ROLES.ADMIN), validate(updateTaxSchema), taxController.update);
router.delete('/:id', authorize(ROLES.ADMIN), taxController.remove);

module.exports = router;
