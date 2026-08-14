import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Home from '../pages/Home'
import Catalogue from '../pages/Catalogue'
import ProduitDetail from '../pages/ProduitDetail'
import Panier from '../pages/Panier'
import Checkout from '../pages/Checkout'
import CheckoutConfirmation from '../pages/CheckoutConfirmation'
import Favoris from '../pages/Favoris'
import LoginAdmin from '../pages/admin/LoginAdmin'
import DashboardAdmin from '../pages/admin/DashboardAdmin'
import ProduitsAdmin from '../pages/admin/ProduitsAdmin'
import AjouterProduit from '../pages/admin/AjouterProduit'
import ProduitsAccueil from '../pages/admin/ProduitsAccueil'
import CommandesAdmin from '../pages/admin/CommandesAdmin'
import NotificationsAdmin from '../pages/admin/NotificationsAdmin'
import RouteProtegee from '../components/admin/RouteProtegee'
import ScrollToTop from '../components/ScrollToTop'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/catalogue" element={<Layout><Catalogue /></Layout>} />
        <Route path="/produit/:id" element={<Layout><ProduitDetail /></Layout>} />
        <Route path="/panier" element={<Layout><Panier /></Layout>} />
        <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
        <Route path="/checkout/confirmation" element={<Layout><CheckoutConfirmation /></Layout>} />
        <Route path="/favoris" element={<Layout><Favoris /></Layout>} />

        <Route path="/admin/connexion" element={<LoginAdmin />} />
        <Route path="/admin" element={<RouteProtegee><DashboardAdmin /></RouteProtegee>} />
        <Route path="/admin/produits" element={<RouteProtegee><ProduitsAdmin /></RouteProtegee>} />
        <Route path="/admin/produits/nouveau" element={<RouteProtegee><AjouterProduit /></RouteProtegee>} />
        <Route path="/admin/produits-accueil" element={<RouteProtegee><ProduitsAccueil /></RouteProtegee>} />
        <Route path="/admin/commandes" element={<RouteProtegee><CommandesAdmin /></RouteProtegee>} />
        <Route path="/admin/notifications" element={<RouteProtegee><NotificationsAdmin /></RouteProtegee>} />
      </Routes>
    </BrowserRouter>
  )
}