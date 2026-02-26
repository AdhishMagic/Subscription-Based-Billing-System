/* ==========================================================================
   TOPBAR COMPONENT
   Top header bar for the dashboard layout.
   
   Separation of Concerns:
   - Renders page title, notification icon, and user profile.
   - Auth/user data comes from useAuth().
   - Page title could come from a route config or context (extensible).
   ========================================================================== */

import { useLocation } from 'react-router-dom';
import { HiOutlineBell } from 'react-icons/hi2';
import useAuth from '../../../hooks/useAuth';
import Avatar from '../../ui/Avatar/Avatar';
import { capitalize } from '../../../utils/formatters';
import './TopBar.css';

/**
 * Derives a page title from the current URL pathname.
 * Example: '/subscriptions' → 'Subscriptions'
 */
const getPageTitle = (pathname) => {
    const segment = pathname.split('/').filter(Boolean)[0] || 'dashboard';
    return capitalize(segment);
};

const TopBar = () => {
    const { user } = useAuth();
    const location = useLocation();
    const pageTitle = getPageTitle(location.pathname);

    return (
        <header className="topbar">
            <div className="topbar__left">
                <h1 className="topbar__page-title">{pageTitle}</h1>
            </div>

            <div className="topbar__right">
                <button className="topbar__icon-btn" aria-label="Notifications">
                    <HiOutlineBell size={20} />
                </button>

                <div className="topbar__user">
                    <div className="topbar__user-info">
                        <p className="topbar__user-name">{user?.name || 'User'}</p>
                        <p className="topbar__user-role">{user?.role || 'guest'}</p>
                    </div>
                    <Avatar name={user?.name || 'U'} src={user?.avatar} size="md" />
                </div>
            </div>
        </header>
    );
};

export default TopBar;
