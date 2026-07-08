import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { removeJob } from "../services/jobServieces";
export const useDeleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeJob,

    onSuccess: () => {
      toast.success("លុបការងារបានជោគជ័យ");

      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });
      queryClient.invalidateQueries({
        queryKey: ["my-jobs"],
      });
      queryClient.invalidateQueries({
        queryKey: ["company-dashboard"],
      });
    },

    onError: () => {
      toast.error("មិនអាចលុបការងារបានទេ");
    },
  });
};
