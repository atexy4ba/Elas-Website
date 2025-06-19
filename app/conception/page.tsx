"use client"; // Important: Ajout de cette ligne pour permettre l'interactivité

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, MapPin, Users, Building, ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react"; // Importation de useState
import { projectsData } from "@/lib/data";

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
  // Utiliser directement projectsData
  const projects = projectsData;

  // --- Gestion de l'état ---
  const [activeFilter, setActiveFilter] = useState("Tous les projets");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filterCategories = [
    "Tous les projets",
    "Monte-Personne",
    "Monte-Charge & Monte-Plats",
    "Monte-Voiture",
    "Ascenseur PMR",
    "Escalator & Tapis Roulant",
    "Solutions Spéciales",
  ];

  const filteredProjects = projects.filter(project => 
    activeFilter === "Tous les projets" || project.type === activeFilter
  );

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Header adapté */}
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Image src="/images/logo.png" alt="ELAS Logo" width={50} height={50} className="object-contain" />
                <span className="font-semibold text-gray-800 text-xl">ELAS</span>
              </div>
              <nav className="hidden md:flex items-center space-x-8">
                <a href="/#services" className="text-gray-600 hover:text-blue-600">Types d'ascenseurs</a>
                <a href="/conception" className="text-blue-600 font-semibold">Projets & Réalisations</a>
                <a href="/a-propos" className="text-gray-600 hover:text-blue-600">À propos de nous</a>
              </nav>
              <Button className="btn-gradient">Contactez-nous</Button>
            </div>
          </div>
        </header>

        {/* Section d'intro adaptée */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Nos Projets & Réalisations</h1>
            <p className="text-gray-600 text-lg mb-4">
              Découvrez une sélection de projets réalisés par ELAS, illustrant notre expertise dans la mobilité verticale, l'accessibilité, la logistique et la modernisation d'infrastructures en Algérie et à l'international. Nos solutions sont issues de catalogues reconnus et adaptées à chaque besoin spécifique.
            </p>
            <p className="text-gray-500 text-base">
              Ascenseurs passagers, monte-charges, plateformes PMR, escalators, solutions spéciales… chaque projet est conçu sur mesure pour garantir sécurité, confort et performance.
            </p>
          </div>
        </section>

        {/* Filtres */}
        <div className="container mx-auto px-4 mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {filterCategories.map((cat) => (
              <Button
                key={cat}
                variant={activeFilter === cat ? "default" : "outline"}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Grille des projets */}
        <div className="container mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="cursor-pointer hover:shadow-xl transition-shadow duration-300" onClick={() => setSelectedProject(project)}>
                <div className="relative w-full h-56 bg-gray-200">
                  <Image src={project.image} alt={project.title} width={400} height={224} className="w-full h-full object-cover rounded-t-lg" />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <MapPin className="h-4 w-4 mr-1" /> {project.location}
                  </div>
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <Calendar className="h-4 w-4 mr-1" /> {project.year}
                  </div>
                  <Badge className="bg-blue-600 text-white mb-2">{project.type}</Badge>
                  <p className="text-gray-600 text-sm line-clamp-3">{project.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Modale projet */}
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </div>
    </>
  );
}