import React, { useState } from "react";
import {
  BarChart3,
  Download,
  Calendar,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { toast } from "sonner";
import "./ReportsAnalytics.css";

const salesData = [
  { month: "Jan", sales: 45000, profit: 12000 },
  { month: "Feb", sales: 52000, profit: 14500 },
  { month: "Mar", sales: 48000, profit: 13200 },
  { month: "Apr", sales: 61000, profit: 16800 },
  { month: "May", sales: 55000, profit: 15100 },
  { month: "Jun", sales: 67000, profit: 18500 },
];

const categoryData = [
  { name: "Pain Relief", value: 35 },
  { name: "Antibiotics", value: 25 },
  { name: "Vitamins", value: 20 },
  { name: "Cardiovascular", value: 15 },
  { name: "Others", value: 5 },
];

const expiryReport = [
  { medicine: "Paracetamol 500mg", batch: "BT001", expiry: "2025-01-15", quantity: 120, value: 660 },
  { medicine: "Cetirizine 10mg", batch: "BT004", expiry: "2025-02-10", quantity: 80, value: 480 },
];

const staffPerformance = [
  { name: "John Doe", sales: 45200 },
  { name: "Jane Smith", sales: 38900 },
  { name: "Mike Johnson", sales: 52100 },
];

const COLORS = ["#059669", "#0ea5e9", "#f59e0b", "#8b5cf6", "#6b7280"];

export function ReportsAnalytics() {
  const [tab, setTab] = useState("sales");
  const [dateFrom, setDateFrom] = useState("2024-01-01");
  const [dateTo, setDateTo] = useState("2024-12-16");
  const [reportType, setReportType] = useState("sales");

  const exportPDF = () => toast.success("Report exported as PDF");

  return (
    <div className="reports">
      <div className="reports-header">
        <div>
          <h1>Reports & Analytics</h1>
          <p>Business insights and performance metrics</p>
        </div>
      </div>

      <div className="reports-filters">
        <div>
          <label>Report Type</label>
          <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
            <option value="sales">Sales</option>
            <option value="profit">Profit</option>
            <option value="expiry">Expiry</option>
            <option value="staff">Staff</option>
          </select>
        </div>

        <div>
          <label>Date From</label>
          <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
        </div>

        <div>
          <label>Date To</label>
          <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
        </div>

        <button className="btn primary" onClick={exportPDF}>
          <Download /> Export PDF
        </button>
      </div>

      <div className="reports-tabs">
        {["sales", "profit", "expiry", "staff"].map((t) => (
          <button key={t} className={tab === t ? "tab active" : "tab"} onClick={() => setTab(t)}>
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {tab === "sales" && (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <DollarSign />
              <div>
                <strong>₹328,000</strong>
                <span>Total Sales</span>
              </div>
            </div>
            <div className="stat-card">
              <TrendingUp />
              <div>
                <strong>2,487</strong>
                <span>Transactions</span>
              </div>
            </div>
            <div className="stat-card">
              <BarChart3 />
              <div>
                <strong>₹131.86</strong>
                <span>Avg Ticket</span>
              </div>
            </div>
          </div>

          <div className="chart-grid">
            <div className="card">
              <h3>Monthly Sales</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#059669" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="card">
              <h3>Sales by Category</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={categoryData} dataKey="value" outerRadius={90}>
                    {categoryData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      {tab === "profit" && (
        <div className="card">
          <h3>Sales vs Profit</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line dataKey="sales" stroke="#059669" />
              <Line dataKey="profit" stroke="#0ea5e9" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {tab === "expiry" && (
        <div className="card">
          <h3>Expiring Medicines</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Medicine</th>
                <th>Batch</th>
                <th>Expiry</th>
                <th>Qty</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {expiryReport.map((m) => (
                <tr key={m.batch}>
                  <td>{m.medicine}</td>
                  <td>{m.batch}</td>
                  <td>{m.expiry}</td>
                  <td>{m.quantity}</td>
                  <td>₹{m.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "staff" && (
        <div className="card">
          <h3>Staff Performance</h3>
          {staffPerformance.map((s) => (
            <div key={s.name} className="staff-row">
              <span>{s.name}</span>
              <div className="progress">
                <div style={{ width: `${(s.sales / 60000) * 100}%` }} />
              </div>
              <span>{Math.round((s.sales / 60000) * 100)}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

