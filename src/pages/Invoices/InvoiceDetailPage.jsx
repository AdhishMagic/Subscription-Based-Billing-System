import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    HiOutlineArrowLeft,
    HiOutlinePrinter,
    HiOutlinePaperAirplane,
    HiOutlineCheckCircle,
    HiOutlineXCircle,
    HiOutlineCurrencyDollar
} from 'react-icons/hi2';
import { useInvoices } from '../../hooks/useInvoices';
import InvoiceStatusBadge from '../../components/Invoices/InvoiceStatusBadge';
import InvoicePrintPreview from '../../components/Invoices/InvoicePrintPreview';
import styles from './InvoiceDetailPage.module.css';

const InvoiceDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getInvoiceById, updateInvoiceStatus, addPayment, isLoading } = useInvoices();
    const [isPrintMode, setIsPrintMode] = useState(false);

    const invoice = getInvoiceById(id);

    if (isLoading) return <div className={styles.loadingState}>Loading invoice...</div>;
    if (!invoice) return <div className={styles.errorState}>Invoice not found</div>;

    const handleStatusChange = (newStatus) => {
        updateInvoiceStatus(invoice.id, newStatus);
    };

    const handleMarkAsPaid = () => {
        const payment = {
            date: new Date().toISOString().split('T')[0],
            method: 'Manual Entry',
            amount: invoice.total,
            reference: `MAN-${Date.now()}`
        };
        addPayment(invoice.id, payment);
    };

    const formatCurrency = (amount, currency = 'USD') => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (isPrintMode) {
        return (
            <div className={styles.printWrapper}>
                <div className={styles.printActions}>
                    <button className={styles.btnSecondary} onClick={() => setIsPrintMode(false)}>
                        <HiOutlineArrowLeft /> Back to UI
                    </button>
                    <button className={styles.btnPrimary} onClick={() => window.print()}>
                        <HiOutlinePrinter /> Print Document
                    </button>
                </div>
                <InvoicePrintPreview invoice={invoice} />
            </div>
        );
    }

    return (
        <div className={styles.pageContainer}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.titleSection}>
                    <button className={styles.backBtn} onClick={() => navigate('/invoices')}>
                        <HiOutlineArrowLeft />
                    </button>
                    <div className={styles.titleWrapper}>
                        <h1 className={styles.title}>{invoice.id}</h1>
                        <InvoiceStatusBadge status={invoice.status} />
                    </div>
                </div>
                <div className={styles.actionButtons}>
                    <button className={styles.btnSecondary} onClick={() => setIsPrintMode(true)}>
                        <HiOutlinePrinter className={styles.btnIcon} /> Print
                    </button>
                    <button className={styles.btnSecondary} onClick={() => alert('Email sent! (Simulated)')}>
                        <HiOutlinePaperAirplane className={styles.btnIcon} /> Send
                    </button>

                    {/* Status-specific actions */}
                    {invoice.status === 'draft' && (
                        <button className={styles.btnPrimary} onClick={() => handleStatusChange('confirmed')}>
                            <HiOutlineCheckCircle className={styles.btnIcon} /> Confirm Invoice
                        </button>
                    )}
                    {(invoice.status === 'confirmed' || invoice.status === 'overdue') && (
                        <button className={`${styles.btnPrimary} ${styles.btnSuccess}`} onClick={handleMarkAsPaid}>
                            <HiOutlineCurrencyDollar className={styles.btnIcon} /> Mark as Paid
                        </button>
                    )}
                    {invoice.status !== 'paid' && (
                        <button className={`${styles.btnSecondary} ${styles.btnDanger}`} onClick={() => handleStatusChange('draft')}>
                            <HiOutlineXCircle className={styles.btnIcon} /> Cancel
                        </button>
                    )}
                </div>
            </div>

            {/* Grid Layout */}
            <div className={styles.contentGrid}>

                {/* Left Column: Details & Items */}
                <div className={styles.mainCol}>

                    {/* Info Panels */}
                    <div className={styles.infoPanels}>
                        <div className={styles.panel}>
                            <h3 className={styles.panelTitle}>Customer Information</h3>
                            <div className={styles.panelContent}>
                                <p className={styles.highlightText}>{invoice.customerName}</p>
                                <p className={styles.subText}>{invoice.customerEmail}</p>
                                <p className={styles.subText}>{invoice.customerAddress}</p>
                            </div>
                        </div>

                        <div className={styles.panel}>
                            <h3 className={styles.panelTitle}>Billing Details</h3>
                            <div className={styles.panelContent}>
                                <div className={styles.dataRow}>
                                    <span className={styles.dataLabel}>Issue Date</span>
                                    <span className={styles.dataValue}>{formatDate(invoice.issueDate)}</span>
                                </div>
                                <div className={styles.dataRow}>
                                    <span className={styles.dataLabel}>Due Date</span>
                                    <span className={`${styles.dataValue} ${invoice.status === 'overdue' ? styles.textOverdue : ''}`}>
                                        {formatDate(invoice.dueDate)}
                                    </span>
                                </div>
                                <div className={styles.dataRow}>
                                    <span className={styles.dataLabel}>Currency</span>
                                    <span className={styles.dataValue}>{invoice.currency}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Line Items Table */}
                    <div className={styles.panel}>
                        <h3 className={styles.panelTitle}>Product Lines</h3>
                        <div className={styles.tableWrapper}>
                            <table className={styles.itemsTable}>
                                <thead>
                                    <tr>
                                        <th>Description</th>
                                        <th className={styles.alignRight}>Qty</th>
                                        <th className={styles.alignRight}>Unit Price</th>
                                        <th className={styles.alignRight}>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoice.lines.map(line => (
                                        <tr key={line.id}>
                                            <td>{line.description}</td>
                                            <td className={styles.alignRight}>{line.quantity}</td>
                                            <td className={styles.alignRight}>{formatCurrency(line.unitPrice, invoice.currency)}</td>
                                            <td className={styles.alignRight}>{formatCurrency(line.quantity * line.unitPrice, invoice.currency)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Totals Section */}
                        <div className={styles.totalsContainer}>
                            <div className={styles.totalsBox}>
                                <div className={styles.totalsRow}>
                                    <span>Subtotal</span>
                                    <span className={styles.totalsValue}>{formatCurrency(invoice.subtotal, invoice.currency)}</span>
                                </div>
                                <div className={styles.totalsRow}>
                                    <span>Tax ({invoice.taxRate}%)</span>
                                    <span className={styles.totalsValue}>{formatCurrency(invoice.taxAmount, invoice.currency)}</span>
                                </div>
                                <div className={styles.grandTotalRow}>
                                    <span>Grand Total</span>
                                    <span className={styles.grandTotalValue}>{formatCurrency(invoice.total, invoice.currency)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: History */}
                <div className={styles.sideCol}>
                    <div className={styles.panel}>
                        <h3 className={styles.panelTitle}>Payment History</h3>
                        {invoice.paymentHistory.length === 0 ? (
                            <div className={styles.emptyHistory}>
                                <p>No payments recorded yet.</p>
                            </div>
                        ) : (
                            <div className={styles.historyList}>
                                {invoice.paymentHistory.map(pmt => (
                                    <div key={pmt.id} className={styles.historyItem}>
                                        <div className={styles.historyHeader}>
                                            <span className={styles.historyDate}>{formatDate(pmt.date)}</span>
                                            <span className={styles.historyAmount}>{formatCurrency(pmt.amount, invoice.currency)}</span>
                                        </div>
                                        <div className={styles.historyDetails}>
                                            <span>{pmt.method}</span>
                                            <span className={styles.historyRef}>{pmt.reference}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceDetailPage;
