import { formatCurrency } from "../../utils/format";
function TransactionList({ transactionsQuery }) {

    const transactions = transactionsQuery.data

    if (transactionsQuery.isLoading) return <p>Data is loading...</p>
    if (transactionsQuery.error) return <p>Error in loading data</p>

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
            <table className="w-full text-sm">
                <thead>
                <tr className="text-left text-gray-500 border-b">
                    <th className="py-2">Date</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Category</th>
                </tr>
                </thead>

                <tbody>
                {transactions.map((t) => (
                    <tr key={t.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="py-2">{t.date}</td>
                    <td>{t.transaction_type}</td>
                    <td className="font-medium">{formatCurrency(t.amount)}</td>
                    <td>{t.category}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default TransactionList;

/* 
Basic List
        <ul>
                {transactions.map((t) => (
                        <li key={t.id}>{t.date} | {t.transaction_type} | {t.amount} | {t.category}</li>
                ))}
            </ul>
        </div>
*/