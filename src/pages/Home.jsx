import Hero from '../components/home/Hero'
import FeaturedProducts from '../components/home/FeaturedProducts'
import LookbookBanner from '../components/home/LookbookBanner'
import NewArrivals from '../components/home/NewArrivals'
import Newsletter from '../components/home/Newsletter'

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <LookbookBanner />
      <NewArrivals />
      <Newsletter />
    </div>
  )
}
