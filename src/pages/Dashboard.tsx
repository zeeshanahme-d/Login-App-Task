import { useAuth } from "../context/AuthContext"

const Dashboard = () => {
    const { user, setUser } = useAuth();

    const handleLogOut = () => {
        localStorage.removeItem("user");
        setUser(null);
        window.location.href = "/";
    }


    return (
        <div className="min-h-screen flex items-center justify-center flex-col bg-green-100">
            <h1 className="text-2xl md:text-4xl font-semibold">{`Welcome back ${user?.firstName || ''} ${user?.lastName || ''}`}</h1>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={handleLogOut}>Logout</button>
        </div>
    )
}

export default Dashboard