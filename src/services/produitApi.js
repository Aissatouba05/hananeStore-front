import api from './api'

export const listerProduits = async (categorieSlug, rayon, recherche) => {
  const params = {}
  if (categorieSlug) params.categorie = categorieSlug
  if (rayon) params.rayon = rayon
  if (recherche) params.recherche = recherche

  const { data } = await api.get('/produits', { params })
  return data
}

// Produits mis en avant sur la page d'accueil (section "Pièces de la saison")
export const listerProduitsVedettes = async (limite = 3) => {
  const { data } = await api.get('/produits', {
    params: { misEnAvant: true, limite },
  })
  return data
}

// Produits marqués "nouveauté" pour le carrousel de la page d'accueil
export const listerNouveautes = async (limite = 8) => {
  const { data } = await api.get('/produits', {
    params: { nouveaute: true, limite },
  })
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

export const modifierProduit = async (id, formData, token) => {
  const { data } = await api.put(`/produits/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  })
  return data
}