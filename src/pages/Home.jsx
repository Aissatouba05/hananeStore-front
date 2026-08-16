import Hero from '../components/home/Hero'
import BarreRecherche from '../components/home/BarreRecherche'
import FeaturedProducts from '../components/home/FeaturedProducts'
import LookbookBanner from '../components/home/LookbookBanner'
import CategoriesRayon from '../components/home/CategoriesRayon'
import NewArrivals from '../components/home/NewArrivals'
import AProposAccueil from '../components/home/AProposAccueil'
import Newsletter from '../components/home/Newsletter'

export default function Home() {
  return (
    <div>
      <Hero />
      <BarreRecherche />
      <FeaturedProducts />
      <LookbookBanner />
      <CategoriesRayon />
      <NewArrivals />
      <AProposAccueil />
      <Newsletter />
    </div>
  )
}