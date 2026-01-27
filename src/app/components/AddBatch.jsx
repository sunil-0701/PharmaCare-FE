import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Upload, Barcode, Calendar, Check, X } from 'lucide-react';
import { useInventory } from '../contexts/InventoryContext.jsx';
import './AddBatch.css';

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
                alert(`Found: ${found.name}`);
            } else {
                alert("Barcode not found");
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
            alert("Please fill all required fields");
            return;
        }

        addBatch(formData);
        alert("Medicine batch added successfully!");
        navigate('/inventory');
    };

    return (
        <div className="add-batch-page">
            <div className="page-header">
                <button className="btn-back" onClick={() => navigate('/inventory')}>
                    <ArrowLeft size={20} /> Back to Inventory
                </button>
                <h1>Add New Medicine Batch</h1>
            </div>

            <div className="content-grid">
                <div className="form-card">
                    <form onSubmit={handleSubmit}>
                        <div className="form-section">
                            <h2 className="section-title">Medicine Details</h2>

                            <div className="form-group">
                                <label>Barcode Scanning (Optional)</label>
                                <div className="barcode-input-wrapper">
                                    <div className={`barcode-toggle ${useBarcode ? 'active' : ''}`} onClick={() => setUseBarcode(!useBarcode)}>
                                        <Barcode size={18} />
                                        <span>{useBarcode ? "Scanner Active" : "Enable Scanner"}</span>
                                    </div>
                                    {useBarcode && (
                                        <div className="barcode-input-row">
                                            <input
                                                type="text"
                                                placeholder="Enter barcode..."
                                                value={barcodeValue}
                                                onChange={(e) => setBarcodeValue(e.target.value)}
                                            />
                                            <button type="button" onClick={handleBarcodeScan} className="btn-scan">Scan</button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Medicine Name *</label>
                                <div className="suggestion-wrapper">
                                    <input
                                        type="text"
                                        placeholder="Type medicine name..."
                                        value={formData.name}
                                        onChange={(e) => {
                                            setFormData({ ...formData, name: e.target.value });
                                            setShowSuggestions(true);
                                        }}
                                        onFocus={() => setShowSuggestions(true)}
                                        required
                                    />
                                    {showSuggestions && formData.name && (
                                        <div className="suggestions-list">
                                            {filteredSuggestions.map((m, i) => (
                                                <div key={i} className="suggestion-item" onClick={() => {
                                                    setFormData({ ...formData, name: m });
                                                    setShowSuggestions(false);
                                                }}>
                                                    {m}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Batch Number *</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. BT001"
                                        value={formData.batchNo}
                                        onChange={(e) => setFormData({ ...formData, batchNo: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Quantity *</label>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        value={formData.quantity}
                                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-section">
                            <h2 className="section-title">Dates & Source</h2>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Manufacture Date *</label>
                                    <div className="input-icon">
                                        <Calendar size={18} />
                                        <input
                                            type="date"
                                            value={formData.manufactureDate}
                                            onChange={(e) => setFormData({ ...formData, manufactureDate: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Expiry Date *</label>
                                    <div className="input-icon">
                                        <Calendar size={18} />
                                        <input
                                            type="date"
                                            value={formData.expiry}
                                            onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Supplier *</label>
                                <input
                                    type="text"
                                    placeholder="Enter supplier name"
                                    value={formData.supplier}
                                    onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="button" className="btn-cancel" onClick={() => navigate('/inventory')}>
                                Cancel
                            </button>
                            <button type="submit" className="btn-save">
                                <Save size={18} /> Save Batch
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

