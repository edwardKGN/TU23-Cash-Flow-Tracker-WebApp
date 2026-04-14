import { useState } from "react";
import { registerUser } from "../../api/transactions";

function RegisterPage({ onSwitchToLogin }){
    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const validateForm = () => {
        if (!form.username.trim()) {
            return "Username is required"
        }

        if (form.password.length < 3) {
            return "Password must be at least 3 characters"
        }

        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validateForm();

        if (validationError) {
            setError(validationError)
            return;
        }

        try {
            await registerUser(form);

            setSuccess("User created! You can now login.");
            setError("");
        } catch (err) {
            setError(err.response?.data?.detail || "Error creating user");
            setSuccess("");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-6 rounded-2xl shadow space-y-4">
                <h1 className="text-xl font bold">Register</h1>

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
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                Register
                </button>

                {/* Feedback */}
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}

                <button
                    onClick={onSwitchToLogin}
                    className="text-blue-500 underline"
                >
                Back to Login
                </button>

            </div>
        </div>
    )
}

export default RegisterPage;