const mongoose = require('mongoose');
const { INVOICE_STATUS } = require('../utils/constants');
const { round, calculateTax } = require('../utils/math');

const invoiceLineSchema = new mongoose.Schema(
    {
        description: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        unitPrice: { type: Number, required: true, min: 0 },
    },
    { _id: true }
);

const invoiceSchema = new mongoose.Schema(
    {
        invoiceNumber: {
            type: String,
            required: true,
            unique: true,
        },
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
            required: [true, 'Customer is required'],
        },
        customerName: { type: String, required: true },
        customerEmail: { type: String, default: '' },
        customerAddress: { type: String, default: '' },
        issueDate: { type: Date, required: true },
        dueDate: { type: Date, required: true },
        status: {
            type: String,
            enum: Object.values(INVOICE_STATUS),
            default: INVOICE_STATUS.DRAFT,
        },
        currency: { type: String, default: 'USD' },
        taxRate: { type: Number, default: 0, min: 0 },
        lines: [invoiceLineSchema],
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// ── Virtuals ────────────────────────────────────────────────────────────────
invoiceSchema.virtual('subtotal').get(function () {
    return round(
        this.lines.reduce((sum, line) => sum + line.quantity * line.unitPrice, 0)
    );
});

invoiceSchema.virtual('taxAmount').get(function () {
    return calculateTax(this.subtotal, this.taxRate);
});

invoiceSchema.virtual('total').get(function () {
    return round(this.subtotal + this.taxAmount);
});

// ── Indexes ─────────────────────────────────────────────────────────────────
invoiceSchema.index({ invoiceNumber: 1 });
invoiceSchema.index({ customerId: 1 });
invoiceSchema.index({ status: 1 });
invoiceSchema.index({ customerId: 1, status: 1 });

module.exports = mongoose.model('Invoice', invoiceSchema);
