import * as jobApi from "../api/job/job";
export const fetchJobs = async (params) => {
  const res = await jobApi.getJobs(params);
  const data = res.data.data;
  return {
    jobs: data.data,
    pagination: {
      currentPage: data.current_page,
      lastPage: data.last_page,
      total: data.total,
      from: data.from,
      to: data.to,
    },
  };
};

export const removeJob = async (id) => {
  const res = await jobApi.deleteJob(id);

  return res.data;
};
export const createJobService = async (data) => {
  const res = await jobApi.createJob(data);
  return res.data;
};
export const fetchMyJobs = async (params) => {
  const res = await jobApi.getMyJobs(params);

  const data = res.data.data;

  return {
    jobs: data.data,
    pagination: {
      currentPage: data.current_page,
      lastPage: data.last_page,
      total: data.total,
      from: data.from,
      to: data.to,
    },
  };
};
export const fetchMyJobById = async (id) => {
  const res = await jobApi.getMyJobById(id);
  return res.data.data;
};

export const fetchJobById = async (id) => {
const res = await jobApi.getJobById(id);
return res.data.data;

};
export const updateJobService = async (id, data) => {
  const res = await jobApi.updateJob(id, data);
  return res.data;
};

// Save
export const saveJobService = async (jobId) => {
  const res = await jobApi.saveJob(jobId);
  return res.data;
};

// Unsave
export const unsaveJobService = async (jobId) => {
  const res = await jobApi.unsaveJob(jobId);
  return res.data;
};

// My Saved Jobs
export const fetchSavedJobs = async (params) => {
  const res = await jobApi.getMySavedJobs(params);

  const data = res.data.data;

  return {
    jobs: data.data,
    pagination: {
      currentPage: data.current_page,
      lastPage: data.last_page,
      total: data.total,
      from: data.from,
      to: data.to,
    },
  };
};

export const closeJobService = async (id) => {
  const res = await jobApi.closeJob(id);
  return res.data;
};

export const reopenJobService = async (id) => {
  const res = await jobApi.reopenJob(id);
  return res.data;
};
