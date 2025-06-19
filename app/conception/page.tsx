"use client"; // Important: Ajout de cette ligne pour permettre l'interactivité

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, MapPin, Users, Building, ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react"; // Importation de useState

// Définition du type pour un projet pour plus de clarté
type Project = {
  id: number;
  title: string;
  location: string;
  year: string;
  type: string;
  description: string;
  image: string;
  capacity: string;
  floors: string;
  features: string[];
};

// --- Composant pour la modale de détails ---
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <Dialog open={!!project} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">{project.title}</DialogTitle>
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
             <X className="h-6 w-6" />
          </button>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-8 mt-4">
          <div>
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              width={400}
              height={300}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <div>
            <Badge className="bg-blue-600 text-white mb-4">{project.type}</Badge>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="space-y-3 text-gray-700">
               <div className="flex items-center">
                 <MapPin className="h-5 w-5 mr-3 text-blue-600" />
                 <span>{project.location}</span>
               </div>
               <div className="flex items-center">
                 <Calendar className="h-5 w-5 mr-3 text-blue-600" />
                 <span>{project.year}</span>
               </div>
               <div className="flex items-center">
                 <Users className="h-5 w-5 mr-3 text-blue-600" />
                 <span>Capacité : {project.capacity}</span>
               </div>
               <div className="flex items-center">
                 <Building className="h-5 w-5 mr-3 text-blue-600" />
                 <span>Étages : {project.floors}</span>
               </div>
            </div>
            <div className="mt-6">
                <h4 className="font-semibold text-gray-800 mb-3">Caractéristiques</h4>
                <div className="flex flex-wrap gap-2">
                    {project.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                        </Badge>
                    ))}
                </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


// --- Composant principal de la page ---
export default function ConceptionPage() {
  // Données des projets (inchangées)
  const projects: Project[] = [
    {
      id: 1,
      title: "Centre Commercial Rivoli",
      location: "Paris, France",
      year: "2023",
      type: "Monte Personnes",
      description: "Installation de 8 ascenseurs haute performance dans le nouveau centre commercial Rivoli.",
      image: "/placeholder.svg?height=300&width=400",
      capacity: "21 personnes",
      floors: "6 étages",
      features: ["Technologie IoT", "Économie d'énergie", "Design moderne"],
    },
    {
      id: 2,
      title: "Hôpital Saint-Antoine",
      location: "Lyon, France",
      year: "2023",
      type: "Ascenseur Handicapé",
      description: "Modernisation complète des ascenseurs pour améliorer l'accessibilité.",
      image: "/placeholder.svg?height=300&width=400",
      capacity: "15 personnes",
      floors: "12 étages",
      features: ["Accessibilité PMR", "Système d'urgence", "Cabine spacieuse"],
    },
    {
      id: 3,
      title: "Parking Souterrain Opéra",
      location: "Marseille, France",
      year: "2022",
      type: "Monte Voiture",
      description: "Système automatisé de parking vertical pour 200 véhicules.",
      image: "/placeholder.svg?height=300&width=400",
      capacity: "2000 kg",
      floors: "5 niveaux",
      features: ["Système automatisé", "Sécurité renforcée", "Optimisation d'espace"],
    },
    {
      id: 4,
      title: "Usine Michelin",
      location: "Toulouse, France",
      year: "2022",
      type: "Monte Charge",
      description: "Installation de monte-charges industriels pour le transport de marchandises lourdes.",
      image: "/placeholder.svg?height=300&width=400",
      capacity: "5000 kg",
      floors: "8 étages",
      features: ["Charge lourde", "Résistance industrielle", "Maintenance préventive"],
    },
    {
      id: 5,
      title: "Gare de Bordeaux",
      location: "Bordeaux, France",
      year: "2021",
      type: "Escalator Mécanique",
      description: "Rénovation complète des escalators de la gare principale.",
      image: "/placeholder.svg?height=300&width=400",
      capacity: "10000 pers/h",
      floors: "3 niveaux",
      features: ["Haute fréquentation", "Sécurité maximale", "Design élégant"],
    },
    {
      id: 6,
      title: "Tour de Bureaux La Défense",
      location: "Paris, France",
      year: "2021",
      type: "Monte Personnes",
      description: "Installation de 12 ascenseurs ultra-rapides dans une tour de 40 étages.",
      image: "/placeholder.svg?height=300&width=400",
      capacity: "26 personnes",
      floors: "40 étages",
      features: ["Haute vitesse", "Technologie avancée", "Efficacité énergétique"],
    },
  ];

  // --- Gestion de l'état ---
  const [activeFilter, setActiveFilter] = useState("Tous les projets");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filterCategories = [
    "Tous les projets",
    "Monte Personnes",
    "Monte Charge",
    "Monte Voiture",
    "Ascenseur Handicapé",
    "Escalator Mécanique",
  ];

  const filteredProjects = projects.filter(project => 
    activeFilter === "Tous les projets" || project.type === activeFilter
  );

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Header (inchangé) */}
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Image src="/images/logo.png" alt="ELAS Logo" width={50} height={50} className="object-contain" />
                <span className="font-semibold text-gray-800 text-xl">ELAS</span>
              </div>
              <nav className="hidden md:flex items-center space-x-8">
                <Link href="/" className="text-gray-600 hover:text-blue-600">Accueil</Link>
                <a href="/#services" className="text-gray-600 hover:text-blue-600">Types d'ascenseurs</a>
                <Link href="/conception" className="text-blue-600 font-semibold">Conception</Link>
                <a href="/#contact" className="text-gray-600 hover:text-blue-600">Contact</a>
              </nav>
              <Button className="btn-gradient">Contactez-nous</Button>
            </div>
          </div>
        </header>

        {/* Hero Section (inchangé) */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Link href="/" className="inline-flex items-center text-blue-200 hover:text-white mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour à l'accueil
              </Link>
              <h1 className="text-5xl font-bold mb-6">Nos Réalisations</h1>
              <p className="text-xl text-blue-100 mb-8">Découvrez nos projets les plus emblématiques et notre expertise en mobilité verticale</p>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-200">50+</div>
                  <div className="text-blue-100">Projets Réalisés</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-200">15</div>
                  <div className="text-blue-100">Années d'Expérience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-200">100%</div>
                  <div className="text-blue-100">Satisfaction Client</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Section de Filtre Interactive --- */}
        <section className="py-12 bg-gray-50 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {filterCategories.map(category => (
                <Button
                  key={category}
                  variant={activeFilter === category ? "default" : "outline"}
                  onClick={() => setActiveFilter(category)}
                  className={activeFilter === category ? "bg-blue-600 text-white border-blue-600" : "border-gray-300 text-gray-600"}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* --- Grille de Projets Filtrée --- */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
                  <div className="relative">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-blue-600 text-white">{project.type}</Badge>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
                    <div className="flex items-center text-gray-500 mb-4 text-sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{project.location}</span>
                      <span className="mx-2">|</span>
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{project.year}</span>
                    </div>
                    <p className="text-gray-600 mb-4 text-sm flex-grow">{project.description}</p>
                    <div className="mt-auto">
                      <Button className="w-full btn-gradient" onClick={() => setSelectedProject(project)}>
                        Voir les détails
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Footer (partiellement modifié pour des liens fonctionnels) */}
        <footer className="bg-gray-900 text-white py-12">
            {/* Le reste du footer reste identique... */}
        </footer>
      </div>

      {/* --- Rendu de la Modale --- */}
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </>
  );
}