const { z } = require('zod');

const createPlanSchema = z.object({
    name: z
        .string({ required_error: 'Plan name is required' })
        .trim()
        .min(1)
        .max(200),
    price: z
        .number({ required_error: 'Price is required' })
        .min(0, 'Price must be non-negative'),
    billingPeriod: z.enum(['daily', 'weekly', 'monthly', 'yearly'], {
        required_error: 'Billing period is required',
    }),
    minQuantity: z.number().int().min(1).default(1),
    startDate: z.string({ required_error: 'Start date is required' }),
    endDate: z.string().nullable().default(null),
    options: z
        .object({
            autoClose: z.boolean().default(false),
            closable: z.boolean().default(true),
            pausable: z.boolean().default(true),
            renewable: z.boolean().default(true),
        })
        .default({}),
});

const updatePlanSchema = createPlanSchema.partial();

module.exports = { createPlanSchema, updatePlanSchema };
