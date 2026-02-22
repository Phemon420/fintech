export const netWorth = {
    total: 2847563.42,
    change: 3.24,
    changeAmount: 89234.12,
};

export const bankAccounts = [
    {
        id: 1,
        bank: "HDFC Bank",
        accountNumber: "****4521",
        balance: 845230.50,
        type: "Savings",
        color: "#1E40AF",
        icon: "🏦",
    },
    {
        id: 2,
        bank: "ICICI Bank",
        accountNumber: "****7832",
        balance: 432150.75,
        type: "Current",
        color: "#B91C1C",
        icon: "🏛️",
    },
    {
        id: 3,
        bank: "SBI",
        accountNumber: "****1290",
        balance: 267890.00,
        type: "Savings",
        color: "#1D4ED8",
        icon: "🏢",
    },
    {
        id: 4,
        bank: "Crypto Wallet",
        accountNumber: "****9f3a",
        balance: 1302292.17,
        type: "Wallet",
        color: "#7C3AED",
        icon: "₿",
    },
];

export const assetAllocation = [
    { name: "Stocks", value: 42, color: "#7C3AED" },
    { name: "Crypto", value: 26, color: "#F97316" },
    { name: "Real Estate", value: 18, color: "#A78BFA" },
    { name: "Fixed Deposits", value: 9, color: "#FB923C" },
    { name: "Gold", value: 5, color: "#C4B5FD" },
];

export const investmentPerformance = [
    { month: "Jan", value: 2120000 },
    { month: "Feb", value: 2180000 },
    { month: "Mar", value: 2050000 },
    { month: "Apr", value: 2250000 },
    { month: "May", value: 2310000 },
    { month: "Jun", value: 2280000 },
    { month: "Jul", value: 2450000 },
    { month: "Aug", value: 2520000 },
    { month: "Sep", value: 2480000 },
    { month: "Oct", value: 2610000 },
    { month: "Nov", value: 2720000 },
    { month: "Dec", value: 2847563 },
];

export const spendingByCategory = [
    { category: "Housing", amount: 45000, color: "#F97316" },
    { category: "Food", amount: 18500, color: "#FB923C" },
    { category: "Transport", amount: 12000, color: "#FDBA74" },
    { category: "Shopping", amount: 22000, color: "#F97316" },
    { category: "Healthcare", amount: 8500, color: "#FB923C" },
    { category: "Entertainment", amount: 15000, color: "#FDBA74" },
    { category: "Utilities", amount: 6800, color: "#F97316" },
];

export const creditScore = {
    score: 782,
    maxScore: 900,
    status: "Excellent",
    lastUpdated: "Feb 15, 2026",
    factors: [
        { label: "Payment History", status: "Good", icon: "✓" },
        { label: "Credit Utilization", status: "Low", icon: "✓" },
        { label: "Credit Age", status: "Fair", icon: "~" },
        { label: "Total Accounts", status: "Good", icon: "✓" },
    ],
};

export const recentTransactions = [
    {
        id: 1,
        description: "Salary Credit",
        category: "Income",
        amount: 185000,
        type: "credit",
        date: "Feb 20, 2026",
        bank: "HDFC Bank",
    },
    {
        id: 2,
        description: "Amazon Shopping",
        category: "Shopping",
        amount: -4599,
        type: "debit",
        date: "Feb 19, 2026",
        bank: "ICICI Bank",
    },
    {
        id: 3,
        description: "Electricity Bill",
        category: "Utilities",
        amount: -2340,
        type: "debit",
        date: "Feb 18, 2026",
        bank: "HDFC Bank",
    },
    {
        id: 4,
        description: "Freelance Payment",
        category: "Income",
        amount: 45000,
        type: "credit",
        date: "Feb 17, 2026",
        bank: "SBI",
    },
    {
        id: 5,
        description: "Swiggy Order",
        category: "Food",
        amount: -850,
        type: "debit",
        date: "Feb 17, 2026",
        bank: "ICICI Bank",
    },
    {
        id: 6,
        description: "Mutual Fund SIP",
        category: "Investment",
        amount: -25000,
        type: "debit",
        date: "Feb 15, 2026",
        bank: "HDFC Bank",
    },
    {
        id: 7,
        description: "Dividend Income",
        category: "Income",
        amount: 12500,
        type: "credit",
        date: "Feb 14, 2026",
        bank: "SBI",
    },
    {
        id: 8,
        description: "Uber Ride",
        category: "Transport",
        amount: -380,
        type: "debit",
        date: "Feb 14, 2026",
        bank: "ICICI Bank",
    },
];
