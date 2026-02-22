import { TrendingUp, TrendingDown } from 'lucide-react'
import { netWorth } from '../data/mockData'

export default function NetWorthCard() {
    const isPositive = netWorth.change >= 0

    const formatCurrency = (num) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 2,
        }).format(num)
    }

    return (
        <div
            className="rounded-2xl p-6 relative overflow-hidden"
            style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                boxShadow: '0px 1px 2px rgba(0,0,0,0.04)',
            }}
        >
            {/* Background gradient accent */}
            <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-20"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #F97316)' }}
            ></div>

            <div className="relative z-10">
                <p className="text-sm font-medium mb-1" style={{ color: '#6B7280' }}>
                    Total Net Worth
                </p>
                <h2 className="text-4xl font-bold tracking-tight mb-3" style={{ color: '#111827' }}>
                    {formatCurrency(netWorth.total)}
                </h2>
                <div className="flex items-center gap-2">
                    <div
                        className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
                        style={{
                            backgroundColor: isPositive ? '#F0FDF4' : '#FEF2F2',
                            color: isPositive ? '#16A34A' : '#DC2626',
                        }}
                    >
                        {isPositive ? (
                            <TrendingUp className="w-3.5 h-3.5" />
                        ) : (
                            <TrendingDown className="w-3.5 h-3.5" />
                        )}
                        {isPositive ? '+' : ''}{netWorth.change}%
                    </div>
                    <span className="text-xs" style={{ color: '#6B7280' }}>
                        {isPositive ? '+' : ''}{formatCurrency(netWorth.changeAmount)} this month
                    </span>
                </div>
            </div>
        </div>
    )
}
