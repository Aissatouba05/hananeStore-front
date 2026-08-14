import AppRouter from './router/AppRouter'
import { PanierProvider } from './context/PanierContext'
import { FavorisProvider } from './context/Favoris'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <PanierProvider>
        <FavorisProvider>
          <AppRouter />
        </FavorisProvider>
      </PanierProvider>
    </AuthProvider>
  )
}

export default App
