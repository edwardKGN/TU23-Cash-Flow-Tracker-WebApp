import { useState } from "react";

import './App.css'

import Dashboard from "./components/pages/Dashboard";

function App() {
    const [dark, setDark]= useState(false);

    // const [amount, setAmount] = useState("");

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 space-y-6 gap-6">
            <Dashboard />
        </div>
    );
}

export default App
