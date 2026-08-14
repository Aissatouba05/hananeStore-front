import { useState, useEffect } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { useAuth } from '../../context/AuthContext'
import { listerProduits, modifierProduit } from '../../services/produitApi'

export default function ProduitsAccueil() {
  const { utilisateur } = useAuth()
  const [produits, setProduits] = useState([])
  const [chargement, setChargement] = useState(true)
  const [enCours, setEnCours] = useState(null)
  const [erreur, setErreur] = useState(null)

  useEffect(() => {
    const charger = async () => {
      try {
        const data = await listerProduits()
        setProduits(data)
      } catch (err) {
        setErreur('Impossible de charger les produits.')
        console.error(err)
      } finally {
        setChargement(false)
      }
    }
    charger()
  }, [])

  const basculerChamp = async (produit, champ) => {
    const nouvelleValeur = !produit[champ]
    setEnCours(produit._id + champ)
    setErreur(null)

    // Mise à jour optimiste de l'affichage
    setProduits((prev) =>
      prev.map((p) => (p._id === produit._id ? { ...p, [champ]: nouvelleValeur } : p))
    )

    try {
      const formData = new FormData()
      formData.append(champ, nouvelleValeur)
      await modifierProduit(produit._id, formData, utilisateur.token)
    } catch (err) {
      // On annule le changement si l'appel échoue
      setProduits((prev) =>
        prev.map((p) => (p._id === produit._id ? { ...p, [champ]: !nouvelleValeur } : p))
      )
      setErreur("Une erreur est survenue lors de la mise à jour.")
      console.error(err)
    } finally {
      setEnCours(null)
    }
  }

  return (
    <AdminLayout>
      <h1 className="font-serif text-2xl text-rafet-noir mb-1">Produits de la page d'accueil</h1>
      <p className="text-sm text-rafet-gris mb-8">
        Choisis quels produits apparaissent dans « Pièces de la saison » et dans le carrousel « Nouveautés ».
      </p>

      {erreur && (
        <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-lg mb-6">{erreur}</p>
      )}

      {chargement ? (
        <p className="text-rafet-gris">Chargement...</p>
      ) : produits.length === 0 ? (
        <p className="text-rafet-gris">Aucun produit trouvé.</p>
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
              <div className="min-w-[460px]">
                <div className="grid grid-cols-[1fr_220px] gap-4 px-6 py-3 bg-rafet-beige/30 text-xs tracking-widest text-rafet-gris">
                  <span>PRODUIT</span>
                  <div className="flex items-center justify-center gap-14">
                    <span>VEDETTE</span>
                    <span>NOUVEAUTÉ</span>
                  </div>
                </div>

                {produits.map((produit) => (
                  <div
                    key={produit._id}
                    className="grid grid-cols-[1fr_220px] gap-4 px-6 py-4 items-center border-t border-rafet-beige"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-md overflow-hidden bg-rafet-beige flex-shrink-0">
                        {produit.images?.[0] && (
                          <img
                            src={produit.images[0]}
                            alt={produit.nom}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-rafet-noir whitespace-nowrap">{produit.nom}</p>
                        <p className="text-xs text-rafet-gris whitespace-nowrap">{produit.categorie?.nom}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-14">
                      <input
                        type="checkbox"
                        checked={!!produit.misEnAvant}
                        disabled={enCours === produit._id + 'misEnAvant'}
                        onChange={() => basculerChamp(produit, 'misEnAvant')}
                        className="w-4 h-4 accent-rafet-brun cursor-pointer disabled:opacity-50"
                      />
                      <input
                        type="checkbox"
                        checked={!!produit.nouveaute}
                        disabled={enCours === produit._id + 'nouveaute'}
                        onChange={() => basculerChamp(produit, 'nouveaute')}
                        className="w-4 h-4 accent-rafet-brun cursor-pointer disabled:opacity-50"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pointer-events-none absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-white to-transparent md:hidden" />
          </div>
        </div>
      )}
    </AdminLayout>
  )
}