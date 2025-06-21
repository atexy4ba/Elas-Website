// 1. Définition des types
export type ProductFeature = {
  title: string;
  description: string;
};

export type ProductSpec = {
  label: string;
  value: string;
};

export type ProductModel = {
  id: string;
  name: string;
  image: string;
  tagline: string;
  description: string;
  specs: ProductSpec[];
  features: ProductFeature[];
};

export type Service = {
  id: string;
  title: string;
  heroImage: string;
  intro: {
    title: string;
    description: string;
  };
  models: ProductModel[];
};

// 2. Données pour les services (exemple Monte-Personne et Monte-Voiture)
export const servicesData: Record<string, any> = {
  'monte-personne': {
    id: 'monte-personne',
    title: "Nos Solutions de Monte-Personnes",
    heroImage: "/images/hero-monte-personne.jpg",
    intro: {
      title: "Confort, Sécurité et Élégance à Chaque Étage",
      description: "Les monte-personnes, ou ascenseurs de personnes, sont conçus pour assurer le transport vertical des individus de manière confortable, sûre et efficace dans tous types de bâtiments. Elas Trading, en s'appuyant sur des composants de haute qualité et une ingénierie expérimentée, propose des solutions sur mesure qui s'intègrent parfaitement à l'architecture de chaque projet, qu'il s'agisse de constructions neuves ou de rénovations."
    },
    gammes: [
      {
        id: 'sp',
        name: 'Gamme SP (Spéciale)',
        description: "Cette gamme met l'accent sur un design unique et des matériaux de luxe.",
        models: [
          {
            id: 'sp001',
            name: 'SP001',
            image: '/images/placeholder.jpg',
            description: 'Cabine au design spécial avec revêtement en Mebran.',
            plafond: 'Découpe laser',
            sol: 'Verre trempé décoratif de 8 mm',
            accessoires: 'Acier inoxydable miroir',
          },
          {
            id: 'sp003',
            name: 'SP003',
            image: '/images/placeholder.jpg',
            description: "Combine l'acier peint découpé au CNC et l'acier inoxydable miroir doré pour un look distinctif.",
            plafond: 'Découpe laser en acier inoxydable miroir doré',
            sol: 'Granit de 20 mm',
            accessoires: '---',
          },
          {
            id: 'sp005',
            name: 'SP005 (Luxe)',
            image: '/images/placeholder.jpg',
            description: 'Design luxueux avec des finitions en bois spécial et un éclairage à pierres.',
            plafond: 'Bois découpé sur mesure avec éclairage à pierres',
            accessoires: 'Double main courante en acier inoxydable miroir doré',
          }
        ]
      },
      {
        id: 'gl',
        name: 'Gamme GL (Verre)',
        description: 'Idéale pour un style moderne et épuré, utilisant le verre décoratif.',
        models: [
          {
            id: 'gl001',
            name: 'GL001',
            image: '/images/placeholder.jpg',
            revetement: 'Verre trempé décoratif de 6 mm',
            plafond: 'Verre trempé décoratif de 4 mm',
            sol: 'Verre trempé décoratif de 8 mm',
            miroir: 'Pleine hauteur',
          }
        ]
      }
    ],
    caracteristiques: [
      'Capacité de charge : 450 kg, 630 kg, 800 kg, 1000 kg.',
      'Vitesse nominale : 0,15 m/s, 0,63 m/s, 1,00 m/s.',
      'Hauteur de levage max. : 24 m.',
      'Motorisation : Gearless (sans réducteur), pour une consommation d\'énergie réduite et un fonctionnement silencieux.',
      'Portes : Automatiques, 2, 3 ou 4 panneaux, avec options de finition (inox, verre, etc.).',
      'Systèmes de contrôle : Simplex ou Duplex, avec microprocesseur pour une gestion optimisée.',
      'Conformité : Normes EN 81-1+A3, EN 81-70 (accessibilité), 2014/33/UE.'
    ]
  },
  'monte-voiture': {
    id: 'monte-voiture',
    title: "Solutions de Monte-Voitures",
    heroImage: "/images/hero-monte-voiture.jpg",
    intro: {
      title: "Optimisez votre espace de stationnement",
      description: "Le monte-voiture est une solution de plus en plus utilisée dans les résidences et les centres d'affaires pour optimiser l'espace de stationnement. La conception et l'installation de ces systèmes exigent une expertise technique pointue que les équipes d'Elas Trading, en partenariat avec des fabricants spécialisés comme AKE, sont en mesure de fournir."
    },
    models: [
      {
        id: 'ake-car-lift',
        name: 'Système sur mesure',
        image: '/images/placeholder.jpg',
        description: "Conception et Installation: Elas Trading assure la production, le montage et la maintenance des monte-voitures. L'installation est réalisée par des équipes expertes et expérimentées pour garantir une sécurité et une fiabilité maximales. Applications: Idéal pour les parkings souterrains, les concessions automobiles et les résidences de luxe où l'espace est limité."
      }
    ]
  },
  'monte-charge': {
    id: 'monte-charge',
    title: "Nos Solutions de Monte-Charge",
    heroImage: "/images/hero-monte-charge.jpg",
    intro: {
      title: "Robustesse et Adaptabilité pour le Transport de Marchandises",
      description: "Les monte-charges Elas Trading sont des solutions robustes conçues pour le transport vertical de marchandises dans divers environnements (entrepôts, usines, centres commerciaux). La production est réalisée sur mesure pour répondre aux exigences spécifiques de chaque projet."
    },
    models: [
      {
        id: 'fr001',
        name: 'FR001 / Y3001',
        image: '/images/placeholder.jpg',
        description: "Conçu pour un usage intensif, ce modèle est entièrement personnalisable en fonction des besoins du client."
      },
      {
        id: 'fr002',
        name: 'FR002 / Y3002',
        image: '/images/placeholder.jpg',
        description: "Une autre variante de monte-charge robuste, adaptable pour des demandes spécifiques."
      },
      {
        id: 'ake',
        name: 'AKE (Option)',
        image: '/images/placeholder.jpg',
        description: "Cabine: Finition en acier inoxydable brossé pour une durabilité maximale. Portes: Type guillotine (ouverture verticale à double battant) pour un gain d'espace."
      }
    ],
    caracteristiques: [
      "Capacité de charge: Production sur demande, allant de capacités standards à de très lourdes charges.",
      "Dimensions de la cabine: Flexibles selon les besoins du projet.",
      "Motorisation: Options de moteurs à engrenages ou sans engrenages (Gearless) pour une meilleure efficacité énergétique.",
      "Portes: Automatiques ou manuelles, robustes et adaptées à un usage intensif."
    ]
  },
  'ascenseur-handicape': {
    id: 'ascenseur-handicape',
    title: "Ascenseurs pour Personnes à Mobilité Réduite (PMR)",
    heroImage: "/images/hero-ascenseur-handicape.jpg",
    intro: {
      title: "Accessibilité et Conformité pour Tous",
      description: "Elas Trading propose une gamme complète de systèmes pour garantir l'accessibilité des personnes à mobilité réduite dans les espaces publics et privés, conformément à la norme EN 81-70."
    },
    models: [
      {
        id: 'evp01',
        name: 'Plateforme Verticale à Vis Sans Fin (EVP 01)',
        image: '/images/placeholder.jpg',
        description: "Une plateforme de transport vertical de type fermé, conçue pour des conditions climatiques extrêmes et une utilisation intérieure ou extérieure.",
        applications: "Écoles, hôpitaux, mosquées, institutions publiques, passages souterrains et supérieurs.",
        capacite: "385 kg",
        course: "13 000 mm (jusqu'à 5 arrêts)",
        vitesse: "0,15 m/s"
      },
      {
        id: 'evp02',
        name: 'Plateforme Verticale de Type Ouvert (EVP 02)',
        image: '/images/placeholder.jpg',
        description: "Une solution alternative et élégante aux rampes d'accès, nécessitant peu de modifications du bâtiment existant.",
        course: "3 000 mm (jusqu'à 2 arrêts)",
        capacite: "315 kg",
        design: "Apparence agréable avec finitions optionnelles en acier inoxydable satiné ou peinture RAL."
      },
      {
        id: 'ewp-ecp',
        name: 'Plateforme d\'Escalier (EWP/ECP)',
        image: '/images/placeholder.jpg',
        description: "Conçue pour un mouvement horizontal le long des escaliers, cette plateforme fonctionne sur un rail de guidage spécialement fabriqué.",
        alimentation: "12 volts",
        dimensions: "800×1000 mm, se replie lorsqu'elle n'est pas utilisée pour ne pas obstruer le passage."
      },
      {
        id: 'tria-sedye',
        name: 'Ascenseur pour civière (TRIA SEDYE)',
        image: '/images/placeholder.jpg',
        description: "Conçu spécifiquement pour les centres médicaux, avec des accessoires optionnels comme la climatisation, un fauteuil et un écran LCD."
      }
    ]
  },
  'escalator': {
    id: 'escalator',
    title: "Escaliers Mécaniques",
    heroImage: "/images/hero-escalator.jpg",
    intro: {
      title: "Mobilité fluide et sécurité pour les espaces publics",
      description: "Les escaliers mécaniques fournis par Elas Trading sont conçus pour les bâtiments publics et commerciaux, offrant sécurité, design et efficacité. Ils sont adaptés pour un trafic intense comme dans les stations de métro, les centres commerciaux et les aéroports."
    },
    caracteristiquesService: [
      {
        category: "Sécurité",
        details: [
          "Bouton d'arrêt d'urgence et écran d'affichage des défauts.",
          "Protection contre la perte de marche, la vitesse excessive et la surchauffe.",
          "Brosses de jupe pour éviter que les objets ne se coincent.",
          "Éclairage au niveau des peignes pour une meilleure visibilité."
        ]
      },
      {
        category: "Efficacité Énergétique",
        details: [
          "Fonctionnement intermittent (Marche/Arrêt automatique) : Des capteurs détectent l'approche des usagers pour démarrer l'escalier et l'arrêtent après leur passage pour économiser l'énergie.",
          "Convertisseur de fréquence (VVVF) : Peut réduire la consommation d'énergie jusqu'à 60% et diminue le courant de pointe de 80%. L'escalier fonctionne à vitesse réduite à vide et accélère à l'approche des passagers."
        ]
      },
      {
        category: "Options de personnalisation",
        details: [
          "Couleurs de main courante : Plusieurs couleurs disponibles (noir standard, rouge, bleu, vert, etc.).",
          "Éclairage de la main courante : Ajoute une touche esthétique et améliore la sécurité."
        ]
      }
    ],
    caracteristiquesTechniques: [
      "Inclinaison : 30° ou 35°.",
      "Largeur de marche : 600 mm, 800 mm ou 1000 mm.",
      "Vitesse : 0,5 m/s (avec option VVVF).",
      "Conformité : Norme EN 115-1: 2008 + A1:2010."
    ]
  }
};

