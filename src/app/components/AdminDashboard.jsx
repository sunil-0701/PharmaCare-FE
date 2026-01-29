import React from "react";
import {
  DollarSign,
  Package,
  AlertTriangle,
  TrendingDown,
  Users,
  Activity,
  TrendingUp,
  ArrowUpRight,
  MoreVertical,
  Calendar,
  Filter,
  Download
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { useSales } from "../contexts/SalesContext.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";

import "./AdminDashboard.css";







export function AdminDashboard() {
  const { users } = useAuth();
  const { totalSales, salesData } = useSales();
  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="header-left">
          <h1>Pharmacy Overview</h1>
          <p>Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <div className="header-right">
          <div className="date-picker-button">
            <Calendar size={18} />
            <span>Last 30 Days</span>
          </div>
          <button className="export-button">
            <Download size={18} />
            Export Data
          </button>
        </div>
      </div>

      <div className="admin-stats-row">
        <div className="stat-card-modern">
          <div className="stat-icon-box green">
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-title">Total Revenue</span>
            <div className="stat-value-group">
              <span className="stat-number">₹{totalSales.toLocaleString()}</span>
              <span className="stat-trend trend-up">
                <ArrowUpRight size={14} /> 12%
              </span>
            </div>
          </div>
        </div>

        <div className="stat-card-modern">
          <div className="stat-icon-box blue">
            <Package size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-title">Total Products</span>
            <div className="stat-value-group">
              <span className="stat-number">1,247</span>
              <span className="stat-trend trend-up">
                <ArrowUpRight size={14} /> 4%
              </span>
            </div>
          </div>
        </div>

        <div className="stat-card-modern">
          <div className="stat-icon-box orange">
            <AlertTriangle size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-title">Near Expiry</span>
            <div className="stat-value-group">
              <span className="stat-number">42</span>
              <span className="stat-trend trend-down">
                -8%
              </span>
            </div>
          </div>
        </div>

        <div className="stat-card-modern">
          <div className="stat-icon-box purple">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-title">Total Users</span>
            <div className="stat-value-group">
              <span className="stat-number">{users.length}</span>
              <span className="stat-trend trend-up">
                +{users.filter(u => u.status === "Active").length} Active
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-charts-grid">
        <div className="chart-card main-chart">
          <div className="chart-header">
            <h3>Revenue & Sales Analysis</h3>
            <div className="chart-actions">
              <span className="legend-item"><span className="dot blue"></span> Revenue</span>
              <span className="legend-item"><span className="dot light-blue"></span> Sales</span>
            </div>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                  tickFormatter={(value) => `₹${value / 1000}k`}
                />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
                <Area
                  type="monotone"
                  dataKey="profit"
                  stroke="#93C5FD"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  fill="transparent"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>


      </div>

      <div className="admin-table-section">
        <div className="table-header">
          <h3>Staff Management</h3>
        </div>

        <div className="table-container-modern">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((staff) => (
                <tr key={staff.id}>
                  <td>
                    <div className="staff-member">
                      <div className="staff-avatar">{staff.name[0]}</div>
                      <div className="staff-info">
                        <div className="staff-name">{staff.name}</div>
                        <div className="staff-email">{staff.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="staff-role-badge">
                      {staff.role.charAt(0).toUpperCase() + staff.role.slice(1)}
                    </span>
                  </td>
                  <td>
                    <div className="staff-joined">{staff.joinDate || 'Jan 2024'}</div>
                  </td>
                  <td>
                    <span className={`status-pill ${(staff.status || 'Active').toLowerCase()}`}>
                      {staff.status || 'Active'}
                    </span>
                  </td>
                  <td className="text-right">
                    <button className="action-dots"><MoreVertical size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

