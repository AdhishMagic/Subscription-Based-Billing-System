/* ==========================================================================
   SUBSCRIPTION TABLE TOOLBAR
   Search, status filter tabs, and create button for subscription list.
   ========================================================================== */

import { memo } from 'react';
import { HiOutlinePlus, HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { SUBSCRIPTION_STATUSES } from '../../../data/subscriptionsMockData';
import './SubscriptionTableToolbar.css';

const SubscriptionTableToolbar = ({
    searchQuery,
    onSearchChange,
    filterStatus,
    onFilterChange,
    statusCounts,
    onCreateClick,
}) => {
    return (
        <div className="sub-toolbar">
            {/* ── Status Filter Tabs ────────────────────────────────── */}
            <div className="sub-toolbar__filters">
                <button
                    className={`sub-toolbar__tab ${filterStatus === 'all' ? 'sub-toolbar__tab--active' : ''}`}
                    onClick={() => onFilterChange('all')}
                >
                    All
                    <span className="sub-toolbar__count">{statusCounts.all}</span>
                </button>
                {SUBSCRIPTION_STATUSES.map((s) => (
                    <button
                        key={s.value}
                        className={`sub-toolbar__tab sub-toolbar__tab--${s.value} ${filterStatus === s.value ? 'sub-toolbar__tab--active' : ''
                            }`}
                        onClick={() => onFilterChange(s.value)}
                    >
                        {s.label}
                        <span className="sub-toolbar__count">{statusCounts[s.value] || 0}</span>
                    </button>
                ))}
            </div>

            {/* ── Search + Create ─────────────────────────────────── */}
            <div className="sub-toolbar__actions">
                <div className="sub-toolbar__search">
                    <HiOutlineMagnifyingGlass className="sub-toolbar__search-icon" />
                    <input
                        type="text"
                        className="sub-toolbar__search-input"
                        placeholder="Search subscriptions..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>

                <button className="sub-toolbar__create-btn" onClick={onCreateClick}>
                    <HiOutlinePlus />
                    New Subscription
                </button>
            </div>
        </div>
    );
};

export default memo(SubscriptionTableToolbar);
