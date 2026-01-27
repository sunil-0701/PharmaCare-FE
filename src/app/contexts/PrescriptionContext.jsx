import React, { createContext, useContext, useState } from 'react';

const PrescriptionContext = createContext(undefined);

const initialPrescriptions = [
    {
        id: "RX001",
        patientName: "John Smith",
        patientId: "PT001",
        doctorName: "Dr. Sarah Johnson",
        uploadDate: "2024-12-16 10:30 AM",
        status: "Verified",
        medicines: ["Amoxicillin 500mg", "Paracetamol 650mg"],
        linkedBill: "BILL-2024-001",
        prescriptionImage: "prescription1.jpg",
    },
    {
        id: "RX002",
        patientName: "Emma Davis",
        patientId: "PT002",
        doctorName: "Dr. Michael Brown",
        uploadDate: "2024-12-16 11:15 AM",
        status: "Pending",
        medicines: ["Metformin 500mg", "Atorvastatin 20mg"],
        prescriptionImage: "prescription2.jpg",
    },
    {
        id: "RX003",
        patientName: "Robert Wilson",
        patientId: "PT003",
        doctorName: "Dr. Emily White",
        uploadDate: "2024-12-16 09:45 AM",
        status: "Rejected",
        medicines: ["Controlled substance"],
        prescriptionImage: "prescription3.jpg",
    },
];

export function PrescriptionProvider({ children }) {
    const [prescriptions, setPrescriptions] = useState(initialPrescriptions);

    const addPrescription = (newRx) => {
        setPrescriptions((prev) => [...prev, newRx]);
    };

    const updatePrescriptionStatus = (id, status) => {
        setPrescriptions((prev) =>
            prev.map((rx) => (rx.id === id ? { ...rx, status } : rx))
        );
    };

    return (
        <PrescriptionContext.Provider value={{
            prescriptions,
            addPrescription,
            updatePrescriptionStatus
        }}>
            {children}
        </PrescriptionContext.Provider>
    );
}

export function usePrescriptions() {
    const context = useContext(PrescriptionContext);
    if (context === undefined) {
        throw new Error('usePrescriptions must be used within a PrescriptionProvider');
    }
    return context;
}

