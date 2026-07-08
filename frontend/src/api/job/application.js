import api from "../axios";

export const applyToJob = (jobId, data) => api.post(`/jobs/${jobId}/apply`, data);

export const getMyApplications = () => api.get("/my-applications");

export const getCompanyApplications = (params) =>
  api.get("/company/applications", { params });

export const getApplication = (id) => api.get(`/applications/${id}`);

export const updateApplicationStatus = (id, status) =>
  api.put(`/applications/${id}`, { status });
