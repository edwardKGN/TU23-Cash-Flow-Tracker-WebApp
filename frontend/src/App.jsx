import { useState } from "react";

import './App.css'

import LoginPage from "./components/pages/LoginPage";

import LogoutButton from "./components/dashboard/LogoutButton";
import Dashboard from "./components/pages/Dashboard";
import RegisterPage from "./components/pages/RegisterPage";

function App() {
    // const [amount, setAmount] = useState("");

    const [loggedIn, setLoggedIn]= useState(
        !!localStorage.getItem("token")
    );

    const [mode, setMode] = useState("login");

    if (!loggedIn) {
        if (mode === "login") {
            return (
                <LoginPage 
                    onLogin={() => setLoggedIn(true)}
                    onSwitchToRegister={() => setMode("register")} 
                />
            )
        }

        return (
            <RegisterPage
                onSwitchToLogin={() => setMode("login")}
            />
        )

    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 space-y-6 gap-6">
            <LogoutButton onLogout={() => setLoggedIn(false)}/>
            <Dashboard />
        </div>
    );
}

export default App
