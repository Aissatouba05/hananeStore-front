import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faWhatsapp, faFacebook, faTiktok } from '@fortawesome/free-brands-svg-icons'

export default function Footer() {
  return (
    <footer className="mt-16 bg-rafet-beige/30 border-t border-rafet-beige">
      <div className="px-8 md:px-16 py-14 flex flex-col md:flex-row items-center md:items-start justify-between gap-10 text-center md:text-left">
        {/* Marque */}
        <div className="max-w-xs">
          <p className="font-serif text-2xl text-rafet-noir mb-3">HananeStore</p>
          <p className="text-sm text-rafet-gris leading-relaxed">
            Sacs, chaussures, vêtements et accessoires sélectionnés avec soin pour un look élégant et moderne.
          </p>
        </div>

        {/* Réseaux sociaux — centrés */}
        <div>
          <p className="text-xs tracking-widest text-rafet-noir mb-4">SUIVEZ-NOUS</p>
          <div className="flex items-center justify-center gap-5 text-rafet-brun text-xl">
            <a href="#" aria-label="Instagram" className="hover:text-rafet-noir transition-colors">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" aria-label="WhatsApp" className="hover:text-rafet-noir transition-colors">
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-rafet-noir transition-colors">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="#" aria-label="TikTok" className="hover:text-rafet-noir transition-colors">
              <FontAwesomeIcon icon={faTiktok} />
            </a>
          </div>
        </div>

        {/* Contact */}
        <div>
          <p className="text-xs tracking-widest text-rafet-noir mb-4">CONTACT</p>
          <div className="flex flex-col gap-2 text-sm text-rafet-gris items-center md:items-start">
            <span className="flex items-center gap-2">
              <FontAwesomeIcon icon={faLocationDot} className="text-rafet-brun w-3.5" />
              Dakar, Sénégal
            </span>
            <span className="flex items-center gap-2">
              <FontAwesomeIcon icon={faPhone} className="text-rafet-brun w-3.5" />
              +221 XX XXX XX XX
            </span>
            <span className="flex items-center gap-2">
              <FontAwesomeIcon icon={faEnvelope} className="text-rafet-brun w-3.5" />
              contact@hananestore.sn
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-rafet-brun/10 px-8 md:px-16 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-[11px] text-rafet-gris">© 2026 HananeStore. Tous droits réservés.</p>
        <Link to="/admin/connexion" className="text-[11px] text-rafet-gris/60 hover:text-rafet-brun transition-colors">
          Espace Admin
        </Link>
      </div>
    </footer>
  )
}