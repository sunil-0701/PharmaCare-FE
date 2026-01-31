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
import { useInventory } from "../contexts/InventoryContext.jsx";

export function AdminDashboard() {
  const { users } = useAuth();
  const { totalSales, salesData } = useSales();
  const { inventoryData } = useInventory();

  const totalProducts = inventoryData.length;
  const nearExpiryCount = inventoryData.filter(item => item.status === "Near Expiry").length;

  return (
    <div className="p-4 md:p-6 bg-gradient-to-br from-slate-50 via-slate-50 to-slate-100/50 min-h-screen flex flex-col gap-8 text-slate-800">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Pharmacy Overview</h1>
          <p className="text-slate-500 text-[0.95rem] tracking-wide">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="flex-1 sm:flex-none flex items-center justify-center gap-2.5 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 cursor-pointer transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] shadow-sm">
            <Calendar size={18} className="transition-transform duration-200 group-hover:scale-110" />
            <span className="tracking-wide">Last 30 Days</span>
          </div>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2.5 px-4 py-2.5 bg-gradient-to-r from-slate-900 to-slate-800 text-white border-none rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200 hover:from-slate-800 hover:to-slate-700 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] shadow-md">
            <Download size={18} className="transition-transform duration-200 group-hover:scale-110" />
            <span className="tracking-wide">Export Data</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="group bg-white p-6 rounded-[1.25rem] border border-slate-200/80 flex items-center gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-200/50 cursor-pointer">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100/50 text-emerald-600 shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
            <DollarSign size={24} className="group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-500 mb-1 tracking-wide">Total Revenue</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">₹{totalSales.toLocaleString()}</span>
              <span className="text-[0.75rem] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 bg-emerald-100 text-emerald-700 shadow-sm">
                <ArrowUpRight size={14} /> 12%
              </span>
            </div>
          </div>
        </div>

        <div className="group bg-white p-6 rounded-[1.25rem] border border-slate-200/80 flex items-center gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-200/50 cursor-pointer">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100/50 text-blue-600 shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
            <Package size={24} className="group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-500 mb-1 tracking-wide">Total Products</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">{totalProducts.toLocaleString()}</span>
              <span className="text-[0.75rem] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 bg-emerald-100 text-emerald-700 shadow-sm">
                <ArrowUpRight size={14} /> {((totalProducts / 100) * 4).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>

        <div className="group bg-white p-6 rounded-[1.25rem] border border-slate-200/80 flex items-center gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10 hover:border-amber-200/50 cursor-pointer">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100/50 text-amber-600 shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
            <AlertTriangle size={24} className="group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-500 mb-1 tracking-wide">Near Expiry</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">{nearExpiryCount}</span>
              <span className="text-[0.75rem] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 bg-red-100 text-red-700 shadow-sm">
                {nearExpiryCount > 0 ? 'Action Required' : 'All Clear'}
              </span>
            </div>
          </div>
        </div>

        <div className="group bg-white p-6 rounded-[1.25rem] border border-slate-200/80 flex items-center gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/10 hover:border-violet-200/50 cursor-pointer">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-violet-50 to-violet-100/50 text-violet-600 shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
            <Users size={24} className="group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-500 mb-1 tracking-wide">Total Users</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">{users.length}</span>
              <span className="text-[0.75rem] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 bg-emerald-100 text-emerald-700 shadow-sm">
                +{users.filter(u => u.status === "Active").length} Active
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white p-6 rounded-[1.25rem] border border-slate-200/80 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[1.125rem] font-bold text-slate-800 tracking-tight">Revenue & Sales Analysis</h3>
            <div className="flex gap-4 text-[0.8125rem] text-slate-500 font-semibold">
              <span className="flex items-center gap-1.5 tracking-wide"><span className="w-2 h-2 rounded-full bg-blue-500 shadow-sm"></span> Revenue</span>
              <span className="flex items-center gap-1.5 tracking-wide"><span className="w-2 h-2 rounded-full bg-blue-300 shadow-sm"></span> Sales</span>
            </div>
          </div>
          <div className="w-full">
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

      <div className="bg-white rounded-[1.25rem] border border-slate-200/80 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="p-6 flex justify-between items-center border-b border-slate-100">
          <h3 className="text-[1.125rem] font-bold text-slate-800 tracking-tight">Staff Management</h3>
        </div>

        <div className="overflow-x-auto -mx-1 px-1">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left px-6 py-3.5 bg-gradient-to-r from-slate-50 to-slate-100/50 text-slate-600 text-[0.75rem] font-bold uppercase tracking-wider">Member</th>
                <th className="text-left px-6 py-3.5 bg-gradient-to-r from-slate-50 to-slate-100/50 text-slate-600 text-[0.75rem] font-bold uppercase tracking-wider">Role</th>
                <th className="text-left px-6 py-3.5 bg-gradient-to-r from-slate-50 to-slate-100/50 text-slate-600 text-[0.75rem] font-bold uppercase tracking-wider">Joined</th>
                <th className="text-left px-6 py-3.5 bg-gradient-to-r from-slate-50 to-slate-100/50 text-slate-600 text-[0.75rem] font-bold uppercase tracking-wider">Status</th>
                <th className="px-6 py-3.5 bg-gradient-to-r from-slate-50 to-slate-100/50"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((staff) => (
                <tr key={staff.id} className="group hover:bg-slate-50/70 transition-all duration-200 hover:shadow-sm cursor-pointer">
                  <td className="px-6 py-4 border-b border-slate-100/50 align-middle">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-200">{staff.name[0]}</div>
                      <div className="flex flex-col">
                        <div className="font-bold text-slate-900 text-sm tracking-wide">{staff.name}</div>
                        <div className="text-slate-500 text-[0.8125rem] tracking-wide">{staff.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-b border-slate-100/50 align-middle">
                    <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg text-[0.75rem] font-semibold tracking-wide shadow-sm">
                      {staff.role.charAt(0).toUpperCase() + staff.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b border-slate-100/50 align-middle">
                    <div className="text-slate-500 text-sm tracking-wide">{staff.joinDate || 'Jan 2024'}</div>
                  </td>
                  <td className="px-6 py-4 border-b border-slate-100/50 align-middle">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-[0.75rem] font-bold tracking-wide shadow-sm ${(staff.status || 'Active').toLowerCase() === 'active'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-slate-100 text-slate-500'
                      }`}>
                      {staff.status || 'Active'}
                    </span>
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

