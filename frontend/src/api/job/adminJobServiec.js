import api from "../axios";

export const getPendingJobs = async (page = 1) => {
const res = await api.get(
`/admin/jobs/pending?page=${page}`
);

return res.data;
};

export const approveJob = async (id) => {
const res = await api.put(
`/admin/jobs/${id}/approve`
);

return res.data;
};

export const rejectJob = async (id) => {
const res = await api.put(
`/admin/jobs/${id}/reject`
);

return res.data;
};
