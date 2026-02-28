/* ==========================================================================
   SUBSCRIPTION STATUS CHART COMPONENT
   Donut chart showing distribution of subscription statuses.
   Uses Recharts PieChart with custom center label and legend.

   Props:
   ─ data   Array of { name, value, color }
   ========================================================================== */

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import './SubscriptionStatusChart.css';

/* ── Custom Tooltip ────────────────────────────────────────────────────── */

const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const { name, value } = payload[0];

    return (
        <div className="status-tooltip">
            <span className="status-tooltip__dot" style={{ background: payload[0].payload.color }} />
            <span className="status-tooltip__name">{name}</span>
            <span className="status-tooltip__value">{value.toLocaleString('en-US')}</span>
        </div>
    );
};

/* ── Component ─────────────────────────────────────────────────────────── */

const SubscriptionStatusChart = ({ data }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="status-chart" id="subscription-status-chart">
            <div className="status-chart__header">
                <h3 className="status-chart__title">Subscription Status</h3>
                <p className="status-chart__subtitle">Current distribution</p>
            </div>

            <div className="status-chart__body">
                <div className="status-chart__donut-wrapper">
                    <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={65}
                                outerRadius={95}
                                paddingAngle={3}
                                dataKey="value"
                                stroke="none"
                                animationDuration={1400}
                                animationEasing="ease-out"
                            >
                                {data.map((entry, idx) => (
                                    <Cell key={idx} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Center label overlay */}
                    <div className="status-chart__center-label">
                        <span className="status-chart__center-value">
                            {total.toLocaleString('en-US')}
                        </span>
                        <span className="status-chart__center-text">Total</span>
                    </div>
                </div>

                {/* Legend grid */}
                <div className="status-chart__legend">
                    {data.map((item) => {
                        const percentage = ((item.value / total) * 100).toFixed(1);
                        return (
                            <div key={item.name} className="status-chart__legend-item">
                                <div className="status-chart__legend-left">
                                    <span
                                        className="status-chart__legend-dot"
                                        style={{ background: item.color }}
                                    />
                                    <span className="status-chart__legend-name">{item.name}</span>
                                </div>
                                <div className="status-chart__legend-right">
                                    <span className="status-chart__legend-count">
                                        {item.value.toLocaleString('en-US')}
                                    </span>
                                    <span className="status-chart__legend-pct">{percentage}%</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SubscriptionStatusChart;
