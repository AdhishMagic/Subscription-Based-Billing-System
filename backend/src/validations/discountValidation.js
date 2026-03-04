const { z } = require('zod');

const createDiscountSchema = z.object({
    name: z
        .string({ required_error: 'Discount name is required' })
        .trim()
        .min(1)
        .max(200),
    type: z.enum(['percentage', 'fixed'], {
        required_error: 'Discount type is required',
    }),
    value: z
        .number({ required_error: 'Discount value is required' })
        .min(0),
    minPurchaseAmount: z.number().min(0).default(0),
    minQuantity: z.number().int().min(0).default(0),
    startDate: z.string({ required_error: 'Start date is required' }),
    endDate: z.string({ required_error: 'End date is required' }),
    usageLimit: z.number().int().min(1).nullable().default(null),
    appliesTo: z.array(z.string()).default([]),
    status: z
        .enum(['active', 'inactive', 'scheduled', 'expired', 'limit_reached'])
        .default('active'),
});

const updateDiscountSchema = createDiscountSchema.partial();

module.exports = { createDiscountSchema, updateDiscountSchema };
