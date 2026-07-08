import React, { useMemo, useState } from "react";
import { FileText, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import { useApplyToJob } from "../../hook/useApplications";
import { useCV } from "../../hook/useCv";

const ApplyJobModal = ({ job, isOpen, onClose, onApplied }) => {
  const [cvId, setCvId] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const { useGetAll } = useCV();
  const { data: cvs = [], isLoading: isLoadingCvs } = useGetAll();
  const applyMutation = useApplyToJob();

  const cvOptions = useMemo(() => {
    if (Array.isArray(cvs)) return cvs;
    return cvs?.data || [];
  }, [cvs]);

  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!cvId) {
      toast.error("Please select a CV");
      return;
    }

    applyMutation.mutate(
      {
        jobId: job.id,
        data: {
          cv_id: cvId,
          cover_letter: coverLetter || null,
        },
      },
      {
        onSuccess: (response) => {
          toast.success(response?.message || "Applied successfully");
          onApplied?.();
          onClose();
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message || "Unable to apply");
        },
      },
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
        <div className="flex items-start justify-between border-b border-gray-100 p-5">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Apply for job</h2>
            <p className="mt-1 text-sm text-gray-500">{job?.title}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close apply modal"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Select CV
            </label>
            <div className="relative">
              <FileText
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <select
                value={cvId}
                onChange={(event) => setCvId(event.target.value)}
                disabled={isLoadingCvs || applyMutation.isPending}
                className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-700 outline-none transition focus:border-gray-700"
              >
                <option value="">
                  {isLoadingCvs ? "Loading CVs..." : "Choose your CV"}
                </option>
                {cvOptions.map((cv) => (
                  <option key={cv.id} value={cv.id}>
                    {cv.title || cv.name || `CV #${cv.id}`}
                  </option>
                ))}
              </select>
            </div>
            {!isLoadingCvs && cvOptions.length === 0 && (
              <p className="mt-2 text-xs text-red-500">
                Create a CV first before applying.
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Cover letter
            </label>
            <textarea
              value={coverLetter}
              onChange={(event) => setCoverLetter(event.target.value)}
              rows={5}
              placeholder="Write a short message to the recruiter"
              disabled={applyMutation.isPending}
              className="w-full resize-none rounded-lg border border-gray-200 p-3 text-sm text-gray-700 outline-none transition focus:border-gray-700"
            />
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={applyMutation.isPending || cvOptions.length === 0}
              className="flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send size={16} />
              {applyMutation.isPending ? "Applying..." : "Submit application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyJobModal;
