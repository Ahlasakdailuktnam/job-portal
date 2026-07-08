import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "../../page/user/HomePage";
import AboutUs from "../../page/user/AboutUs";
import Contact from "../../page/user/Contact";
import JobPosting from "../../page/user/PostJob/JobPosting";
import FindJobs from "../../page/user/FindJobs";
import LoginPage from "../../page/auth/LoginPage";
import JobDetails from "../../page/user/JobDetails";
import JobCart from "../../page/cart/JobCart";
import LayoutForAuth from "../../components/layout/LayoutForAuth";
import MainLayout from "../../components/layout/MainLayout";
import OTPSend from "../../page/auth/OTPVerification";
import RegisterPage from "../../page/auth/RegisterPage";
import NotFound from "../../page/NotFound";
import CheckoutPage from "../../page/user/payment/CheckoutPage";
import PaymentSuccessPage from "../../page/user/payment/PaymentSuccessPage";
import PaymentFailedPage from "../../page/user/payment/PaymentFailedPage";
import { CVBuilderPage, CVListPage } from "../../page/user/cv";
import MyApplications from "../../page/user/MyApplications";


const UserRoute = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/candidates" element={<AboutUs />} />
        <Route path="/jobs" element={<FindJobs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/blog" element={<JobPosting />} />
        <Route path="/saved-jobs" element={<JobCart />} />
        <Route path="/my-applications" element={<MyApplications />} />
        <Route path="/checkout/:planId" element={<CheckoutPage />} />
        <Route path="/payment-success" element={<PaymentSuccessPage />} />
        <Route path="/cv" element={<CVListPage />} />
        <Route path="/cv/create" element={<CVBuilderPage />} />
        <Route path="/cv/:id/edit" element={<CVBuilderPage />} />
      </Route>

      <Route element={<LayoutForAuth />}>
        <Route path="/payment-failed" element={<PaymentFailedPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/otp" element={<OTPSend />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default UserRoute;
