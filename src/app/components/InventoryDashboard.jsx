import React, { useState } from "react";
import {
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Plus,
  Trash2,
  Search,
  Filter,
  Download,
  X,
  Check,
  Barcode,
  Calendar
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useInventory } from "../contexts/InventoryContext.jsx";
import { Pagination } from "./Pagination.jsx";
import { toast } from "sonner";

export function InventoryDashboard() {
  const navigate = useNavigate();
  const { inventoryData, deleteBatch } = useInventory();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSupplier, setFilterSupplier] = useState("all");
  const [filterExpiry, setFilterExpiry] = useState("all");

  const totalItems = inventoryData.length;
  const lowStockItems = inventoryData.filter(item => item.status === "Low Stock").length;
  const expiringSoonItems = inventoryData.filter(item => item.status === "Near Expiry").length;
  const wellStockedItems = inventoryData.filter(item => !item.status && item.quantity > 100).length;

  const suppliers = ["all", ...new Set(inventoryData.map(item => item.supplier))];

  const filteredData = inventoryData.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.batchNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === "all" || item.status === filterStatus;

    const matchesSupplier = filterSupplier === "all" || item.supplier === filterSupplier;

    let matchesExpiry = true;
    if (filterExpiry === "expiring") {
      const expiryDate = new Date(item.expiry);
      const today = new Date();
      const daysUntilExpiry = Math.floor((expiryDate - today) / (1000 * 60 * 60 * 24));
      matchesExpiry = daysUntilExpiry <= 90;
    } else if (filterExpiry === "expired") {
      const expiryDate = new Date(item.expiry);
      const today = new Date();
      matchesExpiry = expiryDate < today;
    }

    return matchesSearch && matchesStatus && matchesSupplier && matchesExpiry;
  });

  const pagedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleDelete = (id) => {
    setItemToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    deleteBatch(itemToDelete);
    setShowDeleteModal(false);
    setItemToDelete(null);
    toast.success("Medicine batch deleted successfully");
  };

  const applyFilters = () => {
    setShowFilterModal(false);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilterStatus("all");
    setFilterSupplier("all");
    setFilterExpiry("all");
    setSearchTerm("");
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col gap-6 bg-gray-50 min-h-screen p-4 md:p-6">
      <div className="flex flex-col lg:flex-row justify-between items-start bg-white p-5 rounded-xl border border-gray-200 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 leading-none">Inventory Management</h1>
          <p className="text-gray-500 text-[0.9rem] mt-1">Monitor stock levels and expiry dates</p>
        </div>
        <div className="text-left lg:text-right">
          <div className="text-[0.8rem] text-gray-400">Logged in as</div>
          <div className="font-semibold text-gray-900 leading-tight">Inventory Manager</div>
          <div className="text-[0.8rem] text-gray-500">inventory@pharmacare.com</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 flex items-center gap-5 transition-all hover:-translate-y-1 hover:shadow-lg shadow-sm">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 bg-blue-50 text-blue-600">
            <Package size={24} />
          </div>
          <div className="flex flex-col">
            <div className="text-3xl font-bold text-gray-900 leading-tight">{totalItems}</div>
            <div className="text-sm font-semibold text-gray-600">Total Items</div>
            <div className="text-[0.75rem] text-gray-400 mt-0.5">Unique medicines</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 border-b-4 border-b-red-500 flex items-center gap-5 transition-all hover:-translate-y-1 hover:shadow-lg shadow-sm">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 bg-red-50 text-red-600">
            <AlertTriangle size={24} />
          </div>
          <div className="flex flex-col">
            <div className="text-3xl font-bold text-gray-900 leading-tight">{lowStockItems}</div>
            <div className="text-sm font-semibold text-gray-600">Low Stock</div>
            <div className="text-[0.75rem] text-gray-400 mt-0.5">Need reordering</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 border-b-4 border-b-amber-500 flex items-center gap-5 transition-all hover:-translate-y-1 hover:shadow-lg shadow-sm">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 bg-amber-50 text-amber-600">
            <AlertTriangle size={24} />
          </div>
          <div className="flex flex-col">
            <div className="text-3xl font-bold text-gray-900 leading-tight">{expiringSoonItems}</div>
            <div className="text-sm font-semibold text-gray-600">Expiring Soon</div>
            <div className="text-[0.75rem] text-gray-400 mt-0.5">Within 90 days</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 border-b-4 border-b-emerald-500 flex items-center gap-5 transition-all hover:-translate-y-1 hover:shadow-lg shadow-sm">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 bg-emerald-50 text-emerald-600">
            <TrendingUp size={24} />
          </div>
          <div className="flex flex-col">
            <div className="text-3xl font-bold text-gray-900 leading-tight">{wellStockedItems}</div>
            <div className="text-sm font-semibold text-gray-600">Well Stocked</div>
            <div className="text-[0.75rem] text-gray-400 mt-0.5">Adequate stock</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-xl border border-gray-200 gap-4">
        <div className="relative w-full sm:w-[300px]">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search medicines..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative">
            <button
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-50 transition-all"
              onClick={() => setShowFilterModal(!showFilterModal)}
            >
              <Filter size={16} /> Filter
            </button>

            {showFilterModal && (
              <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 z-[1000] animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
                  <h4 className="text-[0.95rem] font-bold text-gray-900">Filter Inventory</h4>
                  <button className="bg-gray-100 text-gray-500 w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-200" onClick={() => setShowFilterModal(false)}>
                    <X size={14} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.7rem] font-bold text-gray-400 uppercase tracking-widest">Status</label>
                    <select
                      className="w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="all">All Status</option>
                      <option value="Low Stock">Low Stock</option>
                      <option value="Near Expiry">Near Expiry</option>
                      <option value="">No Status</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.7rem] font-bold text-gray-400 uppercase tracking-widest">Supplier</label>
                    <select
                      className="w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                      value={filterSupplier}
                      onChange={(e) => setFilterSupplier(e.target.value)}
                    >
                      {suppliers.map((supplier, index) => (
                        <option key={index} value={supplier}>
                          {supplier === "all" ? "All Suppliers" : supplier}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.7rem] font-bold text-gray-400 uppercase tracking-widest">Expiry</label>
                    <select
                      className="w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                      value={filterExpiry}
                      onChange={(e) => setFilterExpiry(e.target.value)}
                    >
                      <option value="all">All</option>
                      <option value="expiring">Expiring Soon</option>
                      <option value="expired">Expired</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">
                  <button className="bg-emerald-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-emerald-700 active:scale-95 transition-all shadow-md shadow-emerald-100" onClick={applyFilters}>Apply</button>
                  <button className="bg-gray-100 text-gray-600 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 active:scale-95 transition-all" onClick={clearFilters}>Clear</button>
                </div>
              </div>
            )}
          </div>

          <button
            className="flex-1 sm:flex-none px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 active:scale-95 transition-all shadow-md shadow-emerald-100"
            onClick={() => navigate('/inventory/add-batch')}
          >
            <Plus size={16} /> Add Medicine
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Real-Time Stock Status</h3>

        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="text-left py-4 px-3 font-bold text-gray-500 border-b border-gray-100">Medicine Name</th>
                <th className="text-left py-4 px-3 font-bold text-gray-500 border-b border-gray-100">Batch No</th>
                <th className="text-left py-4 px-3 font-bold text-gray-500 border-b border-gray-100">Mfg. Date</th>
                <th className="text-left py-4 px-3 font-bold text-gray-500 border-b border-gray-100">Expiry Date</th>
                <th className="text-left py-4 px-3 font-bold text-gray-500 border-b border-gray-100">Quantity</th>
                <th className="text-left py-4 px-3 font-bold text-gray-500 border-b border-gray-100">Supplier</th>
                <th className="text-left py-4 px-3 font-bold text-gray-500 border-b border-gray-100">Status</th>
                <th className="text-left py-4 px-3 font-bold text-gray-500 border-b border-gray-100">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {pagedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="py-4 px-3">
                    <div className="flex flex-col">
                      <div className="font-bold text-gray-900">{item.name}</div>
                      {item.category && (
                        <div className="text-[0.7rem] text-gray-400 mt-0.5">{item.category}</div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-3 text-gray-600 font-medium">{item.batchNo}</td>
                  <td className="py-4 px-3 text-gray-500">{item.manufactureDate}</td>
                  <td className="py-4 px-3 text-gray-500 font-medium whitespace-nowrap">{item.expiry}</td>
                  <td className="py-4 px-3 text-gray-900 font-bold tabular-nums">{item.quantity}</td>
                  <td className="py-4 px-3 text-gray-600 font-medium">{item.supplier}</td>
                  <td className="py-4 px-3">
                    {item.status && (
                      <span className={`px-2.5 py-1 rounded-full text-[0.7rem] font-bold uppercase tracking-wider whitespace-nowrap ${item.status === 'Low Stock' ? 'bg-red-50 text-red-600 ring-1 ring-inset ring-red-100' :
                        item.status === 'Near Expiry' ? 'bg-amber-50 text-amber-600 ring-1 ring-inset ring-amber-100' :
                          'bg-gray-50 text-gray-500'
                        }`}>
                        {item.status}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-3">
                    <button
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      onClick={() => handleDelete(item.id)}
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalItems={filteredData.length}
          rowsPerPage={rowsPerPage}
          onPageChange={setCurrentPage}
          onRowsPerPageChange={(rows) => {
            setRowsPerPage(rows);
            setCurrentPage(1);
          }}
        />
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Confirm Delete</h3>
            <p className="text-gray-500 text-center mb-1">Are you sure you want to delete this medicine batch?</p>
            <p className="text-red-500 text-sm font-semibold text-center mb-8">This action cannot be undone.</p>
            <div className="grid grid-cols-2 gap-4">
              <button
                className="bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700 active:scale-95 transition-all shadow-lg shadow-red-100"
                onClick={confirmDelete}
              >
                Delete
              </button>
              <button
                className="bg-gray-100 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-200 active:scale-95 transition-all"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}