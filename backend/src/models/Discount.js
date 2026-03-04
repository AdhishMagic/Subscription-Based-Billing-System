const mongoose = require('mongoose');
const { DISCOUNT_TYPES } = require('../utils/constants');

const discountSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Discount name is required'],
            trim: true,
            maxlength: 200,
        },
        type: {
            type: String,
            enum: Object.values(DISCOUNT_TYPES),
            required: [true, 'Discount type is required'],
        },
        value: {
            type: Number,
            required: [true, 'Discount value is required'],
            min: 0,
        },
        minPurchaseAmount: { type: Number, default: 0, min: 0 },
        minQuantity: { type: Number, default: 0, min: 0 },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        usageLimit: { type: Number, default: null },
        usageCount: { type: Number, default: 0 },
        appliesTo: {
            type: [String],
            default: [],
        },
        status: {
            type: String,
            enum: ['active', 'inactive', 'scheduled', 'expired', 'limit_reached'],
            default: 'active',
        },
    },
    {
        timestamps: true,
    }
);

// ── Indexes ─────────────────────────────────────────────────────────────────
discountSchema.index({ status: 1 });

module.exports = mongoose.model('Discount', discountSchema);
