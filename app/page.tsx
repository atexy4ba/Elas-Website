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
  Globe,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"

export default function HomePage() {
  const [currentLanguage, setCurrentLanguage] = useState('fr')
  const [typingStats, setTypingStats] = useState({ projects: 0, customers: 0, experts: 0 })
  const [hasAnimated, setHasAnimated] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)

  // Traductions pour les textes de la page
  const translations = {
    fr: {
      // Header
      typesElevators: "Types d'ascenseurs",
      projects: "Projets & Réalisations",
      aboutUs: "À propos de nous",
      requestQuote: "Demander un devis",
      
      // Hero Section
      heroTitle: "Leader en\nmobilité\nverticale",
      heroButton: "Demander un devis gratuit",
      
      // About Section
      aboutTitle: "À propos de nous",
      aboutSubtitle: "Nous avons acquis une expertise de plus de 20 ans dans la mobilité verticale.",
      expertise1: "Une expertise de plus de 20 ans dans la mobilité verticale",
      expertise2: "Des services complets : de l'installation à la maintenance",
      expertise3: "Engagés pour la sécurité, la qualité et le confort",
      learnMore: "En savoir plus",
      
      // Stats Section
      statsTitle: "Élevez vos projets, nous nous chargeons de les faire monter.",
      statsSubtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      elevatorsInstalled: "Ascenseurs Installés",
      activeProjects: "Projets Actifs",
      certifiedTechnicians: "Techniciens Certifiés",
      readyToCollaborate: "Prêts à collaborer avec des experts ?",
      contactUs: "Contactez-nous",
      
      // Services Section
      ourServices: "Nos Services",
      viewProjects: "Voir nos projets",
      
      // Trust Section
      trustTitle: "Ils nous font confiance",
      trustSubtitle: "Depuis plus de deux décennies, ELAS accompagne ses partenaires pour répondre aux défis de mobilité des entreprises, collectivités et particuliers.",
      
      // CTA Banner
      discoverProjects: "Découvrez nos réalisations",
      explorePortfolio: "Explorez notre portfolio de projets exceptionnels et laissez-vous inspirer par notre expertise.",
      viewOurProjects: "Voir nos projets",
      
      // Demonstrations Section
      demonstrations: "Démonstrations",
      
      // Contact Section
      readyToElevate: "Prêt à faire monter vos projets ?",
      contactDescription: "Décrivez-nous votre projet et obtenez un devis personnalisé gratuit. Nos experts analysent vos besoins et vous proposent la solution optimale pour votre mobilité verticale.",
      describeProject: "Décrivez votre projet",
      describeProjectDesc: "Type d'ascenseur, nombre d'étages, charge maximale...",
      addInfo: "Ajoutez vos informations",
      addInfoDesc: "Plans, cahier des charges, contraintes spécifiques...",
      receiveQuote: "Recevez votre devis",
      receiveQuoteDesc: "Analyse par nos experts et réponse sous 48h",
      getFreeQuote: "Obtenir mon devis gratuit",
      freeNoCommitment: "Gratuit • Sans engagement • Réponse sous 48h",
      
      // Footer
      leaderMobility: "Leader en mobilité verticale depuis plus de 20 ans.",
      followUs: "Suivez-nous",
      stayInformed: "Restez informé de nos dernières actualités et innovations.",
      yourEmail: "Votre email",
      allRightsReserved: "Tous droits réservés.",
      
      // Services
      montePersonne: "Monte Personnes",
      monteCharge: "Monte Charge",
      monteVoiture: "Monte Voiture",
      escalierMecanique: "Escalier Mécanique",
      ascenseurHandicape: "Ascenseurs pour Handicapés",
      
      // Service descriptions
      montePersonneDesc: "Solutions d'élévation pour personnes avec sécurité optimale.",
      monteChargeDesc: "Transport de marchandises efficace et sécurisé.",
      monteVoitureDesc: "Solutions de parking vertical pour véhicules.",
      escalierMecaniqueDesc: "Escaliers mécaniques modernes et fiables.",
      ascenseurHandicapeDesc: "Accessibilité optimale pour personnes à mobilité réduite.",
      
      // Demonstrations
      installationTitle: "Installation de pointe",
      installationDesc: "Processus d'installation rapide et sécurisé pour tous types de bâtiments.",
      technologyTitle: "Technologie moderne",
      technologyDesc: "Nos ascenseurs intègrent les dernières innovations technologiques.",
      securityTitle: "Sécurité et fiabilité",
      securityDesc: "Chaque installation est soumise à des contrôles de sécurité rigoureux.",
      comfortTitle: "Confort et design",
      comfortDesc: "Des cabines élégantes et un fonctionnement silencieux pour un confort optimal.",
    },
    en: {
      // Header
      typesElevators: "Elevator Types",
      projects: "Projects & Achievements",
      aboutUs: "About Us",
      requestQuote: "Request Quote",
      
      // Hero Section
      heroTitle: "Leader in\nvertical\nmobility",
      heroButton: "Request Free Quote",
      
      // About Section
      aboutTitle: "About Us",
      aboutSubtitle: "We have acquired over 20 years of expertise in vertical mobility.",
      expertise1: "Over 20 years of expertise in vertical mobility",
      expertise2: "Complete services: from installation to maintenance",
      expertise3: "Committed to safety, quality and comfort",
      learnMore: "Learn More",
      
      // Stats Section
      statsTitle: "Elevate your projects, we take care of making them rise.",
      statsSubtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      elevatorsInstalled: "Elevators Installed",
      activeProjects: "Active Projects",
      certifiedTechnicians: "Certified Technicians",
      readyToCollaborate: "Ready to collaborate with experts?",
      contactUs: "Contact Us",
      
      // Services Section
      ourServices: "Our Services",
      viewProjects: "View Projects",
      
      // Trust Section
      trustTitle: "They Trust Us",
      trustSubtitle: "For over two decades, ELAS has been supporting its partners to meet the mobility challenges of businesses, communities and individuals.",
      
      // CTA Banner
      discoverProjects: "Discover Our Achievements",
      explorePortfolio: "Explore our portfolio of exceptional projects and be inspired by our expertise.",
      viewOurProjects: "View Our Projects",
      
      // Demonstrations Section
      demonstrations: "Demonstrations",
      
      // Contact Section
      readyToElevate: "Ready to elevate your projects?",
      contactDescription: "Describe your project and get a personalized free quote. Our experts analyze your needs and propose the optimal solution for your vertical mobility.",
      describeProject: "Describe your project",
      describeProjectDesc: "Elevator type, number of floors, maximum load...",
      addInfo: "Add your information",
      addInfoDesc: "Plans, specifications, specific constraints...",
      receiveQuote: "Receive your quote",
      receiveQuoteDesc: "Analysis by our experts and response within 48h",
      getFreeQuote: "Get My Free Quote",
      freeNoCommitment: "Free • No commitment • Response within 48h",
      
      // Footer
      leaderMobility: "Leader in vertical mobility for over 20 years.",
      followUs: "Follow Us",
      stayInformed: "Stay informed of our latest news and innovations.",
      yourEmail: "Your email",
      allRightsReserved: "All rights reserved.",
      
      // Services
      montePersonne: "Passenger Elevators",
      monteCharge: "Goods Elevators",
      monteVoiture: "Vehicle Lifts",
      escalierMecanique: "Escalators",
      ascenseurHandicape: "Disabled Access",
      
      // Service descriptions
      montePersonneDesc: "Passenger elevation solutions with optimal safety.",
      monteChargeDesc: "Efficient and secure goods transport.",
      monteVoitureDesc: "Vertical parking solutions for vehicles.",
      escalierMecaniqueDesc: "Modern and reliable escalators.",
      ascenseurHandicapeDesc: "Optimal accessibility for people with reduced mobility.",
      
      // Demonstrations
      installationTitle: "State-of-the-art Installation",
      installationDesc: "Fast and secure installation process for all types of buildings.",
      technologyTitle: "Modern Technology",
      technologyDesc: "Our elevators integrate the latest technological innovations.",
      securityTitle: "Safety and Reliability",
      securityDesc: "Each installation undergoes rigorous safety checks.",
      comfortTitle: "Comfort and Design",
      comfortDesc: "Elegant cabins and silent operation for optimal comfort.",
    },
    tr: {
      // Header
      typesElevators: "Asansör Türleri",
      projects: "Projeler & Başarılar",
      aboutUs: "Hakkımızda",
      requestQuote: "Teklif İste",
      
      // Hero Section
      heroTitle: "Dikey\nmobilitede\nlider",
      heroButton: "Ücretsiz Teklif İste",
      
      // About Section
      aboutTitle: "Hakkımızda",
      aboutSubtitle: "Dikey mobilitede 20 yılı aşkın uzmanlık kazandık.",
      expertise1: "Dikey mobilitede 20 yılı aşkın uzmanlık",
      expertise2: "Kapsamlı hizmetler: kurulumdan bakıma kadar",
      expertise3: "Güvenlik, kalite ve konfor için taahhütlü",
      learnMore: "Daha Fazla Bilgi",
      
      // Stats Section
      statsTitle: "Projelerinizi yükseltin, onları yükseltme işini biz hallediyoruz.",
      statsSubtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      elevatorsInstalled: "Kurulan Asansörler",
      activeProjects: "Aktif Projeler",
      certifiedTechnicians: "Sertifikalı Teknisyenler",
      readyToCollaborate: "Uzmanlarla işbirliği yapmaya hazır mısınız?",
      contactUs: "Bize Ulaşın",
      
      // Services Section
      ourServices: "Hizmetlerimiz",
      viewProjects: "Projeleri Görüntüle",
      
      // Trust Section
      trustTitle: "Bize Güveniyorlar",
      trustSubtitle: "20 yılı aşkın süredir, ELAS işletmelerin, toplulukların ve bireylerin mobilite zorluklarını karşılamak için ortaklarına destek olmaktadır.",
      
      // CTA Banner
      discoverProjects: "Başarılarımızı Keşfedin",
      explorePortfolio: "Olağanüstü projeler portföyümüzü keşfedin ve uzmanlığımızdan ilham alın.",
      viewOurProjects: "Projelerimizi Görüntüle",
      
      // Demonstrations Section
      demonstrations: "Demonstrasyonlar",
      
      // Contact Section
      readyToElevate: "Projelerinizi yükseltmeye hazır mısınız?",
      contactDescription: "Projenizi açıklayın ve kişiselleştirilmiş ücretsiz teklif alın. Uzmanlarımız ihtiyaçlarınızı analiz eder ve dikey mobilite için optimal çözümü önerir.",
      describeProject: "Projenizi açıklayın",
      describeProjectDesc: "Asansör türü, kat sayısı, maksimum yük...",
      addInfo: "Bilgilerinizi ekleyin",
      addInfoDesc: "Planlar, teknik şartname, özel kısıtlamalar...",
      receiveQuote: "Teklifinizi alın",
      receiveQuoteDesc: "Uzmanlarımız tarafından analiz ve 48 saat içinde yanıt",
      getFreeQuote: "Ücretsiz Teklifim Al",
      freeNoCommitment: "Ücretsiz • Taahhütsüz • 48 saat içinde yanıt",
      
      // Footer
      leaderMobility: "20 yılı aşkın süredir dikey mobilitede lider.",
      followUs: "Bizi Takip Edin",
      stayInformed: "En son haberlerimizden ve yeniliklerimizden haberdar olun.",
      yourEmail: "E-posta adresiniz",
      allRightsReserved: "Tüm hakları saklıdır.",
      
      // Services
      montePersonne: "Yolcu Asansörleri",
      monteCharge: "Yük Asansörleri",
      monteVoiture: "Araç Asansörleri",
      escalierMecanique: "Yürüyen Merdivenler",
      ascenseurHandicape: "Engelli Erişimi",
      
      // Service descriptions
      montePersonneDesc: "Optimal güvenlikle yolcu yükseltme çözümleri.",
      monteChargeDesc: "Verimli ve güvenli yük taşıma.",
      monteVoitureDesc: "Araçlar için dikey park çözümleri.",
      escalierMecaniqueDesc: "Modern ve güvenilir yürüyen merdivenler.",
      ascenseurHandicapeDesc: "Hareket kısıtlılığı olan kişiler için optimal erişilebilirlik.",
      
      // Demonstrations
      installationTitle: "En İyi Kurulum",
      installationDesc: "Tüm bina türleri için hızlı ve güvenli kurulum süreci.",
      technologyTitle: "Modern Teknoloji",
      technologyDesc: "Asansörlerimiz en son teknolojik yenilikleri entegre eder.",
      securityTitle: "Güvenlik ve Güvenilirlik",
      securityDesc: "Her kurulum titiz güvenlik kontrollerinden geçer.",
      comfortTitle: "Konfor ve Tasarım",
      comfortDesc: "Optimal konfor için zarif kabinler ve sessiz çalışma.",
    }
  }

  // Composant de sélection de langue
  const LanguageSelector = () => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    
    const languages = [
      { code: 'fr', name: 'Français', flag: '🇫🇷' },
      { code: 'en', name: 'English', flag: '🇬🇧' },
      { code: 'tr', name: 'Türkçe', flag: '🇹🇷' }
    ]
    
    const currentLang = languages.find(lang => lang.code === currentLanguage)
    
    // Fermer le menu quand on clique en dehors
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false)
        }
      }
      
      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside)
      }
      
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [isOpen])
    
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors rounded-md hover:bg-gray-50"
        >
          <Globe className="h-4 w-4" />
          <span className="text-sm font-medium">{currentLang?.flag} {currentLang?.code.toUpperCase()}</span>
          <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50 animate-in fade-in-0 zoom-in-95">
            <div className="py-1">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => {
                    setCurrentLanguage(language.code)
                    setIsOpen(false)
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 transition-colors flex items-center space-x-3 ${
                    currentLanguage === language.code 
                      ? 'bg-blue-50 text-blue-600 font-medium' 
                      : 'text-gray-700'
                  }`}
                >
                  <span className="text-lg">{language.flag}</span>
                  <span>{language.name}</span>
                  {currentLanguage === language.code && (
                    <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  const demonstrations = [
    {
      id: 1,
      title: translations[currentLanguage].installationTitle,
      description: translations[currentLanguage].installationDesc,
      image: "/images/carrousel1.png",
    },
    {
      id: 2,
      title: translations[currentLanguage].technologyTitle,
      description: translations[currentLanguage].technologyDesc,
      image: "/images/carrousel2.png",
    },
    {
      id: 3,
      title: translations[currentLanguage].securityTitle,
      description: translations[currentLanguage].securityDesc,
      image: "/images/carrousel3.png",
    },
    {
      id: 4,
      title: translations[currentLanguage].comfortTitle,
      description: translations[currentLanguage].comfortDesc,
      image: "/images/carrousel4.png",
    },
  ];

  const services = [
    {
      title: translations[currentLanguage].montePersonne,
      description: translations[currentLanguage].montePersonneDesc,
      image: "/images/montepersonne.png",
      link: "/services/monte-personne"
    },
    {
      title: translations[currentLanguage].monteCharge,
      description: translations[currentLanguage].monteChargeDesc,
      image: "/images/montecharge.png",
      link: "/services/monte-charge"
    },
    {
      title: translations[currentLanguage].monteVoiture,
      description: translations[currentLanguage].monteVoitureDesc,
      image: "/images/montevoiture.png",
      link: "/services/monte-voiture"
    },
    {
      title: translations[currentLanguage].escalierMecanique,
      description: translations[currentLanguage].escalierMecaniqueDesc,
      image: "/images/escalator.png",
      link: "/services/escalier-mecanique"
    },
    {
      title: translations[currentLanguage].ascenseurHandicape,
      description: translations[currentLanguage].ascenseurHandicapeDesc,
      image: "/images/ascenseurhandicape.png",
      link: "/services/ascenseur-handicape"
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
                  {translations[currentLanguage].typesElevators}<ChevronDown className="ml-1 h-4 w-4" />
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
              <a href="/conception" className="text-gray-600 hover:text-blue-600">{translations[currentLanguage].projects}</a>
              <a href="/a-propos" className="text-gray-600 hover:text-blue-600">{translations[currentLanguage].aboutUs}</a>
              <LanguageSelector />
            </nav>
            <a href="/devis">
              <Button className="btn-gradient">{translations[currentLanguage].requestQuote}</Button>
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
              <h1 className="text-5xl font-bold mb-6 leading-tight">{translations[currentLanguage].heroTitle}</h1>
              <a href="/devis"><Button className="btn-gradient text-white px-8 py-3">{translations[currentLanguage].heroButton}</Button></a>
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
                <h2 className="text-4xl font-bold text-gray-800 mb-6">{translations[currentLanguage].aboutTitle}</h2>
                <p className="text-gray-600 mb-6">{translations[currentLanguage].aboutSubtitle}</p>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">{translations[currentLanguage].expertise1}</h3>
                    <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">{translations[currentLanguage].expertise2}</h3>
                    <p className="text-gray-600 text-sm">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">{translations[currentLanguage].expertise3}</h3>
                    <p className="text-gray-600 text-sm">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                  </div>
                </div>
                <Button className="mt-8 btn-gradient" onClick={() => scrollToSection('services')}>{translations[currentLanguage].learnMore}</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section id="stats" className="py-20 bg-white" ref={statsRef}>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">{translations[currentLanguage].statsTitle}</h2>
            <p className="text-gray-600 mb-12 max-w-3xl mx-auto">{translations[currentLanguage].statsSubtitle}</p>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div><div className="text-5xl font-bold text-blue-600 mb-2">{typingStats.projects}+</div><div className="font-semibold text-gray-800">{translations[currentLanguage].elevatorsInstalled}</div></div>
              <div><div className="text-5xl font-bold text-blue-600 mb-2">{typingStats.customers}+</div><div className="font-semibold text-gray-800">{translations[currentLanguage].activeProjects}</div></div>
              <div><div className="text-5xl font-bold text-blue-600 mb-2">{typingStats.experts}+</div><div className="font-semibold text-gray-800">{translations[currentLanguage].certifiedTechnicians}</div></div>
            </div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{translations[currentLanguage].readyToCollaborate}</h3>
              <Button className="btn-gradient" onClick={() => scrollToSection('contact')}>{translations[currentLanguage].contactUs} <ChevronRight className="ml-2 h-4 w-4" /></Button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800">{translations[currentLanguage].ourServices}</h2>
              <a href="/conception"><Button variant="outline">{translations[currentLanguage].viewProjects} <Eye className="ml-2 h-4 w-4"/></Button></a>
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
            <h2 className="text-4xl font-bold text-gray-800 mb-4">{translations[currentLanguage].trustTitle}</h2>
            <p className="text-gray-600 mb-12 max-w-3xl mx-auto">{translations[currentLanguage].trustSubtitle}</p>
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
            <h2 className="text-3xl font-bold mb-4">{translations[currentLanguage].discoverProjects}</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">{translations[currentLanguage].explorePortfolio}</p>
            <a href="/conception"><Button className="btn-gradient text-lg px-8 py-3"><Eye className="mr-2 h-5 w-5" />{translations[currentLanguage].viewOurProjects}</Button></a>
          </div>
        </section>

        {/* Demonstrations Section */}
        <section id="demonstrations" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">{translations[currentLanguage].demonstrations}</h2>
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
                    <CardTitle className="text-3xl font-bold text-gray-900">{translations[currentLanguage].readyToElevate}</CardTitle>
                    <CardDescription className="pt-2">{translations[currentLanguage].contactDescription}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-bold text-sm">1</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{translations[currentLanguage].describeProject}</h4>
                          <p className="text-sm text-gray-600">{translations[currentLanguage].describeProjectDesc}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-bold text-sm">2</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{translations[currentLanguage].addInfo}</h4>
                          <p className="text-sm text-gray-600">{translations[currentLanguage].addInfoDesc}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-bold text-sm">3</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{translations[currentLanguage].receiveQuote}</h4>
                          <p className="text-sm text-gray-600">{translations[currentLanguage].receiveQuoteDesc}</p>
                        </div>
                      </div>
                    </div>
                    <div className="pt-4">
                      <a href="/devis">
                        <Button className="w-full btn-gradient text-lg py-4">
                          {translations[currentLanguage].getFreeQuote}
                          <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>
                      </a>
                      <p className="text-xs text-gray-500 text-center mt-2">{translations[currentLanguage].freeNoCommitment}</p>
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
              <p className="text-gray-400 mb-4">{translations[currentLanguage].leaderMobility}</p>
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
              <h3 className="font-semibold mb-4">{translations[currentLanguage].followUs}</h3>
              <p className="text-gray-400 mb-4">{translations[currentLanguage].stayInformed}</p>
              <div className="flex">
                <Input placeholder={translations[currentLanguage].yourEmail} className="bg-gray-800 border-gray-700 focus:ring-blue-500" />
                <Button className="btn-gradient ml-2">OK</Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ELAS. {translations[currentLanguage].allRightsReserved}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
