import { useState, useEffect } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { useAuth } from '../../context/AuthContext'
import api from '../../services/api'

const statuts = {
  en_attente: { label: 'En attente', couleur: 'bg-yellow-50 text-yellow-700' },
  en_preparation: { label: 'En préparation', couleur: 'bg-blue-50 text-blue-700' },
  expediee: { label: 'Expédiée', couleur: 'bg-purple-50 text-purple-700' },
  livree: { label: 'Livrée', couleur: 'bg-green-50 text-green-700' },
  annulee: { label: 'Annulée', couleur: 'bg-red-50 text-red-700' },
}

export default function CommandesAdmin() {
  const { utilisateur } = useAuth()
  const [commandes, setCommandes] = useState([])
  const [chargement, setChargement] = useState(true)

  const charger = async () => {
    setChargement(true)
    try {
      const { data } = await api.get('/commandes', {
        headers: { Authorization: `Bearer ${utilisateur.token}` },
      })
      setCommandes(data)
    } catch (err) {
      console.error(err)
    } finally {
      setChargement(false)
    }
  }

  useEffect(() => {
    charger()
  }, [])

  const changerStatut = async (id, nouveauStatut) => {
    try {
      await api.put(
        `/commandes/${id}/statut`,
        { statut: nouveauStatut },
        { headers: { Authorization: `Bearer ${utilisateur.token}` } }
      )
      setCommandes((prev) =>
        prev.map((c) => (c._id === id ? { ...c, statut: nouveauStatut } : c))
      )
    } catch (err) {
      console.error(err)
      alert('Erreur lors de la mise à jour')
    }
  }

  return (
    <AdminLayout>
      <h1 className="font-serif text-2xl text-rafet-noir mb-1">Commandes</h1>
      <p className="text-sm text-rafet-gris mb-8">{commandes.length} commande(s)</p>

      {chargement ? (
        <p className="text-rafet-gris">Chargement...</p>
      ) : commandes.length === 0 ? (
        <p className="text-rafet-gris">Aucune commande pour l'instant.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {commandes.map((commande) => (
            <div key={commande._id} className="bg-white border border-rafet-beige rounded-xl p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-rafet-noir font-medium">{commande.nomClient}</p>
                  <p className="text-xs text-rafet-gris mt-1">
                    {commande.telephone} · {commande.adresse}, {commande.ville}
                  </p>
                  <p className="text-xs text-rafet-gris">
                    {new Date(commande.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>

                <select
                  value={commande.statut}
                  onChange={(e) => changerStatut(commande._id, e.target.value)}
                  className={`text-xs px-3 py-2 rounded-full border-none outline-none cursor-pointer ${statuts[commande.statut].couleur}`}
                >
                  {Object.entries(statuts).map(([valeur, { label }]) => (
                    <option key={valeur} value={valeur}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="border-t border-rafet-beige pt-4 flex flex-col gap-2">
                {commande.articles.map((article, i) => (
                  <div key={i} className="flex justify-between text-sm text-rafet-gris">
                    <span>
                      {article.nom} {article.couleur && `· ${article.couleur}`}{' '}
                      {article.taille && article.taille !== 'Unique' && `· ${article.taille}`} × {article.quantite}
                    </span>
                    <span className="text-rafet-brun">
                      {(article.prix * article.quantite).toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-rafet-beige mt-4 pt-4 flex justify-between font-medium text-rafet-noir">
                <span>Total</span>
                <span>{commande.total.toLocaleString('fr-FR')} FCFA</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}
