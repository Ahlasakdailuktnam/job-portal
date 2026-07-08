import React, { useMemo, useState } from "react";
import {
  Activity,
  Briefcase,
  Building2,
  CheckCircle,
  Clock,
  CreditCard,
  DollarSign,
  RefreshCw,
  Shield,
  TrendingDown,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useAdminDashboard } from "../../hook/useDashboard";
import {
  useAdminCompanies,
  useAdminPendingJobs,
  useAdminPlans,
  useAdminSubscriptions,
  useAdminUsers,
} from "../../hook/useAdmin";

const formatNumber = (value) => Number(value || 0).toLocaleString();
const formatMoney = (value) => `$${Number(value || 0).toLocaleString()}`;

const statusColors = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626", "#64748b"];

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState("month");
  const dashboard = useAdminDashboard();
  const users = useAdminUsers({ per_page: 5 });
  const companies = useAdminCompanies({ per_page: 5 });
  const pendingJobs = useAdminPendingJobs(1);
  const plans = useAdminPlans();
  const subscriptions = useAdminSubscriptions();

  const data = dashboard.data || {};
  const isLoading =
    dashboard.isLoading || users.isLoading || companies.isLoading;
  const hasError = dashboard.isError || users.isError || companies.isError;

  const stats = [
    {
      label: "Total Revenue",
      value: formatMoney(data.total_revenue),
      icon: DollarSign,
      color: "text-emerald-700",
      bg: "bg-emerald-50",
    },
    {
      label: "This Month Income",
      value: formatMoney(data.current_month_revenue),
      icon: data.monthly_revenue_change >= 0 ? TrendingUp : TrendingDown,
      color:
        data.monthly_revenue_change >= 0 ? "text-green-700" : "text-red-700",
      bg: data.monthly_revenue_change >= 0 ? "bg-green-50" : "bg-red-50",
      change: `${data.monthly_revenue_change || 0}%`,
      badge:
        data.monthly_revenue_change >= 0
          ? "bg-green-50 text-green-700"
          : "bg-red-50 text-red-700",
    },
    {
      label: "Users",
      value: formatNumber(data.total_users),
      icon: Users,
      color: "text-blue-700",
      bg: "bg-blue-50",
    },
    {
      label: "Companies",
      value: formatNumber(data.total_companies),
      icon: Building2,
      color: "text-cyan-700",
      bg: "bg-cyan-50",
    },
    {
      label: "Jobs",
      value: formatNumber(data.total_jobs),
      icon: Briefcase,
      color: "text-amber-700",
      bg: "bg-amber-50",
    },
    {
      label: "Applications",
      value: formatNumber(data.total_applications),
      icon: Activity,
      color: "text-violet-700",
      bg: "bg-violet-50",
    },
  ];

  const monthlyRevenueData = useMemo(
    () => data.monthly_revenue || [],
    [data.monthly_revenue],
  );

  const jobStatusData = useMemo(
    () => [
      { name: "Active", value: data.active_jobs || 0 },
      { name: "Pending", value: data.pending_jobs || 0 },
      { name: "Rejected", value: data.rejected_jobs || 0 },
      { name: "Closed", value: data.closed_jobs || 0 },
    ],
    [data],
  );

  const userRoleData = useMemo(
    () => [
      { name: "Admins", value: data.total_admins || 0 },
      { name: "Recruiters", value: data.total_recruiters || 0 },
      { name: "Job Seekers", value: data.total_job_seekers || 0 },
    ],
    [data],
  );

  const subscriptionData = useMemo(
    () => [
      { name: "Active", value: data.active_subscriptions || 0 },
      { name: "Pending", value: data.pending_subscriptions || 0 },
      { name: "Expired", value: data.expired_subscriptions || 0 },
      { name: "Cancelled", value: data.cancelled_subscriptions || 0 },
    ],
    [data],
  );

  const paymentData = useMemo(
    () => [
      { name: "Paid", value: data.paid_payments || 0 },
      { name: "Pending", value: data.pending_payments || 0 },
      { name: "Failed", value: data.failed_payments || 0 },
    ],
    [data],
  );

  const recentUsers = users.data?.items || [];
  const recentCompanies = companies.data?.items || [];
  const pendingJobItems = pendingJobs.data?.items || [];

  const refetchAll = () => {
    dashboard.refetch();
    users.refetch();
    companies.refetch();
    pendingJobs.refetch();
    plans.refetch();
    subscriptions.refetch();
  };

  const StatCard = ({ stat }) => {
    const Icon = stat.icon;
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-lg ${stat.bg}`}
          >
            <Icon size={21} className={stat.color} />
          </div>
          <span
            className={`rounded-full px-2 py-1 text-xs font-medium ${stat.badge || "bg-gray-100 text-gray-600"}`}
          >
            {stat.change || "Live"}
          </span>
        </div>
        <p className="mt-4 text-2xl font-bold text-gray-900">{stat.value}</p>
        <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
      </div>
    );
  };

  const Empty = ({ label }) => (
    <p className="py-8 text-center text-sm text-gray-500">No {label} found.</p>
  );

  if (hasError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700">
        <p className="font-semibold">Unable to load admin dashboard.</p>
        <button
          onClick={refetchAll}
          className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm text-white"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-khmer">
      <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Live overview of users, jobs, companies, subscriptions, and revenue.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-lg border border-gray-200 bg-gray-50 p-1">
            {["week", "month", "year"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium capitalize transition ${timeRange === range ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-white"}`}
              >
                {range}
              </button>
            ))}
          </div>
          <button
            onClick={refetchAll}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
                <DollarSign size={18} className="text-emerald-700" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">Monthly Income</h2>
                <p className="text-xs text-gray-500">
                  Paid subscription revenue for the last 12 months
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-right">
            <p className="text-xs text-gray-500">This month</p>
            <p className="text-lg font-bold text-gray-900">
              {formatMoney(data.current_month_revenue)}
            </p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={340}>
          <AreaChart data={monthlyRevenueData}>
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#374151" stopOpacity={0.28} />
                <stop offset="95%" stopColor="#374151" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f1f5f9"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
              tickFormatter={(value) => `$${Number(value) / 1000}k`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const item = payload[0].payload;
                return (
                  <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
                    <p className="text-sm font-semibold text-gray-900">
                      {item.label}
                    </p>
                    <p className="mt-1 text-xs text-emerald-700">
                      Revenue: {formatMoney(item.revenue)}
                    </p>
                    <p className="text-xs text-gray-500">
                      Paid payments: {formatNumber(item.payments)}
                    </p>
                  </div>
                );
              }}
            />
            <Area
              type="monotoneY"
              dataKey="revenue"
              stroke="#374151"
              strokeWidth={3}
              fill="url(#incomeGradient)"
              activeDot={{ r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm xl:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-900">Job Status</h2>
              <p className="text-xs text-gray-500">
                Current moderation and posting state
              </p>
            </div>
            <Briefcase size={20} className="text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={jobStatusData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f1f5f9"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
                allowDecimals={false}
              />
              <Tooltip />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-900">Users By Role</h2>
              <p className="text-xs text-gray-500">
                Admins, recruiters, and seekers
              </p>
            </div>
            <Shield size={20} className="text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userRoleData}
                dataKey="value"
                nameKey="name"
                innerRadius={64}
                outerRadius={104}
                paddingAngle={3}
              >
                {userRoleData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={statusColors[index % statusColors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel
          title="Subscriptions"
          icon={CheckCircle}
          data={subscriptionData}
        />
        <Panel title="Payments" icon={CreditCard} data={paymentData} />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <ListPanel
          title="Recent Users"
          items={recentUsers}
          empty="users"
          render={(user) => (
            <Row
              key={user.id}
              title={user.name || "Unnamed user"}
              subtitle={user.email || user.role}
              meta={user.role || "user"}
            />
          )}
        />
        <ListPanel
          title="Recent Companies"
          items={recentCompanies}
          empty="companies"
          render={(company) => (
            <Row
              key={company.id}
              title={company.company_name || "Unnamed company"}
              subtitle={company.user?.email || company.address || "No contact"}
              meta={`${company.jobs_count || 0} jobs`}
            />
          )}
        />
        <ListPanel
          title="Pending Jobs"
          items={pendingJobItems}
          empty="pending jobs"
          render={(job) => (
            <Row
              key={job.id}
              title={job.title || "Untitled job"}
              subtitle={job.company?.company_name || "No company"}
              meta="Pending"
            />
          )}
        />
      </div>
    </div>
  );
};

const Panel = ({ title, icon: Icon, data }) => (
  <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
    <div className="mb-5 flex items-center gap-2">
      <Icon size={18} className="text-gray-500" />
      <h2 className="font-semibold text-gray-900">{title}</h2>
    </div>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {data.map((item, index) => (
        <div
          key={item.name}
          className="rounded-lg border border-gray-100 bg-gray-50 p-4"
        >
          <div
            className="mb-2 h-2 w-8 rounded-full"
            style={{
              backgroundColor: statusColors[index % statusColors.length],
            }}
          />
          <p className="text-xl font-bold text-gray-900">
            {formatNumber(item.value)}
          </p>
          <p className="text-xs text-gray-500">{item.name}</p>
        </div>
      ))}
    </div>
  </div>
);

const ListPanel = ({ title, items, render, empty }) => (
  <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
    <div className="border-b border-gray-100 px-5 py-4">
      <h2 className="font-semibold text-gray-900">{title}</h2>
    </div>
    <div className="divide-y divide-gray-100 px-5">
      {items.length ? (
        items.map(render)
      ) : (
        <p className="py-8 text-center text-sm text-gray-500">
          No {empty} found.
        </p>
      )}
    </div>
  </div>
);

const Row = ({ title, subtitle, meta }) => (
  <div className="flex items-center justify-between gap-4 py-4">
    <div className="min-w-0">
      <p className="truncate text-sm font-semibold text-gray-900">{title}</p>
      <p className="truncate text-xs text-gray-500">{subtitle}</p>
    </div>
    <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
      {meta}
    </span>
  </div>
);

export default AdminDashboard;
