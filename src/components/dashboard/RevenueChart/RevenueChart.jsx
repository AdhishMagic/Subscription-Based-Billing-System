/* ==========================================================================
   REVENUE CHART COMPONENT
   Monthly Recurring Revenue (MRR) line chart with target overlay.
   Uses Recharts with custom styling that blends with the ViaTunnel theme.

   Props:
   ─ data   Array of { month, revenue, target }
   ========================================================================== */

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';
import './RevenueChart.css';

/* ── Custom Tooltip ────────────────────────────────────────────────────── */

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;

    return (
        <div className="revenue-tooltip">
            <p className="revenue-tooltip__label">{label}</p>
            {payload.map((entry, idx) => (
                <div key={idx} className="revenue-tooltip__row">
                    <span
                        className="revenue-tooltip__dot"
                        style={{ background: entry.color }}
                    />
                    <span className="revenue-tooltip__name">{entry.name}:</span>
                    <span className="revenue-tooltip__value">
                        ${entry.value.toLocaleString('en-US')}
                    </span>
                </div>
            ))}
        </div>
    );
};

/* ── Custom Legend ─────────────────────────────────────────────────────── */

const CustomLegend = ({ payload }) => {
    if (!payload?.length) return null;

    return (
        <div className="revenue-legend">
            {payload.map((entry, idx) => (
                <div key={idx} className="revenue-legend__item">
                    <span
                        className="revenue-legend__dot"
                        style={{ background: entry.color }}
                    />
                    <span className="revenue-legend__text">{entry.value}</span>
                </div>
            ))}
        </div>
    );
};

/* ── Component ─────────────────────────────────────────────────────────── */

const RevenueChart = ({ data }) => {
    return (
        <div className="revenue-chart" id="revenue-chart">
            <div className="revenue-chart__header">
                <div>
                    <h3 className="revenue-chart__title">Revenue Overview</h3>
                    <p className="revenue-chart__subtitle">Monthly Recurring Revenue vs Target</p>
                </div>
                <div className="revenue-chart__period">
                    <span className="revenue-chart__period-badge">Last 12 months</span>
                </div>
            </div>

            <div className="revenue-chart__body">
                <ResponsiveContainer width="100%" height={320}>
                    <AreaChart data={data} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
                        <defs>
                            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#bfffc7" stopOpacity={0.30} />
                                <stop offset="95%" stopColor="#bfffc7" stopOpacity={0.02} />
                            </linearGradient>
                            <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#b7f2f5" stopOpacity={0.15} />
                                <stop offset="95%" stopColor="#b7f2f5" stopOpacity={0.01} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            strokeDasharray="3 6"
                            vertical={false}
                            stroke="rgba(191, 255, 199, 0.06)"
                        />

                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#7ec8b5', fontSize: 12, fontFamily: 'Figtree' }}
                            dy={10}
                        />

                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#7ec8b5', fontSize: 12, fontFamily: 'Figtree' }}
                            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                            dx={-5}
                        />

                        <Tooltip content={<CustomTooltip />} />
                        <Legend content={<CustomLegend />} />

                        <Area
                            type="monotone"
                            dataKey="revenue"
                            name="Revenue"
                            stroke="#bfffc7"
                            strokeWidth={2.5}
                            fill="url(#revenueGradient)"
                            dot={false}
                            activeDot={{
                                r: 5,
                                fill: '#bfffc7',
                                stroke: '#072a24',
                                strokeWidth: 2,
                            }}
                            animationDuration={1800}
                            animationEasing="ease-out"
                        />

                        <Area
                            type="monotone"
                            dataKey="target"
                            name="Target"
                            stroke="#b7f2f5"
                            strokeWidth={1.5}
                            strokeDasharray="6 4"
                            fill="url(#targetGradient)"
                            dot={false}
                            activeDot={{
                                r: 4,
                                fill: '#b7f2f5',
                                stroke: '#072a24',
                                strokeWidth: 2,
                            }}
                            animationDuration={2000}
                            animationEasing="ease-out"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default RevenueChart;
