import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash, faImage } from '@fortawesome/free-solid-svg-icons'
import AdminLayout from '../../components/admin/AdminLayout'
import { useAuth } from '../../context/AuthContext'
import api from '../../services/api'
import Button from '../../components/ui/Button'

export default function AjouterProduit() {
  const { utilisateur } = useAuth()
  const navigate = useNavigate()

  const [categories, setCategories] = useState([])
  const [nom, setNom] = useState('')
  const [description, setDescription] = useState('')
  const [prix, setPrix] = useState('')
  const [categorie, setCategorie] = useState('')
  const [badge, setBadge] = useState('')
  const [images, setImages] = useState([])
  const [variantes, setVariantes] = useState([
    { couleurNom: '', couleurHex: '#4C352B', taille: '', stock: '' },
  ])

  const [envoiEnCours, setEnvoiEnCours] = useState(false)
  const [erreur, setErreur] = useState(null)

  useEffect(() => {
    const chargerCategories = async () => {
      try {
        const { data } = await api.get('/categories')
        setCategories(data)
        if (data.length > 0) setCategorie(data[0]._id)
      } catch (err) {
        console.error(err)
      }
    }
    chargerCategories()
  }, [])

  const ajouterVariante = () => {
    setVariantes([...variantes, { couleurNom: '', couleurHex: '#4C352B', taille: '', stock: '' }])
  }

  const supprimerVariante = (index) => {
    setVariantes(variantes.filter((_, i) => i !== index))
  }

  const modifierVariante = (index, champ, valeur) => {
    const copie = [...variantes]
    copie[index][champ] = valeur
    setVariantes(copie)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErreur(null)
    setEnvoiEnCours(true)

    try {
      const formData = new FormData()
      formData.append('nom', nom)
      formData.append('description', description)
      formData.append('prix', prix)
      formData.append('categorie', categorie)
      if (badge) formData.append('badge', badge)

      const variantesValides = variantes
        .filter((v) => v.couleurNom && v.stock !== '')
        .map((v) => ({ ...v, stock: Number(v.stock) }))
      formData.append('variantes', JSON.stringify(variantesValides))

      images.forEach((image) => {
        formData.append('images', image)
      })

      await api.post('/produits', formData, {
        headers: {
          Authorization: `Bearer ${utilisateur.token}`,
          'Content-Type': 'multipart/form-data',
        },
      })

      navigate('/admin/produits')
    } catch (err) {
      setErreur(err.response?.data?.message || "Une erreur est survenue lors de la création.")
      console.error(err)
    } finally {
      setEnvoiEnCours(false)
    }
  }

  return (
    <AdminLayout>
      <h1 className="font-serif text-2xl text-rafet-noir mb-8">Ajouter un produit</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl flex flex-col gap-8">
        {/* Infos de base */}
        <div className="bg-white border border-rafet-beige rounded-xl p-6 flex flex-col gap-5">
          <h2 className="text-sm tracking-widest text-rafet-noir">INFORMATIONS GÉNÉRALES</h2>

          <div>
            <label className="text-sm text-rafet-noir mb-2 block">Nom du produit</label>
            <input
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
              className="w-full border border-rafet-beige px-4 py-3 text-sm outline-none focus:border-rafet-brun rounded-md"
            />
          </div>

          <div>
            <label className="text-sm text-rafet-noir mb-2 block">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              className="w-full border border-rafet-beige px-4 py-3 text-sm outline-none focus:border-rafet-brun rounded-md resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-rafet-noir mb-2 block">Prix (FCFA)</label>
              <input
                type="number"
                value={prix}
                onChange={(e) => setPrix(e.target.value)}
                required
                className="w-full border border-rafet-beige px-4 py-3 text-sm outline-none focus:border-rafet-brun rounded-md"
              />
            </div>

            <div>
              <label className="text-sm text-rafet-noir mb-2 block">Catégorie</label>
              <select
                value={categorie}
                onChange={(e) => setCategorie(e.target.value)}
                required
                className="w-full border border-rafet-beige px-4 py-3 text-sm outline-none focus:border-rafet-brun rounded-md capitalize"
              >
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.nom}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm text-rafet-noir mb-2 block">Badge (optionnel)</label>
            <select
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              className="w-full border border-rafet-beige px-4 py-3 text-sm outline-none focus:border-rafet-brun rounded-md"
            >
              <option value="">Aucun</option>
              <option value="NOUVEAU">Nouveau</option>
              <option value="BEST-SELLER">Best-seller</option>
              <option value="EXCLUSIF">Exclusif</option>
            </select>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white border border-rafet-beige rounded-xl p-6 flex flex-col gap-4">
          <h2 className="text-sm tracking-widest text-rafet-noir">IMAGES</h2>

          <label className="flex items-center justify-center gap-2 border-2 border-dashed border-rafet-beige rounded-md py-8 cursor-pointer hover:border-rafet-brun transition-colors text-rafet-gris text-sm">
            <FontAwesomeIcon icon={faImage} />
            Cliquer pour choisir des images
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setImages(Array.from(e.target.files))}
              className="hidden"
            />
          </label>

          {images.length > 0 && (
            <div className="flex gap-3 flex-wrap">
              {images.map((img, i) => (
                <div key={i} className="w-16 h-16 rounded-md overflow-hidden bg-rafet-beige">
                  <img src={URL.createObjectURL(img)} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Variantes */}
        <div className="bg-white border border-rafet-beige rounded-xl p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm tracking-widest text-rafet-noir">VARIANTES (COULEUR / TAILLE / STOCK)</h2>
            <button
              type="button"
              onClick={ajouterVariante}
              className="text-xs text-rafet-brun hover:underline flex items-center gap-1"
            >
              <FontAwesomeIcon icon={faPlus} className="text-[10px]" />
              Ajouter
            </button>
          </div>

          {variantes.map((variante, index) => (
            <div key={index} className="grid grid-cols-[1fr_auto_1fr_1fr_auto] gap-3 items-end">
              <div>
                <label className="text-xs text-rafet-gris mb-1 block">Couleur</label>
                <input
                  value={variante.couleurNom}
                  onChange={(e) => modifierVariante(index, 'couleurNom', e.target.value)}
                  placeholder="Ex : Brun"
                  className="w-full border border-rafet-beige px-3 py-2 text-sm outline-none focus:border-rafet-brun rounded-md"
                />
              </div>
              <div>
                <label className="text-xs text-rafet-gris mb-1 block">Teinte</label>
                <input
                  type="color"
                  value={variante.couleurHex}
                  onChange={(e) => modifierVariante(index, 'couleurHex', e.target.value)}
                  className="w-12 h-10 border border-rafet-beige rounded-md cursor-pointer"
                />
              </div>
              <div>
                <label className="text-xs text-rafet-gris mb-1 block">Taille (optionnel)</label>
                <input
                  value={variante.taille}
                  onChange={(e) => modifierVariante(index, 'taille', e.target.value)}
                  placeholder="Ex : M"
                  className="w-full border border-rafet-beige px-3 py-2 text-sm outline-none focus:border-rafet-brun rounded-md"
                />
              </div>
              <div>
                <label className="text-xs text-rafet-gris mb-1 block">Stock</label>
                <input
                  type="number"
                  value={variante.stock}
                  onChange={(e) => modifierVariante(index, 'stock', e.target.value)}
                  className="w-full border border-rafet-beige px-3 py-2 text-sm outline-none focus:border-rafet-brun rounded-md"
                />
              </div>
              <button
                type="button"
                onClick={() => supprimerVariante(index)}
                className="text-rafet-gris hover:text-red-600 p-2"
                aria-label="Supprimer cette variante"
              >
                <FontAwesomeIcon icon={faTrash} className="text-xs" />
              </button>
            </div>
          ))}
        </div>

        {erreur && <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-lg">{erreur}</p>}

        <div className="flex gap-3">
          <Button variant="brun" type="submit" disabled={envoiEnCours}>
            {envoiEnCours ? 'CRÉATION EN COURS...' : 'CRÉER LE PRODUIT'}
          </Button>
          <button
            type="button"
            onClick={() => navigate('/admin/produits')}
            className="px-6 py-3 text-xs tracking-widest text-rafet-gris hover:text-rafet-noir transition-colors"
          >
            ANNULER
          </button>
        </div>
      </form>
    </AdminLayout>
  )
}
