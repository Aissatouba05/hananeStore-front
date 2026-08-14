import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faXmark,
  faCartShopping,
  faHeart,
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { usePanier } from '../../context/PanierContext'
import { listerCategories } from '../../services/categorieApi'
import logo from '../../assets/logo1.jpeg'
import logo2 from '../../assets/logo2.jpeg'

const rayons = [
  { label: 'Femme', valeur: 'femme' },
  { label: 'Homme', valeur: 'homme' },
  { label: 'Enfants', valeur: 'enfants' },
]

export default function Header() {
  const [menuOuvert, setMenuOuvert] = useState(false)
  const [dropdownOuvert, setDropdownOuvert] = useState(null)
  const [sousMenuMobileOuvert, setSousMenuMobileOuvert] = useState(null)
  const [categoriesParRayon, setCategoriesParRayon] = useState({})
  const { nombreArticles } = usePanier()

  useEffect(() => {
    const charger = async () => {
      try {
        const toutes = await listerCategories()
        const groupees = { homme: [], femme: [], enfants: [] }
        toutes.forEach((cat) => {
          if (groupees[cat.rayon]) groupees[cat.rayon].push(cat)
        })
        setCategoriesParRayon(groupees)
      } catch (err) {
        console.error(err)
      }
    }
    charger()
  }, [])

  return (
    <header className="bg-white shadow-[0_2px_12px_rgba(17,17,17,0.06)] relative z-30">
      <div className="flex items-center justify-between px-4 md:px-8 py-2">
        <div className="flex items-center gap-4 md:gap-5 text-[#111111] text-base md:text-lg md:order-3">
          <Link to="/favoris" aria-label="Favoris" className="hover:text-[#B76E79] transition-colors duration-200">
            <FontAwesomeIcon icon={faHeart} />
          </Link>
          <Link to="/panier" aria-label="Panier" className="relative hover:text-[#B76E79] transition-colors duration-200">
            <FontAwesomeIcon icon={faCartShopping} />
            <span className="absolute -top-2 -right-2 bg-[#B76E79] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {nombreArticles}
            </span>
          </Link>
        </div>

        <Link to="/" className="flex items-center gap-2 mx-auto md:mx-0 md:order-1">
          <img src={logo} alt="HananeStore" className="h-16 md:h-20 w-auto object-contain" />
        </Link>

        <div className="hidden md:flex items-center gap-8 text-xs tracking-widest text-rafet-brun md:order-2">
          {rayons.map((rayon) => (
            <div
              key={rayon.valeur}
              className="relative"
              onMouseEnter={() => setDropdownOuvert(rayon.valeur)}
              onMouseLeave={() => setDropdownOuvert(null)}
            >
              <Link
                to={`/catalogue?rayon=${rayon.valeur}`}
                className="flex items-center gap-1.5 uppercase hover:text-rafet-noir transition-colors py-2"
              >
                {rayon.label}
                <FontAwesomeIcon icon={faChevronDown} className="text-[9px]" />
              </Link>

              {dropdownOuvert === rayon.valeur && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white border border-rafet-beige rounded-lg shadow-lg py-2 min-w-[200px] normal-case">
                  {categoriesParRayon[rayon.valeur]?.map((cat) => (
                    <Link
                      key={cat._id}
                      to={`/catalogue?rayon=${rayon.valeur}&categorie=${cat.slug}`}
                      className="block px-5 py-2.5 text-sm text-rafet-noir hover:bg-rafet-beige/40 transition-colors tracking-normal"
                    >
                      {cat.nom}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link to="/catalogue?tri=nouveautes" className="uppercase hover:text-rafet-noir transition-colors">
            Nouveautés
          </Link>
        </div>

        <button
          className="md:hidden text-rafet-brun text-lg"
          aria-label="Ouvrir le menu"
          onClick={() => setMenuOuvert(true)}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      {menuOuvert && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col overflow-y-auto animate-[menuPanelIn_0.35s_cubic-bezier(0.22,1,0.36,1)]">
          <style>{`
            @keyframes menuPanelIn {
              from { opacity: 0; transform: translateY(-24px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes menuItemIn {
              from { opacity: 0; transform: translateX(-16px); }
              to { opacity: 1; transform: translateX(0); }
            }
            @keyframes logoPop {
              from { opacity: 0; transform: scale(0.85); }
              to { opacity: 1; transform: scale(1); }
            }
            @keyframes sousMenuItemIn {
              from { opacity: 0; transform: translateY(-6px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>

          <div className="flex items-center justify-between px-6 py-5 border-b border-black/10 flex-shrink-0">
            <img
              src={logo2}
              alt="HananeStore"
              className="h-14 w-auto object-contain animate-[logoPop_0.4s_cubic-bezier(0.22,1,0.36,1)_backwards]"
            />
            <button
              className="text-rafet-brun text-xl transition-transform duration-200 ease-out hover:rotate-90 active:scale-90"
              aria-label="Fermer le menu"
              onClick={() => setMenuOuvert(false)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          <div className="flex flex-col mt-2">
            {rayons.map((rayon, index) => {
              const estOuvert = sousMenuMobileOuvert === rayon.valeur
              return (
                <div
                  key={rayon.valeur}
                  className="border-b border-black/10 animate-[menuItemIn_0.4s_cubic-bezier(0.22,1,0.36,1)_backwards]"
                  style={{ animationDelay: `${80 + index * 70}ms` }}
                >
                  <button
                    onClick={() => setSousMenuMobileOuvert(estOuvert ? null : rayon.valeur)}
                    className="w-full flex items-center justify-between font-serif text-2xl text-rafet-noir px-8 py-4 transition-colors duration-200 active:bg-black/5"
                  >
                    {rayon.label}
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className={`text-sm transition-transform duration-300 ease-out ${
                        estOuvert ? 'rotate-90' : ''
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      estOuvert ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden bg-white">
                      {estOuvert &&
                        categoriesParRayon[rayon.valeur]?.map((cat, i) => (
                          <Link
                            key={cat._id}
                            to={`/catalogue?rayon=${rayon.valeur}&categorie=${cat.slug}`}
                            onClick={() => setMenuOuvert(false)}
                            className="block px-10 py-3 text-rafet-noir/80 text-sm transition-colors duration-200 hover:text-rafet-noir active:bg-black/10 animate-[sousMenuItemIn_0.3s_cubic-bezier(0.22,1,0.36,1)_backwards]"
                            style={{ animationDelay: `${40 + i * 45}ms` }}
                          >
                            {cat.nom}
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
              )
            })}
            <Link
              to="/catalogue?tri=nouveautes"
              onClick={() => setMenuOuvert(false)}
              className="font-serif text-2xl text-rafet-noir px-8 py-4 border-b border-black/10 transition-colors duration-200 active:bg-black/5 animate-[menuItemIn_0.4s_cubic-bezier(0.22,1,0.36,1)_backwards]"
              style={{ animationDelay: `${80 + rayons.length * 70}ms` }}
            >
              Nouveautés
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}