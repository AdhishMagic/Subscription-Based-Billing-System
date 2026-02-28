/* ==========================================================================
   useSidebar HOOK
   Manages sidebar collapsed state (persisted) and mobile drawer state.
   
   Separation of Concerns:
   - Only manages UI state for the sidebar — no rendering logic.
   - Persists collapsed preference to localStorage.
   - Auto-closes mobile drawer on route change.
   - Exposes isMobile flag based on viewport width.
   ========================================================================== */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const STORAGE_KEY = 'sidebar_collapsed';
const MOBILE_BREAKPOINT = 768;

/**
 * Reads the persisted collapsed preference.
 * Defaults to false (expanded).
 */
const getStoredCollapsed = () => {
    try {
        return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
        return false;
    }
};

const useSidebar = () => {
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(getStoredCollapsed);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(
        () => typeof window !== 'undefined' && window.innerWidth <= MOBILE_BREAKPOINT
    );

    // ── Persist collapsed state ─────────────────────────────────────────
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, String(isCollapsed));
        } catch {
            // Storage unavailable — silently ignore
        }
    }, [isCollapsed]);

    // ── Track viewport width ────────────────────────────────────────────
    useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
        const handler = (e) => setIsMobile(e.matches);

        // Initial check
        setIsMobile(mql.matches);

        mql.addEventListener('change', handler);
        return () => mql.removeEventListener('change', handler);
    }, []);

    // ── Close mobile drawer on route change ─────────────────────────────
    useEffect(() => {
        setIsMobileOpen(false);
    }, [location.pathname]);

    // ── Actions ─────────────────────────────────────────────────────────
    const toggleCollapse = useCallback(() => {
        setIsCollapsed((prev) => !prev);
    }, []);

    const openMobile = useCallback(() => {
        setIsMobileOpen(true);
    }, []);

    const closeMobile = useCallback(() => {
        setIsMobileOpen(false);
    }, []);

    return useMemo(() => ({
        isCollapsed,
        isMobileOpen,
        isMobile,
        toggleCollapse,
        openMobile,
        closeMobile,
    }), [isCollapsed, isMobileOpen, isMobile, toggleCollapse, openMobile, closeMobile]);
};

export default useSidebar;
