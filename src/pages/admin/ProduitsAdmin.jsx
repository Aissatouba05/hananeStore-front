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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-2xl text-rafet-noir">Produits</h1>
          <p className="text-sm text-rafet-gris mt-1">{produits.length} produit(s)</p>
        </div>
        <Link
          to="/admin/produits/nouveau"
          className="bg-rafet-brun text-white text-xs tracking-widest px-5 py-3 rounded-md hover:bg-rafet-noir transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
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
          <style>{`
            .table-scroll::-webkit-scrollbar {
              height: 8px;
            }
            .table-scroll::-webkit-scrollbar-track {
              background: #f5eeee;
            }
            .table-scroll::-webkit-scrollbar-thumb {
              background: #B76E79;
              border-radius: 999px;
            }
            .table-scroll::-webkit-scrollbar-thumb:hover {
              background: #9C5561;
            }
            .table-scroll {
              scrollbar-width: thin;
              scrollbar-color: #B76E79 #f5eeee;
            }
            @keyframes glisseIndice {
              0%, 100% { transform: translateX(0); opacity: 0.6; }
              50% { transform: translateX(6px); opacity: 1; }
            }
          `}</style>

          <div className="flex items-center justify-end gap-2 px-4 pt-3 pb-1 text-[11px] text-rafet-gris md:hidden">
            <span>Glisse pour voir plus</span>
            <span className="inline-block animate-[glisseIndice_1.2s_ease-in-out_infinite]">→</span>
          </div>

          <div className="relative">
            <div className="table-scroll overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm">
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
                        <span className="text-rafet-noir whitespace-nowrap">{produit.nom}</span>
                      </td>
                      <td className="px-6 py-4 text-rafet-gris capitalize whitespace-nowrap">
                        {produit.categorie?.nom}
                      </td>
                      <td className="px-6 py-4 text-rafet-brun whitespace-nowrap">
                        {produit.prix.toLocaleString('fr-FR')} FCFA
                      </td>
                      <td className="px-6 py-4 text-rafet-gris">{stockTotal}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-[11px] px-2.5 py-1 rounded-full whitespace-nowrap ${
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
            <div className="pointer-events-none absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-white to-transparent md:hidden" />
          </div>
        </div>
      )}
    </AdminLayout>
  )
}