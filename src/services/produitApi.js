import api from './api'

export const listerProduits = async (categorieSlug) => {
  const params = categorieSlug ? { categorie: categorieSlug } : {}
  const { data } = await api.get('/produits', { params })
  return data
}

export const obtenirProduit = async (id) => {
  const { data } = await api.get(`/produits/${id}`)
  return data
}
