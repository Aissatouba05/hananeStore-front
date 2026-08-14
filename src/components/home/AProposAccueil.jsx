import { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShirt, faSprayCan, faShapes } from '@fortawesome/free-solid-svg-icons'

const piliers = [
  {
    label: 'Pour elle',
    icon: faShirt,
    texte: 'Vêtements, chaussures, sacs, parfums et accessoires, choisis pour allier élégance et praticité.',
  },
  {
    label: 'Pour lui',
    icon: faSprayCan,
    texte: 'Parfums, accessoires et chaussures, sélectionnés pour accompagner chaque occasion.',
  },
  {
    label: 'Pour les enfants',
    icon: faShapes,
    texte: 'Jouets et cartables, choisis avec soin pour leur qualité et leur durabilité.',
  },
]

function CartePilier({ pilier, delai }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl p-7 border border-[#B76E79]/15 shadow-[0_20px_50px_-20px_rgba(183,110,121,0.35)] transition-all duration-700 ease-out hover:-translate-y-1 hover:shadow-[0_28px_60px_-18px_rgba(183,110,121,0.45)] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: visible ? `${delai}ms` : '0ms' }}
    >
      <div className="w-11 h-11 rounded-full bg-[#B76E79]/10 flex items-center justify-center mb-5">
        <FontAwesomeIcon icon={pilier.icon} className="text-[#B76E79] text-base" />
      </div>
      <h3 className="font-serif text-lg text-rafet-noir mb-2">{pilier.label}</h3>
      <p className="text-sm text-rafet-gris leading-relaxed">{pilier.texte}</p>
    </div>
  )
}

export default function AProposAccueil() {
  const [visibleIntro, setVisibleIntro] = useState(false)
  const introRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisibleIntro(entry.isIntersecting),
      { threshold: 0.2 }
    )
    if (introRef.current) observer.observe(introRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="px-6 md:px-12 py-16 bg-[#B76E79]/[0.04]">
      <div className="text-center mb-10">
        <span className="text-[11px] tracking-[3px] text-rafet-gris">QUI SOMMES-NOUS</span>
        <h2 className="font-serif text-2xl md:text-3xl text-rafet-noir mt-1">
          Une boutique pensée pour toute la famille
        </h2>
      </div>

      <div
        ref={introRef}
        className={`max-w-2xl mx-auto bg-white rounded-2xl p-8 md:p-10 mb-10 border border-[#B76E79]/15 shadow-[0_25px_60px_-20px_rgba(183,110,121,0.3)] transition-all duration-700 ease-out ${
          visibleIntro ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <p className="text-sm md:text-base text-rafet-gris leading-relaxed text-center">
          Chez HananeStore, chaque membre de la famille trouve sa place. Chaque pièce de notre
          catalogue est sélectionnée avec attention, pour t'offrir un shopping simple, élégant
          et accessible. Abonne-toi à notre newsletter pour être la première informée de nos
          nouveautés et offres exclusives, ou contacte-nous directement sur WhatsApp pour toute
          question avant ton achat.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {piliers.map((pilier, i) => (
          <CartePilier key={pilier.label} pilier={pilier} delai={i * 150} />
        ))}
      </div>
    </section>
  )
}
