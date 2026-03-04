/* ==========================================================================
   SUBSCRIPTION EMPTY STATE
   ========================================================================== */

import { memo } from 'react';
import { HiOutlineArrowPath, HiOutlinePlus } from 'react-icons/hi2';
import './SubscriptionEmptyState.css';

const SubscriptionEmptyState = ({ onCreateClick }) => (
    <div className="sub-empty" id="sub-empty-state">
        <div className="sub-empty__icon-wrap">
            <HiOutlineArrowPath className="sub-empty__icon" />
        </div>
        <h3 className="sub-empty__title">No subscriptions yet</h3>
        <p className="sub-empty__text">
            Create your first subscription to start managing billing lifecycles.
        </p>
        <button className="sub-empty__btn" onClick={onCreateClick}>
            <HiOutlinePlus />
            Create Subscription
        </button>
    </div>
);

export default memo(SubscriptionEmptyState);
