import AppRouter from './router/AppRouter'
import { PanierProvider } from './context/PanierContext'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <PanierProvider>
        <AppRouter />
      </PanierProvider>
    </AuthProvider>
  )
}

export default App
