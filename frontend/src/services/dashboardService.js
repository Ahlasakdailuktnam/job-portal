import * as dashboardApi from '../api/dashboard/dashboard';

export const dashboardService = {
  getCompanyDashboard: async () => {
    const response = await dashboardApi.getCompanyDashboard();
    return response.data;
  },
  getAdminDashboard: async () => {
    const response = await dashboardApi.getAdminDashboard();
    return response.data.data;
  },
};
