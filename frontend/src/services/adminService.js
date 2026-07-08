import * as adminApi from "../api/admin/admin";
import { getPendingJobs } from "../api/job/adminJobServiec";
import { getplan } from "../api/plan/plan";
import { getSubscriptions } from "../api/subscription/subscription";

const paginationFrom = (data) => ({
  currentPage: data?.current_page ?? 1,
  lastPage: data?.last_page ?? 1,
  total: data?.total ?? 0,
  from: data?.from ?? 0,
  to: data?.to ?? 0,
  perPage: data?.per_page ?? 10,
});

const unwrapPaginated = (response) => {
  const data = response?.data?.data ?? response?.data ?? {};
  if (Array.isArray(data)) {
    return { items: data, pagination: paginationFrom({ total: data.length }) };
  }

  return {
    items: data?.data ?? [],
    pagination: paginationFrom(data),
  };
};

export const adminService = {
  getUsers: async (params) => unwrapPaginated(await adminApi.getAdminUsers(params)),
  getRecruiters: async (params) => unwrapPaginated(await adminApi.getAdminRecruiters(params)),
  getCompanies: async (params) => unwrapPaginated(await adminApi.getAdminCompanies(params)),
  getPendingJobs: async (page = 1) => {
    const response = await getPendingJobs(page);
    const data = response?.data ?? {};
    return {
      items: data?.data ?? [],
      pagination: paginationFrom(data),
    };
  },
  getPlans: async () => {
    const response = await getplan();
    return response?.data ?? [];
  },
  getSubscriptions: async (params) => {
    const response = await getSubscriptions(params);
    return response?.data ?? [];
  },
};
