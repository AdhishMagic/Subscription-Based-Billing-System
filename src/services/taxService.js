/* ==========================================================================
   TAX SERVICE
   CRUD operations for the Tax Rates domain.
   ========================================================================== */

import api from './api';

const PATH = '/taxes';

export const getAll = (params) => api.get(PATH, { params });
export const getById = (id) => api.get(`${PATH}/${id}`);
export const create = (data) => api.post(PATH, data);
export const update = (id, data) => api.put(`${PATH}/${id}`, data);
export const remove = (id) => api.delete(`${PATH}/${id}`);
