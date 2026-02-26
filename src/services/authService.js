/* ==========================================================================
   AUTH SERVICE
   Handles all authentication-related API calls.
   Concern: Only auth endpoints. Token storage is delegated to utils/storage.
   ========================================================================== */

import api from './api';

const AUTH_PATH = '/auth';

/**
 * Login with email and password.
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<{ user: object, token: string }>}
 */
export const login = (credentials) => {
    return api.post(`${AUTH_PATH}/login`, credentials);
};

/**
 * Register a new user.
 * @param {{ name: string, email: string, password: string, role?: string }} data
 * @returns {Promise<{ user: object, token: string }>}
 */
export const register = (data) => {
    return api.post(`${AUTH_PATH}/register`, data);
};

/**
 * Get the currently authenticated user profile.
 * @returns {Promise<{ user: object }>}
 */
export const getMe = () => {
    return api.get(`${AUTH_PATH}/me`);
};

/**
 * Logout (server-side session invalidation if applicable).
 * @returns {Promise<void>}
 */
export const logout = () => {
    return api.post(`${AUTH_PATH}/logout`);
};

/**
 * Request a password reset email.
 * @param {{ email: string }} data
 * @returns {Promise<void>}
 */
export const forgotPassword = (data) => {
    return api.post(`${AUTH_PATH}/forgot-password`, data);
};

/**
 * Reset password with token.
 * @param {string} token
 * @param {{ password: string }} data
 * @returns {Promise<void>}
 */
export const resetPassword = (token, data) => {
    return api.post(`${AUTH_PATH}/reset-password/${token}`, data);
};
