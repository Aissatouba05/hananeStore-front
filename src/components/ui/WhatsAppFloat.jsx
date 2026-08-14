import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'

const NUMERO_WHATSAPP = '212614019717'
const LIEN_WHATSAPP = 'https://wa.me/' + NUMERO_WHATSAPP

export default function WhatsAppFloat() {
  return (
    <a
      href={LIEN_WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter sur WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg animate-whatsapp-zoom hover:scale-110 transition-transform duration-200"
    >
      <FontAwesomeIcon icon={faWhatsapp} className="text-white text-2xl" />
    </a>
  )
}