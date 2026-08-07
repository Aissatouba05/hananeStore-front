import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxOpen, faBagShopping, faBell, faClock } from '@fortawesome/free-solid-svg-icons'
import AdminLayout from '../../components/admin/AdminLayout'
import api from '../../services/api'
import { useAuth } from '../../context/AuthContext'

export default function DashboardAdmin() {
  const { utilisateur } = useAuth()
  const [stats, setStats] = useState({ produits: 0, commandesEnAttente: 0, notificationsNonLues: 0 })
  const [chargement, setChargement] = useState(true)

  useEffect(() => {
    const charger = async () => {
      try {
        const headers = { Authorization: `Bearer ${utilisateur.token}` }

        const [produitsRes, commandesRes, notifsRes] = await Promise.all([
          api.get('/produits'),
          api.get('/commandes?statut=en_attente', { headers }),
          api.get('/notifications', { headers }),
        ])

        setStats({
          produits: produitsRes.data.length,
          commandesEnAttente: commandesRes.data.length,
          notificationsNonLues: notifsRes.data.filter((n) => !n.lu).length,
        })
      } catch (err) {
        console.error(err)
      } finally {
        setChargement(false)
      }
    }
    charger()
  }, [utilisateur])

  const cartes = [
    { label: 'Produits actifs', valeur: stats.produits, icon: faBoxOpen, lien: '/admin/produits' },
    { label: 'Commandes en attente', valeur: stats.commandesEnAttente, icon: faClock, lien: '/admin/commandes' },
    { label: 'Notifications non lues', valeur: stats.notificationsNonLues, icon: faBell, lien: '/admin/notifications' },
  ]

  return (
    <AdminLayout>
      <h1 className="font-serif text-2xl text-rafet-noir mb-1">
        Bonjour {utilisateur?.nom} 👋
      </h1>
      <p className="text-sm text-rafet-gris mb-8">Voici un aperçu de votre boutique aujourd'hui.</p>

      {chargement ? (
        <p className="text-rafet-gris">Chargement...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {cartes.map((carte) => (
            <Link
              key={carte.label}
              to={carte.lien}
              className="bg-white border border-rafet-beige rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <FontAwesomeIcon icon={carte.icon} className="text-rafet-brun text-xl mb-4" />
              <p className="text-3xl font-serif text-rafet-noir mb-1">{carte.valeur}</p>
              <p className="text-sm text-rafet-gris">{carte.label}</p>
            </Link>
          ))}
        </div>
      )}

      <div className="bg-rafet-beige/40 rounded-xl p-6">
        <h2 className="font-serif text-lg text-rafet-noir mb-3">Actions rapides</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/admin/produits"
            className="bg-rafet-brun text-white text-xs tracking-widest px-5 py-3 rounded-md hover:bg-rafet-noir transition-colors flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faBoxOpen} />
            GÉRER LES PRODUITS
          </Link>
          <Link
            to="/admin/commandes"
            className="bg-white border border-rafet-brun text-rafet-brun text-xs tracking-widest px-5 py-3 rounded-md hover:bg-rafet-brun hover:text-white transition-colors flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faBagShopping} />
            VOIR LES COMMANDES
          </Link>
        </div>
      </div>
    </AdminLayout>
  )
}
