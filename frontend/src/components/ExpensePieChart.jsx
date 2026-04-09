import { PieChart, Pie, Cell, Tooltip, Legend} from "recharts";

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

export default ExpensePieChart
