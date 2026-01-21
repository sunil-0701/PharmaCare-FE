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
import "./InventoryDashboard.css";

// Initial inventory data
const initialInventoryData = [
  { 
    id: "1", 
    name: "Paracetamol 500mg", 
    batchNo: "BT001", 
    manufactureDate: "2024-06-15", 
    expiry: "2025-12-31", 
    quantity: 250, 
    supplier: "MedSupply Co", 
    category: "Pain Relief", 
    reorderLevel: 100,
    status: ""
  },
  { 
    id: "2", 
    name: "Amoxicillin 250mg", 
    batchNo: "BT002", 
    manufactureDate: "2024-04-10", 
    expiry: "2025-10-15", 
    quantity: 45, 
    supplier: "PharmaDist", 
    category: "Antibiotics", 
    reorderLevel: 50,
    status: "Low Stock"
  },
  { 
    id: "3", 
    name: "Ibuprofen 400mg", 
    batchNo: "BT003", 
    manufactureDate: "2024-09-20", 
    expiry: "2026-03-20", 
    quantity: 320, 
    supplier: "MedSupply Co", 
    category: "Pain Relief", 
    reorderLevel: 100,
    status: "Near Expiry"
  },
  { 
    id: "4", 
    name: "Cetirizine 10mg", 
    batchNo: "BT004", 
    manufactureDate: "2024-02-10", 
    expiry: "2025-08-10", 
    quantity: 150, 
    supplier: "HealthCare Ltd", 
    category: "Antihistamines", 
    reorderLevel: 50,
    status: ""
  },
  { 
    id: "5", 
    name: "Omeprazole 20mg", 
    batchNo: "BT005", 
    manufactureDate: "2024-05-25", 
    expiry: "2025-11-25", 
    quantity: 30, 
    supplier: "PharmaDist", 
    category: "Gastrointestinal", 
    reorderLevel: 50,
    status: "Low Stock"
  },
  { 
    id: "6", 
    name: "Aspirin 75mg", 
    batchNo: "BT006", 
    manufactureDate: "2023-12-15", 
    expiry: "2025-06-15", 
    quantity: 180, 
    supplier: "MedSupply Co", 
    category: "Cardiovascular", 
    reorderLevel: 100,
    status: ""
  }
];

