/* ==========================================================================
   AUTH CONTEXT
   Manages authentication state: user object, token, role, loading state.
   
   Architecture:
   - Context ONLY holds state and provides actions.
   - API calls are delegated to authService.
   - Storage is delegated to utils/storage.
   - Components consume via useAuth() hook — never directly.
   
   Role Simulation (Development):
   - switchRole() allows dev-time role switching without a backend.
   - This function will be removed/disabled in production.
   
   Token Persistence Strategy:
   - Token is stored in localStorage via utils/storage.
   - On mount, verifyAuth() checks if a stored token is still valid.
   - If the backend is unavailable, the stored user is trusted (dev mode).
   - Role is derived from user.role — never stored separately.
   ========================================================================== */

import { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import * as authService from '../services/authService';
import {
    getToken,
    setToken,
    removeToken,
    getStoredUser,
    setStoredUser,
    clearAuthStorage,
} from '../utils/storage';
import { ROLES } from '../utils/constants';

export const AuthContext = createContext(null);

// ── Default simulated users for development ─────────────────────────────────

const SIMULATED_USERS = {
    [ROLES.ADMIN]: {
        id: 'dev-admin-001',
        name: 'Admin User',
        email: 'admin@subbill.dev',
        role: ROLES.ADMIN,
        avatar: null,
    },
    [ROLES.INTERNAL]: {
        id: 'dev-internal-001',
        name: 'Internal User',
        email: 'internal@subbill.dev',
        role: ROLES.INTERNAL,
        avatar: null,
    },
    [ROLES.PORTAL]: {
        id: 'dev-portal-001',
        name: 'Portal User',
        email: 'portal@subbill.dev',
        role: ROLES.PORTAL,
        avatar: null,
    },
};

export const AuthProvider = ({ children }) => {
    // ── State ───────────────────────────────────────────────────────────────

    const [user, setUser] = useState(getStoredUser);
    const [token, setTokenState] = useState(getToken);
    const [isLoading, setIsLoading] = useState(true);

    // ── Derived Values ──────────────────────────────────────────────────────

    const isAuthenticated = !!token && !!user;
    const role = user?.role || null;

    // ── Bootstrap: verify stored token on mount ─────────────────────────────

    useEffect(() => {
        const verifyAuth = async () => {
            const storedToken = getToken();
            if (!storedToken) {
                setIsLoading(false);
                return;
            }

            try {
                const data = await authService.getMe();
                setUser(data.user || data);
                setStoredUser(data.user || data);
            } catch {
                // Backend unavailable — trust stored user data in dev mode
                const storedUser = getStoredUser();
                if (storedUser) {
                    setUser(storedUser);
                } else {
                    clearAuthStorage();
                    setUser(null);
                    setTokenState(null);
                }
            } finally {
                setIsLoading(false);
            }
        };

        verifyAuth();
    }, []);

    // ── Actions ─────────────────────────────────────────────────────────────

    const login = useCallback(async (credentials) => {
        const data = await authService.login(credentials);
        const { user: loggedInUser, token: newToken } = data;

        setToken(newToken);
        setStoredUser(loggedInUser);
        setTokenState(newToken);
        setUser(loggedInUser);

        return data;
    }, []);

    const register = useCallback(async (formData) => {
        const data = await authService.register(formData);
        const { user: newUser, token: newToken } = data;

        setToken(newToken);
        setStoredUser(newUser);
        setTokenState(newToken);
        setUser(newUser);

        return data;
    }, []);

    const logout = useCallback(async () => {
        try {
            await authService.logout();
        } catch {
            // Fail silently — we're clearing local state regardless.
        } finally {
            clearAuthStorage();
            setUser(null);
            setTokenState(null);
        }
    }, []);

    /**
     * DEV ONLY: Switch the current user's role without re-authenticating.
     * Simulates JWT-based role changes for frontend testing.
     * @param {string} newRole - One of ROLES.ADMIN | ROLES.INTERNAL | ROLES.PORTAL
     */
    const switchRole = useCallback((newRole) => {
        const simulatedUser = SIMULATED_USERS[newRole];
        if (!simulatedUser) {
            console.error(`[AuthContext] Invalid role: "${newRole}"`);
            return;
        }

        const devToken = `dev-token-${newRole}-${Date.now()}`;

        setToken(devToken);
        setStoredUser(simulatedUser);
        setTokenState(devToken);
        setUser(simulatedUser);
    }, []);

    // ── Memoized Context Value ──────────────────────────────────────────────

    const value = useMemo(() => ({
        user,
        token,
        role,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        switchRole,  // DEV ONLY — remove in production
    }), [user, token, role, isAuthenticated, isLoading, login, register, logout, switchRole]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
