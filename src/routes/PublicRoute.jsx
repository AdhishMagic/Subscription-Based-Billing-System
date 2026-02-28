/* ==========================================================================
   PUBLIC ROUTE
   Wrapper for routes that should ONLY be accessible to unauthenticated users.
   
   Separation of Concerns:
   - Blocks authenticated users from accessing login/register pages.
   - Redirects them to their intended destination or dashboard.
   - Auth state comes from useAuth() hook.
   ========================================================================== */

import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Spinner from '../components/ui/Spinner/Spinner';
import { ROUTES } from './routeConfig';

const PublicRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    // While auth is bootstrapping, show a spinner
    if (isLoading) {
        return <Spinner size="lg" />;
    }

    // Already authenticated → redirect to intended page or dashboard
    if (isAuthenticated) {
        const from = location.state?.from?.pathname || ROUTES.DASHBOARD;
        return <Navigate to={from} replace />;
    }

    return <Outlet />;
};

export default PublicRoute;
