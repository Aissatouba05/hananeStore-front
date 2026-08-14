import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import jouetImage from '../../assets/jouet1.png'

export default function LookbookBanner() {
  return (
    <section className="relative h-[380px] md:h-[460px] overflow-hidden">
      <img
        src={jouetImage}
        alt="Collection Enfants HananeStore"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>

      <div className="relative h-full flex flex-col justify-center px-6 md:px-14 max-w-lg">
        {/* <span className="text-[11px] tracking-[3px] text-rafet-beige mb-3">COLLECTION ENFANTS</span> */}
        <h2 className="font-serif font-light text-2xl md:text-4xl text-white leading-snug mb-4">
          Des Sourires à Chaque Découverte
        </h2>
        {/* <p className="text-sm text-white/80 leading-relaxed mb-7">
          Jouets éducatifs, cartables et petites merveilles pensés pour éveiller la curiosité
          et accompagner vos enfants au quotidien.
        </p> */}
        {/* <Link to="/catalogue?rayon=enfants">
          <Button variant="outline">DÉCOUVRIR LA COLLECTION</Button>
        </Link> */}
      </div>
    </section>
  )
}