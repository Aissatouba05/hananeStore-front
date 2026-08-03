import { Link } from 'react-router-dom'
import ProductCard from '../ui/ProductCard'
import { produits } from '../../data/produits'

const selection = produits.slice(0, 3)

export default function FeaturedProducts() {
  return (
    <section className="px-6 md:px-12 py-14">
      <div className="flex items-baseline justify-between mb-8 animate-fade-up">
        <div>
          <span className="text-[11px] tracking-[3px] text-rafet-gris">NOTRE SÉLECTION</span>
          <h2 className="font-serif text-2xl text-rafet-noir mt-1">Pièces de la saison</h2>
        </div>
        <Link to="/catalogue" className="text-xs tracking-widest text-rafet-brun hover:underline underline-offset-4">
          VOIR TOUT
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[45%_55%] md:grid-rows-2 gap-6 md:h-[600px]">
        <div className="md:row-span-2 h-80 md:h-auto">
          <ProductCard produit={{ ...selection[0], image: selection[0].images[0] }} delai={0} />
        </div>
        <div className="h-64 md:h-auto">
          <ProductCard produit={{ ...selection[1], image: selection[1].images[0] }} delai={250} />
        </div>
        <div className="h-64 md:h-auto">
          <ProductCard produit={{ ...selection[2], image: selection[2].images[0] }} delai={500} />
        </div>
      </div>
    </section>
  )
}