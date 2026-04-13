import { formatCurrency } from "../../utils/format";

import {
    Wallet,
    ArrowUpRight,
    ArrowDownLeft,
    TrendingUp,
    PieChart,
    Calendar
  } from "lucide-react";

function Card({ title, value, icon: Icon, color }) {
    const colors = {
        green: "text-green-500",
        red: "text-red-500",
        blue: "text-blue-500",
    };

    return(
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow">
            <h4 className="text-sm text-gray-500">{title}</h4>
            <p className={`flex items-center gap-2 text-xl font-bold ${colors[color]}`}> <Icon className={`w-6 h-6 ${colors[color]}`} /> {value}</p>
        </div>
    );
}

function SummaryCards({ summaryQuery }) {
    const data = summaryQuery.data

    if (summaryQuery.isLoading) return <p>Loading data</p>
    if (summaryQuery.error) return <>Error loading data</>

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card 
                title="Income"
                value={formatCurrency(data?.income)}
                icon={ArrowUpRight}
                color="green"
            />
            <Card 
                title="Expense"
                value={formatCurrency(data?.expense)}
                icon={ArrowDownLeft}
                color="red"
            />
            <Card
                title="Net"
                value={formatCurrency(data?.net)}
                icon={Wallet}
                color="blue"
            />
        </div>
    )
}

export default SummaryCards

/* Original
            <p>Income: {summary?.income}</p>
            <p>Expense: {summary?.expense}</p>
            <p>Net: {summary?.net}</p>
*/