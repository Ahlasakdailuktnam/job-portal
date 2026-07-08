import api from '../axios';

const BASE_URL = '/cvs';

const educationApi = {
  getAll: (cvId) => api.get(`${BASE_URL}/${cvId}/educations`),
  getAllByCVId: (cvId) => api.get(`${BASE_URL}/${cvId}/educations`),
  create: (cvId, data) => api.post(`${BASE_URL}/${cvId}/educations`, data),
  update: (id, data) => api.put(`/educations/${id}`, data),
  delete: (id) => api.delete(`/educations/${id}`),
};

export default educationApi;
