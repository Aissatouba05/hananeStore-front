import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export default function BarreRecherche() {
  return (
    <section className="px-6 md:px-12 py-8 bg-[#B76E79]/[0.06]">
      <div className="max-w-xl">
        <div className="flex items-center gap-3 border border-[#B76E79]/40 rounded-full px-5 py-3 bg-white">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-[#B76E79] text-sm" />
          <input
            type="text"
            placeholder="Rechercher un produit..."
            className="flex-1 bg-transparent outline-none text-sm text-[#111111] placeholder-[#111111]/50"
          />
        </div>
      </div>
    </section>
  )
}