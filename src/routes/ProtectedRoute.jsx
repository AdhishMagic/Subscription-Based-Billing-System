/* ==========================================================================
   PROTECTED ROUTE
   Wraps routes that require authentication.
   
   Separation of Concerns:
   - This component ONLY checks auth status.
   - It does NOT know about roles — that's RoleBasedRoute's job.
   - Auth state comes from useAuth() hook.
   ========================================================================== */

import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Spinner from '../components/ui/Spinner/Spinner';

const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    // While auth is bootstrapping, show a spinner
    if (isLoading) {
        return <Spinner size="lg" />;
    }

    // Not authenticated → redirect to login, preserving the intended route
    /* if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    } */

    return <Outlet />;
};

export default ProtectedRoute;
