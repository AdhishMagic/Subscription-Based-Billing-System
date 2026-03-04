import React from 'react';
import styles from './PaymentSummaryWidget.module.css';

const PaymentSummaryWidget = ({ summary }) => {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    return (
        <div className={styles.widgetGrid}>
            <div className={`${styles.widgetCard} ${styles.received}`}>
                <span className={styles.label}>Total Received</span>
                <span className={styles.value}>{formatCurrency(summary.totalReceived)}</span>
            </div>
            <div className={`${styles.widgetCard} ${styles.pending}`}>
                <span className={styles.label}>Pending Payments</span>
                <span className={styles.value}>{formatCurrency(summary.pendingPayments)}</span>
            </div>
            <div className={`${styles.widgetCard} ${styles.failed}`}>
                <span className={styles.label}>Failed Payments</span>
                <span className={styles.value}>{formatCurrency(summary.failedPayments)}</span>
            </div>
        </div>
    );
};

export default PaymentSummaryWidget;
