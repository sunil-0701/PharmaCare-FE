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
import { useInventory } from "../contexts/InventoryContext.jsx";

export function ReportsAnalytics() {
  const { users } = useAuth();
  const { salesData, totalSales, totalTransactions, avgTicket, staffSales } = useSales();
  const { inventoryData } = useInventory();

  const expiryReport = inventoryData
    .filter(item => item.status === "Near Expiry")
    .map(item => ({
      medicine: item.name,
      batch: item.batchNo,
      expiry: item.expiry,
      quantity: item.quantity,
      value: item.quantity * item.price
    }));

  const [tab, setTab] = useState("sales");
  const [dateFrom, setDateFrom] = useState("2024-01-01");
  const [dateTo, setDateTo] = useState("2024-12-16");
  const [reportType, setReportType] = useState("sales");

  const exportPDF = () => toast.success("Report exported as PDF");

  const pharmacists = users.filter(u => u.role === "pharmacist");
  const maxSales = Math.max(...Object.values(staffSales), 60000);

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen text-slate-700 font-sans flex flex-col gap-6 md:gap-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-none">Intelligence Hub</h1>
          <p className="text-slate-500 font-medium mt-3 uppercase tracking-widest text-[0.65rem] leading-none">Precision Analytics & Performance Audits</p>
        </div>
        <button
          className="flex items-center justify-center gap-3 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold text-sm hover:bg-emerald-700 transition-all active:scale-95 shadow-2xl shadow-emerald-200 group w-full md:w-auto"
          onClick={exportPDF}
        >
          <Download size={18} className="group-hover:-translate-y-1 transition-transform" />
          Generate PDF Ledger
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
        <div className="space-y-2">
          <label className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest ml-1">Data Stream</label>
          <select
            className="w-full h-14 px-5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all appearance-none cursor-pointer"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            <option value="sales">Sales & Revenue</option>
            <option value="profit">Net Profitability</option>
            <option value="expiry">Risk (Expiry)</option>
            <option value="staff">Personnel Audit</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest ml-1">Date Init</label>
          <div className="relative">
            <input
              type="date"
              className="w-full h-14 px-5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest ml-1">Date Final</label>
          <div className="relative">
            <input
              type="date"
              className="w-full h-14 px-5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-end">
          <button className="w-full h-14 bg-slate-900 text-white rounded-2xl font-black text-[0.65rem] uppercase tracking-[0.2em] shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all">
            Query Engine
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 p-1.5 bg-slate-200/50 rounded-xl md:rounded-2xl w-full sm:w-fit overflow-x-auto scrollbar-hide">
        {["sales", "profit", "expiry", "staff"].map((t) => (
          <button
            key={t}
            className={`px-6 md:px-8 py-2.5 md:py-3 rounded-lg md:rounded-xl text-[0.65rem] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${tab === t
              ? "bg-white text-emerald-600 shadow-sm shadow-slate-200"
              : "text-slate-500 hover:text-slate-900"
              }`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "sales" && (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 flex items-center gap-6 shadow-sm shadow-slate-200/50 hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-50 group-hover:scale-110 transition-transform">
                <DollarSign size={28} />
              </div>
              <div>
                <div className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest leading-none">Gross Revenue</div>
                <div className="text-3xl font-black text-slate-900 tracking-tight mt-1">₹{totalSales.toLocaleString()}</div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 flex items-center gap-6 shadow-sm shadow-slate-200/50 hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-50 group-hover:scale-110 transition-transform">
                <TrendingUp size={28} />
              </div>
              <div>
                <div className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest leading-none">Total Transactions</div>
                <div className="text-3xl font-black text-slate-900 tracking-tight mt-1">{totalTransactions.toLocaleString()}</div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 flex items-center gap-6 shadow-sm shadow-slate-200/50 hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-50 group-hover:scale-110 transition-transform">
                <BarChart3 size={28} />
              </div>
              <div>
                <div className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest leading-none">Average Ticket</div>
                <div className="text-3xl font-black text-slate-900 tracking-tight mt-1">₹{avgTicket.toFixed(0)}</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/30">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Financial Velocity</h3>
              <div className="text-[0.6rem] font-black text-slate-300 uppercase tracking-[0.2em]">12-Month Rolling Forecast</div>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fontWeight: 900, fill: '#cbd5e1' }}
                  dy={15}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fontWeight: 900, fill: '#cbd5e1' }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '20px',
                    border: 'none',
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                    padding: '20px'
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontWeight: 900, textTransform: 'uppercase', fontSize: '10px' }} />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#059669"
                  strokeWidth={4}
                  dot={{ r: 6, fill: '#059669', strokeWidth: 0 }}
                  activeDot={{ r: 10, fill: '#059669' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {tab === "profit" && (
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/30 animate-in fade-in duration-500">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Yield Comparison Matrix</h3>
            <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-xl text-[0.6rem] font-black uppercase tracking-widest border border-blue-100">Revenue vs Net Profit</span>
          </div>
          <ResponsiveContainer width="100%" height={450}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#cbd5e1' }} dy={15} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#cbd5e1' }} />
              <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
              <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontWeight: 900, textTransform: 'uppercase', fontSize: '10px' }} />
              <Line type="monotone" dataKey="sales" stroke="#059669" strokeWidth={4} dot={false} />
              <Line type="monotone" dataKey="profit" stroke="#0ea5e9" strokeWidth={4} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {tab === "expiry" && (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/30 overflow-hidden animate-in fade-in duration-500">
          <div className="px-10 py-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Obsolescence Risk Audit</h3>
            <span className="px-4 py-1.5 bg-rose-50 text-rose-600 rounded-xl text-[0.6rem] font-black uppercase tracking-widest border border-rose-100">Critical Expiry Warning</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="px-10 py-5 text-[0.7rem] font-black text-slate-400 uppercase tracking-widest">Molecular Entity</th>
                  <th className="px-10 py-5 text-[0.7rem] font-black text-slate-400 uppercase tracking-widest text-center">Batch Sequence</th>
                  <th className="px-10 py-5 text-[0.7rem] font-black text-slate-400 uppercase tracking-widest text-center">Liquidation Date</th>
                  <th className="px-10 py-5 text-[0.7rem] font-black text-slate-400 uppercase tracking-widest text-center">Inventory Count</th>
                  <th className="px-10 py-5 text-[0.7rem] font-black text-slate-400 uppercase tracking-widest text-right">Asset Exposure</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {expiryReport.map((m) => (
                  <tr key={m.batch} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-10 py-6 font-bold text-slate-900">{m.medicine}</td>
                    <td className="px-10 py-6 text-center text-[0.65rem] font-black text-blue-500 uppercase tracking-widest">{m.batch}</td>
                    <td className="px-10 py-6 text-center text-sm font-bold text-rose-500">{m.expiry}</td>
                    <td className="px-10 py-6 text-center text-sm font-bold text-slate-600 underline decoration-slate-200 underline-offset-4">{m.quantity} Unit</td>
                    <td className="px-10 py-6 text-right text-sm font-black text-slate-900">₹{m.value.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "staff" && (
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/30 animate-in fade-in duration-500">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Personnel Efficiency Index</h3>
            <span className="px-4 py-1.5 bg-amber-50 text-amber-600 rounded-xl text-[0.6rem] font-black uppercase tracking-widest border border-amber-100">Performance Metrics</span>
          </div>
          <div className="space-y-10">
            {pharmacists.map((s) => {
              const performance = staffSales[s.id] || 0;
              const percentage = Math.round((performance / maxSales) * 100);
              return (
                <div key={s.id} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center font-black text-sm shadow-xl shadow-slate-200">
                        {s.name[0]}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{s.name}</div>
                        <div className="text-[0.6rem] font-black text-slate-400 uppercase tracking-widest">ID-P{s.id}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-black text-slate-900 leading-none">₹{performance.toLocaleString()}</div>
                      <div className="text-[0.6rem] font-black text-emerald-500 uppercase tracking-widest mt-1">Contribution: {percentage}%</div>
                    </div>
                  </div>
                  <div className="h-4 bg-slate-50 rounded-full overflow-hidden border border-slate-100 shadow-inner">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full shadow-lg shadow-emerald-200 transition-all duration-1000 ease-out"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
