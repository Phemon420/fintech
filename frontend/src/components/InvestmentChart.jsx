import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
} from 'recharts'
import { investmentPerformance } from '../data/mockData'

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const formatted = new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(payload[0].value)

        return (
            <div
                className="px-3 py-2 rounded-lg text-xs"
                style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
            >
                <p className="font-medium" style={{ color: '#111827' }}>{label}</p>
                <p style={{ color: '#7C3AED' }} className="font-semibold">{formatted}</p>
            </div>
        )
    }
    return null
}

const formatYAxis = (val) => {
    if (val >= 1000000) return `₹${(val / 1000000).toFixed(1)}M`
    if (val >= 1000) return `₹${(val / 1000).toFixed(0)}K`
    return `₹${val}`
}

export default function InvestmentChart() {
    return (
        <div
            className="rounded-2xl p-6"
            style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                boxShadow: '0px 1px 2px rgba(0,0,0,0.04)',
            }}
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold" style={{ color: '#111827' }}>
                    Investment Performance
                </h3>
                <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: '#EDE9FE', color: '#7C3AED' }}
                >
                    12 Months
                </span>
            </div>
            <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={investmentPerformance}>
                        <defs>
                            <linearGradient id="investGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.15} />
                                <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 11, fill: '#9CA3AF' }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 11, fill: '#9CA3AF' }}
                            tickFormatter={formatYAxis}
                            width={55}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="none"
                            fill="url(#investGradient)"
                        />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#7C3AED"
                            strokeWidth={2.5}
                            dot={false}
                            activeDot={{ r: 5, fill: '#7C3AED', stroke: '#fff', strokeWidth: 2 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
