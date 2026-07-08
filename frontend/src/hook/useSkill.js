import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { skillService } from '../services';

export const useSkill = (cvId) => {
  const queryClient = useQueryClient();

  const useGetAll = () => {
    return useQuery({
      queryKey: ['skills', cvId],
      queryFn: () => skillService.getAll(cvId),
      enabled: !!cvId,
    });
  };

  const useCreate = () => {
    return useMutation({
      mutationFn: (data) => skillService.create(cvId, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['skills', cvId] });
      },
    });
  };

  const useDelete = () => {
    return useMutation({
      mutationFn: skillService.delete,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['skills', cvId] });
      },
    });
  };

  const useUpdate = () => {
    return useMutation({
      mutationFn: ({ id, data }) => skillService.update(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['skills', cvId] });
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
