function TransactionList({transactions}) {
    return (
        <div>
            <ul>
                {transactions.map((t) => (
                        <li key={t.id}>{t.transaction_type}: {t.amount} - {t.category} ({t.description})</li>
                ))}
            </ul>
        </div>
    )
}

export default TransactionList;
