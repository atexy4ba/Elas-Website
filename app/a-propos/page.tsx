"use client"
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Mail, MapPin, Facebook, Linkedin, Instagram, ChevronDown, Eye, ChevronRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const services = [
  {
    title: "Monte-Personne",
    description: "Cabines standard et panoramiques de 6 à 13 personnes (450 à 1000 Kg), avec revêtements en verre, bois laminé, peint ou acier inoxydable. Modèles de cabines : LIMYRA, DAMLATAŞ, PERGE, séries MANZARA et ŞELALE. Composants associés : cartes de commande, panneaux de commande, boutons, indicateurs, écrans tactiles.",
    image: "/images/montepersonne.png",
    link: "/services/monte-personne"
  },
  {
    title: "Monte-Charge",
    description: "Monte-charges et monte-plats adaptés à la restauration, archives, bijouteries, bibliothèques. Fabrication en inox 304, systèmes d'appel/envoi numériques, portes guillotine ou battantes, capacités de 50 à 100 Kg. Plateformes élévatrices pour marchandises également disponibles.",
    image: "/images/montecharge.png",
    link: "/services/monte-charge"
  },
  {
    title: "Monte-Voiture",
    description: "Plateformes élévatrices pour véhicules, idéales pour le transport de voitures entre étages dans les parkings où les rampes ne sont pas réalisables. Solution pratique et fiable.",
    image: "/images/montevoiture.png",
    link: "/services/monte-voiture"
  },
  {
    title: "Escalier Mécanique & Tapis Roulant",
    description: "Systèmes d'escalators et de tapis roulants, production depuis 2012. Large gamme de solutions techniques et plans d'aménagement pour la mobilité dans les espaces publics et privés.",
    image: "/images/escalator.png",
    link: "/services/escalator"
  },
  {
    title: "Ascenseurs pour Personnes à Mobilité Réduite",
    description: "Gamme complète de plateformes et ascenseurs accessibles : chaise d'escalier, plateforme inclinée ou verticale pour fauteuil roulant, ascenseur de piscine. Systèmes adaptés à tous types de besoins spécifiques.",
    image: "/images/ascenseurhandicape.png",
    link: "/services/ascenseur-handicape"
  },
];

