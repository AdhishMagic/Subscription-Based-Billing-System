import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';
import { mockInvoices } from '../data/mockInvoices';
import { mockPayments } from '../data/mockPayments';

/* ==========================================================================
   DATA CONTEXT (Optimization Strategy)
   Isolates high-frequency domain data from Auth/UI to prevent over-rendering.
   Handles global caching of lightweight reference data.
   ========================================================================== */

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    // Domain State
    const [invoices, setInvoices] = useState([]);
    const [payments, setPayments] = useState([]);
    const [referenceData, setReferenceData] = useState({
        taxRates: [
            { id: 'tax_standard', name: 'Standard Rate', rate: 20 },
            { id: 'tax_reduced', name: 'Reduced Rate', rate: 5 },
        ],
        exchangeRates: { USD: 1.0, EUR: 0.85, GBP: 0.73 }
    });

    const [isLoading, setIsLoading] = useState(true);

    // Bootstrap data
    useEffect(() => {
        const bootstrap = async () => {
            setIsLoading(true);
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 800));
            setInvoices(mockInvoices);
            setPayments(mockPayments);
            setIsLoading(false);
        };
        bootstrap();
    }, []);

    const updateInvoiceStatus = useCallback((id, newStatus) => {
        setInvoices(prev => prev.map(inv =>
            inv.id === id ? { ...inv, status: newStatus } : inv
        ));
    }, []);

    const recordPayment = useCallback((paymentData) => {
        const newPayment = {
            ...paymentData,
            id: `PAY-${String(Date.now()).slice(-4)}`,
            status: paymentData.status || 'Completed',
            date: paymentData.date || new Date().toISOString().split('T')[0],
            reference: paymentData.reference || `REF-${Math.floor(Math.random() * 100000)}`
        };

        // 1. Update Payments State
        setPayments(prev => [newPayment, ...prev]);

        // 2. Update Invoice State (Atomic)
        setInvoices(prev => prev.map(inv => {
            if (inv.id === paymentData.invoiceId) {
                // Calculate new balance based on ALL completed payments for this invoice
                // This is safer than just subtracting the new payment from local state
                const allRelevantPayments = [newPayment, ...payments].filter(
                    p => p.invoiceId === inv.id && p.status === 'Completed'
                );
                const totalPaid = allRelevantPayments.reduce((sum, p) => sum + p.amount, 0);
                const remainingBalance = inv.total - totalPaid;

                let newStatus = inv.status;
                if (remainingBalance <= 0) {
                    newStatus = 'paid';
                } else if (remainingBalance < inv.total) {
                    newStatus = 'partially_paid';
                }

                return { ...inv, status: newStatus };
            }
            return inv;
        }));

        return newPayment;
    }, [payments]);

    const value = useMemo(() => ({
        invoices,
        payments,
        isLoading,
        referenceData,
        updateInvoiceStatus,
        recordPayment,
        setInvoices // Advanced usage
    }), [invoices, payments, isLoading, referenceData, updateInvoiceStatus, recordPayment]);

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
