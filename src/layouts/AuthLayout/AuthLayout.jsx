/* ==========================================================================
   AUTH LAYOUT
   Centered glass card for login / register pages.
   
   Separation of Concerns:
   - Layout provides the visual frame (gradient BG + glass card).
   - Form content is rendered via <Outlet />.
   ========================================================================== */

import { Outlet } from 'react-router-dom';
import './AuthLayout.css';

const AuthLayout = () => (
    <div className="auth-layout">
        <div className="auth-layout__card">
            <div className="auth-layout__brand">
                <div className="auth-layout__logo">SB</div>
                <h1 className="auth-layout__title">SubBill</h1>
                <p className="auth-layout__subtitle">Subscription Management System</p>
            </div>
            <Outlet />
        </div>
    </div>
);

export default AuthLayout;
