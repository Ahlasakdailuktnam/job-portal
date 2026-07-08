import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Briefcase,
  Users,
  BarChart3,
  Settings,
  Grid,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronLeft,
  Bell,
  Building,
  Plus,
  Star,
  CheckCircle,
  Clock,
  Calendar,
  BookUser,
  User2Icon,
  Building2,
  SubscriptIcon,
  Subscript,
} from "lucide-react";
import { handleLogout } from "../../util/logout";
import LogoutModal from "../modals/logoutModal";
import useAuthStore from "../../store/authStore";

const SidebarAdmin = ({ isCollapsed, setIsCollapsed }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  // Check screen size
  useEffect(() => {
    const checkIfMobile = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(false);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Collapse submenus cleanly if the sidebar becomes collapsed
  useEffect(() => {
    if (isCollapsed) {
      setExpandedMenus({});
    }
  }, [isCollapsed]);

  // Close mobile navigation drawer on path change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = (menuKey, e) => {
    // If it's collapsed, open the sidebar first instead of breaking the layout
    if (isCollapsed) {
      setIsCollapsed(false);
      setExpandedMenus({ [menuKey]: true });
      return;
    }
    setExpandedMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  const menuStructure = [
    {
      id: "dashboard",
      icon: Grid,
      label: "ផ្ទាំងគ្រប់គ្រង",
      path: "/admin/dashboard",
      type: "single",
    },
    {
      id: "job-management",
      icon: Briefcase,
      label: "ការគ្រប់គ្រងការងារ",
      path: "/admin/jobs",
      type: "dropdown",
      badge: "12",
      subItems: [
        {
          path: "/admin/jobs",
          icon: Briefcase,
          label: "ការងារទាំងអស់",
          badge: "24",
        },
        // {
        //   path: "/admin/jobs",
        //   icon: Plus,
        //   label: "បង្ហោះការងារថ្មី",
        //   badge: "3",
        // },
      
        {
          path: "/admin/jobs/pending",
          icon: Clock,
          label: "ការងារកំពុងរង់ចាំ",
          badge: "7",
        },
      ],
    },
    {
      id: "category-management",
      icon: Briefcase,
      label: "ការគ្រប់គ្រងប្រភេទការងារ",
      path: "/admin/category",
      type: "dropdown",
      badge: "12",
      subItems: [
        {
          path: "/admin/category/list",
          icon: Briefcase,
          label: "ប្រភេទការងារទាំងអស់​",
          badge: "24",
        },
        {
          path: "/admin/category/add",
          icon: Plus,
          label: "បង្កើតប្រភេទការងារថ្មី",
          badge: "3",
        },
      
       
      ],
    },
    {
      id: "plan-management",
      icon: BookUser,
      label: "ការគ្រប់គ្រងគម្រោងអាជីវកម្ម",
      path: "/admin/plan",
      type: "dropdown",
      badge: "12",
      subItems: [
        {
          path: "/admin/plan/list",
          icon: Briefcase,
          label: "ប្រភេទអាជីវកម្មទាំងអស់​",
          badge: "24",
        },
        {
          path: "/admin/plan/add",
          icon: Plus,
          label: "បង្កើតប្រភេទអាជីវកម្មថ្មី",
          badge: "3",
        },
      
       
      ],
    },
    {
      id: "candidate-management",
      icon: Users,
      label: "បេក្ខជន",
      path: "/admin/candidates",
      type: "dropdown",
      badge: "342",
      subItems: [
        {
          path: "/admin/candidates",
          icon: Users,
          label: "បេក្ខជនទាំងអស់",
          badge: "342",
        },
        {
          path: "/admin/shortlisted",
          icon: Star,
          label: "ជម្រើសពិសេស",
          badge: "45",
        },
        {
          path: "/admin/interviews",
          icon: Calendar,
          label: "ការសម្ភាសន៍",
          badge: "12",
        },
        {
          path: "/admin/hired",
          icon: CheckCircle,
          label: "បានជ្រើសរើស",
          badge: "28",
        },
      ],
    },
    {
      id: "user",
      icon: Users,
      label: "អ្នកប្រើប្រាស់​ទាំងអស់",
      path: "/admin/all-users",
      type: "single",
    },
    {
      id: "company",
      icon: Building,
      label: "ក្រុមហ៊ុនទាំងអស់",
      path: "/admin/all-company",
      type: "single",
    },
    {
      id: "company",
      icon: Subscript,
      label: "All Subscription",
      path: "/admin/all-subs",
      type: "single",
    },
    {
      id: "tools",
      icon: Settings,
      label: "ការកំណត់",
      path: "/admin/setting",
      type: "single",
    },
  ];

  const isActive = (path) => location.pathname === path;
  const isSubItemActive = (subItems) =>
    subItems?.some((item) => isActive(item.path));

  const renderSingleMenuItem = (item) => {
    const Icon = item.icon;
    const active = isActive(item.path);

    return (
      <Link
        key={item.id}
        to={item.path}
        className={`group relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
          active
            ? "bg-gray-800 text-white"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        } ${isCollapsed ? "justify-center" : ""}`}
      >
        <div
          className={`flex-shrink-0 transition-colors duration-300 ${active ? "text-white" : "text-gray-400 group-hover:text-gray-600"}`}
        >
          <Icon size={20} />
          {item.badge && isCollapsed && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          )}
        </div>

        <div
          className={`flex items-center justify-between w-full transition-all duration-300 overflow-hidden ${
            isCollapsed
              ? "max-w-0 opacity-0 pointer-events-none"
              : "max-w-xs opacity-100"
          }`}
        >
          <span className="text-sm font-noto truncate pr-2">{item.label}</span>
          {item.badge && (
            <span
              className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 transition-colors duration-300 ${active ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"}`}
            >
              {item.badge}
            </span>
          )}
        </div>

        {isCollapsed && (
          <div className="absolute left-full ml-4 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-lg font-noto pointer-events-none">
            {item.label}
          </div>
        )}
      </Link>
    );
  };

  const renderDropdownMenuItem = (item) => {
    const Icon = item.icon;
    const isExpanded = expandedMenus[item.id];
    const active = isActive(item.path) || isSubItemActive(item.subItems);

    return (
      <div key={item.id} className="space-y-0.5">
        {/* Unified Row: Fixed the layout breaking from your screenshot */}
        <div
          onClick={(e) => toggleMenu(item.id, e)}
          className={`group relative flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 ${
            active
              ? "bg-gray-800 text-white"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          } ${isCollapsed ? "justify-center" : ""}`}
        >
          <div className="flex items-center gap-3 min-w-0 w-full">
            <div
              className={`flex-shrink-0 transition-colors duration-300 ${active ? "text-white" : "text-gray-400 group-hover:text-gray-600"}`}
            >
              <Icon size={20} />
              {item.badge && isCollapsed && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              )}
            </div>

            <div
              className={`flex items-center justify-between flex-1 transition-all duration-300 overflow-hidden ${
                isCollapsed
                  ? "max-w-0 opacity-0 pointer-events-none"
                  : "max-w-xs opacity-100"
              }`}
            >
              <span className="text-sm font-noto truncate pr-2">
                {item.label}
              </span>
              <div className="flex items-center gap-2 flex-shrink-0">
                {item.badge && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${active ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"}`}
                  >
                    {item.badge}
                  </span>
                )}
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 text-inherit ${isExpanded ? "rotate-180" : ""}`}
                />
              </div>
            </div>
          </div>

          {/* Collapsed Hover State Popup Info */}
          {isCollapsed && (
            <div className="absolute left-full ml-4 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-lg font-noto pointer-events-none">
              {item.label} ({item.badge || 0})
            </div>
          )}
        </div>

        {/* Smooth Accordion Height Expansion */}
        <div
          className={`grid transition-all duration-300 ease-in-out ${
            isExpanded && !isCollapsed
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0 pointer-events-none"
          }`}
        >
          <div className="overflow-hidden">
            <div className="ml-6 space-y-0.5 border-l border-gray-200 pl-4 py-1">
              {item.subItems.map((subItem) => {
                const SubIcon = subItem.icon;
                const subActive = isActive(subItem.path);

                return (
                  <Link
                    key={subItem.path}
                    to={subItem.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 ${
                      subActive
                        ? "bg-gray-800 text-white"
                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    }`}
                  >
                    <SubIcon
                      size={16}
                      className={`flex-shrink-0 ${subActive ? "text-white" : "text-gray-400"}`}
                    />
                    <span className="text-sm font-noto truncate pr-1">
                      {subItem.label}
                    </span>
                    {subItem.badge && (
                      <span
                        className={`ml-auto text-xs px-2 py-0.5 rounded-full flex-shrink-0 transition-colors duration-300 ${subActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"}`}
                      >
                        {subItem.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Mobile Top Navbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-20 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu size={22} className="text-gray-600" />
          </button>
          <div className="bg-gray-800 p-2 rounded-lg">
            <Briefcase size={18} className="text-white" />
          </div>
          <div>
            <span className="text-lg font-bold text-gray-900 font-noto">
              JobPortal
            </span>
            <p className="text-xs text-gray-500 leading-none font-noto">ដៃគូ</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg relative transition-colors">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
          </button>
          <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-white font-bold">
            {user?.name?.charAt(0) || "ស"}
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="bg-gray-800 p-2.5 rounded-lg">
              <Briefcase size={22} className="text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900 font-noto">
                JobPortal
              </span>
              <p className="text-xs text-gray-500 font-noto">
                ផ្ទាំងគ្រប់គ្រងដៃគូ
              </p>
            </div>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={22} className="text-gray-500" />
          </button>
        </div>

        <nav
          className="p-4 space-y-0.5 overflow-y-auto"
          style={{ height: "calc(100% - 180px)" }}
        >
          {menuStructure.map((item) =>
            item.type === "single"
              ? renderSingleMenuItem(item)
              : renderDropdownMenuItem(item),
          )}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                {user?.name?.charAt(0) || "ស"}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate font-noto">
                {user?.name || "សុខ សុភក្ត្រា"}
              </p>
              <p className="text-xs text-gray-500 truncate font-noto">
                {user?.email || "sok.sophaktra@email.com"}
              </p>
            </div>
            <button
              onClick={() => setShowLogoutModal(true)}
              className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut size={18} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div
        className={`hidden md:flex bg-white border-r border-gray-200 min-h-screen fixed left-0 top-0 flex-col transition-all duration-300 ease-in-out z-30 ${
          isCollapsed ? "w-20" : "w-72"
        }`}
      >
        <div
          className={`flex items-center ${isCollapsed ? "justify-center" : "justify-between"} p-5 border-b border-gray-200 h-[77px]`}
        >
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 overflow-hidden"
          >
            <div className="bg-gray-800 p-2.5 rounded-lg flex-shrink-0">
              <Briefcase size={22} className="text-white" />
            </div>
            <div
              className={`transition-all duration-300 ease-in-out whitespace-nowrap ${isCollapsed ? "opacity-0 max-w-0 pointer-events-none" : "opacity-100 max-w-xs"}`}
            >
              <span className="text-xl font-bold text-gray-900 font-noto">
                JobPortal
              </span>
              <p className="text-xs text-gray-500 font-noto">
                ផ្ទាំងគ្រប់គ្រងដៃគូ
              </p>
            </div>
          </Link>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`p-1.5 hover:bg-gray-100 rounded-lg transition-all duration-300 text-gray-400 hover:text-gray-600 ${
              isCollapsed ? "hidden" : ""
            }`}
          >
            <ChevronLeft size={18} />
          </button>
        </div>

        <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
          {menuStructure.map((item) =>
            item.type === "single"
              ? renderSingleMenuItem(item)
              : renderDropdownMenuItem(item),
          )}
        </nav>

        <div
          className={`p-4 border-t border-gray-200 bg-gray-50 transition-all duration-300 ${isCollapsed ? "flex justify-center" : ""}`}
        >
          <div
            className={`flex items-center w-full ${isCollapsed ? "flex-col gap-2" : "gap-3"}`}
          >
            <div className="relative flex-shrink-0">
              <div
                className={`bg-gray-800 rounded-lg flex items-center justify-center text-white font-bold transition-all duration-300 ${
                  isCollapsed ? "w-12 h-12 text-lg" : "w-11 h-11 text-base"
                }`}
              >
                {user?.name?.charAt(0) || "ស"}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
            </div>

            <div
              className={`flex items-center justify-between flex-1 transition-all duration-300 ease-in-out overflow-hidden ${
                isCollapsed
                  ? "opacity-0 max-w-0 pointer-events-none"
                  : "opacity-100 max-w-xs"
              }`}
            >
              <div className="flex-1 min-w-0 mr-2">
                <p className="text-sm font-semibold text-gray-900 truncate font-noto">
                  {user?.name || "សុខ សុភក្ត្រា"}
                </p>
                <p className="text-xs text-gray-500 truncate font-noto">
                  {user?.email || "sok.sophaktra@email.com"}
                </p>
              </div>
              <button
                onClick={() => setShowLogoutModal(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              >
                <LogOut size={18} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden h-16" />
      <div
        className={`hidden md:block transition-all duration-300 ease-in-out ${isCollapsed ? "ml-20" : "ml-72"}`}
      />

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={() => {
          handleLogout();
          setShowLogoutModal(false);
        }}
      />
    </>
  );
};

export default SidebarAdmin;
