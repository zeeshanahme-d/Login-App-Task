import { BrowserRouter, Routes, Route } from 'react-router-dom'
//components
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute';
//context
import { AuthProvider } from './context/AuthContext';


const App = () => {
  const ProtectedDashboard = ProtectedRoute(Dashboard);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/dashboard" element={<ProtectedDashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>

  )
}

export default App