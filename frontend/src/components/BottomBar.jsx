import { useState } from 'react'
import { bankAccounts } from '../data/mockData'

export default function BottomBar() {
    const [activeBank, setActiveBank] = useState(bankAccounts[0].id)

    const formatCurrency = (num) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(num)
    }

    return (
        <div
            className="fixed bottom-0 left-64 right-0 z-20 px-6 py-3"
            style={{
                backgroundColor: '#FFFFFF',
                borderTop: '1px solid #E5E7EB',
                boxShadow: '0 -2px 8px rgba(0,0,0,0.04)',
            }}
        >
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
                <span className="text-xs font-semibold shrink-0 mr-1" style={{ color: '#6B7280' }}>
                    CONNECTED BANKS
                </span>
                {bankAccounts.map((account) => {
                    const isActive = activeBank === account.id
                    return (
                        <button
                            key={account.id}
                            onClick={() => setActiveBank(account.id)}
                            className="flex items-center gap-3 px-4 py-2.5 rounded-xl shrink-0 transition-all duration-200 cursor-pointer"
                            style={{
                                backgroundColor: isActive ? '#EDE9FE' : '#F9FAFB',
                                border: isActive ? '1.5px solid #7C3AED' : '1px solid #E5E7EB',
                            }}
                        >
                            <span className="text-xl">{account.icon}</span>
                            <div className="text-left">
                                <p
                                    className="text-xs font-semibold leading-tight"
                                    style={{ color: isActive ? '#7C3AED' : '#111827' }}
                                >
                                    {account.bank}
                                </p>
                                <p className="text-[11px]" style={{ color: '#6B7280' }}>
                                    {account.accountNumber} • {formatCurrency(account.balance)}
                                </p>
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
