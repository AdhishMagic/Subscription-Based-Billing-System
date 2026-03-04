const { z } = require('zod');

const variantSchema = z.object({
    attribute: z.string().trim().min(1, 'Attribute is required'),
    value: z.string().trim().min(1, 'Value is required'),
    extraPrice: z.number().min(0).default(0),
});

const createProductSchema = z.object({
    name: z
        .string({ required_error: 'Product name is required' })
        .trim()
        .min(1)
        .max(200),
    type: z.enum(['saas', 'service', 'license', 'addon', 'hardware', 'consulting'], {
        required_error: 'Product type is required',
    }),
    salesPrice: z
        .number({ required_error: 'Sales price is required' })
        .min(0, 'Sales price must be non-negative'),
    costPrice: z.number().min(0).default(0),
    isRecurring: z.boolean().default(false),
    variants: z.array(variantSchema).default([]),
});

const updateProductSchema = createProductSchema.partial();

module.exports = { createProductSchema, updateProductSchema };
