import { createContext, useContext, useState, useEffect } from 'react'

const FavorisContext = createContext()

export function FavorisProvider({ children }) {
  const [favoris, setFavoris] = useState(() => {
    try {
      const sauvegarde = localStorage.getItem('hananestore_favoris')
      return sauvegarde ? JSON.parse(sauvegarde) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('hananestore_favoris', JSON.stringify(favoris))
  }, [favoris])

  const estFavori = (id) => favoris.some((p) => p.id === id)

  const ajouterFavori = (produit) => {
    setFavoris((prev) => (prev.some((p) => p.id === produit.id) ? prev : [...prev, produit]))
  }

  const retirerFavori = (id) => {
    setFavoris((prev) => prev.filter((p) => p.id !== id))
  }

  const basculerFavori = (produit) => {
    if (estFavori(produit.id)) {
      retirerFavori(produit.id)
    } else {
      ajouterFavori(produit)
    }
  }

  return (
    <FavorisContext.Provider
      value={{ favoris, estFavori, ajouterFavori, retirerFavori, basculerFavori }}
    >
      {children}
    </FavorisContext.Provider>
  )
}

export function useFavoris() {
  return useContext(FavorisContext)
}
