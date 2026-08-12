import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import img1 from "../../assets/img3.png";
import img2 from "../../assets/img2.png";
import img3 from "../../assets/img1.png";

const rayons = [
  {
    label: 'Femme',
    accroche: 'Élégance au quotidien',
    lien: '/catalogue?rayon=femme',
    image: img1,
  },
  {
    label: 'Homme',
    accroche: 'Style affirmé',
    lien: '/catalogue?rayon=homme',
    image: img2,
  },
  {
    label: 'Enfants',
    accroche: 'Petites merveilles',
    lien: '/catalogue?rayon=enfants',
    image: img3,
  },
]

function CarteRayon({ rayon, delai }) {
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
    <Link
      ref={ref}
      to={rayon.lien}
      className="group relative block h-[380px] md:h-[460px] overflow-hidden rounded-xl"
    >
      <img
        src={rayon.image}
        alt={rayon.label}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 ${
          visible ? 'opacity-100 scale-100' : 'opacity-0 scale-125'
        }`}
        style={{ transitionDelay: visible ? `${delai}ms` : '0ms' }}
      />

      <div
        className="absolute inset-0 bg-[#B76E79] pointer-events-none transition-transform duration-[1000ms] ease-in-out"
        style={{
          transform: visible ? 'scaleY(0)' : 'scaleY(1)',
          transformOrigin: 'bottom',
          transitionDelay: visible ? `${delai}ms` : '0ms',
        }}
      ></div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent group-hover:from-black/80 transition-colors duration-300"></div>

      <div
        className={`absolute inset-0 flex flex-col justify-end p-7 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ transitionDelay: visible ? `${delai + 500}ms` : '0ms' }}
      >
        <span className="text-[11px] tracking-[3px] mb-2" style={{ color: '#B76E79' }}>
          {rayon.accroche}
        </span>
        <h3 className="font-serif text-3xl text-white mb-4">{rayon.label}</h3>
        <span className="inline-flex items-center gap-2 text-xs tracking-widest text-white border-b border-white/40 w-fit pb-1 group-hover:border-white transition-colors">
          DÉCOUVRIR
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  )
}

export default function CategoriesRayon() {
  return (
    <section className="px-6 md:px-12 py-14">
      <div className="text-center mb-10">
        <span className="text-[11px] tracking-[3px] text-rafet-gris">EXPLOREZ</span>
        <h2 className="font-serif text-2xl md:text-3xl text-rafet-noir mt-1">Une boutique pour chacun</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rayons.map((rayon, i) => (
          <CarteRayon key={rayon.label} rayon={rayon} delai={i * 200} />
        ))}
      </div>
    </section>
  )
}