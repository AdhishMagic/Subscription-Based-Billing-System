/* ==========================================================================
   SUBSCRIPTION SERVICE
   CRUD + lifecycle operations for the Subscriptions domain.
   ========================================================================== */

import api from './api';

const PATH = '/subscriptions';

export const getAll = (params) => api.get(PATH, { params });
export const getById = (id) => api.get(`${PATH}/${id}`);
export const create = (data) => api.post(PATH, data);
export const update = (id, data) => api.put(`${PATH}/${id}`, data);
export const remove = (id) => api.delete(`${PATH}/${id}`);

// ── Lifecycle Actions ───────────────────────────────────────────────────────

export const pause = (id) => api.patch(`${PATH}/${id}/pause`);
export const resume = (id) => api.patch(`${PATH}/${id}/resume`);
export const cancel = (id) => api.patch(`${PATH}/${id}/cancel`);
