/* ==========================================================================
   REGISTER PAGE
   Full signup form with name, email, password, confirm, T&C checkbox.
   
   Architecture:
   - Form state via useForm hook.
   - Password strength from authValidators.
   - Simulated email uniqueness check.
   - Auth actions from AuthContext.
   ========================================================================== */

import { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineEnvelope, HiOutlineUser } from 'react-icons/hi2';
import useAuth from '../../hooks/useAuth';
import useForm from '../../hooks/useForm';
import Input from '../../components/ui/Input/Input';
import Button from '../../components/ui/Button/Button';
import { PasswordInput, PasswordStrength } from '../../components/auth';
import { required, isValidEmail } from '../../utils/validators';
import {
    isValidName,
    isEmailAvailable,
    isStrongPassword,
    passwordsMatch,
    getPasswordStrength,
} from '../../utils/authValidators';
import { ROUTES } from '../../routes/routeConfig';
import './RegisterPage.css';

// ── Validation ──────────────────────────────────────────────────────────────

const validateRegister = (values) => {
    const errors = {};

    // Full Name
    const nameRequired = required(values.fullName, 'Full name');
    if (!nameRequired.valid) {
        errors.fullName = nameRequired.message;
    } else {
        const nameValid = isValidName(values.fullName);
        if (!nameValid.valid) errors.fullName = nameValid.message;
    }

    // Email
    const emailRequired = required(values.email, 'Email');
    if (!emailRequired.valid) {
        errors.email = emailRequired.message;
    } else {
        const emailFormat = isValidEmail(values.email);
        if (!emailFormat.valid) {
            errors.email = emailFormat.message;
        } else {
            const emailAvailable = isEmailAvailable(values.email);
            if (!emailAvailable.valid) errors.email = emailAvailable.message;
        }
    }

    // Password
    const pwRequired = required(values.password, 'Password');
    if (!pwRequired.valid) {
        errors.password = pwRequired.message;
    } else {
        const pwStrong = isStrongPassword(values.password);
        if (!pwStrong.valid) errors.password = pwStrong.message;
    }

    // Confirm Password
    const cpRequired = required(values.confirmPassword, 'Confirm password');
    if (!cpRequired.valid) {
        errors.confirmPassword = cpRequired.message;
    } else if (values.password) {
        const match = passwordsMatch(values.password, values.confirmPassword);
        if (!match.valid) errors.confirmPassword = match.message;
    }

    // Terms
    if (!values.acceptTerms) {
        errors.acceptTerms = 'You must accept the Terms & Conditions.';
    }

    return errors;
};

// ── Component ───────────────────────────────────────────────────────────────

const RegisterPage = () => {
    const { register } = useAuth();

    const onSubmit = useCallback(async (values) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        await register({
            name: values.fullName,
            email: values.email,
            password: values.password,
        });
    }, [register]);

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
        initialValues: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            acceptTerms: false,
        },
        validate: validateRegister,
        onSubmit,
    });

    // Password strength (computed from current value)
    const strength = useMemo(
        () => getPasswordStrength(values.password),
        [values.password]
    );

    return (
        <div className="register-page">
            <h2 className="register-page__heading">Create your account</h2>
            <p className="register-page__subheading">
                Start managing subscriptions in minutes
            </p>

            {/* ── Error Banner ─────────────────────────────────────────────── */}
            {submitError && (
                <div className="register-page__alert register-page__alert--error" role="alert">
                    <span className="register-page__alert-dot" />
                    {submitError}
                </div>
            )}

            {/* ── Form ─────────────────────────────────────────────────────── */}
            <form className="register-page__form" onSubmit={handleSubmit} noValidate>
                <Input
                    label="Full Name"
                    name="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={values.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.fullName ? errors.fullName : ''}
                    icon={<HiOutlineUser />}
                    required
                    autoComplete="name"
                    id="register-fullname"
                />

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
                    id="register-email"
                />

                <div className="register-page__password-section">
                    <PasswordInput
                        label="Password"
                        name="password"
                        placeholder="Create a strong password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.password ? errors.password : ''}
                        required
                        autoComplete="new-password"
                        id="register-password"
                    />
                    <PasswordStrength
                        strength={strength}
                        visible={values.password.length > 0}
                    />
                </div>

                <PasswordInput
                    label="Confirm Password"
                    name="confirmPassword"
                    placeholder="Re-enter your password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.confirmPassword ? errors.confirmPassword : ''}
                    required
                    autoComplete="new-password"
                    id="register-confirm-password"
                />

                {/* ── Terms Checkbox ───────────────────────────────────────── */}
                <div className="register-page__checkbox-group">
                    <label className="register-page__checkbox-label" htmlFor="register-terms">
                        <input
                            type="checkbox"
                            name="acceptTerms"
                            id="register-terms"
                            checked={values.acceptTerms}
                            onChange={handleChange}
                            className="register-page__checkbox"
                        />
                        <span className="register-page__checkbox-custom" aria-hidden="true" />
                        <span className="register-page__checkbox-text">
                            I agree to the{' '}
                            <a href="#terms" className="register-page__terms-link">
                                Terms & Conditions
                            </a>{' '}
                            and{' '}
                            <a href="#privacy" className="register-page__terms-link">
                                Privacy Policy
                            </a>
                        </span>
                    </label>
                    {touched.acceptTerms && errors.acceptTerms && (
                        <span className="register-page__checkbox-error" role="alert">
                            {errors.acceptTerms}
                        </span>
                    )}
                </div>

                <Button
                    type="submit"
                    variant="secondary"
                    size="lg"
                    fullWidth
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    id="register-submit"
                >
                    {isSubmitting ? 'Creating account...' : 'Create Account'}
                </Button>
            </form>

            {/* ── Login Link ──────────────────────────────────────────────── */}
            <p className="register-page__footer">
                Already have an account?{' '}
                <Link to={ROUTES.LOGIN} className="register-page__login-link" id="register-login-link">
                    Sign in
                </Link>
            </p>
        </div>
    );
};

export default RegisterPage;
