const { z } = require('zod');

const templateLineSchema = z.object({
    productId: z.string({ required_error: 'Product ID is required' }),
    productName: z.string({ required_error: 'Product name is required' }),
    quantity: z.number().int().min(1, 'Quantity must be at least 1'),
    unitPrice: z.number().min(0),
    taxRate: z.number().min(0).default(0),
});

const createTemplateSchema = z.object({
    name: z
        .string({ required_error: 'Template name is required' })
        .trim()
        .min(1)
        .max(200),
    validityDays: z
        .number({ required_error: 'Validity days is required' })
        .int()
        .min(1),
    recurringPlanId: z.string({ required_error: 'Recurring plan ID is required' }),
    recurringPlanName: z.string({ required_error: 'Recurring plan name is required' }),
    productLines: z.array(templateLineSchema).min(1, 'At least one product line is required'),
});

const updateTemplateSchema = createTemplateSchema.partial();

module.exports = { createTemplateSchema, updateTemplateSchema };
