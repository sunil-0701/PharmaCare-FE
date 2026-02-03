import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  ShoppingCart,
  Package,
  Truck,
  FileText,
  Pill,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext.jsx";

export function Sidebar({ currentView, onViewChange, isOpen, onClose }) {
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const adminMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "staff", label: "Staff Management", icon: Users },
    { id: "reports", label: "Reports & Analytics", icon: BarChart3 },
    { id: "settings", label: "System Settings", icon: Settings },
  ];

  const pharmacistMenuItems = [
    { id: "pos", label: "Point of Sale", icon: ShoppingCart },
    { id: "prescriptions", label: "Prescriptions", icon: FileText },
  ];

  const inventoryMenuItems = [
    { id: "inventory", label: "Inventory", icon: Package },
    { id: "suppliers", label: "Suppliers", icon: Truck },
    { id: "reports", label: "Stock Reports", icon: BarChart3 },
  ];

  const menuItems =
    user?.role === "admin"
      ? adminMenuItems
      : user?.role === "pharmacist"
        ? pharmacistMenuItems
        : inventoryMenuItems;

  const roleStyles = {
    admin: "bg-emerald-50 text-emerald-700",
    pharmacist: "bg-blue-50 text-blue-700",
    inventory: "bg-amber-50 text-amber-800",
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 lg:static lg:flex h-screen bg-gradient-to-b from-white via-gray-50/50 to-gray-100/30 border-r border-gray-200/80 shadow-xl flex flex-col transition-all duration-300 ease-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        ${isCollapsed ? "lg:w-20" : "lg:w-[260px]"}
        w-[280px]
      `}>
        {/* Mobile Close Button */}
        <button
          className="lg:hidden absolute top-4 right-4 p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <button
          className="hidden lg:flex absolute top-4 -right-3 bg-white border border-gray-200 rounded-full w-7 h-7 cursor-pointer items-center justify-center z-10 shadow-md hover:shadow-lg hover:bg-gray-50 hover:scale-110 transition-all duration-200 active:scale-95"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label="Toggle sidebar"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        {/* Logo Section */}
        <div className="p-6 border-b border-emerald-500/10">
          <div className="flex items-center gap-3.5">
            <div className="flex-shrink-0 w-11 h-11 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
              <Pill className="text-white w-6 h-6" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col animate-in fade-in slide-in-from-left-2 duration-300">
                <span className="text-lg font-bold text-white tracking-tight leading-none">PharmaCare</span>
                <span className="text-[0.6rem] font-bold text-emerald-400 uppercase tracking-[0.2em] mt-1.5 opacity-80">Health Systems</span>
              </div>
            )}
          </div>
        </div>

        {!isCollapsed && user?.role && (
          <div className={`mx-4 mb-4 p-3 rounded-xl text-sm font-semibold shadow-sm border border-white/10 backdrop-blur-sm transition-all duration-200 hover:shadow-md ${roleStyles[user.role] || ""}`}>
            <span className="opacity-70 text-xs block mb-0.5 tracking-wider uppercase">Role</span>
            <strong className="capitalize tracking-wide">{user.role}</strong>
          </div>
        )}

        {/* Navigation Section */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto custom-scrollbar">
          {menuItems.map(({ id, label, icon: Icon }) => {
            const active = currentView === id;
            return (
              <button
                key={id}
                className={`
                  w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-sm font-bold tracking-wide transition-all duration-300 group relative
                  ${active
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                    : "text-slate-400 hover:bg-emerald-500/10 hover:text-emerald-400"}
                `}
                onClick={() => onViewChange(id)}
                title={isCollapsed ? label : undefined}
              >
                <Icon size={20} className={`transition-all duration-200 ${active ? "text-white drop-shadow-sm" : "text-slate-500 group-hover:text-emerald-400 group-hover:scale-110"}`} />
                {!isCollapsed && <span className="text-sm font-medium tracking-wide">{label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          {!isCollapsed && (
            <div className="mb-3 px-1">
              <p className="text-sm font-semibold text-gray-900 truncate tracking-wide">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate tracking-wide">{user?.email}</p>
            </div>
          )}

          <button
            className="w-full flex items-center gap-3 bg-transparent border border-gray-200 rounded-xl p-2.5 cursor-pointer hover:bg-red-50 hover:text-red-700 hover:border-red-200 hover:shadow-md transition-all duration-200 group hover:scale-[1.02] active:scale-[0.98]"
            onClick={logout}
            title={isCollapsed ? "Logout" : undefined}
          >
            <LogOut size={20} className="text-gray-400 group-hover:text-red-500 transition-all duration-200 group-hover:scale-110" />
            {!isCollapsed && <span className="text-sm font-semibold tracking-wide">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}