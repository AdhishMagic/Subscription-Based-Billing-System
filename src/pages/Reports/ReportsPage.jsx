import { lazy, Suspense } from 'react';
import MetricCard from '../../components/dashboard/MetricCard/MetricCard';
import ReportsFilterPanel from '../../components/reports/ReportsFilterPanel/ReportsFilterPanel';

import {
    reportKPIs,
    revenueTrendData,
    subscriptionDistributionData,
    paymentInsightsData,
    discountImpactData,
    taxSummaryData
} from '../../data/mockReports';
import './ReportsPage.css';

// Lazy load heavy chart components
const RevenueChart = lazy(() => import('../../components/dashboard/RevenueChart/RevenueChart'));
const SubscriptionStatusChart = lazy(() => import('../../components/dashboard/SubscriptionStatusChart/SubscriptionStatusChart'));
const PaymentInsightsChart = lazy(() => import('../../components/reports/PaymentInsightsChart/PaymentInsightsChart'));
const DiscountImpactChart = lazy(() => import('../../components/reports/DiscountImpactChart/DiscountImpactChart'));
const TaxSummaryChart = lazy(() => import('../../components/reports/TaxSummaryChart/TaxSummaryChart'));

const ChartSkeleton = () => (
    <div className="reports-page__skeleton">
        <div className="reports-page__skeleton-loader"></div>
    </div>
);

const ReportsPage = () => {
    return (
        <div className="reports-page" id="reports-page">
            {/* ── Page Header ──────────────────────────────────────────────── */}
            <header className="reports-page__header">
                <div>
                    <h1 className="reports-page__heading">Reporting & Analytics</h1>
                    <p className="reports-page__subheading">
                        Executive operational intelligence and insights
                    </p>
                </div>
            </header>

            {/* ── Filters ──────────────────────────────────────────────────── */}
            <section aria-label="Report Filters">
                <ReportsFilterPanel />
            </section>

            {/* ── Metric Cards Grid ────────────────────────────────────────── */}
            <section className="reports-page__metrics" aria-label="Key Performance Indicators">
                {reportKPIs.map((metric, index) => (
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

            {/* ── Charts Grid ──────────────────────────────────────────────── */}
            <Suspense fallback={<ChartSkeleton />}>
                <section className="reports-page__revenue" aria-label="Revenue Overview">
                    <RevenueChart data={revenueTrendData} />
                </section>

                <section className="reports-page__grid-2col">
                    <div className="reports-page__chart-wrapper">
                        <PaymentInsightsChart data={paymentInsightsData} />
                    </div>
                    <div className="reports-page__chart-wrapper">
                        <SubscriptionStatusChart data={subscriptionDistributionData} />
                    </div>
                </section>

                <section className="reports-page__grid-2col">
                    <div className="reports-page__chart-wrapper">
                        <DiscountImpactChart data={discountImpactData} />
                    </div>
                    <div className="reports-page__chart-wrapper">
                        <TaxSummaryChart data={taxSummaryData} />
                    </div>
                </section>
            </Suspense>
        </div>
    );
};

export default ReportsPage;
