import api from "../axios";

// Get all jobs
export const getJobs = (params) =>
  api.get("/jobs", {
    params,
  });

// Get single job
export const getJob = (id) => api.get(`/jobs/${id}`);

// Create job
export const createJob = (data) => api.post("/jobs", data);

// Delete job
export const deleteJob = (id) => api.delete(`/jobs/${id}`);

// Get my jobs
export const getMyJobs = (params) =>
  api.get("/my-jobs", {
    params,
  });

// Close job
export const closeJob = (id) => api.post(`/jobs/${id}/close`);

// Reopen job
export const reopenJob = (id) => api.post(`/jobs/${id}/reopen`);

// Get job by id
export const getJobById = (id) => api.get(`/jobs/${id}`);

// Get my job by id
export const getMyJobById = (id) => api.get(`/my-jobs/${id}`);

// Update job
export const updateJob = (id, data) => api.put(`/jobs/${id}`, data);

// Create admin job
export const createAdminJob = (data) => api.post("/admin/jobs", data);

// Save Job
export const saveJob = (jobId) => {
  return api.post(`/jobs/${jobId}/save`);
};

// Unsave Job
export const unsaveJob = (jobId) => {
  return api.delete(`/jobs/${jobId}/save`);
};

// Get My Saved Jobs
export const getMySavedJobs = (params) => {
  return api.get("/saved-jobs", {
    params,
  });
};
