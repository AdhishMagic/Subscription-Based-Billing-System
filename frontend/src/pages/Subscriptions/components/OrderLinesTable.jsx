/* ==========================================================================
   ORDER LINES TABLE — DYNAMIC
   Inline-editable table for subscription order lines.
   Features:
   - Add/remove product rows
   - Product dropdown selection
   - Quantity, unit price, tax rate inputs
   - Auto-calculated line amounts
   - Subtotal, tax breakdown, and grand total
   ========================================================================== */

import { memo, useCallback } from 'react';
import { HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi2';
import { AVAILABLE_PRODUCTS, generateLineId, calcLineSubtotal, calcLineTax, calcOrderTotals } from '../../../data/subscriptionsMockData';
import './OrderLinesTable.css';

const OrderLinesTable = ({ orderLines, onChange, readOnly = false }) => {
    const totals = calcOrderTotals(orderLines);

    const handleAddLine = useCallback(() => {
        const newLine = {
            id: generateLineId(),
            productId: '',
            productName: '',
            quantity: 1,
            unitPrice: 0,
            taxRate: 18,
        };
        onChange([...orderLines, newLine]);
    }, [orderLines, onChange]);

    const handleRemoveLine = useCallback(
        (lineId) => {
            onChange(orderLines.filter((l) => l.id !== lineId));
        },
        [orderLines, onChange]
    );

    const handleLineChange = useCallback(
        (lineId, field, value) => {
            onChange(
                orderLines.map((line) => {
                    if (line.id !== lineId) return line;

                    if (field === 'productId') {
                        const product = AVAILABLE_PRODUCTS.find((p) => p.id === value);
                        return {
                            ...line,
                            productId: value,
                            productName: product ? product.name : '',
                            unitPrice: product ? product.unitPrice : 0,
                        };
                    }

                    return {
                        ...line,
                        [field]: field === 'quantity' || field === 'unitPrice' || field === 'taxRate'
                            ? Number(value) || 0
                            : value,
                    };
                })
            );
        },
        [orderLines, onChange]
    );

    const formatCurrency = (val) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

    return (
        <div className="order-lines">
            {/* ── Header ────────────────────────────────────────────────────── */}
            <div className="order-lines__header">
                <h3 className="order-lines__title">Order Lines</h3>
                {!readOnly && (
                    <button
                        type="button"
                        className="order-lines__add-btn"
                        onClick={handleAddLine}
                    >
                        <HiOutlinePlus />
                        Add Product
                    </button>
                )}
            </div>

            {/* ── Table ─────────────────────────────────────────────────────── */}
            <div className="order-lines__table-wrap">
                <table className="order-lines__table">
                    <thead>
                        <tr>
                            <th className="order-lines__th order-lines__th--product">Product</th>
                            <th className="order-lines__th order-lines__th--qty">Qty</th>
                            <th className="order-lines__th order-lines__th--price">Unit Price</th>
                            <th className="order-lines__th order-lines__th--tax">Tax %</th>
                            <th className="order-lines__th order-lines__th--tax-amt">Tax Amt</th>
                            <th className="order-lines__th order-lines__th--amount">Amount</th>
                            {!readOnly && <th className="order-lines__th order-lines__th--action" />}
                        </tr>
                    </thead>
                    <tbody>
                        {orderLines.length === 0 ? (
                            <tr>
                                <td colSpan={readOnly ? 6 : 7} className="order-lines__empty">
                                    No order lines. {!readOnly && 'Click "Add Product" to begin.'}
                                </td>
                            </tr>
                        ) : (
                            orderLines.map((line) => (
                                <tr key={line.id} className="order-lines__row">
                                    {/* Product */}
                                    <td className="order-lines__td order-lines__td--product">
                                        {readOnly ? (
                                            <span className="order-lines__product-name">{line.productName}</span>
                                        ) : (
                                            <select
                                                className="order-lines__select"
                                                value={line.productId}
                                                onChange={(e) =>
                                                    handleLineChange(line.id, 'productId', e.target.value)
                                                }
                                            >
                                                <option value="">Select product...</option>
                                                {AVAILABLE_PRODUCTS.map((p) => (
                                                    <option key={p.id} value={p.id}>
                                                        {p.name}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    </td>

                                    {/* Quantity */}
                                    <td className="order-lines__td order-lines__td--qty">
                                        {readOnly ? (
                                            <span>{line.quantity}</span>
                                        ) : (
                                            <input
                                                type="number"
                                                className="order-lines__input order-lines__input--sm"
                                                min="1"
                                                value={line.quantity}
                                                onChange={(e) =>
                                                    handleLineChange(line.id, 'quantity', e.target.value)
                                                }
                                            />
                                        )}
                                    </td>

                                    {/* Unit Price */}
                                    <td className="order-lines__td order-lines__td--price">
                                        {readOnly ? (
                                            <span>{formatCurrency(line.unitPrice)}</span>
                                        ) : (
                                            <input
                                                type="number"
                                                className="order-lines__input"
                                                min="0"
                                                step="0.01"
                                                value={line.unitPrice}
                                                onChange={(e) =>
                                                    handleLineChange(line.id, 'unitPrice', e.target.value)
                                                }
                                            />
                                        )}
                                    </td>

                                    {/* Tax Rate */}
                                    <td className="order-lines__td order-lines__td--tax">
                                        {readOnly ? (
                                            <span>{line.taxRate}%</span>
                                        ) : (
                                            <input
                                                type="number"
                                                className="order-lines__input order-lines__input--sm"
                                                min="0"
                                                max="100"
                                                value={line.taxRate}
                                                onChange={(e) =>
                                                    handleLineChange(line.id, 'taxRate', e.target.value)
                                                }
                                            />
                                        )}
                                    </td>

                                    {/* Tax Amount (computed) */}
                                    <td className="order-lines__td order-lines__td--tax-amt">
                                        <span className="order-lines__computed">
                                            {formatCurrency(calcLineTax(line))}
                                        </span>
                                    </td>

                                    {/* Line Total (computed) */}
                                    <td className="order-lines__td order-lines__td--amount">
                                        <span className="order-lines__total">
                                            {formatCurrency(calcLineSubtotal(line) + calcLineTax(line))}
                                        </span>
                                    </td>

                                    {/* Remove */}
                                    {!readOnly && (
                                        <td className="order-lines__td order-lines__td--action">
                                            <button
                                                type="button"
                                                className="order-lines__remove-btn"
                                                onClick={() => handleRemoveLine(line.id)}
                                                title="Remove line"
                                            >
                                                <HiOutlineTrash />
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* ── Financial Summary ─────────────────────────────────────────── */}
            {orderLines.length > 0 && (
                <div className="order-lines__summary">
                    <div className="order-lines__summary-row">
                        <span className="order-lines__summary-label">Subtotal</span>
                        <span className="order-lines__summary-value">{formatCurrency(totals.subtotal)}</span>
                    </div>
                    {Object.entries(totals.taxBreakdown).map(([rate, amount]) => (
                        <div key={rate} className="order-lines__summary-row order-lines__summary-row--tax">
                            <span className="order-lines__summary-label">Tax ({rate})</span>
                            <span className="order-lines__summary-value">{formatCurrency(amount)}</span>
                        </div>
                    ))}
                    <div className="order-lines__summary-row order-lines__summary-row--total">
                        <span className="order-lines__summary-label">Total Tax</span>
                        <span className="order-lines__summary-value">{formatCurrency(totals.totalTax)}</span>
                    </div>
                    <div className="order-lines__summary-row order-lines__summary-row--grand">
                        <span className="order-lines__summary-label">Grand Total</span>
                        <span className="order-lines__summary-value order-lines__grand-total">
                            {formatCurrency(totals.grandTotal)}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default memo(OrderLinesTable);
