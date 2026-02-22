import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { recentTransactions } from '../data/mockData'

export default function RecentTransactions() {
    const formatCurrency = (num) => {
        const abs = Math.abs(num)
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(abs)
    }

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
                    Recent Transactions
                </h3>
                <button
                    className="text-xs font-medium cursor-pointer hover:underline"
                    style={{ color: '#7C3AED' }}
                >
                    View All
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                            <th className="text-left text-xs font-medium pb-3 pr-4" style={{ color: '#9CA3AF' }}>
                                Transaction
                            </th>
                            <th className="text-left text-xs font-medium pb-3 pr-4" style={{ color: '#9CA3AF' }}>
                                Category
                            </th>
                            <th className="text-left text-xs font-medium pb-3 pr-4" style={{ color: '#9CA3AF' }}>
                                Date
                            </th>
                            <th className="text-left text-xs font-medium pb-3 pr-4" style={{ color: '#9CA3AF' }}>
                                Bank
                            </th>
                            <th className="text-right text-xs font-medium pb-3" style={{ color: '#9CA3AF' }}>
                                Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentTransactions.map((tx) => {
                            const isCredit = tx.type === 'credit'
                            return (
                                <tr
                                    key={tx.id}
                                    className="transition-colors duration-100"
                                    style={{ borderBottom: '1px solid #F9FAFB' }}
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FAFAFA')}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                                >
                                    <td className="py-3 pr-4">
                                        <div className="flex items-center gap-2.5">
                                            <div
                                                className="w-8 h-8 rounded-lg flex items-center justify-center"
                                                style={{
                                                    backgroundColor: isCredit ? '#F0FDF4' : '#FEF2F2',
                                                }}
                                            >
                                                {isCredit ? (
                                                    <ArrowDownRight className="w-4 h-4" style={{ color: '#16A34A' }} />
                                                ) : (
                                                    <ArrowUpRight className="w-4 h-4" style={{ color: '#DC2626' }} />
                                                )}
                                            </div>
                                            <span className="text-sm font-medium" style={{ color: '#111827' }}>
                                                {tx.description}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-3 pr-4">
                                        <span
                                            className="text-xs px-2 py-1 rounded-full font-medium"
                                            style={{ backgroundColor: '#F3F4F6', color: '#6B7280' }}
                                        >
                                            {tx.category}
                                        </span>
                                    </td>
                                    <td className="py-3 pr-4">
                                        <span className="text-xs" style={{ color: '#6B7280' }}>
                                            {tx.date}
                                        </span>
                                    </td>
                                    <td className="py-3 pr-4">
                                        <span className="text-xs" style={{ color: '#6B7280' }}>
                                            {tx.bank}
                                        </span>
                                    </td>
                                    <td className="py-3 text-right">
                                        <span
                                            className="text-sm font-semibold"
                                            style={{ color: isCredit ? '#16A34A' : '#DC2626' }}
                                        >
                                            {isCredit ? '+' : '-'}{formatCurrency(tx.amount)}
                                        </span>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
