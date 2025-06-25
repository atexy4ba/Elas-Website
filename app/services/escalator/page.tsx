// /app/services/escalator/page.tsx

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
import { servicesData } from "@/lib/data";
import { useState } from "react";

// --- COMPOSANTS RÉUTILISABLES : NAVBAR ET FOOTER (Tirés de votre projet existant) ---

const Navbar = () => {
  const scrollToHomepageSection = (sectionId: string) => {
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = 80;
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
            <a href="/a-propos" className="text-gray-600 hover:text-blue-600">À Propos</a>
            <a href="/conception" className="text-gray-600 hover:text-blue-600">Projets & Réalisations</a>
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

// --- COMPOSANT PRINCIPAL DE LA PAGE ---

export default function EscalatorPage() {
  const service = servicesData['escalator'];
  return (
    <div className="bg-white">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] bg-cover bg-center flex items-center" style={{ backgroundImage: `url('${service.heroImage || '/images/hero-monte-personne.jpg'}')` }}>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">{service.title}</h1>
          </div>
        </section>
        {/* Section d'introduction */}
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 text-center max-w-4xl">
                <h2 className="text-3xl font-bold text-gray-800">{service.intro.title}</h2>
                <p className="mt-4 text-gray-600 text-lg">
                    {service.intro.description}
                </p>
            </div>
        </section>
        {/* Section des produits escalator */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Nos Modèles d'Escaliers Mécaniques</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Produit 1 - Escalator Standard */}
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48 bg-gradient-to-br from-blue-500 to-blue-700">
                  <img 
                    src="/images/escalator.png" 
                    alt="Escalator Standard" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded text-sm font-semibold text-blue-700">
                    Standard
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">Escalator Standard ES-600</CardTitle>
                  <CardDescription>
                    Solution économique pour les centres commerciaux et espaces publics à trafic modéré
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-gray-700">Largeur:</span>
                      <p className="text-gray-600">600 mm</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Inclinaison:</span>
                      <p className="text-gray-600">30°</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Vitesse:</span>
                      <p className="text-gray-600">0,5 m/s</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Capacité:</span>
                      <p className="text-gray-600">6000 pers/h</p>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button className="w-full btn-gradient">
                      <Eye className="mr-2 h-4 w-4" />
                      Voir les détails
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Produit 2 - Escalator Premium */}
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48 bg-gradient-to-br from-purple-500 to-purple-700">
                  <img 
                    src="/images/escalator.png" 
                    alt="Escalator Premium" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded text-sm font-semibold text-purple-700">
                    Premium
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">Escalator Premium EP-800</CardTitle>
                  <CardDescription>
                    Escalier mécanique haute performance avec options VVVF et éclairage LED intégré
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-gray-700">Largeur:</span>
                      <p className="text-gray-600">800 mm</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Inclinaison:</span>
                      <p className="text-gray-600">30° / 35°</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Vitesse:</span>
                      <p className="text-gray-600">0,5 m/s (VVVF)</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Capacité:</span>
                      <p className="text-gray-600">9000 pers/h</p>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button className="w-full btn-gradient">
                      <Eye className="mr-2 h-4 w-4" />
                      Voir les détails
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Produit 3 - Escalator Heavy Duty */}
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48 bg-gradient-to-br from-orange-500 to-orange-700">
                  <img 
                    src="/images/escalator.png" 
                    alt="Escalator Heavy Duty" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded text-sm font-semibold text-orange-700">
                    Heavy Duty
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">Escalator Heavy Duty HD-1000</CardTitle>
                  <CardDescription>
                    Escalier mécanique robuste pour les stations de métro et aéroports à très fort trafic
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-gray-700">Largeur:</span>
                      <p className="text-gray-600">1000 mm</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Inclinaison:</span>
                      <p className="text-gray-600">30°</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Vitesse:</span>
                      <p className="text-gray-600">0,65 m/s</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Capacité:</span>
                      <p className="text-gray-600">11000 pers/h</p>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button className="w-full btn-gradient">
                      <Eye className="mr-2 h-4 w-4" />
                      Voir les détails
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        {/* Caractéristiques du service */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Caractéristiques du service</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.caracteristiquesService.map((cat, idx) => (
                <div key={idx} className="border rounded-lg p-6 bg-white shadow">
                  <h3 className="font-bold text-lg mb-2">{cat.category}</h3>
                  <ul className="text-gray-700 list-disc pl-4 space-y-1">
                    {cat.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Caractéristiques techniques générales */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Caractéristiques Techniques Générales</h2>
            <ul className="max-w-2xl mx-auto text-gray-700 list-disc pl-6 space-y-2">
              {service.caracteristiquesTechniques.map((carac, idx) => (
                <li key={idx}>{carac}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
