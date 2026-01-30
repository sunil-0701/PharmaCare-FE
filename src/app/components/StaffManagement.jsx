import React, { useState } from "react";
import {
  Users,
  Plus,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Mail,
  Phone,
  Shield,
  X,
  MoreVertical,
  Check
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext.jsx";

export function StaffManagement() {
  const { users, registerStaff, deleteStaff, updateStaffStatus } = useAuth();
  const [showAdd, setShowAdd] = useState(false);

  // Form State
  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    phone: "",
    role: "pharmacist",
    password: ""
  });

  const handleAddStaff = () => {
    if (!newStaff.name || !newStaff.email || !newStaff.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    registerStaff(newStaff);
    setShowAdd(false);
    setNewStaff({
      name: "",
      email: "",
      phone: "",
      role: "pharmacist",
      password: ""
    });
  };


  const handleDeleteStaff = (staff) => {
    if (window.confirm(`Are you sure you want to remove ${staff.name}?`)) {
      deleteStaff(staff.id);
      toast.success(`${staff.name} has been removed`);
    }
  };

  const toggleStatus = (id, name, status) => {
    const newStatus = status === "Active" ? "Inactive" : "Active";
    updateStaffStatus(id, newStatus);
    toast.success(`${name} is now ${newStatus}`);
  };

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen flex flex-col gap-6 md:gap-10 text-slate-700 font-sans">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-none">Staff Management</h1>
          <p className="text-slate-500 font-medium mt-3">Securely manage team credentials, roles, and status.</p>
        </div>
        <button
          className="flex items-center justify-center gap-3 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all active:scale-95 shadow-2xl shadow-emerald-200 group w-full md:w-auto"
          onClick={() => setShowAdd(true)}
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform" />
          Add New Staff Member
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { label: "Total Members", val: users.length, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Active Nodes", val: users.filter(s => s.status === "Active").length, icon: UserCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Admin Core", val: users.filter(s => s.role === "admin").length, icon: Shield, color: "text-amber-600", bg: "bg-amber-50" }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-7 rounded-[2.5rem] border border-slate-100 flex items-center gap-6 shadow-sm shadow-slate-200/50 group hover:shadow-xl transition-all">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color} shadow-lg shadow-slate-100 group-hover:scale-110 transition-transform`}>
              <stat.icon size={28} />
            </div>
            <div>
              <div className="text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest border-none">{stat.label}</div>
              <div className="text-3xl font-bold text-slate-900 tracking-tight mt-0.5">{stat.val}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/40 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">Personnel Directory</h3>
          <div className="p-2 bg-slate-50 rounded-xl cursor-not-allowed opacity-50">
            <MoreVertical size={18} className="text-slate-400" />
          </div>
        </div>

        <div className="overflow-x-auto -mx-1 px-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="px-8 py-5 bg-slate-50/50 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Member Identitity</th>
                <th className="px-8 py-5 bg-slate-50/50 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Contact Sync</th>
                <th className="px-8 py-5 bg-slate-50/50 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 text-center">Department</th>
                <th className="px-8 py-5 bg-slate-50/50 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 text-center">Status</th>
                <th className="px-8 py-5 bg-slate-50/50 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">System Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {users.map((staff) => (
                <tr key={staff.id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-xl shadow-slate-200">
                        {staff.name[0]}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 tracking-tight">{staff.name}</div>
                        <div className="text-[0.65rem] font-bold text-blue-500 uppercase tracking-widest mt-0.5">PC-{String(staff.id).padStart(3, '0')}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-600"><Mail size={12} className="text-slate-300" /> {staff.email}</div>
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-600"><Phone size={12} className="text-slate-300" /> {staff.phone || '-'}</div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className="px-3 py-1.5 bg-slate-100 text-slate-500 rounded-xl text-[0.65rem] font-bold uppercase tracking-widest border border-slate-200 shadow-sm">{staff.role}</span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={`px-4 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-widest ${(staff.status || 'Active') === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                      {staff.status || 'Active'}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all rounded-xl border border-transparent hover:border-blue-100 shadow-sm hover:shadow-md"
                        onClick={() => toggleStatus(staff.id, staff.name, staff.status)}
                        title="Change Operational Status"
                      >
                        {staff.status === "Active" ? <UserX size={18} /> : <UserCheck size={18} />}
                      </button>
                      <button
                        className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all rounded-xl border border-transparent hover:border-rose-100 shadow-sm hover:shadow-md"
                        onClick={() => handleDeleteStaff(staff)}
                        title="Revoke Access"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-6 animate-in fade-in duration-200 uppercase-form">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl shadow-slate-900/20 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-8 py-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Enroll Staff Member</h2>
                <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest leading-none">Access Control Hub</p>
              </div>
              <button
                className="w-12 h-12 bg-white text-slate-400 hover:text-slate-900 rounded-full flex items-center justify-center shadow-md transition-all active:scale-90"
                onClick={() => setShowAdd(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Legal Name</label>
                  <div className="relative group">
                    <Users size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                    <input
                      type="text"
                      className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                      placeholder="e.g. Robert Smith"
                      value={newStaff.name}
                      onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
                  <div className="relative group">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                    <input
                      type="email"
                      className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                      placeholder="robert@pharmacare.com"
                      value={newStaff.email}
                      onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest ml-1">Mobile Contact</label>
                  <div className="relative group">
                    <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                    <input
                      type="tel"
                      className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                      placeholder="+91 XXXXX XXXXX"
                      value={newStaff.phone}
                      onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest ml-1">Department Role</label>
                  <div className="relative group">
                    <Shield size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors pointer-events-none" />
                    <select
                      className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all appearance-none cursor-pointer"
                      value={newStaff.role}
                      onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                    >
                      <option value="admin">System Admin</option>
                      <option value="pharmacist">Pharmacist</option>
                      <option value="inventory">Inventory Chief</option>
                    </select>
                  </div>
                </div>

                <div className="col-span-full space-y-2">
                  <label className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest ml-1">Secure Password</label>
                  <div className="relative group">
                    <Check size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                    <input
                      type="password"
                      className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                      placeholder="••••••••"
                      value={newStaff.password}
                      onChange={(e) => setNewStaff({ ...newStaff, password: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="px-10 py-8 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between gap-6">
              <button
                className="text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-[0.2em]"
                onClick={() => setShowAdd(false)}
              >
                Discard
              </button>
              <button
                className="flex-1 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-sm shadow-xl shadow-emerald-200 transition-all active:scale-95"
                onClick={handleAddStaff}
              >
                Initialize Account
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

