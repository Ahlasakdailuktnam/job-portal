import api from "../axios";

export const getAdminUsers = (params) => api.get("/admin/users", { params });
export const getAdminRecruiters = (params) => api.get("/admin/recruiters", { params });
export const getAdminCompanies = (params) => api.get("/admin/companies", { params });
