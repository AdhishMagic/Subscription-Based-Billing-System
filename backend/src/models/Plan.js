const mongoose = require('mongoose');
const { BILLING_PERIODS } = require('../utils/constants');

const planSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Plan name is required'],
            trim: true,
            maxlength: 200,
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: 0,
        },
        billingPeriod: {
            type: String,
            enum: Object.values(BILLING_PERIODS),
            required: [true, 'Billing period is required'],
        },
        minQuantity: {
            type: Number,
            default: 1,
            min: 1,
        },
        startDate: {
            type: Date,
            required: [true, 'Start date is required'],
        },
        endDate: {
            type: Date,
            default: null,
        },
        options: {
            autoClose: { type: Boolean, default: false },
            closable: { type: Boolean, default: true },
            pausable: { type: Boolean, default: true },
            renewable: { type: Boolean, default: true },
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// ── Virtual: derived status ─────────────────────────────────────────────────
planSchema.virtual('status').get(function () {
    if (!this.endDate) return 'active';
    return new Date(this.endDate) >= new Date() ? 'active' : 'expired';
});

// ── Indexes ─────────────────────────────────────────────────────────────────
planSchema.index({ name: 'text' });
planSchema.index({ billingPeriod: 1 });

module.exports = mongoose.model('Plan', planSchema);
