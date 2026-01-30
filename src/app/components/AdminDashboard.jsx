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
    <div className="p-4 md:p-6 bg-slate-50 min-h-screen flex flex-col gap-8 text-slate-800">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Pharmacy Overview</h1>
          <p className="text-slate-500 text-[0.95rem]">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <div className="flex gap-4 w-full sm:w-auto">
          <div className="flex-1 sm:flex-none flex items-center justify-center gap-2.5 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 cursor-pointer transition-all hover:border-slate-300 hover:bg-slate-50 shadow-sm">
            <Calendar size={18} />
            <span>Last 30 Days</span>
          </div>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2.5 px-4 py-2.5 bg-slate-900 text-white border-none rounded-xl text-sm font-semibold cursor-pointer transition-all hover:bg-slate-800 hover:-translate-y-px shadow-sm hover:shadow-md">
            <Download size={18} />
            Export Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white p-6 rounded-[1.25rem] border border-slate-200 flex items-center gap-5 transition-all hover:-translate-y-0.5 hover:shadow-lg">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-emerald-50 text-emerald-500">
            <DollarSign size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-500 mb-1">Total Revenue</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">₹{totalSales.toLocaleString()}</span>
              <span className="text-[0.75rem] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 bg-emerald-100 text-emerald-700">
                <ArrowUpRight size={14} /> 12%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[1.25rem] border border-slate-200 flex items-center gap-5 transition-all hover:-translate-y-0.5 hover:shadow-lg">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-blue-50 text-blue-500">
            <Package size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-500 mb-1">Total Products</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">{totalProducts.toLocaleString()}</span>
              <span className="text-[0.75rem] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 bg-emerald-100 text-emerald-700">
                <ArrowUpRight size={14} /> {((totalProducts / 100) * 4).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[1.25rem] border border-slate-200 flex items-center gap-5 transition-all hover:-translate-y-0.5 hover:shadow-lg">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-amber-50 text-amber-500">
            <AlertTriangle size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-500 mb-1">Near Expiry</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">{nearExpiryCount}</span>
              <span className="text-[0.75rem] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 bg-red-100 text-red-700">
                {nearExpiryCount > 0 ? 'Action Required' : 'All Clear'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[1.25rem] border border-slate-200 flex items-center gap-5 transition-all hover:-translate-y-0.5 hover:shadow-lg">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-violet-50 text-violet-500">
            <Users size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-500 mb-1">Total Users</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">{users.length}</span>
              <span className="text-[0.75rem] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 bg-emerald-100 text-emerald-700">
                +{users.filter(u => u.status === "Active").length} Active
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white p-6 rounded-[1.25rem] border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[1.125rem] font-bold text-slate-800">Revenue & Sales Analysis</h3>
            <div className="flex gap-4 text-[0.8125rem] text-slate-500 font-semibold">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Revenue</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-300"></span> Sales</span>
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

      <div className="bg-white rounded-[1.25rem] border border-slate-200 overflow-hidden">
        <div className="p-6 flex justify-between items-center border-b border-slate-100">
          <h3 className="text-[1.125rem] font-bold text-slate-800">Staff Management</h3>
        </div>

        <div className="overflow-x-auto -mx-1 px-1">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left px-6 py-3 bg-slate-50 text-slate-500 text-[0.75rem] font-bold uppercase tracking-wider">Member</th>
                <th className="text-left px-6 py-3 bg-slate-50 text-slate-500 text-[0.75rem] font-bold uppercase tracking-wider">Role</th>
                <th className="text-left px-6 py-3 bg-slate-50 text-slate-500 text-[0.75rem] font-bold uppercase tracking-wider">Joined</th>
                <th className="text-left px-6 py-3 bg-slate-50 text-slate-500 text-[0.75rem] font-bold uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 bg-slate-50"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((staff) => (
                <tr key={staff.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 border-b border-slate-50 align-middle">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">{staff.name[0]}</div>
                      <div className="flex flex-col">
                        <div className="font-bold text-slate-900 text-sm">{staff.name}</div>
                        <div className="text-slate-500 text-[0.8125rem]">{staff.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-b border-slate-50 align-middle">
                    <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg text-[0.75rem] font-semibold">
                      {staff.role.charAt(0).toUpperCase() + staff.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b border-slate-50 align-middle">
                    <div className="text-slate-500 text-sm">{staff.joinDate || 'Jan 2024'}</div>
                  </td>
                  <td className="px-6 py-4 border-b border-slate-50 align-middle">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-[0.75rem] font-bold ${(staff.status || 'Active').toLowerCase() === 'active'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-slate-100 text-slate-500'
                      }`}>
                      {staff.status || 'Active'}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b border-slate-50 align-middle text-right">
                    <button className="bg-transparent border-none text-slate-400 cursor-pointer p-1 hover:text-slate-600 transition-colors"><MoreVertical size={16} /></button>
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

