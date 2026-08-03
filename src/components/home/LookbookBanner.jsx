import { Link } from 'react-router-dom'
import Button from '../ui/Button'

export default function LookbookBanner() {
  return (
    <section className="relative h-[380px] md:h-[460px] overflow-hidden">
      <img
        src="https://picsum.photos/seed/rafet-lookbook/1400/700"
        alt="Lookbook Automne-Hiver"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>

      <div className="relative h-full flex flex-col justify-center px-6 md:px-14 max-w-lg">
        <span className="text-[11px] tracking-[3px] text-rafet-beige mb-3">LOOKBOOK AH 2026</span>
        <h2 className="font-serif font-light text-2xl md:text-4xl text-white leading-snug mb-4">
          L'Art de S'habiller avec Intention
        </h2>
        <p className="text-sm text-white/80 leading-relaxed mb-7">
          Chaque pièce est pensée comme une œuvre — matières nobles, coupes intemporelles,
          silhouettes qui traversent les saisons.
        </p>
        <Link to="/catalogue">
          <Button variant="outline">VOIR LE LOOKBOOK</Button>
        </Link>
      </div>
    </section>
  )
}
