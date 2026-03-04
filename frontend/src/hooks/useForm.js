/* ==========================================================================
   useForm HOOK
   Generic controlled form handler with validation support.
   
   Architecture:
   - Manages form values, errors, touched state, and submission.
   - Validation logic is INJECTED via config — not hardcoded.
   - Supports field-level and form-level validation.
   - Returns everything a form component needs.
   ========================================================================== */

import { useState, useCallback, useMemo } from 'react';

/**
 * @param {Object} config
 * @param {Object} config.initialValues    - { fieldName: defaultValue }
 * @param {Function} config.validate       - (values) => { fieldName: 'Error message' }
 * @param {Function} config.onSubmit       - async (values) => void
 * @returns {Object}
 */
const useForm = ({ initialValues = {}, validate, onSubmit }) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState('');

    // ── Handlers ────────────────────────────────────────────────────────────

    const handleChange = useCallback((e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;

        setValues((prev) => ({ ...prev, [name]: fieldValue }));
        setSubmitError('');
        setSubmitSuccess('');

        // Clear error on change (if field was touched)
        setErrors((prev) => ({ ...prev, [name]: '' }));
    }, []);

    const handleBlur = useCallback((e) => {
        const { name } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));

        // Validate single field on blur
        if (validate) {
            const validationErrors = validate(values);
            setErrors((prev) => ({ ...prev, [name]: validationErrors[name] || '' }));
        }
    }, [validate, values]);

    const setFieldValue = useCallback((name, value) => {
        setValues((prev) => ({ ...prev, [name]: value }));
    }, []);

    const setFieldError = useCallback((name, message) => {
        setErrors((prev) => ({ ...prev, [name]: message }));
    }, []);

    // ── Submit ──────────────────────────────────────────────────────────────

    const handleSubmit = useCallback(async (e) => {
        e?.preventDefault();

        // Mark all fields as touched
        const allTouched = Object.keys(values).reduce(
            (acc, key) => ({ ...acc, [key]: true }),
            {}
        );
        setTouched(allTouched);

        // Run validation
        if (validate) {
            const validationErrors = validate(values);
            setErrors(validationErrors);

            const hasErrors = Object.values(validationErrors).some(Boolean);
            if (hasErrors) return;
        }

        setIsSubmitting(true);
        setSubmitError('');
        setSubmitSuccess('');

        try {
            await onSubmit(values);
        } catch (err) {
            setSubmitError(err.message || 'An unexpected error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    }, [values, validate, onSubmit]);

    // ── Reset ───────────────────────────────────────────────────────────────

    const resetForm = useCallback(() => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
        setIsSubmitting(false);
        setSubmitError('');
        setSubmitSuccess('');
    }, [initialValues]);

    // ── Derived ─────────────────────────────────────────────────────────────

    const isValid = useMemo(() => {
        if (!validate) return true;
        const validationErrors = validate(values);
        return !Object.values(validationErrors).some(Boolean);
    }, [validate, values]);

    return {
        values,
        errors,
        touched,
        isSubmitting,
        isValid,
        submitError,
        submitSuccess,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        setFieldError,
        setSubmitError,
        setSubmitSuccess,
        resetForm,
    };
};

export default useForm;
