import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Upload, Barcode, Calendar, Check, X } from 'lucide-react';
import { useInventory } from '../contexts/InventoryContext.jsx';
import { toast } from 'sonner';

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

export function AddBatch() {
    const navigate = useNavigate();
    const { addBatch } = useInventory();
    const [formData, setFormData] = useState({
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

    const handleBarcodeScan = () => {
        if (barcodeValue.trim()) {
            const mockLookup = {
                "123456789": { name: "Paracetamol 500mg", batchNo: "BT007", category: "Pain Relief" },
                "987654321": { name: "Amoxicillin 250mg", batchNo: "BT008", category: "Antibiotics" }
            };
            const found = mockLookup[barcodeValue];
            if (found) {
                setFormData({
                    ...formData,
                    name: found.name,
                    batchNo: found.batchNo,
                    category: found.category
                });
                toast.success(`Found: ${found.name}`);
            } else {
                toast.error("Barcode not found");
            }
            setBarcodeValue("");
        }
    };

    const filteredSuggestions = knownMedicines.filter(m =>
        m.toLowerCase().includes(formData.name.toLowerCase())
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.batchNo || !formData.manufactureDate || !formData.expiry || !formData.quantity || !formData.supplier) {
            toast.error("Please fill all required fields");
            return;
        }

        addBatch(formData);
        toast.success("Medicine batch added successfully!");
        navigate('/inventory');
    };

    return (
        <div className="p-8 max-w-5xl mx-auto text-slate-700 min-h-screen">
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <button
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-all font-semibold text-slate-600 text-sm shadow-sm active:scale-95"
                        onClick={() => navigate('/inventory')}
                    >
                        <ArrowLeft size={18} /> Back
                    </button>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Add Medicine Batch</h1>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl border border-emerald-100 italic">
                    <Check size={16} /> All fields marked with * are required
                </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100">
                <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="space-y-8">
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
                            <span className="w-8 h-[2px] bg-slate-100"></span>
                            Medicine Identifiers
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="block text-sm font-bold text-slate-700 ml-1">Barcode Scanning (Optional)</label>
                                <div className="bg-slate-50 p-5 rounded-2xl border-2 border-dashed border-slate-200 space-y-4">
                                    <div
                                        className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer font-bold text-sm transition-all border-2 ${useBarcode ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-lg shadow-emerald-100' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'}`}
                                        onClick={() => setUseBarcode(!useBarcode)}
                                    >
                                        <Barcode size={20} />
                                        <span>{useBarcode ? "Scanner Active" : "Click to Enable Scanner"}</span>
                                    </div>
                                    {useBarcode && (
                                        <div className="flex gap-2 animate-in slide-in-from-top-2 duration-300">
                                            <input
                                                type="text"
                                                placeholder="Enter barcode..."
                                                className="flex-1 px-4 py-3 bg-white border border-emerald-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                                                value={barcodeValue}
                                                onChange={(e) => setBarcodeValue(e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                onClick={handleBarcodeScan}
                                                className="px-6 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
                                            >
                                                Scan
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="block text-sm font-bold text-slate-700 ml-1">Medicine Name *</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search or type medicine name..."
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-base font-medium transition-all focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white"
                                        value={formData.name}
                                        onChange={(e) => {
                                            setFormData({ ...formData, name: e.target.value });
                                            setShowSuggestions(true);
                                        }}
                                        onFocus={() => setShowSuggestions(true)}
                                        required
                                    />
                                    {showSuggestions && formData.name && (
                                        <div className="absolute top-full left-0 right-0 bg-white border border-slate-200 rounded-2xl mt-3 shadow-2xl z-50 max-h-64 overflow-y-auto overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 divide-y divide-slate-50">
                                            {filteredSuggestions.map((m, i) => (
                                                <div
                                                    key={i}
                                                    className="px-5 py-4 cursor-pointer hover:bg-emerald-50 hover:text-emerald-700 transition-all font-medium text-slate-700 flex items-center justify-between group"
                                                    onClick={() => {
                                                        setFormData({ ...formData, name: m });
                                                        setShowSuggestions(false);
                                                    }}
                                                >
                                                    {m}
                                                    <Check size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                            ))}
                                            
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="block text-sm font-bold text-slate-700 ml-1">Batch Number *</label>
                                <input
                                    type="text"
                                    placeholder="e.g. BT00123"
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-base font-medium transition-all focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white"
                                    value={formData.batchNo}
                                    onChange={(e) => setFormData({ ...formData, batchNo: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-4">
                                <label className="block text-sm font-bold text-slate-700 ml-1">Quantity *</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        placeholder="0"
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-base font-bold transition-all focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white tabular-nums"
                                        value={formData.quantity}
                                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                        required
                                    />
                                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 uppercase tracking-widest">Units</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
                            <span className="w-8 h-[2px] bg-slate-100"></span>
                            Dates & Logistics
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="block text-sm font-bold text-slate-700 ml-1">Manufacture Date *</label>
                                <div className="relative group">
                                    <Calendar size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                                    <input
                                        type="date"
                                        className="w-full pl-14 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-base font-medium transition-all focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white"
                                        value={formData.manufactureDate}
                                        onChange={(e) => setFormData({ ...formData, manufactureDate: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="block text-sm font-bold text-slate-700 ml-1">Expiry Date *</label>
                                <div className="relative group">
                                    <Calendar size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                                    <input
                                        type="date"
                                        className="w-full pl-14 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-base font-medium transition-all focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white"
                                        value={formData.expiry}
                                        onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="block text-sm font-bold text-slate-700 ml-1">Supplier *</label>
                            <input
                                type="text"
                                placeholder="e.g. PharmaCorp Distributing Ltd."
                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-base font-medium transition-all focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white"
                                value={formData.supplier}
                                onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end gap-4 mt-12 pt-10 border-t border-slate-50">
                        <button
                            type="button"
                            className="px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95"
                            onClick={() => navigate('/inventory')}
                        >
                            Cancel & Discard
                        </button>
                        <button
                            type="submit"
                            className="flex items-center justify-center gap-3 px-12 py-4 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl font-bold hover:from-emerald-700 hover:to-teal-800 transition-all active:scale-[0.98] shadow-2xl shadow-emerald-200 group"
                        >
                            <Save size={20} className="group-hover:scale-110 transition-transform" />
                            Save Batch
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

