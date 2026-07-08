import { skillApi } from '../api';

export const skillService = {
  getAll: async (cvId) => {
    const response = await skillApi.getAllByCVId(cvId);
    return response.data;
  },

  create: async (cvId, data) => {
    const response = await skillApi.create(cvId, data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await skillApi.update(id, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await skillApi.delete(id);
    return response.data;
  },
};
