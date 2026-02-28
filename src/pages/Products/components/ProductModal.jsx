/* ==========================================================================
   PRODUCT MODAL
   Create / Edit product form modal.
   Uses local form state with full validation.
   Contains the VariantManager as a nested sub-component.

   Architecture:
   - Standalone modal (does NOT use global ModalContext).
   - Manages its own form state for isolation.
   - Receives onSave callback to push data up.
   - Product data is passed via `product` prop (null = create mode).
   ========================================================================== */

import { useState, useEffect, useCallback, memo } from 'react';
import { HiXMark } from 'react-icons/hi2';
import { PRODUCT_TYPES } from '../../../data/productsMockData';
import VariantManager from './VariantManager';
import './ProductModal.css';

const getInitialFormData = (product) => ({
    name: product?.name || '',
    type: product?.type || 'saas',
    salesPrice: product?.salesPrice ?? '',
    costPrice: product?.costPrice ?? '',
    isRecurring: product?.isRecurring ?? false,
    variants: product?.variants ? [...product.variants] : [],
});

const validateForm = (data) => {
    const errors = {};
    if (!data.name.trim()) errors.name = 'Product name is required.';
    if (data.name.trim().length > 100) errors.name = 'Name must be under 100 characters.';
    if (!data.type) errors.type = 'Product type is required.';
    if (data.salesPrice === '' || data.salesPrice < 0) errors.salesPrice = 'Valid sales price is required.';
    if (data.costPrice === '' || data.costPrice < 0) errors.costPrice = 'Valid cost price is required.';
    if (Number(data.costPrice) > Number(data.salesPrice)) {
        errors.costPrice = 'Cost price cannot exceed sales price.';
    }
    // Validate variants
    data.variants.forEach((v, i) => {
        if (v.attribute || v.value || v.extraPrice) {
            if (!v.attribute.trim()) errors[`variant_${i}_attribute`] = 'Required';
            if (!v.value.trim()) errors[`variant_${i}_value`] = 'Required';
        }
    });
    return errors;
};

