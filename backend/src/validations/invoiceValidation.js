const { z } = require('zod');

const invoiceLineSchema = z.object({
    description: z.string({ required_error: 'Description is required' }),
    quantity: z.number().int().min(1, 'Quantity must be at least 1'),
    unitPrice: z.number().min(0, 'Unit price must be non-negative'),
});

const createInvoiceSchema = z.object({
    customerId: z.string({ required_error: 'Customer ID is required' }),
    customerName: z.string({ required_error: 'Customer name is required' }),
    customerEmail: z.string().email().optional().default(''),
    customerAddress: z.string().optional().default(''),
    issueDate: z.string({ required_error: 'Issue date is required' }),
    dueDate: z.string({ required_error: 'Due date is required' }),
    currency: z.string().default('USD'),
    taxRate: z.number().min(0).default(0),
    lines: z.array(invoiceLineSchema).min(1, 'At least one line item is required'),
});

const updateInvoiceSchema = createInvoiceSchema.partial();

module.exports = { createInvoiceSchema, updateInvoiceSchema };
