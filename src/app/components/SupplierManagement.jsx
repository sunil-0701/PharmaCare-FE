import React, { useState } from "react";
import "./SupplierManagement.css";
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

    // Create corresponding payment
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
    <div className="supplier-page">
      <div className="supplier-header">
        <h1>Supplier Management</h1>
        <p>Manage suppliers and purchase orders</p>
      </div>

      <div className="tabs">
        <button className={tab === "suppliers" ? "active" : ""} onClick={() => setTab("suppliers")}>Suppliers</button>
        <button className={tab === "orders" ? "active" : ""} onClick={() => setTab("orders")}>Purchase Orders</button>
        <button className={tab === "payments" ? "active" : ""} onClick={() => setTab("payments")}>Payments</button>
      </div>

      {tab === "suppliers" && (
        <>
          <div className="toolbar">
            <button className="btn primary" onClick={() => setShowAdd(true)}>
              <Plus /> Add Supplier
            </button>
          </div>

          <div className="card">
            <table>
              <thead>
                <tr>
                  <th>Supplier</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Margin</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map(s => (
                  <tr key={s.id}>
                    <td>
                      <div className="supplier-name">
                        <Truck />
                        <div>
                          <strong>{s.name}</strong>
                          <small>{s.address}</small>
                        </div>
                      </div>
                    </td>
                    <td><Phone size={14} style={{ marginRight: '4px' }} /> {s.contact}</td>
                    <td><Mail size={14} style={{ marginRight: '4px' }} /> {s.email}</td>
                    <td><span className="badge success">{s.profitMargin}%</span></td>
                    <td>
                      <span className={`badge ${s.status === "Active" ? "success" : "muted"}`}>
                        {s.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="icon-btn danger"
                        onClick={() => {
                          setDeleteId(s.id);
                          setShowDelete(true);
                        }}
                      >
                        <Trash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination
              currentPage={1}
              totalItems={suppliers.length}
              rowsPerPage={10}
              onPageChange={() => { }}
              onRowsPerPageChange={() => { }}
            />
          </div>
        </>
      )}

      {tab === "orders" && (
        <>
          <div className="toolbar">
            <button className="btn primary" onClick={() => setShowPO(true)}>
              <Plus /> Create Purchase Order
            </button>
          </div>

          <div className="card">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Supplier</th>
                  <th>Order Date</th>
                  <th>Expected</th>
                  <th>Items</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(po => (
                  <tr key={po.id}>
                    <td>{po.id}</td>
                    <td>{po.supplier}</td>
                    <td>{po.orderDate}</td>
                    <td>{po.expectedDate}</td>
                    <td>{po.items}</td>
                    <td>₹{po.totalAmount.toLocaleString()}</td>
                    <td>
                      <span className={`badge ${po.status === "Received" ? "success" :
                        po.status === "Partial" ? "info" : "warning"
                        }`}>
                        {po.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === "payments" && (
        <div className="card">
          <table>
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>PO</th>
                <th>Supplier</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.po}</td>
                  <td>{p.supplier}</td>
                  <td>{p.date}</td>
                  <td>₹{p.amount.toLocaleString()}</td>
                  <td>{p.method}</td>
                  <td><span className={`badge ${p.status === "Paid" ? "success" : "muted"}`}>{p.status}</span></td>
                  <td>
                    {p.status === "Pending" && (
                      <button className="btn primary sm" onClick={() => handlePay(p.id)}>Pay</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showAdd && (
        <div className="modal">
          <div className="modal-box">
            <h2>Add Supplier</h2>
            <input
              placeholder="Supplier name"
              value={newSupplier.name}
              onChange={e => setNewSupplier({ ...newSupplier, name: e.target.value })}
            />
            <input
              placeholder="Contact number"
              value={newSupplier.contact}
              onChange={e => setNewSupplier({ ...newSupplier, contact: e.target.value })}
            />
            <input
              placeholder="Email"
              value={newSupplier.email}
              onChange={e => setNewSupplier({ ...newSupplier, email: e.target.value })}
            />
            <textarea
              placeholder="Address"
              value={newSupplier.address}
              onChange={e => setNewSupplier({ ...newSupplier, address: e.target.value })}
            />
            <input
              type="number"
              placeholder="Profit margin (%)"
              value={newSupplier.profitMargin}
              onChange={e => setNewSupplier({ ...newSupplier, profitMargin: e.target.value })}
            />
            <div className="modal-actions">
              <button className="btn ghost" onClick={() => setShowAdd(false)}>Cancel</button>
              <button className="btn primary" onClick={handleAddSupplier}>Add</button>
            </div>
          </div>
        </div>
      )}

      {showPO && (
        <div className="modal">
          <div className="modal-box">
            <h2>Create Purchase Order</h2>
            <select
              value={newPO.supplier}
              onChange={e => setNewPO({ ...newPO, supplier: e.target.value })}
            >
              <option value="">Select Supplier</option>
              {suppliers.filter(s => s.status === "Active").map(s => (
                <option key={s.id} value={s.name}>{s.name}</option>
              ))}
            </select>
            <input
              type="date"
              value={newPO.date}
              onChange={e => setNewPO({ ...newPO, date: e.target.value })}
            />
            <textarea
              placeholder="Order items & quantities"
              value={newPO.items}
              onChange={e => setNewPO({ ...newPO, items: e.target.value })}
            />
            <input
              type="number"
              placeholder="Total amount"
              value={newPO.amount}
              onChange={e => setNewPO({ ...newPO, amount: e.target.value })}
            />
            <div className="modal-actions">
              <button className="btn ghost" onClick={() => setShowPO(false)}>Cancel</button>
              <button className="btn primary" onClick={handleCreatePO}>Create</button>
            </div>
          </div>
        </div>
      )}

      {showDelete && (
        <div className="modal">
          <div className="modal-box">
            <h2>Delete Supplier?</h2>
            <p>This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="btn ghost" onClick={() => setShowDelete(false)}>Cancel</button>
              <button className="btn danger" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

