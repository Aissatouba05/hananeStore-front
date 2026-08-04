import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faHeart, faMinus, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarOutline } from '@fortawesome/free-regular-svg-icons'
import { getProduitById } from '../data/produits'
import { usePanier } from '../context/PanierContext'
import Button from '../components/ui/Button'

export default function ProduitDetail() {
  const { id } = useParams()
  const produit = getProduitById(id)
  const { ajouterAuPanier } = usePanier()

  const [imageActive, setImageActive] = useState(0)
  const [couleurActive, setCouleurActive] = useState(0)
  const [tailleActive, setTailleActive] = useState(0)
  const [quantite, setQuantite] = useState(1)
  const [ajoute, setAjoute] = useState(false)

  if (!produit) {
    return (
      <div className="px-8 py-24 text-center">
        <h1 className="font-serif text-2xl text-rafet-noir">Produit introuvable</h1>
        <Link to="/catalogue" className="text-rafet-brun text-sm underline mt-4 inline-block">
          Retour au catalogue
        </Link>
      </div>
    )
  }

  const etoiles = Math.round(produit.note)

  const handleAjouterAuPanier = () => {
    ajouterAuPanier(produit, produit.couleurs[couleurActive].nom, produit.tailles[tailleActive], quantite)
    setAjoute(true)
    setTimeout(() => setAjoute(false), 2000)
  }

  return (
    <div className="px-6 md:px-12 py-8">
      <div className="text-xs text-rafet-gris mb-8 flex items-center gap-2">
        <Link to="/" className="hover:text-rafet-brun">Accueil</Link>
        <span>/</span>
        <Link to={`/catalogue?categorie=${produit.categorie}`} className="hover:text-rafet-brun capitalize">
          {produit.categorie}
        </Link>
        <span>/</span>
        <span className="text-rafet-noir">{produit.nom}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        <div className="flex gap-4">
          <div className="flex flex-col gap-3">
            {produit.images.map((img, i) => (
              <button
                key={img}
                onClick={() => setImageActive(i)}
                className={`w-16 h-20 rounded-sm overflow-hidden border-2 transition-colors ${
                  i === imageActive ? 'border-rafet-brun' : 'border-transparent'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <div className="flex-1 aspect-[3/4] rounded-sm overflow-hidden bg-rafet-beige">
            <img
              src={produit.images[imageActive]}
              alt={produit.nom}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div>
          <h1 className="font-serif text-2xl md:text-3xl text-rafet-noir mb-3">{produit.nom}</h1>
          <p className="text-xl text-rafet-brun mb-4">{produit.prix.toLocaleString('fr-FR')} FCFA</p>

          <div className="flex items-center gap-2 mb-6 pb-6 border-b border-rafet-beige">
            <div className="flex gap-0.5 text-rafet-brun text-sm">
              {[1, 2, 3, 4, 5].map((n) => (
                <FontAwesomeIcon key={n} icon={n <= etoiles ? faStar : faStarOutline} />
              ))}
            </div>
            <span className="text-xs text-rafet-gris">{produit.nombreAvis} avis</span>
          </div>

          <div className="mb-6">
            <p className="text-sm text-rafet-noir mb-3">
              Couleur : <span className="text-rafet-gris">{produit.couleurs[couleurActive].nom}</span>
            </p>
            <div className="flex gap-3">
              {produit.couleurs.map((couleur, i) => (
                <button
                  key={couleur.nom}
                  onClick={() => setCouleurActive(i)}
                  aria-label={couleur.nom}
                  className={`w-9 h-9 rounded-full border-2 transition-transform ${
                    i === couleurActive ? 'border-rafet-brun scale-110' : 'border-rafet-beige'
                  }`}
                  style={{ backgroundColor: couleur.hex }}
                ></button>
              ))}
            </div>
          </div>

          {produit.tailles[0] !== 'Unique' && (
            <div className="mb-6">
              <p className="text-sm text-rafet-noir mb-3">Taille</p>
              <div className="flex flex-wrap gap-2">
                {produit.tailles.map((taille, i) => (
                  <button
                    key={taille}
                    onClick={() => setTailleActive(i)}
                    className={`px-4 py-2 text-xs border transition-colors ${
                      i === tailleActive
                        ? 'bg-rafet-brun text-white border-rafet-brun'
                        : 'border-rafet-beige text-rafet-noir hover:border-rafet-brun'
                    }`}
                  >
                    {taille}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-8">
            <p className="text-sm text-rafet-noir mb-3">Quantité</p>
            <div className="flex items-center gap-4 border border-rafet-beige w-fit">
              <button
                onClick={() => setQuantite((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-rafet-brun"
                aria-label="Diminuer"
              >
                <FontAwesomeIcon icon={faMinus} className="text-xs" />
              </button>
              <span className="text-sm w-4 text-center">{quantite}</span>
              <button
                onClick={() => setQuantite((q) => q + 1)}
                className="px-3 py-2 text-rafet-brun"
                aria-label="Augmenter"
              >
                <FontAwesomeIcon icon={faPlus} className="text-xs" />
              </button>
            </div>
          </div>

          <div className="flex gap-3 mb-10">
            <Button
              variant="brun"
              className="flex-1 flex items-center justify-center gap-2"
              onClick={handleAjouterAuPanier}
            >
              {ajoute ? (
                <>
                  <FontAwesomeIcon icon={faCheck} />
                  AJOUTÉ AU PANIER
                </>
              ) : (
                'AJOUTER AU PANIER'
              )}
            </Button>
            <button
              aria-label="Ajouter aux favoris"
              className="w-12 h-12 border border-rafet-beige flex items-center justify-center text-rafet-brun hover:bg-rafet-beige transition-colors"
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>
          </div>

          <div className="border-t border-rafet-beige pt-6">
            <p className="text-sm text-rafet-noir mb-3 font-medium">Description</p>
            <p className="text-sm text-rafet-gris leading-relaxed">{produit.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}