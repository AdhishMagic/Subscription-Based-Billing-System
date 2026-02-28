/* ==========================================================================
   RECENT ACTIVITY COMPONENT
   Activity feed showing latest system events with contextual icons
   and staggered entrance animation.

   Props:
   ─ data   Array of activity items
   ========================================================================== */

import {
    HiOutlinePlus,
    HiOutlineCheck,
    HiOutlineTag,
    HiOutlineBolt,
    HiOutlineUser,
} from 'react-icons/hi2';
import './RecentActivity.css';

/* Icon + color mapping per activity type */
const ACTIVITY_CONFIG = {
    subscription_created: {
        icon: HiOutlinePlus,
        colorClass: 'activity-icon--accent',
    },
    invoice_paid: {
        icon: HiOutlineCheck,
        colorClass: 'activity-icon--success',
    },
    discount_applied: {
        icon: HiOutlineTag,
        colorClass: 'activity-icon--warning',
    },
    subscription_activated: {
        icon: HiOutlineBolt,
        colorClass: 'activity-icon--info',
    },
    user_created: {
        icon: HiOutlineUser,
        colorClass: 'activity-icon--purple',
    },
};

/* ── Component ─────────────────────────────────────────────────────────── */

const RecentActivity = ({ data }) => {
    return (
        <div className="recent-activity" id="recent-activity">
            <div className="recent-activity__header">
                <h3 className="recent-activity__title">Recent Activity</h3>
                <button className="recent-activity__view-all" type="button">
                    View all
                </button>
            </div>

            <div className="recent-activity__list">
                {data.map((item, index) => {
                    const config = ACTIVITY_CONFIG[item.type] || ACTIVITY_CONFIG.subscription_created;
                    const IconComponent = config.icon;

                    return (
                        <div
                            key={item.id}
                            className="recent-activity__item"
                            style={{ animationDelay: `${0.5 + index * 0.08}s` }}
                        >
                            <div className={`recent-activity__icon ${config.colorClass}`}>
                                <IconComponent />
                            </div>

                            <div className="recent-activity__content">
                                <p className="recent-activity__message">{item.message}</p>
                                <p className="recent-activity__detail">{item.detail}</p>
                            </div>

                            <span className="recent-activity__time">{item.timestamp}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RecentActivity;
