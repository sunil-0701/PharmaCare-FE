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
        fixed inset-y-0 left-0 z-50 lg:static lg:flex h-screen bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        ${isCollapsed ? "lg:w-20" : "lg:w-[260px]"}
        w-[280px]
      `}>
        {/* Mobile Close Button */}
        <button
          className="lg:hidden absolute top-4 right-4 p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <button
          className="hidden lg:flex absolute top-4 -right-3 bg-white border border-gray-200 rounded-full w-7 h-7 cursor-pointer items-center justify-center z-10 shadow-sm hover:bg-gray-50"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label="Toggle sidebar"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        <div className="flex items-center gap-3 px-4 py-6 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white p-2.5 rounded-xl flex-shrink-0">
            <Pill size={24} />
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <h1 className="text-lg font-bold truncate">PharmaCare</h1>
              <p className="text-[0.75rem] text-gray-500 truncate">Healthcare System</p>
            </div>
          )}
        </div>

        {!isCollapsed && user?.role && (
          <div className={`mx-4 mb-4 p-3 rounded-xl text-sm font-medium ${roleStyles[user.role] || ""}`}>
            <span className="opacity-70 text-xs block mb-0.5">ROLE</span>
            <strong className="capitalize">{user.role}</strong>
          </div>
        )}

        <nav className="flex-1 px-2 space-y-1 overflow-y-auto min-h-0">
          {menuItems.map(({ id, label, icon: Icon }) => {
            const active = currentView === id;
            return (
              <button
                key={id}
                className={`flex items-center gap-3 py-2.5 px-3 rounded-xl border-none cursor-pointer w-full transition-all duration-200 group ${active
                  ? "bg-emerald-50 text-emerald-600 font-semibold"
                  : "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                onClick={() => onViewChange(id)}
                title={isCollapsed ? label : undefined}
              >
                <Icon size={20} className={active ? "text-emerald-600" : "text-gray-400 group-hover:text-gray-600"} />
                {!isCollapsed && <span className="text-sm">{label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          {!isCollapsed && (
            <div className="mb-3 px-1">
              <p className="text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          )}

          <button
            className="w-full flex items-center gap-3 bg-transparent border border-gray-200 rounded-xl p-2.5 cursor-pointer hover:bg-red-50 hover:text-red-700 hover:border-red-100 transition-all duration-200 group"
            onClick={logout}
            title={isCollapsed ? "Logout" : undefined}
          >
            <LogOut size={20} className="text-gray-400 group-hover:text-red-500" />
            {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}