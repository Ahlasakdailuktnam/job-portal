// hook/useJob.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  closeJobService,
  fetchJobById,
  fetchJobs,
  fetchMyJobById,
  fetchSavedJobs,
  reopenJobService,
  saveJobService,
  unsaveJobService,
  updateJobService,
} from "../services/jobServieces";

// Public Jobs
export const useJob = (params) => {
  return useQuery({
    queryKey: ["jobs", params],
    queryFn: () => fetchJobs(params),
    staleTime: 1000 * 60 * 5,
  });
};

// Recruiter View One Job
export const useMyJob = (id) => {
  return useQuery({
    queryKey: ["my-job", id],
    queryFn: () => fetchMyJobById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

// Public active job
export const useJobDetail = (id) => {
  return useQuery({
    queryKey: ["job-detail", id],
    queryFn: () => fetchJobById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

// Recruiter Update Job
export const useUpdateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateJobService(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["my-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["my-job", variables.id] });
    },
  });
};

// Get Saved Jobs
export const useSavedJobs = (params) => {
  return useQuery({
    queryKey: ["saved-jobs", params],
    queryFn: () => fetchSavedJobs(params),
  });
};

// Save Job
export const useSaveJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveJobService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-jobs"] });
    },
  });
};

// Unsave Job
export const useUnsaveJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unsaveJobService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-jobs"] });
    },
  });
};

export const useCloseJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: closeJobService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["my-job"] });
      queryClient.invalidateQueries({ queryKey: ["company-dashboard"] });
    },
  });
};

export const useReopenJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reopenJobService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["my-job"] });
      queryClient.invalidateQueries({ queryKey: ["company-dashboard"] });
    },
  });
};
