/* ==========================================================================
   TEMPLATE PREVIEW
   Read-only formatted subscription preview with professional invoice-style
   layout. Used both as a standalone preview page and as a toggle within the
   create/edit form.
   ========================================================================== */

import { memo, useMemo } from 'react';
import { HiOutlineEye } from 'react-icons/hi2';
import {
    calcProductLineSubtotal,
    calcTemplateTotals,
} from '../../../data/templatesMockData';
import FinancialSummary from './FinancialSummary';
import './TemplatePreview.css';

const formatCurrency = (val) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const TemplatePreview = ({ template }) => {
    const totals = useMemo(
        () => calcTemplateTotals(template.productLines),
        [template.productLines]
    );

    return (
        <div className="template-preview" id="template-preview">
            {/* ── Invoice Card ──────────────────────────────────────── */}
            <div className="template-preview__card">
                {/* Invoice Header */}
                <div className="template-preview__invoice-header">
                    <div>
                        <div className="template-preview__template-label">
                            Quotation Template
                        </div>
                        <h2 className="template-preview__template-name">
                            {template.name}
                        </h2>
                    </div>
                    <span className="template-preview__badge">
                        <HiOutlineEye />
                        Preview
                    </span>
                </div>

                {/* Meta Grid */}
                <div className="template-preview__meta">
                    <div className="template-preview__meta-item">
                        <span className="template-preview__meta-label">
                            Recurring Plan
                        </span>
                        <span className="template-preview__meta-value">
                            {template.recurringPlanName}
                        </span>
                    </div>
                    <div className="template-preview__meta-item">
                        <span className="template-preview__meta-label">
                            Validity Period
                        </span>
                        <span className="template-preview__meta-value">
                            {template.validityDays} Days
                        </span>
                    </div>
                    <div className="template-preview__meta-item">
                        <span className="template-preview__meta-label">
                            Products Included
                        </span>
                        <span className="template-preview__meta-value">
                            {template.productLines.length} Item{template.productLines.length !== 1 ? 's' : ''}
                        </span>
                    </div>
                </div>

                {/* Product Lines Table */}
                <div className="template-preview__section-title">Product Lines</div>
                <div className="template-preview__table-wrap">
                    <table className="template-preview__table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product</th>
                                <th className="right">Qty</th>
                                <th className="right">Unit Price</th>
                                <th className="right">Tax</th>
                                <th className="right">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {template.productLines.map((line, index) => (
                                <tr key={line.id}>
                                    <td>{index + 1}</td>
                                    <td className="product-name">{line.productName}</td>
                                    <td className="right">{line.quantity}</td>
                                    <td className="right">
                                        {formatCurrency(line.unitPrice)}
                                    </td>
                                    <td className="right">{line.taxRate}%</td>
                                    <td className="right subtotal">
                                        {formatCurrency(calcProductLineSubtotal(line))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Financial Summary */}
                <div className="template-preview__financial">
                    <FinancialSummary productLines={template.productLines} />
                </div>

                {/* Footer */}
                {template.createdAt && (
                    <div className="template-preview__footer">
                        <span className="template-preview__footer-text">
                            This is a template preview — no subscription has been created.
                        </span>
                        <span className="template-preview__created-date">
                            Created: {formatDate(template.createdAt)}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default memo(TemplatePreview);
