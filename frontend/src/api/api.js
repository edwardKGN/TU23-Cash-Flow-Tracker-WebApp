import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000", // URL where FastAPI is hosted. 
});

// NOTE FastAPI declared actions
export const fetchTransactions = async () => {
    const res = await API.get("/transactions");  // Follow the routes declared by FastAPI
    return res.data;
};
  
export const createTransaction = async (data) => {
    const res = await API.post("/transactions", data);  // Follow the routes declared by FastAPI
    return res.data;
};

export const fetchSummary = async () => {
    const res = await API.get("/summary");
    return res.data;
}

export const fetchCategorySummary = async (filters) => {
    // If receive "" to remove from filters
    const cleanedFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== "")
    )

    const res = await API.get("/summary/by-category", {
        params: cleanedFilters,
    });

    return res.data;
};

export const fetchTypeSummary = async (filters) => {
    // If receive "" to remove from filters
    const cleanedFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== "")
    )

    const res = await API.get("/summary/by-type", {
        params: cleanedFilters,
    });

    return res.data;
};