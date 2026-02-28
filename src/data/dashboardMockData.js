/* ==========================================================================
   DASHBOARD MOCK DATA
   Centralized data source for all dashboard components.
   Structured to mirror future API response shapes.
   ========================================================================== */

/* ── Top-Level KPIs ─────────────────────────────────────────────────────── */

export const metricCardsData = [
    {
        id: 'active-subscriptions',
        label: 'Active Subscriptions',
        value: 1284,
        prefix: '',
        suffix: '',
        trend: { value: 12.5, direction: 'up' },
        icon: 'subscriptions',
    },
    {
        id: 'monthly-revenue',
        label: 'Monthly Revenue',
        value: 48560,
        prefix: '$',
        suffix: '',
        trend: { value: 8.2, direction: 'up' },
        icon: 'revenue',
    },
    {
        id: 'outstanding-invoices',
        label: 'Outstanding Invoices',
        value: 23,
        prefix: '',
        suffix: '',
        trend: { value: 3.1, direction: 'down' },
        icon: 'invoices',
    },
    {
        id: 'total-customers',
        label: 'Total Customers',
        value: 3742,
        prefix: '',
        suffix: '',
        trend: { value: 5.7, direction: 'up' },
        icon: 'customers',
    },
];

/* ── Monthly Recurring Revenue (12 months) ──────────────────────────────── */

export const revenueChartData = [
    { month: 'Mar', revenue: 28400, target: 30000 },
    { month: 'Apr', revenue: 31200, target: 32000 },
    { month: 'May', revenue: 29800, target: 33000 },
    { month: 'Jun', revenue: 34500, target: 34000 },
    { month: 'Jul', revenue: 37200, target: 36000 },
    { month: 'Aug', revenue: 35800, target: 37000 },
    { month: 'Sep', revenue: 39400, target: 38000 },
    { month: 'Oct', revenue: 41200, target: 40000 },
    { month: 'Nov', revenue: 43800, target: 42000 },
    { month: 'Dec', revenue: 42100, target: 43000 },
    { month: 'Jan', revenue: 45600, target: 44000 },
    { month: 'Feb', revenue: 48560, target: 46000 },
];

/* ── Subscription Status Distribution ───────────────────────────────────── */

export const subscriptionStatusData = [
    { name: 'Active', value: 1284, color: '#bfffc7' },
    { name: 'Draft', value: 156, color: '#b7f2f5' },
    { name: 'Quotation', value: 89, color: '#ffc556' },
    { name: 'Closed', value: 213, color: '#7ec8b5' },
];

/* ── Recent Activity Feed ───────────────────────────────────────────────── */

export const recentActivityData = [
    {
        id: 'act-001',
        type: 'subscription_created',
        message: 'Subscription #SUB-1084 created',
        detail: 'Enterprise Annual Plan',
        timestamp: '2 min ago',
        icon: 'plus',
    },
    {
        id: 'act-002',
        type: 'invoice_paid',
        message: 'Invoice #INV-4821 paid',
        detail: '$2,450.00 received',
        timestamp: '15 min ago',
        icon: 'check',
    },
    {
        id: 'act-003',
        type: 'discount_applied',
        message: 'Discount "SPRING25" applied',
        detail: '25% off — Subscription #SUB-1042',
        timestamp: '1 hr ago',
        icon: 'tag',
    },
    {
        id: 'act-004',
        type: 'subscription_activated',
        message: 'Subscription #SUB-1042 activated',
        detail: 'Pro Monthly Plan',
        timestamp: '2 hrs ago',
        icon: 'zap',
    },
    {
        id: 'act-005',
        type: 'user_created',
        message: 'New customer registered',
        detail: 'Acme Corporation — admin@acme.io',
        timestamp: '3 hrs ago',
        icon: 'user',
    },
    {
        id: 'act-006',
        type: 'invoice_paid',
        message: 'Invoice #INV-4819 paid',
        detail: '$890.00 received',
        timestamp: '5 hrs ago',
        icon: 'check',
    },
    {
        id: 'act-007',
        type: 'subscription_created',
        message: 'Subscription #SUB-1081 created',
        detail: 'Starter Monthly Plan',
        timestamp: '6 hrs ago',
        icon: 'plus',
    },
];
