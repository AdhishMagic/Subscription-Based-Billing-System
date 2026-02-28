/* ==========================================================================
   UNAUTHORIZED PAGE (403)
   Displayed when a user attempts to access a route they don't have
   permission for. Premium dark-themed design consistent with the
   ViaTunnel-style SaaS aesthetic.
   ========================================================================== */

import { Link, useLocation } from 'react-router-dom';
import { HiOutlineShieldExclamation, HiOutlineArrowLeft } from 'react-icons/hi2';
import Button from '../../components/ui/Button/Button';
import { ROUTES } from '../../routes/routeConfig';
import './UnauthorizedPage.css';

const UnauthorizedPage = () => {
    const location = useLocation();
    const attemptedPath = location.state?.from?.pathname || null;

    return (
        <div className="unauthorized-page">
            {/* Animated background particles */}
            <div className="unauthorized-page__bg-effects">
                <div className="unauthorized-page__orb unauthorized-page__orb--1" />
                <div className="unauthorized-page__orb unauthorized-page__orb--2" />
                <div className="unauthorized-page__orb unauthorized-page__orb--3" />
            </div>

            <div className="unauthorized-page__content">
                {/* Shield Icon */}
                <div className="unauthorized-page__icon-wrapper">
                    <div className="unauthorized-page__icon-ring" />
                    <HiOutlineShieldExclamation className="unauthorized-page__icon" />
                </div>

                {/* Error Code */}
                <h1 className="unauthorized-page__code">403</h1>

                {/* Title */}
                <h2 className="unauthorized-page__title">Access Restricted</h2>

                {/* Description */}
                <p className="unauthorized-page__description">
                    You don't have permission to access this resource.
                    Your current role doesn't include the required privileges.
                </p>

                {/* Attempted path info */}
                {attemptedPath && (
                    <div className="unauthorized-page__path-info">
                        <span className="unauthorized-page__path-label">Attempted path:</span>
                        <code className="unauthorized-page__path-value">{attemptedPath}</code>
                    </div>
                )}

                {/* Action */}
                <Link to={ROUTES.DASHBOARD} className="unauthorized-page__action">
                    <Button
                        variant="primary"
                        size="lg"
                        icon={<HiOutlineArrowLeft size={18} />}
                    >
                        Return to Dashboard
                    </Button>
                </Link>

                {/* Help text */}
                <p className="unauthorized-page__help">
                    If you believe this is an error, contact your system administrator.
                </p>
            </div>
        </div>
    );
};

export default UnauthorizedPage;
