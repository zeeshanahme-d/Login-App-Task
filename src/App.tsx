import { BrowserRouter } from 'react-router-dom'
//context
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';


const App = () => {

  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>

  )
}

export default App