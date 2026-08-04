import api from './api'

export const creerCommande = async (commande) => {
  const { data } = await api.post('/commandes', commande)
  return data
}
