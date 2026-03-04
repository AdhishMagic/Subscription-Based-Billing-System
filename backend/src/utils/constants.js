const ROLES = Object.freeze({
    ADMIN: 'admin',
    INTERNAL: 'internal',
    PORTAL: 'portal',
});

const SUBSCRIPTION_STATUS = Object.freeze({
    DRAFT: 'draft',
    QUOTATION: 'quotation',
    CONFIRMED: 'confirmed',
    ACTIVE: 'active',
    CLOSED: 'closed',
});

const STATUS_FLOW = ['draft', 'quotation', 'confirmed', 'active', 'closed'];

const INVOICE_STATUS = Object.freeze({
    DRAFT: 'draft',
    CONFIRMED: 'confirmed',
    SENT: 'sent',
    PAID: 'paid',
    PARTIALLY_PAID: 'partially_paid',
    OVERDUE: 'overdue',
    VOID: 'void',
});

const PAYMENT_STATUS = Object.freeze({
    PENDING: 'pending',
    COMPLETED: 'completed',
    FAILED: 'failed',
    REFUNDED: 'refunded',
});

const PRODUCT_TYPES = Object.freeze({
    SAAS: 'saas',
    SERVICE: 'service',
    LICENSE: 'license',
    ADDON: 'addon',
    HARDWARE: 'hardware',
    CONSULTING: 'consulting',
});

const BILLING_PERIODS = Object.freeze({
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    YEARLY: 'yearly',
});

const DISCOUNT_TYPES = Object.freeze({
    PERCENTAGE: 'percentage',
    FIXED: 'fixed',
});

const TAX_TYPES = Object.freeze({
    VAT: 'VAT',
    SALES_TAX: 'Sales Tax',
    SERVICE_TAX: 'Service Tax',
    CUSTOM: 'Custom',
});

const PAGINATION = Object.freeze({
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 20,
});

module.exports = {
    ROLES,
    SUBSCRIPTION_STATUS,
    STATUS_FLOW,
    INVOICE_STATUS,
    PAYMENT_STATUS,
    PRODUCT_TYPES,
    BILLING_PERIODS,
    DISCOUNT_TYPES,
    TAX_TYPES,
    PAGINATION,
};
