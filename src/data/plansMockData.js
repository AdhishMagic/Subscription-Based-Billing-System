/* ==========================================================================
   PLANS MOCK DATA
   Realistic recurring plan dataset for development and testing.
   Covers all billing periods, plan options, and date-driven status states.
   ========================================================================== */

export const BILLING_PERIODS = [
    { value: 'daily', label: 'Daily', shortLabel: 'Day' },
    { value: 'weekly', label: 'Weekly', shortLabel: 'Wk' },
    { value: 'monthly', label: 'Monthly', shortLabel: 'Mo' },
    { value: 'yearly', label: 'Yearly', shortLabel: 'Yr' },
];

export const PLAN_STATUSES = [
    { value: 'active', label: 'Active' },
    { value: 'expired', label: 'Expired' },
];

/**
 * Generates a unique plan ID.
 * @returns {string}
 */
export const generatePlanId = () =>
    `plan_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

/**
 * Derives plan status from its end date.
 * @param {string|null} endDate
 * @returns {'active'|'expired'}
 */
export const derivePlanStatus = (endDate) => {
    if (!endDate) return 'active';
    return new Date(endDate) >= new Date() ? 'active' : 'expired';
};

export const plansMockData = [
    {
        id: 'plan_001',
        name: 'Starter Monthly',
        price: 29.99,
        billingPeriod: 'monthly',
        minQuantity: 1,
        startDate: '2025-01-01',
        endDate: null,
        options: {
            autoClose: false,
            closable: true,
            pausable: true,
            renewable: true,
        },
        createdAt: '2025-01-01T08:00:00Z',
    },
    {
        id: 'plan_002',
        name: 'Business Annual',
        price: 299.00,
        billingPeriod: 'yearly',
        minQuantity: 5,
        startDate: '2025-02-01',
        endDate: null,
        options: {
            autoClose: false,
            closable: true,
            pausable: false,
            renewable: true,
        },
        createdAt: '2025-02-01T10:00:00Z',
    },
    {
        id: 'plan_003',
        name: 'Enterprise Weekly',
        price: 149.00,
        billingPeriod: 'weekly',
        minQuantity: 10,
        startDate: '2025-03-01',
        endDate: '2026-03-01',
        options: {
            autoClose: true,
            closable: true,
            pausable: true,
            renewable: true,
        },
        createdAt: '2025-03-01T12:00:00Z',
    },
    {
        id: 'plan_004',
        name: 'Trial Daily',
        price: 0.99,
        billingPeriod: 'daily',
        minQuantity: 1,
        startDate: '2025-04-01',
        endDate: '2025-04-15',
        options: {
            autoClose: true,
            closable: false,
            pausable: false,
            renewable: false,
        },
        createdAt: '2025-04-01T09:00:00Z',
    },
    {
        id: 'plan_005',
        name: 'Pro Monthly',
        price: 79.99,
        billingPeriod: 'monthly',
        minQuantity: 1,
        startDate: '2025-05-01',
        endDate: null,
        options: {
            autoClose: false,
            closable: true,
            pausable: true,
            renewable: true,
        },
        createdAt: '2025-05-01T14:00:00Z',
    },
    {
        id: 'plan_006',
        name: 'Scale Yearly',
        price: 599.00,
        billingPeriod: 'yearly',
        minQuantity: 25,
        startDate: '2025-06-01',
        endDate: '2026-06-01',
        options: {
            autoClose: false,
            closable: true,
            pausable: false,
            renewable: true,
        },
        createdAt: '2025-06-01T11:00:00Z',
    },
    {
        id: 'plan_007',
        name: 'Micro Weekly',
        price: 9.99,
        billingPeriod: 'weekly',
        minQuantity: 1,
        startDate: '2025-07-01',
        endDate: '2025-08-01',
        options: {
            autoClose: true,
            closable: true,
            pausable: false,
            renewable: false,
        },
        createdAt: '2025-07-01T08:30:00Z',
    },
    {
        id: 'plan_008',
        name: 'Premium Daily',
        price: 4.99,
        billingPeriod: 'daily',
        minQuantity: 1,
        startDate: '2025-08-01',
        endDate: null,
        options: {
            autoClose: false,
            closable: true,
            pausable: true,
            renewable: true,
        },
        createdAt: '2025-08-01T10:00:00Z',
    },
    {
        id: 'plan_009',
        name: 'Team Monthly',
        price: 199.00,
        billingPeriod: 'monthly',
        minQuantity: 10,
        startDate: '2025-09-01',
        endDate: null,
        options: {
            autoClose: false,
            closable: true,
            pausable: true,
            renewable: true,
        },
        createdAt: '2025-09-01T15:00:00Z',
    },
    {
        id: 'plan_010',
        name: 'Seasonal Quarterly',
        price: 149.00,
        billingPeriod: 'monthly',
        minQuantity: 3,
        startDate: '2025-10-01',
        endDate: '2025-12-31',
        options: {
            autoClose: true,
            closable: false,
            pausable: false,
            renewable: false,
        },
        createdAt: '2025-10-01T09:00:00Z',
    },
    {
        id: 'plan_011',
        name: 'Growth Annual',
        price: 999.00,
        billingPeriod: 'yearly',
        minQuantity: 50,
        startDate: '2025-11-01',
        endDate: '2026-11-01',
        options: {
            autoClose: false,
            closable: true,
            pausable: true,
            renewable: true,
        },
        createdAt: '2025-11-01T12:00:00Z',
    },
    {
        id: 'plan_012',
        name: 'Budget Weekly',
        price: 4.99,
        billingPeriod: 'weekly',
        minQuantity: 1,
        startDate: '2025-12-01',
        endDate: null,
        options: {
            autoClose: false,
            closable: true,
            pausable: true,
            renewable: true,
        },
        createdAt: '2025-12-01T10:30:00Z',
    },
    {
        id: 'plan_013',
        name: 'Unlimited Monthly',
        price: 499.00,
        billingPeriod: 'monthly',
        minQuantity: 1,
        startDate: '2026-01-01',
        endDate: null,
        options: {
            autoClose: false,
            closable: true,
            pausable: false,
            renewable: true,
        },
        createdAt: '2026-01-01T08:00:00Z',
    },
    {
        id: 'plan_014',
        name: 'Flash Daily',
        price: 1.99,
        billingPeriod: 'daily',
        minQuantity: 1,
        startDate: '2026-02-01',
        endDate: '2026-02-15',
        options: {
            autoClose: true,
            closable: false,
            pausable: false,
            renewable: false,
        },
        createdAt: '2026-02-01T09:00:00Z',
    },
    {
        id: 'plan_015',
        name: 'Corporate Yearly',
        price: 2499.00,
        billingPeriod: 'yearly',
        minQuantity: 100,
        startDate: '2026-01-15',
        endDate: '2027-01-15',
        options: {
            autoClose: false,
            closable: true,
            pausable: true,
            renewable: true,
        },
        createdAt: '2026-01-15T14:00:00Z',
    },
];
