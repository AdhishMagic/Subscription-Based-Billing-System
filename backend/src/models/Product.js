const mongoose = require('mongoose');
const { PRODUCT_TYPES } = require('../utils/constants');

const variantSchema = new mongoose.Schema(
    {
        attribute: { type: String, required: true, trim: true },
        value: { type: String, required: true, trim: true },
        extraPrice: { type: Number, default: 0, min: 0 },
    },
    { _id: true }
);

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Product name is required'],
            trim: true,
            maxlength: 200,
        },
        type: {
            type: String,
            enum: Object.values(PRODUCT_TYPES),
            required: [true, 'Product type is required'],
        },
        salesPrice: {
            type: Number,
            required: [true, 'Sales price is required'],
            min: 0,
        },
        costPrice: {
            type: Number,
            default: 0,
            min: 0,
        },
        isRecurring: {
            type: Boolean,
            default: false,
        },
        variants: [variantSchema],
    },
    {
        timestamps: true,
    }
);

// ── Indexes ─────────────────────────────────────────────────────────────────
productSchema.index({ name: 'text' });
productSchema.index({ type: 1 });

module.exports = mongoose.model('Product', productSchema);
