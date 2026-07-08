import React, { useMemo, useState } from "react";
import {
  Briefcase,
  Building2,
  Calendar,
  Clock,
  FileText,
  Search,
} from "lucide-react";
import { useMyApplications } from "../../hook/useApplications";

const statusStyles = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  accepted: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rejected: "bg-rose-50 text-rose-700 border-rose-200",
};

const formatDate = (date) => {
  if (!date) return "No date";
  return new Date(date).toLocaleDateString();
};

const MyApplications = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const { data: applications = [], isLoading, error } = useMyApplications();

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const jobTitle = application.job?.title || "";
      const companyName = application.job?.company?.company_name || "";
      const matchesSearch = `${jobTitle} ${companyName}`
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

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              My Applications
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Track every job you have applied for.
            </p>
          </div>
          <div className="relative w-full md:max-w-sm">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search jobs or companies"
              className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-gray-700"
            />
          </div>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            ["all", "All"],
            ["pending", "Pending"],
            ["accepted", "Accepted"],
            ["rejected", "Rejected"],
          ].map(([key, label]) => (
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
              <p className="text-2xl font-bold">{counts[key]}</p>
              <p className="text-sm opacity-80">{label}</p>
            </button>
          ))}
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
            <div className="p-10 text-center">
              <Briefcase className="mx-auto mb-3 text-gray-300" size={42} />
              <p className="font-medium text-gray-800">No applications found</p>
              <p className="mt-1 text-sm text-gray-500">
                Applied jobs will show here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredApplications.map((application) => (
                <div
                  key={application.id}
                  className="flex flex-col gap-4 p-5 transition hover:bg-gray-50 md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                      <FileText size={22} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {application.job?.title || "Untitled job"}
                      </h3>
                      <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Building2 size={14} />
                          {application.job?.company?.company_name || "Company"}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {formatDate(application.applied_at)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {application.cv?.title || `CV #${application.cv_id}`}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold capitalize ${
                      statusStyles[application.status] ||
                      "border-gray-200 bg-gray-50 text-gray-600"
                    }`}
                  >
                    {application.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyApplications;
