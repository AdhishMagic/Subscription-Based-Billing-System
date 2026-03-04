import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HiOutlineArrowLeft, HiOutlineCheck, HiOutlineInformationCircle } from 'react-icons/hi2';

import { ROUTES } from '../../routes/routeConfig';
import { mockTaxes } from '../../data/mockTaxes';
import PageHeader from '../../components/layout/PageHeader/PageHeader';
import Button from '../../components/ui/Button/Button';
import Input from '../../components/ui/Input/Input';
import useToast from '../../hooks/useToast';

import styles from './TaxFormPage.module.css';

const TaxFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToast } = useToast();
    const isEditing = Boolean(id);

    const [formData, setFormData] = useState({
        name: '',
        type: 'VAT', // 'Sales Tax', 'VAT', 'Service Tax', 'Custom'
        rate: '',
        appliesTo: 'all', // 'products', 'subscriptions', 'all'
        status: 'active',
        effectiveDate: ''
    });

    useEffect(() => {
        if (isEditing) {
            const tax = mockTaxes.find(t => t.id === id);
            if (tax) {
                setFormData({
                    name: tax.name,
                    type: tax.type,
                    rate: tax.rate.toString(),
                    appliesTo: tax.appliesTo,
                    status: tax.status,
                    effectiveDate: tax.effectiveDate
                });
            } else {
                addToast('error', 'Tax rule not found');
                navigate(ROUTES.TAXES);
            }
        } else {
            // Set default effective date to today
            setFormData(prev => ({
                ...prev,
                effectiveDate: new Date().toISOString().split('T')[0]
            }));
        }
    }, [id, isEditing, addToast, navigate]);

    // ── Handlers ────────────────────────────────────────────────────────────
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox' && name === 'status') {
            setFormData(prev => ({ ...prev, status: checked ? 'active' : 'inactive' }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleTypeChange = (type) => {
        setFormData(prev => ({ ...prev, type }));
    };

    const handleAppliesToChange = (scope) => {
        setFormData(prev => ({ ...prev, appliesTo: scope }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addToast('success', `Tax rule ${isEditing ? 'updated' : 'created'} successfully!`);
        navigate(ROUTES.TAXES);
    };

    // ── Live Preview Logic ──────────────────────────────────────────────────
    const rulePreviewText = useMemo(() => {
        const rateVal = parseFloat(formData.rate) || 0;
        const typeStr = formData.type;
        const appliesStr = formData.appliesTo === 'all'
            ? 'all items'
            : formData.appliesTo === 'products' ? 'products only' : 'subscriptions only';

        const sampleAmount = 1000;
        const calculatedTax = (sampleAmount * (rateVal / 100)).toFixed(2);

        return {
            description: `${rateVal}% ${typeStr} applied to ${appliesStr}.`,
            calculation: `${rateVal}% ${typeStr} on $1,000.00 = $${calculatedTax}`
        };
    }, [formData]);

    // ── Status Badge UI Logic ───────────────────────────────────────────────
    const getSimulatedStatus = () => {
        const now = new Date();
        const effective = formData.effectiveDate ? new Date(formData.effectiveDate) : null;

        if (formData.status === 'inactive') return { label: 'Inactive', variant: 'default' };
        if (effective && effective > now) return { label: 'Scheduled', variant: 'info' };

        return { label: 'Active', variant: 'success' };
    };

    const statusBadge = getSimulatedStatus();

    return (
        <div className={styles.pageContainer}>
            <Button variant="ghost" className={styles.backButton} onClick={() => navigate(-1)}>
                <HiOutlineArrowLeft /> Back
            </Button>

            <PageHeader
                title={isEditing ? 'Edit Tax Rule' : 'Create Tax Rule'}
                description="Configure tax rates and application scope for financial compliance."
                actions={
                    <Button type="button" variant="primary" onClick={handleSubmit}>
                        <HiOutlineCheck /> {isEditing ? 'Save Changes' : 'Create Tax Rule'}
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
                                label="Tax Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g. Standard VAT"
                                required
                            />
                        </div>

                        <div className={styles.typeGrid}>
                            {['Sales Tax', 'VAT', 'Service Tax', 'Custom'].map(type => (
                                <button
                                    key={type}
                                    type="button"
                                    className={`${styles.typeSegment} ${formData.type === type ? styles.activeType : ''}`}
                                    onClick={() => handleTypeChange(type)}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>

                        <div className={styles.grid2}>
                            <Input
                                label="Tax Rate (%)"
                                name="rate"
                                type="number"
                                min="0"
                                step="0.01"
                                value={formData.rate}
                                onChange={handleChange}
                                placeholder="e.g. 10.00"
                                required
                            />
                        </div>
                    </div>

                    {/* Section 2: Application Scope */}
                    <div className={styles.panel}>
                        <h3 className={styles.sectionTitle}>Application Scope</h3>
                        <p className={styles.helpText}>Define what type of items this tax applies to during invoice generation.</p>

                        <div className={styles.scopeGroup}>
                            <label className={`${styles.scopeLabel} ${formData.appliesTo === 'products' ? styles.scopeActive : ''}`}>
                                <input
                                    type="radio"
                                    name="appliesTo"
                                    value="products"
                                    checked={formData.appliesTo === 'products'}
                                    onChange={() => handleAppliesToChange('products')}
                                    className={styles.hiddenRadio}
                                />
                                <div className={styles.customRadio}></div>
                                <span>Applies to Products</span>
                            </label>

                            <label className={`${styles.scopeLabel} ${formData.appliesTo === 'subscriptions' ? styles.scopeActive : ''}`}>
                                <input
                                    type="radio"
                                    name="appliesTo"
                                    value="subscriptions"
                                    checked={formData.appliesTo === 'subscriptions'}
                                    onChange={() => handleAppliesToChange('subscriptions')}
                                    className={styles.hiddenRadio}
                                />
                                <div className={styles.customRadio}></div>
                                <span>Applies to Subscriptions</span>
                            </label>

                            <label className={`${styles.scopeLabel} ${formData.appliesTo === 'all' ? styles.scopeActive : ''}`}>
                                <input
                                    type="radio"
                                    name="appliesTo"
                                    value="all"
                                    checked={formData.appliesTo === 'all'}
                                    onChange={() => handleAppliesToChange('all')}
                                    className={styles.hiddenRadio}
                                />
                                <div className={styles.customRadio}></div>
                                <span>Applies to All Items</span>
                            </label>
                        </div>
                    </div>

                    {/* Section 3: Activation Settings */}
                    <div className={styles.panel}>
                        <h3 className={styles.sectionTitle}>Activation Settings</h3>
                        <div className={styles.activationRow}>
                            <div className={styles.toggleContainer}>
                                <label className={styles.toggleSwitch}>
                                    <input
                                        type="checkbox"
                                        name="status"
                                        checked={formData.status === 'active' || formData.status === 'scheduled'}
                                        onChange={handleChange}
                                    />
                                    <span className={styles.slider}></span>
                                </label>
                                <span className={styles.toggleLabel}>Enable Tax Rule</span>
                            </div>

                            <div className={styles.dateInputWrapper}>
                                <Input
                                    label="Effective Date"
                                    name="effectiveDate"
                                    type="date"
                                    value={formData.effectiveDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <p className={styles.helpText}>If effective date is in the future, the rule will be marked as "Scheduled" until that date arrives.</p>
                    </div>
                </form>

                {/* Sidebar: Logic Preview & Stacking Strategy */}
                <div className={styles.sidebar}>
                    <div className={styles.previewPanel}>
                        <h3 className={styles.previewTitle}>Tax Calculation Preview</h3>
                        <p className={styles.previewSubtitle}>Live preview of how this tax rate impacts line items.</p>

                        <div className={styles.previewCard}>
                            <div className={styles.previewGlow}></div>
                            <p className={styles.previewCalculation}>{rulePreviewText.calculation}</p>
                            <p className={styles.previewDescription}>{rulePreviewText.description}</p>
                        </div>

                        <div className={styles.statusDisplay}>
                            <span className={styles.statusLabel}>Calculated Status:</span>
                            <span className={`${styles.simulatedBadge} ${styles[statusBadge.variant]}`}>
                                {statusBadge.label}
                            </span>
                        </div>
                    </div>

                    <div className={styles.infoPanel}>
                        <div className={styles.infoTitleRow}>
                            <HiOutlineInformationCircle className={styles.infoIcon} />
                            <h3 className={styles.previewTitle}>Multi-Tax Stacking</h3>
                        </div>
                        <p className={styles.previewSubtitle}>
                            When multiple taxes apply to the same item, they are calculated based on the subtotal <strong>before</strong> other taxes are applied (additive stacking).
                        </p>
                        <div className={styles.exampleBox}>
                            <p><strong>Example:</strong> $100 Item with 10% VAT and 5% Local Tax</p>
                            <ul>
                                <li>VAT (10%): $10</li>
                                <li>Local Tax (5%): $5</li>
                                <li><strong>Total Tax: $15</strong> (not compounded)</li>
                                <li><strong>Final Total: $115</strong></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaxFormPage;
