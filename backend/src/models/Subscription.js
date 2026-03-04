const mongoose = require('mongoose');
const { SUBSCRIPTION_STATUS } = require('../utils/constants');

const orderLineSchema = new mongoose.Schema(
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

const activitySchema = new mongoose.Schema(
    {
        action: { type: String, required: true },
        user: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
    },
    { _id: true }
);

const subscriptionSchema = new mongoose.Schema(
    {
        subscriptionNumber: {
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
        planId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Plan',
            required: [true, 'Plan is required'],
        },
        planName: { type: String, required: true },
        status: {
            type: String,
            enum: Object.values(SUBSCRIPTION_STATUS),
            default: SUBSCRIPTION_STATUS.DRAFT,
        },
        startDate: {
            type: Date,
            required: [true, 'Start date is required'],
        },
        expirationDate: {
            type: Date,
            required: [true, 'Expiration date is required'],
        },
        paymentTerms: {
            type: String,
            default: 'net-30',
        },
        orderLines: [orderLineSchema],
        activity: [activitySchema],
    },
    {
        timestamps: true,
    }
);

// ── Indexes ─────────────────────────────────────────────────────────────────
subscriptionSchema.index({ subscriptionNumber: 1 });
subscriptionSchema.index({ customerId: 1 });
subscriptionSchema.index({ status: 1 });
subscriptionSchema.index({ customerId: 1, status: 1 });

module.exports = mongoose.model('Subscription', subscriptionSchema);
