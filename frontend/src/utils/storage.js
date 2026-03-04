/* ==========================================================================
   STORAGE UTILITY
   Centralized localStorage wrapper for token and data persistence.
   
   Separation of Concerns:
   - This module encapsulates ALL direct localStorage access.
   - Other modules (services, contexts) import these helpers instead
     of touching localStorage directly.
   ========================================================================== */

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

// ── Token Management ────────────────────────────────────────────────────────

export const getToken = () => {
    try {
        return localStorage.getItem(TOKEN_KEY);
    } catch {
        return null;
    }
};

export const setToken = (token) => {
    try {
        localStorage.setItem(TOKEN_KEY, token);
    } catch {
        console.error('Failed to save token to localStorage');
    }
};

export const removeToken = () => {
    try {
        localStorage.removeItem(TOKEN_KEY);
    } catch {
        console.error('Failed to remove token from localStorage');
    }
};

// ── User Data Management ────────────────────────────────────────────────────

export const getStoredUser = () => {
    try {
        const user = localStorage.getItem(USER_KEY);
        return user ? JSON.parse(user) : null;
    } catch {
        return null;
    }
};

export const setStoredUser = (user) => {
    try {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch {
        console.error('Failed to save user to localStorage');
    }
};

export const removeStoredUser = () => {
    try {
        localStorage.removeItem(USER_KEY);
    } catch {
        console.error('Failed to remove user from localStorage');
    }
};

// ── Full Cleanup ────────────────────────────────────────────────────────────

export const clearAuthStorage = () => {
    removeToken();
    removeStoredUser();
};
