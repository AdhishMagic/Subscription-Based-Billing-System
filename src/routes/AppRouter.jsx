/* ==========================================================================
   APP ROUTER
   Central routing configuration with lazy-loaded pages.
   
   Architecture:
   ┌─ PublicRoute (blocks authenticated users)
   │  └─ AuthLayout
   │     ├── /login         → LoginPage
   │     └── /register      → RegisterPage
   ├─ ProtectedRoute (auth gate)
   │  └─ DashboardLayout
   │     ├── RoleBasedRoute [all roles]
   │     │   ├── /dashboard
   │     │   ├── /subscriptions
   │     │   └── /invoices
   │     ├── RoleBasedRoute [admin, internal]
   │     │   ├── /products
   │     │   ├── /plans
   │     │   ├── /payments
   │     │   └── /reports
   │     └── RoleBasedRoute [admin]
   │         ├── /discounts
   │         ├── /taxes
   │         ├── /users
   │         └── /settings
   ├─ /unauthorized → UnauthorizedPage
   └─ *             → NotFoundPage
   
   Key Principles:
   - Routes are the SINGLE place where pages are wired up.
   - Role permissions come from routeConfig.js (centralized).
   - Auth checks are layered: ProtectedRoute → RoleBasedRoute.
   - PublicRoute prevents authenticated users from reaching login/register.
   - All pages are lazy-loaded for automatic code splitting.
   ========================================================================== */

import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Spinner from '../components/ui/Spinner/Spinner';
import ProtectedRoute from './ProtectedRoute';
import RoleBasedRoute from './RoleBasedRoute';
import PublicRoute from './PublicRoute';
import { PERMISSION_GROUPS, ROUTES } from './routeConfig';

// ── Layouts (not lazy — always needed) ──────────────────────────────────────
import DashboardLayout from '../layouts/DashboardLayout/DashboardLayout';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';

// ── Lazy-Loaded Pages (code splitting per route) ────────────────────────────
const DashboardPage = lazy(() => import('../pages/Dashboard/DashboardPage'));
const LoginPage = lazy(() => import('../pages/Auth/LoginPage'));
const RegisterPage = lazy(() => import('../pages/Auth/RegisterPage'));
const ResetPasswordPage = lazy(() => import('../pages/Auth/ResetPasswordPage'));
const ProductsPage = lazy(() => import('../pages/Products/ProductsPage'));
const ProductDetailPage = lazy(() => import('../pages/Products/ProductDetailPage'));
const PlansPage = lazy(() => import('../pages/Plans/PlansPage'));
const PlanFormPage = lazy(() => import('../pages/Plans/PlanFormPage'));
const SubscriptionsPage = lazy(() => import('../pages/Subscriptions/SubscriptionsPage'));
const SubscriptionCreatePage = lazy(() => import('../pages/Subscriptions/SubscriptionCreatePage'));
const SubscriptionDetailPage = lazy(() => import('../pages/Subscriptions/SubscriptionDetailPage'));
const InvoicesPage = lazy(() => import('../pages/Invoices/InvoicesPage'));
const InvoiceDetailPage = lazy(() => import('../pages/Invoices/InvoiceDetailPage'));
const PaymentsPage = lazy(() => import('../pages/Payments/PaymentsPage'));
const DiscountsPage = lazy(() => import('../pages/Discounts/DiscountsPage'));
const TaxesPage = lazy(() => import('../pages/Taxes/TaxesPage'));
const ReportsPage = lazy(() => import('../pages/Reports/ReportsPage'));
const SettingsPage = lazy(() => import('../pages/Settings/SettingsPage'));
const UnauthorizedPage = lazy(() => import('../pages/Unauthorized/UnauthorizedPage'));
const NotFoundPage = lazy(() => import('../pages/NotFound/NotFoundPage'));

// ── Suspense Wrapper ────────────────────────────────────────────────────────
const SuspenseWrapper = ({ children }) => (
    <Suspense fallback={<Spinner size="lg" />}>
        {children}
    </Suspense>
);

