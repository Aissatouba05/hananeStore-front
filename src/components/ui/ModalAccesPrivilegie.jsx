import { useState } from 'react'
import { createPortal } from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

export default function ModalAccesPrivilegie({ onFermer, onAbonnement }) {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem('hananestore_abonnee', 'true')
    localStorage.setItem('hananestore_email', email)
    onAbonnement()
  }

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center px-6"
      onClick={onFermer}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full px-6 py-10 text-center relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onFermer}
          aria-label="Fermer"
          className="absolute top-4 right-4 text-rafet-gris hover:text-rafet-noir transition-colors"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <span className="text-[11px] tracking-[3px]" style={{ color: '#B76E79' }}>
          RESTEZ CONNECTÉE
        </span>
        <h2 className="font-serif text-2xl mt-3 mb-4" style={{ color: '#111111' }}>
          Accès Privilégié
        </h2>
        <p className="text-sm text-rafet-gris max-w-sm mx-auto mb-8 leading-relaxed">
          Abonnez-vous pour ajouter des articles à vos favoris, et soyez la première à
          découvrir nos nouvelles collections et offres exclusives.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-sm mx-auto border border-rafet-beige rounded-md sm:rounded-none overflow-hidden">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre adresse e-mail"
            required
            className="flex-1 min-w-0 bg-transparent text-rafet-noir placeholder-rafet-gris text-sm px-4 py-3 outline-none"
          />
          <button
            type="submit"
            className="text-white text-xs tracking-widest px-6 py-3 sm:py-0 transition-colors whitespace-nowrap"
            style={{ backgroundColor: '#B76E79' }}
          >
            S'ABONNER
          </button>
        </form>

        <p className="text-[11px] text-rafet-gris mt-4">
          Aucun spam. Désabonnement possible à tout moment.
        </p>
      </div>
    </div>,
    document.body
  )
}