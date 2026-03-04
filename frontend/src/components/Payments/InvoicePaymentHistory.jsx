import React from 'react';
import PaymentStatusBadge from './PaymentStatusBadge';
import styles from './InvoicePaymentHistory.module.css';

const InvoicePaymentHistory = ({ invoice, payments, getInvoiceBalance }) => {
    if (!invoice) return <div className={styles.emptyState}>Select an invoice to view history</div>;

    const invoicePayments = payments.filter(p => p.invoiceId === invoice.id).sort((a, b) => new Date(b.date) - new Date(a.date));
    const outstandingBalance = getInvoiceBalance(invoice.id);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    // Calculate running balance from the beginning (oldest first)
    const sortedOldestFirst = [...invoicePayments].sort((a, b) => new Date(a.date) - new Date(b.date));
    let currentBalance = invoice.total;
    const historyWithBalance = sortedOldestFirst.map(p => {
        if (p.status === 'Completed') {
            currentBalance -= p.amount;
        }
        return { ...p, runningBalance: currentBalance < 0 ? 0 : currentBalance };
    }).reverse(); // Reverse back to newest first for display

    return (
        <div className={styles.panelContainer}>
            <div className={styles.panelHeader}>
                <h3 className={styles.panelTitle}>Payment History</h3>
                <span className={styles.invoiceId}>{invoice.id}</span>
            </div>

            <div className={styles.balanceSummary}>
                <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>Invoice Total</span>
                    <span className={styles.summaryValue}>{formatCurrency(invoice.total)}</span>
                </div>
                <div className={styles.summaryDivider}></div>
                <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>Remaining Balance</span>
                    <span className={`${styles.summaryValue} ${styles.outstandingValue}`}>
                        {formatCurrency(outstandingBalance)}
                    </span>
                </div>
            </div>

            <div className={styles.historyList}>
                {historyWithBalance.length === 0 ? (
                    <div className={styles.emptyList}>No payments recorded yet.</div>
                ) : (
                    <div className={styles.tableWrapper}>
                        <table className={styles.historyTable}>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Method</th>
                                    <th>Reference</th>
                                    <th className={styles.alignRight}>Amount</th>
                                    <th className={styles.alignRight}>Balance After</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {historyWithBalance.map(payment => (
                                    <tr key={payment.id}>
                                        <td>{new Date(payment.date).toLocaleDateString()}</td>
                                        <td>{payment.method}</td>
                                        <td className={styles.fontMono}>{payment.reference || '-'}</td>
                                        <td className={`${styles.alignRight} ${styles.fontNumbers} ${styles.amountCompleted}`}>
                                            {payment.status === 'Completed' ? `+${formatCurrency(payment.amount)}` : formatCurrency(payment.amount)}
                                        </td>
                                        <td className={`${styles.alignRight} ${styles.fontNumbers}`}>
                                            {payment.status === 'Completed' ? formatCurrency(payment.runningBalance) : '-'}
                                        </td>
                                        <td><PaymentStatusBadge status={payment.status} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InvoicePaymentHistory;
