import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping, faTriangleExclamation, faStar, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import AdminLayout from '../../components/admin/AdminLayout'
import { useAuth } from '../../context/AuthContext'
import api from '../../services/api'

const iconesParType = {
  nouvelle_commande: { icon: faBagShopping, couleur: 'text-green-600' },
  stock_bas: { icon: faTriangleExclamation, couleur: 'text-orange-600' },
  nouvel_avis: { icon: faStar, couleur: 'text-yellow-600' },
  nouvelle_inscription: { icon: faUserPlus, couleur: 'text-blue-600' },
}

export default function NotificationsAdmin() {
  const { utilisateur } = useAuth()
  const [notifications, setNotifications] = useState([])
  const [chargement, setChargement] = useState(true)

  const charger = async () => {
    setChargement(true)
    try {
      const { data } = await api.get('/notifications', {
        headers: { Authorization: `Bearer ${utilisateur.token}` },
      })
      setNotifications(data)
    } catch (err) {
      console.error(err)
    } finally {
      setChargement(false)
    }
  }

  useEffect(() => {
    charger()
  }, [])

  const toutMarquerLu = async () => {
    try {
      await api.put(
        '/notifications/tout-lire',
        {},
        { headers: { Authorization: `Bearer ${utilisateur.token}` } }
      )
      setNotifications((prev) => prev.map((n) => ({ ...n, lu: true })))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl text-rafet-noir">Notifications</h1>
          <p className="text-sm text-rafet-gris mt-1">{notifications.filter((n) => !n.lu).length} non lue(s)</p>
        </div>
        <button
          onClick={toutMarquerLu}
          className="text-xs tracking-widest text-rafet-brun hover:underline underline-offset-4"
        >
          TOUT MARQUER COMME LU
        </button>
      </div>

      {chargement ? (
        <p className="text-rafet-gris">Chargement...</p>
      ) : notifications.length === 0 ? (
        <p className="text-rafet-gris">Aucune notification pour l'instant.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {notifications.map((notif) => {
            const config = iconesParType[notif.type] || iconesParType.nouvelle_commande
            return (
              <div
                key={notif._id}
                className={`flex items-start gap-4 p-4 rounded-lg border ${
                  notif.lu ? 'bg-white border-rafet-beige' : 'bg-rafet-beige/30 border-rafet-brun/20'
                }`}
              >
                <FontAwesomeIcon icon={config.icon} className={`${config.couleur} mt-0.5`} />
                <div className="flex-1">
                  <p className="text-sm text-rafet-noir">{notif.message}</p>
                  <p className="text-xs text-rafet-gris mt-1">
                    {new Date(notif.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                {!notif.lu && <span className="w-2 h-2 rounded-full bg-rafet-brun mt-1.5"></span>}
              </div>
            )
          })}
        </div>
      )}
    </AdminLayout>
  )
}
