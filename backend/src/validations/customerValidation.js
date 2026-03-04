const { z } = require('zod');

const createCustomerSchema = z.object({
    name: z
        .string({ required_error: 'Customer name is required' })
        .trim()
        .min(1)
        .max(200),
    email: z
        .string({ required_error: 'Customer email is required' })
        .email('Invalid email format')
        .trim()
        .toLowerCase(),
    address: z.string().trim().optional().default(''),
});

const updateCustomerSchema = createCustomerSchema.partial();

module.exports = { createCustomerSchema, updateCustomerSchema };
