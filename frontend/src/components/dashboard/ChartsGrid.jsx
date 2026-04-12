import ExpensePieChart from "../charts/ExpensePieChart";
import TypePieChart from "../charts/TypePieChart";
import MonthlyChart from "../charts/MonthlyChart";

function ChartsGrid({ categoryQuery, typeQuery, monthlyQuery }) {
    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginBottom: "20px"
          }}>
            <div>
                <h3>Expenses by Category</h3>
                <ExpensePieChart query={categoryQuery}/>
            </div>

            <div>
                <h3>Income vs Expense</h3>
                <TypePieChart query={typeQuery} />
            </div>

            <div>
                <h3>Monthly Trend</h3>
                <MonthlyChart query={monthlyQuery} />
            </div>
        </div>
    )
};

export default ChartsGrid;