import React, { useState } from "react";
import "./SuppilerManagement.css";
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

  const handleAddSupplier = () => {
    toast.success("Supplier added successfully");
    setShowAdd(false);
  };

  const handleCreatePO = () => {
    toast.success("Purchase order created");
    setShowPO(false);
  };

  const confirmDelete = () => {
    toast.success("Supplier deleted");
    setShowDelete(false);
    setDeleteId(null);
  };

  return (
    <div className="supplier-page">
      <div className="supplier-header">
        <h1>Supplier Management</h1>
        <p>Manage suppliers and purchase orders</p>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button className={tab === "suppliers" ? "active" : ""} onClick={() => setTab("suppliers")}>Suppliers</button>
        <button className={tab === "orders" ? "active" : ""} onClick={() => setTab("orders")}>Purchase Orders</button>
        <button className={tab === "payments" ? "active" : ""} onClick={() => setTab("payments")}>Payments</button>
      </div>

      {/* SUPPLIERS */}
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
                {suppliersData.map(s => (
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
                    <td><Phone /> {s.contact}</td>
                    <td><Mail /> {s.email}</td>
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
              totalItems={suppliersData.length}
              rowsPerPage={10}
              onPageChange={() => {}}
              onRowsPerPageChange={() => {}}
            />
          </div>
        </>
      )}

      {/* PURCHASE ORDERS */}
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
                {purchaseOrders.map(po => (
                  <tr key={po.id}>
                    <td>{po.id}</td>
                    <td>{po.supplier}</td>
                    <td>{po.orderDate}</td>
                    <td>{po.expectedDate}</td>
                    <td>{po.items}</td>
                    <td>₹{po.totalAmount.toLocaleString()}</td>
                    <td>
                      <span className={`badge ${
                        po.status === "Received" ? "success" :
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

      {/* PAYMENTS */}
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
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>PAY001</td>
                <td>PO003</td>
                <td>HealthCare Ltd</td>
                <td>2024-12-15</td>
                <td>₹7,800</td>
                <td>Bank Transfer</td>
                <td><span className="badge success">Paid</span></td>
              </tr>
              <tr>
                <td>PAY004</td>
                <td>PO001</td>
                <td>MedSupply Co</td>
                <td>-</td>
                <td>₹5,400</td>
                <td>-</td>
                <td><span className="badge muted">Pending</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* ADD SUPPLIER MODAL */}
      {showAdd && (
        <div className="modal">
          <div className="modal-box">
            <h2>Add Supplier</h2>
            <input placeholder="Supplier name" />
            <input placeholder="Contact number" />
            <input placeholder="Email" />
            <textarea placeholder="Address" />
            <input type="number" placeholder="Profit margin (%)" />
            <div className="modal-actions">
              <button className="btn ghost" onClick={() => setShowAdd(false)}>Cancel</button>
              <button className="btn primary" onClick={handleAddSupplier}>Add</button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE PO MODAL */}
      {showPO && (
        <div className="modal">
          <div className="modal-box">
            <h2>Create Purchase Order</h2>
            <select>
              <option>Select Supplier</option>
              {suppliersData.filter(s => s.status === "Active").map(s => (
                <option key={s.id}>{s.name}</option>
              ))}
            </select>
            <input type="date" />
            <textarea placeholder="Order items & quantities" />
            <input type="number" placeholder="Total amount" />
            <div className="modal-actions">
              <button className="btn ghost" onClick={() => setShowPO(false)}>Cancel</button>
              <button className="btn primary" onClick={handleCreatePO}>Create</button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM */}
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
