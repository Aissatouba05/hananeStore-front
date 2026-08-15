import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import ProductCard from '../ui/ProductCard'
import { listerNouveautes } from '../../services/produitApi'

export default function NewArrivals() {
  const [produits, setProduits] = useState([])
  const [chargement, setChargement] = useState(true)
  const scrollRef = useRef(null)

  useEffect(() => {
    const charger = async () => {
      try {
        const data = await listerNouveautes(8)
        setProduits(data)
      } catch (err) {
        console.error(err)
      } finally {
        setChargement(false)
      }
    }
    charger()
  }, [])

  const scroll = (direction) => {
    if (scrollRef.current) {
      const largeur = scrollRef.current.children[0]?.offsetWidth || 280
      scrollRef.current.scrollBy({ left: direction * (largeur + 24), behavior: 'smooth' })
    }
  }

  if (chargement || produits.length === 0) return null

  return (
    <section className="px-6 md:px-12 py-14 bg-[#C98A94]/[0.06]">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif text-2xl text-rafet-noir">Nouveautés</h2>
        <div className="flex gap-3">
          <button
            onClick={() => scroll(-1)}
            aria-label="Précédent"
            className="w-9 h-9 rounded-full border border-rafet-brun/30 flex items-center justify-center text-rafet-brun hover:bg-rafet-brun hover:text-white transition-colors"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="Suivant"
            className="w-9 h-9 rounded-full border border-rafet-brun/30 flex items-center justify-center text-rafet-brun hover:bg-rafet-brun hover:text-white transition-colors"
          >
            <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 no-scrollbar"
      >
        {produits.map((produit) => (
          <div key={produit._id} className="flex-shrink-0 w-full sm:w-80 snap-start">
            <ProductCard
              produit={{
                id: produit._id,
                nom: produit.nom,
                prix: produit.prix,
                badge: produit.badge,
                image: produit.images?.[0],
              }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
