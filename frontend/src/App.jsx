import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTransactions, createTransaction, fetchSummary, fetchCategorySummary, fetchTypeSummary, fetchMonthlySummary } from "./api/api";
import { useState } from "react";

import TransactionForm from "./components/TransactionForm";

import Filters from "./components/Filters";

import SummaryCards from "./components/SummaryCards";

import ChartsGrid from "./components/ChartsGrid";

import TransactionList from "./components/TransactionList";

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
            queryClient.invalidateQueries(["type-summary"]);
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

    // DEBUG
    // console.log("categoryData > ", categoryData)

    const { data: typeData = []} = useQuery({
        queryKey: ["category-type", filters],
        queryFn: () => fetchTypeSummary(filters),
    });

    const { data: monthlyData = []} = useQuery({
        queryKey: ["monthly-summary", filters.year],
        queryFn: () => fetchMonthlySummary(filters.year),
        enabled: !!filters.year, // Only active if year filter is available
    });

    const sortedMonthlyData = [...monthlyData].sort((a, b) => a.month - b.month);

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
            <h1>Cash Flow Tracker</h1>

            <h2>Transaction Input</h2>

            <TransactionForm 
                form={form}
                setForm={setForm}
                onAdd={handleSubmit}
            />

            <h2>Summary</h2>
            <SummaryCards summary={summary}/>

            <h2>Filter</h2>
            <Filters filters={filters} setFilters={setFilters}/>

            <h2>Charts</h2>
            <ChartsGrid 
                categoryData={categoryData}
                typeData={typeData}
                monthlyData={sortedMonthlyData}
            />

            <h2>Transactions Recorded</h2>

            <TransactionList
                transactions={transactions}
            />

        </div>
    );
}

export default App

/*
            <h2>Overall Expense Distribution</h2>
            <ExpensePieChart data={categoryData}/>

            <h2>Income vs Expense Distribution</h2>
            <TypePieChart data={typeData}/>

            <h2>Monthly Income vs Expense</h2>
            <MonthlyChart data={sortedMonthlyData} />
*/
