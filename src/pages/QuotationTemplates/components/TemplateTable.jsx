/* ==========================================================================
   TEMPLATE TABLE
   Sortable data table for quotation templates.

   Columns:
   Template Name | Recurring Plan | Validity (Days) | Products Count |
   Created At | Actions (Preview, Edit, Delete)
   ========================================================================== */

import { memo, useCallback } from 'react';
import {
    HiOutlinePencilSquare,
    HiOutlineTrash,
    HiOutlineEye,
    HiOutlineChevronUp,
    HiOutlineChevronDown,
} from 'react-icons/hi2';
import './TemplateTable.css';

const COLUMNS = [
    { key: 'name', label: 'Template Name', sortable: true },
    { key: 'recurringPlanName', label: 'Recurring Plan', sortable: true },
    { key: 'validityDays', label: 'Validity', sortable: true, align: 'right' },
    { key: 'productsCount', label: 'Products', sortable: true, align: 'center' },
    { key: 'createdAt', label: 'Created At', sortable: true },
];

const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

const TemplateTable = ({
    templates,
    sortField,
    sortDirection,
    onSort,
    onEdit,
    onDelete,
    onPreview,
}) => {
    const renderSortIcon = useCallback(
        (key) => {
            if (sortField !== key) return null;
            return (
                <span className="template-table__sort-icon">
                    {sortDirection === 'asc' ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />}
                </span>
            );
        },
        [sortField, sortDirection]
    );

    return (
        <div className="template-table" id="template-table">
            <table className="template-table__table">
                <thead>
                    <tr>
                        {COLUMNS.map((col) => (
                            <th
                                key={col.key}
                                className={`template-table__th ${sortField === col.key ? 'template-table__th--active' : ''
                                    } ${col.align === 'right' ? 'template-table__th--right' : ''} ${col.align === 'center' ? 'template-table__th--center' : ''
                                    }`}
                                onClick={() => col.sortable && onSort(col.key)}
                            >
                                {col.label}
                                {col.sortable && renderSortIcon(col.key)}
                            </th>
                        ))}
                        <th className="template-table__th template-table__th--actions">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {templates.map((template) => (
                        <tr key={template.id} className="template-table__row">
                            {/* Template Name */}
                            <td className="template-table__td">
                                <span className="template-table__name">{template.name}</span>
                            </td>

                            {/* Recurring Plan */}
                            <td className="template-table__td">
                                <span className="template-table__plan-badge">
                                    {template.recurringPlanName}
                                </span>
                            </td>

                            {/* Validity */}
                            <td className="template-table__td template-table__td--right">
                                <span className="template-table__validity">
                                    {template.validityDays}
                                    <span className="template-table__validity-unit">days</span>
                                </span>
                            </td>

                            {/* Products Count */}
                            <td className="template-table__td template-table__td--center">
                                <span className="template-table__products-count">
                                    {template.productLines.length}
                                </span>
                            </td>

                            {/* Created At */}
                            <td className="template-table__td">
                                <span className="template-table__date">
                                    {formatDate(template.createdAt)}
                                </span>
                            </td>

                            {/* Actions */}
                            <td className="template-table__td template-table__td--right">
                                <div className="template-table__actions">
                                    <button
                                        className="template-table__action-btn template-table__action-btn--preview"
                                        onClick={() => onPreview(template)}
                                        title="Preview template"
                                    >
                                        <HiOutlineEye />
                                    </button>
                                    <button
                                        className="template-table__action-btn"
                                        onClick={() => onEdit(template)}
                                        title="Edit template"
                                    >
                                        <HiOutlinePencilSquare />
                                    </button>
                                    <button
                                        className="template-table__action-btn template-table__action-btn--delete"
                                        onClick={() => onDelete(template)}
                                        title="Delete template"
                                    >
                                        <HiOutlineTrash />
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

export default memo(TemplateTable);
