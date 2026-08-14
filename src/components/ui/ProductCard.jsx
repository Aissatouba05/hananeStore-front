import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import ModalAccesPrivilegie from './ModalAccesPrivilegie'
import { useFavoris } from '../../context/Favoris'

export default function ProductCard({ produit, taille = 'normal', delai = 0 }) {
  const { estFavori, basculerFavori } = useFavoris()
  const [visible, setVisible] = useState(false)
  const [modaleOuverte, setModaleOuverte] = useState(false)
  const ref = useRef(null)

  const favori = estFavori(produit.id)

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

  const gererClicFavori = (e) => {
    e.preventDefault()
    const estAbonnee = localStorage.getItem('hananestore_abonnee') === 'true'

    if (!estAbonnee) {
      setModaleOuverte(true)
      return
    }

    basculerFavori(produit)
  }

  const confirmerAbonnement = () => {
    setModaleOuverte(false)
    basculerFavori(produit)
  }

  return (
    <div
      ref={ref}
      className="h-full flex flex-col bg-white border border-[#B76E79]/20 rounded-2xl p-3 transition-shadow duration-300 hover:shadow-md"
    >
      <Link to={`/produit/${produit.id}`} className="group relative flex-1 min-h-[220px] rounded-xl overflow-hidden bg-[#B76E79]/[0.08] block">
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
            className={`absolute top-3 left-3 bg-[#9C5561] text-white text-[10px] tracking-widest px-3 py-1 rounded-sm transition-all duration-500 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
            style={{ transitionDelay: visible ? `${delai + 400}ms` : '0ms' }}
          >
            {produit.badge}
          </span>
        )}

        <button
          aria-label="Ajouter aux favoris"
          onClick={gererClicFavori}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#B76E79]/15 backdrop-blur-sm flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200"
        >
          <FontAwesomeIcon
            icon={faHeart}
            className={`text-lg transition-colors duration-200 ${favori ? 'text-[#B76E79] animate-pop' : 'text-[#111111]/40'}`}
          />
        </button>
      </Link>

      <div className="pt-3 px-1">
        <p className="text-sm text-[#111111] font-medium mb-1">{produit.nom}</p>
        <p className="text-sm text-[#B76E79] mb-3">{produit.prix.toLocaleString('fr-FR')} FCFA</p>
        <Link
          to={`/produit/${produit.id}`}
          className="block text-center bg-[#B76E79] text-white text-xs tracking-widest py-2.5 rounded-full hover:bg-[#9C5561] transition-colors duration-300"
        >
          VOIR LE PRODUIT
        </Link>
      </div>

      {modaleOuverte && (
        <ModalAccesPrivilegie
          onFermer={() => setModaleOuverte(false)}
          onAbonnement={confirmerAbonnement}
        />
      )}
    </div>
  )
}
