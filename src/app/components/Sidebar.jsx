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
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext.jsx";
import "./Sidebar.css";

export function Sidebar({ currentView, onViewChange }) {
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
    // REMOVED: { id: "reports", label: "Sales Reports", icon: BarChart3 },
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

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      {/* Collapse Toggle */}
      <button
        className="sidebar-toggle"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label="Toggle sidebar"
      >
        {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
      </button>

      {/* Logo */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <Pill />
        </div>
        {!isCollapsed && (
          <div>
            <h1 className="sidebar-title">PharmaCare</h1>
            <p className="sidebar-subtitle">Healthcare System</p>
          </div>
        )}
      </div>

      {/* Role Badge */}
      {!isCollapsed && (
        <div className={`sidebar-role sidebar-role-${user?.role}`}>
          <span>Role - </span>
          <strong>{user?.role}</strong>
        </div>
      )}

      {/* Menu */}
      <nav className="sidebar-menu">
        {menuItems.map(({ id, label, icon: Icon }) => {
          const active = currentView === id;
          return (
            <button
              key={id}
              className={`sidebar-item ${active ? "active" : ""}`}
              onClick={() => onViewChange(id)}
              title={isCollapsed ? label : undefined}
            >
              <Icon />
              {!isCollapsed && <span>{label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        {!isCollapsed && (
          <div className="sidebar-user">
            <p className="sidebar-user-name">{user?.name}</p>
            <p className="sidebar-user-email">{user?.email}</p>
          </div>
        )}

        <button
          className="sidebar-logout"
          onClick={logout}
          title={isCollapsed ? "Logout" : undefined}
        >
          <LogOut />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}