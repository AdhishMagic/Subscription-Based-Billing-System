/* ==========================================================================
   SUBSCRIPTION DETAIL PAGE
   Comprehensive subscription view with:
   - Lifecycle stepper (horizontal progress)
   - Summary panel
   - Status action buttons (transition controls)
   - Order lines (read-only)
   - Financial breakdown
   - Activity timeline

   Layout:
   ┌──────────────────────────────────────────────────────┐
   │ Header: Back + Sub# + Status Badge + Action Buttons  │
   ├──────────────────────────────────────────────────────┤
   │ Lifecycle Stepper (Draft → ... → Closed)             │
   ├──────────────────────────────────────────────────────┤
   │ Summary Panel        │  Financial Breakdown          │
   ├──────────────────────────────────────────────────────┤
   │ Order Lines Table (read-only)                        │
   ├──────────────────────────────────────────────────────┤
   │ Activity Timeline                                    │
   └──────────────────────────────────────────────────────┘
   ========================================================================== */

import { useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    HiOutlineArrowLeft,
    HiOutlineDocumentText,
    HiOutlineCheckCircle,
    HiOutlineBolt,
    HiOutlineLockClosed,
    HiOutlineCalendar,
    HiOutlineUser,
    HiOutlineCreditCard,
    HiOutlineRectangleStack,
} from 'react-icons/hi2';
import useSubscriptions from '../../hooks/useSubscriptions';
import useToast from '../../hooks/useToast';
import LifecycleStepper from './components/LifecycleStepper';
import StatusBadge from './components/StatusBadge';
import OrderLinesTable from './components/OrderLinesTable';
import ActivityTimeline from './components/ActivityTimeline';
import { calcOrderTotals, PAYMENT_TERMS_OPTIONS } from '../../data/subscriptionsMockData';
import './SubscriptionDetailPage.css';

const SubscriptionDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getSubscriptionById, getNextStatus, transitionStatus } = useSubscriptions();
    const { success } = useToast();

    const subscription = getSubscriptionById(id);

    const totals = useMemo(() => {
        if (!subscription) return { subtotal: 0, totalTax: 0, grandTotal: 0, taxBreakdown: {} };
        return calcOrderTotals(subscription.orderLines);
    }, [subscription]);

    const nextStatus = useMemo(() => {
        if (!subscription) return null;
        return getNextStatus(subscription.status);
    }, [subscription, getNextStatus]);

    const handleTransition = useCallback(
        (targetStatus) => {
            if (!subscription) return;
            transitionStatus(subscription.id, targetStatus);
            const labels = {
                quotation: 'Converted to Quotation',
                confirmed: 'Quotation Confirmed',
                active: 'Subscription Activated',
                closed: 'Subscription Closed',
            };
            success(labels[targetStatus] || `Status changed to ${targetStatus}`);
        },
        [subscription, transitionStatus, success]
    );

    const formatDate = (dateStr) => {
        if (!dateStr) return '—';
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const formatCurrency = (val) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

    const getPaymentTermLabel = (value) => {
        const term = PAYMENT_TERMS_OPTIONS.find((t) => t.value === value);
        return term ? term.label : value;
    };

    // ── 404 State ─────────────────────────────────────────────────────────

    if (!subscription) {
        return (
            <div className="sub-detail sub-detail--not-found">
                <h2>Subscription not found</h2>
                <p>The subscription you are looking for does not exist or has been deleted.</p>
                <button className="sub-detail__back-link" onClick={() => navigate('/subscriptions')}>
                    <HiOutlineArrowLeft /> Back to Subscriptions
                </button>
            </div>
        );
    }

    // ── Action Button Config ──────────────────────────────────────────────

    const ACTION_BUTTONS = {
        quotation: { label: 'Convert to Quotation', icon: HiOutlineDocumentText, className: 'sub-detail__action--quotation' },
        confirmed: { label: 'Confirm', icon: HiOutlineCheckCircle, className: 'sub-detail__action--confirmed' },
        active: { label: 'Activate', icon: HiOutlineBolt, className: 'sub-detail__action--active' },
        closed: { label: 'Close', icon: HiOutlineLockClosed, className: 'sub-detail__action--closed' },
    };

    const actionConfig = nextStatus ? ACTION_BUTTONS[nextStatus] : null;

    return (
        <div className="sub-detail" id="sub-detail-page">
            {/* ── Header ────────────────────────────────────────────── */}
            <header className="sub-detail__header">
                <div className="sub-detail__header-left">
                    <button className="sub-detail__back-btn" onClick={() => navigate('/subscriptions')}>
                        <HiOutlineArrowLeft />
                    </button>
                    <div>
                        <div className="sub-detail__title-row">
                            <h1 className="sub-detail__heading">{subscription.subscriptionNumber}</h1>
                            <StatusBadge status={subscription.status} size="lg" />
                        </div>
                        <p className="sub-detail__subheading">
                            {subscription.customerName} · {subscription.planName}
                        </p>
                    </div>
                </div>

                {actionConfig && (
                    <button
                        className={`sub-detail__action-btn ${actionConfig.className}`}
                        onClick={() => handleTransition(nextStatus)}
                    >
                        <actionConfig.icon />
                        {actionConfig.label}
                    </button>
                )}
            </header>

            {/* ── Lifecycle Stepper ─────────────────────────────────── */}
            <div className="sub-detail__panel sub-detail__stepper-panel">
                <LifecycleStepper currentStatus={subscription.status} />
            </div>

            {/* ── Summary + Financial ───────────────────────────────── */}
            <div className="sub-detail__duo-grid">
                {/* Summary Panel */}
                <div className="sub-detail__panel">
                    <h2 className="sub-detail__panel-title">Subscription Summary</h2>
                    <div className="sub-detail__info-grid">
                        <div className="sub-detail__info-item">
                            <div className="sub-detail__info-icon"><HiOutlineUser /></div>
                            <div>
                                <span className="sub-detail__info-label">Customer</span>
                                <span className="sub-detail__info-value">{subscription.customerName}</span>
                            </div>
                        </div>
                        <div className="sub-detail__info-item">
                            <div className="sub-detail__info-icon"><HiOutlineRectangleStack /></div>
                            <div>
                                <span className="sub-detail__info-label">Plan</span>
                                <span className="sub-detail__info-value">{subscription.planName}</span>
                            </div>
                        </div>
                        <div className="sub-detail__info-item">
                            <div className="sub-detail__info-icon"><HiOutlineCalendar /></div>
                            <div>
                                <span className="sub-detail__info-label">Start Date</span>
                                <span className="sub-detail__info-value">{formatDate(subscription.startDate)}</span>
                            </div>
                        </div>
                        <div className="sub-detail__info-item">
                            <div className="sub-detail__info-icon"><HiOutlineCalendar /></div>
                            <div>
                                <span className="sub-detail__info-label">Expiration</span>
                                <span className="sub-detail__info-value">{formatDate(subscription.expirationDate)}</span>
                            </div>
                        </div>
                        <div className="sub-detail__info-item">
                            <div className="sub-detail__info-icon"><HiOutlineCreditCard /></div>
                            <div>
                                <span className="sub-detail__info-label">Payment Terms</span>
                                <span className="sub-detail__info-value">{getPaymentTermLabel(subscription.paymentTerms)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Financial Panel */}
                <div className="sub-detail__panel sub-detail__financial-panel">
                    <h2 className="sub-detail__panel-title">Financial Breakdown</h2>
                    <div className="sub-detail__financial">
                        <div className="sub-detail__fin-row">
                            <span className="sub-detail__fin-label">Subtotal</span>
                            <span className="sub-detail__fin-value">{formatCurrency(totals.subtotal)}</span>
                        </div>
                        {Object.entries(totals.taxBreakdown).map(([rate, amount]) => (
                            <div key={rate} className="sub-detail__fin-row sub-detail__fin-row--tax">
                                <span className="sub-detail__fin-label">Tax ({rate})</span>
                                <span className="sub-detail__fin-value">{formatCurrency(amount)}</span>
                            </div>
                        ))}
                        <div className="sub-detail__fin-row sub-detail__fin-row--total-tax">
                            <span className="sub-detail__fin-label">Total Tax</span>
                            <span className="sub-detail__fin-value">{formatCurrency(totals.totalTax)}</span>
                        </div>
                        <div className="sub-detail__fin-row sub-detail__fin-row--grand">
                            <span className="sub-detail__fin-label">Grand Total</span>
                            <span className="sub-detail__fin-value sub-detail__grand-total">
                                {formatCurrency(totals.grandTotal)}
                            </span>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="sub-detail__stats">
                        <div className="sub-detail__stat">
                            <span className="sub-detail__stat-value">{subscription.orderLines.length}</span>
                            <span className="sub-detail__stat-label">Line Items</span>
                        </div>
                        <div className="sub-detail__stat">
                            <span className="sub-detail__stat-value">
                                {subscription.orderLines.reduce((sum, l) => sum + l.quantity, 0)}
                            </span>
                            <span className="sub-detail__stat-label">Total Units</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Order Lines ───────────────────────────────────────── */}
            <div className="sub-detail__panel">
                <OrderLinesTable orderLines={subscription.orderLines} readOnly />
            </div>

            {/* ── Activity Timeline ─────────────────────────────────── */}
            <div className="sub-detail__panel">
                <ActivityTimeline activities={subscription.activity} />
            </div>
        </div>
    );
};

export default SubscriptionDetailPage;
