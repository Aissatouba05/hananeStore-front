import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ui/ProductCard'
import { listerProduits } from '../services/produitApi'
import { listerCategories } from '../services/categorieApi'

export default function Catalogue() {
  const [searchParams, setSearchParams] = useSearchParams()
  const rayonUrl = searchParams.get('rayon') || ''
  const categorieUrl = searchParams.get('categorie') || ''
  const triUrl = searchParams.get('tri')
  const rechercheUrl = searchParams.get('recherche') || ''

  const [produits, setProduits] = useState([])
  const [categoriesDisponibles, setCategoriesDisponibles] = useState([])
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState(null)

  useEffect(() => {
    const chargerCategories = async () => {
      if (rayonUrl) {
        const cats = await listerCategories(rayonUrl)
        setCategoriesDisponibles(cats)
      } else {
        setCategoriesDisponibles([])
      }
    }
    chargerCategories()
  }, [rayonUrl])

  useEffect(() => {
    const chargerProduits = async () => {
      setChargement(true)
      setErreur(null)
      try {
        const data = await listerProduits(
          categorieUrl || undefined,
          rayonUrl || undefined,
          rechercheUrl || undefined
        )
        setProduits(data)
      } catch (err) {
        setErreur('Impossible de charger les produits.')
        console.error(err)
      } finally {
        setChargement(false)
      }
    }
    chargerProduits()
  }, [categorieUrl, rayonUrl, rechercheUrl])

  const changerCategorie = (slug) => {
    if (slug) {
      searchParams.set('categorie', slug)
    } else {
      searchParams.delete('categorie')
    }
    setSearchParams(searchParams)
  }

  const titre = rechercheUrl
    ? `Résultats pour « ${rechercheUrl} »`
    : rayonUrl
    ? rayonUrl.charAt(0).toUpperCase() + rayonUrl.slice(1)
    : triUrl === 'nouveautes'
    ? 'Nouveautés'
    : 'Catalogue'

  return (
    <div className="px-6 md:px-12 py-10">
      <div className="mb-10">
        <span className="text-[11px] tracking-[3px] text-rafet-gris">
          {rechercheUrl ? 'RECHERCHE' : rayonUrl ? 'RAYON' : 'NOTRE SÉLECTION'}
        </span>
        <h1 className="font-serif text-3xl text-rafet-noir mt-1">{titre}</h1>
      </div>

      {categoriesDisponibles.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-10">
          <button
            onClick={() => changerCategorie('')}
            className={`px-5 py-2.5 text-xs tracking-widest border transition-colors duration-300 ${
              !categorieUrl
                ? 'bg-rafet-noir text-white border-rafet-noir'
                : 'border-[#B76E79] text-rafet-brun hover:bg-[#B76E79] hover:text-white'
            }`}
          >
            TOUS
          </button>
          {categoriesDisponibles.map((cat) => (
            <button
              key={cat._id}
              onClick={() => changerCategorie(cat.slug)}
              className={`px-5 py-2.5 text-xs tracking-widest border transition-colors duration-300 uppercase ${
                categorieUrl === cat.slug
                  ? 'bg-rafet-noir text-white border-rafet-noir'
                  : 'border-[#B76E79] text-rafet-brun hover:bg-[#B76E79] hover:text-white'
              }`}
            >
              {cat.nom}
            </button>
          ))}
        </div>
      )}

      {chargement ? (
        <p className="text-center text-rafet-gris py-20">Chargement des produits...</p>
      ) : erreur ? (
        <p className="text-center text-red-600 py-20">{erreur}</p>
      ) : produits.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-rafet-gris">Aucun produit trouvé.</p>
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