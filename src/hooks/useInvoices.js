import { useState, useMemo, useEffect } from 'react';
import { mockInvoices } from '../data/mockInvoices';

export const useInvoices = () => {
    const [invoices, setInvoices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate API fetch
        const fetchInvoices = async () => {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 600)); // Network delay simulation
            setInvoices(mockInvoices);
            setIsLoading(false);
        };
        fetchInvoices();
    }, []);

    const getInvoiceById = (id) => {
        return invoices.find(inv => inv.id === id);
    };

    const updateInvoiceStatus = (id, newStatus) => {
        setInvoices(prev => prev.map(inv =>
            inv.id === id ? { ...inv, status: newStatus } : inv
        ));
    };

    const addPayment = (id, payment) => {
        setInvoices(prev => prev.map(inv => {
            if (inv.id === id) {
                const newPaymentHistory = [...inv.paymentHistory, { ...payment, id: `pay_${Date.now()}` }];
                // Automatically mark as paid if a payment is added? Or maybe UI just sets it
                return { ...inv, paymentHistory: newPaymentHistory, status: 'paid' };
            }
            return inv;
        }));
    };

    return {
        invoices,
        isLoading,
        getInvoiceById,
        updateInvoiceStatus,
        addPayment
    };
};
