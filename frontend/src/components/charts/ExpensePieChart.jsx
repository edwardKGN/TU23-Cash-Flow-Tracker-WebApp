import { PieChart, Pie, Sector, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28AFF"];

function ExpensePieChart( {query} ) {

    if (query.isLoading) return <p>Data is loading...</p>
    if (query.error) return <p>Error loading data</p>
    
    // console.log("query > ", query)
    // TODO if data not available to report no data present
    
    const coloredData = query.data.map((entry, index) => ({
        ...entry,
        fill: COLORS[index % COLORS.length]
    })); // Manually assign color fill for each data for Legend to refer to

    return (
        <PieChart width={400} height={400}>
            <Pie
                data={coloredData}
                dataKey="total"
                nameKey="category"
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

export default ExpensePieChart

/*
Legacy Codes

function ExpensePieChart( {data} ) {
    return (
        <PieChart width={400} height={400}>
            <Pie
                data={data}
                dataKey="total"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
            >
                {data.map((entry, index) => (
                    <Cell key={index} />
                ))}
            </Pie>

            <Tooltip />
            <Legend />
        </PieChart>
    )
}

*/