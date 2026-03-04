const userRepository = require('./userRepository');
const productRepository = require('./productRepository');
const planRepository = require('./planRepository');
const customerRepository = require('./customerRepository');
const subscriptionRepository = require('./subscriptionRepository');
const invoiceRepository = require('./invoiceRepository');
const paymentRepository = require('./paymentRepository');
const discountRepository = require('./discountRepository');
const taxRepository = require('./taxRepository');
const quotationTemplateRepository = require('./quotationTemplateRepository');

module.exports = {
    userRepository,
    productRepository,
    planRepository,
    customerRepository,
    subscriptionRepository,
    invoiceRepository,
    paymentRepository,
    discountRepository,
    taxRepository,
    quotationTemplateRepository,
};
