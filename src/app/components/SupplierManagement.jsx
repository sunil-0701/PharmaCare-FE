import React, { useState } from "react";
import {
  Truck,
  Plus,
  Phone,
  Mail,
  Trash2
} from "lucide-react";
import { Pagination } from "./Pagination.jsx";
import { toast } from "sonner";

const suppliersData = [
  { id: "1", name: "MedSupply Co", contact: "+1 234-567-8900", email: "contact@medsupply.com", address: "123 Medical St, Health City", profitMargin: 5, status: "Active" },
  { id: "2", name: "PharmaDist", contact: "+1 234-567-8901", email: "sales@pharmadist.com", address: "456 Pharma Ave, Med Town", profitMargin: 3, status: "Active" },
  { id: "3", name: "HealthCare Ltd", contact: "+1 234-567-8902", email: "orders@healthcare.com", address: "789 Care Blvd, Wellness City", profitMargin: 4, status: "Active" },
  { id: "4", name: "GlobalMed Inc", contact: "+1 234-567-8903", email: "info@globalmed.com", address: "321 Global Way, Med Center", profitMargin: 2, status: "Inactive" }
];

const purchaseOrders = [
  { id: "PO001", supplier: "MedSupply Co", orderDate: "2024-12-10", expectedDate: "2024-12-20", status: "Pending", totalAmount: 5400, items: 12 },
  { id: "PO002", supplier: "PharmaDist", orderDate: "2024-12-12", expectedDate: "2024-12-18", status: "Partial", totalAmount: 3200, items: 8 },
  { id: "PO003", supplier: "HealthCare Ltd", orderDate: "2024-12-08", expectedDate: "2024-12-15", status: "Received", totalAmount: 7800, items: 15 }
];

