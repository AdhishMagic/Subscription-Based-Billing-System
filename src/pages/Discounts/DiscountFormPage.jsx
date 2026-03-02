import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HiOutlineArrowLeft, HiOutlineCheck } from 'react-icons/hi2';

import { ROUTES } from '../../routes/routeConfig';
import { mockDiscounts } from '../../data/mockDiscounts';
import PageHeader from '../../components/layout/PageHeader/PageHeader';
import Button from '../../components/ui/Button/Button';
import Input from '../../components/ui/Input/Input';
import { useToast } from '../../context/ToastContext';

import styles from './DiscountFormPage.module.css';

const DiscountFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToast } = useToast();
    const isEditing = Boolean(id);

    const [formData, setFormData] = useState({
        name: '',
        type: 'percentage', // 'percentage' | 'fixed'
        value: '',
        minPurchaseAmount: '',
        minQuantity: '',
        startDate: '',
        endDate: '',
        usageLimit: '',
        appliesTo: ['products', 'subscriptions'] // arrays of applied types
    });

    useEffect(() => {
        if (isEditing) {
            const discount = mockDiscounts.find(d => d.id === id);
            if (discount) {
                setFormData({
                    name: discount.name,
                    type: discount.type,
                    value: discount.value.toString(),
                    minPurchaseAmount: discount.minPurchaseAmount.toString(),
                    minQuantity: discount.minQuantity.toString(),
                    startDate: discount.startDate.substring(0, 10), // Assuming YYYY-MM-DD
                    endDate: discount.endDate.substring(0, 10),
                    usageLimit: discount.usageLimit ? discount.usageLimit.toString() : '',
                    appliesTo: discount.appliesTo || [],
                });
            } else {
                addToast('error', 'Discount not found');
                navigate(ROUTES.DISCOUNTS);
            }
        }
    }, [id, isEditing, addToast, navigate]);

    // ── Handlers ────────────────────────────────────────────────────────────
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (value) => {
        setFormData(prev => {
            const current = [...prev.appliesTo];
            if (current.includes(value)) {
                return { ...prev, appliesTo: current.filter(item => item !== value) };
            } else {
                return { ...prev, appliesTo: [...current, value] };
            }
        });
    };

    const handleTypeChange = (type) => {
        setFormData(prev => ({ ...prev, type }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.appliesTo.length === 0) {
            addToast('error', 'You must select at least one application target.');
            return;
        }

        addToast('success', `Discount ${isEditing ? 'updated' : 'created'} successfully!`);
        navigate(ROUTES.DISCOUNTS);
    };

    // ── Live Preview Logic ──────────────────────────────────────────────────
    const rulePreviewText = useMemo(() => {
        const typeText = formData.type === 'percentage'
            ? `${formData.value || '0'}% discount`
            : `$${formData.value || '0'} discount`;

        let appliesText = 'all items';
        if (formData.appliesTo.length === 1) {
            appliesText = formData.appliesTo[0] === 'products' ? 'Products' : 'Subscriptions';
        } else if (formData.appliesTo.length === 2) {
            appliesText = 'Products and Subscriptions';
        }

        const conditionsList = [];
        if (formData.minPurchaseAmount && parseFloat(formData.minPurchaseAmount) > 0) {
            conditionsList.push(`purchase exceeds $${formData.minPurchaseAmount}`);
        }
        if (formData.minQuantity && parseInt(formData.minQuantity, 10) > 0) {
            conditionsList.push(`cart contains at least ${formData.minQuantity} items`);
        }

        const conditionText = conditionsList.length > 0
            ? ` if ${conditionsList.join(' and ')}`
            : '';

        let limitText = '';
        if (formData.usageLimit && parseInt(formData.usageLimit, 10) > 0) {
            limitText = ` (Limited to first ${formData.usageLimit} uses)`;
        }

        let validityText = '';
        if (formData.startDate && formData.endDate) {
            validityText = `. Valid from ${formData.startDate} to ${formData.endDate}`;
        }

        return `${typeText} applied to ${appliesText}${conditionText}${validityText}${limitText}.`;
    }, [formData]);

    // ── Status Badge UI Logic ───────────────────────────────────────────────
    // This logic simulates how the status would be calculated based on input dates and usage limits.
    const getSimulatedStatus = () => {
        const now = new Date();
        const start = formData.startDate ? new Date(formData.startDate) : null;
        const end = formData.endDate ? new Date(formData.endDate) : null;

        // "Mock" usage count based on limit for existing elements
        let usageCnt = 0;
        if (isEditing) {
            const disc = mockDiscounts.find(d => d.id === id);
            if (disc) usageCnt = disc.usageCount;
        }

        if (end && end < now) return { label: 'Expired', variant: 'default' };
        if (formData.usageLimit && usageCnt >= parseInt(formData.usageLimit, 10)) return { label: 'Limit Reached', variant: 'warning' };
        if (start && start > now) return { label: 'Scheduled', variant: 'info' };

        return { label: 'Active (Simulated)', variant: 'success' };
    };

    const statusBadge = getSimulatedStatus();

    return (
        <div className={styles.pageContainer}>
            <Button variant="ghost" className={styles.backButton} onClick={() => navigate(-1)}>
                <HiOutlineArrowLeft /> Back
            </Button>

            <PageHeader
                title={isEditing ? 'Edit Discount' : 'Create Discount'}
                description="Configure rules and conditions for your discount engine."
                actions={
                    <Button type="button" variant="primary" onClick={handleSubmit}>
                        <HiOutlineCheck /> {isEditing ? 'Save Changes' : 'Create Discount'}
                    </Button>
                }
            />

            <div className={styles.contentGrid}>
                {/* Form Elements */}
                <form className={styles.formContainer} onSubmit={handleSubmit}>

                    {/* Section 1: Basic Info */}
                    <div className={styles.panel}>
                        <h3 className={styles.sectionTitle}>Basic Info</h3>
                        <div className={styles.grid2}>
                            <Input
                                label="Discount Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g. Spring Promo 2025"
                                required
                            />
                        </div>

                        <div className={styles.segmentedControl}>
                            <button
                                type="button"
                                className={`${styles.segment} ${formData.type === 'percentage' ? styles.activeSegment : ''}`}
                                onClick={() => handleTypeChange('percentage')}
                            >
                                Percentage (%)
                            </button>
                            <button
                                type="button"
                                className={`${styles.segment} ${formData.type === 'fixed' ? styles.activeSegment : ''}`}
                                onClick={() => handleTypeChange('fixed')}
                            >
                                Fixed Amount ($)
                            </button>
                        </div>

                        <div className={styles.grid2}>
                            <Input
                                label={formData.type === 'percentage' ? 'Percentage Value' : 'Discount Amount'}
                                name="value"
                                type="number"
                                min="0"
                                step={formData.type === 'percentage' ? '1' : '0.01'}
                                value={formData.value}
                                onChange={handleChange}
                                placeholder={formData.type === 'percentage' ? '15' : '50.00'}
                                required
                            />
                        </div>
                    </div>

                    {/* Section 2: Conditions */}
                    <div className={styles.panel}>
                        <h3 className={styles.sectionTitle}>Conditions</h3>
                        <div className={styles.grid3}>
                            <Input
                                label="Minimum Purchase ($)"
                                name="minPurchaseAmount"
                                type="number"
                                min="0"
                                value={formData.minPurchaseAmount}
                                onChange={handleChange}
                                placeholder="0.00"
                            />
                            <Input
                                label="Minimum Quantity"
                                name="minQuantity"
                                type="number"
                                min="0"
                                value={formData.minQuantity}
                                onChange={handleChange}
                                placeholder="0"
                            />
                            <Input
                                label="Usage Limit"
                                name="usageLimit"
                                type="number"
                                min="1"
                                value={formData.usageLimit}
                                onChange={handleChange}
                                placeholder="Unlimited"
                            />
                        </div>
                    </div>

                    {/* Section 3: Validity */}
                    <div className={styles.panel}>
                        <h3 className={styles.sectionTitle}>Validity</h3>
                        <div className={styles.grid2}>
                            <Input
                                label="Start Date"
                                name="startDate"
                                type="date"
                                value={formData.startDate}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                label="End Date"
                                name="endDate"
                                type="date"
                                value={formData.endDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Section 4: Applies To */}
                    <div className={styles.panel}>
                        <h3 className={styles.sectionTitle}>Applies To</h3>
                        <div className={styles.checkboxGroup}>
                            <label className={`${styles.checkboxLabel} ${formData.appliesTo.includes('products') ? styles.checkboxActive : ''}`}>
                                <input
                                    type="checkbox"
                                    value="products"
                                    checked={formData.appliesTo.includes('products')}
                                    onChange={() => handleCheckboxChange('products')}
                                    className={styles.hiddenCheckbox}
                                />
                                <div className={styles.customCheckbox}></div>
                                <span>Products</span>
                            </label>

                            <label className={`${styles.checkboxLabel} ${formData.appliesTo.includes('subscriptions') ? styles.checkboxActive : ''}`}>
                                <input
                                    type="checkbox"
                                    value="subscriptions"
                                    checked={formData.appliesTo.includes('subscriptions')}
                                    onChange={() => handleCheckboxChange('subscriptions')}
                                    className={styles.hiddenCheckbox}
                                />
                                <div className={styles.customCheckbox}></div>
                                <span>Subscriptions</span>
                            </label>
                        </div>
                        {formData.appliesTo.length === 0 && (
                            <p className={styles.errorText}>Please select at least one application target.</p>
                        )}
                    </div>
                </form>

                {/* Sidebar: Logic Preview */}
                <div className={styles.sidebar}>
                    <div className={styles.previewPanel}>
                        <h3 className={styles.previewTitle}>Rule Engine Preview</h3>
                        <p className={styles.previewSubtitle}>How this discount will be calculated in invoices & checkouts.</p>

                        <div className={styles.previewCard}>
                            <div className={styles.previewGlow}></div>
                            <p className={styles.previewText}>{rulePreviewText}</p>
                        </div>

                        <div className={styles.statusDisplay}>
                            <span className={styles.statusLabel}>Current Simulated Status:</span>
                            <span className={`${styles.simulatedBadge} ${styles[statusBadge.variant]}`}>
                                {statusBadge.label}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiscountFormPage;
