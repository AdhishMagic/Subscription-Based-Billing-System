const { z } = require('zod');

const orderLineSchema = z.object({
    productId: z.string({ required_error: 'Product ID is required' }),
    productName: z.string({ required_error: 'Product name is required' }),
    quantity: z.number().int().min(1, 'Quantity must be at least 1'),
    unitPrice: z.number().min(0, 'Unit price must be non-negative'),
    taxRate: z.number().min(0).default(0),
});

const createSubscriptionSchema = z.object({
    customerId: z.string({ required_error: 'Customer ID is required' }),
    customerName: z.string({ required_error: 'Customer name is required' }),
    planId: z.string({ required_error: 'Plan ID is required' }),
    planName: z.string({ required_error: 'Plan name is required' }),
    startDate: z.string({ required_error: 'Start date is required' }),
    expirationDate: z.string({ required_error: 'Expiration date is required' }),
    paymentTerms: z.string().default('net-30'),
    orderLines: z.array(orderLineSchema).min(1, 'At least one order line is required'),
});

const updateSubscriptionSchema = createSubscriptionSchema.partial();

module.exports = { createSubscriptionSchema, updateSubscriptionSchema };
