import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../services';

export const useCompanyDashboard = () => {
  return useQuery({
    queryKey: ['company-dashboard'],
    queryFn: dashboardService.getCompanyDashboard,
  });
};

export const useAdminDashboard = () => {
  return useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: dashboardService.getAdminDashboard,
  });
};
