/* ==========================================================================
   PAYMENT SERVICE
   CRUD operations for the Payments domain.
   ========================================================================== */

import api from './api';

const PATH = '/payments';

export const getAll = (params) => api.get(PATH, { params });
export const getById = (id) => api.get(`${PATH}/${id}`);
export const create = (data) => api.post(PATH, data);
export const refund = (id) => api.post(`${PATH}/${id}/refund`);
