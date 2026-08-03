import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark, faMagnifyingGlass, faBagShopping, faHeart } from '@fortawesome/free-solid-svg-icons'

const navLinks = [
  { label: 'SACS & CHAUSSURES', to: '/catalogue?categorie=sacs' },
  { label: 'VÊTEMENTS', to: '/catalogue?categorie=vetements' },
  { label: 'ACCESSOIRES', to: '/catalogue?categorie=accessoires' },
  { label: 'NOUVEAUTÉS', to: '/catalogue?tri=nouveautes' },
]

export default function Header() {
  const [menuOuvert, setMenuOuvert] = useState(false)

  return (
    <header className="bg-rafet-beige border-b border-rafet-brun/20">
      <div className="flex items-center justify-between px-6 md:px-8 py-4">
        <Link to="/" className="font-serif text-xl tracking-widest text-rafet-noir">
          HananeStore
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-xs tracking-widest text-rafet-brun">
          {navLinks.map((link) => (
            <Link key={link.label} to={link.to} className="hover:underline underline-offset-4">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5 text-rafet-brun text-lg">
          <button aria-label="Recherche" className="hidden md:inline">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          <Link to="/favoris" aria-label="Favoris" className="hidden md:inline-block">
            <FontAwesomeIcon icon={faHeart} />
          </Link>
          <Link to="/panier" aria-label="Panier" className="relative hidden md:inline-block">
            <FontAwesomeIcon icon={faBagShopping} />
            <span className="absolute -top-2 -right-2 bg-rafet-brun text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </Link>
          <button
            className="md:hidden"
            aria-label="Ouvrir le menu"
            onClick={() => setMenuOuvert(true)}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>

      {menuOuvert && (
        <div className="fixed inset-0 bg-rafet-brun z-50 flex flex-col animate-[fadeIn_0.25s_ease]">
          <div className="flex items-center justify-between px-6 py-5">
            <span className="font-serif text-xl tracking-widest text-white">HananeStore</span>
            <button
              className="text-rafet-beige text-xl"
              aria-label="Fermer le menu"
              onClick={() => setMenuOuvert(false)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          <div className="flex flex-col items-start gap-7 px-8 mt-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMenuOuvert(false)}
                className="font-serif text-2xl text-white hover:text-rafet-beige transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex justify-center gap-10 px-6 py-6 mt-auto">
            <button aria-label="Recherche" className="text-rafet-beige text-lg">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
            <Link to="/favoris" aria-label="Favoris" className="text-rafet-beige text-lg">
              <FontAwesomeIcon icon={faHeart} />
            </Link>
            <Link to="/panier" aria-label="Panier" className="text-rafet-beige text-lg relative">
              <FontAwesomeIcon icon={faBagShopping} />
              <span className="absolute -top-2 -right-2 bg-white text-rafet-brun text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}