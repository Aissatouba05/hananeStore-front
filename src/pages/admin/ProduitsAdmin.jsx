import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import AdminLayout from '../../components/admin/AdminLayout'
import { useAuth } from '../../context/AuthContext'
import api from '../../services/api'

export default function ProduitsAdmin() {
  const { utilisateur } = useAuth()
  const [produits, setProduits] = useState([])
  const [chargement, setChargement] = useState(true)

  const charger = async () => {
    setChargement(true)
    try {
      const { data } = await api.get('/produits')
      setProduits(data)
    } catch (err) {
      console.error(err)
    } finally {
      setChargement(false)
    }
  }

  useEffect(() => {
    charger()
  }, [])

  const supprimerProduit = async (id) => {
    if (!window.confirm('Supprimer ce produit ?')) return
    try {
      await api.delete(`/produits/${id}`, {
        headers: { Authorization: `Bearer ${utilisateur.token}` },
      })
      setProduits((prev) => prev.filter((p) => p._id !== id))
    } catch (err) {
      console.error(err)
      alert('Erreur lors de la suppression')
    }
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl text-rafet-noir">Produits</h1>
          <p className="text-sm text-rafet-gris mt-1">{produits.length} produit(s)</p>
        </div>
        <Link
          to="/admin/produits/nouveau"
          className="bg-rafet-brun text-white text-xs tracking-widest px-5 py-3 rounded-md hover:bg-rafet-noir transition-colors flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faPlus} />
          AJOUTER UN PRODUIT
        </Link>
      </div>

      {chargement ? (
        <p className="text-rafet-gris">Chargement...</p>
      ) : produits.length === 0 ? (
        <p className="text-rafet-gris">Aucun produit pour l'instant.</p>
      ) : (
        <div className="bg-white border border-rafet-beige rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-rafet-beige/30 text-left text-xs tracking-widest text-rafet-gris">
              <tr>
                <th className="px-6 py-4">Produit</th>
                <th className="px-6 py-4">Catégorie</th>
                <th className="px-6 py-4">Prix</th>
                <th className="px-6 py-4">Stock total</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {produits.map((produit) => {
                const stockTotal = produit.variantes?.reduce((s, v) => s + v.stock, 0) || 0
                return (
                  <tr key={produit._id} className="border-t border-rafet-beige">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-10 h-12 rounded-md bg-rafet-beige overflow-hidden flex-shrink-0">
                        {produit.images?.[0] && (
                          <img src={produit.images[0]} alt="" className="w-full h-full object-cover" />
                        )}
                      </div>
                      <span className="text-rafet-noir">{produit.nom}</span>
                    </td>
                    <td className="px-6 py-4 text-rafet-gris capitalize">{produit.categorie?.nom}</td>
                    <td className="px-6 py-4 text-rafet-brun">{produit.prix.toLocaleString('fr-FR')} FCFA</td>
                    <td className="px-6 py-4 text-rafet-gris">{stockTotal}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-[11px] px-2.5 py-1 rounded-full ${
                          produit.actif ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {produit.actif ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3 text-rafet-gris">
                        <button aria-label="Modifier" className="hover:text-rafet-brun">
                          <FontAwesomeIcon icon={faPen} className="text-xs" />
                        </button>
                        <button
                          aria-label="Supprimer"
                          onClick={() => supprimerProduit(produit._id)}
                          className="hover:text-red-600"
                        >
                          <FontAwesomeIcon icon={faTrash} className="text-xs" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  )
}