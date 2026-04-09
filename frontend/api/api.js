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
