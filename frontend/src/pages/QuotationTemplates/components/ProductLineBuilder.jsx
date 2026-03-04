/* ==========================================================================
   PRODUCT LINE BUILDER
   Dynamic inline-editable table for template product lines.

   Features:
   - Add/remove product rows
   - Product dropdown selection (auto-fills unit price)
   - Quantity, unit price (editable override), tax selector
   - Auto-calculated subtotal per line (UI only)
   ========================================================================== */

import { memo, useCallback } from 'react';
import { HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi2';
import {
    AVAILABLE_PRODUCTS,
    TAX_RATE_OPTIONS,
    generateProductLineId,
    calcProductLineSubtotal,
} from '../../../data/templatesMockData';
import './ProductLineBuilder.css';

const ProductLineBuilder = ({ productLines, onChange, readOnly = false }) => {
    // ── Add new line ──────────────────────────────────────────────────────
    const handleAddLine = useCallback(() => {
        const newLine = {
            id: generateProductLineId(),
            productId: '',
            productName: '',
            quantity: 1,
            unitPrice: 0,
            taxRate: 18,
        };
        onChange([...productLines, newLine]);
    }, [productLines, onChange]);

    // ── Remove line ───────────────────────────────────────────────────────
    const handleRemoveLine = useCallback(
        (lineId) => {
            onChange(productLines.filter((l) => l.id !== lineId));
        },
        [productLines, onChange]
    );

    // ── Field change ──────────────────────────────────────────────────────
    const handleLineChange = useCallback(
        (lineId, field, value) => {
            onChange(
                productLines.map((line) => {
                    if (line.id !== lineId) return line;

                    // Product selection auto-fills price
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
                        [field]:
                            field === 'quantity' || field === 'unitPrice' || field === 'taxRate'
                                ? Number(value) || 0
                                : value,
                    };
                })
            );
        },
        [productLines, onChange]
    );

    const formatCurrency = (val) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

    return (
        <div className="product-builder" id="product-line-builder">
            {/* ── Header ────────────────────────────────────────────────── */}
            <div className="product-builder__header">
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                    <h3 className="product-builder__title">Product Lines</h3>
                    <span className="product-builder__count">
                        ({productLines.length} item{productLines.length !== 1 ? 's' : ''})
                    </span>
                </div>
                {!readOnly && (
                    <button
                        type="button"
                        className="product-builder__add-btn"
                        onClick={handleAddLine}
                    >
                        <HiOutlinePlus />
                        Add Product
                    </button>
                )}
            </div>

            {/* ── Table ─────────────────────────────────────────────────── */}
            <div className="product-builder__table-wrap">
                <table className="product-builder__table">
                    <thead>
                        <tr>
                            <th className="product-builder__th product-builder__th--product">
                                Product
                            </th>
                            <th className="product-builder__th product-builder__th--qty">Qty</th>
                            <th className="product-builder__th product-builder__th--price">
                                Unit Price
                            </th>
                            <th className="product-builder__th product-builder__th--tax">Tax</th>
                            <th className="product-builder__th product-builder__th--subtotal">
                                Subtotal
                            </th>
                            {!readOnly && (
                                <th className="product-builder__th product-builder__th--action" />
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {productLines.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={readOnly ? 5 : 6}
                                    className="product-builder__empty"
                                >
                                    No product lines.{' '}
                                    {!readOnly && 'Click "Add Product" to begin.'}
                                </td>
                            </tr>
                        ) : (
                            productLines.map((line) => (
                                <tr key={line.id} className="product-builder__row">
                                    {/* Product */}
                                    <td className="product-builder__td product-builder__td--product">
                                        {readOnly ? (
                                            <span style={{ fontWeight: 'var(--font-medium)', color: 'var(--color-text-primary)' }}>
                                                {line.productName}
                                            </span>
                                        ) : (
                                            <select
                                                className="product-builder__select"
                                                value={line.productId}
                                                onChange={(e) =>
                                                    handleLineChange(
                                                        line.id,
                                                        'productId',
                                                        e.target.value
                                                    )
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
                                    <td className="product-builder__td product-builder__td--qty">
                                        {readOnly ? (
                                            <span>{line.quantity}</span>
                                        ) : (
                                            <input
                                                type="number"
                                                className="product-builder__input product-builder__input--sm"
                                                min="1"
                                                value={line.quantity}
                                                onChange={(e) =>
                                                    handleLineChange(
                                                        line.id,
                                                        'quantity',
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        )}
                                    </td>

                                    {/* Unit Price */}
                                    <td className="product-builder__td product-builder__td--price">
                                        {readOnly ? (
                                            <span>{formatCurrency(line.unitPrice)}</span>
                                        ) : (
                                            <input
                                                type="number"
                                                className="product-builder__input product-builder__input--md"
                                                min="0"
                                                step="0.01"
                                                value={line.unitPrice}
                                                onChange={(e) =>
                                                    handleLineChange(
                                                        line.id,
                                                        'unitPrice',
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        )}
                                    </td>

                                    {/* Tax */}
                                    <td className="product-builder__td product-builder__td--tax">
                                        {readOnly ? (
                                            <span>{line.taxRate}%</span>
                                        ) : (
                                            <select
                                                className="product-builder__select product-builder__tax-select"
                                                value={line.taxRate}
                                                onChange={(e) =>
                                                    handleLineChange(
                                                        line.id,
                                                        'taxRate',
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                {TAX_RATE_OPTIONS.map((t) => (
                                                    <option key={t.value} value={t.value}>
                                                        {t.label}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    </td>

                                    {/* Subtotal (computed) */}
                                    <td className="product-builder__td product-builder__td--subtotal">
                                        <span className="product-builder__subtotal">
                                            {formatCurrency(calcProductLineSubtotal(line))}
                                        </span>
                                    </td>

                                    {/* Remove */}
                                    {!readOnly && (
                                        <td className="product-builder__td">
                                            <button
                                                type="button"
                                                className="product-builder__remove-btn"
                                                onClick={() => handleRemoveLine(line.id)}
                                                title="Remove product line"
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
        </div>
    );
};

export default memo(ProductLineBuilder);
