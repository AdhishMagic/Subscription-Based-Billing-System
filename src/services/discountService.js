/* ==========================================================================
   DISCOUNT SERVICE
   CRUD operations for the Discounts / Coupons domain.
   ========================================================================== */

import api from './api';

const PATH = '/discounts';

export const getAll = (params) => api.get(PATH, { params });
export const getById = (id) => api.get(`${PATH}/${id}`);
export const create = (data) => api.post(PATH, data);
export const update = (id, data) => api.put(`${PATH}/${id}`, data);
export const remove = (id) => api.delete(`${PATH}/${id}`);
