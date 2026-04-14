import { useState } from "react";

import { loginUser } from "../../api/transactions";

function LoginPage( { onLogin }) {
    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    const handleSubmit = async () => {
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
        </div>
    </div>
    )
}

export default LoginPage;