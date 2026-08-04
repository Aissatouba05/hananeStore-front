import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ui/ProductCard'
import { produits } from '../data/produits'

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

  // Resynchronise le filtre à chaque changement d'URL (ex: clic sur un lien du menu)
  useEffect(() => {
    setCategorieActive(categorieUrl)
  }, [categorieUrl])

  const produitsFiltres = useMemo(() => {
    let liste = [...produits]

    if (categorieActive !== 'tous') {
      liste = liste.filter((p) => p.categorie === categorieActive)
    }

    if (triUrl === 'nouveautes') {
      liste = liste.slice().reverse()
    }

    return liste
  }, [categorieActive, triUrl])

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

      {produitsFiltres.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-rafet-gris">Aucun produit trouvé dans cette catégorie.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {produitsFiltres.map((produit, i) => (
            <ProductCard
              key={produit.id}
              produit={{ ...produit, image: produit.images[0] }}
              delai={(i % 4) * 120}
            />
          ))}
        </div>
      )}

      <p className="text-xs text-rafet-gris mt-10">
        {produitsFiltres.length} article{produitsFiltres.length > 1 ? 's' : ''}
      </p>
    </div>
  )
}