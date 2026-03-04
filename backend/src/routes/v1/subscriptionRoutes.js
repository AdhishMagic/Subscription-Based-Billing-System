const express = require('express');
const router = express.Router();
const subscriptionController = require('../../controllers/subscriptionController');
const { authenticate, authorize } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { createSubscriptionSchema, updateSubscriptionSchema } = require('../../validations/subscriptionValidation');
const { ROLES } = require('../../utils/constants');

router.use(authenticate);

router.get('/', authorize(ROLES.ADMIN, ROLES.INTERNAL, ROLES.PORTAL), subscriptionController.getAll);
router.get('/:id', authorize(ROLES.ADMIN, ROLES.INTERNAL, ROLES.PORTAL), subscriptionController.getById);
router.post('/', authorize(ROLES.ADMIN, ROLES.INTERNAL, ROLES.PORTAL), validate(createSubscriptionSchema), subscriptionController.create);
router.put('/:id', authorize(ROLES.ADMIN, ROLES.INTERNAL), validate(updateSubscriptionSchema), subscriptionController.update);
router.delete('/:id', authorize(ROLES.ADMIN), subscriptionController.remove);

router.patch('/:id/pause', authorize(ROLES.ADMIN, ROLES.INTERNAL), subscriptionController.pause);
router.patch('/:id/resume', authorize(ROLES.ADMIN, ROLES.INTERNAL), subscriptionController.resume);
router.patch('/:id/cancel', authorize(ROLES.ADMIN, ROLES.INTERNAL), subscriptionController.cancel);
router.patch('/:id/transition', authorize(ROLES.ADMIN, ROLES.INTERNAL), subscriptionController.transition);

module.exports = router;
