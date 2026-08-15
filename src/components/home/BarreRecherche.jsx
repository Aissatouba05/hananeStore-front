import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export default function BarreRecherche() {
  const [terme, setTerme] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (terme.trim()) {
      navigate(`/catalogue?recherche=${encodeURIComponent(terme.trim())}`)
    }
  }

  return (
    <section className="px-6 md:px-12 py-8 bg-[#B76E79]/[0.04]">
      <form onSubmit={handleSubmit} className="max-w-xl">
        <div className="flex items-center gap-3 border border-[#B76E79]/40 rounded-full px-5 py-3 bg-white">
          <button type="submit" aria-label="Rechercher">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-[#B76E79] text-sm" />
          </button>
          <input
            type="text"
            value={terme}
            onChange={(e) => setTerme(e.target.value)}
            placeholder="Rechercher un produit..."
            className="flex-1 bg-transparent outline-none text-sm text-[#111111] placeholder-[#111111]/50"
          />
        </div>
      </form>
    </section>
  )
}