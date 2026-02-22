import { bankAccounts } from '../data/mockData'

export default function BankBalancesCard() {
    const formatCurrency = (num) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(num)
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
            <h3 className="text-sm font-semibold mb-4" style={{ color: '#111827' }}>
                Bank Balances
            </h3>
            <div className="space-y-3">
                {bankAccounts.map((account) => (
                    <div
                        key={account.id}
                        className="flex items-center justify-between p-3 rounded-xl transition-colors duration-150"
                        style={{ backgroundColor: '#F9FAFB' }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F3F4F6')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F9FAFB')}
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                                style={{ backgroundColor: account.color + '15', color: account.color }}
                            >
                                {account.icon}
                            </div>
                            <div>
                                <p className="text-sm font-medium" style={{ color: '#111827' }}>
                                    {account.bank}
                                </p>
                                <p className="text-xs" style={{ color: '#6B7280' }}>
                                    {account.type} • {account.accountNumber}
                                </p>
                            </div>
                        </div>
                        <p className="text-sm font-semibold" style={{ color: '#111827' }}>
                            {formatCurrency(account.balance)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
