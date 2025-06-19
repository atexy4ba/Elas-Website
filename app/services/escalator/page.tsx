// /app/services/monte-personne/page.tsx

"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Linkedin,
  Instagram,
  ChevronDown,
  Eye,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// --- COMPOSANTS RÉUTILISABLES : NAVBAR ET FOOTER (Tirés de votre projet existant) ---

const Navbar = () => {
  const scrollToHomepageSection = (sectionId: string) => {
    // Si nous ne sommes pas sur la page d'accueil, redirigez d'abord
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = 80; // Hauteur de votre header fixe
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center space-x-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.png" alt="ELAS Logo" width={50} height={50} className="object-contain" />
            <span className="font-semibold text-gray-800 text-xl">ELAS</span>
          </a>

          <nav className="hidden md:flex items-center space-x-8 relative">
            <div className="relative group">
              <button onClick={() => scrollToHomepageSection('services')} className="text-gray-600 hover:text-blue-600 flex items-center bg-transparent border-none">
                Types d'ascenseurs
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                    <a href="/services/monte-personne" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer">Monte Personnes</a>
                    <a href="/services/monte-charge" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer">Monte Charge</a>
                    <a href="/services/monte-voiture" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer">Monte Voiture</a>
                    <a href="/services/ascenseur-handicape" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer">Ascenseur pour Handicapé</a>
                    <a href="/services/escalator" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer">Escalator Mécaniques</a>
                </div>
              </div>
            </div>
            <a href="/#about" className="text-gray-600 hover:text-blue-600">À Propos</a>
            <a href="/conception" className="text-gray-600 hover:text-blue-600">Conception</a>
          </nav>
          
          <a href="/devis">
             <Button className="btn-gradient">Demander un devis</Button>
          </a>
        </div>
      </div>
    </header>
  )
}

const Footer = () => {
    return(
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/logo.png" alt="ELAS Logo" width={40} height={40} className="object-contain" />
                <span className="font-semibold text-xl">ELAS</span>
              </div>
              <p className="text-gray-400 mb-4">Leader en mobilité verticale depuis plus de 20 ans.</p>
              <div className="flex space-x-4">
                 <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors"><Facebook className="h-5 w-5" /></a>
                 <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors"><Linkedin className="h-5 w-5" /></a>
                 <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors"><Instagram className="h-5 w-5" /></a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Nos Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/services/monte-personne" className="hover:text-white">Monte Personnes</a></li>
                <li><a href="/services/monte-charge" className="hover:text-white">Monte Charge</a></li>
                <li><a href="/services/monte-voiture" className="hover:text-white">Monte Voiture</a></li>
                <li><a href="/services/escalator" className="hover:text-white">Escalier Mécanique</a></li>
                <li><a href="/services/ascenseur-handicape" className="hover:text-white">Ascenseurs Handicapés</a></li>
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
    )
}

// --- DONNÉES SPÉCIFIQUES À LA PAGE ---

const products = [
    {
      name: "ELAS Prestige",
      image: "/images/product1.png",
      tagline: "L'élégance sur mesure",
      description: "La solution de luxe pour les bâtiments résidentiels et commerciaux exigeants, alliant design personnalisable et technologie de pointe.",
      specs: { capacity: "4-8 Personnes", speed: "1.0 m/s", usage: "Résidentiel / Commercial de Luxe", motor: "Gearless Synchrone" },
      features: ["Finitions intérieures haut de gamme (marbre, bois, cuir)", "Fonctionnement ultra-silencieux (< 40 dB)", "Système d'appel par smartphone (option)", "Éclairage LED d'ambiance personnalisable"]
    },
    {
      name: "ELAS Vision",
      image: "/images/product2.png",
      tagline: "Une vue imprenable",
      description: "Offrez une vue panoramique et une sensation d'espace avec nos ascenseurs vitrés, parfaits pour les centres commerciaux et les hôtels.",
      specs: { capacity: "6-12 Personnes", speed: "1.5 m/s", usage: "Commercial / Public / Hôtels", motor: "Gearless à haute performance" },
      features: ["Parois en verre de sécurité feuilleté", "Structure en acier inoxydable ou peinte", "Options de cabines circulaires ou carrées", "Intégration parfaite avec les façades modernes"]
    },
    {
      name: "ELAS Access",
      image: "/images/product3.png",
      tagline: "La solution compacte et efficace",
      description: "Conçu pour s'adapter aux espaces les plus restreints sans compromis sur la sécurité et le confort. Idéal pour les maisons individuelles et les petits immeubles.",
      specs: { capacity: "2-4 Personnes", speed: "0.5 m/s", usage: "Résidentiel / Espaces réduits", motor: "Hydraulique ou à vis" },
      features: ["Faible encombrement de la gaine", "Installation rapide et simple", "Consommation électrique réduite", "Idéal pour les projets de rénovation"]
    },
];

