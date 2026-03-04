import React from 'react';
import styles from './InvoicePrintPreview.module.css';

const InvoicePrintPreview = ({ invoice }) => {
    if (!invoice) return <div className={styles.error}>No invoice data provided.</div>;

    const formatCurrency = (amount, currency = 'USD') => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className={styles.printContainer}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.companyInfo}>
                    <h2>ViaTunnel, Inc.</h2>
                    <p>123 Enterprise Way</p>
                    <p>San Francisco, CA 94105</p>
                    <p>billing@viatunnel.com</p>
                </div>
                <div className={styles.invoiceMeta}>
                    <h1 className={styles.invoiceTitle}>INVOICE</h1>
                    <div className={styles.metaGrid}>
                        <span className={styles.metaLabel}>Invoice Number</span>
                        <span className={styles.metaValue}>{invoice.id}</span>
                        <span className={styles.metaLabel}>Issue Date</span>
                        <span className={styles.metaValue}>{formatDate(invoice.issueDate)}</span>
                        <span className={styles.metaLabel}>Due Date</span>
                        <span className={styles.metaValue}>{formatDate(invoice.dueDate)}</span>
                    </div>
                </div>
            </div>

            {/* Customer Info */}
            <div className={styles.customerSection}>
                <h3>Bill To:</h3>
                <p className={styles.customerName}>{invoice.customerName}</p>
                <p>{invoice.customerAddress}</p>
                <p>{invoice.customerEmail}</p>
            </div>

            {/* Line Items */}
            <table className={styles.lineTable}>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th className={styles.textRight}>Qty</th>
                        <th className={styles.textRight}>Unit Price</th>
                        <th className={styles.textRight}>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {invoice.lines.map((line) => (
                        <tr key={line.id}>
                            <td>{line.description}</td>
                            <td className={styles.textRight}>{line.quantity}</td>
                            <td className={styles.textRight}>{formatCurrency(line.unitPrice, invoice.currency)}</td>
                            <td className={styles.textRight}>{formatCurrency(line.quantity * line.unitPrice, invoice.currency)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Totals Section */}
            <div className={styles.totalsSection}>
                <div className={styles.totalsRow}>
                    <span>Subtotal</span>
                    <span>{formatCurrency(invoice.subtotal, invoice.currency)}</span>
                </div>
                <div className={styles.totalsRow}>
                    <span>Tax ({invoice.taxRate}%)</span>
                    <span>{formatCurrency(invoice.taxAmount, invoice.currency)}</span>
                </div>
                <div className={`${styles.totalsRow} ${styles.grandTotal}`}>
                    <span>Total</span>
                    <span>{formatCurrency(invoice.total, invoice.currency)}</span>
                </div>
            </div>

            {/* Footer / Notes */}
            <div className={styles.footer}>
                <p>Thank you for your business. Please make payment by {formatDate(invoice.dueDate)}.</p>
                <p>Payments can be made via ACH, Wire Transfer, or Credit Card via our portal.</p>
            </div>
        </div>
    );
};

export default InvoicePrintPreview;
