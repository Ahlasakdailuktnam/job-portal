import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminService } from "../services/adminService";
import { approveJob, rejectJob } from "../api/job/adminJobServiec";

export const useAdminUsers = (params) => useQuery({
  queryKey: ["admin-users", params],
  queryFn: () => adminService.getUsers(params),
});

export const useAdminRecruiters = (params) => useQuery({
  queryKey: ["admin-recruiters", params],
  queryFn: () => adminService.getRecruiters(params),
});

export const useAdminCompanies = (params) => useQuery({
  queryKey: ["admin-companies", params],
  queryFn: () => adminService.getCompanies(params),
});

export const useAdminPendingJobs = (page = 1) => useQuery({
  queryKey: ["admin-pending-jobs", page],
  queryFn: () => adminService.getPendingJobs(page),
});

export const useAdminPlans = () => useQuery({
  queryKey: ["admin-plans"],
  queryFn: adminService.getPlans,
});

export const useAdminSubscriptions = (params) => useQuery({
  queryKey: ["admin-subscriptions", params],
  queryFn: () => adminService.getSubscriptions(params),
});

export const useApproveAdminJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: approveJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-pending-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard"] });
    },
  });
};

export const useRejectAdminJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: rejectJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-pending-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard"] });
    },
  });
};
