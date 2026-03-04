/* ==========================================================================
   PRODUCT TABLE
   Advanced data table with sortable columns, action buttons,
   and responsive design. Structure-ready for thousands of records.

   Performance:
   - Component is memo'd — re-renders only when data/handlers change.
   - Row rendering uses stable keys (product.id).
   - Formatters are pure functions called inline (no allocation).
   ========================================================================== */

import { memo, useCallback } from 'react';
import {
    HiChevronUp,
    HiChevronDown,
    HiOutlinePencilSquare,
    HiOutlineTrash,
    HiArrowPath,
} from 'react-icons/hi2';
import Badge from '../../../components/ui/Badge/Badge';
import { formatCurrency, formatDate } from '../../../utils/formatters';
import { PRODUCT_TYPES } from '../../../data/productsMockData';
import './ProductTable.css';

const TYPE_LABEL_MAP = Object.fromEntries(
    PRODUCT_TYPES.map((t) => [t.value, t.label])
);

const TYPE_BADGE_VARIANT = {
    saas: 'accent',
    service: 'info',
    license: 'warning',
    addon: 'neutral',
    hardware: 'danger',
    consulting: 'success',
};

const SortIndicator = ({ field, activeField, direction }) => {
    if (field !== activeField) {
        return <span className="product-table__sort-icon product-table__sort-icon--inactive">⇅</span>;
    }
    return direction === 'asc' ? (
        <HiChevronUp className="product-table__sort-icon product-table__sort-icon--active" />
    ) : (
        <HiChevronDown className="product-table__sort-icon product-table__sort-icon--active" />
    );
};

const ProductTable = ({
    products,
    sortField,
    sortDirection,
    onSort,
    onEdit,
    onDelete,
}) => {
    const handleSort = useCallback((field) => () => onSort(field), [onSort]);

    return (
        <div className="product-table-wrapper" id="product-table">
            <table className="product-table">
                <thead>
                    <tr>
                        <th
                            className="product-table__th product-table__th--sortable"
                            onClick={handleSort('name')}
                        >
                            <span className="product-table__th-content">
                                Name
                                <SortIndicator field="name" activeField={sortField} direction={sortDirection} />
                            </span>
                        </th>
                        <th className="product-table__th">Type</th>
                        <th
                            className="product-table__th product-table__th--sortable product-table__th--right"
                            onClick={handleSort('salesPrice')}
                        >
                            <span className="product-table__th-content product-table__th-content--right">
                                Sales Price
                                <SortIndicator field="salesPrice" activeField={sortField} direction={sortDirection} />
                            </span>
                        </th>
                        <th
                            className="product-table__th product-table__th--sortable product-table__th--right"
                            onClick={handleSort('costPrice')}
                        >
                            <span className="product-table__th-content product-table__th-content--right">
                                Cost Price
                                <SortIndicator field="costPrice" activeField={sortField} direction={sortDirection} />
                            </span>
                        </th>
                        <th className="product-table__th product-table__th--center">Recurring</th>
                        <th
                            className="product-table__th product-table__th--sortable"
                            onClick={handleSort('createdAt')}
                        >
                            <span className="product-table__th-content">
                                Created At
                                <SortIndicator field="createdAt" activeField={sortField} direction={sortDirection} />
                            </span>
                        </th>
                        <th className="product-table__th product-table__th--center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="product-table__row">
                            <td className="product-table__td product-table__td--name">
                                <span className="product-table__product-name">{product.name}</span>
                                {product.variants?.length > 0 && (
                                    <span className="product-table__variant-count">
                                        {product.variants.length} variant{product.variants.length !== 1 ? 's' : ''}
                                    </span>
                                )}
                            </td>
                            <td className="product-table__td">
                                <Badge variant={TYPE_BADGE_VARIANT[product.type] || 'neutral'}>
                                    {TYPE_LABEL_MAP[product.type] || product.type}
                                </Badge>
                            </td>
                            <td className="product-table__td product-table__td--right product-table__td--mono">
                                {formatCurrency(product.salesPrice)}
                            </td>
                            <td className="product-table__td product-table__td--right product-table__td--mono">
                                {formatCurrency(product.costPrice)}
                            </td>
                            <td className="product-table__td product-table__td--center">
                                {product.isRecurring ? (
                                    <span className="product-table__recurring-badge product-table__recurring-badge--yes">
                                        <HiArrowPath size={14} />
                                        Yes
                                    </span>
                                ) : (
                                    <span className="product-table__recurring-badge product-table__recurring-badge--no">
                                        One-time
                                    </span>
                                )}
                            </td>
                            <td className="product-table__td product-table__td--date">
                                {formatDate(product.createdAt)}
                            </td>
                            <td className="product-table__td product-table__td--actions">
                                <div className="product-table__action-group">
                                    <button
                                        className="product-table__action-btn product-table__action-btn--edit"
                                        onClick={() => onEdit(product)}
                                        aria-label={`Edit ${product.name}`}
                                        title="Edit"
                                    >
                                        <HiOutlinePencilSquare size={16} />
                                    </button>
                                    <button
                                        className="product-table__action-btn product-table__action-btn--delete"
                                        onClick={() => onDelete(product)}
                                        aria-label={`Delete ${product.name}`}
                                        title="Delete"
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

export default memo(ProductTable);
