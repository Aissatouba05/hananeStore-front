import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from '../ui/Button'

const heroImages = [
  'https://picsum.photos/seed/rafet1/1200/700',
  'https://picsum.photos/seed/rafet2/1200/700',
  'https://picsum.photos/seed/rafet2/1200/700',
  'https://picsum.photos/seed/rafet3/1200/700',
]

export default function Hero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-[420px] md:h-[520px] overflow-hidden">
      {heroImages.map((src, i) => (
        <img
          key={src}
          src={src}
          alt="Collection HananeStore"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

      <div className="relative h-full flex flex-col justify-end px-6 md:px-12 pb-12 max-w-xl">
        <span className="text-[11px] tracking-[3px] text-rafet-beige mb-3">
          LES PIÈCES ICONIQUES DE LA SAISON
        </span>
        <h1 className="font-serif font-light text-3xl md:text-5xl text-white leading-tight mb-5">
          Sacs & Accessoires
        </h1>
        <div className="w-10 h-px bg-rafet-beige mb-6"></div>
        <Link to="/catalogue">
          <Button variant="beige">DÉCOUVRIR LA COLLECTION</Button>
        </Link>
      </div>

      <div className="absolute right-8 bottom-8 flex gap-2">
        {heroImages.map((_, i) => (
          <span
            key={i}
            className={`h-[2px] w-4 transition-colors duration-300 ${
              i === index ? 'bg-white' : 'bg-white/40'
            }`}
          ></span>
        ))}
      </div>
    </div>
  )
}