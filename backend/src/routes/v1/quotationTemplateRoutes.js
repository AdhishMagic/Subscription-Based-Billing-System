const express = require('express');
const router = express.Router();
const quotationTemplateController = require('../../controllers/quotationTemplateController');
const { authenticate, authorize } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { createTemplateSchema, updateTemplateSchema } = require('../../validations/quotationTemplateValidation');
const { ROLES } = require('../../utils/constants');

router.use(authenticate);

router.get('/', authorize(ROLES.ADMIN, ROLES.INTERNAL), quotationTemplateController.getAll);
router.get('/:id', authorize(ROLES.ADMIN, ROLES.INTERNAL), quotationTemplateController.getById);
router.post('/', authorize(ROLES.ADMIN, ROLES.INTERNAL), validate(createTemplateSchema), quotationTemplateController.create);
router.put('/:id', authorize(ROLES.ADMIN, ROLES.INTERNAL), validate(updateTemplateSchema), quotationTemplateController.update);
router.delete('/:id', authorize(ROLES.ADMIN), quotationTemplateController.remove);

module.exports = router;
