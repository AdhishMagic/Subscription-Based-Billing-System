/* ==========================================================================
   PLAN EMPTY STATE
   Visual prompt when no plans exist in the system yet.
   ========================================================================== */

import { memo } from 'react';
import { HiOutlineRectangleStack, HiOutlinePlus } from 'react-icons/hi2';
import './PlanEmptyState.css';

const PlanEmptyState = ({ onCreateClick }) => {
    return (
        <div className="plan-empty-state" id="plan-empty-state">
            <div className="plan-empty-state__icon-wrapper">
                <HiOutlineRectangleStack className="plan-empty-state__icon" />
                <div className="plan-empty-state__pulse" aria-hidden="true" />
            </div>

            <h3 className="plan-empty-state__title">No Recurring Plans Yet</h3>

            <p className="plan-empty-state__description">
                Plans define your billing periods, prices, and limits. Create your first recurring plan to start monetizing your products.
            </p>

            <button
                className="btn btn--primary btn--lg plan-empty-state__btn"
                onClick={onCreateClick}
                id="empty-state-create-plan-btn"
            >
                <HiOutlinePlus size={20} />
                Create First Plan
            </button>
        </div>
    );
};

export default memo(PlanEmptyState);
