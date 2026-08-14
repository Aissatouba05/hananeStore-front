import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { usePanier } from '../context/PanierContext'
import { creerCommande } from '../services/commandeApi'
import Button from '../components/ui/Button'

export default function Checkout() {
  const { articles, totalPanier, viderPanier } = usePanier()
  const navigate = useNavigate()

  const [formulaire, setFormulaire] = useState({
    nom: '',
    telephone: '',
    adresse: '',
    ville: '',
    notes: '',
  })
  const [envoiEnCours, setEnvoiEnCours] = useState(false)
  const [erreur, setErreur] = useState(null)

  const handleChange = (e) => {
    setFormulaire({ ...formulaire, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEnvoiEnCours(true)
    setErreur(null)

    try {
      const commandeData = {
        nomClient: formulaire.nom,
        telephone: formulaire.telephone,
        adresse: formulaire.adresse,
        ville: formulaire.ville,
        notes: formulaire.notes,
        articles: articles.map((a) => ({
          produit: a.id,
          nom: a.nom,
          prix: a.prix,
          couleur: a.couleur,
          taille: a.taille,
          quantite: a.quantite,
        })),
      }

      await creerCommande(commandeData)
      viderPanier()
      navigate('/checkout/confirmation')
    } catch (err) {
      setErreur("Une erreur est survenue lors de l'envoi de la commande. Vérifie ta connexion et réessaie.")
      console.error(err)
    } finally {
      setEnvoiEnCours(false)
    }
  }

  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-8 py-24 text-center">
        <h1 className="font-serif text-2xl text-rafet-noir mb-3">Votre panier est vide</h1>
        <p className="text-sm text-rafet-gris mb-8">Ajoutez des articles avant de passer commande.</p>
        <Link to="/catalogue">
          <Button variant="brun">VOIR LE CATALOGUE</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="px-6 md:px-12 py-10">
      <h1 className="font-serif text-3xl text-rafet-noir mb-2">Finaliser la commande</h1>
      <p className="text-sm text-rafet-gris mb-10 flex items-center gap-2">
        <FontAwesomeIcon icon={faLock} className="text-xs" />
        Aucun compte requis — livraison à l'adresse indiquée
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <form onSubmit={handleSubmit} className="lg:col-span-2 flex flex-col gap-5">
          <div>
            <label className="text-sm text-rafet-noir mb-2 block">Nom complet *</label>
            <input
              type="text"
              name="nom"
              required
              value={formulaire.nom}
              onChange={handleChange}
              placeholder="Ex : sophie"
              className="w-full border border-rafet-beige px-4 py-3 text-sm outline-none focus:border-rafet-brun transition-colors rounded-md"
            />
          </div>

          <div>
            <label className="text-sm text-rafet-noir mb-2 block">Téléphone *</label>
            <input
              type="tel"
              name="telephone"
              required
              value={formulaire.telephone}
              onChange={handleChange}
              placeholder="Ex : 0612345678"
              className="w-full border border-rafet-beige px-4 py-3 text-sm outline-none focus:border-rafet-brun transition-colors rounded-md"
            />
          </div>

          <div>
            <label className="text-sm text-rafet-noir mb-2 block">Adresse de livraison *</label>
            <input
              type="text"
              name="adresse"
              required
              value={formulaire.adresse}
              onChange={handleChange}
              placeholder="Quartier, rue, numéro..."
              className="w-full border border-rafet-beige px-4 py-3 text-sm outline-none focus:border-rafet-brun transition-colors rounded-md"
            />
          </div>

          <div>
            <label className="text-sm text-rafet-noir mb-2 block">Ville *</label>
            <input
              type="text"
              name="ville"
              required
              value={formulaire.ville}
              onChange={handleChange}
              placeholder="Ex : Casablanca"
              className="w-full border border-rafet-beige px-4 py-3 text-sm outline-none focus:border-rafet-brun transition-colors rounded-md"
            />
          </div>

          <div>
            <label className="text-sm text-rafet-noir mb-2 block">Notes de livraison (optionnel)</label>
            <textarea
              name="notes"
              value={formulaire.notes}
              onChange={handleChange}
              rows={3}
              placeholder="Repère, disponibilité, instructions particulières..."
              className="w-full border border-rafet-beige px-4 py-3 text-sm outline-none focus:border-rafet-brun transition-colors rounded-md resize-none"
            />
          </div>

          {erreur && <p className="text-sm text-red-600">{erreur}</p>}

          <Button variant="brun" type="submit" disabled={envoiEnCours} className="mt-2">
            {envoiEnCours ? 'ENVOI EN COURS...' : 'CONFIRMER LA COMMANDE'}
          </Button>
        </form>

        <div className="bg-rafet-beige/40 rounded-xl p-6 h-fit">
          <h2 className="font-serif text-lg text-rafet-noir mb-6">Votre commande</h2>

          <div className="flex flex-col gap-4 mb-6">
            {articles.map((article) => (
              <div key={article.cle} className="flex gap-3">
                <div className="w-14 h-16 rounded-md overflow-hidden bg-rafet-beige flex-shrink-0">
                  {article.image && (
                    <img src={article.image} alt={article.nom} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-xs text-rafet-noir">{article.nom}</p>
                  <p className="text-[11px] text-rafet-gris">
                    {article.couleur} {article.taille !== 'Unique' && `· ${article.taille}`} · Qté {article.quantite}
                  </p>
                </div>
                <p className="text-xs text-rafet-brun">
                  {(article.prix * article.quantite).toLocaleString('fr-FR')} FCFA
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-rafet-brun/20 pt-4 flex justify-between text-base text-rafet-noir font-medium">
            <span>Total</span>
            <span>{totalPanier.toLocaleString('fr-FR')} Dirame</span>
          </div>
        </div>
      </div>
    </div>
  )
}