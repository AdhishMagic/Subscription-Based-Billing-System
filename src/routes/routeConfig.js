/* ==========================================================================
   ROUTE CONFIGURATION
   Centralized route paths, role permissions, and navigation metadata.
   
   Architecture:
   - ROUTES: Path constants for navigation/linking.
   - ROUTE_PERMISSIONS: Maps each route to its allowed roles.
   - NAV_SECTIONS: Navigation structure for the sidebar with role visibility.
   - Helpers: Utility functions for permission checks.
   
   Rules:
   - All route paths are defined HERE — never hardcoded in components.
   - All role requirements are defined HERE — components import, never guess.
   - Sidebar reads NAV_SECTIONS to render links conditionally.
   ========================================================================== */

import {
    HiOutlineHome,
    HiOutlineCube,
    HiOutlineRectangleStack,
    HiOutlineArrowPath,
    HiOutlineDocumentText,
    HiOutlineCreditCard,
    HiOutlineTag,
    HiOutlineReceiptPercent,
    HiOutlineUserGroup,
    HiOutlineChartBarSquare,
    HiOutlineCog6Tooth,
    HiOutlineDocumentDuplicate,
} from 'react-icons/hi2';
import { ROLES } from '../utils/constants';

// ── Route Path Constants ────────────────────────────────────────────────────

export const ROUTES = {
    // Public
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    RESET_PASSWORD: '/reset-password',

    // Dashboard
    DASHBOARD: '/dashboard',

    // Catalog
    PRODUCTS: '/products',
    PRODUCT_DETAIL: '/products/:id',
    PLANS: '/plans',
    PLAN_CREATE: '/plans/new',
    PLAN_EDIT: '/plans/:id/edit',
    QUOTATION_TEMPLATES: '/quotation-templates',
    QUOTATION_TEMPLATE_CREATE: '/quotation-templates/new',
    QUOTATION_TEMPLATE_EDIT: '/quotation-templates/:id/edit',
    QUOTATION_TEMPLATE_DETAIL: '/quotation-templates/:id',

    // Billing
    SUBSCRIPTIONS: '/subscriptions',
    SUBSCRIPTION_CREATE: '/subscriptions/new',
    SUBSCRIPTION_DETAIL: '/subscriptions/:id',
    INVOICES: '/invoices',
    INVOICE_DETAIL: '/invoices/:id',
    PAYMENTS: '/payments',

    // Configuration
    DISCOUNTS: '/discounts',
    DISCOUNT_CREATE: '/discounts/new',
    DISCOUNT_EDIT: '/discounts/:id/edit',
    TAXES: '/taxes',
    TAX_CREATE: '/taxes/new',
    TAX_EDIT: '/taxes/:id/edit',

    // Analytics
    REPORTS: '/reports',

    // Management
    USERS: '/users',

    // System
    SETTINGS: '/settings',

    // Error Routes
    UNAUTHORIZED: '/unauthorized',
};

// ── Route Permission Map ────────────────────────────────────────────────────
// Each route maps to an array of roles that can access it.
// This is the SINGLE SOURCE OF TRUTH for route-level authorization.

export const ROUTE_PERMISSIONS = {
    // All authenticated roles
    [ROUTES.DASHBOARD]: [ROLES.ADMIN, ROLES.INTERNAL, ROLES.PORTAL],
    [ROUTES.SUBSCRIPTIONS]: [ROLES.ADMIN, ROLES.INTERNAL, ROLES.PORTAL],
    [ROUTES.SUBSCRIPTION_CREATE]: [ROLES.ADMIN, ROLES.INTERNAL, ROLES.PORTAL],
    [ROUTES.SUBSCRIPTION_DETAIL]: [ROLES.ADMIN, ROLES.INTERNAL, ROLES.PORTAL],
    [ROUTES.INVOICES]: [ROLES.ADMIN, ROLES.INTERNAL, ROLES.PORTAL],
    [ROUTES.INVOICE_DETAIL]: [ROLES.ADMIN, ROLES.INTERNAL, ROLES.PORTAL],

    // Admin + Internal
    [ROUTES.PRODUCTS]: [ROLES.ADMIN, ROLES.INTERNAL],
    [ROUTES.PRODUCT_DETAIL]: [ROLES.ADMIN, ROLES.INTERNAL],
    [ROUTES.PLANS]: [ROLES.ADMIN, ROLES.INTERNAL],
    [ROUTES.PLAN_CREATE]: [ROLES.ADMIN, ROLES.INTERNAL],
    [ROUTES.PLAN_EDIT]: [ROLES.ADMIN, ROLES.INTERNAL],
    [ROUTES.QUOTATION_TEMPLATES]: [ROLES.ADMIN, ROLES.INTERNAL],
    [ROUTES.QUOTATION_TEMPLATE_CREATE]: [ROLES.ADMIN, ROLES.INTERNAL],
    [ROUTES.QUOTATION_TEMPLATE_EDIT]: [ROLES.ADMIN, ROLES.INTERNAL],
    [ROUTES.QUOTATION_TEMPLATE_DETAIL]: [ROLES.ADMIN, ROLES.INTERNAL],
    [ROUTES.PAYMENTS]: [ROLES.ADMIN, ROLES.INTERNAL],
    [ROUTES.REPORTS]: [ROLES.ADMIN, ROLES.INTERNAL],

    // Admin only
    [ROUTES.DISCOUNTS]: [ROLES.ADMIN],
    [ROUTES.DISCOUNT_CREATE]: [ROLES.ADMIN],
    [ROUTES.DISCOUNT_EDIT]: [ROLES.ADMIN],
    [ROUTES.TAXES]: [ROLES.ADMIN],
    [ROUTES.TAX_CREATE]: [ROLES.ADMIN],
    [ROUTES.TAX_EDIT]: [ROLES.ADMIN],
    [ROUTES.USERS]: [ROLES.ADMIN],
    [ROUTES.SETTINGS]: [ROLES.ADMIN],
};

