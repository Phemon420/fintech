import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'
import { spendingByCategory } from '../data/mockData'

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
                <p style={{ color: '#F97316' }} className="font-semibold">{formatted}</p>
            </div>
        )
    }
    return null
}

const formatYAxis = (val) => {
    if (val >= 1000) return `₹${(val / 1000).toFixed(0)}K`
    return `₹${val}`
}

export default function SpendingChart() {
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
                    Spending by Category
                </h3>
                <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: '#FFF7ED', color: '#F97316' }}
                >
                    This Month
                </span>
            </div>
            <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={spendingByCategory} barCategoryGap="20%">
                        <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                        <XAxis
                            dataKey="category"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 11, fill: '#9CA3AF' }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 11, fill: '#9CA3AF' }}
                            tickFormatter={formatYAxis}
                            width={50}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(249, 115, 22, 0.05)' }} />
                        <Bar
                            dataKey="amount"
                            fill="#F97316"
                            radius={[6, 6, 0, 0]}
                            maxBarSize={36}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
