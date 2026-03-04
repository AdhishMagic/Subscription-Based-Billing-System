const { z } = require('zod');

const createTaxSchema = z.object({
    name: z
        .string({ required_error: 'Tax name is required' })
        .trim()
        .min(1)
        .max(200),
    type: z.enum(['VAT', 'Sales Tax', 'Service Tax', 'Custom'], {
        required_error: 'Tax type is required',
    }),
    rate: z
        .number({ required_error: 'Tax rate is required' })
        .min(0),
    appliesTo: z.enum(['all', 'products', 'subscriptions']).default('all'),
    status: z.enum(['active', 'inactive', 'scheduled']).default('active'),
    effectiveDate: z.string({ required_error: 'Effective date is required' }),
});

const updateTaxSchema = createTaxSchema.partial();

module.exports = { createTaxSchema, updateTaxSchema };
