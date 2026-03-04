/* ==========================================================================
   PUBLIC LAYOUT
   Unauthenticated landing / marketing layout.
   Navbar + content + footer.
   ========================================================================== */

import { Outlet, Link } from 'react-router-dom';
import Button from '../../components/ui/Button/Button';
import './PublicLayout.css';

const PublicLayout = () => (
    <div className="public-layout">
        {/* Navbar */}
        <nav className="public-layout__navbar" aria-label="Public navigation">
            <Link to="/" className="public-layout__brand">
                <div className="public-layout__logo">SB</div>
                <span className="public-layout__name">SubBill</span>
            </Link>
            <div className="public-layout__actions">
                <Link to="/login">
                    <Button variant="ghost" size="sm">Log In</Button>
                </Link>
                <Link to="/register">
                    <Button variant="primary" size="sm">Get Started</Button>
                </Link>
            </div>
        </nav>

        {/* Content */}
        <main className="public-layout__content">
            <Outlet />
        </main>

        {/* Footer */}
        <footer className="public-layout__footer">
            &copy; {new Date().getFullYear()} SubBill. All rights reserved.
        </footer>
    </div>
);

export default PublicLayout;
