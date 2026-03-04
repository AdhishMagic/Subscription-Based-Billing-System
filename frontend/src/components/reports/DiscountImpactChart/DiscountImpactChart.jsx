import {
    ComposedChart,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import './DiscountImpactChart.css';

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;

    return (
        <div className="discount-tooltip">
            <p className="discount-tooltip__label">{label}</p>
            {payload.map((entry, index) => (
                <div key={index} className="discount-tooltip__row">
                    <span
                        className="discount-tooltip__dot"
                        style={{ background: entry.color }}
                    />
                    <span className="discount-tooltip__name">{entry.name}:</span>
                    <span className="discount-tooltip__value">
                        ${entry.value.toLocaleString('en-US')}
                    </span>
                </div>
            ))}
        </div>
    );
};

const DiscountImpactChart = ({ data }) => {
    const totalDiscount = data.reduce((sum, item) => sum + item.discount, 0);

    return (
        <div className="discount-chart">
            <div className="discount-chart__header">
                <div>
                    <h3 className="discount-chart__title">Discount Impact</h3>
                    <p className="discount-chart__subtitle">
                        Total Discounts Applied:
                        <span className="discount-chart__highlight"> ${totalDiscount.toLocaleString('en-US')}</span>
                    </p>
                </div>
            </div>

            <div className="discount-chart__body">
                <ResponsiveContainer width="100%" height={280}>
                    <ComposedChart
                        data={data}
                        margin={{ top: 20, right: 20, left: -10, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#bfffc7" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#bfffc7" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 6" vertical={false} stroke="rgba(255, 255, 255, 0.05)" />
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#8892b0', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            yAxisId="left"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#8892b0', fontSize: 12 }}
                            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                            dx={-5}
                        />
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#ff8a80', fontSize: 12 }}
                            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                            dx={5}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.02)' }} />
                        <Legend wrapperStyle={{ paddingTop: '15px' }} />

                        <Area
                            yAxisId="left"
                            type="monotone"
                            dataKey="revenue"
                            name="Revenue"
                            fill="url(#revenueFill)"
                            stroke="#bfffc7"
                            strokeWidth={2}
                            animationDuration={2000}
                        />
                        <Bar
                            yAxisId="right"
                            dataKey="discount"
                            name="Discount Given"
                            barSize={30}
                            fill="var(--color-error)"
                            radius={[4, 4, 0, 0]}
                            animationDuration={1500}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DiscountImpactChart;
