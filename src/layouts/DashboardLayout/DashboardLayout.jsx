/* ==========================================================================
   DASHBOARD LAYOUT
   Main authenticated layout: Sidebar + TopBar + content outlet.
   
   Separation of Concerns:
   - Layout only handles STRUCTURE (where things sit on screen).
   - Navigation rendering is delegated to Sidebar/TopBar components.
   - Page content is rendered via React Router's <Outlet />.
   ========================================================================== */

import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/navigation/Sidebar/Sidebar';
import TopBar from '../../components/navigation/TopBar/TopBar';
import './DashboardLayout.css';

const DashboardLayout = () => (
    <div className="dashboard-layout">
        <Sidebar />
        <TopBar />
        <main className="dashboard-layout__content">
            <Outlet />
        </main>
    </div>
);

export default DashboardLayout;
