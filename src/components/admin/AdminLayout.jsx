import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGauge,
  faBoxOpen,
  faBagShopping,
  faBell,
  faRightFromBracket,
  faBars,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../context/AuthContext'

const liensMenu = [
  { label: 'Tableau de bord', to: '/admin', icon: faGauge },
  { label: 'Produits', to: '/admin/produits', icon: faBoxOpen },
  { label: 'Commandes', to: '/admin/commandes', icon: faBagShopping },
  { label: 'Notifications', to: '/admin/notifications', icon: faBell },
]

export default function AdminLayout({ children }) {
  const { utilisateur, deconnecter } = useAuth()
  const location = useLocation()
  const [menuOuvert, setMenuOuvert] = useState(false)

  const contenuSidebar = (
    <>
      <div className="px-6 py-6 border-b border-white/10 flex items-center justify-between">
        <div>
          <p className="font-serif text-lg">HananeStore</p>
          <p className="text-xs text-white/50 mt-1">Espace Admin</p>
        </div>
        <button
          onClick={() => setMenuOuvert(false)}
          className="md:hidden text-white/70"
          aria-label="Fermer le menu"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>

      <nav className="flex-1 py-6 flex flex-col gap-1">
        {liensMenu.map((lien) => (
          <Link
            key={lien.to}
            to={lien.to}
            onClick={() => setMenuOuvert(false)}
            className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
              location.pathname === lien.to
                ? 'bg-white/10 text-white border-l-2 border-rafet-beige'
                : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            <FontAwesomeIcon icon={lien.icon} className="w-4" />
            {lien.label}
          </Link>
        ))}
      </nav>

      <div className="px-6 py-5 border-t border-white/10">
        <p className="text-xs text-white/50 mb-3">{utilisateur?.nom}</p>
        <button
          onClick={deconnecter}
          className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
        >
          <FontAwesomeIcon icon={faRightFromBracket} className="w-4" />
          Déconnexion
        </button>
      </div>
    </>
  )

  return (
    <div className="min-h-screen flex bg-rafet-blanc">
      <aside className="hidden md:flex w-64 bg-rafet-noir text-white flex-col flex-shrink-0">
        {contenuSidebar}
      </aside>

      {menuOuvert && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <aside className="w-64 bg-rafet-noir text-white flex flex-col">
            {contenuSidebar}
          </aside>
          <div
            className="flex-1 bg-black/40"
            onClick={() => setMenuOuvert(false)}
          ></div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <div className="md:hidden bg-rafet-noir text-white flex items-center justify-between px-4 py-4">
          <button onClick={() => setMenuOuvert(true)} aria-label="Ouvrir le menu">
            <FontAwesomeIcon icon={faBars} />
          </button>
          <p className="font-serif text-base">HananeStore</p>
          <div className="w-4"></div>
        </div>

        <main className="flex-1 p-5 md:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
