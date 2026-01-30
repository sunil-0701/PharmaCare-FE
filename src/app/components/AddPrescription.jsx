import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import { usePrescriptions } from '../contexts/PrescriptionContext.jsx';
import { toast } from 'sonner';

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
            toast.error('Please fill all required fields');
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
        toast.success('Prescription added successfully!');
        navigate('/prescriptions');
    };

    return (
        <div className="p-8 max-w-4xl mx-auto text-slate-700 min-h-screen">
            <div className="mb-10 flex items-center gap-6">
                <button
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-all font-semibold text-slate-600 text-sm shadow-sm active:scale-95"
                    onClick={() => navigate('/prescriptions')}
                >
                    <ArrowLeft size={18} /> Back
                </button>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Add New Prescription</h1>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100">
                <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="space-y-6">
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
                            <span className="w-8 h-[2px] bg-slate-100"></span>
                            Patient Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Patient ID *</label>
                                <input
                                    type="text"
                                    placeholder="Enter patient ID (e.g., PT001)"
                                    className="px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-base font-medium transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white"
                                    value={formData.patientId}
                                    onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Patient Name *</label>
                                <input
                                    type="text"
                                    placeholder="Enter patient name"
                                    className="px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-base font-medium transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white"
                                    value={formData.patientName}
                                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
                            <span className="w-8 h-[2px] bg-slate-100"></span>
                            Prescription Details
                        </h2>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Doctor Name *</label>
                            <input
                                type="text"
                                placeholder="Enter doctor name"
                                className="px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-base font-medium transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white"
                                value={formData.doctorName}
                                onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Prescription Image</label>
                            <div className="relative">
                                <input
                                    type="file"
                                    id="rx-file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="rx-file"
                                    className="flex items-center justify-center gap-3 p-10 border-2 border-dashed border-slate-200 rounded-3xl cursor-pointer text-slate-500 transition-all hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50/50 group"
                                >
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="p-4 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                                            <Upload size={24} />
                                        </div>
                                        <span className="font-bold text-sm tracking-wide">{selectedFile ? selectedFile.name : 'Click to upload image'}</span>
                                        <span className="text-[0.75rem] text-slate-400">Supported formats: JPG, PNG, PDF</span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Medicines * (one per line)</label>
                            <textarea
                                rows="6"
                                placeholder="Enter medicines, one per line..."
                                className="px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-base font-medium transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white leading-relaxed"
                                value={formData.medicines}
                                onChange={(e) => setFormData({ ...formData, medicines: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end gap-4 mt-4 pt-8 border-t border-slate-100">
                        <button
                            type="button"
                            className="px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all active:scale-95"
                            onClick={() => navigate('/prescriptions')}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex items-center justify-center gap-3 px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all active:scale-[0.98] shadow-2xl shadow-blue-100 group"
                        >
                            <Save size={20} className="group-hover:scale-110 transition-transform" />
                            Save Prescription
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

