import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTransactions, createTransaction, fetchSummary, fetchCategorySummary } from "./api/api";
import { useState } from "react";

import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

import ExpensePieChart from "./components/ExpensePieChart";

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
            queryClient.invalidateQueries(["summary"]);  // Inform that summary is stale and need to be refetched
            queryClient.invalidateQueries(["category-summary"]);
        },
    });

    // const [amount, setAmount] = useState("");

    const [form, setForm] = useState({
        amount: "",
        transaction_type: "income",
        category: "",
        description: "",
    });

    const handleSubmit = () => {
        if (!form.amount) return;  // If no value to skip

        mutation.mutate({
            amount: parseFloat(form.amount),  // Data entered as string, need to convert to float to fit Pydantic data schema
            transaction_type: form.transaction_type,
            category: form.category,
            description: form.description
        });

        // Reset form
        setForm({
            amount: "",
            type: "income",
            category: "",
            description: "",
          });
    };

    const { data: summary } = useQuery({
        queryKey: ["summary"],
        queryFn: fetchSummary,
    });

    const [filters, setFilters] = useState({
        year: 2026,
        month: "",
    });

    // No filter only group by category
    // const { data: categoryData = []} = useQuery({
    //     queryKey: ["category-summary"],
    //     queryFn: fetchCategorySummary,  // Previously used > this works as it implicitly implies that I am providing a function.
    // });

    const { data: categoryData = []} = useQuery({
        queryKey: ["category-summary", filters],
        queryFn: () => fetchCategorySummary(filters),  // Previously used > queryFn: fetchCategorySummary(filters) was returning result not the function. need to manually wrap it in an in-line function as done now for it to work
    });

    console.log("categoryData > ", categoryData)

    return (
        <div>
            <h1>Cash Flow Tracker</h1>

            <h2>Transaction Input</h2>

            <TransactionForm 
                form={form}
                setForm={setForm}
                onAdd={handleSubmit}
            />

            <h2>Transactions Recorded</h2>

            <TransactionList
                transactions={transactions}
            />

            <h2>Summary</h2>
            <p>Income: {summary?.income}</p>
            <p>Expense: {summary?.expense}</p>
            <p>Net: {summary?.net}</p>

            <h2>Overall Expense Distribution</h2>
            
            <select
                value={filters.month}
                onChange={(e) =>
                    setFilters({ 
                        ...filters, 
                        month: e.target.value ? parseInt(e.target.value): "" // Need to convert to integer for reference
                    })
                } 
            >
                <option value="">All Months</option>
                <option value="1">Jan</option>
                <option value="2">Feb</option>
                <option value="4">Apr</option>
            </select>

            <input 
                type="number"
                value={filters.year}
                onChange={(e) =>
                    setFilters({ ...filters, year: e.target.value })
                } 
            />

            <ExpensePieChart data={categoryData}/>
        </div>
    );
}

export default App
