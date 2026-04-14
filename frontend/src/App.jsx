import { useState } from "react";

import './App.css'

import LoginPage from "./components/pages/LoginPage";

import LogoutButton from "./components/dashboard/LogoutButton";
import Dashboard from "./components/pages/Dashboard";

function App() {
    // const [amount, setAmount] = useState("");

    const [loggedIn, setLoggedIn]= useState(
        !!localStorage.getItem("token")
    );

    if (!loggedIn) {
        return <LoginPage onLogin={() => setLoggedIn(true)} />
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 space-y-6 gap-6">
            <LogoutButton onLogout={() => setLoggedIn(false)}/>
            <Dashboard />
        </div>
    );
}

export default App
