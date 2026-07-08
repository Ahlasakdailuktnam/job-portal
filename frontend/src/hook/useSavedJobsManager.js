// hook/useSavedJobsManager.js
import { useMemo, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSavedJobs, useSaveJob, useUnsaveJob } from "./useJob";

const extractSavedJobs = (data) => {
  if (!data) return [];
  return data?.data?.data ?? data?.data ?? data?.jobs ?? [];
};

export const useSavedJobsManager = () => {
  const queryClient = useQueryClient();

  const { data: savedData } = useSavedJobs({});
  const { mutate: saveJob } = useSaveJob();
  const { mutate: unsaveJob } = useUnsaveJob();

  const savedJobs = useMemo(() => {
    return extractSavedJobs(savedData);
  }, [savedData]);

  const savedJobIds = useMemo(() => {
    return new Set(
      savedJobs.map((item) => item.job_id || item.job?.id || item.id)
    );
  }, [savedJobs]);

  const toggleSave = useCallback(
    (job, { onSuccess, onError } = {}) => {
      const jobId = job.id;
      const isSaved = savedJobIds.has(jobId);

      // Optimistic Update
      const previous = queryClient.getQueryData(["saved-jobs", {}]);

      queryClient.setQueryData(["saved-jobs", {}], (old) => {
        if (!old) return old;

        const jobs = extractSavedJobs(old);
        let updatedJobs;

        if (isSaved) {
          updatedJobs = jobs.filter(
            (item) => (item.job_id || item.job?.id || item.id) !== jobId
          );
        } else {
          updatedJobs = [
            ...jobs,
            {
              id: jobId,
              job_id: jobId,
              job,
            },
          ];
        }

        if (old.data?.data) {
          return {
            ...old,
            data: {
              ...old.data,
              data: updatedJobs,
            },
          };
        }

        if (old.data) {
          return {
            ...old,
            data: updatedJobs,
          };
        }

        return {
          ...old,
          jobs: updatedJobs,
        };
      });

      const mutate = isSaved ? unsaveJob : saveJob;

      mutate(jobId, {
        onSuccess: () => {
          // Only invalidate saved-jobs to trigger refetch
          queryClient.invalidateQueries({
            queryKey: ["saved-jobs"],
          });
          onSuccess?.();
        },
        onError: (error) => {
          // Rollback on error
          queryClient.setQueryData(["saved-jobs", {}], previous);
          onError?.(error);
        },
      });
    },
    [savedJobIds, saveJob, unsaveJob, queryClient]
  );

  return {
    savedJobs,
    savedJobIds,
    toggleSave,
  };
};