import api from "../axios";

export const getCompanyDashboard = () => api.get("/company/dashboard");

export const getAdminDashboard = () => api.get("/admin/dashboard");
