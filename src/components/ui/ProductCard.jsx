import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faEye } from '@fortawesome/free-solid-svg-icons'

export default function ProductCard({ produit, taille = 'normal', delai = 0 }) {
  const [favori, setFavori] = useState(false)
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <Link ref={ref} to={`/produit/${produit.id}`} className="group h-full flex flex-col">
      <div className="relative flex-1 min-h-[220px] bg-rafet-beige rounded-md overflow-hidden">
        {produit.image && (
          <img
            src={produit.image}
            alt={produit.nom}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1400ms] ease-out group-hover:scale-110 ${
              visible ? 'opacity-100 scale-100' : 'opacity-0 scale-125'
            }`}
            style={{ transitionDelay: visible ? `${delai}ms` : '0ms' }}
          />
        )}

        {/* Rideau qui glisse pour révéler l'image */}
        <div
          className="absolute inset-0 bg-rafet-brun pointer-events-none transition-transform duration-[1200ms] ease-in-out"
          style={{
            transform: visible ? 'scaleX(0)' : 'scaleX(1)',
            transformOrigin: 'right',
            transitionDelay: visible ? `${delai}ms` : '0ms',
          }}
        ></div>

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>

        {produit.badge && (
          <span
            className={`absolute top-3 left-3 bg-rafet-noir text-white text-[10px] tracking-widest px-3 py-1 rounded-sm transition-all duration-500 group-hover:-translate-y-0.5 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
            style={{ transitionDelay: visible ? `${delai + 1000}ms` : '0ms' }}
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
          className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-500 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: visible ? `${delai + 1100}ms` : '0ms' }}
        >
          <FontAwesomeIcon
            icon={faHeart}
            className={`text-xs transition-colors duration-200 ${favori ? 'text-rafet-brun animate-pop' : 'text-rafet-gris'}`}
          />
        </button>

        <div className="absolute left-0 right-0 bottom-0 bg-white/95 text-center py-2.5 text-[10px] tracking-[2px] text-rafet-brun opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2">
          <FontAwesomeIcon icon={faEye} />
          APERÇU RAPIDE
        </div>
      </div>

      <p className="text-sm text-rafet-noir mt-3 mb-1 transition-colors duration-200 group-hover:text-rafet-brun">
        {produit.nom}
      </p>
      <p className="text-xs text-rafet-gris">{produit.prix.toLocaleString('fr-FR')} FCFA</p>
    </Link>
  )
}