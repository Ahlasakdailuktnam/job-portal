import api from '../axios';

const BASE_URL = '/cvs';

const cvApi = {
  getAll: () => api.get(BASE_URL),
  getById: (id) => api.get(`${BASE_URL}/${id}`),
  create: (data) => {
    return api.post(BASE_URL, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  update: (id, data) => {
    return api.post(`${BASE_URL}/${id}?_method=PUT`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  delete: (id) => api.delete(`${BASE_URL}/${id}`),
  download: (id) => api.get(`${BASE_URL}/${id}/download`, {
    responseType: 'blob',
  }),
};

export default cvApi;