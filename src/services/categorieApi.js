import api from './api'

export const listerCategories = async (rayon) => {
  const params = rayon ? { rayon } : {}
  const { data } = await api.get('/categories', { params })
  return data
}