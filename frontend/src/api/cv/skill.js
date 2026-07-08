import api from '../axios';

const BASE_URL = '/cvs';

const skillApi = {
  getAll: (cvId) => api.get(`${BASE_URL}/${cvId}/skills`),
  getAllByCVId: (cvId) => api.get(`${BASE_URL}/${cvId}/skills`),
  create: (cvId, data) => api.post(`${BASE_URL}/${cvId}/skills`, data),
  update: (id, data) => api.put(`/skills/${id}`, data),
  delete: (id) => api.delete(`/skills/${id}`),
};

export default skillApi;
