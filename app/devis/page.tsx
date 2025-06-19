// /app/devis/page.tsx

"use client"

import { useState, useMemo, FC, SVGProps } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Imports des composants UI de shadcn/ui
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Imports des icônes de lucide-react
import {
  Users,
  Truck,
  Car,
  Landmark,
  Accessibility,
  HelpCircle,
  ArrowLeft,
  Lock,
  BadgeCheck,
  Clock,
  LoaderCircle,
  PartyPopper,
  AlertTriangle,
  Upload,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Linkedin,
  Instagram,
} from "lucide-react"

// --- TYPES ET DONNÉES ---

// Type pour les données du formulaire
type FormData = {
  projectType: string
  buildingType: string
  projectNature: string
  floorCount: string
  maxLoad: string
  additionalInfo: string
  contactType: string
  fullName: string
  email: string
  phone: string
  wilaya: string
  file?: File
}

// Type pour les options de projet
type ProjectOption = {
  id: string
  name: string
  icon: FC<SVGProps<SVGSVGElement>>
}

// Options pour la première étape
const projectOptions: ProjectOption[] = [
  { id: "monte-personne", name: "Monte-Personne", icon: Users },
  { id: "monte-charge", name: "Monte-Charge", icon: Truck },
  { id: "monte-voiture", name: "Monte-Voiture", icon: Car },
  { id: "escalier-mecanique", name: "Escalier Mécanique", icon: Landmark },
  { id: "ascenseur-handicape", name: "Ascenseur pour Handicapé", icon: Accessibility },
  { id: "autre", name: "Autre / Je ne sais pas", icon: HelpCircle },
]

// Liste des Wilayas d'Algérie
const wilayas = [
    "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra", "Béchar", "Blida", "Bouira",
    "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret", "Tizi Ouzou", "Alger", "Djelfa", "Jijel", "Sétif", "Saïda",
    "Skikda", "Sidi Bel Abbès", "Annaba", "Guelma", "Constantine", "Médéa", "Mostaganem", "M'Sila", "Mascara",
    "Ouargla", "Oran", "El Bayadh", "Illizi", "Bordj Bou Arreridj", "Boumerdès", "El Tarf", "Tindouf",
    "Tissemsilt", "El Oued", "Khenchela", "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent",
    "Ghardaïa", "Relizane", "Timimoun", "Bordj Badji Mokhtar", "Ouled Djellal", "Béni Abbès", "In Salah",
    "In Guezzam", "Touggourt", "Djanet", "El M'Ghair", "El Meniaa"
].sort();

// Services pour la navbar et footer
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
    link: "/services/monte-charge"
  },
  {
    title: "Monte Voiture",
    description: "Solutions de parking vertical pour véhicules.",
    image: "/images/montevoiture.png",
    link: "/services/monte-voiture"
  },
  {
    title: "Escalier Mécanique",
    description: "Escaliers mécaniques modernes et fiables.",
    image: "/images/escalator.png",
    link: "/services/escalator"
  },
  {
    title: "Ascenseurs pour Handicapés",
    description: "Accessibilité optimale pour personnes à mobilité réduite.",
    image: "/images/ascenseurhandicape.png",
    link: "/services/ascenseur-handicape"
  },
];

// --- COMPOSANT PRINCIPAL ---

