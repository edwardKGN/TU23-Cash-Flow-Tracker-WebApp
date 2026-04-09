function TransactionForm({form, setForm, onAdd}) {
    return (
        <div>
            <input
                placeholder="Amount"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value})}
            />

            <select
                value={form.type}
                onChange={(e) => setForm({ ...form, transaction_type: e.target.value})}
            >
                <option value ="income">Income</option>
                <option value ="expense">Expense</option>
            </select>

            <input
                placeholder="Category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
            />

            <input
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            
            <button onClick={onAdd}>Add</button>
        </div>
    )
}

export default TransactionForm;
