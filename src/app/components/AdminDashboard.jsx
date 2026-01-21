import React from "react";
import {
  DollarSign,
  Package,
  AlertTriangle,
  TrendingDown,
  Users,
  Activity,
  TrendingUp,
  ArrowUpRight
} from "lucide-react";

import "./AdminDashboard.css";

const salesData = [
  { month: "Jan", sales: 45000 },
  { month: "Feb", sales: 52000 },
  { month: "Mar", sales: 48000 },
  { month: "Apr", sales: 61000 },
  { month: "May", sales: 55000 },
  { month: "Jun", sales: 67000 }
];

const staffData = [
  { id: 1, name: "John Doe", role: "Pharmacist", status: "Active", email: "john@pharmacare.com" },
  { id: 2, name: "Jane Smith", role: "Inventory Manager", status: "Active", email: "jane@pharmacare.com" },
  { id: 3, name: "Mike Johnson", role: "Pharmacist", status: "Active", email: "mike@pharmacare.com" },
  { id: 4, name: "Sarah Williams", role: "Cashier", status: "Inactive", email: "sarah@pharmacare.com" }
];

export function AdminDashboard() {
  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Overview of pharmacy operations and management</p>
      </header>

      {/* Stats */}
      <section className="stats-grid">
        <div className="stat-card stat-green">
          <DollarSign />
          <h3>Total Sales</h3>
          <p className="stat-value">₹67,890</p>
          <span className="stat-meta">+12.5% this month</span>
        </div>

        <div className="stat-card stat-blue">
          <Package />
          <h3>Total Medicines</h3>
          <p className="stat-value">1,247</p>
          <span className="stat-meta">Across all categories</span>
        </div>

        <div className="stat-card stat-orange">
          <AlertTriangle />
          <h3>Expiring Soon</h3>
          <p className="stat-value">24</p>
          <span className="stat-meta">Within 30 days</span>
        </div>

        <div className="stat-card stat-red">
          <TrendingDown />
          <h3>Low Stock</h3>
          <p className="stat-value">18</p>
          <span className="stat-meta">Need reordering</span>
        </div>
      </section>

      {/* Charts Placeholder */}
      <section className="card">
        <h2>Sales & Revenue</h2>
        <p className="muted">
          Charts removed (recharts dependency removed).  
          You can later add charts using Chart.js or custom SVG.
        </p>
      </section>

      {/* Staff Table */}
      <section className="card">
        <h2>Staff Overview</h2>

        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {staffData.map((staff) => (
              <tr key={staff.id}>
                <td>{staff.name}</td>
                <td>{staff.email}</td>
                <td>
                  <span className="badge badge-outline">{staff.role}</span>
                </td>
                <td>
                  <span
                    className={`badge ${
                      staff.status === "Active" ? "badge-success" : "badge-muted"
                    }`}
                  >
                    {staff.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
