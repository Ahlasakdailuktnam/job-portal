import React from "react";
import { Outlet, Link } from "react-router-dom";
const LoginLayout = () => {
  return (
    <div>
      <div className="relative w-full min-h-screen bg-[#f7f7f9] overflow-hidden font-khmer flex flex-col">
        
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LoginLayout;
