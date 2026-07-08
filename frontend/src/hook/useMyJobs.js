import { useQuery } from "@tanstack/react-query";
import { fetchMyJobs } from "../services/jobServieces";

export const useMyJobs = (params) => {
  return useQuery({
    queryKey: ["my-jobs", params],
    queryFn: () => fetchMyJobs(params),
    staleTime: 1000 * 60 * 5,
  });
};