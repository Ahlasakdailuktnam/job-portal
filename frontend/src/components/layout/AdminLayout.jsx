import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Bell, Plus } from "lucide-react";
import SidebarAdmin from "../sidebar/SidebarAdmin";

const AdminLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className="relative w-full min-h-screen bg-[#f7f7f9] overflow-hidden font-khmer">
      <SidebarAdmin
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <div
        className={`transition-all duration-300 ${
          isCollapsed ? "md:ml-20" : "md:ml-72"
        }`}
      >
        <div className="bg-white border-b border-gray-200">
          <div className="lg:px-20 px-5 py-2.5">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  សួស្តី, សុខ!
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  នេះជាសង្ខេបអំពីការងាររបស់អ្នកនៅថ្ងៃនេះ
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
                  <Bell size={20} className="text-gray-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                  <Plus size={16} />
                  បង្ហោះការងារថ្មី
                </button>
              </div>
            </div>
          </div>
        </div>
        <main className="px-8 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
