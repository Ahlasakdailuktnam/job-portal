import React from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

const LayoutForAuth = () => {
  return (
    <div>
      <div className="relative w-full min-h-screen bg-[#f7f7f9] overflow-hidden font-khmer flex flex-col">
        
        <main className="relative z-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutForAuth;