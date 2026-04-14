// TODO group queries here, and return query objects
// Query objects have object.data, object.isLoading, object.error in-built which eases status check and data return
import { useQuery } from "@tanstack/react-query";
import {
    fetchTransactions,
    fetchSummary,
    fetchCategorySummary,
    fetchTypeSummary,
    fetchMonthlySummary,
    fetchCurrentUser
} from "../api/transactions";

function useDashboardData(filters) {

    const transactionsQuery = useQuery({
        queryKey: ["transactions"],
        queryFn: fetchTransactions,
    });

    const summaryQuery = useQuery({
        queryKey: ["summary"],
        queryFn: fetchSummary,
    });

    // No filter only group by category
    // const { data: categoryData = []} = useQuery({
    //     queryKey: ["category-summary"],
    //     queryFn: fetchCategorySummary,  // Previously used > this works as it implicitly implies that I am providing a function.
    // });

    const categoryQuery = useQuery({
        queryKey: ["category-summary", filters],
        queryFn: () => fetchCategorySummary(filters),  // Previously used > queryFn: fetchCategorySummary(filters) was returning result not the function. need to manually wrap it in an in-line function as done now for it to work
    });

    const typeQuery = useQuery({
        queryKey: ["category-type", filters],
        queryFn: () => fetchTypeSummary(filters),
    });

    // console.log("filters >", filters)
    // console.log("filters.year >", filters.year)

    const monthlyQuery = useQuery({
        queryKey: ["monthly-summary", filters.year],
        queryFn: () => fetchMonthlySummary(filters.year),
        enabled: !!filters.year, // Only active if year filter is available
    });

    const userQuery = useQuery({
        queryKey: ["current-user"],
        queryFn: fetchCurrentUser,
    });

    return {
        transactionsQuery,
        summaryQuery,
        categoryQuery,
        typeQuery,
        monthlyQuery,
        userQuery
    }
};

export default useDashboardData; 
