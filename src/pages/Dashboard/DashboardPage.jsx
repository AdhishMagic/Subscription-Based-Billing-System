/* ==========================================================================
   DASHBOARD PAGE
   Main analytics dashboard orchestrating all dashboard components.

   Layout grid:
   ┌─────────┬─────────┬─────────┬─────────┐
   │ Metric  │ Metric  │ Metric  │ Metric  │   ← 4-column KPI row
   ├─────────┴─────────┴─────────┴─────────┤
   │                                       │
   │           Revenue Chart               │   ← Full-width chart
   │                                       │
   ├───────────────────────┬───────────────┤
   │  Subscription Status  │   Recent      │   ← 2-column split
   │  (Donut Chart)        │   Activity    │
   └───────────────────────┴───────────────┘

   Responsive breakpoints:
   - Desktop (>1024px): 4-column metrics, 2-column bottom
   - Tablet (769–1024px): 2-column metrics, stacked bottom
   - Mobile (<768px): 1-column everything
   ========================================================================== */

import MetricCard from '../../components/dashboard/MetricCard/MetricCard';
import RevenueChart from '../../components/dashboard/RevenueChart/RevenueChart';
import SubscriptionStatusChart from '../../components/dashboard/SubscriptionStatusChart/SubscriptionStatusChart';
import RecentActivity from '../../components/dashboard/RecentActivity/RecentActivity';
import {
    metricCardsData,
    revenueChartData,
    subscriptionStatusData,
    recentActivityData,
} from '../../data/dashboardMockData';
import './DashboardPage.css';

const DashboardPage = () => {
    return (
        <div className="dashboard-page" id="dashboard-page">
            {/* ── Page Header ──────────────────────────────────────────────── */}
            <header className="dashboard-page__header">
                <div>
                    <h1 className="dashboard-page__heading">Dashboard</h1>
                    <p className="dashboard-page__subheading">
                        Your subscription business at a glance
                    </p>
                </div>
                <div className="dashboard-page__header-actions">
                    <span className="dashboard-page__live-indicator">
                        <span className="dashboard-page__live-dot" />
                        Live
                    </span>
                </div>
            </header>

            {/* ── Metric Cards Grid ────────────────────────────────────────── */}
            <section className="dashboard-page__metrics" aria-label="Key Performance Indicators">
                {metricCardsData.map((metric, index) => (
                    <MetricCard
                        key={metric.id}
                        label={metric.label}
                        value={metric.value}
                        prefix={metric.prefix}
                        suffix={metric.suffix}
                        trend={metric.trend}
                        icon={metric.icon}
                        delay={index * 100}
                    />
                ))}
            </section>

            {/* ── Revenue Chart (full-width) ───────────────────────────────── */}
            <section className="dashboard-page__revenue" aria-label="Revenue Overview">
                <RevenueChart data={revenueChartData} />
            </section>

            {/* ── Bottom Row: Status + Activity ────────────────────────────── */}
            <section className="dashboard-page__bottom-row">
                <div className="dashboard-page__status-col">
                    <SubscriptionStatusChart data={subscriptionStatusData} />
                </div>
                <div className="dashboard-page__activity-col">
                    <RecentActivity data={recentActivityData} />
                </div>
            </section>
        </div>
    );
};

export default DashboardPage;
