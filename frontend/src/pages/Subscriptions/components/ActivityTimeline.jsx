/* ==========================================================================
   ACTIVITY TIMELINE
   Vertical timeline showing subscription lifecycle events.
   ========================================================================== */

import { memo } from 'react';
import { HiOutlineClock } from 'react-icons/hi2';
import './ActivityTimeline.css';

const ActivityTimeline = ({ activities = [] }) => {
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (!activities.length) {
        return (
            <div className="activity-timeline activity-timeline--empty">
                <p>No activity recorded.</p>
            </div>
        );
    }

    return (
        <div className="activity-timeline">
            <h3 className="activity-timeline__title">Activity Timeline</h3>
            <div className="activity-timeline__list">
                {[...activities].reverse().map((act, index) => (
                    <div
                        key={act.id}
                        className={`activity-timeline__item ${index === 0 ? 'activity-timeline__item--latest' : ''}`}
                    >
                        <div className="activity-timeline__marker">
                            <div className="activity-timeline__dot" />
                            {index < activities.length - 1 && (
                                <div className="activity-timeline__line" />
                            )}
                        </div>
                        <div className="activity-timeline__content">
                            <p className="activity-timeline__action">{act.action}</p>
                            <div className="activity-timeline__meta">
                                <span className="activity-timeline__user">{act.user}</span>
                                <span className="activity-timeline__separator">·</span>
                                <span className="activity-timeline__date">
                                    <HiOutlineClock className="activity-timeline__clock-icon" />
                                    {formatDate(act.timestamp)} at {formatTime(act.timestamp)}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default memo(ActivityTimeline);
