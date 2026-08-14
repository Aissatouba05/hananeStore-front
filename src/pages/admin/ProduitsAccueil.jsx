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
          <div className="grid grid-cols-[1fr_140px_140px] gap-4 px-6 py-3 bg-rafet-beige/30 text-xs tracking-widest text-rafet-gris">
            <span>PRODUIT</span>
            <span className="text-center">VEDETTE</span>
            <span className="text-center">NOUVEAUTÉ</span>
          </div>

          {produits.map((produit) => (
            <div
              key={produit._id}
              className="grid grid-cols-[1fr_140px_140px] gap-4 px-6 py-4 items-center border-t border-rafet-beige"
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
                  <p className="text-sm text-rafet-noir">{produit.nom}</p>
                  <p className="text-xs text-rafet-gris">{produit.categorie?.nom}</p>
                </div>
              </div>

              <div className="flex justify-center">
                <input
                  type="checkbox"
                  checked={!!produit.misEnAvant}
                  disabled={enCours === produit._id + 'misEnAvant'}
                  onChange={() => basculerChamp(produit, 'misEnAvant')}
                  className="w-4 h-4 accent-rafet-brun cursor-pointer disabled:opacity-50"
                />
              </div>

              <div className="flex justify-center">
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
      )}
    </AdminLayout>
  )
}
