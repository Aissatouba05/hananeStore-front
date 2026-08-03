import { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import ProductCard from '../ui/ProductCard'
import { produits } from '../../data/produits'

const nouveautes = produits.slice(3, 8)

export default function NewArrivals() {
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    if (scrollRef.current) {
      const largeur = scrollRef.current.children[0]?.offsetWidth || 260
      scrollRef.current.scrollBy({ left: direction * (largeur + 24), behavior: 'smooth' })
    }
  }

  return (
    <section className="px-6 md:px-12 py-14 bg-rafet-beige/30">
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
        {nouveautes.map((produit) => (
          <div
            key={produit.id}
            className="flex-shrink-0 w-full sm:w-56 snap-start"
          >
            <ProductCard produit={{ ...produit, image: produit.images[0] }} />
          </div>
        ))}
      </div>
    </section>
  )
}