import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { educationService } from '../services';

export const useEducation = (cvId) => {
  const queryClient = useQueryClient();

  const useGetAll = () => {
    return useQuery({
      queryKey: ['educations', cvId],
      queryFn: () => educationService.getAll(cvId),
      enabled: !!cvId,
    });
  };

  const useCreate = () => {
    return useMutation({
      mutationFn: (data) => educationService.create(cvId, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['educations', cvId] });
      },
    });
  };

  const useUpdate = () => {
    return useMutation({
      mutationFn: ({ id, data }) => educationService.update(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['educations', cvId] });
      },
    });
  };

  const useDelete = () => {
    return useMutation({
      mutationFn: educationService.delete,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['educations', cvId] });
      },
    });
  };

  return {
    useGetAll,
    useCreate,
    useUpdate,
    useDelete,
  };
};