export default function AboutPage() {
  const [typingStats, setTypingStats] = useState({ projects: 1200, customers: 500, experts: 100 });
  const statsRef = useRef<HTMLDivElement>(null);

  // Animation des statistiques (optionnel)
  useEffect(() => {
    const targets = { projects: 1200, customers: 500, experts: 100 };
    const duration = 2000;
    Object.keys(targets).forEach(key => {
      const target = targets[key as keyof typeof targets];
      let start = 0;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          clearInterval(timer);
          setTypingStats(prev => ({ ...prev, [key]: target }));
        } else {
          setTypingStats(prev => ({ ...prev, [key]: Math.floor(start) }));
        }
      }, 16);
    });
  }, []);

  // Collaborateurs (exemple)
  const collaborators = [
    { name: "Wizara", logo: "/images/wizara1.png" },
    { name: "Protection Civile", logo: "/images/protectioncivil.png" },
    { name: "Université", logo: "/images/univ1.png" },
    { name: "Banque", logo: "/images/bank.png" },
  ];

  // Certificats (exemple)
  const certificates = [
    { name: "ISO 9001", image: "/images/placeholder-logo.png" },
    { name: "Certification Sécurité", image: "/images/placeholder-logo.png" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center space-x-3">
              <img src="/images/logo.png" alt="ELAS Logo" width={50} height={50} className="object-contain" />
              <span className="font-semibold text-gray-800 text-xl">ELAS</span>
            </a>
            <nav className="hidden md:flex items-center space-x-8 relative">
              <div className="relative group">
                <button className="text-gray-600 hover:text-blue-600 flex items-center bg-transparent border-none">
                  Types d'ascenseurs<ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-none shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    {services.map(service => (
                       <a key={service.title} href={service.link} className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                         {service.title}
                       </a>
                    ))}
                  </div>
                </div>
              </div>
              <a href="/conception" className="text-gray-600 hover:text-blue-600">Projets & Réalisations</a>
              <a href="/a-propos" className="text-blue-600 font-semibold border-b-2 border-blue-600 bg-transparent">À propos de nous</a>
            </nav>
            <a href="/devis">
              <Button className="btn-gradient">Demander un devis</Button>
            </a>
          </div>
        </div>
      </header>

      {/* Section Présentation */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">À propos de nous</h1>
          <p className="text-gray-600 mb-6">
            ELAS propose une gamme complète de solutions de mobilité verticale, couvrant les ascenseurs passagers, monte-charges, monte-voitures, escalators, plateformes pour personnes à mobilité réduite et solutions spéciales. Nos produits sont issus de catalogues reconnus (ELAS-TRADING, DORMAK, ARDA GROUP, AKE, VINI, ZAFERLIFT, etc.) et répondent aux besoins des entreprises, collectivités et particuliers.
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Monte-Personne : Cabines standard et panoramiques de 6 à 13 personnes, multiples designs et matériaux, accessoires et panneaux de commande innovants.</li>
            <li>Monte-Charge : Solutions robustes pour le transport de marchandises, monte-plats pour restauration, bibliothèques, bijouteries, etc.</li>
            <li>Monte-Voiture : Plateformes élévatrices pour véhicules, idéales pour parkings à étages.</li>
            <li>Escalators & Tapis roulants : Systèmes modernes pour la mobilité dans les espaces publics.</li>
            <li>Accessibilité : Plateformes et ascenseurs pour personnes à mobilité réduite, y compris ascenseurs de piscine et plateformes inclinées/verticales.</li>
            <li>Solutions spéciales : Ascenseurs à vide, plateformes sur mesure, etc.</li>
          </ul>
        </div>
      </section>

      {/* Section Statistiques */}
      <section className="py-20 bg-white" ref={statsRef}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Nos chiffres clés</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div><div className="text-5xl font-bold text-blue-600 mb-2">{typingStats.projects}+</div><div className="font-semibold text-gray-800">Ascenseurs Installés</div></div>
            <div><div className="text-5xl font-bold text-blue-600 mb-2">{typingStats.customers}+</div><div className="font-semibold text-gray-800">Projets Actifs</div></div>
            <div><div className="text-5xl font-bold text-blue-600 mb-2">{typingStats.experts}+</div><div className="font-semibold text-gray-800">Techniciens Certifiés</div></div>
          </div>
        </div>
      </section>

      {/* Section Collaborateurs */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Nos collaborateurs</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {collaborators.map((collab, i) => (
              <div key={i} className="flex flex-col items-center">
                <img src={collab.logo} alt={collab.name} className="w-24 h-24 object-contain mb-2" />
                <span className="text-gray-700 font-medium">{collab.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Certificats */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Nos certificats</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {certificates.map((cert, i) => (
              <div key={i} className="flex flex-col items-center">
                <img src={cert.image} alt={cert.name} className="w-24 h-24 object-contain mb-2" />
                <span className="text-gray-700 font-medium">{cert.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Projets et Références */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Projets réalisés & Références</h2>
          <p className="text-gray-600 mb-6">
            Nos catalogues mettent en avant de nombreuses références de projets réalisés, illustrant notre expertise et notre portée internationale. Nous avons accompagné des clients en Europe, Russie, Moyen-Orient et Afrique, en fournissant des solutions sur mesure pour chaque besoin. Les catalogues incluent des sections "REFERANSLAR" (Références) détaillant nos réalisations et collaborations avec des entreprises majeures du secteur.
          </p>
          <p className="text-gray-600">
            Nos partenaires, comme AKE et Kağıttan İşler, sont reconnus pour leur innovation et leur engagement dans le secteur de la mobilité verticale, avec des années d'expérience et des milliers de produits installés à travers le monde.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img src="/images/logo.png" alt="ELAS Logo" width={40} height={40} className="object-contain" />
                <span className="font-semibold text-xl">ELAS</span>
              </div>
              <p className="text-gray-400 mb-4">Leader en mobilité verticale depuis plus de 20 ans.</p>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/p/Elas-Trading-Alger-100063549041470/?locale=fr_FR" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors"><Facebook className="h-5 w-5" /></a>
                <a href="https://dz.linkedin.com/in/elas-trading-41946217a" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors"><Linkedin className="h-5 w-5" /></a>
                <a href="https://www.instagram.com/elas.trading.alger/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors"><Instagram className="h-5 w-5" /></a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Nos Services</h3>
              <ul className="space-y-2 text-gray-400">
                {services.map(service => (
                   <li key={service.title}><a href={service.link} className="hover:text-white">{service.title}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2"><Phone className="h-4 w-4" /><span>0560 35 15 27</span></div>
                <div className="flex items-center space-x-2"><Mail className="h-4 w-4" /><span>contact@elas.fr</span></div>
                <div className="flex items-center space-x-2"><MapPin className="h-4 w-4" /><span>El Mohammadia, Alger</span></div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Suivez-nous</h3>
              <p className="text-gray-400 mb-4">Restez informé de nos dernières actualités et innovations.</p>
              <div className="flex">
                <Input placeholder="Votre email" className="bg-gray-800 border-gray-700 focus:ring-blue-500" />
                <Button className="btn-gradient ml-2">OK</Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ELAS. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
