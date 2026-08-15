import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../../page/admin/AdminDashborad";
import AdminCompanies from "../../page/admin/company/AdminCompanies";
import CompanyDetail from "../../page/admin/company/CompanyDetail";
import AdminUsers from "../../page/admin/AdminUsers";
import NotFound from "../../page/NotFound";
import ProtectedRole from "../../components/protected/ProtectedRole";
import AdminLayout from "../../components/layout/AdminLayout";
import CategoryList from "../../page/admin/category/CategoryList";
import CategoryAdd from "../../page/admin/category/CategoryAdd";
import CategoryEdit from "../../page/admin/category/CategoryEdit";
import MakePlan from "../../page/admin/plan/MakePlan";
import ListPlan from "../../page/admin/plan/ListPlan";
import UpdatePlan from "../../page/admin/plan/UpdatePlan";
import AdminPendingJobs from "../../page/admin/job/AdminPendingJob";
import ListJobs from "../../page/admin/job/ListJobs";
import GetAllSubscription from "../../page/admin/subscriptions/GetAllSubscription";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRole roles={["admin"]}>
            <AdminLayout />
          </ProtectedRole>
        }
      >
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/jobs" element={<ListJobs />} />
        <Route path="/jobs/pending" element={<AdminPendingJobs />} />
        <Route path="/companiesdetail" element={<CompanyDetail />} />
        
        {/* Categories */}
        <Route path="/category/list" element={<CategoryList />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/category/add" element={<CategoryAdd />} />
        <Route path="/categories/create" element={<CategoryAdd />} />
        <Route path="/categories/edit/:id" element={<CategoryEdit />} />
        <Route path="/category/edit/:id" element={<CategoryEdit />} />

        {/* Plans */}
        <Route path="/plan/list" element={<ListPlan />} />
        <Route path="/plans" element={<ListPlan />} />
        <Route path="/plan" element={<ListPlan />} />
        <Route path="/plan/add" element={<MakePlan />} />
        <Route path="/plans/create" element={<MakePlan />} />
        <Route path="/plans/edit/:id" element={<UpdatePlan />} />
        <Route path="/plan/edit/:id" element={<UpdatePlan />} />

        {/* Users, Companies, Subscriptions */}
        <Route path="/all-users" element={<AdminUsers />} />
        <Route path="/users" element={<AdminUsers />} />
        <Route path="/user" element={<AdminUsers />} />
        <Route path="/all-company" element={<AdminCompanies />} />
        <Route path="/companies" element={<AdminCompanies />} />
        <Route path="/all-subs" element={<GetAllSubscription />} />
        <Route path="/subscriptions" element={<GetAllSubscription />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AdminRoutes;
