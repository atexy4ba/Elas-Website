// /app/services/ascenseur-handicape/page.tsx

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
            <a href="/conception" className="text-gray-600 hover:text-blue-600">Projets & Réalisations</a>
            <a href="/a-propos" className="text-gray-600 hover:text-blue-600">À propos de nous</a>
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

export default function AscenseurHandicapePage() {
  const service = servicesData['ascenseur-handicape'];
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
        {/* Showcase des Modèles */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Nos modèles phares</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.models.map((model) => (
                <Card key={model.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col group">
                  <div className="relative w-full h-72 bg-gray-200">
                    <img src={model.image} alt={model.name} className="absolute w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <CardHeader>
                    <CardTitle>{model.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="mb-2 text-gray-700">{model.description}</p>
                    <ul className="mb-2 text-sm text-gray-600 list-disc pl-4">
                      {Object.entries(model).map(([key, value]) =>
                        !['id', 'name', 'description', 'image'].includes(key) ? (
                          <li key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)} :</strong> {value}</li>
                        ) : null
                      )}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
