function TransactionList({ transactionsQuery }) {

    const transactions = transactionsQuery.data

    if (transactionsQuery.isLoading) return <p>Data is loading...</p>
    if (transactionsQuery.error) return <p>Error in loading data</p>

    return (
        <div>
            <ul>
                {transactions.map((t) => (
                        <li key={t.id}>{t.date} | {t.transaction_type} | {t.amount} | {t.category}</li>
                ))}
            </ul>
        </div>
    )
}

export default TransactionList;
