/* ==========================================================================
   SUBSCRIPTIONS MOCK DATA
   Realistic subscription dataset covering all lifecycle states:
   Draft → Quotation → Confirmed → Active → Closed

   Each subscription has order lines with products, quantities, taxes.
   Financial totals are calculated at the UI level.
   ========================================================================== */

// ── Status Constants ────────────────────────────────────────────────────────

export const SUBSCRIPTION_STATUSES = [
    { value: 'draft', label: 'Draft' },
    { value: 'quotation', label: 'Quotation' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'active', label: 'Active' },
    { value: 'closed', label: 'Closed' },
];

export const STATUS_FLOW = ['draft', 'quotation', 'confirmed', 'active', 'closed'];

export const PAYMENT_TERMS_OPTIONS = [
    { value: 'net-15', label: 'Net 15' },
    { value: 'net-30', label: 'Net 30' },
    { value: 'net-45', label: 'Net 45' },
    { value: 'net-60', label: 'Net 60' },
    { value: 'due-on-receipt', label: 'Due on Receipt' },
    { value: 'prepaid', label: 'Prepaid' },
];

export const CUSTOMERS = [
    { id: 'cust_001', name: 'John Enterprises', email: 'john@enterprises.com' },
    { id: 'cust_002', name: 'Acme Corporation', email: 'billing@acmecorp.com' },
    { id: 'cust_003', name: 'TechNova Solutions', email: 'finance@technova.io' },
    { id: 'cust_004', name: 'GlobalSync Ltd', email: 'accounts@globalsync.com' },
    { id: 'cust_005', name: 'Pinnacle Digital', email: 'admin@pinnacledigital.co' },
    { id: 'cust_006', name: 'Vertex Industries', email: 'billing@vertexind.com' },
    { id: 'cust_007', name: 'CloudBridge Inc', email: 'ops@cloudbridge.io' },
    { id: 'cust_008', name: 'NorthStar Media', email: 'finance@northstarmedia.com' },
    { id: 'cust_009', name: 'Orion Dynamics', email: 'accounts@oriondyn.com' },
    { id: 'cust_010', name: 'BlueShift Analytics', email: 'admin@blueshift.ai' },
];

// ── ID Generation ───────────────────────────────────────────────────────────

let subscriptionCounter = 25;

