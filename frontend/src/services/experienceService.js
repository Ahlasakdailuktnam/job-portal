import { experienceApi } from '../api';

export const experienceService = {
  getAll: async (cvId) => {
    const response = await experienceApi.getAllByCVId(cvId);
    return response.data;
  },

  create: async (cvId, data) => {
    const response = await experienceApi.create(cvId, data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await experienceApi.update(id, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await experienceApi.delete(id);
    return response.data;
  },
};