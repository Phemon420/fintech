import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { assetAllocation } from '../data/mockData'

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div
                className="px-3 py-2 rounded-lg text-xs font-medium"
                style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    color: '#111827',
                }}
            >
                <span style={{ color: payload[0].payload.color }}>● </span>
                {payload[0].name}: {payload[0].value}%
            </div>
        )
    }
    return null
}

export default function AssetAllocationChart() {
    return (
        <div
            className="rounded-2xl p-6"
            style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                boxShadow: '0px 1px 2px rgba(0,0,0,0.04)',
            }}
        >
            <h3 className="text-sm font-semibold mb-4" style={{ color: '#111827' }}>
                Asset Allocation
            </h3>
            <div className="flex items-center gap-6">
                <div className="w-48 h-48">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={assetAllocation}
                                cx="50%"
                                cy="50%"
                                innerRadius={55}
                                outerRadius={80}
                                paddingAngle={3}
                                dataKey="value"
                                stroke="none"
                            >
                                {assetAllocation.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-2.5">
                    {assetAllocation.map((item) => (
                        <div key={item.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-2.5 h-2.5 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                ></div>
                                <span className="text-xs" style={{ color: '#6B7280' }}>
                                    {item.name}
                                </span>
                            </div>
                            <span className="text-xs font-semibold" style={{ color: '#111827' }}>
                                {item.value}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