export const generateSubscriptionId = () => {
    subscriptionCounter += 1;
    return `sub_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

export const generateSubscriptionNumber = () => {
    subscriptionCounter += 1;
    return `SUB-2025-${String(subscriptionCounter).padStart(4, '0')}`;
};

export const generateLineId = () =>
    `line_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

// ── Available Products for Order Lines ──────────────────────────────────────

export const AVAILABLE_PRODUCTS = [
    { id: 'prod_001', name: 'ViaTunnel Pro Suite', unitPrice: 299.99 },
    { id: 'prod_002', name: 'Cloud Storage Unlimited', unitPrice: 49.99 },
    { id: 'prod_004', name: 'Premium Support Package', unitPrice: 199.00 },
    { id: 'prod_005', name: 'SSL Certificate', unitPrice: 79.00 },
    { id: 'prod_008', name: 'Email Marketing Suite', unitPrice: 129.00 },
    { id: 'prod_009', name: 'CDN Bandwidth Pack', unitPrice: 59.00 },
    { id: 'prod_010', name: 'Data Analytics Platform', unitPrice: 449.00 },
    { id: 'prod_015', name: 'CI/CD Pipeline Pro', unitPrice: 199.00 },
    { id: 'prod_016', name: 'Log Management Add-on', unitPrice: 39.00 },
    { id: 'prod_019', name: 'VPN Gateway', unitPrice: 89.00 },
    { id: 'prod_021', name: 'Monitoring Dashboard', unitPrice: 159.00 },
    { id: 'prod_022', name: 'Backup & Recovery Service', unitPrice: 249.00 },
    { id: 'prod_023', name: 'DDoS Protection Add-on', unitPrice: 149.00 },
];

// ── Plan References ─────────────────────────────────────────────────────────

export const AVAILABLE_PLANS = [
    { id: 'plan_001', name: 'Starter Monthly', price: 29.99 },
    { id: 'plan_002', name: 'Business Annual', price: 299.00 },
    { id: 'plan_005', name: 'Pro Monthly', price: 79.99 },
    { id: 'plan_006', name: 'Scale Yearly', price: 599.00 },
    { id: 'plan_009', name: 'Team Monthly', price: 199.00 },
    { id: 'plan_011', name: 'Growth Annual', price: 999.00 },
    { id: 'plan_013', name: 'Unlimited Monthly', price: 499.00 },
    { id: 'plan_015', name: 'Corporate Yearly', price: 2499.00 },
];

// ── Mock Subscriptions ──────────────────────────────────────────────────────

export const subscriptionsMockData = [
    {
        id: 'sub_001',
        subscriptionNumber: 'SUB-2025-0001',
        customerId: 'cust_001',
        customerName: 'John Enterprises',
        planId: 'plan_005',
        planName: 'Pro Monthly',
        status: 'active',
        startDate: '2025-06-01',
        expirationDate: '2026-06-01',
        paymentTerms: 'net-30',
        orderLines: [
            { id: 'line_001', productId: 'prod_001', productName: 'ViaTunnel Pro Suite', quantity: 5, unitPrice: 299.99, taxRate: 18 },
            { id: 'line_002', productId: 'prod_004', productName: 'Premium Support Package', quantity: 5, unitPrice: 199.00, taxRate: 18 },
            { id: 'line_003', productId: 'prod_005', productName: 'SSL Certificate', quantity: 1, unitPrice: 79.00, taxRate: 18 },
        ],
        activity: [
            { id: 'act_001', action: 'Subscription created', user: 'Admin', timestamp: '2025-06-01T10:00:00Z' },
            { id: 'act_002', action: 'Converted to quotation', user: 'Admin', timestamp: '2025-06-01T10:30:00Z' },
            { id: 'act_003', action: 'Quotation confirmed', user: 'Sarah Kim', timestamp: '2025-06-02T09:15:00Z' },
            { id: 'act_004', action: 'Subscription activated', user: 'System', timestamp: '2025-06-02T12:00:00Z' },
        ],
        createdAt: '2025-06-01T10:00:00Z',
    },
    {
        id: 'sub_002',
        subscriptionNumber: 'SUB-2025-0002',
        customerId: 'cust_002',
        customerName: 'Acme Corporation',
        planId: 'plan_015',
        planName: 'Corporate Yearly',
        status: 'active',
        startDate: '2025-03-15',
        expirationDate: '2026-03-15',
        paymentTerms: 'net-60',
        orderLines: [
            { id: 'line_004', productId: 'prod_010', productName: 'Data Analytics Platform', quantity: 10, unitPrice: 449.00, taxRate: 18 },
            { id: 'line_005', productId: 'prod_015', productName: 'CI/CD Pipeline Pro', quantity: 10, unitPrice: 199.00, taxRate: 18 },
            { id: 'line_006', productId: 'prod_022', productName: 'Backup & Recovery Service', quantity: 5, unitPrice: 249.00, taxRate: 18 },
            { id: 'line_007', productId: 'prod_023', productName: 'DDoS Protection Add-on', quantity: 1, unitPrice: 149.00, taxRate: 18 },
        ],
        activity: [
            { id: 'act_005', action: 'Subscription created', user: 'Admin', timestamp: '2025-03-10T08:00:00Z' },
            { id: 'act_006', action: 'Converted to quotation', user: 'Admin', timestamp: '2025-03-10T08:20:00Z' },
            { id: 'act_007', action: 'Quotation confirmed', user: 'James Wilson', timestamp: '2025-03-12T14:00:00Z' },
            { id: 'act_008', action: 'Subscription activated', user: 'System', timestamp: '2025-03-15T00:00:00Z' },
        ],
        createdAt: '2025-03-10T08:00:00Z',
    },
    {
        id: 'sub_003',
        subscriptionNumber: 'SUB-2025-0003',
        customerId: 'cust_003',
        customerName: 'TechNova Solutions',
        planId: 'plan_009',
        planName: 'Team Monthly',
        status: 'quotation',
        startDate: '2026-03-01',
        expirationDate: '2027-03-01',
        paymentTerms: 'net-30',
        orderLines: [
            { id: 'line_008', productId: 'prod_008', productName: 'Email Marketing Suite', quantity: 3, unitPrice: 129.00, taxRate: 12 },
            { id: 'line_009', productId: 'prod_021', productName: 'Monitoring Dashboard', quantity: 2, unitPrice: 159.00, taxRate: 12 },
        ],
        activity: [
            { id: 'act_009', action: 'Subscription created', user: 'Admin', timestamp: '2026-02-20T11:00:00Z' },
            { id: 'act_010', action: 'Converted to quotation', user: 'Admin', timestamp: '2026-02-20T11:30:00Z' },
        ],
        createdAt: '2026-02-20T11:00:00Z',
    },
    {
        id: 'sub_004',
        subscriptionNumber: 'SUB-2025-0004',
        customerId: 'cust_004',
        customerName: 'GlobalSync Ltd',
        planId: 'plan_002',
        planName: 'Business Annual',
        status: 'confirmed',
        startDate: '2026-04-01',
        expirationDate: '2027-04-01',
        paymentTerms: 'net-45',
        orderLines: [
            { id: 'line_010', productId: 'prod_001', productName: 'ViaTunnel Pro Suite', quantity: 20, unitPrice: 299.99, taxRate: 18 },
            { id: 'line_011', productId: 'prod_004', productName: 'Premium Support Package', quantity: 20, unitPrice: 199.00, taxRate: 18 },
            { id: 'line_012', productId: 'prod_009', productName: 'CDN Bandwidth Pack', quantity: 10, unitPrice: 59.00, taxRate: 18 },
        ],
        activity: [
            { id: 'act_011', action: 'Subscription created', user: 'Sarah Kim', timestamp: '2026-02-15T09:00:00Z' },
            { id: 'act_012', action: 'Converted to quotation', user: 'Sarah Kim', timestamp: '2026-02-15T09:30:00Z' },
            { id: 'act_013', action: 'Quotation confirmed', user: 'Admin', timestamp: '2026-02-18T14:00:00Z' },
        ],
        createdAt: '2026-02-15T09:00:00Z',
    },
    {
        id: 'sub_005',
        subscriptionNumber: 'SUB-2025-0005',
        customerId: 'cust_005',
        customerName: 'Pinnacle Digital',
        planId: 'plan_001',
        planName: 'Starter Monthly',
        status: 'draft',
        startDate: '2026-03-15',
        expirationDate: '2027-03-15',
        paymentTerms: 'due-on-receipt',
        orderLines: [
            { id: 'line_013', productId: 'prod_002', productName: 'Cloud Storage Unlimited', quantity: 2, unitPrice: 49.99, taxRate: 8 },
            { id: 'line_014', productId: 'prod_016', productName: 'Log Management Add-on', quantity: 1, unitPrice: 39.00, taxRate: 8 },
        ],
        activity: [
            { id: 'act_014', action: 'Subscription created', user: 'Admin', timestamp: '2026-03-01T16:00:00Z' },
        ],
        createdAt: '2026-03-01T16:00:00Z',
    },
    {
        id: 'sub_006',
        subscriptionNumber: 'SUB-2025-0006',
        customerId: 'cust_006',
        customerName: 'Vertex Industries',
        planId: 'plan_011',
        planName: 'Growth Annual',
        status: 'closed',
        startDate: '2024-08-01',
        expirationDate: '2025-08-01',
        paymentTerms: 'net-30',
        orderLines: [
            { id: 'line_015', productId: 'prod_010', productName: 'Data Analytics Platform', quantity: 5, unitPrice: 449.00, taxRate: 18 },
            { id: 'line_016', productId: 'prod_019', productName: 'VPN Gateway', quantity: 10, unitPrice: 89.00, taxRate: 18 },
        ],
        activity: [
            { id: 'act_015', action: 'Subscription created', user: 'Admin', timestamp: '2024-07-20T08:00:00Z' },
            { id: 'act_016', action: 'Converted to quotation', user: 'Admin', timestamp: '2024-07-20T08:30:00Z' },
            { id: 'act_017', action: 'Quotation confirmed', user: 'Mike Johnson', timestamp: '2024-07-22T10:00:00Z' },
            { id: 'act_018', action: 'Subscription activated', user: 'System', timestamp: '2024-08-01T00:00:00Z' },
            { id: 'act_019', action: 'Subscription closed', user: 'System', timestamp: '2025-08-01T00:00:00Z' },
        ],
        createdAt: '2024-07-20T08:00:00Z',
    },
    {
        id: 'sub_007',
        subscriptionNumber: 'SUB-2025-0007',
        customerId: 'cust_007',
        customerName: 'CloudBridge Inc',
        planId: 'plan_013',
        planName: 'Unlimited Monthly',
        status: 'active',
        startDate: '2025-11-01',
        expirationDate: '2026-11-01',
        paymentTerms: 'prepaid',
        orderLines: [
            { id: 'line_017', productId: 'prod_001', productName: 'ViaTunnel Pro Suite', quantity: 15, unitPrice: 299.99, taxRate: 18 },
            { id: 'line_018', productId: 'prod_004', productName: 'Premium Support Package', quantity: 15, unitPrice: 199.00, taxRate: 18 },
            { id: 'line_019', productId: 'prod_022', productName: 'Backup & Recovery Service', quantity: 10, unitPrice: 249.00, taxRate: 18 },
            { id: 'line_020', productId: 'prod_023', productName: 'DDoS Protection Add-on', quantity: 5, unitPrice: 149.00, taxRate: 18 },
        ],
        activity: [
            { id: 'act_020', action: 'Subscription created', user: 'Sarah Kim', timestamp: '2025-10-15T13:00:00Z' },
            { id: 'act_021', action: 'Converted to quotation', user: 'Sarah Kim', timestamp: '2025-10-15T13:15:00Z' },
            { id: 'act_022', action: 'Quotation confirmed', user: 'Admin', timestamp: '2025-10-20T10:00:00Z' },
            { id: 'act_023', action: 'Subscription activated', user: 'System', timestamp: '2025-11-01T00:00:00Z' },
        ],
        createdAt: '2025-10-15T13:00:00Z',
    },
    {
        id: 'sub_008',
        subscriptionNumber: 'SUB-2025-0008',
        customerId: 'cust_008',
        customerName: 'NorthStar Media',
        planId: 'plan_006',
        planName: 'Scale Yearly',
        status: 'draft',
        startDate: '2026-04-01',
        expirationDate: '2027-04-01',
        paymentTerms: 'net-30',
        orderLines: [
            { id: 'line_021', productId: 'prod_008', productName: 'Email Marketing Suite', quantity: 10, unitPrice: 129.00, taxRate: 12 },
        ],
        activity: [
            { id: 'act_024', action: 'Subscription created', user: 'Admin', timestamp: '2026-02-28T09:00:00Z' },
        ],
        createdAt: '2026-02-28T09:00:00Z',
    },
    {
        id: 'sub_009',
        subscriptionNumber: 'SUB-2025-0009',
        customerId: 'cust_009',
        customerName: 'Orion Dynamics',
        planId: 'plan_005',
        planName: 'Pro Monthly',
        status: 'closed',
        startDate: '2024-12-01',
        expirationDate: '2025-06-01',
        paymentTerms: 'net-15',
        orderLines: [
            { id: 'line_022', productId: 'prod_015', productName: 'CI/CD Pipeline Pro', quantity: 8, unitPrice: 199.00, taxRate: 18 },
            { id: 'line_023', productId: 'prod_021', productName: 'Monitoring Dashboard', quantity: 8, unitPrice: 159.00, taxRate: 18 },
        ],
        activity: [
            { id: 'act_025', action: 'Subscription created', user: 'Admin', timestamp: '2024-11-20T14:00:00Z' },
            { id: 'act_026', action: 'Converted to quotation', user: 'Admin', timestamp: '2024-11-20T14:30:00Z' },
            { id: 'act_027', action: 'Quotation confirmed', user: 'Admin', timestamp: '2024-11-22T10:00:00Z' },
            { id: 'act_028', action: 'Subscription activated', user: 'System', timestamp: '2024-12-01T00:00:00Z' },
            { id: 'act_029', action: 'Subscription closed — contract end', user: 'System', timestamp: '2025-06-01T00:00:00Z' },
        ],
        createdAt: '2024-11-20T14:00:00Z',
    },
    {
        id: 'sub_010',
        subscriptionNumber: 'SUB-2025-0010',
        customerId: 'cust_010',
        customerName: 'BlueShift Analytics',
        planId: 'plan_015',
        planName: 'Corporate Yearly',
        status: 'quotation',
        startDate: '2026-04-01',
        expirationDate: '2027-04-01',
        paymentTerms: 'net-60',
        orderLines: [
            { id: 'line_024', productId: 'prod_001', productName: 'ViaTunnel Pro Suite', quantity: 50, unitPrice: 299.99, taxRate: 18 },
            { id: 'line_025', productId: 'prod_004', productName: 'Premium Support Package', quantity: 50, unitPrice: 199.00, taxRate: 18 },
            { id: 'line_026', productId: 'prod_010', productName: 'Data Analytics Platform', quantity: 25, unitPrice: 449.00, taxRate: 18 },
            { id: 'line_027', productId: 'prod_022', productName: 'Backup & Recovery Service', quantity: 25, unitPrice: 249.00, taxRate: 18 },
            { id: 'line_028', productId: 'prod_023', productName: 'DDoS Protection Add-on', quantity: 10, unitPrice: 149.00, taxRate: 18 },
        ],
        activity: [
            { id: 'act_030', action: 'Subscription created', user: 'Admin', timestamp: '2026-02-25T09:00:00Z' },
            { id: 'act_031', action: 'Converted to quotation', user: 'Admin', timestamp: '2026-02-25T09:45:00Z' },
        ],
        createdAt: '2026-02-25T09:00:00Z',
    },
    {
        id: 'sub_011',
        subscriptionNumber: 'SUB-2025-0011',
        customerId: 'cust_001',
        customerName: 'John Enterprises',
        planId: 'plan_009',
        planName: 'Team Monthly',
        status: 'confirmed',
        startDate: '2026-03-15',
        expirationDate: '2027-03-15',
        paymentTerms: 'net-30',
        orderLines: [
            { id: 'line_029', productId: 'prod_008', productName: 'Email Marketing Suite', quantity: 5, unitPrice: 129.00, taxRate: 12 },
            { id: 'line_030', productId: 'prod_009', productName: 'CDN Bandwidth Pack', quantity: 10, unitPrice: 59.00, taxRate: 12 },
            { id: 'line_031', productId: 'prod_016', productName: 'Log Management Add-on', quantity: 5, unitPrice: 39.00, taxRate: 12 },
        ],
        activity: [
            { id: 'act_032', action: 'Subscription created', user: 'Sarah Kim', timestamp: '2026-02-10T11:00:00Z' },
            { id: 'act_033', action: 'Converted to quotation', user: 'Sarah Kim', timestamp: '2026-02-10T11:15:00Z' },
            { id: 'act_034', action: 'Quotation confirmed', user: 'Admin', timestamp: '2026-02-12T15:00:00Z' },
        ],
        createdAt: '2026-02-10T11:00:00Z',
    },
    {
        id: 'sub_012',
        subscriptionNumber: 'SUB-2025-0012',
        customerId: 'cust_003',
        customerName: 'TechNova Solutions',
        planId: 'plan_013',
        planName: 'Unlimited Monthly',
        status: 'active',
        startDate: '2025-09-01',
        expirationDate: '2026-09-01',
        paymentTerms: 'net-30',
        orderLines: [
            { id: 'line_032', productId: 'prod_001', productName: 'ViaTunnel Pro Suite', quantity: 8, unitPrice: 299.99, taxRate: 18 },
            { id: 'line_033', productId: 'prod_010', productName: 'Data Analytics Platform', quantity: 4, unitPrice: 449.00, taxRate: 18 },
            { id: 'line_034', productId: 'prod_019', productName: 'VPN Gateway', quantity: 8, unitPrice: 89.00, taxRate: 18 },
        ],
        activity: [
            { id: 'act_035', action: 'Subscription created', user: 'Admin', timestamp: '2025-08-15T10:00:00Z' },
            { id: 'act_036', action: 'Converted to quotation', user: 'Admin', timestamp: '2025-08-15T10:20:00Z' },
            { id: 'act_037', action: 'Quotation confirmed', user: 'Sarah Kim', timestamp: '2025-08-20T14:00:00Z' },
            { id: 'act_038', action: 'Subscription activated', user: 'System', timestamp: '2025-09-01T00:00:00Z' },
        ],
        createdAt: '2025-08-15T10:00:00Z',
    },
];

// ── Financial Calculation Helpers ───────────────────────────────────────────

/**
 * Calculate line amount (quantity × unitPrice).
 */
export const calcLineSubtotal = (line) => line.quantity * line.unitPrice;

/**
 * Calculate tax for a single line.
 */
export const calcLineTax = (line) => calcLineSubtotal(line) * (line.taxRate / 100);

/**
 * Calculate total for a single line (subtotal + tax).
 */
export const calcLineTotal = (line) => calcLineSubtotal(line) + calcLineTax(line);

/**
 * Calculate financial breakdown for full order lines array.
 * @param {Array} lines
 * @param {number} taxRate
 * @returns {{ subtotal: number, totalTax: number, total: number }}
 */
export const calcOrderTotals = (lines, taxRate = 18) => {
    return calculateTotals(lines, taxRate);
};
