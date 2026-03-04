/* ==========================================================================
   PLAN FORM SECTION
   Reusable layout wrapper for sections within the plan configuration form.
   ========================================================================== */

import { memo } from 'react';
import './PlanFormSection.css';

const PlanFormSection = ({ title, description, badge, children }) => {
    return (
        <section className="plan-form-section">
            <div className="plan-form-section__header">
                <div>
                    <h2 className="plan-form-section__title">
                        {title}
                        {badge && <span className="plan-form-section__badge">{badge}</span>}
                    </h2>
                    {description && (
                        <p className="plan-form-section__description">{description}</p>
                    )}
                </div>
            </div>
            <div className="plan-form-section__content">
                {children}
            </div>
        </section>
    );
};

export default memo(PlanFormSection);
