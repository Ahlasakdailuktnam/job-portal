// components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  LayoutDashboardIcon, 
  Save, 
  Bell, 
  User, 
  Settings, 
  LogOut, 
  ChevronDown,
  Menu,
  X,
  Briefcase,
  Home,
  Users,
  FileText,
  Phone,
  BookOpen,
} from "lucide-react";
import logo from "../assets/logo.png";
import useAuthStore from "../store/authStore";
import { handleLogout } from "../util/logout";
import LogoutModal from "./modals/logoutModal";
import { useSavedJobsManager } from "../hook/useSavedJobsManager";

const Navbar = () => {
  const user = useAuthStore((state) => state.user);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Use Saved Jobs Manager
  const { savedJobs } = useSavedJobsManager();
  const savedCount = savedJobs?.length || 0;

  // Navigation links
  const navLinks = [
    { to: "/", label: "ទំព័រដើម", icon: Home },
    { to: "/candidates", label: "អំពីយើង", icon: Users },
    { to: "/jobs", label: "ស្វែងរកការងារ", icon: Briefcase },
    { to: "/blog", label: "ដៃគូក្រុមហ៊ុន", icon: BookOpen },
    { to: "/cv", label: "បង្កើតCV", icon: FileText },
    { to: "/contact", label: "ទំនាក់ទំនង", icon: Phone },
  ];

  return (
    <header className="w-full border-b border-gray-200 sticky top-0 z-50">
      <div className="px-4 md:px-6 lg:px-14 flex items-center justify-between h-16 md:h-20">
        {/* Logo - Original Size */}
        <Link to="/" className="flex-shrink-0">
          <img className="w-28 h-28" src={logo} alt="Logo" />
        </Link>

        {/* Desktop Navigation - Original Font Size */}
        <nav className="hidden lg:flex items-center gap-8 font-medium text-gray-600">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="hover:text-black transition whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
            <Bell size={18} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"
          >
            {mobileMenuOpen ? (
              <X size={22} className="text-gray-600" />
            ) : (
              <Menu size={22} className="text-gray-600" />
            )}
          </button>

          {/* Auth Buttons or User Menu - Original Style */}
          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <button className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
                  ចូលគណនី
                </button>
              </Link>
              <Link to="/register">
                <button className="px-5 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition">
                  ចុះឈ្មោះ
                </button>
              </Link>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(!open);
                }}
                className="flex items-center gap-3 px-3 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
              >
                <div className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center font-semibold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-sm font-semibold text-gray-800">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
                <ChevronDown size={16} className="text-gray-400" />
              </button>

              {/* Dropdown Menu */}
              {open && (
                <div className="absolute right-0 top-full mt-2 w-60 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                  <div className="px-4 py-3 border-b">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  
                  {user.role === "recruiter" && (
                    <Link
                      to="/recruiter/dashboard"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition"
                      onClick={() => setOpen(false)}
                    >
                      <LayoutDashboardIcon size={16} />
                      Dashboard
                    </Link>
                  )}
                  
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition"
                    onClick={() => setOpen(false)}
                  >
                    <User size={16} />
                    Profile
                  </Link>
                  
                  <Link
                    to="/saved-jobs"
                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition"
                    onClick={() => setOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <Save size={16} />
                      ការងារដែលបានរក្សាទុក
                    </div>
                    {savedCount > 0 && (
                      <span className="px-2 py-0.5 bg-gray-700 text-white text-xs rounded-full">
                        {savedCount}
                      </span>
                    )}
                  </Link>

                  <Link
                    to="/my-applications"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition"
                    onClick={() => setOpen(false)}
                  >
                    <FileText size={16} />
                    My Applications
                  </Link>
                  
                  <Link
                    to="/settings"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition"
                    onClick={() => setOpen(false)}
                  >
                    <Settings size={16} />
                    Setting
                  </Link>
                  
                  <button
                    onClick={() => {
                      setOpen(false);
                      setShowLogoutModal(true);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left border-t border-gray-100 transition"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 px-4 py-4 shadow-lg">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition text-gray-600 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                <link.icon size={18} />
                <span className="text-sm font-medium">{link.label}</span>
              </Link>
            ))}
            
            {/* Mobile Auth Buttons */}
            {!user ? (
              <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-gray-200">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
                    ចូលគណនី
                  </button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full px-4 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition">
                    ចុះឈ្មោះ
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-1 mt-3 pt-3 border-t border-gray-200">
                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User size={18} />
                  <span className="text-sm font-medium">Profile</span>
                </Link>
                <Link
                  to="/saved-jobs"
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-50 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <Save size={18} />
                    <span className="text-sm font-medium">ការងារដែលបានរក្សាទុក</span>
                  </div>
                  {savedCount > 0 && (
                    <span className="px-2 py-0.5 bg-gray-700 text-white text-xs rounded-full">
                      {savedCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/my-applications"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FileText size={18} />
                  <span className="text-sm font-medium">My Applications</span>
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowLogoutModal(true);
                  }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition text-left"
                >
                  <LogOut size={18} />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            )}
          </nav>
        </div>
      )}

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={() => {
          handleLogout();
          setShowLogoutModal(false);
          setOpen(false);
          setMobileMenuOpen(false);
        }}
      />
    </header>
  );
};

export default Navbar;
