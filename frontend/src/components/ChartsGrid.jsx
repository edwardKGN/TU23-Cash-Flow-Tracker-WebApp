import ExpensePieChart from "./ExpensePieChart";
import TypePieChart from "./TypePieChart";
import MonthlyChart from "./MonthlyChart";

function ChartsGrid({ categoryData, typeData, monthlyData }) {
    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginBottom: "20px"
          }}>
            <div>
                <h3>Expenses by Category</h3>
                <ExpensePieChart data={categoryData}/>
            </div>

            <div>
                <h3>Income vs Expense</h3>
                <TypePieChart data={typeData} />
            </div>

            <div>
                <h3>Monthly Trend</h3>
                <MonthlyChart data={monthlyData} />
            </div>
        </div>
    )
};

export default ChartsGrid;