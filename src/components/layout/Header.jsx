import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark, faMagnifyingGlass, faBagShopping } from '@fortawesome/free-solid-svg-icons'

const navLinks = [
  { label: 'SACS', to: '/catalogue?categorie=sacs' },
  { label: 'VÊTEMENTS', to: '/catalogue?categorie=vetements' },
  { label: 'ACCESSOIRES', to: '/catalogue?categorie=accessoires' },
  { label: 'NOUVEAUTÉS', to: '/catalogue?tri=nouveautes' },
]

export default function Header() {
  const [menuOuvert, setMenuOuvert] = useState(false)

  return (
    <header className="border-b border-rafet-beige relative">
      <div className="flex items-center justify-between px-6 md:px-8 py-4">
        <button
          className="md:hidden text-rafet-brun text-lg"
          aria-label="Ouvrir le menu"
          onClick={() => setMenuOuvert(true)}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        <div className="hidden md:block w-24"></div>

        <Link to="/" className="font-serif text-xl tracking-widest text-rafet-noir">
          RAFET
        </Link>

        <div className="flex items-center gap-5 text-rafet-brun text-lg">
          <button aria-label="Recherche">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          <Link to="/panier" aria-label="Panier" className="relative">
            <FontAwesomeIcon icon={faBagShopping} />
            <span className="absolute -top-2 -right-2 bg-rafet-brun text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </Link>
        </div>
      </div>

      <nav className="hidden md:flex justify-center gap-8 pb-3 text-xs tracking-widest text-rafet-brun">
        {navLinks.map((link) => (
          <Link key={link.label} to={link.to} className="hover:underline underline-offset-4">
            {link.label}
          </Link>
        ))}
      </nav>

      {menuOuvert && (
        <div className="fixed inset-0 bg-rafet-blanc z-50 flex flex-col">
          <div className="flex items-center justify-between px-6 py-4 border-b border-rafet-beige">
            <span className="font-serif text-xl tracking-widest text-rafet-noir">RAFET</span>
            <button
              className="text-rafet-brun text-lg"
              aria-label="Fermer le menu"
              onClick={() => setMenuOuvert(false)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMenuOuvert(false)}
                className="px-6 py-4 border-b border-rafet-beige font-serif text-lg text-rafet-noir"
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