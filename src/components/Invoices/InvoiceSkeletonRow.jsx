import React from 'react';
import styles from '../../pages/Invoices/InvoicesPage.module.css';

// ── Perceived Performance: Skeleton Loaders ──────────────
// Replaces spinners with an exact structural match of the table row.
// Prevents Cumulative Layout Shift (CLS) during staggered network loading.
const InvoiceSkeletonRow = () => {
    return (
        <tr className={styles.skeletonRow}>
            <td><div className={`${styles.skeletonPulse} ${styles.skeletonCell} ${styles.skeletonId}`}></div></td>
            <td><div className={`${styles.skeletonPulse} ${styles.skeletonCell} ${styles.skeletonName}`}></div></td>
            <td><div className={`${styles.skeletonPulse} ${styles.skeletonCell} ${styles.skeletonDate}`}></div></td>
            <td><div className={`${styles.skeletonPulse} ${styles.skeletonCell} ${styles.skeletonDate}`}></div></td>
            <td className={styles.alignRight}><div className={`${styles.skeletonPulse} ${styles.skeletonCell} ${styles.skeletonAmount} ${styles.skeletonRight}`}></div></td>
            <td><div className={`${styles.skeletonPulse} ${styles.skeletonCell} ${styles.skeletonBadge}`}></div></td>
            <td className={styles.alignCenter}><div className={`${styles.skeletonPulse} ${styles.skeletonCell} ${styles.skeletonAction}`}></div></td>
        </tr>
    );
};

export default InvoiceSkeletonRow;
