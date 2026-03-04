import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import './TaxSummaryChart.css';

const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const { name, value } = payload[0];

    return (
        <div className="tax-tooltip">
            <span className="tax-tooltip__dot" style={{ background: payload[0].payload.color }} />
            <span className="tax-tooltip__name">{name}</span>
            <span className="tax-tooltip__value">${value.toLocaleString('en-US')}</span>
        </div>
    );
};

const TaxSummaryChart = ({ data }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="tax-chart">
            <div className="tax-chart__header">
                <div>
                    <h3 className="tax-chart__title">Tax Collection Summary</h3>
                    <p className="tax-chart__subtitle">Total tax collected: ${total.toLocaleString('en-US')}</p>
                </div>
            </div>

            <div className="tax-chart__body">
                <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={100}
                            paddingAngle={4}
                            dataKey="value"
                            stroke="none"
                            animationDuration={1500}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TaxSummaryChart;
