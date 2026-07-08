// useCreateJob.js

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createJobService } from "../services/jobServieces";

export const useCreateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createJobService,

    onSuccess: () => {
      toast.success("បង្កើតការងារជោគជ័យ");

      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
        "បង្កើតការងារបរាជ័យ"
      );
    },
  });
};