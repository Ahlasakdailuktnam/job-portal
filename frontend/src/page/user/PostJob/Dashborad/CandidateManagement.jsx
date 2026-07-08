import React, { useMemo, useState } from "react";
import {
  Award,
  Briefcase,
  Calendar,
  CheckCircle,
  Eye,
  FileText,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  Search,
  UserCheck,
  UserX,
  Users,
  X,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  useApplication,
  useCompanyApplications,
  useUpdateApplicationStatus,
} from "../../../../hook/useApplications";
import JobPagination from "../../../../components/job/JobPagination";

const statusConfig = {
  pending: {
    label: "Pending",
    className: "bg-amber-50 text-amber-700 border-amber-200",
    icon: Calendar,
  },
  accepted: {
    label: "Accepted",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: CheckCircle,
  },
  rejected: {
    label: "Rejected",
    className: "bg-rose-50 text-rose-700 border-rose-200",
    icon: XCircle,
  },
};

const formatDate = (date) => {
  if (!date) return "No date";
  return new Date(date).toLocaleDateString();
};

const getCandidateName = (application) =>
  application?.user?.name ||
  application?.cv?.full_name ||
  application?.cv?.name ||
  "Candidate";

const getCandidateInitial = (application) => getCandidateName(application).charAt(0);

const CandidateManagement = () => {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);

  const {
    data,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useCompanyApplications({ page });
  const applications = data?.applications || [];
  const pagination = data?.pagination;

  const {
    data: selectedApplication,
    isLoading: isLoadingDetail,
    error: detailError,
  } = useApplication(selectedApplicationId);
  const updateStatusMutation = useUpdateApplicationStatus();

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const candidateName = getCandidateName(application);
      const jobTitle = application.job?.title || "";
      const matchesSearch = `${candidateName} ${jobTitle}`
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesStatus = status === "all" || application.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [applications, search, status]);

  const counts = useMemo(
    () => ({
      all: applications.length,
      pending: applications.filter((item) => item.status === "pending").length,
      accepted: applications.filter((item) => item.status === "accepted").length,
      rejected: applications.filter((item) => item.status === "rejected").length,
    }),
    [applications],
  );

  const handleUpdateStatus = (id, nextStatus) => {
    updateStatusMutation.mutate(
      { id, status: nextStatus },
      {
        onSuccess: (response) => {
          toast.success(response?.message || "Application updated");
        },
        onError: (mutationError) => {
          toast.error(
            mutationError?.response?.data?.message ||
              "Unable to update application",
          );
        },
      },
    );
  };

  const renderStatus = (applicationStatus) => {
    const config = statusConfig[applicationStatus] || {
      label: applicationStatus || "Unknown",
      className: "bg-gray-50 text-gray-600 border-gray-200",
      icon: Calendar,
    };
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${config.className}`}
      >
        <Icon size={13} />
        {config.label}
      </span>
    );
  };

  return (
    <div className="px-4 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Candidate Applications
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Review candidates who applied to your company jobs.
            </p>
          </div>
          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:opacity-60"
          >
            <RefreshCw size={16} className={isFetching ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            ["all", "All", Users],
            ["pending", "Pending", Calendar],
            ["accepted", "Accepted", UserCheck],
            ["rejected", "Rejected", UserX],
          ].map(([key, label, Icon]) => (
            <button
              key={key}
              type="button"
              onClick={() => setStatus(key)}
              className={`rounded-lg border p-4 text-left transition ${
                status === key
                  ? "border-gray-800 bg-gray-800 text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <div className="mb-3 flex items-center justify-between">
                <Icon size={20} className="opacity-80" />
                <span className="text-2xl font-bold">{counts[key]}</span>
              </div>
              <p className="text-sm font-medium opacity-80">{label}</p>
            </button>
          ))}
        </div>

        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search candidate or job"
              className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-gray-700"
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          {isLoading ? (
            <div className="p-10 text-center text-sm text-gray-500">
              Loading applications...
            </div>
          ) : error ? (
            <div className="p-10 text-center text-sm text-red-500">
              {error?.response?.data?.message || "Unable to load applications"}
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="mx-auto mb-3 text-gray-300" size={46} />
              <p className="font-medium text-gray-800">No candidates found</p>
              <p className="mt-1 text-sm text-gray-500">
                Applications will appear here after candidates apply.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredApplications.map((application) => (
                <div
                  key={application.id}
                  className="grid gap-4 p-5 transition hover:bg-gray-50 lg:grid-cols-[1fr_auto] lg:items-center"
                >
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-800 text-lg font-bold text-white">
                      {getCandidateInitial(application)}
                    </div>
                    <div className="min-w-0">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-gray-900">
                          {getCandidateName(application)}
                        </h3>
                        {renderStatus(application.status)}
                      </div>
                      <p className="text-sm text-gray-600">
                        Applied for{" "}
                        <span className="font-medium text-gray-900">
                          {application.job?.title || "Untitled job"}
                        </span>
                      </p>
                      <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar size={13} />
                          {formatDate(application.applied_at)}
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText size={13} />
                          {application.cv?.title ||
                            application.cv?.name ||
                            `CV #${application.cv_id}`}
                        </span>
                        {application.user?.email && (
                          <span className="flex items-center gap-1">
                            <Mail size={13} />
                            {application.user.email}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 lg:justify-end">
                    <button
                      type="button"
                      onClick={() => setSelectedApplicationId(application.id)}
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                    >
                      <Eye size={15} />
                      View
                    </button>
                    {application.status === "pending" && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            handleUpdateStatus(application.id, "accepted")
                          }
                          disabled={updateStatusMutation.isPending}
                          className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
                        >
                          <CheckCircle size={15} />
                          Accept
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleUpdateStatus(application.id, "rejected")
                          }
                          disabled={updateStatusMutation.isPending}
                          className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-3 py-2 text-sm font-medium text-white hover:bg-rose-700 disabled:opacity-60"
                        >
                          <XCircle size={15} />
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <JobPagination
            pagination={pagination}
            currentPage={page}
            onPageChange={setPage}
          />
        </div>
      </div>

      {selectedApplicationId && (
        <ApplicationDetailModal
          application={selectedApplication}
          isLoading={isLoadingDetail}
          error={detailError}
          onClose={() => setSelectedApplicationId(null)}
          onUpdateStatus={handleUpdateStatus}
          isUpdating={updateStatusMutation.isPending}
          renderStatus={renderStatus}
        />
      )}
    </div>
  );
};

const ApplicationDetailModal = ({
  application,
  isLoading,
  error,
  onClose,
  onUpdateStatus,
  isUpdating,
  renderStatus,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-white shadow-xl">
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-gray-100 bg-white p-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Application Detail
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Candidate CV, contact, and application information.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close detail modal"
          >
            <X size={18} />
          </button>
        </div>

        {isLoading ? (
          <div className="p-10 text-center text-sm text-gray-500">
            Loading application detail...
          </div>
        ) : error ? (
          <div className="p-10 text-center text-sm text-red-500">
            {error?.response?.data?.message || "Unable to load detail"}
          </div>
        ) : application ? (
          <div className="space-y-6 p-5">
            <div className="flex flex-col justify-between gap-4 rounded-lg border border-gray-200 p-4 md:flex-row md:items-center">
              <div className="flex gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-gray-800 text-xl font-bold text-white">
                  {getCandidateInitial(application)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {getCandidateName(application)}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {application.job?.title || "Untitled job"}
                  </p>
                  <div className="mt-2">{renderStatus(application.status)}</div>
                </div>
              </div>

              {application.status === "pending" && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onUpdateStatus(application.id, "accepted")}
                    disabled={isUpdating}
                    className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
                  >
                    <CheckCircle size={16} />
                    Accept
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateStatus(application.id, "rejected")}
                    disabled={isUpdating}
                    className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-rose-700 disabled:opacity-60"
                  >
                    <XCircle size={16} />
                    Reject
                  </button>
                </div>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <InfoBox icon={Mail} label="Email" value={application.user?.email} />
              <InfoBox icon={Phone} label="Phone" value={application.cv?.phone} />
              <InfoBox
                icon={MapPin}
                label="Address"
                value={application.cv?.address}
              />
            </div>

            {application.cover_letter && (
              <section className="rounded-lg border border-gray-200 p-4">
                <h4 className="mb-2 font-semibold text-gray-900">
                  Cover letter
                </h4>
                <p className="whitespace-pre-wrap text-sm leading-6 text-gray-600">
                  {application.cover_letter}
                </p>
              </section>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <CvSection
                title="Experience"
                icon={Briefcase}
                items={application.cv?.experiences}
                emptyText="No experience added"
                renderItem={(item) => (
                  <>
                    <p className="font-medium text-gray-900">
                      {item.position || item.title || "Experience"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.company || item.company_name || "Company"}
                    </p>
                    {item.description && (
                      <p className="mt-2 text-sm text-gray-600">
                        {item.description}
                      </p>
                    )}
                  </>
                )}
              />
              <CvSection
                title="Education"
                icon={Award}
                items={application.cv?.educations}
                emptyText="No education added"
                renderItem={(item) => (
                  <>
                    <p className="font-medium text-gray-900">
                      {item.degree || item.title || "Education"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.school || item.institution || "Institution"}
                    </p>
                  </>
                )}
              />
            </div>

            <section className="rounded-lg border border-gray-200 p-4">
              <h4 className="mb-3 font-semibold text-gray-900">Skills</h4>
              {application.cv?.skills?.length ? (
                <div className="flex flex-wrap gap-2">
                  {application.cv.skills.map((skill) => (
                    <span
                      key={skill.id || skill.name}
                      className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                    >
                      {skill.name || skill.skill || skill.title}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No skills added</p>
              )}
            </section>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const InfoBox = ({ icon: Icon, label, value }) => (
  <div className="rounded-lg border border-gray-200 p-4">
    <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-500">
      <Icon size={16} />
      {label}
    </div>
    <p className="break-words text-sm font-semibold text-gray-900">
      {value || "Hidden or not provided"}
    </p>
  </div>
);

const CvSection = ({ title, icon: Icon, items, emptyText, renderItem }) => (
  <section className="rounded-lg border border-gray-200 p-4">
    <h4 className="mb-3 flex items-center gap-2 font-semibold text-gray-900">
      <Icon size={17} />
      {title}
    </h4>
    {items?.length ? (
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-lg bg-gray-50 p-3">
            {renderItem(item)}
          </div>
        ))}
      </div>
    ) : (
      <p className="text-sm text-gray-500">{emptyText}</p>
    )}
  </section>
);

export default CandidateManagement;