// --- COMPOSANT PRINCIPAL DE LA PAGE ---

export default function MontePersonnePage() {
  return (
    <div className="bg-white">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] bg-cover bg-center flex items-center" style={{ backgroundImage: "url('/images/hero-monte-personne.jpg')" }}>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Nos Solutions d'Escalators</h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
              Élevez votre quotidien avec des ascenseurs sûrs, élégants et performants, adaptés à tous les types de bâtiments.
            </p>
          </div>
        </section>

        {/* Section d'introduction */}
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 text-center max-w-4xl">
                <h2 className="text-3xl font-bold text-gray-800">Confort, Sécurité et Élégance à chaque étage</h2>
                <p className="mt-4 text-gray-600 text-lg">
                    Chez ELAS, nous concevons des solutions de transport vertical pour personnes qui s'intègrent parfaitement à l'architecture de votre bâtiment, qu'il soit neuf ou existant. Nos monte-personnes sont le fruit d'une ingénierie de précision, offrant une expérience de déplacement fluide, silencieuse et totalement sécurisée.
                </p>
            </div>
        </section>

        {/* Showcase des Produits */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Découvrez nos modèles phares</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <Card key={product.name} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col group">
                  <div className="relative w-full h-72 bg-gray-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                      <CardTitle className="text-xl text-blue-700">{product.name}</CardTitle>
                      <CardDescription className="mt-1 flex-grow">{product.tagline}</CardDescription>
                      <div className="mt-auto pt-6 flex gap-2">
                          <Popover>
                              <PopoverTrigger asChild>
                                  <Button variant="outline" className="w-full">Voir les détails</Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-96" align="start">
                                  <div className="grid gap-4">
                                      <div className="space-y-1">
                                          <h4 className="font-bold leading-none">{product.name}</h4>
                                          <p className="text-sm text-muted-foreground">{product.description}</p>
                                      </div>
                                      <div className="grid gap-2">
                                          <h5 className="font-semibold text-sm">Spécifications</h5>
                                          <div className="text-xs text-gray-600 space-y-1">
                                              <p><strong>Capacité :</strong> {product.specs.capacity}</p>
                                              <p><strong>Vitesse :</strong> {product.specs.speed}</p>
                                              <p><strong>Usage :</strong> {product.specs.usage}</p>
                                              <p><strong>Motorisation :</strong> {product.specs.motor}</p>
                                          </div>
                                          <h5 className="font-semibold text-sm mt-2">Atouts majeurs</h5>
                                          <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                                              {product.features.map(f => <li key={f}>{f}</li>)}
                                          </ul>
                                      </div>
                                      <a href="/devis" className="mt-2 block">
                                          <Button className="w-full">Demander un devis pour ce modèle</Button>
                                      </a>
                                  </div>
                              </PopoverContent>
                          </Popover>
                      </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>


        {/* Section CTA */}
        <section className="py-20 bg-blue-700">
          <div className="container mx-auto px-4 text-center text-white">
            <h2 className="text-3xl font-bold">Voir nos monte-personnes en action</h2>
            <p className="mt-4 max-w-2xl mx-auto text-blue-100">
              Explorez nos réalisations pour voir comment nous avons intégré nos solutions dans des projets variés.
            </p>
            <a href="/conception?filter=monte-personne">
              <Button size="lg" className="mt-8 bg-white text-blue-700 hover:bg-gray-100 text-lg px-8 py-3 shadow-lg">
                <Eye className="mr-2 h-5 w-5" />
                Voir nos projets relatifs
              </Button>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