// ── Router Definition ───────────────────────────────────────────────────────
const router = createBrowserRouter([
    // ── Root redirect ─────────────────────────────────────────────────────
    {
        path: '/',
        element: <Navigate to={ROUTES.LOGIN} replace />,
    },

    // ── Public Routes (blocked for authenticated users) ───────────────────
    {
        element: <PublicRoute />,
        children: [
            {
                element: <AuthLayout />,
                children: [
                    {
                        path: ROUTES.LOGIN,
                        element: <SuspenseWrapper><LoginPage /></SuspenseWrapper>,
                    },
                    {
                        path: ROUTES.REGISTER,
                        element: <SuspenseWrapper><RegisterPage /></SuspenseWrapper>,
                    },
                    {
                        path: ROUTES.RESET_PASSWORD,
                        element: <SuspenseWrapper><ResetPasswordPage /></SuspenseWrapper>,
                    },
                ],
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
                    // ── All Roles ─────────────────────────────────────────
                    {
                        element: <RoleBasedRoute allowedRoles={PERMISSION_GROUPS.ALL_ROLES} />,
                        children: [
                            { path: ROUTES.DASHBOARD, element: <SuspenseWrapper><DashboardPage /></SuspenseWrapper> },
                            { path: ROUTES.SUBSCRIPTIONS, element: <SuspenseWrapper><SubscriptionsPage /></SuspenseWrapper> },
                            { path: ROUTES.SUBSCRIPTION_CREATE, element: <SuspenseWrapper><SubscriptionCreatePage /></SuspenseWrapper> },
                            { path: ROUTES.SUBSCRIPTION_DETAIL, element: <SuspenseWrapper><SubscriptionDetailPage /></SuspenseWrapper> },
                            { path: ROUTES.INVOICES, element: <SuspenseWrapper><InvoicesPage /></SuspenseWrapper> },
                            { path: ROUTES.INVOICE_DETAIL, element: <SuspenseWrapper><InvoiceDetailPage /></SuspenseWrapper> },
                        ],
                    },

                    // ── Admin + Internal ──────────────────────────────────
                    {
                        element: <RoleBasedRoute allowedRoles={PERMISSION_GROUPS.ADMIN_INTERNAL} />,
                        children: [
                            { path: ROUTES.PRODUCTS, element: <SuspenseWrapper><ProductsPage /></SuspenseWrapper> },
                            { path: ROUTES.PRODUCT_DETAIL, element: <SuspenseWrapper><ProductDetailPage /></SuspenseWrapper> },
                            { path: ROUTES.PLANS, element: <SuspenseWrapper><PlansPage /></SuspenseWrapper> },
                            { path: ROUTES.PLAN_CREATE, element: <SuspenseWrapper><PlanFormPage /></SuspenseWrapper> },
                            { path: ROUTES.PLAN_EDIT, element: <SuspenseWrapper><PlanFormPage /></SuspenseWrapper> },
                            { path: ROUTES.PAYMENTS, element: <SuspenseWrapper><PaymentsPage /></SuspenseWrapper> },
                            { path: ROUTES.REPORTS, element: <SuspenseWrapper><ReportsPage /></SuspenseWrapper> },
                        ],
                    },

                    // ── Admin Only ────────────────────────────────────────
                    {
                        element: <RoleBasedRoute allowedRoles={PERMISSION_GROUPS.ADMIN_ONLY} />,
                        children: [
                            { path: ROUTES.DISCOUNTS, element: <SuspenseWrapper><DiscountsPage /></SuspenseWrapper> },
                            { path: ROUTES.TAXES, element: <SuspenseWrapper><TaxesPage /></SuspenseWrapper> },
                            { path: ROUTES.SETTINGS, element: <SuspenseWrapper><SettingsPage /></SuspenseWrapper> },
                        ],
                    },
                ],
            },
        ],
    },

    // ── Unauthorized (403) ────────────────────────────────────────────────
    {
        path: ROUTES.UNAUTHORIZED,
        element: <SuspenseWrapper><UnauthorizedPage /></SuspenseWrapper>,
    },

    // ── 404 ───────────────────────────────────────────────────────────────
    {
        path: '*',
        element: <SuspenseWrapper><NotFoundPage /></SuspenseWrapper>,
    },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
