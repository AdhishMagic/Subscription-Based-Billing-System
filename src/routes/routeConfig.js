/* ==========================================================================
   ROUTE CONFIGURATION
   Centralized route path constants and metadata.
   
   Separation of Concerns:
   - All route paths are defined here — never hardcoded in components.
   - Components import ROUTES.XXX for navigation/linking.
   ========================================================================== */

export const ROUTES = {
    // Public
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',

    // Dashboard
    DASHBOARD: '/dashboard',

    // Catalog
    PRODUCTS: '/products',
    PRODUCT_DETAIL: '/products/:id',
    PLANS: '/plans',

    // Billing
    SUBSCRIPTIONS: '/subscriptions',
    SUBSCRIPTION_DETAIL: '/subscriptions/:id',
    INVOICES: '/invoices',
    INVOICE_DETAIL: '/invoices/:id',
    PAYMENTS: '/payments',

    // Configuration
    DISCOUNTS: '/discounts',
    TAXES: '/taxes',

    // Analytics
    REPORTS: '/reports',

    // System
    SETTINGS: '/settings',
};
