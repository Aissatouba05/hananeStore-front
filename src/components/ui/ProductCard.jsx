import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

export default function ProductCard({ produit, taille = 'normal', delai = 0 }) {
  const [favori, setFavori] = useState(false)
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="h-full flex flex-col bg-white border border-rafet-beige rounded-2xl p-3 transition-shadow duration-300 hover:shadow-md"
    >
      <Link to={`/produit/${produit.id}`} className="group relative flex-1 min-h-[220px] rounded-xl overflow-hidden bg-rafet-beige block">
        {produit.image && (
          <img
            src={produit.image}
            alt={produit.nom}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1000ms] ease-out ${
              visible ? 'opacity-100 animate-ken-burns' : 'opacity-0'
            } group-hover:!scale-105`}
            style={{ transitionDelay: visible ? `${delai}ms` : '0ms' }}
          />
        )}

        {produit.badge && (
          <span
            className={`absolute top-3 left-3 bg-rafet-noir text-white text-[10px] tracking-widest px-3 py-1 rounded-sm transition-all duration-500 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
            style={{ transitionDelay: visible ? `${delai + 400}ms` : '0ms' }}
          >
            {produit.badge}
          </span>
        )}

        <button
          aria-label="Ajouter aux favoris"
          onClick={(e) => {
            e.preventDefault()
            setFavori((f) => !f)
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200"
        >
          <FontAwesomeIcon
            icon={faHeart}
            className={`text-xs transition-colors duration-200 ${favori ? 'text-rafet-brun animate-pop' : 'text-rafet-gris'}`}
          />
        </button>
      </Link>

      <div className="pt-3 px-1">
        <p className="text-sm text-rafet-noir font-medium mb-1">{produit.nom}</p>
        <p className="text-sm text-rafet-brun mb-3">{produit.prix.toLocaleString('fr-FR')} FCFA</p>
        <Link
          to={`/produit/${produit.id}`}
          className="block text-center bg-rafet-brun text-white text-xs tracking-widest py-2.5 rounded-full hover:bg-rafet-noir transition-colors duration-300"
        >
          VOIR LE PRODUIT
        </Link>
      </div>
    </div>
  )
}