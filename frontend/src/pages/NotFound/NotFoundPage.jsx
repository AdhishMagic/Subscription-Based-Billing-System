/* ==========================================================================
   NOT FOUND PAGE (404)
   Premium dark-themed 404 page with animated glitch effect,
   consistent with the ViaTunnel-style SaaS aesthetic.
   ========================================================================== */

import { Link } from 'react-router-dom';
import { HiOutlineMapPin, HiOutlineArrowLeft, HiOutlineHome } from 'react-icons/hi2';
import Button from '../../components/ui/Button/Button';
import { ROUTES } from '../../routes/routeConfig';
import './NotFoundPage.css';

const NotFoundPage = () => (
    <div className="not-found-page">
        {/* Animated background particles */}
        <div className="not-found-page__bg-effects">
            <div className="not-found-page__orb not-found-page__orb--1" />
            <div className="not-found-page__orb not-found-page__orb--2" />
            <div className="not-found-page__grid-overlay" />
        </div>

        <div className="not-found-page__content">
            {/* Map Pin Icon */}
            <div className="not-found-page__icon-wrapper">
                <HiOutlineMapPin className="not-found-page__icon" />
            </div>

            {/* Error Code with Glitch Effect */}
            <h1 className="not-found-page__code" data-text="404">
                404
            </h1>

            {/* Title */}
            <h2 className="not-found-page__title">Page Not Found</h2>

            {/* Description */}
            <p className="not-found-page__description">
                The page you're looking for doesn't exist or has been moved.
                Check the URL or navigate back to familiar territory.
            </p>

            {/* Actions */}
            <div className="not-found-page__actions">
                <Link to={ROUTES.DASHBOARD} className="not-found-page__action">
                    <Button
                        variant="primary"
                        size="lg"
                        icon={<HiOutlineHome size={18} />}
                    >
                        Go to Dashboard
                    </Button>
                </Link>
                <button
                    className="not-found-page__back-btn"
                    onClick={() => window.history.back()}
                    type="button"
                >
                    <HiOutlineArrowLeft size={16} />
                    Go Back
                </button>
            </div>
        </div>
    </div>
);

export default NotFoundPage;
