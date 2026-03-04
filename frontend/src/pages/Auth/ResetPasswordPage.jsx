/* ==========================================================================
   RESET PASSWORD PAGE
   Email-only form to request a password reset link.
   
   Architecture:
   - Two states: form view → success confirmation view.
   - Simulates email sending with a delay.
   - No actual API call — structure-only for now.
   ========================================================================== */

import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineEnvelope, HiOutlineCheckCircle, HiOutlineArrowLeft } from 'react-icons/hi2';
import useForm from '../../hooks/useForm';
import Input from '../../components/ui/Input/Input';
import Button from '../../components/ui/Button/Button';
import { required, isValidEmail } from '../../utils/validators';
import { ROUTES } from '../../routes/routeConfig';
import './ResetPasswordPage.css';

// ── Validation ──────────────────────────────────────────────────────────────

const validateReset = (values) => {
    const errors = {};

    const emailRequired = required(values.email, 'Email');
    if (!emailRequired.valid) {
        errors.email = emailRequired.message;
    } else {
        const emailFormat = isValidEmail(values.email);
        if (!emailFormat.valid) errors.email = emailFormat.message;
    }

    return errors;
};

// ── Component ───────────────────────────────────────────────────────────────

const ResetPasswordPage = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [sentEmail, setSentEmail] = useState('');

    const onSubmit = useCallback(async (values) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Simulate success (always succeeds for UX)
        setSentEmail(values.email);
        setIsSuccess(true);
    }, []);

    const {
        values,
        errors,
        touched,
        isSubmitting,
        submitError,
        handleChange,
        handleBlur,
        handleSubmit,
    } = useForm({
        initialValues: { email: '' },
        validate: validateReset,
        onSubmit,
    });

    // ── Success View ────────────────────────────────────────────────────────

    if (isSuccess) {
        return (
            <div className="reset-page">
                <div className="reset-page__success" role="status">
                    <div className="reset-page__success-icon-wrapper">
                        <HiOutlineCheckCircle className="reset-page__success-icon" />
                    </div>
                    <h2 className="reset-page__heading">Check your email</h2>
                    <p className="reset-page__success-text">
                        A reset link has been sent to{' '}
                        <strong className="reset-page__success-email">{sentEmail}</strong>.
                        Please check your inbox and follow the instructions.
                    </p>
                    <p className="reset-page__success-hint">
                        Didn&apos;t receive the email? Check your spam folder or try again.
                    </p>
                    <Link to={ROUTES.LOGIN} className="reset-page__back-link" id="reset-back-to-login">
                        <HiOutlineArrowLeft />
                        Back to Sign In
                    </Link>
                </div>
            </div>
        );
    }

    // ── Form View ───────────────────────────────────────────────────────────

    return (
        <div className="reset-page">
            <h2 className="reset-page__heading">Reset your password</h2>
            <p className="reset-page__subheading">
                Enter your email address and we&apos;ll send you a link to reset your password.
            </p>

            {/* ── Error Banner ─────────────────────────────────────────────── */}
            {submitError && (
                <div className="reset-page__alert reset-page__alert--error" role="alert">
                    <span className="reset-page__alert-dot" />
                    {submitError}
                </div>
            )}

            <form className="reset-page__form" onSubmit={handleSubmit} noValidate>
                <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email ? errors.email : ''}
                    icon={<HiOutlineEnvelope />}
                    required
                    autoComplete="email"
                    id="reset-email"
                />

                <Button
                    type="submit"
                    variant="secondary"
                    size="lg"
                    fullWidth
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    id="reset-submit"
                >
                    {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                </Button>
            </form>

            <p className="reset-page__footer">
                <Link to={ROUTES.LOGIN} className="reset-page__login-link" id="reset-login-link">
                    <HiOutlineArrowLeft />
                    Back to Sign In
                </Link>
            </p>
        </div>
    );
};

export default ResetPasswordPage;
