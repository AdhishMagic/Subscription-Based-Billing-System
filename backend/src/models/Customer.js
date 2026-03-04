const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Customer name is required'],
            trim: true,
            maxlength: 200,
        },
        email: {
            type: String,
            required: [true, 'Customer email is required'],
            lowercase: true,
            trim: true,
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'],
        },
        address: {
            type: String,
            default: '',
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

// ── Indexes ─────────────────────────────────────────────────────────────────
customerSchema.index({ name: 'text' });
customerSchema.index({ email: 1 });

module.exports = mongoose.model('Customer', customerSchema);
