import React, { createContext, useContext, useState } from 'react';

const InventoryContext = createContext(undefined);

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
        status: "",
        price: 15.50
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
        status: "Low Stock",
        price: 45.00
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
        status: "Near Expiry",
        price: 22.75
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
        status: "",
        price: 12.00
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
        status: "Low Stock",
        price: 35.50
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
        status: "",
        price: 8.25
    }
];

export function InventoryProvider({ children }) {
    const [inventoryData, setInventoryData] = useState(initialInventoryData);

    const addBatch = (newBatch) => {
        let status = "";
        const quantity = parseInt(newBatch.quantity);
        const expiryDate = new Date(newBatch.expiry);
        const today = new Date();
        const daysUntilExpiry = Math.floor((expiryDate - today) / (1000 * 60 * 60 * 24));

        let reorderLevel = 50;
        if (newBatch.category?.includes("Pain")) reorderLevel = 100;

        if (quantity <= reorderLevel) {
            status = "Low Stock";
        } else if (daysUntilExpiry <= 90) {
            status = "Near Expiry";
        }

        const batchWithStatus = {
            ...newBatch,
            id: String(inventoryData.length + 1),
            status,
            reorderLevel
        };

        setInventoryData(prev => [...prev, batchWithStatus]);
    };

    const deductStock = (items) => {
        setInventoryData(prev => prev.map(item => {
            const soldItem = items.find(i => i.id === item.id);
            if (soldItem) {
                const newQuantity = Math.max(0, item.quantity - soldItem.quantity);
                let newStatus = item.status;
                if (newQuantity <= item.reorderLevel) {
                    newStatus = "Low Stock";
                }
                return { ...item, quantity: newQuantity, status: newStatus };
            }
            return item;
        }));
    };

    const deleteBatch = (id) => {
        setInventoryData(prev => prev.filter(item => item.id !== id));
    };

    return (
        <InventoryContext.Provider value={{
            inventoryData,
            addBatch,
            deductStock,
            deleteBatch
        }}>
            {children}
        </InventoryContext.Provider>
    );
}

export function useInventory() {
    const context = useContext(InventoryContext);
    if (context === undefined) {
        throw new Error('useInventory must be used within an InventoryProvider');
    }
    return context;
}

