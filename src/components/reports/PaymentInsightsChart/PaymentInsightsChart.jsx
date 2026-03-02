import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import './PaymentInsightsChart.css';

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;

    return (
        <div className="payment-tooltip">
            <p className="payment-tooltip__label">{label}</p>
            {payload.map((entry, index) => (
                <div key={index} className="payment-tooltip__row">
                    <span
                        className="payment-tooltip__dot"
                        style={{ background: entry.color }}
                    />
                    <span className="payment-tooltip__name">{entry.name}:</span>
                    <span className="payment-tooltip__value">
                        ${entry.value.toLocaleString('en-US')}
                    </span>
                </div>
            ))}
        </div>
    );
};

const PaymentInsightsChart = ({ data }) => {
    return (
        <div className="payment-chart">
            <div className="payment-chart__header">
                <div>
                    <h3 className="payment-chart__title">Payment Insights</h3>
                    <p className="payment-chart__subtitle">Completed vs Pending vs Failed</p>
                </div>
            </div>

            <div className="payment-chart__body">
                <ResponsiveContainer width="100%" height={320}>
                    <BarChart
                        data={data}
                        margin={{ top: 20, right: 30, left: -10, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 6" vertical={false} stroke="rgba(255, 255, 255, 0.05)" />
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#8892b0', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#8892b0', fontSize: 12 }}
                            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                            dx={-5}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.02)' }} />
                        <Legend wrapperStyle={{ paddingTop: '20px' }} />
                        <Bar dataKey="completed" name="Completed" stackId="a" fill="var(--color-success)" radius={[0, 0, 4, 4]} animationDuration={1500} />
                        <Bar dataKey="pending" name="Pending" stackId="a" fill="var(--color-warning)" animationDuration={1500} />
                        <Bar dataKey="failed" name="Failed" stackId="a" fill="var(--color-error)" radius={[4, 4, 0, 0]} animationDuration={1500} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PaymentInsightsChart;
