import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cvService } from '../services';

export const useCV = (id) => {
  const queryClient = useQueryClient();

  const useGetAll = () => {
    return useQuery({
      queryKey: ['cvs'],
      queryFn: cvService.getAll,
      staleTime: 1000 * 60 * 5,
    });
  };

  const useGetById = () => {
    return useQuery({
      queryKey: ['cv', id],
      queryFn: () => cvService.getById(id),
      enabled: !!id,
      staleTime: 1000 * 60 * 5,
    });
  };

  const useCreate = () => {
    return useMutation({
      mutationFn: cvService.create,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['cvs'] });
      },
    });
  };

  const useUpdate = () => {
    return useMutation({
      mutationFn: ({ id, data }) => cvService.update(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['cvs'] });
        queryClient.invalidateQueries({ queryKey: ['cv', id] });
      },
    });
  };

  const useDelete = () => {
    return useMutation({
      mutationFn: cvService.delete,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['cvs'] });
      },
    });
  };

  const useDownload = () => {
    return useMutation({
      mutationFn: cvService.download,
    });
  };

  return {
    useGetAll,
    useGetById,
    useCreate,
    useUpdate,
    useDelete,
    useDownload,
  };
};