const express = require('express');
const router = express.Router();
const planController = require('../../controllers/planController');
const { authenticate, authorize } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { createPlanSchema, updatePlanSchema } = require('../../validations/planValidation');
const { ROLES } = require('../../utils/constants');

router.use(authenticate);

router.get('/', authorize(ROLES.ADMIN, ROLES.INTERNAL), planController.getAll);
router.get('/:id', authorize(ROLES.ADMIN, ROLES.INTERNAL), planController.getById);
router.post('/', authorize(ROLES.ADMIN, ROLES.INTERNAL), validate(createPlanSchema), planController.create);
router.put('/:id', authorize(ROLES.ADMIN, ROLES.INTERNAL), validate(updatePlanSchema), planController.update);
router.delete('/:id', authorize(ROLES.ADMIN), planController.remove);

module.exports = router;
