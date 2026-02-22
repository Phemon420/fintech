import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    LayoutDashboard,
    Wallet,
    TrendingUp,
    ArrowLeftRight,
    ShieldCheck,
    Settings,
    ChevronDown,
    ChevronRight,
    LogOut,
} from 'lucide-react'
import { bankAccounts } from '../data/mockData'

const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    {
        label: 'Accounts',
        icon: Wallet,
        path: '/accounts',
        children: bankAccounts.map((b) => ({ label: b.bank, path: `/accounts/${b.id}` })),
    },
    { label: 'Investments', icon: TrendingUp, path: '/investments' },
    { label: 'Transactions', icon: ArrowLeftRight, path: '/transactions' },
    { label: 'Credit Score', icon: ShieldCheck, path: '/credit-score' },
    { label: 'Settings', icon: Settings, path: '/settings' },
]

export default function Sidebar() {
    const navigate = useNavigate()
    const [active, setActive] = useState('Dashboard')
    const [expandedMenus, setExpandedMenus] = useState({})

    const toggleExpand = (label) => {
        setExpandedMenus((prev) => ({ ...prev, [label]: !prev[label] }))
    }

    return (
        <aside
            className="fixed left-0 top-0 h-screen w-64 flex flex-col z-30"
            style={{ backgroundColor: '#FFFFFF', borderRight: '1px solid #E5E7EB' }}
        >
            {/* Logo */}
            <div className="flex items-center gap-3 px-6 py-6">
                <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}
                >
                    <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight" style={{ color: '#111827' }}>
                    FinVault
                </span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-2 overflow-y-auto">
                <ul className="space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = active === item.label
                        const isExpanded = expandedMenus[item.label]
                        const hasChildren = item.children && item.children.length > 0

                        return (
                            <li key={item.label}>
                                <button
                                    onClick={() => {
                                        setActive(item.label)
                                        if (hasChildren) {
                                            toggleExpand(item.label)
                                        }
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer"
                                    style={{
                                        backgroundColor: isActive ? '#EDE9FE' : 'transparent',
                                        color: isActive ? '#7C3AED' : '#6B7280',
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive) e.currentTarget.style.backgroundColor = '#F9FAFB'
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'
                                    }}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="flex-1 text-left">{item.label}</span>
                                    {hasChildren && (
                                        isExpanded
                                            ? <ChevronDown className="w-4 h-4" />
                                            : <ChevronRight className="w-4 h-4" />
                                    )}
                                </button>

                                {/* Child items */}
                                {hasChildren && isExpanded && (
                                    <ul className="ml-8 mt-1 space-y-0.5">
                                        {item.children.map((child) => (
                                            <li key={child.label}>
                                                <button
                                                    className="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-150 cursor-pointer"
                                                    style={{ color: '#6B7280' }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.color = '#7C3AED'
                                                        e.currentTarget.style.backgroundColor = '#F5F3FF'
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.color = '#6B7280'
                                                        e.currentTarget.style.backgroundColor = 'transparent'
                                                    }}
                                                >
                                                    {child.label}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        )
                    })}
                </ul>
            </nav>

            {/* Footer */}
            <div className="px-3 py-4" style={{ borderTop: '1px solid #E5E7EB' }}>
                <button
                    onClick={() => navigate('/login')}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200 cursor-pointer"
                    style={{ color: '#6B7280' }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#FEF2F2'
                        e.currentTarget.style.color = '#DC2626'
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent'
                        e.currentTarget.style.color = '#6B7280'
                    }}
                >
                    <LogOut className="w-5 h-5" />
                    <span>Log Out</span>
                </button>
            </div>
        </aside>
    )
}
