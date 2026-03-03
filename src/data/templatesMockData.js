/* ==========================================================================
   QUOTATION TEMPLATES MOCK DATA
   Predefined subscription blueprints for standardizing recurring setups.
   Templates reference products and plans to ensure pricing consistency.

   Template Fields:
   - Template Name
   - Validity Days
   - Recurring Plan (references plansMockData)
   - Product Lines (references AVAILABLE_PRODUCTS from subscriptions)
   ========================================================================== */

import { calculateTotals } from '../utils/math';

/**
 * Calculate financial breakdown for all product lines.
 * @param {Array} productLines
 * @param {number} taxRate
 * @returns {{ subtotal: number, totalTax: number, total: number }}
 */
export const calcTemplateTotals = (productLines, taxRate = 18) => {
    return calculateTotals(productLines, taxRate);
};

// ── Mock Templates ──────────────────────────────────────────────────────────

export const templatesMockData = [
    {
        id: 'tmpl_001',
        name: 'Starter Monthly Plan',
        validityDays: 30,
        recurringPlanId: 'plan_001',
        recurringPlanName: 'Starter Monthly',
        productLines: [
            {
                id: 'pline_001',
                productId: 'prod_002',
                productName: 'Cloud Storage Unlimited',
                quantity: 1,
                unitPrice: 49.99,
                taxRate: 18,
            },
            {
                id: 'pline_002',
                productId: 'prod_004',
                productName: 'Premium Support Package',
                quantity: 1,
                unitPrice: 19.00,
                taxRate: 18,
            },
        ],
        createdAt: '2026-01-15T10:00:00Z',
    },
    {
        id: 'tmpl_002',
        name: 'Pro Development Bundle',
        validityDays: 30,
        recurringPlanId: 'plan_005',
        recurringPlanName: 'Pro Monthly',
        productLines: [
            {
                id: 'pline_003',
                productId: 'prod_001',
                productName: 'ViaTunnel Pro Suite',
                quantity: 5,
                unitPrice: 299.99,
                taxRate: 18,
            },
            {
                id: 'pline_004',
                productId: 'prod_015',
                productName: 'CI/CD Pipeline Pro',
                quantity: 5,
                unitPrice: 199.00,
                taxRate: 18,
            },
            {
                id: 'pline_005',
                productId: 'prod_021',
                productName: 'Monitoring Dashboard',
                quantity: 5,
                unitPrice: 159.00,
                taxRate: 18,
            },
        ],
        createdAt: '2026-01-20T14:30:00Z',
    },
    {
        id: 'tmpl_003',
        name: 'Enterprise Security Suite',
        validityDays: 365,
        recurringPlanId: 'plan_015',
        recurringPlanName: 'Corporate Yearly',
        productLines: [
            {
                id: 'pline_006',
                productId: 'prod_001',
                productName: 'ViaTunnel Pro Suite',
                quantity: 50,
                unitPrice: 299.99,
                taxRate: 18,
            },
            {
                id: 'pline_007',
                productId: 'prod_019',
                productName: 'VPN Gateway',
                quantity: 25,
                unitPrice: 89.00,
                taxRate: 18,
            },
            {
                id: 'pline_008',
                productId: 'prod_023',
                productName: 'DDoS Protection Add-on',
                quantity: 10,
                unitPrice: 149.00,
                taxRate: 18,
            },
            {
                id: 'pline_009',
                productId: 'prod_022',
                productName: 'Backup & Recovery Service',
                quantity: 25,
                unitPrice: 249.00,
                taxRate: 18,
            },
        ],
        createdAt: '2026-02-01T09:15:00Z',
    },
    {
        id: 'tmpl_004',
        name: 'Marketing Growth Pack',
        validityDays: 90,
        recurringPlanId: 'plan_009',
        recurringPlanName: 'Team Monthly',
        productLines: [
            {
                id: 'pline_010',
                productId: 'prod_008',
                productName: 'Email Marketing Suite',
                quantity: 10,
                unitPrice: 129.00,
                taxRate: 12,
            },
            {
                id: 'pline_011',
                productId: 'prod_010',
                productName: 'Data Analytics Platform',
                quantity: 5,
                unitPrice: 449.00,
                taxRate: 12,
            },
        ],
        createdAt: '2026-02-10T11:45:00Z',
    },
    {
        id: 'tmpl_005',
        name: 'Infrastructure Essentials',
        validityDays: 365,
        recurringPlanId: 'plan_006',
        recurringPlanName: 'Scale Yearly',
        productLines: [
            {
                id: 'pline_012',
                productId: 'prod_002',
                productName: 'Cloud Storage Unlimited',
                quantity: 20,
                unitPrice: 49.99,
                taxRate: 18,
            },
            {
                id: 'pline_013',
                productId: 'prod_009',
                productName: 'CDN Bandwidth Pack',
                quantity: 15,
                unitPrice: 59.00,
                taxRate: 18,
            },
            {
                id: 'pline_014',
                productId: 'prod_005',
                productName: 'SSL Certificate',
                quantity: 20,
                unitPrice: 79.00,
                taxRate: 8,
            },
            {
                id: 'pline_015',
                productId: 'prod_016',
                productName: 'Log Management Add-on',
                quantity: 10,
                unitPrice: 39.00,
                taxRate: 18,
            },
        ],
        createdAt: '2026-02-15T08:30:00Z',
    },
    {
        id: 'tmpl_006',
        name: 'Basic Support Add-on',
        validityDays: 30,
        recurringPlanId: 'plan_001',
        recurringPlanName: 'Starter Monthly',
        productLines: [
            {
                id: 'pline_016',
                productId: 'prod_004',
                productName: 'Premium Support Package',
                quantity: 1,
                unitPrice: 199.00,
                taxRate: 18,
            },
        ],
        createdAt: '2026-02-20T16:00:00Z',
    },
    {
        id: 'tmpl_007',
        name: 'Full Stack Annual',
        validityDays: 365,
        recurringPlanId: 'plan_011',
        recurringPlanName: 'Growth Annual',
        productLines: [
            {
                id: 'pline_017',
                productId: 'prod_001',
                productName: 'ViaTunnel Pro Suite',
                quantity: 25,
                unitPrice: 299.99,
                taxRate: 18,
            },
            {
                id: 'pline_018',
                productId: 'prod_004',
                productName: 'Premium Support Package',
                quantity: 25,
                unitPrice: 199.00,
                taxRate: 18,
            },
            {
                id: 'pline_019',
                productId: 'prod_015',
                productName: 'CI/CD Pipeline Pro',
                quantity: 25,
                unitPrice: 199.00,
                taxRate: 18,
            },
            {
                id: 'pline_020',
                productId: 'prod_010',
                productName: 'Data Analytics Platform',
                quantity: 10,
                unitPrice: 449.00,
                taxRate: 18,
            },
            {
                id: 'pline_021',
                productId: 'prod_022',
                productName: 'Backup & Recovery Service',
                quantity: 15,
                unitPrice: 249.00,
                taxRate: 18,
            },
        ],
        createdAt: '2026-02-25T13:20:00Z',
    },
];

// Re-export for convenience
export { AVAILABLE_PRODUCTS, AVAILABLE_PLANS };
