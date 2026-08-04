import AppRouter from './router/AppRouter'
import { PanierProvider } from './context/PanierContext'

function App() {
  return (
    <PanierProvider>
      <AppRouter />
    </PanierProvider>
  )
}

export default App
