import { PieChart, Pie, Sector, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28AFF"];

function TypePieChart( {query} ) {

    if (query.isLoading) return <p>Data is loading...</p>
    if (query.error) return <p>Error loading data</p>
    
    const coloredData = query.data.map((entry, index) => ({
        ...entry,
        fill: COLORS[index % COLORS.length]
    })); // Manually assign color fill for each data for Legend to refer to

    return (
        <PieChart width={400} height={400}>
            <Pie
                data={coloredData}
                dataKey="total"
                nameKey="transaction_type"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
                shape={(props) => {
                    const color = COLORS[props.index % COLORS.length];
                    return <Sector {...props} fill={color} />;
                }}
            >
            </Pie>

            <Tooltip />
            <Legend />
        </PieChart>
    )
}

export default TypePieChart
