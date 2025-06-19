"use client"

// NOTE: Les imports de 'next/image' et 'next/link' ont été retirés pour résoudre une erreur de compilation.
// Nous utiliserons les balises HTML standard <img> et <a>.
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/components/ui/carousel";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Linkedin,
  Instagram,
  Play,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  Eye,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"

export default function HomePage() {
  const [typingStats, setTypingStats] = useState({ projects: 0, customers: 0, experts: 0 })
  const [hasAnimated, setHasAnimated] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)

  const demonstrations = [
    {
      id: 1,
      title: "Installation de pointe",
      description: "Processus d'installation rapide et sécurisé pour tous types de bâtiments.",
      image: "/images/carrousel1.png",
    },
    {
      id: 2,
      title: "Technologie moderne",
      description: "Nos ascenseurs intègrent les dernières innovations technologiques.",
      image: "/images/carrousel2.png",
    },
    {
      id: 3,
      title: "Sécurité et fiabilité",
      description: "Chaque installation est soumise à des contrôles de sécurité rigoureux.",
      image: "/images/carrousel3.png",
    },
    {
      id: 4,
      title: "Confort et design",
      description: "Des cabines élégantes et un fonctionnement silencieux pour un confort optimal.",
      image: "/images/carrousel4.png",
    },
  ];

  const services = [
    {
      title: "Monte Personnes",
      description: "Solutions d'élévation pour personnes avec sécurité optimale.",
      image: "/images/montepersonne.png",
      link: "/services/monte-personne"
    },
    {
      title: "Monte Charge",
      description: "Transport de marchandises efficace et sécurisé.",
      image: "/images/montecharge.png",
      link: "/services/monte-charge" // À mettre à jour quand la page sera créée
    },
    {
      title: "Monte Voiture",
      description: "Solutions de parking vertical pour véhicules.",
      image: "/images/montevoiture.png",
      link: "/services/monte-voiture" // À mettre à jour quand la page sera créée
    },
    {
      title: "Escalier Mécanique",
      description: "Escaliers mécaniques modernes et fiables.",
      image: "/images/escalator.png",
      link: "/services/escalier-mecanique" // À mettre à jour quand la page sera créée
    },
    {
      title: "Ascenseurs pour Handicapés",
      description: "Accessibilité optimale pour personnes à mobilité réduite.",
      image: "/images/ascenseurhandicape.png",
      link: "/services/ascenseur-handicape" // À mettre à jour quand la page sera créée
    },
  ];

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"
    return () => {
      document.documentElement.style.scrollBehavior = "auto"
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.offsetTop
      const offsetPosition = elementPosition - headerOffset
      window.scrollTo({ top: offsetPosition, behavior: "smooth" })
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
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
        }
      },
      { threshold: 0.5 }
    );
    const currentStatsRef = statsRef.current;
    if (currentStatsRef) {
      observer.observe(currentStatsRef);
    }
    return () => {
        if (currentStatsRef) {
            observer.unobserve(currentStatsRef)
        }
    }
  }, [hasAnimated]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
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
              <a href="/a-propos" className="text-gray-600 hover:text-blue-600">À propos de nous</a>
            </nav>
            <a href="/devis">
              <Button className="btn-gradient">Demander un devis</Button>
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="hero" className="relative h-[600px] bg-cover bg-center" style={{ backgroundImage: "url('/images/hero.png')" }}>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="text-white max-w-lg">
              <h1 className="text-5xl font-bold mb-6 leading-tight">Leader en<br />mobilité<br />verticale</h1>
              <a href="/devis"><Button className="btn-gradient text-white px-8 py-3">Demander un devis gratuit</Button></a>
            </div>
          </div>
        </section>

        {/* À Propos de Nous */}
        <section id="about" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/about us.png" alt="Technicien travaillant" width={500} height={400} className="rounded-none"/>
              </div>
              <div>
                <h2 className="text-4xl font-bold text-gray-800 mb-6">À propos de nous</h2>
                <p className="text-gray-600 mb-6">Nous avons acquis une expertise de plus de 20 ans dans la mobilité verticale.</p>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Une expertise de plus de 20 ans dans la mobilité verticale</h3>
                    <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Des services complets : de l'installation à la maintenance</h3>
                    <p className="text-gray-600 text-sm">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Engagés pour la sécurité, la qualité et le confort</h3>
                    <p className="text-gray-600 text-sm">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                  </div>
                </div>
                <Button className="mt-8 btn-gradient" onClick={() => scrollToSection('services')}>En savoir plus</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section id="stats" className="py-20 bg-white" ref={statsRef}>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Élevez vos projets, nous nous chargeons de les faire monter.</h2>
            <p className="text-gray-600 mb-12 max-w-3xl mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div><div className="text-5xl font-bold text-blue-600 mb-2">{typingStats.projects}+</div><div className="font-semibold text-gray-800">Ascenseurs Installés</div></div>
              <div><div className="text-5xl font-bold text-blue-600 mb-2">{typingStats.customers}+</div><div className="font-semibold text-gray-800">Projets Actifs</div></div>
              <div><div className="text-5xl font-bold text-blue-600 mb-2">{typingStats.experts}+</div><div className="font-semibold text-gray-800">Techniciens Certifiés</div></div>
            </div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Prêts à collaborer avec des experts ?</h3>
              <Button className="btn-gradient" onClick={() => scrollToSection('contact')}>Contactez-nous <ChevronRight className="ml-2 h-4 w-4" /></Button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800">Nos Services</h2>
              <a href="/conception"><Button variant="outline">Voir nos projets <Eye className="ml-2 h-4 w-4"/></Button></a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {services.map((service) => (
                <a href={service.link} key={service.title} className="group">
                  <Card className="bg-white overflow-hidden rounded-none shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    <div className="relative w-full aspect-square overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={service.image} alt={service.title} className="absolute w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
                    </div>
                    <div className="p-4 text-center flex flex-col flex-grow">
                      <h3 className="text-base font-semibold text-gray-800 mb-2 flex-grow flex items-center justify-center">{service.title}</h3>
                      <p className="text-gray-600 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 min-h-[60px]">{service.description}</p>
                    </div>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section id="trust" className="py-20 bg-white overflow-hidden">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Ils nous font confiance</h2>
            <p className="text-gray-600 mb-12 max-w-3xl mx-auto">Depuis plus de deux décennies, ELAS accompagne ses partenaires pour répondre aux défis de mobilité des entreprises, collectivités et particuliers.</p>
            <div className="relative">
              <div className="flex animate-scroll">
                {["/images/wizara1.png", "/images/wizara2.png", "/images/wizara3.png", "/images/protectioncivil.png", "/images/univ1.png", "/images/bank.png"].flatMap(src => [src, src]).map((src, i) => (
                  <div key={i} className="flex-none w-20 h-20 mx-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`Partenaire ${i + 1}`} width={80} height={80} className="object-contain opacity-60 hover:opacity-100 transition-opacity"/>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <style>{`
            @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
            .animate-scroll { animation: scroll 20s linear infinite; }
          `}</style>
        </section>

        {/* CTA Banner */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Découvrez nos réalisations</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">Explorez notre portfolio de projets exceptionnels et laissez-vous inspirer par notre expertise.</p>
            <a href="/conception"><Button className="btn-gradient text-lg px-8 py-3"><Eye className="mr-2 h-5 w-5" />Voir nos projets</Button></a>
          </div>
        </section>

        {/* Demonstrations Section */}
        <section id="demonstrations" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Démonstrations</h2>
            <Carousel className="max-w-4xl mx-auto" opts={{ loop: true }}>
              <CarouselContent>
                {demonstrations.map((demo) => (
                  <CarouselItem key={demo.id}>
                    <div className="relative aspect-video overflow-hidden rounded-none bg-black">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={demo.image} alt={demo.title} className="absolute w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
                        <h3 className="text-2xl font-bold">{demo.title}</h3>
                        <p className="mt-2 text-gray-200 hidden sm:block">{demo.description}</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-3 top-1/2 -translate-y-1/2 z-10 h-10 w-10 text-white bg-black/40 hover:bg-black/60 border-none rounded-none" />
              <CarouselNext className="absolute right-3 top-1/2 -translate-y-1/2 z-10 h-10 w-10 text-white bg-black/40 hover:bg-black/60 border-none rounded-none" />
            </Carousel>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative py-20 bg-cover bg-center" style={{ backgroundImage: "url('/images/bannercta.png')" }}>
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="relative container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="md:col-start-2">
                <Card className="rounded-none">
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold text-gray-900">Prêt à faire monter vos projets ?</CardTitle>
                    <CardDescription className="pt-2">Décrivez-nous votre projet et obtenez un devis personnalisé gratuit. Nos experts analysent vos besoins et vous proposent la solution optimale pour votre mobilité verticale.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-bold text-sm">1</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Décrivez votre projet</h4>
                          <p className="text-sm text-gray-600">Type d'ascenseur, nombre d'étages, charge maximale...</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-bold text-sm">2</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Ajoutez vos informations</h4>
                          <p className="text-sm text-gray-600">Plans, cahier des charges, contraintes spécifiques...</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-bold text-sm">3</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Recevez votre devis</h4>
                          <p className="text-sm text-gray-600">Analyse par nos experts et réponse sous 48h</p>
                        </div>
                      </div>
                    </div>
                    <div className="pt-4">
                      <a href="/devis">
                        <Button className="w-full btn-gradient text-lg py-4">
                          Obtenir mon devis gratuit
                          <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>
                      </a>
                      <p className="text-xs text-gray-500 text-center mt-2">Gratuit • Sans engagement • Réponse sous 48h</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
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
  )
}
