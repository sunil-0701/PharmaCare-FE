import React, { useState } from "react";
import {
  Search,
  Barcode,
  Plus,
  Minus,
  Trash2,
  Printer,
  ShoppingCart,
  Info,
} from "lucide-react";
import { Pagination } from "./Pagination.jsx";
import { useSales } from "../contexts/SalesContext.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import "./POSInterface.css";

const medicines = [
  { id: "1", name: "Paracetamol 500mg", price: 5.5, stock: 250, expiry: "2025-12-31", batchNo: "BT001" },
  { id: "2", name: "Amoxicillin 250mg", price: 12, stock: 180, expiry: "2025-10-15", batchNo: "BT002" },
  { id: "3", name: "Ibuprofen 400mg", price: 8.25, stock: 320, expiry: "2026-03-20", batchNo: "BT003" },
  { id: "4", name: "Cetirizine 10mg", price: 6, stock: 150, expiry: "2025-08-10", batchNo: "BT004" },
  { id: "5", name: "Omeprazole 20mg", price: 15.5, stock: 90, expiry: "2025-11-25", batchNo: "BT005" },
];

export function POSInterface() {
  const { user } = useAuth();
  const { addSale } = useSales();
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [showReceipt, setShowReceipt] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredMedicines = medicines.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.batchNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (medicine) => {
    const existing = cart.find((i) => i.id === medicine.id);
    if (existing) {
      if (existing.quantity < medicine.stock) {
        setCart(
          cart.map((i) =>
            i.id === medicine.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        );
      } else {
        console.error("Not enough stock");
      }
    } else {
      setCart([...cart, { ...medicine, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + delta } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((i) => i.id !== id));
  };

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const generateBill = () => {
    if (!cart.length) {
      alert("Cart is empty");
      return;
    }
    if (!customerName.trim()) {
      alert("Customer Name is required");
      return;
    }
    if (!customerPhone.trim()) {
      alert("Customer Phone is required");
      return;
    }
    setShowReceipt(true);
  };

  const printReceipt = () => {
    addSale(total, user?.id);
    alert("Receipt printed successfully!");
    setCart([]);
    setCustomerName("");
    setCustomerPhone("");
    setShowReceipt(false);
  };

  const pagedMedicines = filteredMedicines.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="pos">
      <header className="pos-header">
        <div className="pos-header-content">
          <div className="pos-brand">
            <h1>PharmaCare</h1>
            <p>Healthcare System</p>
          </div>
          <div className="pos-user-badge">
            <div className="user-role">Role: {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Staff'}</div>
            <div className="user-details">
              <div>{user?.name || 'Authorized Staff'}</div>
              <div>{user?.email || 'Logged in'}</div>
            </div>
          </div>
        </div>
      </header>

      <div className="pos-layout">
        <div className="left-panel">
          <div className="pos-card">
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Medicine Search</h3>

            <div className="pos-search-bar">
              <div className="pos-input-icon">
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Search by name or batch number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="btn scan">
                <Barcode size={18} />
                Scan
              </button>
            </div>

            <div className="pos-info">
              All prices are inclusive of applicable taxes.
            </div>

            <table className="pos-table">
              <thead>
                <tr>
                  <th>Medicine</th>
                  <th>Price (Incl. Tax)</th>
                  <th>Stock</th>
                  <th>Expiry</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pagedMedicines.map((m) => (
                  <tr key={m.id}>
                    <td>
                      <div className="medicine-name">{m.name}</div>
                      <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.125rem' }}>
                        Batch: {m.batchNo}
                      </div>
                    </td>
                    <td style={{ fontWeight: '600' }}>₹{m.price.toFixed(2)}</td>
                    <td>
                      <span className="stock-pill">{m.stock}</span>
                    </td>
                    <td>{m.expiry}</td>
                    <td>
                      <button
                        className="btn add small"
                        onClick={() => addToCart(m)}
                        style={{ padding: '0.25rem 0.75rem' }}
                      >
                        <Plus size={14} /> Add
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination
              currentPage={currentPage}
              totalItems={filteredMedicines.length}
              rowsPerPage={rowsPerPage}
              onPageChange={setCurrentPage}
              onRowsPerPageChange={(rows) => {
                setRowsPerPage(rows);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        <div className="right-panel">
          <div className="pos-card" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Customer Details</h3>

            <div className="customer-input">
              <div className="customer-input-group">
                <label>
                  Customer Name <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter customer name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </div>
              <div className="customer-input-group">
                <label>
                  Customer Phone <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="pos-info" style={{ marginTop: '1rem', background: '#fef3c7', borderColor: '#fde68a', color: '#92400e' }}>
              <Info size={16} />
              Customer details are required for bill generation and record keeping.
            </div>
          </div>

          <div className="pos-card">
            <div className="cart-header">
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600' }}>Cart ({cart.length})</h3>
              {cart.length > 0 && (
                <span className="cart-count">{cart.length} items</span>
              )}
            </div>

            <div className="cart">
              {cart.length === 0 ? (
                <div className="cart-empty">
                  <ShoppingCart size={48} style={{ color: '#d1d5db', marginBottom: '0.75rem' }} />
                  <div>Cart is empty</div>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-info">
                      <div className="cart-item-name">{item.name}</div>
                      <div className="cart-item-price">
                        ₹{item.price.toFixed(2)} × {item.quantity} = ₹{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                    <div className="cart-qty">
                      <button onClick={() => updateQuantity(item.id, -1)}>
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      className="cart-item-remove"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="cart-summary">
                <div className="receipt-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="receipt-row">
                  <span>Tax (5%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="receipt-row total">
                  <span>Total Amount</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            )}

            <button
              className="btn generate"
              onClick={generateBill}
              disabled={!cart.length || !customerName || !customerPhone}
              style={{
                background: !cart.length || !customerName || !customerPhone ? '#e5e7eb' : '#059669',
                color: !cart.length || !customerName || !customerPhone ? '#9ca3af' : '#ffffff',
                cursor: !cart.length || !customerName || !customerPhone ? 'not-allowed' : 'pointer'
              }}
            >
              Generate Bill
            </button>
          </div>
        </div>
      </div>

      {showReceipt && (
        <div className="modal">
          <div className="modal-box">
            <h3 style={{ marginBottom: '1rem', color: '#111827', fontSize: '1.25rem' }}>Receipt - PharmaCare</h3>

            <div style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#6b7280' }}>
              <div><strong>Customer:</strong> {customerName}</div>
              <div><strong>Phone:</strong> {customerPhone}</div>
              <div><strong>Date:</strong> {new Date().toLocaleDateString()}</div>
            </div>

            <div style={{ marginBottom: '1rem', maxHeight: '200px', overflowY: 'auto' }}>
              {cart.map((item) => (
                <div key={item.id} className="receipt-row" style={{ padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6' }}>
                  <div>
                    <div style={{ fontWeight: '500' }}>{item.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                      ₹{item.price.toFixed(2)} × {item.quantity}
                    </div>
                  </div>
                  <span style={{ fontWeight: '600' }}>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '2px solid #e5e7eb', paddingTop: '1rem' }}>
              <div className="receipt-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="receipt-row">
                <span>Tax (5%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="receipt-row total">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
              <button
                className="btn primary"
                onClick={printReceipt}
                style={{ flex: 1 }}
              >
                <Printer size={16} /> Print Receipt
              </button>
              <button
                className="btn"
                onClick={() => setShowReceipt(false)}
                style={{ background: '#f3f4f6', border: '1px solid #d1d5db' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}