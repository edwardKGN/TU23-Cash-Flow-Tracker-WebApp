import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

function MonthlyChart({ data }) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    data = data.map(d => ({
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
