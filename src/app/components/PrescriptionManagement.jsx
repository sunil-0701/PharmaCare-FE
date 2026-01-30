import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePrescriptions } from "../contexts/PrescriptionContext.jsx";
import {
  FileText,
  Upload,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Eye,
  Plus,
  Calendar,
  UserCheck,
} from "lucide-react";
import { Pagination } from "./Pagination.jsx";

const patientHistory = [
  {
    id: "RX005",
    date: "2024-11-10",
    doctor: "Dr. Sarah Johnson",
    medicines: ["Amoxicillin 500mg"],
    status: "Completed",
  },
];

export function PrescriptionManagement() {
  const navigate = useNavigate();
  const { prescriptions, updatePrescriptionStatus } = usePrescriptions();
  const [activeTab, setActiveTab] = useState("all");
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [pageAll, setPageAll] = useState(1);
  const [rowsAll, setRowsAll] = useState(10);
  const [pageHistory, setPageHistory] = useState(1);
  const [rowsHistory, setRowsHistory] = useState(10);

  const handleViewPrescription = (rx) => {
    setSelectedPrescription(rx);
    setShowViewModal(true);
  };

  const handleVerifyPrescription = (id) => {
    updatePrescriptionStatus(id, "Verified");
  };

  const handleRejectPrescription = (id) => {
    updatePrescriptionStatus(id, "Rejected");
  };

  const filteredPrescriptions = prescriptions.filter(rx => {
    if (activeTab === "pending") return rx.status === "Pending";
    if (activeTab === "verified") return rx.status === "Verified";
    if (activeTab === "rejected") return rx.status === "Rejected";
    return true;
  });

  const pagedPrescriptions = filteredPrescriptions.slice(
    (pageAll - 1) * rowsAll,
    pageAll * rowsAll
  );

  return (
    <div className="p-8 bg-slate-50 min-h-screen text-slate-700 font-sans">
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Prescription Management</h1>
          <p className="text-slate-500 font-medium mt-1">Verify, track, and manage all incoming prescriptions.</p>
        </div>
        <button
          className="flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-2xl shadow-blue-200 group"
          onClick={() => navigate('/prescriptions/add')}
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform" />
          Add New Prescription
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Total Recieved", val: prescriptions.length, icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Pending Review", val: prescriptions.filter(p => p.status === "Pending").length, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Verified Today", val: prescriptions.filter(p => p.status === "Verified").length, icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Rejected", val: prescriptions.filter(p => p.status === "Rejected").length, icon: XCircle, color: "text-rose-600", bg: "bg-rose-50" }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-5 transition-all hover:shadow-md hover:-translate-y-1">
            <div className={`p-4 ${stat.bg} ${stat.color} rounded-2xl`}>
              <stat.icon size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 leading-tight">{stat.val}</div>
              <div className="text-[0.7rem] font-bold text-slate-400 border-none uppercase tracking-widest mt-1">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit mb-8">
        {["all", "pending", "verified", "rejected", "history"].map(tab => (
          <button
            key={tab}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === tab
              ? "bg-white text-blue-600 shadow-sm"
              : "text-slate-500 hover:text-slate-900"
              }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab !== "history" && (
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden p-2">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="px-6 py-5 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">Rx ID</th>
                  <th className="px-6 py-5 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">Patient Details</th>
                  <th className="px-6 py-5 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">Prescribing Doctor</th>
                  <th className="px-6 py-5 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">Date Applied</th>
                  <th className="px-6 py-5 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">Medicines</th>
                  <th className="px-6 py-5 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">Status</th>
                  <th className="px-6 py-5 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {pagedPrescriptions.map(rx => (
                  <tr key={rx.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-5 font-bold text-slate-400 text-xs">{rx.id}</td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 leading-tight">{rx.patientName}</span>
                        <span className="text-[0.65rem] font-bold text-blue-500 uppercase tracking-wider mt-1">{rx.patientId}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm font-bold text-slate-600">{rx.doctorName}</td>
                    <td className="px-6 py-5 text-sm font-bold text-slate-500">{rx.uploadDate}</td>
                    <td className="px-6 py-5">
                      <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                        {rx.medicines.map((m, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-slate-100 text-[0.65rem] font-bold text-slate-500 rounded-md truncate max-w-full">{m}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-widest ${rx.status === "Pending" ? "bg-amber-100 text-amber-700" :
                        rx.status === "Verified" ? "bg-emerald-100 text-emerald-700" :
                          "bg-rose-100 text-rose-700"
                        }`}>
                        {rx.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all rounded-xl"
                          onClick={() => handleViewPrescription(rx)}
                          title="View Full Details"
                        >
                          <Eye size={18} />
                        </button>
                        {rx.status === "Pending" && (
                          <>
                            <button
                              className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all rounded-xl"
                              onClick={() => handleVerifyPrescription(rx.id)}
                              title="Verify"
                            >
                              <CheckCircle size={18} />
                            </button>
                            <button
                              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all rounded-xl"
                              onClick={() => handleRejectPrescription(rx.id)}
                              title="Reject"
                            >
                              <XCircle size={18} />
                            </button>
                          </>
                        )}
                        {rx.linkedBill && (
                          <span className="px-2 py-1 bg-slate-100 text-[0.6rem] font-bold text-slate-400 rounded-lg uppercase tracking-wider ml-2">{rx.linkedBill}</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-4 pb-4">
            <Pagination
              currentPage={pageAll}
              totalItems={filteredPrescriptions.length}
              rowsPerPage={rowsAll}
              onPageChange={setPageAll}
              onRowsPerPageChange={(rows) => {
                setRowsAll(rows);
                setPageAll(1);
              }}
            />
          </div>
        </div>
      )}

      {activeTab === "history" && (
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex items-center gap-6 bg-slate-50/50">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
              <UserCheck size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">John Smith</h3>
              <p className="text-xs font-bold text-blue-500 tracking-widest uppercase mt-1 leading-none">PT001 • Patient Analytics</p>
            </div>
          </div>

          <div className="p-2 px-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-5 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">History ID</th>
                  <th className="px-4 py-5 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">Dispensed On</th>
                  <th className="px-4 py-5 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">Physician</th>
                  <th className="px-4 py-5 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">Medication Regimen</th>
                  <th className="px-4 py-5 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {patientHistory
                  .slice((pageHistory - 1) * rowsHistory, pageHistory * rowsHistory)
                  .map(h => (
                    <tr key={h.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-5 text-sm font-bold text-slate-400">{h.id}</td>
                      <td className="px-4 py-5 text-sm font-bold text-slate-600">{h.date}</td>
                      <td className="px-4 py-5 text-sm font-bold text-slate-600">{h.doctor}</td>
                      <td className="px-4 py-5 text-sm font-medium text-slate-500">{h.medicines.join(", ")}</td>
                      <td className="px-4 py-5 text-right">
                        <span className="px-3 py-1 bg-slate-100 text-[0.65rem] font-bold text-slate-500 rounded-full uppercase tracking-widest">{h.status}</span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="p-6">
            <Pagination
              currentPage={pageHistory}
              totalItems={patientHistory.length}
              rowsPerPage={rowsHistory}
              onPageChange={setPageHistory}
              onRowsPerPageChange={(rows) => {
                setRowsHistory(rows);
                setPageHistory(1);
              }}
            />
          </div>
        </div>
      )}

      {showViewModal && selectedPrescription && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                  <FileText size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">Prescription Review</h2>
                  <p className="text-[0.65rem] font-bold text-blue-500 tracking-widest uppercase mt-0.5">{selectedPrescription.id}</p>
                </div>
              </div>
              <button
                onClick={() => setShowViewModal(false)}
                className="p-3 text-slate-400 hover:text-slate-900 transition-colors rounded-2xl hover:bg-slate-200/50"
              >
                <XCircle size={24} />
              </button>
            </div>

            <div className="p-8 space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-1">
                  <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest">Patient Name</span>
                  <div className="text-base font-bold text-slate-900">{selectedPrescription.patientName}</div>
                  <div className="text-xs font-bold text-blue-500 uppercase tracking-wider">{selectedPrescription.patientId}</div>
                </div>
                <div className="space-y-1">
                  <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest">Prescribing Physician</span>
                  <div className="text-base font-bold text-slate-900">{selectedPrescription.doctorName}</div>
                </div>
                <div className="space-y-1">
                  <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest">Filing Date</span>
                  <div className="text-base font-bold text-slate-900">{selectedPrescription.uploadDate}</div>
                </div>
                <div className="space-y-1">
                  <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest">Verification Status</span>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-widest ${selectedPrescription.status === "Pending" ? "bg-amber-100 text-amber-700" :
                      selectedPrescription.status === "Verified" ? "bg-emerald-100 text-emerald-700" :
                        "bg-rose-100 text-rose-700"
                      }`}>
                      {selectedPrescription.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest">Medication Details</span>
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-2">
                  {selectedPrescription.medicines.map((m, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      {m}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest">Digital Prescription Attachment</span>
                <div className="bg-slate-900 rounded-3xl p-10 flex flex-col items-center justify-center gap-4 text-white text-center shadow-xl shadow-slate-200">
                  <div className="p-6 bg-white/10 rounded-full text-white backdrop-blur-md">
                    <FileText size={48} className="opacity-80" />
                  </div>
                  <div>
                    <div className="text-base font-bold tracking-tight">{selectedPrescription.prescriptionImage}</div>
                    <p className="text-[0.65rem] text-slate-400 font-bold uppercase tracking-widest mt-1">High-Resolution Digital Scan</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-slate-50/50 border-t border-slate-50 flex gap-4">
              <button
                className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-200"
                onClick={() => window.open(`#${selectedPrescription.prescriptionImage}`, '_blank')}
              >
                <Eye size={20} /> Preview Scan
              </button>
              <button
                className="px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all active:scale-95"
                onClick={() => setShowViewModal(false)}
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}