// ── Permission Groups (for RoleBasedRoute nesting) ──────────────────────────

export const PERMISSION_GROUPS = {
    ALL_ROLES: [ROLES.ADMIN, ROLES.INTERNAL, ROLES.PORTAL],
    ADMIN_INTERNAL: [ROLES.ADMIN, ROLES.INTERNAL],
    ADMIN_ONLY: [ROLES.ADMIN],
};

// ── Navigation Sections (for Sidebar) ───────────────────────────────────────
// The sidebar reads this config to render links. Each link carries:
//   - to: route path
//   - label: display text
//   - icon: React icon component
//   - roles: which roles can see this link

export const NAV_SECTIONS = [
    {
        id: 'overview',
        title: 'Overview',
        links: [
            { to: ROUTES.DASHBOARD, label: 'Dashboard', icon: HiOutlineHome, roles: PERMISSION_GROUPS.ALL_ROLES },
        ],
    },
    {
        id: 'catalog',
        title: 'Catalog',
        links: [
            { to: ROUTES.PRODUCTS, label: 'Products', icon: HiOutlineCube, roles: PERMISSION_GROUPS.ADMIN_INTERNAL },
            { to: ROUTES.PLANS, label: 'Plans', icon: HiOutlineRectangleStack, roles: PERMISSION_GROUPS.ADMIN_INTERNAL },
            { to: ROUTES.QUOTATION_TEMPLATES, label: 'Templates', icon: HiOutlineDocumentDuplicate, roles: PERMISSION_GROUPS.ADMIN_INTERNAL },
        ],
    },
    {
        id: 'billing',
        title: 'Billing',
        links: [
            { to: ROUTES.SUBSCRIPTIONS, label: 'Subscriptions', icon: HiOutlineArrowPath, roles: PERMISSION_GROUPS.ALL_ROLES },
            { to: ROUTES.INVOICES, label: 'Invoices', icon: HiOutlineDocumentText, roles: PERMISSION_GROUPS.ALL_ROLES },
            { to: ROUTES.PAYMENTS, label: 'Payments', icon: HiOutlineCreditCard, roles: PERMISSION_GROUPS.ADMIN_INTERNAL },
        ],
    },
    {
        id: 'configuration',
        title: 'Configuration',
        links: [
            { to: ROUTES.DISCOUNTS, label: 'Discounts', icon: HiOutlineTag, roles: PERMISSION_GROUPS.ADMIN_ONLY },
            { to: ROUTES.TAXES, label: 'Taxes', icon: HiOutlineReceiptPercent, roles: PERMISSION_GROUPS.ADMIN_ONLY },
        ],
    },
    {
        id: 'analytics',
        title: 'Analytics',
        links: [
            { to: ROUTES.REPORTS, label: 'Reports', icon: HiOutlineChartBarSquare, roles: PERMISSION_GROUPS.ADMIN_INTERNAL },
        ],
    },
    {
        id: 'management',
        title: 'Management',
        links: [
            { to: ROUTES.USERS, label: 'Users', icon: HiOutlineUserGroup, roles: PERMISSION_GROUPS.ADMIN_ONLY },
            { to: ROUTES.SETTINGS, label: 'Settings', icon: HiOutlineCog6Tooth, roles: PERMISSION_GROUPS.ADMIN_ONLY },
        ],
    },
];

// ── Helper Functions ────────────────────────────────────────────────────────

/**
 * Check if a specific role has access to a given route path.
 * @param {string} path - Route path (e.g., '/discounts')
 * @param {string} role - User role (e.g., 'admin')
 * @returns {boolean}
 */
export const hasRouteAccess = (path, role) => {
    const permissions = ROUTE_PERMISSIONS[path];
    if (!permissions) return false;
    return permissions.includes(role);
};

/**
 * Get all routes accessible by a specific role.
 * @param {string} role - User role
 * @returns {string[]} Array of accessible route paths
 */
export const getAccessibleRoutes = (role) => {
    return Object.entries(ROUTE_PERMISSIONS)
        .filter(([, roles]) => roles.includes(role))
        .map(([path]) => path);
};

/**
 * Filter navigation sections for a given role.
 * Returns only sections that have at least one visible link.
 * @param {string} role - User role
 * @returns {Array} Filtered nav sections
 */
export const getFilteredNavSections = (role) => {
    return NAV_SECTIONS
        .map((section) => ({
            ...section,
            links: section.links.filter((link) => link.roles.includes(role)),
        }))
        .filter((section) => section.links.length > 0);
};
