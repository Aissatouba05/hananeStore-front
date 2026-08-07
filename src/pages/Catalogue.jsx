import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ui/ProductCard'
import { listerProduits } from '../services/produitApi'

const filtres = [
  { label: 'TOUS', valeur: 'tous' },
  { label: 'SACS & CHAUSSURES', valeur: 'sacs' },
  { label: 'VÊTEMENTS', valeur: 'vetements' },
  { label: 'ACCESSOIRES', valeur: 'accessoires' },
]

export default function Catalogue() {
  const [searchParams, setSearchParams] = useSearchParams()
  const categorieUrl = searchParams.get('categorie') || 'tous'
  const triUrl = searchParams.get('tri')

  const [categorieActive, setCategorieActive] = useState(categorieUrl)
  const [produits, setProduits] = useState([])
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState(null)

  useEffect(() => {
    setCategorieActive(categorieUrl)
  }, [categorieUrl])

  useEffect(() => {
    const chargerProduits = async () => {
      setChargement(true)
      setErreur(null)
      try {
        const slugCategorie = categorieActive !== 'tous' ? categorieActive : undefined
        const data = await listerProduits(slugCategorie)
        setProduits(data)
      } catch (err) {
        setErreur("Impossible de charger les produits. Vérifie que le serveur backend tourne bien.")
        console.error(err)
      } finally {
        setChargement(false)
      }
    }
    chargerProduits()
  }, [categorieActive])

  const changerCategorie = (valeur) => {
    setCategorieActive(valeur)
    if (valeur === 'tous') {
      searchParams.delete('categorie')
    } else {
      searchParams.set('categorie', valeur)
    }
    searchParams.delete('tri')
    setSearchParams(searchParams)
  }

  return (
    <div className="px-6 md:px-12 py-10">
      <div className="mb-10">
        <span className="text-[11px] tracking-[3px] text-rafet-gris">NOTRE SÉLECTION</span>
        <h1 className="font-serif text-3xl text-rafet-noir mt-1">
          {triUrl === 'nouveautes' ? 'Nouveautés' : 'Catalogue'}
        </h1>
      </div>

      <div className="flex flex-wrap gap-3 mb-10">
        {filtres.map((filtre) => (
          <button
            key={filtre.valeur}
            onClick={() => changerCategorie(filtre.valeur)}
            className={`px-5 py-2.5 text-xs tracking-widest border transition-colors duration-300 ${
              categorieActive === filtre.valeur && !triUrl
                ? 'bg-rafet-noir text-white border-rafet-noir'
                : 'border-rafet-beige text-rafet-brun hover:border-rafet-brun'
            }`}
          >
            {filtre.label}
          </button>
        ))}
      </div>

      {chargement ? (
        <p className="text-center text-rafet-gris py-20">Chargement des produits...</p>
      ) : erreur ? (
        <p className="text-center text-red-600 py-20">{erreur}</p>
      ) : produits.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-rafet-gris">Aucun produit trouvé dans cette catégorie.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {produits.map((produit, i) => (
            <ProductCard
              key={produit._id}
              produit={{
                id: produit._id,
                nom: produit.nom,
                prix: produit.prix,
                badge: produit.badge,
                image: produit.images?.[0],
              }}
              delai={(i % 4) * 120}
            />
          ))}
        </div>
      )}

      <p className="text-xs text-rafet-gris mt-10">
        {produits.length} article{produits.length > 1 ? 's' : ''}
      </p>
    </div>
  )
}