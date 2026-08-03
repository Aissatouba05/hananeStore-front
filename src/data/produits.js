export const produits = [
  {
    id: 1,
    nom: 'Sac besace cuir',
    prix: 45000,
    badge: 'BEST-SELLER',
    categorie: 'sacs',
    note: 4.8,
    nombreAvis: 132,
    description:
      "Un sac besace en cuir véritable, pensé pour accompagner vos journées avec élégance. Sa coupe intemporelle et ses finitions soignées en font une pièce durable, à porter en toute saison.",
    couleurs: [
      { nom: 'Brun cuir', hex: '#4C352B' },
      { nom: 'Beige sable', hex: '#D2C3A5' },
      { nom: 'Noir', hex: '#000000' },
    ],
    tailles: ['Unique'],
    images: [
      'https://picsum.photos/seed/rafet1a/700/800',
      'https://picsum.photos/seed/rafet1b/700/800',
      'https://picsum.photos/seed/rafet1c/700/800',
    ],
  },
  {
    id: 2,
    nom: 'Robe wax chic',
    prix: 28000,
    badge: 'NOUVEAU',
    categorie: 'vetements',
    note: 4.6,
    nombreAvis: 47,
    description:
      "Une robe confectionnée dans un tissu wax authentique, coupe ajustée et élégante. Parfaite pour les grandes occasions comme le quotidien.",
    couleurs: [
      { nom: 'Multicolore', hex: '#A6802E' },
      { nom: 'Bordeaux', hex: '#5C1A2B' },
    ],
    tailles: ['S', 'M', 'L', 'XL'],
    images: [
      'https://picsum.photos/seed/rafet2a/700/800',
      'https://picsum.photos/seed/rafet2b/700/800',
    ],
  },
  {
    id: 3,
    nom: 'Boucles dorées',
    prix: 9500,
    categorie: 'accessoires',
    note: 4.9,
    nombreAvis: 88,
    description:
      "Boucles d'oreilles plaquées or, légères et faciles à assortir. Un accessoire essentiel pour sublimer toutes vos tenues.",
    couleurs: [{ nom: 'Doré', hex: '#A6802E' }],
    tailles: ['Unique'],
    images: [
      'https://picsum.photos/seed/rafet3a/700/800',
      'https://picsum.photos/seed/rafet3b/700/800',
    ],
  },
  {
    id: 4,
    nom: 'Sneakers plateforme blanc',
    prix: 65000,
    categorie: 'sacs',
    note: 4.5,
    nombreAvis: 61,
    description: "Sneakers plateforme au design épuré, confortables et polyvalentes pour un look casual chic.",
    couleurs: [
      { nom: 'Blanc', hex: '#FFFFFF' },
      { nom: 'Beige', hex: '#D2C3A5' },
    ],
    tailles: ['37', '38', '39', '40', '41'],
    images: [
      'https://picsum.photos/seed/rafet4a/700/800',
      'https://picsum.photos/seed/rafet4b/700/800',
    ],
  },
  {
    id: 5,
    nom: 'Clutch soirée dorée',
    prix: 38000,
    categorie: 'sacs',
    note: 4.7,
    nombreAvis: 29,
    description: "Petite pochette de soirée aux reflets dorés, idéale pour compléter une tenue habillée.",
    couleurs: [{ nom: 'Doré', hex: '#A6802E' }],
    tailles: ['Unique'],
    images: [
      'https://picsum.photos/seed/rafet5a/700/800',
      'https://picsum.photos/seed/rafet5b/700/800',
    ],
  },
  {
    id: 6,
    nom: 'Manteau long camel',
    prix: 89000,
    categorie: 'vetements',
    note: 4.9,
    nombreAvis: 74,
    description: "Manteau long en laine mélangée, coupe droite et intemporelle, parfait pour la saison fraîche.",
    couleurs: [
      { nom: 'Camel', hex: '#8B7355' },
      { nom: 'Noir', hex: '#000000' },
    ],
    tailles: ['S', 'M', 'L'],
    images: [
      'https://picsum.photos/seed/rafet6a/700/800',
      'https://picsum.photos/seed/rafet6b/700/800',
    ],
  },
  {
    id: 7,
    nom: 'Bottines chelsea cognac',
    prix: 72000,
    categorie: 'sacs',
    note: 4.6,
    nombreAvis: 52,
    description: "Bottines chelsea en cuir cognac, semelle confortable et style intemporel.",
    couleurs: [{ nom: 'Cognac', hex: '#8B4513' }],
    tailles: ['36', '37', '38', '39', '40'],
    images: [
      'https://picsum.photos/seed/rafet7a/700/800',
      'https://picsum.photos/seed/rafet7b/700/800',
    ],
  },
  {
    id: 8,
    nom: 'Sac cabas raphia',
    prix: 32000,
    categorie: 'sacs',
    note: 4.4,
    nombreAvis: 38,
    description: "Sac cabas tressé en raphia naturel, spacieux et léger, parfait pour l'été.",
    couleurs: [
      { nom: 'Naturel', hex: '#D2C3A5' },
      { nom: 'Brun', hex: '#4C352B' },
    ],
    tailles: ['Unique'],
    images: [
      'https://picsum.photos/seed/rafet8a/700/800',
      'https://picsum.photos/seed/rafet8b/700/800',
    ],
  },
]

export function getProduitById(id) {
  return produits.find((p) => p.id === Number(id))
}
