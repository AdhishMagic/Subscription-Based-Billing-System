/* ==========================================================================
   PLAN TABLE
   Advanced data table with sortable columns, action buttons,
   and responsive design specific for recurring plans.
   ========================================================================== */

import { memo, useCallback } from 'react';
import {
    HiChevronUp,
    HiChevronDown,
    HiOutlinePencilSquare,
    HiOutlineTrash,
    HiOutlineArrowPath,
} from 'react-icons/hi2';
import Badge from '../../../components/ui/Badge/Badge';
import { formatCurrency, formatDate } from '../../../utils/formatters';
import './PlanTable.css';

const PERIOD_BADGE_VARIANT = {
    daily: 'warning',
    weekly: 'info',
    monthly: 'accent',
    yearly: 'success',
};

const PERIOD_LABEL_MAP = {
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly',
    yearly: 'Yearly',
};

const SortIndicator = ({ field, activeField, direction }) => {
    if (field !== activeField) {
        return <span className="plan-table__sort-icon plan-table__sort-icon--inactive">⇅</span>;
    }
    return direction === 'asc' ? (
        <HiChevronUp className="plan-table__sort-icon plan-table__sort-icon--active" />
    ) : (
        <HiChevronDown className="plan-table__sort-icon plan-table__sort-icon--active" />
    );
};

const PlanTable = ({
    plans,
    sortField,
    sortDirection,
    onSort,
    onEdit,
    onDelete,
}) => {
    const handleSort = useCallback((field) => () => onSort(field), [onSort]);

    return (
        <div className="plan-table-wrapper" id="plan-table">
            <table className="plan-table">
                <thead>
                    <tr>
                        <th
                            className="plan-table__th plan-table__th--sortable"
                            onClick={handleSort('name')}
                        >
                            <span className="plan-table__th-content">
                                Plan Name
                                <SortIndicator field="name" activeField={sortField} direction={sortDirection} />
                            </span>
                        </th>
                        <th
                            className="plan-table__th plan-table__th--sortable"
                            onClick={handleSort('billingPeriod')}
                        >
                            <span className="plan-table__th-content">
                                Billing Period
                                <SortIndicator field="billingPeriod" activeField={sortField} direction={sortDirection} />
                            </span>
                        </th>
                        <th
                            className="plan-table__th plan-table__th--sortable plan-table__th--right"
                            onClick={handleSort('price')}
                        >
                            <span className="plan-table__th-content plan-table__th-content--right">
                                Price
                                <SortIndicator field="price" activeField={sortField} direction={sortDirection} />
                            </span>
                        </th>
                        <th className="plan-table__th plan-table__th--center">Status</th>
                        <th
                            className="plan-table__th plan-table__th--sortable plan-table__th--right"
                            onClick={handleSort('minQuantity')}
                        >
                            <span className="plan-table__th-content plan-table__th-content--right">
                                Min Qty
                                <SortIndicator field="minQuantity" activeField={sortField} direction={sortDirection} />
                            </span>
                        </th>
                        <th
                            className="plan-table__th plan-table__th--sortable"
                            onClick={handleSort('createdAt')}
                        >
                            <span className="plan-table__th-content">
                                Created At
                                <SortIndicator field="createdAt" activeField={sortField} direction={sortDirection} />
                            </span>
                        </th>
                        <th className="plan-table__th plan-table__th--center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {plans.map((plan) => (
                        <tr key={plan.id} className="plan-table__row">
                            <td className="plan-table__td plan-table__td--name">
                                <span className="plan-table__plan-name">{plan.name}</span>
                                {plan.options.autoClose && (
                                    <span className="plan-table__auto-close-note">
                                        Auto-closes
                                    </span>
                                )}
                            </td>
                            <td className="plan-table__td">
                                <Badge variant={PERIOD_BADGE_VARIANT[plan.billingPeriod] || 'neutral'}>
                                    {PERIOD_LABEL_MAP[plan.billingPeriod] || plan.billingPeriod}
                                </Badge>
                            </td>
                            <td className="plan-table__td plan-table__td--right plan-table__td--mono">
                                {formatCurrency(plan.price)}
                            </td>
                            <td className="plan-table__td plan-table__td--center">
                                <div className={`plan-table__status plan-table__status--${plan.status}`}>
                                    <span className="plan-table__status-dot"></span>
                                    {plan.status === 'active' ? 'Active' : 'Expired'}
                                </div>
                            </td>
                            <td className="plan-table__td plan-table__td--right plan-table__td--mono">
                                {plan.minQuantity}
                            </td>
                            <td className="plan-table__td plan-table__td--date">
                                {formatDate(plan.createdAt)}
                            </td>
                            <td className="plan-table__td plan-table__td--actions">
                                <div className="plan-table__action-group">
                                    <button
                                        className="plan-table__action-btn plan-table__action-btn--edit"
                                        onClick={() => onEdit(plan)}
                                        aria-label={`Edit ${plan.name}`}
                                        title="Edit"
                                        id={`edit-plan-${plan.id}`}
                                    >
                                        <HiOutlinePencilSquare size={16} />
                                    </button>
                                    <button
                                        className="plan-table__action-btn plan-table__action-btn--delete"
                                        onClick={() => onDelete(plan)}
                                        aria-label={`Delete ${plan.name}`}
                                        title="Delete"
                                        id={`delete-plan-${plan.id}`}
                                    >
                                        <HiOutlineTrash size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default memo(PlanTable);
