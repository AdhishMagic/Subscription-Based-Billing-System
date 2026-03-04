/* ==========================================================================
   REPORT SERVICE
   Read-only endpoints for analytics & reporting.
   ========================================================================== */

import api from './api';

const PATH = '/reports';

export const getDashboardStats = () => api.get(`${PATH}/dashboard`);
export const getRevenueReport = (params) => api.get(`${PATH}/revenue`, { params });
export const getSubscriptionReport = (params) => api.get(`${PATH}/subscriptions`, { params });
export const getChurnReport = (params) => api.get(`${PATH}/churn`, { params });
export const exportReport = (type, params) => api.get(`${PATH}/export/${type}`, {
    params,
    responseType: 'blob',
});
