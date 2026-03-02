import { useState, useMemo, useEffect } from 'react';
import { mockPayments } from '../data/mockPayments';
import { mockInvoices } from '../data/mockInvoices';

export const usePayments = () => {
    const [payments, setPayments] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 500));
            setPayments(mockPayments);
            setInvoices(mockInvoices);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    // Derived states
    const paymentsSummary = useMemo(() => {
        let totalReceived = 0;
        let pendingPayments = 0;
        let failedPayments = 0;

        payments.forEach(p => {
            if (p.status === 'Completed') totalReceived += p.amount;
            else if (p.status === 'Pending') pendingPayments += p.amount;
            else if (p.status === 'Failed') failedPayments += p.amount;
        });

        return { totalReceived, pendingPayments, failedPayments };
    }, [payments]);

    const getInvoiceBalance = (invoiceId) => {
        const inv = invoices.find(i => i.id === invoiceId);
        if (!inv) return 0;

        const totalPaid = payments
            .filter(p => p.invoiceId === invoiceId && p.status === 'Completed')
            .reduce((sum, p) => sum + p.amount, 0);

        return inv.total - totalPaid;
    };

    const recordPayment = (paymentData) => {
        const newPayment = {
            ...paymentData,
            id: `PAY-${String(payments.length + 1).padStart(4, '0')}`,
            status: paymentData.status || 'Completed',
            // Default reference if not provided
            reference: paymentData.reference || `REF-${Math.floor(Math.random() * 100000)}`
        };

        const updatedPayments = [newPayment, ...payments];
        setPayments(updatedPayments);

        // Update invoice status logic (Partial Payment Handling)
        const balance = getInvoiceBalance(paymentData.invoiceId);
        const newBalance = balance - (newPayment.status === 'Completed' ? newPayment.amount : 0);

        setInvoices(prev => prev.map(inv => {
            if (inv.id === paymentData.invoiceId) {
                let newStatus = inv.status;
                if (newBalance <= 0) {
                    newStatus = 'paid';
                } else if (newBalance > 0 && newBalance < inv.total) {
                    newStatus = 'partially_paid';
                }
                return { ...inv, status: newStatus };
            }
            return inv;
        }));

        return newPayment;
    };

    return {
        payments,
        invoices,
        isLoading,
        paymentsSummary,
        getInvoiceBalance,
        recordPayment
    };
};
