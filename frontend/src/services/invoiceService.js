/* ==========================================================================
   INVOICE SERVICE
   CRUD operations for the Invoices domain.
   ========================================================================== */

import api from './api';

const PATH = '/invoices';

export const getAll = (params) => api.get(PATH, { params });
export const getById = (id) => api.get(`${PATH}/${id}`);
export const create = (data) => api.post(PATH, data);
export const update = (id, data) => api.put(`${PATH}/${id}`, data);
export const remove = (id) => api.delete(`${PATH}/${id}`);
export const sendEmail = (id) => api.post(`${PATH}/${id}/send`);
export const markPaid = (id) => api.patch(`${PATH}/${id}/mark-paid`);