export default function QuotePage() {
  // --- ÉTAT DU COMPOSANT ---
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<"success" | "error" | null>(null)
  const [submissionRef, setSubmissionRef] = useState("")

  // --- LOGIQUE DE NAVIGATION ET DE GESTION ---

  const handleInputChange = (field: keyof FormData, value: string | File | undefined) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => setStep((prev) => prev + 1)
  const prevStep = () => setStep((prev) => prev - 1)

  const selectProjectType = (projectType: string) => {
    handleInputChange("projectType", projectType)
    nextStep()
  }

  // Gère la soumission du formulaire vers l'API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmissionStatus(null)
    
    try {
        // Créer un FormData pour inclure les fichiers
        const formDataToSend = new FormData();
        
        // Ajouter toutes les données du formulaire
        Object.entries(formData).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            if (key === 'file' && value instanceof File) {
              formDataToSend.append(key, value);
            } else if (typeof value === 'string') {
              formDataToSend.append(key, value);
            }
          }
        });

        const response = await fetch('/api/send-devis', {
            method: 'POST',
            body: formDataToSend, // Envoyer FormData au lieu de JSON
        });

        const result = await response.json();

        if (response.ok) {
            const refNumber = `ELAS-${Math.floor(10000 + Math.random() * 90000)}`;
            setSubmissionRef(refNumber);
            setSubmissionStatus("success");
        } else {
            throw new Error(result.message || 'Une erreur est survenue.');
        }

    } catch (error) {
        console.error("Erreur de soumission:", error);
        setSubmissionStatus("error");
    }

    setIsSubmitting(false)
  }

  // --- LOGIQUE D'AFFICHAGE ---

  const step2Content = useMemo(() => {
    switch (formData.projectType) {
      case "monte-personne":
      case "ascenseur-handicape":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="buildingType">Type de bâtiment</Label>
              <Select onValueChange={(v) => handleInputChange("buildingType", v)} value={formData.buildingType}>
                <SelectTrigger id="buildingType"><SelectValue placeholder="Sélectionnez un type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="residentiel">Résidentiel</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="hopital">Hôpital</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Nature du projet</Label>
              <RadioGroup value={formData.projectNature} onValueChange={(v) => handleInputChange("projectNature", v)} className="flex space-x-4">
                <div className="flex items-center space-x-2"><RadioGroupItem value="nouvelle" id="r1" /><Label htmlFor="r1">Nouvelle installation</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="modernisation" id="r2" /><Label htmlFor="r2">Modernisation</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="maintenance" id="r3" /><Label htmlFor="r3">Maintenance</Label></div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="floorCount">Nombre d'étages</Label>
              <Input id="floorCount" type="number" placeholder="Ex: 5" value={formData.floorCount || ''} onChange={(e) => handleInputChange("floorCount", e.target.value)} />
            </div>
          </>
        )
      case "monte-charge":
      case "monte-voiture":
        return (
            <div className="space-y-2">
                <Label htmlFor="maxLoad">Charge maximale souhaitée (kg)</Label>
                <Input id="maxLoad" type="number" placeholder="Ex: 1000" value={formData.maxLoad || ''} onChange={(e) => handleInputChange("maxLoad", e.target.value)} />
            </div>
        )
      default: return null
    }
  }, [formData.projectType, formData.buildingType, formData.projectNature, formData.floorCount, formData.maxLoad]);

  const StepIndicator = () => (
    <div className="flex items-center justify-center space-x-2 mb-8">
        {[1,2,3].map((s) => (
             <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>{s}</div>
                {s < 3 && <div className={`w-12 h-1 ${step > s ? 'bg-blue-600' : 'bg-gray-200'}`} />}
             </div>
        ))}
    </div>
  )

  if (submissionStatus === "success") {
    return (
        <div className="min-h-screen bg-gray-50">
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
                  <a href="/#about" className="text-gray-600 hover:text-blue-600 bg-transparent border-none">À Propos</a>
                  <a href="/conception" className="text-gray-600 hover:text-blue-600">Conception</a>
                </nav>
              </div>
            </div>
          </header>

          <div className="container mx-auto max-w-2xl text-center py-20">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                  <PartyPopper className="w-16 h-16 mx-auto text-green-500 mb-4" />
                  <h1 className="text-3xl font-bold text-gray-900">Merci, {formData.fullName} !</h1>
                  <p className="mt-4 text-lg text-gray-600">Votre demande (Réf: <span className="font-semibold text-blue-600">{submissionRef}</span>) a bien été reçue.</p>
                  <p className="mt-2 text-gray-500">Un expert vous contactera sous 48h. Un email récapitulatif vous a été envoyé à l'adresse {formData.email}.</p>
                  <Button onClick={() => window.location.reload()} className="mt-8">Faire une autre demande</Button>
              </motion.div>
          </div>

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

  return (
    <div className="min-h-screen bg-gray-50">
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
              <a href="/#about" className="text-gray-600 hover:text-blue-600 bg-transparent border-none">À Propos</a>
              <a href="/conception" className="text-gray-600 hover:text-blue-600">Conception</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Obtenez votre devis personnalisé</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">Gratuit, sans engagement et réponse sous 48h. Décrivez-nous votre projet et nos experts s'occupent du reste.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardContent className="p-6 md:p-8">
                <StepIndicator />
                <AnimatePresence mode="wait">
                  <motion.div key={step} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
                    {step === 1 && (
                      <div>
                        <h2 className="text-2xl font-semibold text-center mb-6">Tout d'abord, quel est votre projet ?</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {projectOptions.map((option) => (
                            <Card key={option.id} onClick={() => selectProjectType(option.id)} className="cursor-pointer text-center p-4 hover:shadow-lg hover:border-blue-500 transition-all duration-200 flex flex-col items-center justify-center space-y-2">
                              <option.icon className="w-8 h-8 text-blue-600" />
                              <span className="font-medium text-gray-700">{option.name}</span>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                    {step === 2 && (
                      <div>
                        <h2 className="text-2xl font-semibold mb-6">Parfait ! Décrivez-nous maintenant votre besoin.</h2>
                        <div className="space-y-4">
                            {step2Content}
                            <div className="space-y-2">
                                <Label htmlFor="additionalInfo">Informations complémentaires ou questions</Label>
                                <Textarea id="additionalInfo" placeholder="Ex: Accès difficile, dimensions spécifiques..." value={formData.additionalInfo || ''} onChange={(e) => handleInputChange("additionalInfo", e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="file-upload">Vous avez un plan ou un cahier des charges ? (Optionnel)</Label>
                                <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                                    <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2"/>
                                    <span className="text-sm text-gray-600">{formData.file ? formData.file.name : 'Cliquez pour charger un fichier'}</span>
                                    <Input id="file-upload" type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => handleInputChange("file", e.target.files?.[0])} />
                                </div>
                            </div>
                        </div>
                      </div>
                    )}
                    {step === 3 && (
                      <div>
                        <h2 className="text-2xl font-semibold mb-6">Presque fini. Comment pouvons-nous vous contacter ?</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="grid sm:grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <Label htmlFor="contactType">Vous êtes</Label>
                                <Select onValueChange={(v) => handleInputChange("contactType", v)} value={formData.contactType}><SelectTrigger id="contactType"><SelectValue placeholder="Sélectionnez votre profil" /></SelectTrigger><SelectContent><SelectItem value="particulier">Particulier</SelectItem><SelectItem value="architecte">Architecte</SelectItem><SelectItem value="promoteur">Promoteur</SelectItem><SelectItem value="syndic">Syndic</SelectItem><SelectItem value="autre">Autre</SelectItem></SelectContent></Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Nom complet</Label>
                                <Input id="fullName" placeholder="Votre nom" value={formData.fullName || ''} onChange={(e) => handleInputChange("fullName", e.target.value)} required />
                            </div>
                          </div>
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Adresse e-mail</Label>
                                <Input id="email" type="email" placeholder="nom@exemple.com" value={formData.email || ''} onChange={(e) => handleInputChange("email", e.target.value)} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Numéro de téléphone</Label>
                                <Input id="phone" type="tel" placeholder="05 XX XX XX XX" value={formData.phone || ''} onChange={(e) => handleInputChange("phone", e.target.value)} required />
                            </div>
                          </div>
                           <div className="space-y-2">
                                <Label htmlFor="wilaya">Wilaya du projet</Label>
                                <Select onValueChange={(v) => handleInputChange("wilaya", v)} value={formData.wilaya}><SelectTrigger id="wilaya"><SelectValue placeholder="Sélectionnez une wilaya" /></SelectTrigger><SelectContent>{wilayas.map(w => <SelectItem key={w} value={w}>{w}</SelectItem>)}</SelectContent></Select>
                            </div>
                        </form>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
                <div className="mt-8 flex justify-between items-center">
                  <div>{step > 1 && (<Button variant="ghost" onClick={prevStep}><ArrowLeft className="mr-2 h-4 w-4" />Retour</Button>)}</div>
                  <div>
                    {step < 3 && (<Button onClick={nextStep} disabled={!formData.projectType}>Suivant</Button>)}
                    {step === 3 && (<Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>{isSubmitting ? (<><LoaderCircle className="mr-2 h-4 w-4 animate-spin" />Envoi en cours...</>) : ("Envoyer ma demande")}</Button>)}
                  </div>
                </div>
                 {submissionStatus === "error" && (<Alert variant="destructive" className="mt-6"><AlertTriangle className="h-4 w-4" /><AlertTitle>Erreur de soumission</AlertTitle><AlertDescription>Une erreur est survenue. Veuillez réessayer ou nous appeler directement.</AlertDescription></Alert>)}
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 bg-white rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Votre projet entre de bonnes mains</h3>
              <ul className="space-y-4">
                <li className="flex items-start"><Lock className="h-5 w-5 text-blue-600 mt-1 mr-3 flex-shrink-0" /><div><h4 className="font-semibold text-gray-800">Confidentialité Garantie</h4><p className="text-sm text-gray-600">Vos informations restent confidentielles et sécurisées.</p></div></li>
                <li className="flex items-start"><BadgeCheck className="h-5 w-5 text-blue-600 mt-1 mr-3 flex-shrink-0" /><div><h4 className="font-semibold text-gray-800">100% Gratuit</h4><p className="text-sm text-gray-600">Le devis est totalement gratuit et sans aucun engagement de votre part.</p></div></li>
                <li className="flex items-start"><Clock className="h-5 w-5 text-blue-600 mt-1 mr-3 flex-shrink-0" /><div><h4 className="font-semibold text-gray-800">Réponse Rapide</h4><p className="text-sm text-gray-600">Analyse par nos experts et réponse garantie sous 48h.</p></div></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

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
