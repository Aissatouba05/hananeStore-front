import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import Button from '../components/ui/Button'

export default function CheckoutConfirmation() {
  return (
    <div className="flex flex-col items-center justify-center px-8 py-24 text-center">
      <FontAwesomeIcon icon={faCircleCheck} className="text-rafet-brun text-5xl mb-6" />
      <h1 className="font-serif text-3xl text-rafet-noir mb-3">Commande confirmée !</h1>
      <p className="text-sm text-rafet-gris mb-8 max-w-md">
        Merci pour votre commande. Nous vous contacterons très bientôt au numéro indiqué
        pour organiser la livraison.
      </p>
      <Link to="/">
        <Button variant="brun">RETOUR À L'ACCUEIL</Button>
      </Link>
    </div>
  )
}