/* ==========================================================================
   API CLIENT
   Centralized Axios instance with request/response interceptors.
   
   Separation of Concerns:
   - This module ONLY handles HTTP transport configuration.
   - Auth token injection is handled by the request interceptor.
   - Error normalization is handled by the response interceptor.
   - Individual service modules import this instance for domain-specific calls.
   ========================================================================== */

import axios from 'axios';
import { getToken, removeToken } from '../utils/storage';

// ── Axios Instance ──────────────────────────────────────────────────────────

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// ── Request Interceptor ─────────────────────────────────────────────────────
// Attaches the Authorization header if a token exists in localStorage.

api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ── Response Interceptor ────────────────────────────────────────────────────
// Normalizes error responses and handles 401 (unauthorized) globally.

api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        // Handle network errors
        if (!error.response) {
            return Promise.reject({
                message: 'Network error. Please check your connection.',
                status: 0,
            });
        }

        const { status, data } = error.response;

        // Auto-logout on 401 (expired / invalid token)
        if (status === 401) {
            removeToken();
            window.location.href = '/login';
            return Promise.reject({
                message: 'Session expired. Please log in again.',
                status,
            });
        }

        // Normalize error shape
        return Promise.reject({
            message: data?.message || 'An unexpected error occurred.',
            errors: data?.errors || null,
            status,
        });
    }
);

export default api;
