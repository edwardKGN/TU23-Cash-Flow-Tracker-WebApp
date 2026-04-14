import { useState } from "react";

import { loginUser } from "../../api/transactions";

function LoginPage( { onLogin, onSwitchToRegister }) {
    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    const validateForm = () => {
        if (!form.username.trim()) {
            return "Username is required"
        }

        if (form.password.length < 3) {
            return "Password must be at least 3 characters"
        }

        return null;
    }

    const [error, setError] = useState("");
    // const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validateForm();

        if (validationError) {
            setError(validationError)
            return;
        }
        

        const res = await loginUser(form);
        localStorage.setItem("token", res.access_token);
        onLogin();
    }

    return (
    <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-6 rounded-2xl shadow space-y-4">
            <input
                placeholder="Username"
                onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
            }
            className="border p-2 w-full"
            />

            <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
            }
            className="border p-2 w-full"
            />

            <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
            Login
            </button>

            {/* Feedback */}
            {error && <p className="text-red-500">{error}</p>}

            <button
                onClick={onSwitchToRegister}
                className="text-blue-500 underline"
            >
            Create Account
            </button>
        </div>
    </div>
    )
}

export default LoginPage;