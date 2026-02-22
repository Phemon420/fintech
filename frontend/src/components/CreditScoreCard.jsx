import { ShieldCheck } from 'lucide-react'
import { creditScore } from '../data/mockData'

export default function CreditScoreCard() {
    const { score, maxScore, status, lastUpdated, factors } = creditScore
    const percentage = (score / maxScore) * 100

    // Color based on score
    const getScoreColor = () => {
        if (score >= 750) return '#16A34A'
        if (score >= 650) return '#F97316'
        return '#DC2626'
    }

    const scoreColor = getScoreColor()

    // SVG arc for gauge
    const radius = 70
    const strokeWidth = 10
    const normalizedRadius = radius - strokeWidth / 2
    const circumference = Math.PI * normalizedRadius // half circle
    const strokeDashoffset = circumference - (percentage / 100) * circumference

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
                    Credit Score
                </h3>
                <ShieldCheck className="w-5 h-5" style={{ color: scoreColor }} />
            </div>

            {/* Gauge */}
            <div className="flex flex-col items-center mb-4">
                <svg width={radius * 2} height={radius + 10} className="overflow-visible">
                    {/* Background arc */}
                    <path
                        d={`M ${strokeWidth / 2} ${radius} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${radius * 2 - strokeWidth / 2} ${radius}`}
                        fill="none"
                        stroke="#F3F4F6"
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                    />
                    {/* Score arc */}
                    <path
                        d={`M ${strokeWidth / 2} ${radius} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${radius * 2 - strokeWidth / 2} ${radius}`}
                        fill="none"
                        stroke={scoreColor}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        style={{ transition: 'stroke-dashoffset 1s ease' }}
                    />
                    <text
                        x={radius}
                        y={radius - 10}
                        textAnchor="middle"
                        className="text-3xl font-bold"
                        style={{ fill: '#111827', fontSize: '28px', fontWeight: 700 }}
                    >
                        {score}
                    </text>
                    <text
                        x={radius}
                        y={radius + 12}
                        textAnchor="middle"
                        className="text-xs"
                        style={{ fill: scoreColor, fontSize: '12px', fontWeight: 600 }}
                    >
                        {status}
                    </text>
                </svg>
            </div>

            <p className="text-center text-xs mb-4" style={{ color: '#9CA3AF' }}>
                Last updated: {lastUpdated}
            </p>

            {/* Factors */}
            <div className="space-y-2">
                {factors.map((factor) => (
                    <div
                        key={factor.label}
                        className="flex items-center justify-between px-3 py-2 rounded-lg"
                        style={{ backgroundColor: '#F9FAFB' }}
                    >
                        <span className="text-xs" style={{ color: '#6B7280' }}>
                            {factor.label}
                        </span>
                        <span
                            className="text-xs font-semibold"
                            style={{
                                color: factor.icon === '✓' ? '#16A34A' : '#F97316',
                            }}
                        >
                            {factor.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
