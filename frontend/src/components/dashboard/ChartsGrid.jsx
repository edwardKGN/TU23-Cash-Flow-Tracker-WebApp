import ExpensePieChart from "../charts/ExpensePieChart";
import TypePieChart from "../charts/TypePieChart";
import MonthlyChart from "../charts/MonthlyChart";

function Card({ title, children }) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
        <h3 className="font-semibold mb-4">{title}</h3>
        {children}
      </div>
    );
  }


function ChartsGrid({ categoryQuery, typeQuery, monthlyQuery }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            <Card 
                title="Expenses by Category" 
                children={<ExpensePieChart query={categoryQuery} />}
            />

            <Card 
                title="Income vs Expense" 
                children={<TypePieChart query={typeQuery} />}
            />

            <Card 
                title="Monthly Trend"
                children={<MonthlyChart query={monthlyQuery} />}
            />
        </div>
    )
};

export default ChartsGrid;