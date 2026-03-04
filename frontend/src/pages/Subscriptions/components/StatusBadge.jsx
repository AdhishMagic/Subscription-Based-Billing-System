/* ==========================================================================
   STATUS BADGE — SUBSCRIPTION LIFECYCLE
   Glowing status badges for the subscription lifecycle flow:
   Draft (gray) → Quotation (blue) → Confirmed (purple) → Active (green) → Closed (red)
   ========================================================================== */

import './StatusBadge.css';

const STATUS_CONFIG = {
    draft: {
        label: 'Draft',
        className: 'status-badge--draft',
    },
    quotation: {
        label: 'Quotation',
        className: 'status-badge--quotation',
    },
    confirmed: {
        label: 'Confirmed',
        className: 'status-badge--confirmed',
    },
    active: {
        label: 'Active',
        className: 'status-badge--active',
    },
    closed: {
        label: 'Closed',
        className: 'status-badge--closed',
    },
};

const StatusBadge = ({ status, size = 'md', showDot = true }) => {
    const config = STATUS_CONFIG[status] || STATUS_CONFIG.draft;

    return (
        <span className={`status-badge status-badge--${size} ${config.className}`}>
            {showDot && <span className="status-badge__dot" />}
            {config.label}
        </span>
    );
};

export default StatusBadge;
