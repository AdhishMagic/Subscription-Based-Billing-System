const mongoose = require('mongoose');
const { TAX_TYPES } = require('../utils/constants');

const taxSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Tax name is required'],
            trim: true,
            maxlength: 200,
        },
        type: {
            type: String,
            enum: Object.values(TAX_TYPES),
            required: [true, 'Tax type is required'],
        },
        rate: {
            type: Number,
            required: [true, 'Tax rate is required'],
            min: 0,
        },
        appliesTo: {
            type: String,
            enum: ['all', 'products', 'subscriptions'],
            default: 'all',
        },
        status: {
            type: String,
            enum: ['active', 'inactive', 'scheduled'],
            default: 'active',
        },
        effectiveDate: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// ── Indexes ─────────────────────────────────────────────────────────────────
taxSchema.index({ status: 1 });

module.exports = mongoose.model('Tax', taxSchema);
