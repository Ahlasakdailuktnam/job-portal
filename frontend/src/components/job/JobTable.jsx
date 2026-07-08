// components/jobs/JobTable.jsx
import React from 'react';
import { Briefcase } from 'lucide-react';
import JobRow from './JobRow';

const JobTable = ({
  jobs,
  onView,
  onEdit,
  onDelete,
  onClose,
  onReopen,
  isDeleting = false,
  isStatusUpdating = false,
}) => {
  if (jobs.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500 font-medium">មិនមានការងារ</p>
        <p className="text-sm text-gray-400 mt-1">សូមបង្កើតការងារថ្មី</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3 text-left">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  មុខតំណែង
                </span>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ប្រភេទ
                </span>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  កម្រិត
                </span>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ប្រាក់ខែ
                </span>
              </th>
              <th className="px-6 py-3 text-center">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ចំនួន
                </span>
              </th>
              <th className="px-6 py-3 text-center">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ស្ថានភាព
                </span>
              </th>
              <th className="px-6 py-3 text-right">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  សកម្មភាព
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {jobs.map((job) => (
              <JobRow
                key={job.id}
                job={job}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
                onClose={onClose}
                onReopen={onReopen}
                isDeleting={isDeleting}
                isStatusUpdating={isStatusUpdating}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobTable;
