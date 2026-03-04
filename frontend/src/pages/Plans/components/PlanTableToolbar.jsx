/* ==========================================================================
   PLAN TABLE TOOLBAR
   Search, dual-filter (period and status), and "Create Plan" CTA.
   ========================================================================== */

import { memo } from 'react';
import {
    HiMagnifyingGlass,
    HiOutlineFunnel,
    HiOutlinePlus,
    HiOutlineAdjustmentsHorizontal,
} from 'react-icons/hi2';
import { BILLING_PERIODS, PLAN_STATUSES } from '../../../data/plansMockData';
import './PlanTableToolbar.css';

const PlanTableToolbar = ({
    searchQuery,
    onSearchChange,
    filterPeriod,
    onPeriodChange,
    filterStatus,
    onStatusChange,
    onCreateClick,
}) => {
    return (
        <div className="plan-toolbar" id="plan-toolbar">
            <div className="plan-toolbar__controls">
                {/* ── Search ────────────────────────────────── */}
                <div className="plan-toolbar__search">
                    <HiMagnifyingGlass className="plan-toolbar__search-icon" />
                    <input
                        type="text"
                        className="plan-toolbar__search-input"
                        placeholder="Search plans by name..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        aria-label="Search plans"
                        id="plan-search-input"
                    />
                </div>

                {/* ── Divider ─────────────────────────────── */}
                <div className="plan-toolbar__divider"></div>

                {/* ── Filters ─────────────────────────────── */}
                <div className="plan-toolbar__filter-group">
                    {/* Period Filter */}
                    <div className="plan-toolbar__filter">
                        <HiOutlineFunnel className="plan-toolbar__filter-icon" />
                        <select
                            className="plan-toolbar__select"
                            value={filterPeriod}
                            onChange={(e) => onPeriodChange(e.target.value)}
                            aria-label="Filter by billing period"
                            id="plan-period-filter"
                        >
                            <option value="all">All Periods</option>
                            {BILLING_PERIODS.map((period) => (
                                <option key={period.value} value={period.value}>
                                    {period.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Status Filter */}
                    <div className="plan-toolbar__filter">
                        <HiOutlineAdjustmentsHorizontal className="plan-toolbar__filter-icon" />
                        <select
                            className="plan-toolbar__select"
                            value={filterStatus}
                            onChange={(e) => onStatusChange(e.target.value)}
                            aria-label="Filter by plan status"
                            id="plan-status-filter"
                        >
                            <option value="all">All Statuses</option>
                            {PLAN_STATUSES.map((status) => (
                                <option key={status.value} value={status.value}>
                                    {status.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* ── Create CTA ─────────────────────────────── */}
            <button
                className="btn btn--secondary btn--md plan-toolbar__create-btn"
                onClick={onCreateClick}
                id="create-plan-btn"
            >
                <HiOutlinePlus size={18} />
                Create Plan
            </button>
        </div>
    );
};

export default memo(PlanTableToolbar);
