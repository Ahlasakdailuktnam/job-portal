import api from '../axios';

const BASE_URL = '/cvs';

const experienceApi = {
  getAll: (cvId) => api.get(`${BASE_URL}/${cvId}/experiences`),
  getAllByCVId: (cvId) => api.get(`${BASE_URL}/${cvId}/experiences`),
  create: (cvId, data) => api.post(`${BASE_URL}/${cvId}/experiences`, data),
  update: (id, data) => api.put(`/experiences/${id}`, data),
  delete: (id) => api.delete(`/experiences/${id}`),
};

export default experienceApi;
