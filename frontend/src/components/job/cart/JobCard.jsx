// components/job/cart/JobCard.jsx
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  DollarSign,
  Clock,
  Award,
  Bookmark,
} from "lucide-react";

export const JobCard = ({ job, isSaved = false, onToggleSave, isLoading = false }) => {
  const navigate = useNavigate();

  const handleToggleSave = useCallback(() => {
    onToggleSave?.(job);
  }, [onToggleSave, job]);

  const handleViewDetails = useCallback(() => {
    navigate(`/jobs/${job.id}`);
  }, [navigate, job.id]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-sm transition">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
          <Building2 size={24} className="text-gray-600" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                {job.title}
              </h3>
              <p className="text-gray-500 text-sm">
                {job.company?.company_name || job.company_name}
              </p>
            </div>
            <div className="flex gap-1">
              <button 
                onClick={handleToggleSave}
                disabled={isLoading}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
                title={isSaved ? "ដកចេញពីការរក្សាទុក" : "រក្សាទុកការងារ"}
              >
                <Bookmark
                  size={18}
                  className={`transition-colors duration-200 ${
                    isSaved 
                      ? "fill-gray-700 text-gray-700" 
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-3">
            <span className="flex items-center gap-1">
              <DollarSign size={14} />
              {job.salary_min && job.salary_max
                ? `$${job.salary_min} - $${job.salary_max}`
                : "មិនបានបញ្ជាក់"}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {job.job_type}
            </span>
            <span className="flex items-center gap-1">
              <Award size={14} />
              {job.experience || "មិនមាន"}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {job.category?.name && (
              <span className="px-2.5 py-1 bg-gray-50 text-gray-600 text-xs rounded-lg border border-gray-100">
                {job.category.name}
              </span>
            )}
            {job.job_level && (
              <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-xs rounded-lg">
                {job.job_level}
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 pt-3 border-t border-gray-100 gap-3">
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
              <span>
                បានបង្ហោះ {new Date(job.created_at).toLocaleDateString()}
              </span>
              <span>•</span>
              <span>អ្នកដាក់ពាក្យ {job.applications_count ?? 0} នាក់</span>
              <span>•</span>
              <span
                className={`font-medium ${
                  job.status === "active"
                    ? "text-green-600"
                    : job.status === "pending"
                    ? "text-yellow-600"
                    : job.status === "draft"
                    ? "text-gray-600"
                    : "text-red-600"
                }`}
              >
                {job.status}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleViewDetails}
                className="px-5 py-1.5 rounded-lg text-sm bg-gray-200 text-black relative overflow-hidden group hover:scale-105 transition-transform duration-300"
              >
                <span className="relative z-10">មើលព័ត៍មានលម្អិត</span>
                <span className="absolute inset-0 border-2 border-gray-400 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></span>
              </button>
              <button
                className="px-5 py-1.5 rounded-lg text-sm bg-gray-700 text-white relative overflow-hidden group hover:scale-105 transition-transform duration-300"
              >
                <span className="relative z-10">ដាក់ពាក្យ</span>
                <span className="absolute inset-0 border-2 border-white/30 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(JobCard);