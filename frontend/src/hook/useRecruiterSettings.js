import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { recruiterSettingsService } from "../services/recruiterSettingsService";

export const useRecruiterSettings = () => {
  return useQuery({
    queryKey: ["recruiter-settings"],
    queryFn: recruiterSettingsService.get,
  });
};

export const useUpdateRecruiterSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: recruiterSettingsService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recruiter-settings"] });
    },
  });
};
