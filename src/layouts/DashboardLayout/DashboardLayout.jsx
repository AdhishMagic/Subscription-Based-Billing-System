/* ==========================================================================
   DASHBOARD LAYOUT
   Main authenticated layout: Sidebar + TopBar + content outlet.
   
   Separation of Concerns:
   - Layout manages STRUCTURE (where things sit on screen).
   - Sidebar state is managed by useSidebar hook and passed as props.
   - Navigation rendering is delegated to Sidebar/TopBar components.
   - Page content is rendered via React Router's <Outlet />.
   ========================================================================== */

import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/navigation/Sidebar/Sidebar';
import TopBar from '../../components/navigation/TopBar/TopBar';
import useSidebar from '../../hooks/useSidebar';
import './DashboardLayout.css';

const DashboardLayout = () => {
    const {
        isCollapsed,
        isMobileOpen,
        isMobile,
        toggleCollapse,
        openMobile,
        closeMobile,
    } = useSidebar();

    // Compute current sidebar width for CSS transitions
    const currentSidebarWidth = isMobile
        ? '0px'
        : isCollapsed
            ? 'var(--sidebar-collapsed-width)'
            : 'var(--sidebar-width)';

    return (
        <div
            className="dashboard-layout"
            style={{ '--current-sidebar-width': currentSidebarWidth }}
        >
            <Sidebar
                isCollapsed={isCollapsed}
                isMobileOpen={isMobileOpen}
                isMobile={isMobile}
                toggleCollapse={toggleCollapse}
                closeMobile={closeMobile}
            />

            <TopBar
                isMobile={isMobile}
                openMobile={openMobile}
            />

            <main className="dashboard-layout__content">
                <div className="dashboard-layout__container">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
