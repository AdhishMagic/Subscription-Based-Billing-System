import React from 'react';
import styles from './PaymentStatusBadge.module.css';

const PaymentStatusBadge = ({ status }) => {
    const getStatusClass = () => {
        switch (status?.toLowerCase()) {
            case 'completed':
                return styles.statusCompleted;
            case 'pending':
                return styles.statusPending;
            case 'failed':
                return styles.statusFailed;
            default:
                return styles.statusDefault;
        }
    };

    return (
        <span className={`${styles.badge} ${getStatusClass()}`}>
            {status}
        </span>
    );
};

export default PaymentStatusBadge;
