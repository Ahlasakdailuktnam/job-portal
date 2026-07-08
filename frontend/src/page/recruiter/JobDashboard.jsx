import React from "react";
import { Link } from "react-router-dom";
import {
  AlertCircle,
  Briefcase,
  CheckCircle,
  Clock,
  Eye,
  FileText,
  Plus,
  RefreshCw,
  TrendingUp,
  UserCheck,
  UserX,
  Users,
} from "lucide-react";
import { useCompanyDashboard } from "../../hook/useDashboard";
import { useCompanyApplications } from "../../hook/useApplications";
import { useMyJobs } from "../../hook/useMyJobs";

const formatDate = (date) => {
  if (!date) return "No date";
  return new Date(date).toLocaleDateString();
};

const statCards = [
  {
    key: "total_jobs",
    label: "Total jobs",
    icon: Briefcase,
    tone: "bg-slate-50 text-slate-700",
  },
  {
    key: "active_jobs",
    label: "Active jobs",
    icon: CheckCircle,
    tone: "bg-emerald-50 text-emerald-700",
  },
  {
    key: "inactive_jobs",
    label: "Inactive jobs",
    icon: AlertCircle,
    tone: "bg-amber-50 text-amber-700",
  },
  {
    key: "total_applications",
    label: "Applications",
    icon: Users,
    tone: "bg-blue-50 text-blue-700",
  },
  {
    key: "pending_applications",
    label: "Pending",
    icon: Clock,
    tone: "bg-orange-50 text-orange-700",
  },
  {
    key: "accepted_applications",
    label: "Accepted",
    icon: UserCheck,
    tone: "bg-teal-50 text-teal-700",
  },
];

