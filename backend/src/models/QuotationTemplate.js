const mongoose = require('mongoose');

const templateLineSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        productName: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        unitPrice: { type: Number, required: true, min: 0 },
        taxRate: { type: Number, default: 0, min: 0 },
    },
    { _id: true }
);

const quotationTemplateSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Template name is required'],
            trim: true,
            maxlength: 200,
        },
        validityDays: {
            type: Number,
            required: true,
            min: 1,
        },
        recurringPlanId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Plan',
            required: true,
        },
        recurringPlanName: { type: String, required: true },
        productLines: [templateLineSchema],
    },
    {
        timestamps: true,
    }
);

// ── Indexes ─────────────────────────────────────────────────────────────────
quotationTemplateSchema.index({ name: 'text' });

module.exports = mongoose.model('QuotationTemplate', quotationTemplateSchema);
