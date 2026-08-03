import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Home from '../pages/Home'
import Catalogue from '../pages/Catalogue'
import ProduitDetail from '../pages/ProduitDetail'
import Panier from '../pages/Panier'
import Checkout from '../pages/Checkout'
import Favoris from '../pages/Favoris'
import DashboardAdmin from '../pages/admin/DashboardAdmin'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/produit/:id" element={<ProduitDetail />} />
          <Route path="/panier" element={<Panier />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/favoris" element={<Favoris />} />
          <Route path="/admin" element={<DashboardAdmin />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}