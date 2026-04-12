import { formatCurrency } from "../../utils/format";

function Card({ title, value }) {
    return(
        <div style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            width: "150px"
          }}>
            <h4>{title}</h4>
            <p>{value}</p>
        </div>
    );
}

function SummaryCards({ summaryQuery }) {
    const data = summaryQuery.data

    if (summaryQuery.isLoading) return <p>Loading data</p>
    if (summaryQuery.error) return <>Error loading data</>

    return (
        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
            <Card title="Income" value={formatCurrency(data?.income)}/>
            <Card title="Expense" value={formatCurrency(data?.expense)}/>
            <Card title="Net" value={formatCurrency(data?.net)}/>
        </div>
    )
}

export default SummaryCards

/* Original
            <p>Income: {summary?.income}</p>
            <p>Expense: {summary?.expense}</p>
            <p>Net: {summary?.net}</p>
*/