/* ==========================================================================
   TOPBAR COMPONENT
   Top header bar for the dashboard layout.
   
   Separation of Concerns:
   - Renders page title, search input (UI-only), dark mode toggle,
     notification icon, and user profile dropdown.
   - Auth/user data comes from useAuth().
   - Theme toggle comes from useTheme().
   - Mobile hamburger triggers sidebar open via openMobile prop.
   ========================================================================== */

import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {
    HiOutlineBell,
    HiOutlineMagnifyingGlass,
    HiOutlineSun,
    HiOutlineMoon,
    HiOutlineBars3,
    HiOutlineUser,
    HiOutlineCog6Tooth,
    HiOutlineArrowRightOnRectangle,
} from 'react-icons/hi2';
import useAuth from '../../../hooks/useAuth';
import useTheme from '../../../hooks/useTheme';
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

const TopBar = ({ isMobile, openMobile }) => {
    const { user, logout } = useAuth();
    const { isDark, toggleTheme } = useTheme();
    const location = useLocation();
    const pageTitle = getPageTitle(location.pathname);

    // ── User Dropdown State ─────────────────────────────────────────────
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
        };
        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isDropdownOpen]);

    // Close dropdown on route change
    useEffect(() => {
        setIsDropdownOpen(false);
    }, [location.pathname]);

    return (
        <header className="topbar">
            <div className="topbar__left">
                {/* Mobile hamburger */}
                {isMobile && (
                    <button
                        className="topbar__icon-btn topbar__hamburger"
                        onClick={openMobile}
                        aria-label="Open navigation"
                    >
                        <HiOutlineBars3 size={22} />
                    </button>
                )}

                <h1 className="topbar__page-title">{pageTitle}</h1>
            </div>

            <div className="topbar__center">
                {/* Search Input (UI-only) */}
                <div className="topbar__search">
                    <HiOutlineMagnifyingGlass className="topbar__search-icon" size={16} />
                    <input
                        type="text"
                        className="topbar__search-input"
                        placeholder="Search..."
                        aria-label="Search"
                    />
                </div>
            </div>

            <div className="topbar__right">
                {/* Dark Mode Toggle */}
                <button
                    className="topbar__icon-btn"
                    onClick={toggleTheme}
                    aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                    {isDark ? <HiOutlineSun size={20} /> : <HiOutlineMoon size={20} />}
                </button>

                {/* Notification Icon */}
                <button className="topbar__icon-btn topbar__notification" aria-label="Notifications">
                    <HiOutlineBell size={20} />
                    <span className="topbar__notification-dot" />
                </button>

                {/* User Profile & Dropdown */}
                <div className="topbar__user-wrapper" ref={dropdownRef}>
                    <button
                        className="topbar__user"
                        onClick={() => setIsDropdownOpen((prev) => !prev)}
                        aria-expanded={isDropdownOpen}
                        aria-haspopup="menu"
                    >
                        <div className="topbar__user-info">
                            <p className="topbar__user-name">{user?.name || 'User'}</p>
                            <p className="topbar__user-role">{user?.role || 'guest'}</p>
                        </div>
                        <Avatar name={user?.name || 'U'} src={user?.avatar} size="md" />
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="topbar__dropdown" role="menu">
                            <button
                                className="topbar__dropdown-item"
                                role="menuitem"
                                onClick={() => setIsDropdownOpen(false)}
                            >
                                <HiOutlineUser size={16} />
                                <span>Profile</span>
                            </button>
                            <button
                                className="topbar__dropdown-item"
                                role="menuitem"
                                onClick={() => setIsDropdownOpen(false)}
                            >
                                <HiOutlineCog6Tooth size={16} />
                                <span>Settings</span>
                            </button>
                            <div className="topbar__dropdown-divider" />
                            <button
                                className="topbar__dropdown-item topbar__dropdown-item--danger"
                                role="menuitem"
                                onClick={() => {
                                    setIsDropdownOpen(false);
                                    logout?.();
                                }}
                            >
                                <HiOutlineArrowRightOnRectangle size={16} />
                                <span>Logout</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default TopBar;