// 3. Données pour les projets (exemples)
export const projectsData = [
  {
    id: 1,
    title: "Station de Métro - Bursaray",
    location: "Bursa, Turquie",
    year: "2021",
    type: "Escalator Mécanique",
    description: "Installation d'escaliers mécaniques haute performance pour une station de transport public à fort trafic.",
    image: "/images/projects/bursaray.png",
    capacity: "9000 pers/h",
    floors: "2 niveaux",
    features: ["Haute fréquentation", "Sécurité maximale EN 115", "Fonctionnement VVVF"],
  },
  {
    id: 2,
    title: "Passerelle piétonne - Istanbul",
    location: "Istanbul, Turquie",
    year: "2022",
    type: "Monte Personnes",
    description: "Installation d'un ascenseur extérieur modèle AKE S-LINE pour une passerelle piétonne, conçu pour les espaces sans fosse.",
    image: "/images/projects/s-line-passerelle.png",
    capacity: "630 kg",
    floors: "2 arrêts",
    features: ["Utilisation extérieure", "Sans salle des machines", "Conforme EN 81-70/71"],
  },
  {
    id: 5,
    title: "Programme 194 Logements LPP",
    location: "Médéa",
    year: "2020",
    type: "Monte-Personne",
    description: "Fourniture et pose de 8 ascenseurs pour un programme national de l'Entreprise Nationale de Promotion Immobilière (ENPI).",
    image: "/images/projects/projet-lpp-medea.png",
    capacity: "450-630 kg",
    floors: "Variable",
    features: ["Résidentiel Public", "ENPI", "Marché Public", "Installation Neuve"]
  },
  {
    id: 6,
    title: "Tour d'Affaires de Theniet El Hadjar",
    location: "Médéa",
    year: "2023-2024",
    type: "Monte-Personne",
    description: "Installation d'ascenseurs haute performance pour un immeuble de bureaux moderne et un pôle administratif majeur.",
    image: "/images/projects/tour-affaires-medea.png",
    capacity: "630-1000 kg",
    floors: "Multi-étages",
    features: ["Tertiaire", "Bureaux", "Haute Performance", "Secteur Public"]
  },
  {
    id: 7,
    title: "Résidence de Prestige 'Les Jardins d'Hydra'",
    location: "Alger",
    year: "2022-2024",
    type: "Monte-Personne",
    description: "Fourniture d'ascenseurs de luxe avec finitions sur-mesure pour un promoteur de renom dans un quartier prestigieux.",
    image: "/images/projects/residence-hydra.png",
    capacity: "450 kg",
    floors: "5-10 étages",
    features: ["Résidentiel Privé", "Luxe", "Finitions sur-mesure", "Promoteur Privé"]
  },
  {
    id: 8,
    title: "Unité de Production Pharmaceutique",
    location: "Constantine",
    year: "2021-2023",
    type: "Monte-Charge",
    description: "Installation de monte-charges en inox, conçus pour respecter les normes d'hygiène strictes des Bonnes Pratiques de Fabrication (BPF).",
    image: "/images/projects/unite-pharma-constantine.png",
    capacity: "1000-2000 kg",
    floors: "2-4 étages",
    features: ["Industrie", "Pharmaceutique", "Normes BPF", "Inox", "Salle Blanche"]
  },
  {
    id: 9,
    title: "Plateforme Logistique de Rouïba",
    location: "Alger",
    year: "2022-2024",
    type: "Monte-Charge",
    description: "Fourniture de monte-charges de grande capacité (heavy-duty) pour un usage intensif dans un entrepôt à fort trafic.",
    image: "/images/projects/plateforme-logistique-rouiba.png",
    capacity: "Jusqu'à 5000 kg",
    floors: "2-3 niveaux",
    features: ["Logistique", "Entrepôt", "Grande Capacité", "Usage Intensif"]
  },
  {
    id: 10,
    title: "Hôpital d'Excellence de Chlef",
    location: "Chlef",
    year: "2020-2023",
    type: "Monte-Malade",
    description: "Équipement complet d'un établissement hospitalier moderne avec des monte-lits, monte-charges et monte-plats.",
    image: "/images/projects/hopital-chlef.png",
    capacity: "1600-2500 kg (Monte-lit)",
    floors: "Multi-étages",
    features: ["Santé", "Hôpital", "Monte-lit", "Accessibilité", "Hygiène"]
  },
  {
    id: 11,
    title: "Siège Social d'une Banque",
    location: "Bab Ezzouar, Alger",
    year: "2022-2024",
    type: "Monte-Voiture",
    description: "Installation d'un système de monte-voiture pour optimiser le stationnement des véhicules de direction en sous-sol.",
    image: "/images/projects/monte-voiture-banque.png",
    capacity: "Jusqu'à 3000 kg",
    floors: "Sous-sol",
    features: ["Tertiaire", "Banque", "Parking Optimisé", "Monte-voiture"]
  },
  {
    id: 12,
    title: "Nouvelle Faculté de Médecine d'Alger",
    location: "Alger",
    year: "2023-2024",
    type: "Ascenseur PMR",
    description: "Installation de plateformes élévatrices et d'ascenseurs adaptés pour garantir une accessibilité universelle à tous les niveaux de l'établissement.",
    image: "/images/projects/faculte-medecine-alger.png",
    capacity: "340-400 kg",
    floors: "Multi-étages",
    features: ["Éducation", "Université", "Accessibilité Universelle", "PMR"]
  },
  {
    id: 13,
    title: "Villa Privée à Chéraga",
    location: "Chéraga, Alger",
    year: "2022-2024",
    type: "Ascenseur PMR",
    description: "Installation d'un ascenseur privatif sur-mesure pour le confort, l'autonomie et l'accessibilité au sein d'une résidence privée.",
    image: "/images/projects/villa-cheraga-pmr.png",
    capacity: "250-400 kg",
    floors: "2-4 étages",
    features: ["Résidentiel Privé", "Luxe", "Confort", "Ascenseur Privatif", "PMR"]
  },
  {
    id: 14,
    title: "Centre Commercial 'Garden City'",
    location: "Chéraga, Alger",
    year: "2021-2023",
    type: "Escalator",
    description: "Installation d'escaliers mécaniques pour fluidifier la circulation des milliers de visiteurs quotidiens dans les différents niveaux du centre.",
    image: "/images/projects/cc-gardencity.png",
    capacity: "9000 personnes/heure",
    floors: "Multi-niveaux",
    features: ["Commerce", "Centre Commercial", "Flux de visiteurs", "Escalator"]
  },
  {
    id: 15,
    title: "Infrastructure de Transport Public",
    location: "Alger / Oran",
    year: "2024-2026",
    type: "Escalator",
    description: "Capacité à fournir et installer des escalators robustes (heavy-duty) pour les infrastructures de transport public comme les gares et stations de métro.",
    image: "/images/projects/station-metro.png",
    capacity: "11000 personnes/heure",
    floors: "Variable",
    features: ["Transport Public", "Métro", "Gare", "Heavy-Duty", "Robustesse"]
  }
]; 