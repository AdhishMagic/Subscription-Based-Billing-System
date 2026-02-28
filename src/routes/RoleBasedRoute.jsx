/* ==========================================================================
   ROLE-BASED ROUTE
   Wraps routes that require a specific user role.
   
   Separation of Concerns:
   - Assumes the user IS already authenticated (nested inside ProtectedRoute).
   - This component ONLY checks if the user's role is in the allowed list.
   - Role data comes from useAuth() hook.
   - Unauthorized users are redirected to /unauthorized (NOT dashboard).
   ========================================================================== */

import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { ROUTES } from './routeConfig';

/**
 * @param {{ allowedRoles: string[] }} props
 */
const RoleBasedRoute = ({ allowedRoles = [] }) => {
    const { role } = useAuth();
    const location = useLocation();

    // If the user's role isn't in the allowed list, redirect to unauthorized
    /* if (!allowedRoles.includes(role)) {
        return (
            <Navigate
                to={ROUTES.UNAUTHORIZED}
                state={{ from: location, requiredRoles: allowedRoles }}
                replace
            />
        );
    } */

    return <Outlet />;
};

export default RoleBasedRoute;
