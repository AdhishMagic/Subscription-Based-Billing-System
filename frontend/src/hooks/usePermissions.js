/* ==========================================================================
   usePermissions HOOK
   Reusable permission-checking utility consumed by any component.
   
   Separation of Concerns:
   - Centralizes ALL permission logic in one hook.
   - Components never implement their own role checks.
   - Reads role from AuthContext via useAuth().
   - Uses ROUTE_PERMISSIONS from routeConfig as the source of truth.
   ========================================================================== */

import { useMemo } from 'react';
import useAuth from './useAuth';
import { ROLES } from '../utils/constants';
import {
    hasRouteAccess,
    getAccessibleRoutes,
    getFilteredNavSections,
} from '../routes/routeConfig';

const usePermissions = () => {
    const { role } = useAuth();

    return useMemo(() => ({
        // ── Current Role ────────────────────────────────────────────────
        role,

        // ── Role Identity Checks ────────────────────────────────────────
        isAdmin: role === ROLES.ADMIN,
        isInternal: role === ROLES.INTERNAL,
        isPortal: role === ROLES.PORTAL,

        // ── Role-Level Checks ───────────────────────────────────────────
        /** Does the current role include admin? */
        isAdminOrAbove: role === ROLES.ADMIN,

        /** Does the current role have at least internal-level access? */
        isInternalOrAbove: role === ROLES.ADMIN || role === ROLES.INTERNAL,

        // ── Route Access ────────────────────────────────────────────────
        /**
         * Check if current user can access a specific route path.
         * @param {string} path - e.g., '/discounts'
         * @returns {boolean}
         */
        canAccess: (path) => hasRouteAccess(path, role),

        /**
         * Check if current user's role is in the allowed list.
         * @param {string[]} allowedRoles - e.g., ['admin', 'internal']
         * @returns {boolean}
         */
        hasRole: (allowedRoles) => allowedRoles.includes(role),

        /**
         * Get all route paths accessible by the current user.
         * @returns {string[]}
         */
        accessibleRoutes: getAccessibleRoutes(role),

        /**
         * Get filtered navigation sections for the current user.
         * @returns {Array}
         */
        navSections: getFilteredNavSections(role),

    }), [role]);
};

export default usePermissions;
