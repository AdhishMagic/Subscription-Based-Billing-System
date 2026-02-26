/* ==========================================================================
   APP ROUTER
   Central routing configuration with lazy-loaded pages.
   
   Separation of Concerns:
   - This module is the SINGLE place where all routes are declared.
   - Page components are lazy-loaded for automatic code splitting.
   - Auth/role guards are composed via route nesting.
   - Layout selection is handled by parent route elements.
   
   Route Nesting Strategy:
   ┌─ PublicLayout
   │  ├── /              → LandingPage (future)
   │  └── ...
   ├─ AuthLayout
   │  ├── /login         → LoginPage
   │  └── /register      → RegisterPage
   ├─ ProtectedRoute (auth gate)
   │  └─ DashboardLayout
   │     ├── /dashboard   → all roles
   │     ├── RoleBasedRoute [admin, internal]
   │     │   ├── /products
   │     │   └── ...
   │     └── RoleBasedRoute [admin]
   │         ├── /discounts
   │         └── ...
   └─ * → NotFoundPage
   ========================================================================== */

import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Spinner from '../components/ui/Spinner/Spinner';
import ProtectedRoute from './ProtectedRoute';
import RoleBasedRoute from './RoleBasedRoute';
import { ROLES } from '../utils/constants';

// ── Layouts (not lazy — always needed) ──────────────────────────────────────
import DashboardLayout from '../layouts/DashboardLayout/DashboardLayout';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';
import PublicLayout from '../layouts/PublicLayout/PublicLayout';

// ── Lazy-Loaded Pages (code splitting per route) ────────────────────────────
const DashboardPage = lazy(() => import('../pages/Dashboard/DashboardPage'));
const LoginPage = lazy(() => import('../pages/Auth/LoginPage'));
const RegisterPage = lazy(() => import('../pages/Auth/RegisterPage'));
const ProductsPage = lazy(() => import('../pages/Products/ProductsPage'));
const ProductDetailPage = lazy(() => import('../pages/Products/ProductDetailPage'));
const PlansPage = lazy(() => import('../pages/Plans/PlansPage'));
const SubscriptionsPage = lazy(() => import('../pages/Subscriptions/SubscriptionsPage'));
const SubscriptionDetailPage = lazy(() => import('../pages/Subscriptions/SubscriptionDetailPage'));
const InvoicesPage = lazy(() => import('../pages/Invoices/InvoicesPage'));
const InvoiceDetailPage = lazy(() => import('../pages/Invoices/InvoiceDetailPage'));
const PaymentsPage = lazy(() => import('../pages/Payments/PaymentsPage'));
const DiscountsPage = lazy(() => import('../pages/Discounts/DiscountsPage'));
const TaxesPage = lazy(() => import('../pages/Taxes/TaxesPage'));
const ReportsPage = lazy(() => import('../pages/Reports/ReportsPage'));
const SettingsPage = lazy(() => import('../pages/Settings/SettingsPage'));
const NotFoundPage = lazy(() => import('../pages/NotFound/NotFoundPage'));

// ── Suspense Wrapper ────────────────────────────────────────────────────────
const SuspenseWrapper = ({ children }) => (
    <Suspense fallback={<Spinner size="lg" />}>
        {children}
    </Suspense>
);

// ── Router Definition ───────────────────────────────────────────────────────
const router = createBrowserRouter([
    // ── Public Routes ─────────────────────────────────────────────────────
    {
        element: <PublicLayout />,
        children: [
            { index: true, element: <Navigate to="/login" replace /> },
        ],
    },

    // ── Auth Routes ───────────────────────────────────────────────────────
    {
        element: <AuthLayout />,
        children: [
            {
                path: '/login',
                element: <SuspenseWrapper><LoginPage /></SuspenseWrapper>,
            },
            {
                path: '/register',
                element: <SuspenseWrapper><RegisterPage /></SuspenseWrapper>,
            },
        ],
    },

    // ── Protected Routes (require authentication) ─────────────────────────
    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <DashboardLayout />,
                children: [
                    // ── All Roles ─────────────────────────────────────────────
                    {
                        element: <RoleBasedRoute allowedRoles={[ROLES.ADMIN, ROLES.INTERNAL, ROLES.PORTAL]} />,
                        children: [
                            { path: '/dashboard', element: <SuspenseWrapper><DashboardPage /></SuspenseWrapper> },
                            { path: '/subscriptions', element: <SuspenseWrapper><SubscriptionsPage /></SuspenseWrapper> },
                            { path: '/subscriptions/:id', element: <SuspenseWrapper><SubscriptionDetailPage /></SuspenseWrapper> },
                            { path: '/invoices', element: <SuspenseWrapper><InvoicesPage /></SuspenseWrapper> },
                            { path: '/invoices/:id', element: <SuspenseWrapper><InvoiceDetailPage /></SuspenseWrapper> },
                        ],
                    },

                    // ── Admin + Internal ──────────────────────────────────────
                    {
                        element: <RoleBasedRoute allowedRoles={[ROLES.ADMIN, ROLES.INTERNAL]} />,
                        children: [
                            { path: '/products', element: <SuspenseWrapper><ProductsPage /></SuspenseWrapper> },
                            { path: '/products/:id', element: <SuspenseWrapper><ProductDetailPage /></SuspenseWrapper> },
                            { path: '/plans', element: <SuspenseWrapper><PlansPage /></SuspenseWrapper> },
                            { path: '/payments', element: <SuspenseWrapper><PaymentsPage /></SuspenseWrapper> },
                            { path: '/reports', element: <SuspenseWrapper><ReportsPage /></SuspenseWrapper> },
                        ],
                    },

                    // ── Admin Only ────────────────────────────────────────────
                    {
                        element: <RoleBasedRoute allowedRoles={[ROLES.ADMIN]} />,
                        children: [
                            { path: '/discounts', element: <SuspenseWrapper><DiscountsPage /></SuspenseWrapper> },
                            { path: '/taxes', element: <SuspenseWrapper><TaxesPage /></SuspenseWrapper> },
                            { path: '/settings', element: <SuspenseWrapper><SettingsPage /></SuspenseWrapper> },
                        ],
                    },
                ],
            },
        ],
    },

    // ── 404 ───────────────────────────────────────────────────────────────
    {
        path: '*',
        element: <SuspenseWrapper><NotFoundPage /></SuspenseWrapper>,
    },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
