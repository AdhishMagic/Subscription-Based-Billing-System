/* ==========================================================================
   AUTH CONTEXT
   Manages authentication state: user object, token, role, loading state.
   
   Separation of Concerns:
   - Context ONLY holds state and provides actions.
   - API calls are delegated to authService.
   - Storage is delegated to utils/storage.
   - Components consume via useAuth() hook — never directly.
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

export const AuthContext = createContext(null);

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
                // Token is invalid — clear everything
                clearAuthStorage();
                setUser(null);
                setTokenState(null);
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
    }), [user, token, role, isAuthenticated, isLoading, login, register, logout]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
