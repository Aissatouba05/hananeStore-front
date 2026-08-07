import { createContext, useContext, useState } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [utilisateur, setUtilisateur] = useState(() => {
    try {
      const sauvegarde = localStorage.getItem('hananestore-admin')
      return sauvegarde ? JSON.parse(sauvegarde) : null
    } catch {
      return null
    }
  })

  const connecter = async (email, motDePasse) => {
    const { data } = await api.post('/auth/connexion', { email, motDePasse })
    setUtilisateur(data)
    localStorage.setItem('hananestore-admin', JSON.stringify(data))
    return data
  }

  const deconnecter = () => {
    setUtilisateur(null)
    localStorage.removeItem('hananestore-admin')
  }

  return (
    <AuthContext.Provider value={{ utilisateur, connecter, deconnecter }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
