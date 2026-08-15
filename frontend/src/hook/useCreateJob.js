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
      const message = error?.response?.data?.message || "បង្កើតការងារបរាជ័យ";
      // Don't toast for subscription errors — let the component handle redirect UI
      const isSubscriptionError =
        message === "Subscription expired" ||
        message?.toLowerCase().includes("subscription") ||
        message?.toLowerCase().includes("no active subscription");

      if (!isSubscriptionError) {
        toast.error(message);
      }
    },
  });
};