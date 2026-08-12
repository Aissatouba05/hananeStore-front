import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../ui/ProductCard'
import { listerProduits } from '../../services/produitApi'

export default function SectionRayon({ rayon, titre, sousTitre, fond = false }) {
  const [produits, setProduits] = useState([])
  const [chargement, setChargement] = useState(true)

  useEffect(() => {
    const charger = async () => {
      try {
        const data = await listerProduits({ rayon })
        setProduits(data.slice(0, 4))
      } catch (err) {
        console.error(err)
      } finally {
        setChargement(false)
      }
    }
    charger()
  }, [rayon])

  if (chargement || produits.length === 0) return null

  return (
    <section className={`px-6 md:px-12 py-14 ${fond ? 'bg-rafet-beige/30' : ''}`}>
      <div className="flex items-baseline justify-between mb-8">
        <div>
          <span className="text-[11px] tracking-[3px] text-rafet-gris">{sousTitre}</span>
          <h2 className="font-serif text-2xl text-rafet-noir mt-1">{titre}</h2>
        </div>
        <Link
          to={`/catalogue?rayon=${rayon}`}
          className="text-xs tracking-widest text-rafet-brun hover:underline underline-offset-4"
        >
          VOIR TOUT
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
            delai={i * 120}
          />
        ))}
      </div>
    </section>
  )
}
