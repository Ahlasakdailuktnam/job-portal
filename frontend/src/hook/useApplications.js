import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { applicationService } from '../services';

export const useMyApplications = () => {
  return useQuery({
    queryKey: ['my-applications'],
    queryFn: applicationService.getMine,
  });
};

export const useCompanyApplications = (params) => {
  return useQuery({
    queryKey: ['company-applications', params],
    queryFn: () => applicationService.getCompanyApplications(params),
  });
};

export const useApplication = (id) => {
  return useQuery({
    queryKey: ['application', id],
    queryFn: () => applicationService.getById(id),
    enabled: !!id,
  });
};

export const useApplyToJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ jobId, data }) => applicationService.apply(jobId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-applications'] });
    },
  });
};

export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) => applicationService.updateStatus(id, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['company-applications'] });
      queryClient.invalidateQueries({ queryKey: ['application', variables.id] });
    },
  });
};
