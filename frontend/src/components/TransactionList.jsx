function TransactionList({transactions}) {
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
