import { educationApi } from '../api';

export const educationService = {
  getAll: async (cvId) => {
    const response = await educationApi.getAllByCVId(cvId);
    return response.data;
  },

  create: async (cvId, data) => {
    const response = await educationApi.create(cvId, data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await educationApi.update(id, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await educationApi.delete(id);
    return response.data;
  },
};