import { FiFilter, FiCalendar, FiDownload } from 'react-icons/fi';
import './ReportsFilterPanel.css';

const ReportsFilterPanel = () => {
    return (
        <div className="reports-filters">
            <div className="reports-filters__group">
                <div className="reports-filters__item">
                    <FiCalendar className="reports-filters__icon" />
                    <select className="reports-filters__select" aria-label="Date Range">
                        <option value="last-30">Last 30 Days</option>
                        <option value="last-90">Last 90 Days</option>
                        <option value="ytd">Year to Date</option>
                        <option value="all">All Time</option>
                    </select>
                </div>

                <div className="reports-filters__item">
                    <FiFilter className="reports-filters__icon" />
                    <select className="reports-filters__select" aria-label="Filter by Plan">
                        <option value="all">All Plans</option>
                        <option value="basic">Basic Plan</option>
                        <option value="pro">Pro Plan</option>
                        <option value="enterprise">Enterprise</option>
                    </select>
                </div>

                <div className="reports-filters__item">
                    <FiFilter className="reports-filters__icon" />
                    <select className="reports-filters__select" aria-label="Filter by Customer">
                        <option value="all">All Customers</option>
                        <option value="b2b">B2B Clients</option>
                        <option value="b2c">B2C Customers</option>
                    </select>
                </div>
            </div>

            <div className="reports-filters__actions">
                <button className="reports-filters__export-btn" aria-label="Export Data">
                    <FiDownload className="reports-filters__export-icon" />
                    <span>Export CSV</span>
                </button>
                <button className="reports-filters__export-btn reports-filters__export-btn--pdf" aria-label="Export Data">
                    <FiDownload className="reports-filters__export-icon" />
                    <span>Export PDF</span>
                </button>
            </div>
        </div>
    );
};

export default ReportsFilterPanel;
