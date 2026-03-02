/* ==========================================================================
   LIFECYCLE STEPPER
   Horizontal progress indicator showing the subscription lifecycle:
   Draft → Quotation → Confirmed → Active → Closed

   Visual states:
   - completed: filled accent circle + solid connector
   - current: glowing pulsing circle
   - upcoming: dimmed outline
   ========================================================================== */

import { memo } from 'react';
import { HiOutlineCheck } from 'react-icons/hi2';
import { STATUS_FLOW } from '../../../data/subscriptionsMockData';
import './LifecycleStepper.css';

const STATUS_LABELS = {
    draft: 'Draft',
    quotation: 'Quotation',
    confirmed: 'Confirmed',
    active: 'Active',
    closed: 'Closed',
};

const LifecycleStepper = ({ currentStatus }) => {
    const currentIndex = STATUS_FLOW.indexOf(currentStatus);

    return (
        <div className="lifecycle-stepper" role="progressbar" aria-label="Subscription lifecycle">
            {STATUS_FLOW.map((status, index) => {
                const isCompleted = index < currentIndex;
                const isCurrent = index === currentIndex;
                const isUpcoming = index > currentIndex;

                let stepClass = 'lifecycle-stepper__step';
                if (isCompleted) stepClass += ' lifecycle-stepper__step--completed';
                if (isCurrent) stepClass += ' lifecycle-stepper__step--current';
                if (isUpcoming) stepClass += ' lifecycle-stepper__step--upcoming';

                return (
                    <div key={status} className={stepClass}>
                        {/* Connector line (before step, except first) */}
                        {index > 0 && (
                            <div
                                className={`lifecycle-stepper__connector ${isCompleted || isCurrent
                                        ? 'lifecycle-stepper__connector--filled'
                                        : ''
                                    }`}
                            />
                        )}

                        {/* Step node */}
                        <div className={`lifecycle-stepper__node lifecycle-stepper__node--${status}`}>
                            {isCompleted ? (
                                <HiOutlineCheck className="lifecycle-stepper__check" />
                            ) : (
                                <span className="lifecycle-stepper__number">{index + 1}</span>
                            )}
                        </div>

                        {/* Label */}
                        <span className="lifecycle-stepper__label">
                            {STATUS_LABELS[status]}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default memo(LifecycleStepper);
