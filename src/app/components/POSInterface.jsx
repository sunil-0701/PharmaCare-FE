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
import { useInventory } from "../contexts/InventoryContext.jsx";
import { toast } from "sonner";

export function POSInterface() {
  const { user } = useAuth();
  const { addSale } = useSales();
  const { inventoryData, deductStock } = useInventory();
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [showReceipt, setShowReceipt] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredMedicines = inventoryData.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.batchNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (medicine) => {
    const existing = cart.find((i) => i.id === medicine.id);
    if (existing) {
      if (existing.quantity < medicine.quantity) {
        setCart(
          cart.map((i) =>
            i.id === medicine.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        );
      } else {
        toast.error("Stock limit reached for this item");
      }
    } else {
      setCart([...cart, { ...medicine, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, delta) => {
    const item = cart.find(i => i.id === id);
    const medicine = inventoryData.find(m => m.id === id);

    if (delta > 0 && item.quantity >= medicine.quantity) {
      toast.error("Stock limit reached");
      return;
    }

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
      toast.error("Query inhibited: Empty transaction payload");
      return;
    }
    if (!customerName.trim() || !customerPhone.trim()) {
      toast.error("Incomplete entity metadata: Customer info required");
      return;
    }
    setShowReceipt(true);
  };

  const printReceipt = () => {
    addSale(total, user?.id);
    deductStock(cart);
    toast.success("Transaction Ledger Synchronized & Printed");
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
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen text-slate-700 font-sans flex flex-col gap-6 md:gap-10">
     

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10 items-start">
        <div className="lg:col-span-2 flex flex-col gap-6 md:gap-10">
          <div className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/40">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">Medicine Search</h3>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-80">
                  <Search size={18} className="absolute top-1/2 left-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by Name or batch number..."
                    className="w-full h-14 pl-14 pr-6 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all placeholder:text-slate-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="h-14 px-6 bg-slate-900 text-white rounded-2xl flex items-center gap-3 font-bold text-[0.65rem] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
                  <Barcode size={20} />
                  Scanner
                </button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-[2rem] border border-slate-50">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-8 py-6 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Medicine Name</th>
                    <th className="px-8 py-6 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Price</th>
                    <th className="px-8 py-6 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Stock</th>
                    <th className="px-8 py-6 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Expiry</th>
                    <th className="px-8 py-6 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest text-right whitespace-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {pagedMedicines.map((m) => (
                    <tr key={m.id} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-6">
                        <div className="font-bold text-slate-900">{m.name}</div>
                        <div className="text-[0.6rem] font-bold text-blue-500 uppercase tracking-widest mt-1">Batch: {m.batchNo}</div>
                      </td>
                      <td className="px-8 py-6 text-center text-sm font-bold text-slate-900 uppercase">₹{m.price.toFixed(2)}</td>
                      <td className="px-8 py-6 text-center">
                        <span className={`px-3 py-1 rounded-xl text-[0.65rem] font-bold uppercase tracking-widest border whitespace-nowrap ${m.quantity < 50 ? "bg-rose-50 text-rose-500 border-rose-100" : "bg-blue-50 text-blue-500 border-blue-100"
                          }`}>
                          {m.quantity} Unit
                        </span>
                      </td>
                      <td className="px-8 py-6 text-center text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">{m.expiry}</td>
                      <td className="px-8 py-6 text-right">
                        <button
                          className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all active:scale-90 shadow-sm shadow-emerald-50 ml-auto"
                          onClick={() => addToCart(m)}
                        >
                          <Plus size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 border-t border-slate-50 pt-8">
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
        </div>

        <div className="flex flex-col gap-6 md:gap-10">
          <div className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/40">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-8">Customer Details</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest ml-1">Customer Name</label>
                <input
                  className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all placeholder:text-slate-300"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter Customer Name..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest ml-1">Customer Phone</label>
                <input
                  type="tel"
                  className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all placeholder:text-slate-300"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+91-00000-00000"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/40 flex flex-col min-h-[400px] md:min-h-[500px]">
            <div className="flex justify-between items-center mb-10">
            
              <span className="px-4 py-1.5 text-black  text-[1.2rem] font-bold uppercase tracking-widest whitespace-nowrap">  Cart Items({cart.length}) </span>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto pr-2 max-h-[400px] scrollbar-hide">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-300 border-2 border-dashed border-slate-100 rounded-[2rem]">
                  <ShoppingCart size={60} className="mb-4 opacity-10" />
                  <div className="text-[0.65rem] font-bold uppercase tracking-[0.2em]">Empty Cart</div>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="p-5 bg-slate-50 border border-slate-100 rounded-[2rem] group hover:border-emerald-200 transition-all flex flex-col gap-4">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-slate-900 truncate uppercase tracking-tight">{item.name}</div>
                        <div className="text-[0.6rem] font-bold text-slate-400 uppercase tracking-widest mt-1">₹{item.price.toFixed(2)} / Unit</div>
                      </div>
                      <button
                        className="text-slate-300 hover:text-rose-500 transition-colors p-1"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 bg-white p-1.5 rounded-xl border border-slate-100">
                        <button
                          className="w-10 h-10 rounded-lg hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-all"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus size={18} />
                        </button>
                        <span className="w-10 text-center text-sm font-bold text-slate-900 tabular-nums">{item.quantity}</span>
                        <button
                          className="w-10 h-10 rounded-lg hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-all"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-slate-900">₹{(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="mt-10 space-y-4 pt-10 border-t-4 border-double border-slate-50">
                <div className="flex justify-between text-[0.65rem] font-bold text-slate-400 uppercase tracking-[0.2em]">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[0.65rem] font-bold text-slate-400 uppercase tracking-[0.2em]">
                  <span> Tax (5%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100 mt-6 shadow-sm shadow-emerald-50">
                  <span className="text-[0.7rem] font-bold text-emerald-600 uppercase tracking-[0.3em]">Total Amount</span>
                  <span className="text-2xl font-bold text-emerald-700 tracking-tighter">₹{total.toFixed(2)}</span>
                </div>
              </div>
            )}

            <button
              className={`mt-10 w-full h-16 flex items-center justify-center rounded-2xl font-bold text-[0.7rem] uppercase tracking-[0.3em] transition-all active:scale-[0.98] ${!cart.length || !customerName || !customerPhone
                ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                : 'bg-slate-900 text-white hover:bg-slate-800 shadow-2xl shadow-slate-200'
                }`}
              onClick={generateBill}
              disabled={!cart.length || !customerName || !customerPhone}
            >
              Generate Bill
            </button>
          </div>
        </div>
      </div>

      {showReceipt && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-50 p-6 backdrop-blur-xl">
          <div className="bg-white p-10 rounded-[3rem] w-full max-w-md shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] animate-in fade-in zoom-in duration-300 border border-white">
            <div className="flex flex-col items-center mb-10">
              <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center mb-6 shadow-inner shadow-emerald-100">
                <Printer className="text-emerald-600" size={36} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight leading-none">PharmaCare Record</h3>
              <p className="text-[0.6rem] font-bold text-slate-400 uppercase tracking-[0.3em] mt-3">Auth Sequence Validated</p>
            </div>

            <div className="space-y-4 mb-10 bg-slate-50 p-8 rounded-[2rem] border border-slate-100 text-xs font-bold ring-1 ring-slate-100">
              <div className="flex justify-between uppercase tracking-widest text-[0.6rem] text-slate-400"><span>Consignee</span> <span className="text-slate-900">{customerName}</span></div>
              <div className="flex justify-between uppercase tracking-widest text-[0.6rem] text-slate-400"><span>Contact</span> <span className="text-slate-900">{customerPhone}</span></div>
              <div className="flex justify-between uppercase tracking-widest text-[0.6rem] text-slate-400"><span>Log Date</span> <span className="text-slate-900">{new Date().toLocaleDateString()}</span></div>
            </div>

            <div className="mb-10 max-h-[250px] overflow-y-auto space-y-6 px-2 scrollbar-hide">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-start">
                  <div>
                    <div className="text-[0.7rem] font-bold text-slate-900 uppercase tracking-tight">{item.name}</div>
                    <div className="text-[0.6rem] text-slate-400 font-bold uppercase tracking-widest mt-1">₹{item.price.toFixed(2)} × {item.quantity}</div>
                  </div>
                  <span className="text-[0.7rem] font-bold text-slate-900">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t-4 border-double border-slate-100 pt-8 space-y-4 mb-10">
              <div className="flex justify-between text-[0.6rem] font-bold text-slate-400 uppercase tracking-[0.2em]">
                <span>Base Load</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[0.6rem] font-bold text-slate-400 uppercase tracking-[0.2em]">
                <span>System Surcharge</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-900 text-xl pt-4 border-t border-slate-50">
                <span className="tracking-tighter uppercase text-[0.6rem] text-slate-400 bg-slate-50 px-3 py-1 rounded-lg">Validated Total</span>
                <span className="text-emerald-600 tracking-tighter">₹{total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button
                className="w-full h-16 bg-emerald-600 text-white font-bold text-[0.7rem] uppercase tracking-[0.3em] rounded-2xl flex items-center justify-center gap-4 hover:bg-emerald-700 transition-all active:scale-[0.98] shadow-2xl shadow-emerald-200"
                onClick={printReceipt}
              >
                <Printer size={20} /> Execute Print
              </button>
              <button
                className="w-full h-14 bg-slate-50 text-slate-400 font-bold text-[0.6rem] uppercase tracking-[0.3em] rounded-2xl hover:bg-slate-100 transition-all active:scale-[0.98]"
                onClick={() => setShowReceipt(false)}
              >
                Abort Log
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}