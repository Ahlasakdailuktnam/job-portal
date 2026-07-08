import React, { useMemo, useState } from "react";
import {
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Mail,
  RefreshCw,
  Search,
  Shield,
  UserCheck,
  Users,
  XCircle,
} from "lucide-react";
import { useAdminUsers } from "../../hook/useAdmin";
import { useAdminDashboard } from "../../hook/useDashboard";

const roleLabels = {
  admin: "Admin",
  recruiter: "Recruiter",
  job_seeker: "Job Seeker",
  user: "User",
};

const roleStyles = {
  admin: "bg-violet-50 text-violet-700",
  recruiter: "bg-blue-50 text-blue-700",
  job_seeker: "bg-emerald-50 text-emerald-700",
  user: "bg-gray-100 text-gray-700",
};

const formatDate = (value) => value ? new Date(value).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "No date";

const AdminUsers = () => {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [verified, setVerified] = useState("");
  const [page, setPage] = useState(1);

  const params = useMemo(() => ({
    page,
    per_page: 10,
    ...(search.trim() ? { search: search.trim() } : {}),
    ...(role ? { role } : {}),
    ...(verified ? { is_verified: verified } : {}),
  }), [page, role, search, verified]);

  const { data, isLoading, isError, refetch } = useAdminUsers(params);
  const dashboard = useAdminDashboard();

  const users = data?.items || [];
  const pagination = data?.pagination || {};

  const stats = [
    { label: "Users", value: dashboard.data?.total_users ?? pagination.total ?? 0, icon: Users, className: "bg-blue-50 text-blue-700" },
    { label: "Recruiters", value: dashboard.data?.total_recruiters ?? 0, icon: UserCheck, className: "bg-emerald-50 text-emerald-700" },
    { label: "Job Seekers", value: dashboard.data?.total_job_seekers ?? 0, icon: CheckCircle, className: "bg-amber-50 text-amber-700" },
    { label: "Admins", value: dashboard.data?.total_admins ?? 0, icon: Shield, className: "bg-violet-50 text-violet-700" },
  ];

  const updateSearch = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const updateRole = (event) => {
    setRole(event.target.value);
    setPage(1);
  };

  const updateVerified = (event) => {
    setVerified(event.target.value);
    setPage(1);
  };

  return (
    <div className="space-y-6 font-khmer">
      <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="mt-1 text-sm text-gray-500">Search, filter, and review all platform accounts.</p>
        </div>
        <button
          onClick={() => refetch()}
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60"
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

      <div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={updateSearch}
            placeholder="Search by name or email..."
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
          />
        </div>
        <select value={role} onChange={updateRole} className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none">
          <option value="">All roles</option>
          <option value="user">User</option>
          <option value="job_seeker">Job Seeker</option>
          <option value="recruiter">Recruiter</option>
          <option value="admin">Admin</option>
        </select>
        <select value={verified} onChange={updateVerified} className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none">
          <option value="">All verification</option>
          <option value="true">Verified</option>
          <option value="false">Unverified</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px]">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">User</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Role</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Status</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Created</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isError ? (
                <tr><td colSpan="5" className="px-5 py-10 text-center text-red-600">Unable to load users.</td></tr>
              ) : isLoading ? (
                <tr><td colSpan="5" className="px-5 py-10 text-center text-gray-500"><RefreshCw className="mx-auto mb-2 animate-spin" />Loading users...</td></tr>
              ) : users.length === 0 ? (
                <tr><td colSpan="5" className="px-5 py-10 text-center text-gray-500">No users found.</td></tr>
              ) : users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://ui-avatars.com/api/?background=111827&color=fff&name=${encodeURIComponent(user.name || "User")}`}
                        alt={user.name || "User"}
                        className="h-10 w-10 rounded-lg"
                      />
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-gray-900">{user.name || "Unnamed user"}</p>
                        <p className="flex items-center gap-1 truncate text-xs text-gray-500"><Mail size={12} />{user.email || "No email"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${roleStyles[user.role] || roleStyles.user}`}>
                      {roleLabels[user.role] || user.role || "User"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {user.is_verified ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700"><CheckCircle size={12} />Verified</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700"><Clock size={12} />Pending</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600"><Calendar size={14} className="mr-1 inline text-gray-400" />{formatDate(user.created_at)}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">{formatDate(user.updated_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {pagination.lastPage > 1 && (
          <div className="flex items-center justify-between border-t border-gray-200 px-5 py-4">
            <p className="text-sm text-gray-500">Showing {pagination.from || 0}-{pagination.to || 0} of {pagination.total || 0}</p>
            <div className="flex items-center gap-2">
              <button disabled={page <= 1} onClick={() => setPage((value) => value - 1)} className="rounded-lg border border-gray-200 p-2 text-gray-700 disabled:opacity-50"><ChevronLeft size={16} /></button>
              <span className="text-sm text-gray-600">Page {page} of {pagination.lastPage}</span>
              <button disabled={page >= pagination.lastPage} onClick={() => setPage((value) => value + 1)} className="rounded-lg border border-gray-200 p-2 text-gray-700 disabled:opacity-50"><ChevronRight size={16} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
