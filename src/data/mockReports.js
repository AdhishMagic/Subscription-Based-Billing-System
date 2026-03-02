import {
    FiDollarSign,
    FiActivity,
    FiUsers,
    FiAlertCircle,
    FiPercent,
    FiFileText
} from 'react-icons/fi';

export const reportKPIs = [
    {
        id: 'total-revenue',
        label: 'Total Revenue',
        value: 245000,
        prefix: '$',
        trend: 'up',
        trendValue: '12%',
        icon: FiDollarSign,
    },
    {
        id: 'mrr',
        label: 'Monthly Recurring Revenue',
        value: 48500,
        prefix: '$',
        trend: 'up',
        trendValue: '8.4%',
        icon: FiActivity,
    },
    {
        id: 'active-subs',
        label: 'Active Subscriptions',
        value: 1240,
        trend: 'up',
        trendValue: '5.2%',
        icon: FiUsers,
    },
    {
        id: 'overdue-invoices',
        label: 'Overdue Invoices',
        value: 12,
        trend: 'down',
        trendValue: '2.1%',
        icon: FiAlertCircle,
    },
    {
        id: 'total-taxes',
        label: 'Taxes Collected',
        value: 18400,
        prefix: '$',
        trend: 'up',
        trendValue: '11.5%',
        icon: FiFileText,
    }
];

export const revenueTrendData = [
    { month: 'Jan', revenue: 20000, target: 18000 },
    { month: 'Feb', revenue: 22000, target: 19500 },
    { month: 'Mar', revenue: 25000, target: 21000 },
    { month: 'Apr', revenue: 24500, target: 23000 },
    { month: 'May', revenue: 28000, target: 25000 },
    { month: 'Jun', revenue: 32000, target: 27000 },
    { month: 'Jul', revenue: 35000, target: 29000 },
    { month: 'Aug', revenue: 38500, target: 31000 },
    { month: 'Sep', revenue: 42000, target: 33000 },
    { month: 'Oct', revenue: 40500, target: 35000 },
    { month: 'Nov', revenue: 45000, target: 38000 },
    { month: 'Dec', revenue: 51000, target: 41000 },
];

export const subscriptionDistributionData = [
    { name: 'Active', value: 1240, color: 'var(--color-success)' },
    { name: 'Draft', value: 185, color: 'var(--color-warning)' },
    { name: 'Quotation', value: 320, color: 'var(--color-info)' },
    { name: 'Closed', value: 95, color: 'var(--color-border-default)' },
];

export const paymentInsightsData = [
    { month: 'Jan', completed: 19500, pending: 800, failed: 200 },
    { month: 'Feb', completed: 21000, pending: 1200, failed: 300 },
    { month: 'Mar', completed: 24000, pending: 900, failed: 150 },
    { month: 'Apr', completed: 23500, pending: 1100, failed: 250 },
    { month: 'May', completed: 27000, pending: 1500, failed: 400 },
    { month: 'Jun', completed: 31000, pending: 850, failed: 100 },
];

export const discountImpactData = [
    { month: 'Jan', revenue: 20000, discount: 500 },
    { month: 'Feb', revenue: 22000, discount: 800 },
    { month: 'Mar', revenue: 25000, discount: 1200 },
    { month: 'Apr', revenue: 24500, discount: 900 },
    { month: 'May', revenue: 28000, discount: 1500 },
    { month: 'Jun', revenue: 32000, discount: 1800 },
];

export const taxSummaryData = [
    { name: 'VAT (20%)', value: 12500, color: 'var(--color-accent-primary)' },
    { name: 'Sales Tax (8%)', value: 4200, color: 'var(--color-accent-secondary)' },
    { name: 'Digital Tax (5%)', value: 1700, color: 'var(--color-info)' },
];
