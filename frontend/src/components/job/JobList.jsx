// components/job/JobList.jsx
import React from "react";
import { Briefcase } from "lucide-react";
import JobCard from "./cart/JobCard";

const JobList = ({ jobs, isLoading, savedJobIds, onToggleSave, savingId }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse"
          >
            <div className="flex gap-4">
              <div className="w-14 h-14 rounded-xl bg-gray-200"></div>
              <div className="flex-1">
                <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
                <div className="flex gap-4">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500 font-medium">មិនមានការងារ</p>
        <p className="text-sm text-gray-400 mt-1">សូមសាកល្បងស្វែងរកម្តងទៀត</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          isSaved={savedJobIds?.has(job.id) || false}
          onToggleSave={onToggleSave}
          isLoading={savingId === job.id}
        />
      ))}
    </div>
  );
};

export default React.memo(JobList);