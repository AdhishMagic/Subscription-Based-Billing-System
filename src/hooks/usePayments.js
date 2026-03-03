import { useMemo } from 'react';
import { useData } from '../context/DataContext';

export const usePayments = () => {
    const { payments, invoices, isLoading, recordPayment } = useData();

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

    return {
        payments,
        invoices,
        isLoading,
        paymentsSummary,
        getInvoiceBalance,
        recordPayment
    };
};
