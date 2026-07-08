import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { experienceService } from '../services';

export const useExperience = (cvId) => {
  const queryClient = useQueryClient();

  const useGetAll = () => {
    return useQuery({
      queryKey: ['experiences', cvId],
      queryFn: () => experienceService.getAll(cvId),
      enabled: !!cvId,
    });
  };

  const useCreate = () => {
    return useMutation({
      mutationFn: (data) => experienceService.create(cvId, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['experiences', cvId] });
      },
    });
  };

  const useUpdate = () => {
    return useMutation({
      mutationFn: ({ id, data }) => experienceService.update(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['experiences', cvId] });
      },
    });
  };

  const useDelete = () => {
    return useMutation({
      mutationFn: experienceService.delete,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['experiences', cvId] });
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