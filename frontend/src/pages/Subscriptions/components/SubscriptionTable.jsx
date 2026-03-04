/* ==========================================================================
   SUBSCRIPTION TABLE
   Sortable data table displaying subscription list with status badges.
   ========================================================================== */

import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineChevronUp, HiOutlineChevronDown, HiOutlineEye } from 'react-icons/hi2';
import StatusBadge from './StatusBadge';
import { calcOrderTotals } from '../../../data/subscriptionsMockData';
import './SubscriptionTable.css';

const COLUMNS = [
    { key: 'subscriptionNumber', label: 'Subscription #', sortable: true },
    { key: 'customerName', label: 'Customer', sortable: true },
    { key: 'planName', label: 'Plan', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'startDate', label: 'Start Date', sortable: true },
    { key: 'expirationDate', label: 'Expiration', sortable: true },
    { key: 'total', label: 'Total', sortable: false },
    { key: 'actions', label: '', sortable: false },
];

const SubscriptionTable = ({ subscriptions, sortField, sortDirection, onSort }) => {
    const navigate = useNavigate();

    const handleRowClick = useCallback(
        (sub) => {
            navigate(`/subscriptions/${sub.id}`);
        },
        [navigate]
    );

    const formatDate = (dateStr) => {
        if (!dateStr) return '—';
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const formatCurrency = (val) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

    const renderSortIcon = (key) => {
        if (sortField !== key) return null;
        return sortDirection === 'asc' ? (
            <HiOutlineChevronUp className="sub-table__sort-icon" />
        ) : (
            <HiOutlineChevronDown className="sub-table__sort-icon" />
        );
    };

    return (
        <div className="sub-table__wrap">
            <table className="sub-table" id="subscriptions-table">
                <thead>
                    <tr>
                        {COLUMNS.map((col) => (
                            <th
                                key={col.key}
                                className={`sub-table__th ${col.sortable ? 'sub-table__th--sortable' : ''} sub-table__th--${col.key}`}
                                onClick={col.sortable ? () => onSort(col.key) : undefined}
                            >
                                <span className="sub-table__th-content">
                                    {col.label}
                                    {col.sortable && renderSortIcon(col.key)}
                                </span>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {subscriptions.map((sub) => {
                        const totals = calcOrderTotals(sub.orderLines);
                        return (
                            <tr
                                key={sub.id}
                                className="sub-table__row"
                                onClick={() => handleRowClick(sub)}
                            >
                                <td className="sub-table__td sub-table__td--number">
                                    <span className="sub-table__sub-number">{sub.subscriptionNumber}</span>
                                </td>
                                <td className="sub-table__td sub-table__td--customer">
                                    {sub.customerName}
                                </td>
                                <td className="sub-table__td sub-table__td--plan">
                                    <span className="sub-table__plan-badge">{sub.planName}</span>
                                </td>
                                <td className="sub-table__td sub-table__td--status">
                                    <StatusBadge status={sub.status} size="sm" />
                                </td>
                                <td className="sub-table__td sub-table__td--date">
                                    {formatDate(sub.startDate)}
                                </td>
                                <td className="sub-table__td sub-table__td--date">
                                    {formatDate(sub.expirationDate)}
                                </td>
                                <td className="sub-table__td sub-table__td--total">
                                    {formatCurrency(totals.grandTotal)}
                                </td>
                                <td className="sub-table__td sub-table__td--actions">
                                    <button
                                        className="sub-table__view-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRowClick(sub);
                                        }}
                                        title="View details"
                                    >
                                        <HiOutlineEye />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default memo(SubscriptionTable);
