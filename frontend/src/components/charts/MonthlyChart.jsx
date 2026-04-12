import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

function MonthlyChart({ query }) {

    if (query.isLoading) return <p>Data is loading...</p>
    if (query.error) return <p>Error loading data</p>

    // console.log("query > ", query)

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const sortedMonthlyData = [...query.data].sort((a, b) => a.month - b.month);
    
    const data = sortedMonthlyData.map(d => ({
        ...d, 
        monthLabel: monthNames[d.month -1]
    }))

    return (
        <LineChart width={600} height={300} data={data}>
            <XAxis dataKey="monthLabel" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line type="monotone" dataKey="income" stroke="#0000FF"/>
            <Line type="monotone" dataKey="expense" stroke="#FF0000"/>
        </LineChart>
    );
}

export default MonthlyChart;