const ProductModal = ({ isOpen, product, onSave, onClose }) => {
    const [formData, setFormData] = useState(getInitialFormData(product));
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const isEditMode = !!product;

    // Reset form when product changes or modal opens
    useEffect(() => {
        if (isOpen) {
            setFormData(getInitialFormData(product));
            setErrors({});
            setTouched({});
        }
    }, [isOpen, product]);

    // Lock body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    const handleChange = useCallback((e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;
        setFormData((prev) => ({ ...prev, [name]: fieldValue }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    }, []);

    const handlePriceChange = useCallback((name) => (e) => {
        const value = e.target.value;
        setFormData((prev) => ({ ...prev, [name]: value === '' ? '' : Number(value) }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    }, []);

    const handleBlur = useCallback((e) => {
        const { name } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
    }, []);

    const handleVariantsChange = useCallback((variants) => {
        setFormData((prev) => ({ ...prev, variants }));
    }, []);

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            const validationErrors = validateForm(formData);
            setErrors(validationErrors);

            // Mark all as touched
            const allTouched = Object.keys(formData).reduce(
                (acc, key) => ({ ...acc, [key]: true }),
                {}
            );
            setTouched(allTouched);

            if (Object.keys(validationErrors).length > 0) return;

            // Clean empty variants
            const cleanedData = {
                ...formData,
                salesPrice: Number(formData.salesPrice),
                costPrice: Number(formData.costPrice),
                variants: formData.variants.filter(
                    (v) => v.attribute.trim() && v.value.trim()
                ),
            };

            onSave(cleanedData);
        },
        [formData, onSave]
    );

    if (!isOpen) return null;

    return (
        <div className="product-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
            <div
                className="product-modal"
                onClick={(e) => e.stopPropagation()}
                id="product-modal"
            >
                {/* ── Header ──────────────────────────────── */}
                <div className="product-modal__header">
                    <h2 className="product-modal__title">
                        {isEditMode ? 'Edit Product' : 'Create Product'}
                    </h2>
                    <button
                        className="product-modal__close"
                        onClick={onClose}
                        aria-label="Close modal"
                        type="button"
                    >
                        <HiXMark size={20} />
                    </button>
                </div>

                {/* ── Body (Form) ─────────────────────────── */}
                <form className="product-modal__body" onSubmit={handleSubmit} noValidate>
                    {/* Product Name */}
                    <div className="product-modal__field">
                        <label className="product-modal__label" htmlFor="product-name">
                            Product Name <span className="product-modal__required">*</span>
                        </label>
                        <input
                            id="product-name"
                            name="name"
                            type="text"
                            className={`product-modal__input ${errors.name && touched.name ? 'product-modal__input--error' : ''
                                }`}
                            placeholder="Enter product name"
                            value={formData.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoFocus
                        />
                        {errors.name && touched.name && (
                            <span className="product-modal__error">{errors.name}</span>
                        )}
                    </div>

                    {/* Product Type */}
                    <div className="product-modal__field">
                        <label className="product-modal__label" htmlFor="product-type">
                            Product Type <span className="product-modal__required">*</span>
                        </label>
                        <select
                            id="product-type"
                            name="type"
                            className={`product-modal__select ${errors.type && touched.type ? 'product-modal__input--error' : ''
                                }`}
                            value={formData.type}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
                            {PRODUCT_TYPES.map((t) => (
                                <option key={t.value} value={t.value}>
                                    {t.label}
                                </option>
                            ))}
                        </select>
                        {errors.type && touched.type && (
                            <span className="product-modal__error">{errors.type}</span>
                        )}
                    </div>

                    {/* Price Row */}
                    <div className="product-modal__row">
                        <div className="product-modal__field">
                            <label className="product-modal__label" htmlFor="sales-price">
                                Sales Price <span className="product-modal__required">*</span>
                            </label>
                            <div className="product-modal__price-wrapper">
                                <span className="product-modal__currency">$</span>
                                <input
                                    id="sales-price"
                                    name="salesPrice"
                                    type="number"
                                    className={`product-modal__input product-modal__input--price ${errors.salesPrice && touched.salesPrice
                                            ? 'product-modal__input--error'
                                            : ''
                                        }`}
                                    placeholder="0.00"
                                    value={formData.salesPrice}
                                    onChange={handlePriceChange('salesPrice')}
                                    onBlur={handleBlur}
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                            {errors.salesPrice && touched.salesPrice && (
                                <span className="product-modal__error">{errors.salesPrice}</span>
                            )}
                        </div>
                        <div className="product-modal__field">
                            <label className="product-modal__label" htmlFor="cost-price">
                                Cost Price <span className="product-modal__required">*</span>
                            </label>
                            <div className="product-modal__price-wrapper">
                                <span className="product-modal__currency">$</span>
                                <input
                                    id="cost-price"
                                    name="costPrice"
                                    type="number"
                                    className={`product-modal__input product-modal__input--price ${errors.costPrice && touched.costPrice
                                            ? 'product-modal__input--error'
                                            : ''
                                        }`}
                                    placeholder="0.00"
                                    value={formData.costPrice}
                                    onChange={handlePriceChange('costPrice')}
                                    onBlur={handleBlur}
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                            {errors.costPrice && touched.costPrice && (
                                <span className="product-modal__error">{errors.costPrice}</span>
                            )}
                        </div>
                    </div>

                    {/* Recurring Toggle */}
                    <div className="product-modal__field">
                        <div className="product-modal__toggle-wrapper">
                            <label className="product-modal__toggle" htmlFor="is-recurring">
                                <input
                                    id="is-recurring"
                                    name="isRecurring"
                                    type="checkbox"
                                    className="product-modal__toggle-input"
                                    checked={formData.isRecurring}
                                    onChange={handleChange}
                                />
                                <span className="product-modal__toggle-track">
                                    <span className="product-modal__toggle-thumb" />
                                </span>
                                <span className="product-modal__toggle-label">
                                    Recurring billing
                                </span>
                            </label>
                            <span className="product-modal__toggle-hint">
                                Enable for subscription-based products
                            </span>
                        </div>
                    </div>

                    {/* Variant Manager */}
                    <VariantManager
                        variants={formData.variants}
                        onChange={handleVariantsChange}
                    />

                    {/* ── Footer ──────────────────────────────── */}
                    <div className="product-modal__footer">
                        <button
                            type="button"
                            className="btn btn--ghost btn--md"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="btn btn--secondary btn--md" id="product-save-btn">
                            {isEditMode ? 'Save Changes' : 'Create Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default memo(ProductModal);
