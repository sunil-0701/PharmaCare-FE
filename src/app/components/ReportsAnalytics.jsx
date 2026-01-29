import React, { useState } from "react";
import {
  BarChart3,
  Download,
  Calendar,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { toast } from "sonner";
import { useSales } from "../contexts/SalesContext.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import "./ReportsAnalytics.css";

const expiryReport = [
  { medicine: "Paracetamol 500mg", batch: "BT001", expiry: "2025-01-15", quantity: 120, value: 660 },
  { medicine: "Cetirizine 10mg", batch: "BT004", expiry: "2025-02-10", quantity: 80, value: 480 },
];

export function ReportsAnalytics() {
  const { users } = useAuth();
  const { salesData, totalSales, totalTransactions, avgTicket, staffSales } = useSales();
  const [tab, setTab] = useState("sales");
  const [dateFrom, setDateFrom] = useState("2024-01-01");
  const [dateTo, setDateTo] = useState("2024-12-16");
  const [reportType, setReportType] = useState("sales");

  const exportPDF = () => toast.success("Report exported as PDF");

  const pharmacists = users.filter(u => u.role === "pharmacist");
  const maxSales = Math.max(...Object.values(staffSales), 60000);

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
                <strong>₹{totalSales.toLocaleString()}</strong>
                <span>Total Sales</span>
              </div>
            </div>
            <div className="stat-card">
              <TrendingUp />
              <div>
                <strong>{totalTransactions.toLocaleString()}</strong>
                <span>Transactions</span>
              </div>
            </div>
            <div className="stat-card">
              <BarChart3 />
              <div>
                <strong>₹{avgTicket.toFixed(2)}</strong>
                <span>Avg Ticket</span>
              </div>
            </div>
          </div>

          <div className="chart-grid single-col">
            <div className="card">
              <h3>Monthly Sales</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#059669" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
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
          {pharmacists.map((s) => {
            const performance = staffSales[s.id] || 0;
            const percentage = Math.round((performance / maxSales) * 100);
            return (
              <div key={s.id} className="staff-row">
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: '600' }}>{s.name}</span>
                  <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>₹{performance.toLocaleString()}</span>
                </div>
                <div className="progress">
                  <div style={{ width: `${percentage}%` }} />
                </div>
                <span>{percentage}%</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
