import React from 'react';
import styles from './InvoiceStatusBadge.module.css';

const InvoiceStatusBadge = ({ status }) => {
    if (!status) return null;

    const normalizedStatus = status.toLowerCase();

    // Status definitions to match user requirements:
    // - Draft (gray)
    // - Confirmed (blue)
    // - Paid (green)
    // - Overdue (red)
    let statusClass = styles.badgeDraft;
    let label = 'Draft';

    switch (normalizedStatus) {
        case 'confirmed':
            statusClass = styles.badgeConfirmed;
            label = 'Confirmed';
            break;
        case 'paid':
            statusClass = styles.badgePaid;
            label = 'Paid';
            break;
        case 'overdue':
            statusClass = styles.badgeOverdue;
            label = 'Overdue';
            break;
        case 'draft':
        default:
            statusClass = styles.badgeDraft;
            label = 'Draft';
            break;
    }

    return (
        <span className={`${styles.badge} ${statusClass}`}>
            {label}
        </span>
    );
};

export default InvoiceStatusBadge;
