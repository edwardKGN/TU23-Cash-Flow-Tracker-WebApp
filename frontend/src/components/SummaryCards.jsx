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

function SummaryCards({ summary }) {
    return (
        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
            <Card title="Income" value={summary?.income}/>
            <Card title="Expense" value={summary?.income}/>
            <Card title="Net" value={summary?.income}/>
        </div>
    )
}

export default SummaryCards

/* Original
            <p>Income: {summary?.income}</p>
            <p>Expense: {summary?.expense}</p>
            <p>Net: {summary?.net}</p>
*/