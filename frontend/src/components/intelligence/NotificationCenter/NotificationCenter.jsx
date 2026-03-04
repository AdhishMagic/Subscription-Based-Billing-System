import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    HiOutlineBell,
    HiCheckCircle,
    HiExclamationTriangle,
    HiExclamationCircle,
    HiInformationCircle
} from 'react-icons/hi2';
import { useNotification } from '../../../context';
import { timeAgo } from '../../../utils/formatters';
import './NotificationCenter.css';

const IconMap = {
    SUCCESS: <HiCheckCircle className="notif-icon notif-icon--success" />,
    WARNING: <HiExclamationTriangle className="notif-icon notif-icon--warning" />,
    DANGER: <HiExclamationCircle className="notif-icon notif-icon--danger" />,
    INFO: <HiInformationCircle className="notif-icon notif-icon--info" />
};

const NotificationCenter = () => {
    const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotification();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);
    const navigate = useNavigate();

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const handleNotificationClick = (notif) => {
        if (!notif.isRead) markAsRead(notif.id);
        setIsOpen(false);
        if (notif.link) navigate(notif.link);
    };

    return (
        <div className="notif-center" ref={containerRef}>
            <button
                className={`topbar__icon-btn topbar__notification ${isOpen ? 'is-active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Notifications"
            >
                <HiOutlineBell size={20} />
                {unreadCount > 0 && (
                    <span className="topbar__notification-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>
                )}
            </button>

            {isOpen && (
                <div className="notif-dropdown">
                    <div className="notif-dropdown__header">
                        <h3>Notifications</h3>
                        {unreadCount > 0 && (
                            <button className="notif-dropdown__mark-all" onClick={markAllAsRead}>
                                Mark all as read
                            </button>
                        )}
                    </div>

                    <div className="notif-dropdown__body">
                        {notifications.length === 0 ? (
                            <div className="notif-dropdown__empty">
                                <HiOutlineBell size={24} />
                                <p>You're all caught up!</p>
                            </div>
                        ) : (
                            notifications.map(notif => (
                                <button
                                    key={notif.id}
                                    className={`notif-row ${!notif.isRead ? 'is-unread' : ''}`}
                                    onClick={() => handleNotificationClick(notif)}
                                >
                                    <div className="notif-row__icon-container">
                                        {IconMap[notif.type] || IconMap.INFO}
                                    </div>
                                    <div className="notif-row__content">
                                        <div className="notif-row__title">
                                            {notif.title}
                                            {!notif.isRead && <span className="notif-row__unread-dot" />}
                                        </div>
                                        <div className="notif-row__message">{notif.message}</div>
                                        <div className="notif-row__meta">{timeAgo(notif.timestamp)} • {notif.module}</div>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationCenter;
