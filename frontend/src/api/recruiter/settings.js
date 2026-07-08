import api from "../axios";

export const getRecruiterSettings = () => api.get("/recruiter/settings");

export const updateRecruiterSettings = (data) =>
  api.put("/recruiter/settings", data);
