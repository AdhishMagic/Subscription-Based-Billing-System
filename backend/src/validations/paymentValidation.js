const { z } = require('zod');

const createPaymentSchema = z.object({
    invoiceId: z.string({ required_error: 'Invoice ID is required' }),
    customerId: z.string({ required_error: 'Customer ID is required' }),
    customerName: z.string({ required_error: 'Customer name is required' }),
    method: z.string({ required_error: 'Payment method is required' }).trim().min(1),
    amount: z.number({ required_error: 'Amount is required' }).min(0),
    date: z.string().optional(),
    status: z.enum(['pending', 'completed', 'failed', 'refunded']).optional(),
    reference: z.string().optional(),
});

module.exports = { createPaymentSchema };
