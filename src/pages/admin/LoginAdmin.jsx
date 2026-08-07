import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/ui/Button'

export default function LoginAdmin() {
  const { connecter } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [afficherMotDePasse, setAfficherMotDePasse] = useState(false)
  const [erreur, setErreur] = useState(null)
  const [envoiEnCours, setEnvoiEnCours] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErreur(null)
    setEnvoiEnCours(true)

    try {
      await connecter(email, motDePasse)
      navigate('/admin')
    } catch (err) {
      setErreur('Email ou mot de passe incorrect.')
      console.error(err)
    } finally {
      setEnvoiEnCours(false)
    }
  }

  return (
    <div className="min-h-screen bg-rafet-noir flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="font-serif text-2xl text-white tracking-widest">HananeStore</p>
          <p className="text-xs text-white/40 tracking-[3px] mt-2">ESPACE ADMINISTRATEUR</p>
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-rafet-beige flex items-center justify-center mx-auto mb-6">
            <FontAwesomeIcon icon={faLock} className="text-rafet-brun" />
          </div>

          <h1 className="font-serif text-xl text-rafet-noir text-center mb-1">Connexion</h1>
          <p className="text-sm text-rafet-gris text-center mb-8">
            Accédez à votre tableau de bord
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="text-xs tracking-widest text-rafet-noir mb-2 block">EMAIL</label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-rafet-gris text-sm"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@hananestore.sn"
                  className="w-full border border-rafet-beige pl-11 pr-4 py-3 text-sm outline-none focus:border-rafet-brun transition-colors rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="text-xs tracking-widest text-rafet-noir mb-2 block">MOT DE PASSE</label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-rafet-gris text-sm"
                />
                <input
                  type={afficherMotDePasse ? 'text' : 'password'}
                  required
                  value={motDePasse}
                  onChange={(e) => setMotDePasse(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-rafet-beige pl-11 pr-11 py-3 text-sm outline-none focus:border-rafet-brun transition-colors rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setAfficherMotDePasse((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-rafet-gris text-sm"
                  aria-label="Afficher le mot de passe"
                >
                  <FontAwesomeIcon icon={afficherMotDePasse ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>

            {erreur && (
              <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-lg">{erreur}</p>
            )}

            <Button
              variant="brun"
              type="submit"
              disabled={envoiEnCours}
              className="mt-2 rounded-lg"
            >
              {envoiEnCours ? 'CONNEXION...' : 'SE CONNECTER'}
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-white/30 mt-8">
          Accès réservé à l'administration de HananeStore
        </p>
      </div>
    </div>
  )
}