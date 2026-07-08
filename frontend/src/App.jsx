  import React from "react";
  import { Toaster } from "react-hot-toast";
  import UserRoute from "./routes/user/UserRoute";
  import PartnerRoute from "./routes/Partner/PartnerRoute";
  import AdminRoutes from "./routes/admin/AdminRoute";
  import { BrowserRouter, Routes, Route } from "react-router-dom";

  const App = () => {
    return (
      <BrowserRouter>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
          }}
        />
        <Routes>
          <Route path="/recruiter/*" element={<PartnerRoute />} />

          <Route path="/admin/*" element={<AdminRoutes />} />

          <Route path="/*" element={<UserRoute />} />
        </Routes>
      </BrowserRouter>
    );
  };

  export default App;
