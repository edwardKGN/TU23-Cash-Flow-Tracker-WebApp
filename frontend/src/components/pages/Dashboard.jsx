import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createTransaction } from "../../api/transactions";

import useDashboardData from "../../hook/useDashboardData";

import TransactionForm from "../dashboard/TransactionForm";
import SummaryCards from "../dashboard/SummaryCards";
import Filters from "../dashboard/Filters";
import ChartsGrid from "../dashboard/ChartsGrid";
import TransactionList from "../dashboard/TransactionList";

import './Dashboard.css'

function Dashboard ({}) {
    const [filters, setFilters] = useState({
        year: 2026,
        month: "",
    });

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

    const {
        transactionsQuery,
        summaryQuery,
        categoryQuery,
        typeQuery,
        monthlyQuery
    } = useDashboardData(filters);

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Cash Flow Tracker</h1>

            <h2 className="font-semibold mb-4">Transaction Input</h2>

            <TransactionForm 
                form={form}
                setForm={setForm}
                onAdd={handleSubmit}
            />

            <h2 className="font-semibold mb-4">Summary</h2>
            <SummaryCards summaryQuery={summaryQuery}/>

            <h2>Filter</h2>
            <Filters filters={filters} setFilters={setFilters}/>

            <h2 className="font-semibold mb-4">Charts</h2>
            <ChartsGrid 
                categoryQuery={categoryQuery}
                typeQuery={typeQuery}
                monthlyQuery={monthlyQuery}
            />

            <h2 className="font-semibold mb-4">Transactions Recorded</h2>

            <TransactionList
                transactionsQuery={transactionsQuery}
            />

            <div className="bg-red-500 text-white p-4">
                    Tailwind is working
            </div>
        </div>
    )
}

export default Dashboard;