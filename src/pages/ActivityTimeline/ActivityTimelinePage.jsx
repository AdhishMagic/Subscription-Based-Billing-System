import { useState } from 'react';
import { mockActivityTimeline } from '../../data/mockIntelligenceData';
import { timeAgo, capitalize } from '../../utils/formatters';
import {
    HiOutlineCheckCircle,
    HiOutlineExclamationTriangle,
    HiOutlineInformationCircle,
    HiOutlineExclamationCircle
} from 'react-icons/hi2';
import PageHeader from '../../components/layout/PageHeader/PageHeader';
import Card from '../../components/ui/Card/Card';
import './ActivityTimelinePage.css';

const IconMap = {
    SUCCESS: <HiOutlineCheckCircle />,
    WARNING: <HiOutlineExclamationTriangle />,
    DANGER: <HiOutlineExclamationCircle />,
    INFO: <HiOutlineInformationCircle />
};

const ActivityTimelinePage = () => {
    const [filter, setFilter] = useState('All');

    const modules = ['All', 'Subscription', 'Invoice', 'Payment', 'Discount', 'System'];

    const filteredTimeline = filter === 'All'
        ? mockActivityTimeline
        : mockActivityTimeline.filter(event => event.module === filter);

    return (
        <div className="activity-page">
            <PageHeader
                title="Activity Log"
                subtitle="System-wide audit trail for all operational events."
            />

            <div className="activity-page__filters">
                {modules.map(mod => (
                    <button
                        key={mod}
                        className={`activity-page__filter-btn ${filter === mod ? 'is-active' : ''}`}
                        onClick={() => setFilter(mod)}
                    >
                        {mod}
                    </button>
                ))}
            </div>

            <Card className="activity-page__timeline-card">
                {filteredTimeline.length === 0 ? (
                    <div className="activity-page__empty">
                        No activity found for module: {filter}
                    </div>
                ) : (
                    <div className="activity-timeline">
                        {filteredTimeline.map(event => (
                            <div key={event.id} className="activity-timeline__item">
                                <div className={`activity-timeline__node activity-timeline__node--${event.type.toLowerCase()}`}>
                                    {IconMap[event.type] || IconMap.INFO}
                                </div>
                                <div className="activity-timeline__content">
                                    <div className="activity-timeline__header">
                                        <h4>{event.action}</h4>
                                        <span className="activity-timeline__time">{timeAgo(event.timestamp)}</span>
                                    </div>
                                    <p className="activity-timeline__details">{event.details}</p>
                                    <div className="activity-timeline__meta">
                                        <span className="activity-timeline__actor">Actor: {event.actor}</span>
                                        <span className="activity-timeline__module-badge">{event.module}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Card>
        </div>
    );
};

export default ActivityTimelinePage;
