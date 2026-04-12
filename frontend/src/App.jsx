import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTransactions, createTransaction, fetchSummary, fetchCategorySummary, fetchTypeSummary, fetchMonthlySummary } from "./api/transactions";
import { useState } from "react";
import './App.css'

import useDashboardData from "./hook/useDashboardData";

import TransactionForm from "./components/dashboard/TransactionForm";

import Filters from "./components/dashboard/Filters";

import SummaryCards from "./components/dashboard/SummaryCards";

import ChartsGrid from "./components/dashboard/ChartsGrid";

import TransactionList from "./components/dashboard/TransactionList";

function App() {
    const [filters, setFilters] = useState({
        year: 2026,
        month: "",
    });

    const {
        transactionsQuery,
        summaryQuery,
        categoryQuery,
        typeQuery,
        monthlyQuery
    } = useDashboardData(filters);

    const queryClient = useQueryClient();

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

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="bg-red-500 text-white p-4">
                Tailwind is working
            </div>
            
            <div className="max-w-7xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold">Cash Flow Tracker</h1>

                <h2>Transaction Input</h2>

                <TransactionForm 
                    form={form}
                    setForm={setForm}
                    onAdd={handleSubmit}
                />

                <h2>Summary</h2>
                <SummaryCards summaryQuery={summaryQuery}/>

                <h2>Filter</h2>
                <Filters filters={filters} setFilters={setFilters}/>

                <h2>Charts</h2>
                <ChartsGrid 
                    categoryQuery={categoryQuery}
                    typeQuery={typeQuery}
                    monthlyQuery={monthlyQuery}
                />

                <h2>Transactions Recorded</h2>

                <TransactionList
                    transactionsQuery={transactionsQuery}
                />

            </div>
        </div>
    );
}

export default App
