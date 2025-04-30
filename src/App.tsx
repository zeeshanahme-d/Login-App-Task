import { BrowserRouter, Routes, Route } from 'react-router-dom'
//components
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute';


const App = () => {
  const ProtectedDashboard = ProtectedRoute(Dashboard);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<ProtectedDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App