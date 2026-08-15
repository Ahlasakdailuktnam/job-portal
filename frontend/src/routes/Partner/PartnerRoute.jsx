import React from "react";
import { Routes, Route } from "react-router-dom";
import JobDashboard from "../../page/recruiter/JobDashboard";
import LayoutForPart from "../../components/layout/LayoutForPart";
import CandidateManagement from "../../page/user/PostJob/Dashborad/CandidateManagement";
import NotFound from "../../page/NotFound";
import CompanyPage from "../../page/recruiter/company/CompanyPage";
import ProtectedRole from "../../components/protected/ProtectedRole";
import CreateJob from "../../page/recruiter/job/CreateJob";
import PreviewJob from "../../page/recruiter/job/PreviewJob";
import ListJob from "../../page/recruiter/job/ListJob";
import RecruiterSettings from "../../page/recruiter/RecruiterSettings";
import JobPostingPlans from "../../page/user/PostJob/JobPostingPlans";

const PartnerRoute = () => {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRole roles={["recruiter"]}>
            <LayoutForPart />
          </ProtectedRole>
        }
      >
        <Route path="/dashboard" element={<JobDashboard />} />
        <Route path="/jobs/list" element={<ListJob />} />
        <Route path="/candidates" element={<CandidateManagement />} />
        <Route path="/jobs/post" element={<CreateJob />} />
        <Route path="/jobs/create" element={<CreateJob />} />
        <Route path="/setting" element={<RecruiterSettings />} />

        {/* Plans — recruiter selects/renews subscription here */}
        <Route path="/plans" element={<JobPostingPlans />} />

        <Route path="/jobs/:id/preview" element={<PreviewJob />} />
        <Route path="/jobs/:id/edit" element={<PreviewJob />} />
        <Route path="/jobs/preview" element={<PreviewJob />} />

        <Route path="/company" element={<CompanyPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PartnerRoute;
