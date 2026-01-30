import React, { createContext, useContext, useState } from 'react';

const SalesContext = createContext(undefined);

const initialSalesData = [
    { month: "Jan", sales: 45000, profit: 12000 },
    { month: "Feb", sales: 52000, profit: 14500 },
    { month: "Mar", sales: 48000, profit: 13200 },
    { month: "Apr", sales: 61000, profit: 16800 },
    { month: "May", sales: 55000, profit: 15100 },
    { month: "Jun", sales: 67000, profit: 18500 },
];

export function SalesProvider({ children }) {
    const [salesData, setSalesData] = useState(() => {
        const stored = localStorage.getItem('pharmacare_sales_chart');
        return stored ? JSON.parse(stored) : initialSalesData;
    });
    const [totalSales, setTotalSales] = useState(() => {
        const stored = localStorage.getItem('pharmacare_total_sales');
        return stored ? Number(stored) : 328000;
    });
    const [totalTransactions, setTotalTransactions] = useState(() => {
        const stored = localStorage.getItem('pharmacare_total_transactions');
        return stored ? Number(stored) : 2487;
    });
    const [staffSales, setStaffSales] = useState(() => {
        const stored = localStorage.getItem('pharmacare_staff_sales');
        return stored ? JSON.parse(stored) : { "1": 45200, "2": 38900, "3": 52100 };
    });

    const addSale = (amount, userId) => {
        const currentMonth = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date());

        const newTotalSales = totalSales + amount;
        const newTotalTransactions = totalTransactions + 1;

        setTotalSales(newTotalSales);
        setTotalTransactions(newTotalTransactions);

        const currentMonthIndex = salesData.findIndex(item => item.month === currentMonth);
        let newSalesData;

        if (currentMonthIndex !== -1) {
            newSalesData = salesData.map((item, index) =>
                index === currentMonthIndex
                    ? { ...item, sales: item.sales + amount, profit: item.profit + (amount * 0.25) }
                    : item
            );
        } else {
            newSalesData = [...salesData, { month: currentMonth, sales: amount, profit: amount * 0.25 }];
        }

        setSalesData(newSalesData);

        
        const newStaffSales = { ...staffSales };
        if (userId) {
            newStaffSales[userId] = (newStaffSales[userId] || 0) + amount;
            setStaffSales(newStaffSales);
            localStorage.setItem('pharmacare_staff_sales', JSON.stringify(newStaffSales));
        }

        
        localStorage.setItem('pharmacare_total_sales', String(newTotalSales));
        localStorage.setItem('pharmacare_total_transactions', String(newTotalTransactions));
        localStorage.setItem('pharmacare_sales_chart', JSON.stringify(newSalesData));
    };

    const avgTicket = totalTransactions > 0 ? totalSales / totalTransactions : 0;

    return (
        <SalesContext.Provider value={{
            salesData,
            totalSales,
            totalTransactions,
            staffSales,
            avgTicket,
            addSale
        }}>
            {children}
        </SalesContext.Provider>
    );
}

export function useSales() {
    const context = useContext(SalesContext);
    if (context === undefined) {
        throw new Error('useSales must be used within a SalesProvider');
    }
    return context;
}
