import React from 'react';
import { HiOutlineEye } from 'react-icons/hi2';
import InvoiceStatusBadge from './InvoiceStatusBadge';
import styles from '../../pages/Invoices/InvoicesPage.module.css';

// ── Component Optimization: React.memo & Unidirectional Data ──────────────
// This row only re-renders if its specific invoice reference changes,
// preventing O(N) re-renders when a different part of the table updates.
const InvoiceRow = React.memo(({ invoice, formatCurrency, onNavigate }) => {
    return (
        <tr className={invoice.status === 'overdue' ? styles.rowOverdue : ''}>
            <td className={styles.fontMono}>{invoice.id}</td>
            <td>
                <div className={styles.customerName}>{invoice.customerName}</div>
            </td>
            <td>{new Date(invoice.issueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
            <td>{new Date(invoice.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
            <td className={`${styles.alignRight} ${styles.fontNumbers}`}>
                {formatCurrency(invoice.total, invoice.currency)}
            </td>
            <td>
                <InvoiceStatusBadge status={invoice.status} />
            </td>
            <td className={styles.alignCenter}>
                <button
                    className={styles.actionBtn}
                    onClick={() => onNavigate(invoice.id)}
                    title="View Details"
                >
                    <HiOutlineEye />
                </button>
            </td>
        </tr>
    );
}, (prevProps, nextProps) => {
    return prevProps.invoice.id === nextProps.invoice.id &&
        prevProps.invoice.status === nextProps.invoice.status &&
        prevProps.invoice.total === nextProps.invoice.total;
});

export default InvoiceRow;
