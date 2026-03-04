const { z } = require('zod');

const registerSchema = z.object({
    name: z
        .string({ required_error: 'Name is required' })
        .trim()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name must not exceed 100 characters'),
    email: z
        .string({ required_error: 'Email is required' })
        .email('Invalid email format')
        .trim()
        .toLowerCase(),
    password: z
        .string({ required_error: 'Password is required' })
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain an uppercase letter')
        .regex(/[a-z]/, 'Password must contain a lowercase letter')
        .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/, 'Password must contain a special character'),
    role: z.enum(['admin', 'internal', 'portal']).optional(),
});

const loginSchema = z.object({
    email: z
        .string({ required_error: 'Email is required' })
        .email('Invalid email format')
        .trim()
        .toLowerCase(),
    password: z
        .string({ required_error: 'Password is required' })
        .min(1, 'Password is required'),
});

const refreshTokenSchema = z.object({
    refreshToken: z.string({ required_error: 'Refresh token is required' }),
});

module.exports = { registerSchema, loginSchema, refreshTokenSchema };
