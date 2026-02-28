/* ==========================================================================
   VARIANT MANAGER
   Dynamic variant rows inside the product modal.
   Supports add/remove, collapsible section, and attribute-based pricing.

   Architecture:
   - Receives variants array + onChange callback from parent form.
   - Self-manages expand/collapse state.
   - Each variant row is its own sub-component for isolation.
   ========================================================================== */

import { useState, useCallback, memo } from 'react';
import {
    HiOutlinePlus,
    HiOutlineTrash,
    HiChevronDown,
    HiChevronRight,
    HiOutlineTag,
} from 'react-icons/hi2';
import { generateId } from '../../../data/productsMockData';
import './VariantManager.css';

const EMPTY_VARIANT = {
    attribute: '',
    value: '',
    extraPrice: 0,
};

const VariantRow = memo(({ variant, index, onChange, onRemove }) => {
    const handleFieldChange = useCallback(
        (field) => (e) => {
            const val = field === 'extraPrice' ? Number(e.target.value) || 0 : e.target.value;
            onChange(index, { ...variant, [field]: val });
        },
        [index, variant, onChange]
    );

    return (
        <div className="variant-row" id={`variant-row-${index}`}>
            <div className="variant-row__fields">
                <div className="variant-row__field">
                    <label className="variant-row__label">Attribute</label>
                    <input
                        type="text"
                        className="variant-row__input"
                        placeholder="e.g. Brand, Plan, Size"
                        value={variant.attribute}
                        onChange={handleFieldChange('attribute')}
                    />
                </div>
                <div className="variant-row__field">
                    <label className="variant-row__label">Value</label>
                    <input
                        type="text"
                        className="variant-row__input"
                        placeholder="e.g. Odoo, Enterprise"
                        value={variant.value}
                        onChange={handleFieldChange('value')}
                    />
                </div>
                <div className="variant-row__field variant-row__field--price">
                    <label className="variant-row__label">Extra Price</label>
                    <div className="variant-row__price-wrapper">
                        <span className="variant-row__currency">$</span>
                        <input
                            type="number"
                            className="variant-row__input variant-row__input--price"
                            placeholder="0.00"
                            value={variant.extraPrice || ''}
                            onChange={handleFieldChange('extraPrice')}
                            min="0"
                            step="0.01"
                        />
                    </div>
                </div>
            </div>
            <button
                type="button"
                className="variant-row__remove-btn"
                onClick={() => onRemove(index)}
                aria-label={`Remove variant ${index + 1}`}
                title="Remove variant"
            >
                <HiOutlineTrash size={16} />
            </button>
        </div>
    );
});

VariantRow.displayName = 'VariantRow';

const VariantManager = ({ variants = [], onChange }) => {
    const [isExpanded, setIsExpanded] = useState(variants.length > 0);

    const handleToggle = useCallback(() => {
        setIsExpanded((prev) => !prev);
    }, []);

    const handleAddVariant = useCallback(() => {
        const newVariant = { ...EMPTY_VARIANT, id: generateId() };
        onChange([...variants, newVariant]);
        setIsExpanded(true);
    }, [variants, onChange]);

    const handleVariantChange = useCallback(
        (index, updatedVariant) => {
            const updated = variants.map((v, i) => (i === index ? updatedVariant : v));
            onChange(updated);
        },
        [variants, onChange]
    );

    const handleRemoveVariant = useCallback(
        (index) => {
            const updated = variants.filter((_, i) => i !== index);
            onChange(updated);
        },
        [variants, onChange]
    );

    return (
        <div className="variant-manager" id="variant-manager">
            {/* ── Header (collapsible) ────────────────── */}
            <button
                type="button"
                className="variant-manager__header"
                onClick={handleToggle}
                aria-expanded={isExpanded}
            >
                <div className="variant-manager__header-left">
                    {isExpanded ? (
                        <HiChevronDown className="variant-manager__chevron" />
                    ) : (
                        <HiChevronRight className="variant-manager__chevron" />
                    )}
                    <HiOutlineTag className="variant-manager__icon" />
                    <span className="variant-manager__title">
                        Variants
                        {variants.length > 0 && (
                            <span className="variant-manager__count">{variants.length}</span>
                        )}
                    </span>
                </div>
                <span className="variant-manager__hint">
                    Attribute-based pricing customization
                </span>
            </button>

            {/* ── Body (collapsible content) ──────────── */}
            <div
                className={`variant-manager__body ${isExpanded ? 'variant-manager__body--open' : ''
                    }`}
            >
                <div className="variant-manager__content">
                    {variants.length === 0 ? (
                        <div className="variant-manager__empty">
                            <p className="variant-manager__empty-text">
                                No variants yet. Add variants to offer attribute-based pricing options.
                            </p>
                        </div>
                    ) : (
                        <div className="variant-manager__list">
                            {variants.map((variant, index) => (
                                <VariantRow
                                    key={variant.id || index}
                                    variant={variant}
                                    index={index}
                                    onChange={handleVariantChange}
                                    onRemove={handleRemoveVariant}
                                />
                            ))}
                        </div>
                    )}

                    <button
                        type="button"
                        className="variant-manager__add-btn"
                        onClick={handleAddVariant}
                        id="add-variant-btn"
                    >
                        <HiOutlinePlus size={16} />
                        Add Variant
                    </button>
                </div>
            </div>
        </div>
    );
};

export default memo(VariantManager);
