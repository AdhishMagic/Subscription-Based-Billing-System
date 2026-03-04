import { lazy, Suspense, useMemo } from 'react';
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
    // ── Chart Optimization: Memoized Dataset Transformations ───────────────
    // Simulating O(N) complexity data transformations. By wrapping in useMemo,
    // we guarantee that if <ReportsFilterPanel /> triggers a generic page re-render,
    // we don't recalculate thousands of financial records unless the raw data changes.
    const memoizedRevenueData = useMemo(() => {
        // Placeholder for real mapping/reduction logic
        return revenueTrendData;
    }, [revenueTrendData]);

    const memoizedSubsData = useMemo(() => {
        return subscriptionDistributionData;
    }, [subscriptionDistributionData]);

    const memoizedPaymentData = useMemo(() => {
        return paymentInsightsData;
    }, [paymentInsightsData]);

    const memoizedDiscountData = useMemo(() => {
        return discountImpactData;
    }, [discountImpactData]);

    const memoizedTaxData = useMemo(() => {
        return taxSummaryData;
    }, [taxSummaryData]);

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

            {/* ── Charts Grid (Heavy Components Lazy Loaded) ───────────────── */}
            <Suspense fallback={<ChartSkeleton />}>
                <section className="reports-page__revenue" aria-label="Revenue Overview">
                    <RevenueChart data={memoizedRevenueData} />
                </section>

                <section className="reports-page__grid-2col">
                    <div className="reports-page__chart-wrapper">
                        <PaymentInsightsChart data={memoizedPaymentData} />
                    </div>
                    <div className="reports-page__chart-wrapper">
                        <SubscriptionStatusChart data={memoizedSubsData} />
                    </div>
                </section>

                <section className="reports-page__grid-2col">
                    <div className="reports-page__chart-wrapper">
                        <DiscountImpactChart data={memoizedDiscountData} />
                    </div>
                    <div className="reports-page__chart-wrapper">
                        <TaxSummaryChart data={memoizedTaxData} />
                    </div>
                </section>
            </Suspense>
        </div>
    );
};

export default ReportsPage;
