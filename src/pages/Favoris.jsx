import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import ProductCard from '../components/ui/ProductCard'
import { useFavoris } from '../context/Favoris'

export default function Favoris() {
  const { favoris } = useFavoris()

  if (favoris.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-8 py-24 text-center">
        <FontAwesomeIcon icon={faHeart} className="text-rafet-beige text-4xl mb-6" />
        <h1 className="font-serif text-2xl text-rafet-noir mb-3">Aucun favori pour l'instant</h1>
        <p className="text-sm text-rafet-gris mb-8 max-w-sm">
          Ajoute des articles à tes favoris en cliquant sur le cœur depuis le catalogue.
        </p>
        <Link
          to="/catalogue"
          className="bg-rafet-brun text-white px-6 py-3 text-xs tracking-widest hover:bg-rafet-noir transition-colors"
        >
          VOIR LE CATALOGUE
        </Link>
      </div>
    )
  }

  return (
    <div className="px-6 md:px-12 py-12">
      <h1 className="font-serif text-2xl text-rafet-noir mb-8">Mes favoris</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favoris.map((produit) => (
          <ProductCard key={produit.id} produit={produit} />
        ))}
      </div>
    </div>
  )
}