export function SupplierManagement() {
  const [tab, setTab] = useState("suppliers");
  const [showAdd, setShowAdd] = useState(false);
  const [showPO, setShowPO] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Data State
  const [suppliers, setSuppliers] = useState(suppliersData);
  const [orders, setOrders] = useState(purchaseOrders);
  const [payments, setPayments] = useState([
    { id: "PAY001", po: "PO003", supplier: "HealthCare Ltd", date: "2024-12-15", amount: 7800, method: "Bank Transfer", status: "Paid" },
    { id: "PAY004", po: "PO001", supplier: "MedSupply Co", date: "-", amount: 5400, method: "-", status: "Pending" }
  ]);

  // Form States
  const [newSupplier, setNewSupplier] = useState({ name: "", contact: "", email: "", address: "", profitMargin: "" });
  const [newPO, setNewPO] = useState({ supplier: "", amount: "", items: "", date: "" });

  const handleAddSupplier = () => {
    if (!newSupplier.name || !newSupplier.contact) {
      toast.error("Please fill required fields");
      return;
    }
    const id = (suppliers.length + 1).toString();
    setSuppliers([...suppliers, { ...newSupplier, id, status: "Active", profitMargin: parseInt(newSupplier.profitMargin) || 0 }]);
    toast.success("Supplier added successfully");
    setShowAdd(false);
    setNewSupplier({ name: "", contact: "", email: "", address: "", profitMargin: "" });
  };

  const handleCreatePO = () => {
    if (!newPO.supplier || !newPO.amount) {
      toast.error("Please fill required fields");
      return;
    }
    const poId = `PO00${orders.length + 1}`;
    const newOrder = {
      id: poId,
      supplier: newPO.supplier,
      orderDate: newPO.date || new Date().toISOString().split('T')[0],
      expectedDate: "-",
      status: "Pending",
      totalAmount: parseFloat(newPO.amount),
      items: parseInt(newPO.items) || 0
    };
    setOrders([newOrder, ...orders]);

    
    const payId = `PAY00${payments.length + 1}`;
    setPayments([{
      id: payId,
      po: poId,
      supplier: newPO.supplier,
      date: "-",
      amount: parseFloat(newPO.amount),
      method: "-",
      status: "Pending"
    }, ...payments]);

    toast.success("Purchase order created");
    setShowPO(false);
    setNewPO({ supplier: "", amount: "", items: "", date: "" });
  };

  const confirmDelete = () => {
    setSuppliers(suppliers.filter(s => s.id !== deleteId));
    toast.success("Supplier deleted");
    setShowDelete(false);
    setDeleteId(null);
  };

  const handlePay = (paymentId) => {
    setPayments(payments.map(p =>
      p.id === paymentId ? { ...p, status: "Paid", method: "Bank Transfer", date: new Date().toISOString().split('T')[0] } : p
    ));
    toast.success("Payment processed");
  };

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen text-slate-700 font-sans flex flex-col gap-6 md:gap-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight leading-none">Supplier Hub</h1>
          <p className="text-slate-500 font-medium mt-2">Manage supply chain, procurement, and financial settlements.</p>
        </div>
        <div className="flex items-center gap-1 md:gap-2 p-1 md:p-1.5 bg-slate-200/50 rounded-xl md:rounded-2xl w-full sm:w-fit overflow-x-auto scrollbar-hide">
          {[
            { id: "suppliers", label: "Suppliers" },
            { id: "orders", label: "Purchase Orders" },
            { id: "payments", label: "Payments" }
          ].map(t => (
            <button
              key={t.id}
              className={`px-4 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap ${tab === t.id
                ? "bg-white text-emerald-600 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
                }`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === "suppliers" && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button
              className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all active:scale-95 shadow-lg shadow-emerald-200 group"
              onClick={() => setShowAdd(true)}
            >
              <Plus size={18} className="group-hover:rotate-90 transition-transform" />
              Add Supplier
            </button>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden p-2">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 py-5 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Merchant Entity</th>
                    <th className="px-6 py-5 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Contact Line</th>
                    <th className="px-6 py-5 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Digital Mail</th>
                    <th className="px-6 py-5 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 text-center">Margin</th>
                    <th className="px-6 py-5 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 text-center">Operational Status</th>
                    <th className="px-6 py-5 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {suppliers.map(s => (
                    <tr key={s.id} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                            <Truck size={20} />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 leading-tight">{s.name}</div>
                            <div className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{s.address}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm font-bold text-slate-600">
                        <div className="flex items-center gap-2"><Phone size={14} className="text-slate-300" /> {s.contact}</div>
                      </td>
                      <td className="px-6 py-5 text-sm font-bold text-slate-600">
                        <div className="flex items-center gap-2"><Mail size={14} className="text-slate-300" /> {s.email}</div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[0.65rem] font-bold tracking-widest">{s.profitMargin}%</span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className={`px-4 py-1 rounded-full text-[0.6rem] font-bold uppercase tracking-widest ${s.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                          }`}>
                          {s.status}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-end">
                          <button
                            className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all rounded-xl border border-transparent hover:border-rose-100"
                            onClick={() => {
                              setDeleteId(s.id);
                              setShowDelete(true);
                            }}
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

            <div className="px-4 pb-4 mt-4">
              <Pagination
                currentPage={1}
                totalItems={suppliers.length}
                rowsPerPage={10}
                onPageChange={() => { }}
                onRowsPerPageChange={() => { }}
              />
            </div>
          </div>
        </div>
      )}

      {tab === "orders" && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button
              className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all active:scale-95 shadow-lg shadow-emerald-200 group"
              onClick={() => setShowPO(true)}
            >
              <Plus size={18} className="group-hover:rotate-90 transition-transform" />
              Draft Purchase Order
            </button>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden p-2">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 py-5 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">PO ID</th>
                    <th className="px-6 py-5 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Supplier Authority</th>
                    <th className="px-6 py-5 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 text-center">Placed</th>
                    <th className="px-6 py-5 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 text-center">ETA</th>
                    <th className="px-6 py-5 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 text-center">Batch Size</th>
                    <th className="px-6 py-5 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Total Payable</th>
                    <th className="px-6 py-5 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {orders.map(po => (
                    <tr key={po.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-5 text-[0.65rem] font-bold text-blue-500 uppercase tracking-widest">{po.id}</td>
                      <td className="px-6 py-5 text-sm font-bold text-slate-900">{po.supplier}</td>
                      <td className="px-6 py-5 text-sm font-bold text-slate-500 text-center">{po.orderDate}</td>
                      <td className="px-6 py-5 text-sm font-bold text-slate-400 text-center italic">{po.expectedDate}</td>
                      <td className="px-6 py-5 text-sm font-bold text-slate-600 text-center">{po.items} Items</td>
                      <td className="px-6 py-5 text-sm font-bold text-slate-900 text-right">₹{po.totalAmount.toLocaleString()}</td>
                      <td className="px-6 py-5 text-center">
                        <span className={`px-4 py-1 rounded-full text-[0.6rem] font-bold uppercase tracking-widest ${po.status === "Received" ? "bg-emerald-100 text-emerald-700" :
                          po.status === "Partial" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
                          }`}>
                          {po.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {tab === "payments" && (
        <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden p-1 md:p-2">
          <div className="overflow-x-auto -mx-1 px-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="px-6 py-5 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Trans ID</th>
                  <th className="px-6 py-5 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Linked PO</th>
                  <th className="px-6 py-5 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Payee</th>
                  <th className="px-6 py-5 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 text-center">Settled On</th>
                  <th className="px-6 py-5 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Amount</th>
                  <th className="px-6 py-5 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 text-center">Gateway</th>
                  <th className="px-6 py-5 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 text-center">Status</th>
                  <th className="px-6 py-5 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Settlement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {payments.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-5 text-[0.6rem] font-bold text-slate-400 uppercase tracking-widest">{p.id}</td>
                    <td className="px-6 py-5 text-sm font-bold text-blue-500">{p.po}</td>
                    <td className="px-6 py-5 text-sm font-bold text-slate-900">{p.supplier}</td>
                    <td className="px-6 py-5 text-sm font-bold text-slate-500 text-center">{p.date}</td>
                    <td className="px-6 py-5 text-sm font-bold text-slate-900 text-right">₹{p.amount.toLocaleString()}</td>
                    <td className="px-6 py-5 text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest text-center">{p.method}</td>
                    <td className="px-6 py-5 text-center">
                      <span className={`px-4 py-1 rounded-full text-[0.6rem] font-bold uppercase tracking-widest ${p.status === "Paid" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                        }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      {p.status === "Pending" && (
                        <button
                          className="px-4 py-1.5 bg-slate-900 text-white text-[0.65rem] font-bold uppercase tracking-widest rounded-lg hover:bg-slate-800 transition-all active:scale-95 shadow-md shadow-slate-200"
                          onClick={() => handlePay(p.id)}
                        >
                          Pay Now
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showAdd && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-6 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-10 flex flex-col gap-8 animate-in zoom-in-95 duration-200">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight leading-none">Register Supplier</h2>
              <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">Digital Procurement Portal</p>
            </div>

            <div className="space-y-5">
              <input
                className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                placeholder="Merchant entity name"
                value={newSupplier.name}
                onChange={e => setNewSupplier({ ...newSupplier, name: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  className="h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                  placeholder="Primary contact"
                  value={newSupplier.contact}
                  onChange={e => setNewSupplier({ ...newSupplier, contact: e.target.value })}
                />
                <input
                  className="h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                  placeholder="Official Email"
                  value={newSupplier.email}
                  onChange={e => setNewSupplier({ ...newSupplier, email: e.target.value })}
                />
              </div>
              <textarea
                className="w-full p-6 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all resize-none h-32"
                placeholder="Registered business address"
                value={newSupplier.address}
                onChange={e => setNewSupplier({ ...newSupplier, address: e.target.value })}
              />
              <input
                type="number"
                className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                placeholder="Negotiated profit margin (%)"
                value={newSupplier.profitMargin}
                onChange={e => setNewSupplier({ ...newSupplier, profitMargin: e.target.value })}
              />
            </div>

            <div className="flex gap-4">
              <button
                className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm shadow-xl shadow-slate-200 transition-all active:scale-95 hover:bg-slate-800"
                onClick={handleAddSupplier}
              >
                Onboard Merchant
              </button>
              <button
                className="px-8 py-4 bg-white border border-slate-200 text-slate-400 font-bold rounded-2xl transition-all hover:bg-slate-50 active:scale-95"
                onClick={() => setShowAdd(false)}
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      )}

      {showPO && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-6 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-10 flex flex-col gap-8 animate-in zoom-in-95 duration-200">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight leading-none">Draft Purchase Order</h2>
              <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">Procurement Department</p>
            </div>

            <div className="space-y-5">
              <div className="relative">
                <select
                  className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all appearance-none cursor-pointer"
                  value={newPO.supplier}
                  onChange={e => setNewPO({ ...newPO, supplier: e.target.value })}
                >
                  <option value="">Authorized Supplier Authority</option>
                  {suppliers.filter(s => s.status === "Active").map(s => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                  ))}
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <Truck size={18} />
                </div>
              </div>
              <input
                type="date"
                className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                value={newPO.date}
                onChange={e => setNewPO({ ...newPO, date: e.target.value })}
              />
              <textarea
                className="w-full p-6 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all resize-none h-32"
                placeholder="Enumerate items and required bulk quantities..."
                value={newPO.items}
                onChange={e => setNewPO({ ...newPO, items: e.target.value })}
              />
              <input
                type="number"
                className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                placeholder="Gross PO Value (₹)"
                value={newPO.amount}
                onChange={e => setNewPO({ ...newPO, amount: e.target.value })}
              />
            </div>

            <div className="flex gap-4">
              <button
                className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-emerald-200 transition-all active:scale-95 hover:bg-emerald-700"
                onClick={handleCreatePO}
              >
                Log Purchase Order
              </button>
              <button
                className="px-8 py-4 bg-white border border-slate-200 text-slate-400 font-bold rounded-2xl transition-all hover:bg-slate-50 active:scale-95"
                onClick={() => setShowPO(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showDelete && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-6 animate-in fade-in duration-200">
          <div className="bg-white max-w-sm rounded-[2.5rem] shadow-2xl p-10 flex flex-col items-center text-center gap-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center">
              <Trash2 size={32} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Terminate Partnership?</h2>
              <p className="text-sm font-medium text-slate-500 mt-2">This action is irreversible and will purge the supplier from central records.</p>
            </div>
            <div className="flex w-full gap-4">
              <button
                className="flex-1 py-4 bg-rose-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-rose-200 transition-all active:scale-95 hover:bg-rose-700"
                onClick={confirmDelete}
              >
                Terminate
              </button>
              <button
                className="flex-1 py-4 bg-slate-100 text-slate-400 font-bold text-sm rounded-2xl transition-all hover:bg-slate-200 active:scale-95"
                onClick={() => setShowDelete(false)}
              >
                Hold
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

