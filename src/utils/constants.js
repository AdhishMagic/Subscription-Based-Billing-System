/* ==========================================================================
   CONSTANTS
   Application-wide constants.
   Centralized so no magic strings are scattered across the codebase.
   ========================================================================== */

// ── User Roles ──────────────────────────────────────────────────────────────

export const ROLES = {
    ADMIN: 'admin',
    INTERNAL: 'internal',
    PORTAL: 'portal',
};

// ── Subscription Statuses ───────────────────────────────────────────────────

export const SUBSCRIPTION_STATUS = {
    ACTIVE: 'active',
    PAUSED: 'paused',
    CANCELLED: 'cancelled',
    EXPIRED: 'expired',
    TRIAL: 'trial',
};

// ── Invoice Statuses ────────────────────────────────────────────────────────

export const INVOICE_STATUS = {
    DRAFT: 'draft',
    SENT: 'sent',
    PAID: 'paid',
    OVERDUE: 'overdue',
    VOID: 'void',
};

// ── Payment Statuses ────────────────────────────────────────────────────────

export const PAYMENT_STATUS = {
    PENDING: 'pending',
    COMPLETED: 'completed',
    FAILED: 'failed',
    REFUNDED: 'refunded',
};

// ── Billing Intervals ───────────────────────────────────────────────────────

export const BILLING_INTERVAL = {
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
};

// ── Pagination Defaults ─────────────────────────────────────────────────────

export const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 20,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
};

// ── Toast Types ─────────────────────────────────────────────────────────────

export const TOAST_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
};

// ── Toast Duration (ms) ─────────────────────────────────────────────────────

export const TOAST_DURATION = 4000;
