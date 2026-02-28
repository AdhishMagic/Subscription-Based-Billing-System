/* ==========================================================================
   PLAN FORM PAGE
   Full page form for creating and editing recurring plans.
   ========================================================================== */

import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HiArrowLeft, HiOutlineCheck } from 'react-icons/hi2';
import usePlans from '../../hooks/usePlans';
import useToast from '../../hooks/useToast';
import { ROUTES } from '../../routes/routeConfig';
import PlanFormSection from './components/PlanFormSection';
import BillingPeriodSelector from './components/BillingPeriodSelector';
import ToggleSwitch from './components/ToggleSwitch';
import './PlanFormPage.css';

const DEFAULT_FORM_STATE = {
    name: '',
    price: '',
    billingPeriod: 'monthly',
    minQuantity: 1,
    startDate: '',
    endDate: '',
    options: {
        autoClose: false,
        closable: true,
        pausable: true,
        renewable: true,
    },
};

const PlanFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { createPlan, updatePlan, getPlanById } = usePlans();
    const { success, error } = useToast();

    const isEditing = Boolean(id);
    const [formData, setFormData] = useState(DEFAULT_FORM_STATE);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ── Load Existing Data ────────────────────────────────────────────────
    useEffect(() => {
        if (isEditing) {
            const existingPlan = getPlanById(id);
            if (existingPlan) {
                setFormData({
                    name: existingPlan.name || '',
                    price: existingPlan.price || '',
                    billingPeriod: existingPlan.billingPeriod || 'monthly',
                    minQuantity: existingPlan.minQuantity || 1,
                    startDate: existingPlan.startDate ? existingPlan.startDate.split('T')[0] : '',
                    endDate: existingPlan.endDate ? existingPlan.endDate.split('T')[0] : '',
                    options: {
                        autoClose: existingPlan.options?.autoClose ?? false,
                        closable: existingPlan.options?.closable ?? true,
                        pausable: existingPlan.options?.pausable ?? true,
                        renewable: existingPlan.options?.renewable ?? true,
                    },
                });
            } else {
                error('Plan not found');
                navigate(ROUTES.PLANS);
            }
        }
    }, [isEditing, id, getPlanById, navigate, error]);

    // ── Handlers ──────────────────────────────────────────────────────────
    const handleChange = useCallback((e) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value,
        }));
    }, []);

    const handleOptionToggle = useCallback((optionKey, value) => {
        setFormData((prev) => ({
            ...prev,
            options: { ...prev.options, [optionKey]: value },
        }));
    }, []);

    const handleBillingPeriodChange = useCallback((value) => {
        setFormData((prev) => ({ ...prev, billingPeriod: value }));
    }, []);

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            setIsSubmitting(true);

            // Basic validation
            if (!formData.name.trim() || !formData.price) {
                error('Please fill in all required fields.');
                setIsSubmitting(false);
                return;
            }

            // Price must be numeric
            const numericPrice = Number(formData.price);
            if (isNaN(numericPrice) || numericPrice < 0) {
                error('Price must be a valid positive number.');
                setIsSubmitting(false);
                return;
            }

            // Format payload
            const payload = {
                ...formData,
                price: numericPrice,
                // Only send date strings if they have a value, otherwise null
                startDate: formData.startDate || null,
                endDate: formData.endDate || null,
            };

            // Simulate network delay
            setTimeout(() => {
                try {
                    if (isEditing) {
                        updatePlan(id, payload);
                        success(`Plan "${payload.name}" updated successfully.`);
                    } else {
                        createPlan(payload);
                        success(`Plan "${payload.name}" created successfully.`);
                    }
                    setIsSubmitting(false);
                    navigate(ROUTES.PLANS);
                } catch (err) {
                    console.error("Submission error:", err);
                    error("Failed to save plan.");
                    setIsSubmitting(false);
                }
            }, 600);
        },
        [formData, isEditing, id, createPlan, updatePlan, success, error, navigate]
    );

    const handleCancel = useCallback(() => {
        navigate(ROUTES.PLANS);
    }, [navigate]);

    return (
        <div className="plan-form-page" id="plan-form-page">
            {/* ── Header ───────────────────────────────────────────────────── */}
            <header className="plan-form-page__header">
                <div className="plan-form-page__header-left">
                    <button
                        className="btn btn--ghost btn--sm plan-form-page__back-btn"
                        onClick={handleCancel}
                        aria-label="Back to Plans"
                    >
                        <HiArrowLeft size={18} />
                    </button>
                    <div>
                        <h1 className="plan-form-page__heading">
                            {isEditing ? 'Edit Plan' : 'Create New Plan'}
                        </h1>
                        <p className="plan-form-page__subheading">
                            Configure billing rules, pricing, and availability.
                        </p>
                    </div>
                </div>
                <div className="plan-form-page__header-right">
                    <button
                        type="button"
                        className="btn btn--secondary btn--md plan-form-page__cancel-btn"
                        onClick={handleCancel}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form="plan-form"
                        className="btn btn--primary btn--md plan-form-page__save-btn"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <span className="spinner spinner--sm"></span>
                        ) : (
                            <HiOutlineCheck size={18} />
                        )}
                        {isEditing ? 'Save Changes' : 'Create Plan'}
                    </button>
                </div>
            </header>

            {/* ── Form Body ────────────────────────────────────────────────── */}
            <form id="plan-form" className="plan-form-page__form" onSubmit={handleSubmit}>
                <div className="plan-form-page__content">
                    {/* Section 1: Basic Info */}
                    <PlanFormSection
                        title="Basic Details"
                        description="Identify this plan in your catalog and to your customers."
                    >
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">Plan Name <span className="required">*</span></label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-input"
                                placeholder="e.g. Pro Monthly"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </PlanFormSection>

                    {/* Section 2: Billing Rules */}
                    <PlanFormSection
                        title="Billing Rules"
                        description="Define how much and how often customers are charged."
                        badge="Finance"
                    >
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="price" className="form-label">Price <span className="required">*</span></label>
                                <div className="input-with-icon">
                                    <span className="input-icon">$</span>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        className="form-input"
                                        placeholder="0.00"
                                        step="0.01"
                                        min="0"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="minQuantity" className="form-label">Minimum Quantity</label>
                                <input
                                    type="number"
                                    id="minQuantity"
                                    name="minQuantity"
                                    className="form-input"
                                    min="1"
                                    value={formData.minQuantity}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group plan-form-page__period-group">
                            <label className="form-label">Billing Period</label>
                            <BillingPeriodSelector
                                value={formData.billingPeriod}
                                onChange={handleBillingPeriodChange}
                            />
                        </div>
                    </PlanFormSection>

                    {/* Section 3: Availability */}
                    <PlanFormSection
                        title="Availability Dates"
                        description="Set when this plan can be purchased. Leave blank for indefinite."
                    >
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="startDate" className="form-label">Start Date</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    name="startDate"
                                    className="form-input form-input--date"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="endDate" className="form-label">End Date</label>
                                <input
                                    type="date"
                                    id="endDate"
                                    name="endDate"
                                    className="form-input form-input--date"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    min={formData.startDate || undefined}
                                />
                            </div>
                        </div>
                    </PlanFormSection>

                    {/* Section 4: Plan Options */}
                    <PlanFormSection
                        title="Plan Options"
                        description="Configure specific rules for subscriptions using this plan."
                    >
                        <div className="plan-form-page__options-grid">
                            <ToggleSwitch
                                id="option-auto-close"
                                checked={formData.options.autoClose}
                                onChange={(val) => handleOptionToggle('autoClose', val)}
                                label="Auto-close"
                                description="Subscription ends immediately after the first period without renewing."
                            />
                            <ToggleSwitch
                                id="option-renewable"
                                checked={formData.options.renewable}
                                onChange={(val) => handleOptionToggle('renewable', val)}
                                label="Renewable"
                                description="Allow customers to renew this plan when it expires."
                            />
                            <ToggleSwitch
                                id="option-closable"
                                checked={formData.options.closable}
                                onChange={(val) => handleOptionToggle('closable', val)}
                                label="Cancellable"
                                description="Customers can cancel their subscription at any time."
                            />
                            <ToggleSwitch
                                id="option-pausable"
                                checked={formData.options.pausable}
                                onChange={(val) => handleOptionToggle('pausable', val)}
                                label="Pausable"
                                description="Customers can temporarily pause their subscription."
                            />
                        </div>
                    </PlanFormSection>
                </div>
            </form>
        </div>
    );
};

export default PlanFormPage;
