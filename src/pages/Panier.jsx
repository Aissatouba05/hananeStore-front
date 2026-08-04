import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faMinus, faPlus, faBagShopping } from '@fortawesome/free-solid-svg-icons'
import { usePanier } from '../context/PanierContext'
import Button from '../components/ui/Button'

export default function Panier() {
  const { articles, retirerDuPanier, modifierQuantite, totalPanier } = usePanier()

  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-8 py-24 text-center">
        <FontAwesomeIcon icon={faBagShopping} className="text-rafet-beige text-4xl mb-6" />
        <h1 className="font-serif text-2xl text-rafet-noir mb-3">Votre panier est vide</h1>
        <p className="text-sm text-rafet-gris mb-8 max-w-sm">
          Parcourez notre catalogue pour trouver la pièce qui vous correspond.
        </p>
        <Link to="/catalogue">
          <Button variant="brun">VOIR LE CATALOGUE</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="px-6 md:px-12 py-10">
      <h1 className="font-serif text-3xl text-rafet-noir mb-10">Mon panier</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Liste des articles */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {articles.map((article) => (
            <div
              key={article.cle}
              className="flex gap-4 bg-white border border-rafet-beige rounded-xl p-4"
            >
              <Link to={`/produit/${article.id}`} className="w-24 h-28 rounded-lg overflow-hidden flex-shrink-0 bg-rafet-beige">
                <img src={article.image} alt={article.nom} className="w-full h-full object-cover" />
              </Link>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <Link to={`/produit/${article.id}`} className="text-sm text-rafet-noir font-medium hover:text-rafet-brun">
                    {article.nom}
                  </Link>
                  <p className="text-xs text-rafet-gris mt-1">
                    {article.couleur} {article.taille !== 'Unique' && `· Taille ${article.taille}`}
                  </p>
                  <p className="text-sm text-rafet-brun mt-2">{article.prix.toLocaleString('fr-FR')} FCFA</p>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-3 border border-rafet-beige rounded-full px-2 py-1">
                    <button
                      onClick={() => modifierQuantite(article.cle, article.quantite - 1)}
                      className="w-6 h-6 flex items-center justify-center text-rafet-brun"
                      aria-label="Diminuer"
                    >
                      <FontAwesomeIcon icon={faMinus} className="text-[10px]" />
                    </button>
                    <span className="text-sm w-4 text-center">{article.quantite}</span>
                    <button
                      onClick={() => modifierQuantite(article.cle, article.quantite + 1)}
                      className="w-6 h-6 flex items-center justify-center text-rafet-brun"
                      aria-label="Augmenter"
                    >
                      <FontAwesomeIcon icon={faPlus} className="text-[10px]" />
                    </button>
                  </div>

                  <button
                    onClick={() => retirerDuPanier(article.cle)}
                    className="text-rafet-gris hover:text-rafet-brun transition-colors"
                    aria-label="Retirer"
                  >
                    <FontAwesomeIcon icon={faTrash} className="text-sm" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Résumé */}
        <div className="bg-rafet-beige/40 rounded-xl p-6 h-fit">
          <h2 className="font-serif text-lg text-rafet-noir mb-6">Résumé de la commande</h2>

          <div className="flex justify-between text-sm text-rafet-noir mb-3">
            <span>Sous-total</span>
            <span>{totalPanier.toLocaleString('fr-FR')} FCFA</span>
          </div>
          <div className="flex justify-between text-sm text-rafet-gris mb-4">
            <span>Livraison</span>
            <span>Calculée à l'étape suivante</span>
          </div>

          <div className="border-t border-rafet-brun/20 pt-4 flex justify-between text-base text-rafet-noir font-medium mb-6">
            <span>Total</span>
            <span>{totalPanier.toLocaleString('fr-FR')} FCFA</span>
          </div>

          <Link to="/checkout">
            <Button variant="brun" className="w-full">PASSER LA COMMANDE</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
