import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import { usePrescriptions } from '../contexts/PrescriptionContext.jsx';
import './AddPrescription.css';

export function AddPrescription() {
    const navigate = useNavigate();
    const { addPrescription } = usePrescriptions();
    const [formData, setFormData] = useState({
        patientId: '',
        patientName: '',
        doctorName: '',
        medicines: ''
    });
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const getCurrentDateTime = () => {
        const now = new Date();
        const date = now.toISOString().split('T')[0];
        const time = now.toTimeString().split(' ')[0].substring(0, 5);
        return `${date} ${time}`;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.patientId || !formData.patientName || !formData.doctorName || !formData.medicines) {
            alert('Please fill all required fields');
            return;
        }

        const newRx = {
            id: `RX${Date.now().toString().slice(-4)}`,
            patientName: formData.patientName,
            patientId: formData.patientId,
            doctorName: formData.doctorName,
            uploadDate: getCurrentDateTime(),
            status: "Pending",
            medicines: formData.medicines.split('\n').filter(m => m.trim()),
            prescriptionImage: selectedFile ? selectedFile.name : "prescription.jpg",
        };

        addPrescription(newRx);
        alert('Prescription added successfully!');
        navigate('/prescriptions');
    };

    return (
        <div className="add-rx-page">
            <div className="page-header">
                <button className="btn back-btn" onClick={() => navigate('/prescriptions')}>
                    <ArrowLeft size={20} /> Back
                </button>
                <h1>Add New Prescription</h1>
            </div>

            <div className="form-container">
                <form onSubmit={handleSubmit} className="rx-form">
                    <div className="form-section">
                        <h2 className="section-title">Patient Information</h2>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Patient ID *</label>
                                <input
                                    type="text"
                                    placeholder="Enter patient ID (e.g., PT001)"
                                    value={formData.patientId}
                                    onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Patient Name *</label>
                                <input
                                    type="text"
                                    placeholder="Enter patient name"
                                    value={formData.patientName}
                                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h2 className="section-title">Prescription Details</h2>
                        <div className="form-group">
                            <label>Doctor Name *</label>
                            <input
                                type="text"
                                placeholder="Enter doctor name"
                                value={formData.doctorName}
                                onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Prescription Image</label>
                            <div className="file-upload-wrapper">
                                <input
                                    type="file"
                                    id="rx-file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden-input"
                                />
                                <label htmlFor="rx-file" className="file-upload-label">
                                    <Upload size={20} />
                                    <span>{selectedFile ? selectedFile.name : 'Choose file...'}</span>
                                </label>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Medicines * (one per line)</label>
                            <textarea
                                rows="6"
                                placeholder="Enter medicines, one per line"
                                value={formData.medicines}
                                onChange={(e) => setFormData({ ...formData, medicines: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn secondary" onClick={() => navigate('/prescriptions')}>
                            Cancel
                        </button>
                        <button type="submit" className="btn primary">
                            <Save size={18} /> Save Prescription
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

