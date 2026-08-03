import { Link } from 'react-router-dom'
import ProductCard from '../ui/ProductCard'
import { produits } from '../../data/produits'

const selection = produits.slice(0, 3)

export default function FeaturedProducts() {
  return (
    <section className="px-6 md:px-12 py-14">
      <div className="flex items-baseline justify-between mb-8">
        <div>
          <span className="text-[11px] tracking-[3px] text-rafet-gris">NOTRE SÉLECTION</span>
          <h2 className="font-serif text-2xl text-rafet-noir mt-1">Pièces de la saison</h2>
        </div>
        <Link to="/catalogue" className="text-xs tracking-widest text-rafet-brun hover:underline underline-offset-4">
          VOIR TOUT
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {selection.map((produit, i) => (
          <ProductCard
            key={produit.id}
            produit={{ ...produit, image: produit.images[0] }}
            delai={i * 150}
          />
        ))}
      </div>
    </section>
  )
}