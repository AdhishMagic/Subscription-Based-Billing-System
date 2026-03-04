/* ==========================================================================
   CREATE SUBSCRIPTION PAGE
   Full-form page for creating new subscriptions.

   Sections:
   ┌──────────────────────────────────────────────────────┐
   │ Page Header + Back Button                            │
   ├──────────────────────────────────────────────────────┤
   │ Subscription Details Panel                           │
   │  - Customer selection                                │
   │  - Plan selection                                    │
   │  - Start / Expiration date                           │
   │  - Payment terms                                     │
   ├──────────────────────────────────────────────────────┤
   │ Order Lines Table (dynamic inline editing)           │
   ├──────────────────────────────────────────────────────┤
   │ Form Actions: Cancel | Save as Draft                 │
   └──────────────────────────────────────────────────────┘
   ========================================================================== */

import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowLeft } from 'react-icons/hi2';
import useSubscriptions from '../../hooks/useSubscriptions';
import useToast from '../../hooks/useToast';
import OrderLinesTable from './components/OrderLinesTable';
import { CUSTOMERS, AVAILABLE_PLANS, PAYMENT_TERMS_OPTIONS } from '../../data/subscriptionsMockData';
import './SubscriptionCreatePage.css';

const SubscriptionCreatePage = () => {
    const navigate = useNavigate();
    const { createSubscription } = useSubscriptions();
    const { success } = useToast();

    // ── Form State ────────────────────────────────────────────────────────
    const [formData, setFormData] = useState({
        customerId: '',
        customerName: '',
        planId: '',
        planName: '',
        startDate: '',
        expirationDate: '',
        paymentTerms: 'net-30',
        orderLines: [],
    });

    const [errors, setErrors] = useState({});

    // ── Field Change Handlers ─────────────────────────────────────────────

    const handleFieldChange = useCallback((field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    }, []);

    const handleCustomerChange = useCallback((customerId) => {
        const customer = CUSTOMERS.find((c) => c.id === customerId);
        setFormData((prev) => ({
            ...prev,
            customerId,
            customerName: customer ? customer.name : '',
        }));
        setErrors((prev) => ({ ...prev, customerId: undefined }));
    }, []);

    const handlePlanChange = useCallback((planId) => {
        const plan = AVAILABLE_PLANS.find((p) => p.id === planId);
        setFormData((prev) => ({
            ...prev,
            planId,
            planName: plan ? plan.name : '',
        }));
        setErrors((prev) => ({ ...prev, planId: undefined }));
    }, []);

    const handleOrderLinesChange = useCallback((lines) => {
        setFormData((prev) => ({ ...prev, orderLines: lines }));
    }, []);

    // ── Validation ────────────────────────────────────────────────────────

    const validate = () => {
        const newErrors = {};
        if (!formData.customerId) newErrors.customerId = 'Customer is required';
        if (!formData.planId) newErrors.planId = 'Plan is required';
        if (!formData.startDate) newErrors.startDate = 'Start date is required';
        if (!formData.expirationDate) newErrors.expirationDate = 'Expiration date is required';
        if (formData.startDate && formData.expirationDate && formData.startDate >= formData.expirationDate) {
            newErrors.expirationDate = 'Must be after start date';
        }
        if (formData.orderLines.length === 0) newErrors.orderLines = 'At least one order line is required';
        const hasEmptyProduct = formData.orderLines.some((l) => !l.productId);
        if (hasEmptyProduct) newErrors.orderLines = 'All order lines must have a product selected';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // ── Submit ─────────────────────────────────────────────────────────────

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            if (!validate()) return;

            const newSub = createSubscription(formData);
            success(`Subscription ${newSub.subscriptionNumber} created as Draft.`);
            navigate('/subscriptions');
        },
        [formData, createSubscription, navigate, success]
    );

    const handleCancel = useCallback(() => {
        navigate('/subscriptions');
    }, [navigate]);

    return (
        <div className="sub-create" id="sub-create-page">
            {/* ── Page Header ────────────────────────────────────────── */}
            <header className="sub-create__header">
                <button className="sub-create__back-btn" onClick={handleCancel}>
                    <HiOutlineArrowLeft />
                </button>
                <div>
                    <h1 className="sub-create__heading">Create Subscription</h1>
                    <p className="sub-create__subheading">
                        Configure a new subscription and save as draft
                    </p>
                </div>
            </header>

            <form onSubmit={handleSubmit} className="sub-create__form" noValidate>
                {/* ── Details Panel ─────────────────────────────────── */}
                <div className="sub-create__panel">
                    <h2 className="sub-create__panel-title">Subscription Details</h2>

                    <div className="sub-create__grid">
                        {/* Customer */}
                        <div className="sub-create__field">
                            <label className="sub-create__label">
                                Customer <span className="sub-create__required">*</span>
                            </label>
                            <select
                                className={`sub-create__select ${errors.customerId ? 'sub-create__select--error' : ''}`}
                                value={formData.customerId}
                                onChange={(e) => handleCustomerChange(e.target.value)}
                            >
                                <option value="">Select customer...</option>
                                {CUSTOMERS.map((c) => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                            {errors.customerId && <span className="sub-create__error">{errors.customerId}</span>}
                        </div>

                        {/* Plan */}
                        <div className="sub-create__field">
                            <label className="sub-create__label">
                                Plan <span className="sub-create__required">*</span>
                            </label>
                            <select
                                className={`sub-create__select ${errors.planId ? 'sub-create__select--error' : ''}`}
                                value={formData.planId}
                                onChange={(e) => handlePlanChange(e.target.value)}
                            >
                                <option value="">Select plan...</option>
                                {AVAILABLE_PLANS.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.name} — ${p.price.toFixed(2)}
                                    </option>
                                ))}
                            </select>
                            {errors.planId && <span className="sub-create__error">{errors.planId}</span>}
                        </div>

                        {/* Start Date */}
                        <div className="sub-create__field">
                            <label className="sub-create__label">
                                Start Date <span className="sub-create__required">*</span>
                            </label>
                            <input
                                type="date"
                                className={`sub-create__input ${errors.startDate ? 'sub-create__input--error' : ''}`}
                                value={formData.startDate}
                                onChange={(e) => handleFieldChange('startDate', e.target.value)}
                            />
                            {errors.startDate && <span className="sub-create__error">{errors.startDate}</span>}
                        </div>

                        {/* Expiration Date */}
                        <div className="sub-create__field">
                            <label className="sub-create__label">
                                Expiration Date <span className="sub-create__required">*</span>
                            </label>
                            <input
                                type="date"
                                className={`sub-create__input ${errors.expirationDate ? 'sub-create__input--error' : ''}`}
                                value={formData.expirationDate}
                                onChange={(e) => handleFieldChange('expirationDate', e.target.value)}
                            />
                            {errors.expirationDate && <span className="sub-create__error">{errors.expirationDate}</span>}
                        </div>

                        {/* Payment Terms */}
                        <div className="sub-create__field sub-create__field--full">
                            <label className="sub-create__label">Payment Terms</label>
                            <select
                                className="sub-create__select"
                                value={formData.paymentTerms}
                                onChange={(e) => handleFieldChange('paymentTerms', e.target.value)}
                            >
                                {PAYMENT_TERMS_OPTIONS.map((t) => (
                                    <option key={t.value} value={t.value}>{t.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* ── Order Lines Panel ─────────────────────────────── */}
                <div className="sub-create__panel">
                    {errors.orderLines && (
                        <div className="sub-create__order-error">{errors.orderLines}</div>
                    )}
                    <OrderLinesTable
                        orderLines={formData.orderLines}
                        onChange={handleOrderLinesChange}
                    />
                </div>

                {/* ── Form Actions ─────────────────────────────────── */}
                <div className="sub-create__actions">
                    <button
                        type="button"
                        className="sub-create__cancel-btn"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button type="submit" className="sub-create__submit-btn">
                        Save as Draft
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SubscriptionCreatePage;
