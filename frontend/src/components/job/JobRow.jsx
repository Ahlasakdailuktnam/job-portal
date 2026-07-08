import React from "react";
import { Edit, Eye, Loader2, Lock, RotateCcw, Trash2 } from "lucide-react";

const statusMap = {
  active: { label: "Active", color: "bg-green-100 text-green-700" },
  published: { label: "Published", color: "bg-green-100 text-green-700" },
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-700" },
  draft: { label: "Draft", color: "bg-gray-100 text-gray-700" },
  paused: { label: "Paused", color: "bg-blue-100 text-blue-700" },
  expired: { label: "Expired", color: "bg-red-100 text-red-700" },
  closed: { label: "Closed", color: "bg-red-100 text-red-700" },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-700" },
  approved: { label: "Approved", color: "bg-green-100 text-green-700" },
  reviewing: { label: "Reviewing", color: "bg-blue-100 text-blue-700" },
};

const getStatusBadge = (job) => {
  if (job.status) {
    return (
      statusMap[job.status.toLowerCase()] || {
        label: job.status,
        color: "bg-gray-100 text-gray-500",
      }
    );
  }

  if (!job.deadline) {
    return { label: "N/A", color: "bg-gray-100 text-gray-500" };
  }

  const daysDiff = Math.ceil(
    (new Date(job.deadline) - new Date()) / (1000 * 60 * 60 * 24),
  );

  if (daysDiff < 0) {
    return { label: "Expired", color: "bg-red-100 text-red-700" };
  }

  if (daysDiff <= 3) {
    return { label: "Near expired", color: "bg-amber-100 text-amber-700" };
  }

  return { label: "Active", color: "bg-green-100 text-green-700" };
};

const JobRow = ({
  job,
  onView,
  onEdit,
  onDelete,
  onClose,
  onReopen,
  isDeleting = false,
  isStatusUpdating = false,
}) => {
  const status = getStatusBadge(job);
  const canEdit = ["draft", "pending"].includes(job.status);
  const canClose = job.status && !["draft", "closed"].includes(job.status);

  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150">
      <td className="px-6 py-4">
        <div>
          <div className="text-sm font-medium text-gray-700">
            {job.title || "Untitled"}
          </div>
          {job.description && (
            <div className="text-xs text-gray-400 truncate max-w-xs mt-0.5">
              {job.description}
            </div>
          )}
        </div>
      </td>
      <td className="px-6 py-4">
        {job.category?.name ? (
          <span className="text-sm text-gray-600">{job.category.name}</span>
        ) : (
          <span className="text-sm text-gray-400">-</span>
        )}
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-gray-600">{job.job_level || "-"}</span>
      </td>
      <td className="px-6 py-4">
        {job.salary_min && job.salary_max ? (
          <div>
            <span className="text-sm text-gray-700">
              ${Number(job.salary_min).toLocaleString()}
            </span>
            <span className="text-xs text-gray-400 mx-1">-</span>
            <span className="text-sm text-gray-700">
              ${Number(job.salary_max).toLocaleString()}
            </span>
          </div>
        ) : (
          <span className="text-sm text-gray-400">-</span>
        )}
      </td>
      <td className="px-6 py-4 text-center">
        <span className="text-sm font-medium text-gray-700">
          {job.available_position || "-"}
        </span>
      </td>
      <td className="px-6 py-4 text-center">
        <div className="flex flex-col items-center gap-1">
          <span
            className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${status.color}`}
          >
            {status.label}
          </span>
          {job.deadline && (
            <span className="text-[10px] text-gray-400">
              {new Date(job.deadline).toLocaleDateString()}
            </span>
          )}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={() => onView(job.id)}
            className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all duration-200"
            title="View"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={() => onEdit(job.id)}
            disabled={!canEdit}
            className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Edit"
          >
            <Edit className="h-4 w-4" />
          </button>
          {job.status === "closed" ? (
            <button
              onClick={() => onReopen?.(job.id)}
              disabled={isStatusUpdating}
              className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-green-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Reopen"
            >
              {isStatusUpdating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RotateCcw className="h-4 w-4" />
              )}
            </button>
          ) : (
            <button
              onClick={() => onClose?.(job.id)}
              disabled={isStatusUpdating || !canClose}
              className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-amber-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Close"
            >
              {isStatusUpdating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Lock className="h-4 w-4" />
              )}
            </button>
          )}
          <button
            onClick={() => onDelete(job.id)}
            disabled={isDeleting}
            className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Delete"
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default JobRow;
