import { createContext, useContext, useState, useEffect } from 'react'

const PanierContext = createContext()

export function PanierProvider({ children }) {
  const [articles, setArticles] = useState(() => {
    try {
      const sauvegarde = localStorage.getItem('hananestore-panier')
      return sauvegarde ? JSON.parse(sauvegarde) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('hananestore-panier', JSON.stringify(articles))
  }, [articles])

  const ajouterAuPanier = (produit, couleur, taille, quantite = 1) => {
    setArticles((prev) => {
      const cleUnique = `${produit.id}-${couleur}-${taille}`
      const existant = prev.find((a) => a.cle === cleUnique)

      if (existant) {
        return prev.map((a) =>
          a.cle === cleUnique ? { ...a, quantite: a.quantite + quantite } : a
        )
      }

      return [
        ...prev,
        {
          cle: cleUnique,
          id: produit.id,
          nom: produit.nom,
          prix: produit.prix,
          image: produit.images[0],
          couleur,
          taille,
          quantite,
        },
      ]
    })
  }

  const retirerDuPanier = (cle) => {
    setArticles((prev) => prev.filter((a) => a.cle !== cle))
  }

  const modifierQuantite = (cle, nouvelleQuantite) => {
    if (nouvelleQuantite < 1) return
    setArticles((prev) =>
      prev.map((a) => (a.cle === cle ? { ...a, quantite: nouvelleQuantite } : a))
    )
  }

  const viderPanier = () => setArticles([])

  const nombreArticles = articles.reduce((total, a) => total + a.quantite, 0)
  const totalPanier = articles.reduce((total, a) => total + a.prix * a.quantite, 0)

  return (
    <PanierContext.Provider
      value={{
        articles,
        ajouterAuPanier,
        retirerDuPanier,
        modifierQuantite,
        viderPanier,
        nombreArticles,
        totalPanier,
      }}
    >
      {children}
    </PanierContext.Provider>
  )
}

export function usePanier() {
  return useContext(PanierContext)
}
