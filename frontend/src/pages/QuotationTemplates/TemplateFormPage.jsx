/* ==========================================================================
   TEMPLATE FORM PAGE (CREATE / EDIT)
   Full-page form for creating and editing quotation templates.

   Sections:
   ┌──────────────────────────────────────────────────────┐
   │ Page Header + Back Button + Preview Toggle           │
   ├──────────────────────────────────────────────────────┤
   │ Section 1: Basic Information                         │
   │  - Template Name                                     │
   │  - Validity Days (numeric)                           │
   │  - Recurring Plan selector                           │
   ├──────────────────────────────────────────────────────┤
   │ Section 2: Product Line Builder                      │
   │  - Dynamic table with add/remove                     │
   ├──────────────────────────────────────────────────────┤
   │ Section 3: Financial Summary Panel                   │
   │  - Subtotal, Tax, Grand Total (live recalculation)   │
   ├──────────────────────────────────────────────────────┤
   │ Form Actions: Cancel | Save Template                 │
   └──────────────────────────────────────────────────────┘

   OR (when preview toggled):
   ┌──────────────────────────────────────────────────────┐
   │ Template Preview (invoice-style)                     │
   └──────────────────────────────────────────────────────┘
   ========================================================================== */

import { useState, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HiOutlineArrowLeft, HiOutlineEye, HiOutlinePencilSquare } from 'react-icons/hi2';
import useQuotationTemplates from '../../hooks/useQuotationTemplates';
import useToast from '../../hooks/useToast';
import ProductLineBuilder from './components/ProductLineBuilder';
import FinancialSummary from './components/FinancialSummary';
import TemplatePreview from './components/TemplatePreview';
import { AVAILABLE_PLANS } from '../../data/templatesMockData';
import './TemplateFormPage.css';

const TemplateFormPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { createTemplate, updateTemplate, getTemplateById } = useQuotationTemplates();
    const { success } = useToast();

    const isEditMode = Boolean(id);
    const existingTemplate = isEditMode ? getTemplateById(id) : null;

    // ── Form State ────────────────────────────────────────────────────────
    const [formData, setFormData] = useState(() => {
        if (existingTemplate) {
            return {
                name: existingTemplate.name,
                validityDays: existingTemplate.validityDays,
                recurringPlanId: existingTemplate.recurringPlanId,
                recurringPlanName: existingTemplate.recurringPlanName,
                productLines: [...existingTemplate.productLines],
            };
        }
        return {
            name: '',
            validityDays: 30,
            recurringPlanId: '',
            recurringPlanName: '',
            productLines: [],
        };
    });

    const [errors, setErrors] = useState({});
    const [isPreviewMode, setIsPreviewMode] = useState(false);

    // ── Field Change Handlers ─────────────────────────────────────────────

    const handleFieldChange = useCallback((field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    }, []);

    const handlePlanChange = useCallback((planId) => {
        const plan = AVAILABLE_PLANS.find((p) => p.id === planId);
        setFormData((prev) => ({
            ...prev,
            recurringPlanId: planId,
            recurringPlanName: plan ? plan.name : '',
        }));
        setErrors((prev) => ({ ...prev, recurringPlanId: undefined }));
    }, []);

    const handleProductLinesChange = useCallback((lines) => {
        setFormData((prev) => ({ ...prev, productLines: lines }));
        setErrors((prev) => ({ ...prev, productLines: undefined }));
    }, []);

    // ── Preview Data ──────────────────────────────────────────────────────
    const previewData = useMemo(() => ({
        ...formData,
        id: id || 'preview',
        createdAt: existingTemplate?.createdAt || new Date().toISOString(),
    }), [formData, id, existingTemplate]);

    // ── Validation ────────────────────────────────────────────────────────

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Template name is required';
        if (!formData.validityDays || formData.validityDays < 1)
            newErrors.validityDays = 'Validity must be at least 1 day';
        if (!formData.recurringPlanId) newErrors.recurringPlanId = 'Recurring plan is required';
        if (formData.productLines.length === 0)
            newErrors.productLines = 'At least one product line is required';
        const hasEmptyProduct = formData.productLines.some((l) => !l.productId);
        if (hasEmptyProduct)
            newErrors.productLines = 'All product lines must have a product selected';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // ── Submit ─────────────────────────────────────────────────────────────

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            if (!validate()) return;

            if (isEditMode) {
                updateTemplate(id, formData);
                success(`Template "${formData.name}" updated successfully.`);
            } else {
                createTemplate(formData);
                success(`Template "${formData.name}" created successfully.`);
            }
            navigate('/quotation-templates');
        },
        [formData, isEditMode, id, createTemplate, updateTemplate, navigate, success]
    );

    const handleCancel = useCallback(() => {
        navigate('/quotation-templates');
    }, [navigate]);

    const togglePreview = useCallback(() => {
        setIsPreviewMode((prev) => !prev);
    }, []);

    return (
        <div className="template-form" id="template-form-page">
            {/* ── Page Header ────────────────────────────────────────── */}
            <header className="template-form__header">
                <div className="template-form__header-left">
                    <button className="template-form__back-btn" onClick={handleCancel}>
                        <HiOutlineArrowLeft />
                    </button>
                    <div>
                        <h1 className="template-form__heading">
                            {isEditMode ? 'Edit Template' : 'Create Template'}
                        </h1>
                        <p className="template-form__subheading">
                            {isEditMode
                                ? 'Update template configuration and product lines'
                                : 'Define a new subscription blueprint for standardized billing'}
                        </p>
                    </div>
                </div>
                <button
                    type="button"
                    className={`template-form__preview-toggle ${isPreviewMode ? 'template-form__preview-toggle--active' : ''
                        }`}
                    onClick={togglePreview}
                >
                    {isPreviewMode ? <HiOutlinePencilSquare /> : <HiOutlineEye />}
                    {isPreviewMode ? 'Edit Mode' : 'Preview Template'}
                </button>
            </header>

            {/* ── Preview or Form ────────────────────────────────────── */}
            {isPreviewMode ? (
                <TemplatePreview template={previewData} />
            ) : (
                <form onSubmit={handleSubmit} className="template-form__body" noValidate>
                    {/* ── Section 1: Basic Information ──────────────────── */}
                    <div className="template-form__panel">
                        <h2 className="template-form__panel-title">Basic Information</h2>
                        <div className="template-form__grid">
                            {/* Template Name */}
                            <div className="template-form__field">
                                <label className="template-form__label">
                                    Template Name <span className="template-form__required">*</span>
                                </label>
                                <input
                                    type="text"
                                    className={`template-form__input ${errors.name ? 'template-form__input--error' : ''
                                        }`}
                                    placeholder="e.g. Starter Monthly Plan"
                                    value={formData.name}
                                    onChange={(e) => handleFieldChange('name', e.target.value)}
                                    id="template-name-input"
                                />
                                {errors.name && (
                                    <span className="template-form__error">{errors.name}</span>
                                )}
                            </div>

                            {/* Validity Days */}
                            <div className="template-form__field">
                                <label className="template-form__label">
                                    Validity Days <span className="template-form__required">*</span>
                                </label>
                                <input
                                    type="number"
                                    className={`template-form__input ${errors.validityDays ? 'template-form__input--error' : ''
                                        }`}
                                    min="1"
                                    placeholder="30"
                                    value={formData.validityDays}
                                    onChange={(e) =>
                                        handleFieldChange('validityDays', Number(e.target.value) || 0)
                                    }
                                    id="template-validity-input"
                                />
                                {errors.validityDays && (
                                    <span className="template-form__error">
                                        {errors.validityDays}
                                    </span>
                                )}
                            </div>

                            {/* Recurring Plan */}
                            <div className="template-form__field">
                                <label className="template-form__label">
                                    Recurring Plan <span className="template-form__required">*</span>
                                </label>
                                <select
                                    className={`template-form__select ${errors.recurringPlanId
                                            ? 'template-form__select--error'
                                            : ''
                                        }`}
                                    value={formData.recurringPlanId}
                                    onChange={(e) => handlePlanChange(e.target.value)}
                                    id="template-plan-select"
                                >
                                    <option value="">Select plan...</option>
                                    {AVAILABLE_PLANS.map((p) => (
                                        <option key={p.id} value={p.id}>
                                            {p.name} — ${p.price.toFixed(2)}
                                        </option>
                                    ))}
                                </select>
                                {errors.recurringPlanId && (
                                    <span className="template-form__error">
                                        {errors.recurringPlanId}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ── Section 2: Product Line Builder ───────────────── */}
                    <div className="template-form__panel">
                        {errors.productLines && (
                            <div className="template-form__product-error">
                                {errors.productLines}
                            </div>
                        )}
                        <ProductLineBuilder
                            productLines={formData.productLines}
                            onChange={handleProductLinesChange}
                        />
                    </div>

                    {/* ── Section 3: Financial Summary ──────────────────── */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <FinancialSummary productLines={formData.productLines} />
                    </div>

                    {/* ── Form Actions ──────────────────────────────────── */}
                    <div className="template-form__actions">
                        <button
                            type="button"
                            className="template-form__cancel-btn"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="template-form__submit-btn">
                            {isEditMode ? 'Update Template' : 'Save Template'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default TemplateFormPage;
