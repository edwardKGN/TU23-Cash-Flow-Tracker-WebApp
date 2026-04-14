function LogoutButton ({ onLogout }) {
    return (
        <button
            onClick={() => {
                localStorage.removeItem("token");
                onLogout();
            }}
            className="px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
        >
            Logout
        </button>
    );
}

export default LogoutButton;