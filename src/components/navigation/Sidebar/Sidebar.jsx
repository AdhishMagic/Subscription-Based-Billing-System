/* ==========================================================================
   SIDEBAR COMPONENT
   Main navigation sidebar for the dashboard layout.
   
   Separation of Concerns:
   - This component handles ONLY navigation rendering.
   - Route config is imported from routes/routeConfig.
   - Auth state (role) is read from useAuth() to filter links.
   - Active state is determined by React Router's useLocation().
   ========================================================================== */

import { NavLink } from 'react-router-dom';
import {
    HiOutlineHome,
    HiOutlineCube,
    HiOutlineRectangleStack,
    HiOutlineArrowPath,
    HiOutlineDocumentText,
    HiOutlineCreditCard,
    HiOutlineTag,
    HiOutlineReceiptPercent,
    HiOutlineChartBarSquare,
    HiOutlineCog6Tooth,
} from 'react-icons/hi2';
import useAuth from '../../../hooks/useAuth';
import { ROLES } from '../../../utils/constants';
import './Sidebar.css';

/* ── Navigation Config ──────────────────────────────────────────────────── */

const navSections = [
    {
        title: 'Overview',
        links: [
            { to: '/dashboard', label: 'Dashboard', icon: HiOutlineHome, roles: [ROLES.ADMIN, ROLES.INTERNAL, ROLES.PORTAL] },
        ],
    },
    {
        title: 'Catalog',
        links: [
            { to: '/products', label: 'Products', icon: HiOutlineCube, roles: [ROLES.ADMIN, ROLES.INTERNAL] },
            { to: '/plans', label: 'Plans', icon: HiOutlineRectangleStack, roles: [ROLES.ADMIN, ROLES.INTERNAL] },
        ],
    },
    {
        title: 'Billing',
        links: [
            { to: '/subscriptions', label: 'Subscriptions', icon: HiOutlineArrowPath, roles: [ROLES.ADMIN, ROLES.INTERNAL, ROLES.PORTAL] },
            { to: '/invoices', label: 'Invoices', icon: HiOutlineDocumentText, roles: [ROLES.ADMIN, ROLES.INTERNAL, ROLES.PORTAL] },
            { to: '/payments', label: 'Payments', icon: HiOutlineCreditCard, roles: [ROLES.ADMIN, ROLES.INTERNAL] },
        ],
    },
    {
        title: 'Configuration',
        links: [
            { to: '/discounts', label: 'Discounts', icon: HiOutlineTag, roles: [ROLES.ADMIN] },
            { to: '/taxes', label: 'Taxes', icon: HiOutlineReceiptPercent, roles: [ROLES.ADMIN] },
        ],
    },
    {
        title: 'Analytics',
        links: [
            { to: '/reports', label: 'Reports', icon: HiOutlineChartBarSquare, roles: [ROLES.ADMIN, ROLES.INTERNAL] },
        ],
    },
    {
        title: 'System',
        links: [
            { to: '/settings', label: 'Settings', icon: HiOutlineCog6Tooth, roles: [ROLES.ADMIN] },
        ],
    },
];

const Sidebar = () => {
    const { role } = useAuth();

    return (
        <aside className="sidebar">
            {/* Brand */}
            <div className="sidebar__brand">
                <div className="sidebar__logo">SB</div>
                <span className="sidebar__brand-name">SubBill</span>
            </div>

            {/* Navigation */}
            <nav className="sidebar__nav" aria-label="Main navigation">
                {navSections.map((section) => {
                    // Filter links by current user role
                    const visibleLinks = section.links.filter(
                        (link) => link.roles.includes(role)
                    );

                    if (visibleLinks.length === 0) return null;

                    return (
                        <div key={section.title}>
                            <p className="sidebar__section-title">{section.title}</p>
                            {visibleLinks.map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    className={({ isActive }) =>
                                        `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
                                    }
                                >
                                    <span className="sidebar__link-icon">
                                        <link.icon size={20} />
                                    </span>
                                    <span>{link.label}</span>
                                </NavLink>
                            ))}
                        </div>
                    );
                })}
            </nav>
        </aside>
    );
};

export default Sidebar;
