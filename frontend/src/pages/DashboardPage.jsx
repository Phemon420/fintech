import NetWorthCard from '../components/NetWorthCard'
import AssetAllocationChart from '../components/AssetAllocationChart'
import BankBalancesCard from '../components/BankBalancesCard'
import InvestmentChart from '../components/InvestmentChart'
import SpendingChart from '../components/SpendingChart'
import CreditScoreCard from '../components/CreditScoreCard'
import RecentTransactions from '../components/RecentTransactions'

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold" style={{ color: '#111827' }}>
                    Dashboard
                </h1>
                <p className="text-sm mt-1" style={{ color: '#6B7280' }}>
                    Welcome back! Here's your financial overview.
                </p>
            </div>

            {/* Row 1: Net Worth + Asset Allocation */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <NetWorthCard />
                </div>
                <div>
                    <AssetAllocationChart />
                </div>
            </div>

            {/* Row 2: Investment + Spending */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <InvestmentChart />
                <SpendingChart />
            </div>

            {/* Row 3: Bank Balances + Credit Score */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <BankBalancesCard />
                </div>
                <div>
                    <CreditScoreCard />
                </div>
            </div>

            <RecentTransactions />
        </div>
    )
}
