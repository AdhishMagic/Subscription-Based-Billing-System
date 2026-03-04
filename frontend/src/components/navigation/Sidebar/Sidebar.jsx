/* ==========================================================================
   SIDEBAR COMPONENT
   Collapsible navigation sidebar for the dashboard layout.
   
   Separation of Concerns:
   - This component handles ONLY navigation rendering.
   - Sidebar state (collapsed / mobile) comes from props (via DashboardLayout).
   - Navigation items are filtered by role using getFilteredNavSections()
     from routeConfig.js — NO role logic lives here.
   - Active state is determined by React Router's NavLink.
   ========================================================================== */

import { NavLink } from 'react-router-dom';
import {
    HiOutlineChevronLeft,
    HiOutlineXMark,
} from 'react-icons/hi2';
import useAuth from '../../../hooks/useAuth';
import { getFilteredNavSections } from '../../../routes/routeConfig';
import './Sidebar.css';

const Sidebar = ({ isCollapsed, isMobileOpen, isMobile, toggleCollapse, closeMobile }) => {
    const { role } = useAuth();

    // Get navigation sections filtered for the current role
    // This reads from the centralized routeConfig — single source of truth
    const filteredSections = getFilteredNavSections(role);

    const sidebarClasses = [
        'sidebar',
        isCollapsed && !isMobile ? 'sidebar--collapsed' : '',
        isMobileOpen ? 'sidebar--mobile-open' : '',
    ].filter(Boolean).join(' ');

    return (
        <>
            {/* Mobile overlay backdrop */}
            {isMobile && isMobileOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={closeMobile}
                    aria-hidden="true"
                />
            )}

            <aside className={sidebarClasses} aria-label="Main navigation">
                {/* ── Brand ──────────────────────────────────────────── */}
                <div className="sidebar__brand">
                    <div className="sidebar__logo">SB</div>
                    <span className="sidebar__brand-name">SubBill</span>
                    {/* Mobile close button */}
                    {isMobile && (
                        <button
                            className="sidebar__mobile-close"
                            onClick={closeMobile}
                            aria-label="Close navigation"
                        >
                            <HiOutlineXMark size={20} />
                        </button>
                    )}
                </div>

                {/* ── Navigation ─────────────────────────────────────── */}
                <nav className="sidebar__nav">
                    {filteredSections.map((section) => (
                        <div className="sidebar__section" key={section.id}>
                            <p className="sidebar__section-title">{section.title}</p>
                            {section.links.map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    className={({ isActive }) =>
                                        `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
                                    }
                                    data-tooltip={link.label}
                                    onClick={isMobile ? closeMobile : undefined}
                                >
                                    <span className="sidebar__link-icon">
                                        <link.icon size={20} />
                                    </span>
                                    <span className="sidebar__link-label">{link.label}</span>
                                </NavLink>
                            ))}
                        </div>
                    ))}
                </nav>

                {/* ── Collapse Toggle (desktop only) ─────────────────── */}
                {!isMobile && (
                    <div className="sidebar__footer">
                        <button
                            className="sidebar__collapse-btn"
                            onClick={toggleCollapse}
                            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                        >
                            <HiOutlineChevronLeft size={18} />
                            <span className="sidebar__collapse-label">Collapse</span>
                        </button>
                    </div>
                )}
            </aside>
        </>
    );
};

export default Sidebar;
