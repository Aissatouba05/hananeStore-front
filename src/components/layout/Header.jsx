import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faXmark,
  faMagnifyingGlass,
  faBagShopping,
  faHeart,
} from '@fortawesome/free-solid-svg-icons'
import { usePanier } from '../../context/PanierContext'

const navLinks = [
  { label: 'Sacs & Chaussures', to: '/catalogue?categorie=sacs' },
  { label: 'Vêtements', to: '/catalogue?categorie=vetements' },
  { label: 'Accessoires', to: '/catalogue?categorie=accessoires' },
  { label: 'Nouveautés', to: '/catalogue?tri=nouveautes' },
]

export default function Header() {
  const [menuOuvert, setMenuOuvert] = useState(false)
  const { nombreArticles } = usePanier()

  return (
    <header className="bg-rafet-beige border-b border-rafet-brun/20">
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        <button
          className="md:hidden text-rafet-brun text-lg"
          aria-label="Ouvrir le menu"
          onClick={() => setMenuOuvert(true)}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        <Link to="/" className="font-serif text-lg md:text-xl tracking-widest text-rafet-noir mx-auto md:mx-0">
          HananeStore
        </Link>

        <div className="hidden md:flex items-center gap-8 text-xs tracking-widest text-rafet-brun">
          {navLinks.map((link) => (
            <Link key={link.label} to={link.to} className="hover:underline underline-offset-4 uppercase">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4 md:gap-5 text-rafet-brun text-base md:text-lg">
          <Link to="/favoris" aria-label="Favoris">
            <FontAwesomeIcon icon={faHeart} />
          </Link>
          <Link to="/panier" aria-label="Panier" className="relative">
            <FontAwesomeIcon icon={faBagShopping} />
            <span className="absolute -top-2 -right-2 bg-rafet-brun text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {nombreArticles}
            </span>
          </Link>
        </div>
      </div>

      <div className="md:hidden px-4 pb-4">
        <div className="flex items-center gap-3 border border-rafet-brun/30 rounded-full px-4 py-2.5 bg-white/40">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-rafet-brun text-sm" />
          <input
            type="text"
            placeholder="Rechercher un produit..."
            className="flex-1 bg-transparent outline-none text-sm text-rafet-noir placeholder-rafet-gris"
          />
        </div>
      </div>

      {menuOuvert && (
        <div className="fixed inset-0 bg-rafet-brun z-50 flex flex-col animate-[fadeIn_0.25s_ease]">
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <span className="font-serif text-xl tracking-widest text-white">HananeStore</span>
            <button
              className="text-rafet-beige text-xl"
              aria-label="Fermer le menu"
              onClick={() => setMenuOuvert(false)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          <div className="flex flex-col mt-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMenuOuvert(false)}
                className="font-serif text-2xl text-white px-8 py-4 border-b border-white/10 hover:bg-white/5 hover:pl-10 transition-all duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}