import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTransactions, createTransaction } from "../api/api";
import { useState } from "react";

function App() {
    const queryClient = useQueryClient();

    const { data: transactions = [] } = useQuery({
        queryKey: ["transactions"],
        queryFn: fetchTransactions,
    });

    const mutation = useMutation({
        mutationFn: createTransaction,
        onSuccess: () => {
            queryClient.invalidateQueries(["transactions"]);
        },
    });

    const [amount, setAmount] = useState("");

    const handleSubmit = () => {
        mutation.mutate({
            amount: parseFloat(amount),
            transaction_type: "income",
        });
    };

    return (
        <div>
            <h1>Cash Flow Tracker</h1>

            <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
            />
            
            <button onClick={handleSubmit}>Add</button>

            <ul>
                {transactions.map((t) => (
                        <li key={t.id}>{t.transaction_type}: {t.amount}</li>
                    )
                )}
            </ul>
        </div>
    );
}

export default App