// Existing medicines for suggestions
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
  const [inventoryData, setInventoryData] = useState(initialInventoryData);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter states
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSupplier, setFilterSupplier] = useState("all");
  const [filterExpiry, setFilterExpiry] = useState("all");
  
  // Add medicine form state
  const [newMedicine, setNewMedicine] = useState({
    name: "",
    batchNo: "",
    manufactureDate: "",
    expiry: "",
    quantity: "",
    supplier: "",
    category: ""
  });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [useBarcode, setUseBarcode] = useState(false);
  const [barcodeValue, setBarcodeValue] = useState("");

  // Calculate stats
  const totalItems = inventoryData.length;
  const lowStockItems = inventoryData.filter(item => item.status === "Low Stock").length;
  const expiringSoonItems = inventoryData.filter(item => item.status === "Near Expiry").length;
  const wellStockedItems = inventoryData.filter(item => !item.status && item.quantity > 100).length;

  // Get unique suppliers for filter
  const suppliers = ["all", ...new Set(inventoryData.map(item => item.supplier))];

  // Filter data based on search and filters
  const filteredData = inventoryData.filter(item => {
    // Search filter
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.batchNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = filterStatus === "all" || item.status === filterStatus;
    
    // Supplier filter
    const matchesSupplier = filterSupplier === "all" || item.supplier === filterSupplier;
    
    // Expiry filter
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

  // Handle barcode scan simulation
  const handleBarcodeScan = () => {
    if (barcodeValue.trim()) {
      // Simulate barcode lookup - in real app, this would call an API
      const mockLookup = {
        "123456789": {
          name: "Paracetamol 500mg",
          batchNo: "BT007",
          category: "Pain Relief"
        },
        "987654321": {
          name: "Amoxicillin 250mg",
          batchNo: "BT008",
          category: "Antibiotics"
        }
      };
      
      const found = mockLookup[barcodeValue];
      if (found) {
        setNewMedicine({
          ...newMedicine,
          name: found.name,
          batchNo: found.batchNo,
          category: found.category
        });
        alert(`Found: ${found.name} (${found.batchNo})`);
      } else {
        alert("Barcode not found in database");
      }
      setBarcodeValue("");
    }
  };

  // Handle adding new medicine - shows confirmation modal
  const handleAddMedicine = () => {
    if (!newMedicine.name || !newMedicine.batchNo || !newMedicine.manufactureDate || 
        !newMedicine.expiry || !newMedicine.quantity || !newMedicine.supplier) {
      alert("Please fill all required fields");
      return;
    }
    
    // Show confirmation modal instead of adding directly
    setShowConfirmationModal(true);
  };

  // Actually add the medicine after confirmation
  const confirmAddMedicine = () => {
    // Calculate status based on quantity
    let status = "";
    const quantity = parseInt(newMedicine.quantity);
    const expiryDate = new Date(newMedicine.expiry);
    const today = new Date();
    const daysUntilExpiry = Math.floor((expiryDate - today) / (1000 * 60 * 60 * 24));
    
    // Determine reorder level based on category
    let reorderLevel = 50;
    if (newMedicine.category.includes("Pain")) reorderLevel = 100;
    
    if (quantity <= reorderLevel) {
      status = "Low Stock";
    } else if (daysUntilExpiry <= 90) {
      status = "Near Expiry";
    }

    const newId = `BT${String(inventoryData.length + 1).padStart(3, '0')}`;
    const newItem = {
      id: String(inventoryData.length + 1),
      name: newMedicine.name,
      batchNo: newMedicine.batchNo || newId,
      manufactureDate: newMedicine.manufactureDate,
      expiry: newMedicine.expiry,
      quantity: quantity,
      supplier: newMedicine.supplier,
      category: newMedicine.category || "General",
      reorderLevel: reorderLevel,
      status: status
    };

    setInventoryData([...inventoryData, newItem]);
    
    // Reset form and close modals
    setNewMedicine({
      name: "",
      batchNo: "",
      manufactureDate: "",
      expiry: "",
      quantity: "",
      supplier: "",
      category: ""
    });
    setShowAddModal(false);
    setShowConfirmationModal(false);
    alert("Medicine added successfully!");
  };

  // Handle delete
  const handleDelete = (id) => {
    setItemToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setInventoryData(inventoryData.filter(item => item.id !== itemToDelete));
    setShowDeleteModal(false);
    setItemToDelete(null);
    alert("Medicine batch deleted successfully");
  };

  // Handle filter application
  const applyFilters = () => {
    setShowFilterModal(false);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Clear all filters
  const clearFilters = () => {
    setFilterStatus("all");
    setFilterSupplier("all");
    setFilterExpiry("all");
    setSearchTerm("");
    setCurrentPage(1);
  };

  // Get filtered suggestions
  const filteredSuggestions = knownMedicines.filter(medicine =>
    medicine.toLowerCase().includes(newMedicine.name.toLowerCase())
  );

  // Handle medicine name input with suggestions
  const handleMedicineNameChange = (value) => {
    setNewMedicine({...newMedicine, name: value});
    setShowSuggestions(true);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="inventory-dashboard">
      {/* Header */}
      <div className="inventory-header">
        <div>
          <h1>Inventory Management</h1>
          <p>Monitor stock levels and expiry dates</p>
        </div>
        <div className="user-info">
          <div className="user-role">Logged in as</div>
          <div className="user-name">Jane Manager</div>
          <div className="user-email">inventory@pharmacare.com</div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-number">{totalItems}</div>
          <div className="stat-label">Total Items</div>
          <div className="stat-subtitle">Unique medicines</div>
        </div>
        <div className="stat-card low-stock">
          <div className="stat-number">{lowStockItems}</div>
          <div className="stat-label">Low Stock</div>
          <div className="stat-subtitle">Need reordering</div>
        </div>
        <div className="stat-card expiring">
          <div className="stat-number">{expiringSoonItems}</div>
          <div className="stat-label">Expiring Soon</div>
          <div className="stat-subtitle">Within 90 days</div>
        </div>
        <div className="stat-card well-stocked">
          <div className="stat-number">{wellStockedItems}</div>
          <div className="stat-label">Well Stocked</div>
          <div className="stat-subtitle">Adequate stock</div>
        </div>
      </div>

      {/* Search and Actions Bar */}
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
          <button 
            className="btn-secondary" 
            onClick={() => setShowFilterModal(true)}
          >
            <Filter size={16} /> Filter
          </button>
          <button className="btn-secondary">
            <Download size={16} /> Export
          </button>
          <button 
            className="btn-primary" 
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={16} /> Add Medicine
          </button>
        </div>
      </div>

      {/* Table Card */}
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

        {/* Pagination */}
        <div className="pagination">
          <div className="pagination-info">
            Showing {((currentPage - 1) * rowsPerPage) + 1}-{Math.min(currentPage * rowsPerPage, filteredData.length)} of {filteredData.length}
          </div>
          <div className="pagination-controls">
            <span>Rows per page:</span>
            <select 
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      </div>

      {/* Add Medicine Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal add-medicine-modal">
            <div className="modal-header">
              <h3>Add New Medicine Batch</h3>
              <button className="close-btn" onClick={() => setShowAddModal(false)}>
                <X size={20} />
              </button>
            </div>
            
            {/* Barcode Scanner Section */}
            <div className="barcode-section">
              <div className="section-title">
                <Barcode size={18} />
                <span>Barcode Scanner (Optional)</span>
              </div>
              <p className="section-subtitle">Scan or enter barcode</p>
              <div className="barcode-input-group">
                <div className="barcode-hint">
                  Scan barcode to auto-fill medicine details
                </div>
                <div className="barcode-input-row">
                  <input
                    type="text"
                    placeholder="Enter barcode manually"
                    value={barcodeValue}
                    onChange={(e) => setBarcodeValue(e.target.value)}
                    disabled={!useBarcode}
                  />
                  <button 
                    className={`barcode-toggle ${useBarcode ? 'active' : ''}`}
                    onClick={() => setUseBarcode(!useBarcode)}
                  >
                    {useBarcode ? 'Disable' : 'Enable'} Barcode
                  </button>
                </div>
                {useBarcode && (
                  <button className="btn-secondary" onClick={handleBarcodeScan}>
                    Scan Barcode
                  </button>
                )}
              </div>
            </div>

            {/* Medicine Details Form */}
            <div className="form-section">
              <div className="form-group">
                <label>
                  Medicine Name <span className="required">*</span>
                </label>
                <div className="input-with-suggestions">
                  <input
                    type="text"
                    placeholder="Start typing to see suggestions..."
                    value={newMedicine.name}
                    onChange={(e) => handleMedicineNameChange(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                  />
                  {showSuggestions && newMedicine.name && (
                    <div className="suggestions-dropdown">
                      <div className="suggestions-header">
                        Select from existing medicines only
                      </div>
                      {filteredSuggestions.map((medicine, index) => (
                        <div
                          key={index}
                          className="suggestion-item"
                          onClick={() => {
                            setNewMedicine({...newMedicine, name: medicine});
                            setShowSuggestions(false);
                          }}
                        >
                          {medicine}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Batch Number</label>
                  <input
                    type="text"
                    placeholder="Enter batch number"
                    value={newMedicine.batchNo}
                    onChange={(e) => setNewMedicine({...newMedicine, batchNo: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Quantity</label>
                  <input
                    type="number"
                    placeholder="Enter quantity"
                    value={newMedicine.quantity}
                    onChange={(e) => setNewMedicine({...newMedicine, quantity: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Manufacture Date</label>
                  <div className="date-input">
                    <Calendar size={16} />
                    <input
                      type="date"
                      value={newMedicine.manufactureDate}
                      onChange={(e) => setNewMedicine({...newMedicine, manufactureDate: e.target.value})}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Expiry Date</label>
                  <div className="date-input">
                    <Calendar size={16} />
                    <input
                      type="date"
                      value={newMedicine.expiry}
                      onChange={(e) => setNewMedicine({...newMedicine, expiry: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Supplier</label>
                <input
                  type="text"
                  placeholder="Enter supplier name"
                  value={newMedicine.supplier}
                  onChange={(e) => setNewMedicine({...newMedicine, supplier: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Category (Optional)</label>
                <select
                  value={newMedicine.category}
                  onChange={(e) => setNewMedicine({...newMedicine, category: e.target.value})}
                >
                  <option value="">Select category</option>
                  <option value="Pain Relief">Pain Relief</option>
                  <option value="Antibiotics">Antibiotics</option>
                  <option value="Antihistamines">Antihistamines</option>
                  <option value="Gastrointestinal">Gastrointestinal</option>
                  <option value="Cardiovascular">Cardiovascular</option>
                  <option value="General">General</option>
                </select>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="modal-actions">
              <button className="btn-primary" onClick={handleAddMedicine}>
                <Check size={16} /> Add Medicine
              </button>
              <button className="btn-secondary" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="modal-overlay">
          <div className="modal confirmation-modal">
            <div className="modal-header">
              <h3>✅ Confirm Medicine Batch Details</h3>
              <button className="close-btn" onClick={() => setShowConfirmationModal(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="confirmation-content">
              <p className="confirmation-subtitle">
                Please review the details before adding:
              </p>
              
              <div className="confirmation-details">
                <div className="confirmation-item">
                  <span className="confirmation-label">Medicine Name:</span>
                  <span className="confirmation-value">{newMedicine.name || "—"}</span>
                </div>
                <div className="confirmation-item">
                  <span className="confirmation-label">Batch Number:</span>
                  <span className="confirmation-value">{newMedicine.batchNo || "—"}</span>
                </div>
                <div className="confirmation-item">
                  <span className="confirmation-label">Manufacture Date:</span>
                  <span className="confirmation-value">{formatDate(newMedicine.manufactureDate) || "—"}</span>
                </div>
                <div className="confirmation-item">
                  <span className="confirmation-label">Expiry Date:</span>
                  <span className="confirmation-value">{formatDate(newMedicine.expiry) || "—"}</span>
                </div>
                <div className="confirmation-item">
                  <span className="confirmation-label">Quantity:</span>
                  <span className="confirmation-value">{newMedicine.quantity || "—"}</span>
                </div>
                <div className="confirmation-item">
                  <span className="confirmation-label">Supplier:</span>
                  <span className="confirmation-value">{newMedicine.supplier || "—"}</span>
                </div>
              </div>
            </div>
            
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowConfirmationModal(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={confirmAddMedicine}>
                <Check size={16} /> Confirm & Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
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

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="modal-overlay">
          <div className="modal filter-modal">
            <div className="modal-header">
              <h3>Filter Inventory</h3>
              <button className="close-btn" onClick={() => setShowFilterModal(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="filter-section">
              <div className="form-group">
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
              
              <div className="form-group">
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
              
              <div className="form-group">
                <label>Expiry Status</label>
                <select 
                  value={filterExpiry} 
                  onChange={(e) => setFilterExpiry(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="expiring">Expiring Soon (≤ 90 days)</option>
                  <option value="expired">Expired</option>
                </select>
              </div>
            </div>
            
            <div className="modal-actions">
              <button className="btn-primary" onClick={applyFilters}>
                Apply Filters
              </button>
              <button className="btn-secondary" onClick={clearFilters}>
                Clear All
              </button>
              <button className="btn-secondary" onClick={() => setShowFilterModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}