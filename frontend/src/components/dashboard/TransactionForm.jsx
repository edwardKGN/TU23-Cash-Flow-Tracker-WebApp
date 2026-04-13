function TransactionForm({form, setForm, onAdd}) {
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
            <div className="flex flex-col gap-4">
                <input
                    placeholder="Amount"
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value})}
                    className="bg-white dark:bg-gray-600 rounded-2xl text-center shadow py-2 focus:ring-blue-500"
                />

                <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, transaction_type: e.target.value})}
                    className="bg-white dark:bg-gray-600 rounded-2xl text-center shadow py-2 focus:ring-blue-500"
                >
                    <option value ="income">Income</option>
                    <option value ="expense">Expense</option>
                </select>

                <input
                    placeholder="Category"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="bg-white dark:bg-gray-600 rounded-2xl text-center shadow py-2 focus:ring-blue-500"
                />

                <input
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="bg-white dark:bg-gray-600 rounded-2xl text-center shadow py-2 focus:ring-blue-500"
                />
                
                <button onClick={onAdd} className="mt-4 bg-blue-600 hover:bg-blue-700 rounded-3xl shadow p-2">Add</button>
            </div>
        </div>
    )
}

export default TransactionForm;
