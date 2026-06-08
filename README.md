Voici le modèle de `README.md` complet et structuré, prêt à être copié-collé pour votre nouveau projet. Il est basé sur l'arborescence et les technologies détectées dans votre dépôt :

---

```markdown
# Elas-Website

## 📝 Description
**Elas-Website** est le projet de Landing Page officielle pour l'entreprise ELAS[cite: 2]. Ce site vitrine moderne met en valeur les différentes solutions de mobilité verticale et d'accessibilité de l'entreprise, tout en intégrant un système de contact et de demande de devis[cite: 2].

## 🛠️ Technologies Utilisées
En analysant la structure du projet, voici les technologies principales :
* **Framework** : Next.js avec l'App Router (présence du dossier `app/` et de `next.config.mjs`)[cite: 2].
* **Langage** : TypeScript (fichiers `.ts` et `.tsx`)[cite: 2].
* **Interface Utilisateur** : Composants Shadcn UI (présence de `components.json` et de nombreux composants dans `components/ui/` comme `button`, `dialog`, `carousel`, etc.)[cite: 2].
* **Gestionnaire de paquets** : pnpm (présence du fichier `pnpm-lock.yaml`)[cite: 2].
* **Style** : Tailwind CSS / PostCSS (présence de `postcss.config.mjs` et `globals.css`)[cite: 2].

## 📂 Architecture du Projet

* **`app/`** : Cœur de l'application contenant les pages principales (`a-propos`, `conception`, `devis`)[cite: 2].
* **`app/services/`** : Pages détaillant les différentes prestations :
  * Ascenseur pour handicapé[cite: 2]
  * Escalator[cite: 2]
  * Monte-charge[cite: 2]
  * Monte-personne[cite: 2]
  * Monte-voiture[cite: 2]
* **`app/api/send-devis/`** : Route API backend gérant l'envoi des formulaires de demande de devis[cite: 2].
* **`components/`** : Composants React réutilisables, incluant les éléments d'interface (`ui/`) et la gestion du thème (`theme-provider.tsx`)[cite: 2].
* **`lib/` & `hooks/`** : Fonctions utilitaires, données mockées (`data.ts`) et hooks personnalisés (`use-mobile.tsx`, `use-toast.ts`)[cite: 2].
* **`public/certificats/`** : Ressources statiques, notamment les certificats de qualité de l'entreprise (ex: ISO-9001-2015, EN-13015-A1)[cite: 2].

## 🚀 Installation et Lancement

**1. Cloner le dépôt :**
```bash
git clone <votre-lien-github>
cd Elas-Website

```

**2. Installer les dépendances :**
Le projet utilisant `pnpm`, exécutez la commande suivante :

```bash
pnpm install

```

**3. Lancer le serveur de développement :**

```bash
pnpm dev

```

Ouvrez ensuite [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) dans votre navigateur pour voir le résultat.

## ⚙️ Scripts Disponibles

(Assurez-vous de vérifier votre fichier `package.json`, mais voici les commandes standards)

* `pnpm dev` : Lance le serveur de développement.
* `pnpm build` : Compile l'application pour la production.
* `pnpm start` : Démarre le serveur de production après le build.
* `pnpm lint` : Vérifie les erreurs de syntaxe via ESLint.

```

```
