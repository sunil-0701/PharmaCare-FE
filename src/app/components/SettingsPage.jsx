import React, { useState } from "react";
import { Settings, Bell } from "lucide-react";
import { toast } from "sonner";

export function SettingsPage() {
  const [tab, setTab] = useState("general");

  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen text-slate-700 font-sans flex flex-col gap-10">
      <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">System Settings</h1>
        <p className="text-slate-500 font-medium mt-3 uppercase tracking-widest text-[0.65rem] leading-none">Global Preferences & Settings</p>
      </div>

      <div className="flex items-center gap-2 p-1.5 bg-slate-200/50 rounded-2xl w-fit">
        <button
          className={`px-8 py-3 rounded-xl text-[0.65rem] font-black uppercase tracking-widest transition-all ${tab === "general"
            ? "bg-white text-emerald-600 shadow-sm shadow-slate-200"
            : "text-slate-500 hover:text-slate-900"
            }`}
          onClick={() => setTab("general")}
        >
          General
        </button>
        <button
          className={`px-8 py-3 rounded-xl text-[0.65rem] font-black uppercase tracking-widest transition-all ${tab === "notifications"
            ? "bg-white text-emerald-600 shadow-sm shadow-slate-200"
            : "text-slate-500 hover:text-slate-900"
            }`}
          onClick={() => setTab("notifications")}
        >
          Notifications
        </button>
      </div>

      {tab === "general" && (
        <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/40 animate-in fade-in duration-500">
          <div className="flex items-center gap-6 mb-12 pb-10 border-b border-slate-50">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-50">
              <Settings size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">General Settings</h2>
              <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Configure System Preferences</p>
            </div>
          </div>

          <div className="space-y-10">
            <div className="space-y-3">
              <label className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest ml-1">Pharmacy Name</label>
              <input
                className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                defaultValue="PharmaCare"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest ml-1">Pharmacy Address</label>
              <input
                className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                defaultValue="123 Medical Street, Health City, Sector 7"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest ml-1">Contact Number</label>
                <input
                  className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                  defaultValue="+91 9876543210"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <input
                  type="email"
                  className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                  defaultValue="Pharmacare@gmail.com"
                />
              </div>
            </div>

            <div className="h-px bg-slate-100" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest ml-1">Currency</label>
                <select
                  className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all appearance-none cursor-pointer"
                  defaultValue="inr"
                >
                  <option value="usd">USD - United States Dollar ($)</option>
                  <option value="eur">EUR - European Euro (€)</option>
                  <option value="gbp">GBP - British Pound (£)</option>
                  <option value="inr">INR - Indian Rupee (₹)</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest ml-1">Time Zone</label>
                <select
                  className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all appearance-none cursor-pointer"
                  defaultValue="ist"
                >
                  <option value="est">EST - Eastern Standard Time</option>
                  <option value="pst">PST - Pacific Standard Time</option>
                  <option value="cst">CST - Central Standard Time</option>
                  <option value="mst">MST - Mountain Standard Time</option>
                  <option value="ist">IST - Indian Standard Time</option>
                </select>
              </div>
            </div>

            <button
              className="px-10 py-5 bg-emerald-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-emerald-200 transition-all active:scale-95 hover:bg-emerald-700"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {tab === "notifications" && (
        <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/40 animate-in fade-in duration-500">
          <div className="flex items-center gap-6 mb-12 pb-10 border-b border-slate-50">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-50">
              <Bell size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Notification Settings</h2>
              <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Alert Settings</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Low Stock Alerts", desc: "Get notified when inventory stock is low" },
                { label: "Expiry Alerts", desc: "Get notified when medicine is about to expire" },
                { label: "Order Alerts", desc: "Get notified when an order is placed" },
                { label: "Daily Alerts", desc: "Get notified for daily updates" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-3xl group hover:border-emerald-200 hover:bg-emerald-50/30 transition-all">
                  <div>
                    <div className="text-sm font-bold text-slate-900">{item.label}</div>
                    <p className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mt-1 group-hover:text-emerald-500 transition-colors">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={index < 3} />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
              ))}
            </div>

            <div className="h-px bg-slate-100 my-8" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest ml-1">Low Stock Limit</label>
                <input
                  type="number"
                  className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                  defaultValue="50"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest ml-1">Expiry Warning period (Days)</label>
                <input
                  type="number"
                  className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                  defaultValue="90"
                />
              </div>
            </div>

            <button
              className="px-10 py-5 bg-emerald-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-emerald-200 transition-all active:scale-95 hover:bg-emerald-700"
              onClick={handleSave}
            >
              Save Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

