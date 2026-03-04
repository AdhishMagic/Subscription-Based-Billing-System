const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const productRoutes = require('./productRoutes');
const planRoutes = require('./planRoutes');
const customerRoutes = require('./customerRoutes');
const subscriptionRoutes = require('./subscriptionRoutes');
const invoiceRoutes = require('./invoiceRoutes');
const paymentRoutes = require('./paymentRoutes');
const discountRoutes = require('./discountRoutes');
const taxRoutes = require('./taxRoutes');
const quotationTemplateRoutes = require('./quotationTemplateRoutes');
const reportRoutes = require('./reportRoutes');

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/plans', planRoutes);
router.use('/customers', customerRoutes);
router.use('/subscriptions', subscriptionRoutes);
router.use('/invoices', invoiceRoutes);
router.use('/payments', paymentRoutes);
router.use('/discounts', discountRoutes);
router.use('/taxes', taxRoutes);
router.use('/quotation-templates', quotationTemplateRoutes);
router.use('/reports', reportRoutes);

module.exports = router;
