import React, { useMemo, useState } from "react";
import {
  Briefcase,
  Building2,
  Calendar,
  Eye,
  Mail,
  MapPin,
  RefreshCw,
  Search,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAdminCompanies } from "../../../hook/useAdmin";
import { useAdminDashboard } from "../../../hook/useDashboard";

const formatDate = (value) => value ? new Date(value).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "No date";
const storageUrl = (path) => path ? `http://localhost:8000/storage/${path}` : null;

const AdminCompanies = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const params = useMemo(() => ({
    page,
    per_page: 12,
    ...(searchQuery.trim() ? { search: searchQuery.trim() } : {}),
  }), [page, searchQuery]);

  const { data, isLoading, isError, refetch } = useAdminCompanies(params);
  const dashboard = useAdminDashboard();

  const companies = data?.items || [];
  const pagination = data?.pagination || {};
  const totalCompanies = dashboard.data?.total_companies ?? pagination.total ?? 0;

  const stats = [
    { label: "Companies", value: totalCompanies, icon: Building2, className: "bg-blue-50 text-blue-700" },
    { label: "Recruiters", value: dashboard.data?.total_recruiters ?? 0, icon: User, className: "bg-emerald-50 text-emerald-700" },
    { label: "Jobs", value: dashboard.data?.total_jobs ?? 0, icon: Briefcase, className: "bg-amber-50 text-amber-700" },
    { label: "Active Jobs", value: dashboard.data?.active_jobs ?? 0, icon: Calendar, className: "bg-violet-50 text-violet-700" },
  ];

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  return (
    <div className="space-y-6 font-khmer">
      <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Company Management</h1>
          <p className="mt-1 text-sm text-gray-500">Review recruiter companies and their job activity.</p>
        </div>
        <button
          onClick={() => refetch()}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60"
          disabled={isLoading}
        >
          <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-lg ${stat.className}`}>
                <Icon size={21} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{Number(stat.value || 0).toLocaleString()}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div className="relative max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search companies..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
          />
        </div>
      </div>

      {isError ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700">
          <p className="font-semibold">Unable to load companies.</p>
          <button onClick={() => refetch()} className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm text-white">Try again</button>
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-64 animate-pulse rounded-lg border border-gray-200 bg-white" />
          ))}
        </div>
      ) : companies.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center shadow-sm">
          <Building2 size={44} className="mx-auto mb-3 text-gray-300" />
          <p className="font-medium text-gray-700">No companies found</p>
          <p className="mt-1 text-sm text-gray-500">Try a different search keyword.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {companies.map((company) => <CompanyCard key={company.id} company={company} />)}
        </div>
      )}

      {pagination.lastPage > 1 && (
        <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-sm">
          <p className="text-sm text-gray-500">
            Showing {pagination.from || 0}-{pagination.to || 0} of {pagination.total || 0}
          </p>
          <div className="flex gap-2">
            <button disabled={page <= 1} onClick={() => setPage((value) => value - 1)} className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 disabled:opacity-50">Previous</button>
            <button disabled={page >= pagination.lastPage} onClick={() => setPage((value) => value + 1)} className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 disabled:opacity-50">Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

const CompanyCard = ({ company }) => {
  const logo = storageUrl(company.logo);
  const owner = company.user || {};

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          {logo ? (
            <img src={logo} alt={company.company_name} className="h-12 w-12 rounded-lg object-cover ring-1 ring-gray-200" />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-900 text-lg font-bold text-white">
              {(company.company_name || "C").charAt(0)}
            </div>
          )}
          <div className="min-w-0">
            <h3 className="truncate font-semibold text-gray-900">{company.company_name || "Unnamed company"}</h3>
            <p className="truncate text-xs text-gray-500">{owner.name || "No owner"}</p>
          </div>
        </div>
        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">{company.jobs_count || 0} jobs</span>
      </div>

      <div className="mt-5 space-y-2 text-sm text-gray-600">
        <Info icon={Mail} text={owner.email || "No email"} />
        <Info icon={MapPin} text={company.address || "No address"} />
        <Info icon={Calendar} text={`Joined ${formatDate(company.created_at)}`} />
      </div>

      {company.description && (
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-500">{company.description}</p>
      )}

      <div className="mt-5 flex gap-2 border-t border-gray-100 pt-4">
        <Link
          to={`/admin/companiesdetail?id=${company.id}`}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
        >
          <Eye size={15} />
          View
        </Link>
        {company.social && (
          <a href={company.social} target="_blank" rel="noreferrer" className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Social</a>
        )}
      </div>
    </div>
  );
};

const Info = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-2">
    <Icon size={15} className="shrink-0 text-gray-400" />
    <span className="truncate">{text}</span>
  </div>
);

export default AdminCompanies;
