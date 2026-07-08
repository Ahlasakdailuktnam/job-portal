import * as applicationApi from '../api/job/application';

const normalizePagination = (data) => ({
  applications: data.data || [],
  pagination: {
    currentPage: data.current_page,
    lastPage: data.last_page,
    total: data.total,
    from: data.from,
    to: data.to,
  },
});

export const applicationService = {
  apply: async (jobId, data) => {
    const response = await applicationApi.applyToJob(jobId, data);
    return response.data;
  },
  getMine: async () => {
    const response = await applicationApi.getMyApplications();
    return response.data.data;
  },
  getCompanyApplications: async (params) => {
    const response = await applicationApi.getCompanyApplications(params);
    return normalizePagination(response.data.data);
  },
  getById: async (id) => {
    const response = await applicationApi.getApplication(id);
    return response.data.data;
  },
  updateStatus: async (id, status) => {
    const response = await applicationApi.updateApplicationStatus(id, status);
    return response.data;
  },
};
