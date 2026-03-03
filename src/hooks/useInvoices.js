import { useMemo } from 'react';
import { useData } from '../context/DataContext';

export const useInvoices = () => {
    const { invoices, isLoading, updateInvoiceStatus } = useData();

    const getInvoiceById = (id) => {
        return invoices.find(inv => inv.id === id);
    };

    // Helper for adding payment (legacy support, redirects to DataContext)
    const addPayment = (id, payment) => {
        // In the new architecture, payments should be recorded via recordPayment in usePayments
        // but we'll keep this for compatibility if needed.
        console.warn('[useInvoices] addPayment is deprecated. Use recordPayment from usePayments instead.');
    };

    return {
        invoices,
        isLoading,
        getInvoiceById,
        updateInvoiceStatus,
        addPayment
    };
};