const JobDashboard = () => {
  const {
    data: dashboardResponse,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useCompanyDashboard();
  const { data: jobsResponse } = useMyJobs({ page: 1, per_page: 5 });
  const { data: applicationsResponse } = useCompanyApplications({ page: 1 });

  const metrics = dashboardResponse?.data || {};
  const subscription = dashboardResponse?.subscription || {};
  const jobs = jobsResponse?.jobs || [];
  const applications = applicationsResponse?.applications || [];
  const totalApplications = Math.max(metrics.total_applications || 0, 1);
  const cvLimit = metrics.cv_limit;
  const cvUsed = metrics.cv_used || 0;
  const cvPercent =
    cvLimit === -1 || !cvLimit ? 0 : Math.min(100, (cvUsed / cvLimit) * 100);

  if (isLoading) {
    return (
      <div className="px-6">
        <div className="mx-auto max-w-7xl space-y-5">
          <div className="h-24 animate-pulse rounded-xl bg-white" />
          <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-32 animate-pulse rounded-xl bg-white"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-6">
        <div className="mx-auto max-w-3xl rounded-xl border border-red-200 bg-white p-8 text-center">
          <AlertCircle className="mx-auto mb-3 text-red-500" size={42} />
          <h2 className="text-lg font-semibold text-gray-900">
            Unable to load recruiter dashboard
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            {error?.response?.data?.message || "Please try again."}
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-900"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col justify-between gap-4 rounded-xl border border-gray-200 bg-white p-5 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Recruiter Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Live overview of your jobs, applications, subscription, and CV
              access.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => refetch()}
              disabled={isFetching}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-60"
            >
              <RefreshCw size={16} className={isFetching ? "animate-spin" : ""} />
              Refresh
            </button>
            <Link
              to="/recruiter/jobs/post"
              className="inline-flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-900"
            >
              <Plus size={16} />
              Post job
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.key}
                className="rounded-xl border border-gray-200 bg-white p-4"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.tone}`}
                  >
                    <Icon size={20} />
                  </div>
                  <TrendingUp size={16} className="text-gray-300" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {metrics[card.key] ?? 0}
                </p>
                <p className="text-sm text-gray-500">{card.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <section className="rounded-xl border border-gray-200 bg-white p-5 lg:col-span-2">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-gray-900">Application pipeline</h2>
                <p className="text-sm text-gray-500">
                  Current application status distribution.
                </p>
              </div>
              <Link
                to="/recruiter/candidates"
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {[
                ["Pending", metrics.pending_applications || 0, "bg-amber-500"],
                ["Accepted", metrics.accepted_applications || 0, "bg-emerald-500"],
                ["Rejected", metrics.rejected_applications || 0, "bg-rose-500"],
              ].map(([label, value, color]) => (
                <div key={label}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="font-medium text-gray-700">{label}</span>
                    <span className="text-gray-500">{value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100">
                    <div
                      className={`h-2 rounded-full ${color}`}
                      style={{ width: `${(value / totalApplications) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="font-bold text-gray-900">Subscription</h2>
            <p className="mt-1 text-sm text-gray-500">
              {subscription.active
                ? `${subscription.plan_name || "Active plan"} plan`
                : "No active plan"}
            </p>
            <div className="mt-5 space-y-4">
              <InfoLine
                label="Job slots"
                value={
                  subscription.remaining_slots === "Unlimited"
                    ? "Unlimited"
                    : `${subscription.remaining_slots || 0} remaining`
                }
              />
              <InfoLine
                label="Expires"
                value={formatDate(subscription.expires_at)}
              />
              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-medium text-gray-700">CV views</span>
                  <span className="text-gray-500">
                    {cvLimit === -1 ? `${cvUsed} used` : `${cvUsed}/${cvLimit || 0}`}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-gray-100">
                  <div
                    className="h-2 rounded-full bg-gray-800"
                    style={{ width: cvLimit === -1 ? "100%" : `${cvPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <RecentPanel
            title="Recent jobs"
            actionTo="/recruiter/jobs/list"
            actionLabel="Manage jobs"
            emptyIcon={Briefcase}
            emptyText="No jobs yet"
          >
            {jobs.map((job) => (
              <Link
                key={job.id}
                to={`/recruiter/jobs/${job.id}/preview`}
                className="flex items-center justify-between gap-4 rounded-lg border border-gray-100 p-3 hover:bg-gray-50"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-gray-900">
                    {job.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {job.category?.name || "No category"} ·{" "}
                    {job.applications_count || 0} applications
                  </p>
                </div>
                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium capitalize text-gray-600">
                  {job.status}
                </span>
              </Link>
            ))}
          </RecentPanel>

          <RecentPanel
            title="Recent applications"
            actionTo="/recruiter/candidates"
            actionLabel="Review candidates"
            emptyIcon={FileText}
            emptyText="No applications yet"
          >
            {applications.slice(0, 5).map((application) => (
              <Link
                key={application.id}
                to="/recruiter/candidates"
                className="flex items-center justify-between gap-4 rounded-lg border border-gray-100 p-3 hover:bg-gray-50"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-gray-900">
                    {application.user?.name ||
                      application.cv?.name ||
                      "Candidate"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {application.job?.title || "Untitled job"} ·{" "}
                    {formatDate(application.applied_at)}
                  </p>
                </div>
                <Eye size={16} className="text-gray-400" />
              </Link>
            ))}
          </RecentPanel>
        </div>
      </div>
    </div>
  );
};

const InfoLine = ({ label, value }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium text-gray-900">{value}</span>
  </div>
);

const RecentPanel = ({
  title,
  actionTo,
  actionLabel,
  emptyIcon: EmptyIcon,
  emptyText,
  children,
}) => {
  const hasItems = React.Children.count(children) > 0;

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold text-gray-900">{title}</h2>
        <Link
          to={actionTo}
          className="text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          {actionLabel}
        </Link>
      </div>
      {hasItems ? (
        <div className="space-y-3">{children}</div>
      ) : (
        <div className="rounded-lg border border-dashed border-gray-200 p-8 text-center">
          <EmptyIcon className="mx-auto mb-2 text-gray-300" size={36} />
          <p className="text-sm text-gray-500">{emptyText}</p>
        </div>
      )}
    </section>
  );
};

export default JobDashboard;
