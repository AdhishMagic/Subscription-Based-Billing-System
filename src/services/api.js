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

// ── Shared AbortController Registry ─────────────────────────────────────────
// For Request Cancellation Strategy.
// Usage: api.get('/invoices', { signal: getAbortSignal('fetchInvoices') });
const pendingRequests = new Map();

export const getAbortSignal = (requestKey) => {
    if (pendingRequests.has(requestKey)) {
        // Cancel the previous identical request before sending a new one
        pendingRequests.get(requestKey).abort('Request cancelled due to new identical request.');
    }
    const controller = new AbortController();
    pendingRequests.set(requestKey, controller);
    return controller.signal;
};

// Clean up registry on successful request finish
api.interceptors.response.use((response) => {
    const requestKey = response.config?.meta?.requestKey;
    if (requestKey && pendingRequests.has(requestKey)) {
        pendingRequests.delete(requestKey);
    }
    return response.data;
}, (error) => {
    return Promise.reject(error);
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

// ── Response Interceptor w/ Retry Placeholder ───────────────────────────────
// Normalizes error responses and handles 401 (unauthorized) globally.

api.interceptors.response.use(
    (response) => {
        // Successful response - just pass it through 
        // Note: data extraction is done in the FIRST interceptor above.
        return response;
    },
    async (error) => {
        const { config, response } = error;

        // Clean up from pendingRequests if needed
        const requestKey = config?.meta?.requestKey;
        if (requestKey && pendingRequests.has(requestKey)) {
            pendingRequests.delete(requestKey);
        }

        // Handle request cancellation gracefully
        if (axios.isCancel(error)) {
            console.log('Request cancelled:', error.message);
            return Promise.reject({ isCancelled: true, message: error.message });
        }

        // ── Placeholder: Automated Retry Logic for Idempotent Requests ──
        // if (!config || !config.retry) return Promise.reject(error);
        // config.__retryCount = config.__retryCount || 0;
        // if (config.__retryCount >= config.retry && (response?.status === 503 || !response)) {
        //    config.__retryCount += 1;
        //    return new Promise((resolve) => setTimeout(() => resolve(api(config)), 1000));
        // }

        // Handle network errors
        if (!response) {
            return Promise.reject({
                message: 'Network error. Please check your connection.',
                status: 0,
            });
        }

        const { status, data } = response;

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
