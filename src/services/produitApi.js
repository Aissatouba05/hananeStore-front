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

export const creerProduit = async (formData, token) => {
  const { data } = await api.post('/produits', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  })
  return data
}