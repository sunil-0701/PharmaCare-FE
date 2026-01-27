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
import "./InventoryDashboard.css";

const knownMedicines = [
  "Paracetamol 500mg",
  "Amoxicillin 250mg",
  "Ibuprofen 400mg",
  "Cetirizine 10mg",
  "Omeprazole 20mg",
  "Aspirin 75mg",
  "Metformin 500mg",
  "Atorvastatin 20mg"
];

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
    alert("Medicine batch deleted successfully");
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
    <div className="inventory-dashboard">
      <div className="inventory-header">
        <div>
          <h1>Inventory Management</h1>
          <p>Monitor stock levels and expiry dates</p>
        </div>
        <div className="user-info">
          <div className="user-role">Logged in as</div>
          <div className="user-name">Inventory Manager</div>
          <div className="user-email">inventory@pharmacare.com</div>
        </div>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon-wrapper blue">
            <Package size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-number">{totalItems}</div>
            <div className="stat-label">Total Items</div>
            <div className="stat-subtitle">Unique medicines</div>
          </div>
        </div>
        <div className="stat-card low-stock">
          <div className="stat-icon-wrapper red">
            <AlertTriangle size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-number">{lowStockItems}</div>
            <div className="stat-label">Low Stock</div>
            <div className="stat-subtitle">Need reordering</div>
          </div>
        </div>
        <div className="stat-card expiring">
          <div className="stat-icon-wrapper orange">
            <AlertTriangle size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-number">{expiringSoonItems}</div>
            <div className="stat-label">Expiring Soon</div>
            <div className="stat-subtitle">Within 90 days</div>
          </div>
        </div>
        <div className="stat-card well-stocked">
          <div className="stat-icon-wrapper green">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-number">{wellStockedItems}</div>
            <div className="stat-label">Well Stocked</div>
            <div className="stat-subtitle">Adequate stock</div>
          </div>
        </div>
      </div>

      <div className="actions-bar">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search medicines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="action-buttons">
          <div className="filter-container">
            <button
              className="btn-secondary"
              onClick={() => setShowFilterModal(!showFilterModal)}
            >
              <Filter size={16} /> Filter
            </button>

            {showFilterModal && (
              <div className="filter-popover">
                <div className="popover-header">
                  <h4>Filter Inventory</h4>
                  <button className="close-btn-small" onClick={() => setShowFilterModal(false)}>
                    <X size={14} />
                  </button>
                </div>

                <div className="filter-body">
                  <div className="filter-group">
                    <label>Status</label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="all">All Status</option>
                      <option value="Low Stock">Low Stock</option>
                      <option value="Near Expiry">Near Expiry</option>
                      <option value="">No Status</option>
                    </select>
                  </div>

                  <div className="filter-group">
                    <label>Supplier</label>
                    <select
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

                  <div className="filter-group">
                    <label>Expiry</label>
                    <select
                      value={filterExpiry}
                      onChange={(e) => setFilterExpiry(e.target.value)}
                    >
                      <option value="all">All</option>
                      <option value="expiring">Expiring Soon</option>
                      <option value="expired">Expired</option>
                    </select>
                  </div>
                </div>

                <div className="popover-actions">
                  <button className="btn-apply" onClick={applyFilters}>Apply</button>
                  <button className="btn-clear" onClick={clearFilters}>Clear</button>
                </div>
              </div>
            )}
          </div>

          <button
            className="btn-primary"
            onClick={() => navigate('/inventory/add-batch')}
          >
            <Plus size={16} /> Add Medicine
          </button>
        </div>
      </div>

      <div className="table-card">
        <h3>Real-Time Stock Status</h3>

        <table className="inventory-table">
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Batch No</th>
              <th>Mfg. Date</th>
              <th>Expiry Date</th>
              <th>Quantity</th>
              <th>Supplier</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pagedData.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="medicine-info">
                    <div className="medicine-name">{item.name}</div>
                    {item.category && (
                      <div className="medicine-category">{item.category}</div>
                    )}
                  </div>
                </td>
                <td>{item.batchNo}</td>
                <td>{item.manufactureDate}</td>
                <td>{item.expiry}</td>
                <td>{item.quantity}</td>
                <td>{item.supplier}</td>
                <td>
                  {item.status && (
                    <span className={`status-badge ${item.status.toLowerCase().replace(' ', '-')}`}>
                      {item.status}
                    </span>
                  )}
                </td>
                <td>
                  <button
                    className="delete-btn"
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
        <div className="modal-overlay">
          <div className="modal delete-modal">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this medicine batch?</p>
            <p className="warning-text">This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="btn-danger" onClick={confirmDelete}>
                Delete
              </button>
              <button className="btn-secondary" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}