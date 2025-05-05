import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
//components
import ProtectedRoute from '../components/ProtectedRoute';
import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
//context
import { useAuth } from '../context/AuthContext';

function AppRoutes() {
    const ProtectedDashboard = ProtectedRoute(Dashboard);
    const { setUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const localUser = localStorage.getItem("user");
        if (localUser) {
            setUser(JSON.parse(localUser));
            navigate("/dashboard");
        }
    }, []);

    return (
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/dashboard" element={<ProtectedDashboard />} />
        </Routes>
    );
}

export default AppRoutes;
