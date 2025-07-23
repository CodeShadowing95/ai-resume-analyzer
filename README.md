# 🤖 Resume Analyzer - Analyseur de CV avec IA

Une application web moderne d'analyse de CV utilisant l'intelligence artificielle pour évaluer et optimiser les CV selon les standards ATS (Applicant Tracking System).

![Resume Analyzer](./public/images/resume-scan.gif)

## 📋 Table des matières

- [🎯 Aperçu du projet](#-aperçu-du-projet)
- [✨ Fonctionnalités](#-fonctionnalités)
- [🛠️ Technologies utilisées](#️-technologies-utilisées)
- [📁 Structure du projet](#-structure-du-projet)
- [🚀 Installation et configuration](#-installation-et-configuration)
- [🐳 Déploiement avec Docker](#-déploiement-avec-docker)
- [🔧 Scripts disponibles](#-scripts-disponibles)
- [📖 Guide d'utilisation](#-guide-dutilisation)
- [🏗️ Architecture](#️-architecture)
- [🤝 Contribution](#-contribution)
- [📄 Licence](#-licence)

## 🎯 Aperçu du projet

Resume Analyzer est une application web sophistiquée qui utilise l'intelligence artificielle pour analyser les CV et fournir des recommandations d'amélioration. L'application évalue la compatibilité ATS, identifie les points forts et faibles, et propose des suggestions concrètes pour optimiser les chances de succès lors des candidatures.

### Objectifs principaux :
- **Analyse ATS** : Évaluation de la compatibilité avec les systèmes de suivi des candidatures
- **Optimisation** : Suggestions d'amélioration basées sur l'IA
- **Scoring** : Attribution d'un score de qualité global
- **Recommandations** : Conseils personnalisés pour chaque section du CV

## ✨ Fonctionnalités

### 🔍 Analyse intelligente
- **Parsing PDF** : Extraction automatique du contenu des CV au format PDF
- **Analyse sémantique** : Compréhension du contexte et du contenu
- **Évaluation ATS** : Vérification de la compatibilité avec les systèmes de recrutement
- **Scoring multi-critères** : Évaluation sur plusieurs dimensions

### 📊 Rapports détaillés
- **Score global** : Note générale de 0 à 100
- **Analyse par section** : Évaluation détaillée de chaque partie du CV
- **Recommandations ciblées** : Suggestions d'amélioration spécifiques
- **Visualisations** : Graphiques et indicateurs visuels

### 🎨 Interface utilisateur
- **Design moderne** : Interface responsive et intuitive
- **Mode sombre/clair** : Adaptation aux préférences utilisateur
- **Animations fluides** : Expérience utilisateur optimisée
- **Accessibilité** : Respect des standards d'accessibilité web

### 🔒 Sécurité et confidentialité
- **Traitement local** : Analyse sécurisée des données
- **Chiffrement** : Protection des informations sensibles
- **Conformité RGPD** : Respect de la réglementation européenne

## 🛠️ Technologies utilisées

### Frontend
- **[React 19](https://react.dev/)** - Bibliothèque JavaScript pour l'interface utilisateur
- **[React Router v7](https://reactrouter.com/)** - Routage et navigation côté client
- **[TypeScript](https://www.typescriptlang.org/)** - Typage statique pour JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utilitaire
- **[Vite](https://vitejs.dev/)** - Outil de build et serveur de développement

### Traitement de documents
- **[PDF.js](https://mozilla.github.io/pdf.js/)** - Parsing et extraction de contenu PDF
- **[Zustand](https://github.com/pmndrs/zustand)** - Gestion d'état légère

### Intelligence artificielle
- **[Puter.js](https://puter.js.org/)** - SDK JavaScript pour l'intégration IA
- **[Puter.com](https://puter.com/)** - Plateforme cloud pour services IA

### DevOps et déploiement
- **[Docker](https://www.docker.com/)** - Conteneurisation de l'application
- **[Vercel](https://vercel.com/)** - Plateforme de déploiement
- **[Git](https://git-scm.com/)** - Contrôle de version

### Outils de développement
- **[ESLint](https://eslint.org/)** - Linting et qualité du code
- **[Prettier](https://prettier.io/)** - Formatage automatique du code
- **[Husky](https://typicode.github.io/husky/)** - Git hooks pour la qualité

## 📁 Structure du projet

```
resume-analyzer/
├── 📁 app/                          # Code source principal
│   ├── 📄 app.css                   # Styles globaux
│   ├── 📄 root.tsx                  # Composant racine
│   ├── 📄 routes.ts                 # Configuration des routes
│   ├── 📁 routes/                   # Pages et routes
│   │   └── 📄 home.tsx             # Page d'accueil
│   └── 📁 welcome/                  # Composants d'accueil
│       ├── 📄 welcome.tsx          # Composant principal
│       ├── 🖼️ logo-dark.svg        # Logo mode sombre
│       └── 🖼️ logo-light.svg       # Logo mode clair
├── 📁 public/                       # Ressources statiques
│   ├── 🖼️ favicon.ico              # Icône du site
│   ├── 📁 icons/                    # Icônes SVG
│   │   ├── 🖼️ ats-good.svg         # Icône ATS valide
│   │   ├── 🖼️ ats-warning.svg      # Icône ATS attention
│   │   ├── 🖼️ ats-bad.svg          # Icône ATS problème
│   │   └── 🖼️ ...                  # Autres icônes
│   ├── 📁 images/                   # Images et illustrations
│   │   ├── 🖼️ bg-main.svg          # Arrière-plan principal
│   │   ├── 🖼️ resume-scan.gif      # Animation d'analyse
│   │   └── 🖼️ ...                  # Autres images
│   └── 📄 pdf.worker.min.mjs        # Worker PDF.js
├── 📄 package.json                  # Dépendances et scripts
├── 📄 package-lock.json             # Verrouillage des versions
├── 📄 tsconfig.json                 # Configuration TypeScript
├── 📄 vite.config.ts                # Configuration Vite
├── 📄 react-router.config.ts        # Configuration React Router
├── 📄 Dockerfile                    # Configuration Docker
├── 📄 .dockerignore                 # Exclusions Docker
├── 📄 .gitignore                    # Exclusions Git
└── 📄 README.md                     # Documentation
```

## 🚀 Installation et configuration

### Prérequis
- **Node.js** >= 20.0.0
- **npm** >= 10.0.0
- **Git** pour le contrôle de version
- **Docker** (optionnel, pour la conteneurisation)

### Installation locale

1. **Cloner le repository**
```bash
git clone https://github.com/votre-username/resume-analyzer.git
cd resume-analyzer
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration des variables d'environnement**
```bash
# Créer un fichier .env.local
cp .env.example .env.local

# Configurer les clés API Puter.com
VITE_PUTER_API_KEY=votre_cle_api_puter
VITE_PUTER_APP_ID=votre_app_id
```

4. **Lancer le serveur de développement**
```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### Configuration Puter.com

1. **Créer un compte** sur [Puter.com](https://puter.com/)
2. **Créer une nouvelle application** dans le dashboard
3. **Récupérer les clés API** et les ajouter au fichier `.env.local`
4. **Configurer les permissions** pour l'analyse de documents

## 🐳 Déploiement avec Docker

### Build et exécution locale

```bash
# Construire l'image Docker
docker build -t resume-analyzer .

# Lancer le conteneur
docker run -p 3000:3000 resume-analyzer
```

### Docker Compose (recommandé)

```yaml
# docker-compose.yml
version: '3.8'
services:
  resume-analyzer:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - VITE_PUTER_API_KEY=${VITE_PUTER_API_KEY}
      - VITE_PUTER_APP_ID=${VITE_PUTER_APP_ID}
    volumes:
      - ./uploads:/app/uploads
```

```bash
# Lancer avec Docker Compose
docker-compose up -d
```

### Déploiement sur Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel --prod
```

## 🔧 Scripts disponibles

```bash
# Développement
npm run dev              # Serveur de développement
npm run build            # Build de production
npm run start            # Serveur de production
npm run typecheck        # Vérification TypeScript

# Qualité du code
npm run lint             # Linting ESLint
npm run lint:fix         # Correction automatique
npm run format           # Formatage Prettier
npm run test             # Tests unitaires

# Docker
npm run docker:build     # Build image Docker
npm run docker:run       # Lancer conteneur
npm run docker:push      # Push vers registry
```

## 📖 Guide d'utilisation

### 1. Upload de CV
- Glissez-déposez votre CV PDF sur la zone de téléchargement
- Ou cliquez pour sélectionner un fichier
- Formats supportés : PDF (recommandé), DOC, DOCX

### 2. Analyse automatique
- L'IA analyse automatiquement le contenu
- Extraction des informations clés
- Évaluation de la structure et du contenu

### 3. Résultats et recommandations
- **Score global** : Note de 0 à 100
- **Analyse ATS** : Compatibilité avec les systèmes de recrutement
- **Recommandations** : Suggestions d'amélioration détaillées
- **Comparaison** : Benchmarking avec les standards du secteur

### 4. Optimisation
- Suivez les recommandations proposées
- Téléchargez le rapport d'analyse
- Réanalysez après modifications

## 🏗️ Architecture

### Architecture générale
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Puter.com     │    │   PDF.js        │
│   React + TS    │◄──►│   IA Services   │    │   Parser        │
│   Tailwind CSS  │    │   API Cloud     │    │   Worker        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Zustand       │
                    │   State Mgmt    │
                    └─────────────────┘
```

### Flux de données
1. **Upload** : L'utilisateur télécharge un CV
2. **Parsing** : PDF.js extrait le contenu textuel
3. **Analyse** : Puter.com traite le contenu avec l'IA
4. **Résultats** : Affichage des scores et recommandations
5. **Optimisation** : Suggestions d'amélioration

### Composants principaux
- **UploadZone** : Gestion du téléchargement de fichiers
- **AnalysisEngine** : Orchestration de l'analyse IA
- **ResultsDashboard** : Affichage des résultats
- **RecommendationPanel** : Suggestions d'amélioration

## 🤝 Contribution

### Workflow de contribution

1. **Fork** le repository
2. **Créer une branche** pour votre fonctionnalité
```bash
git checkout -b feature/nouvelle-fonctionnalite
```
3. **Développer** en suivant les conventions
4. **Tester** vos modifications
```bash
npm run test
npm run typecheck
npm run lint
```
5. **Commit** avec des messages descriptifs
```bash
git commit -m "feat: ajout de l'analyse sémantique avancée"
```
6. **Push** et créer une Pull Request

### Standards de code
- **TypeScript** : Typage strict obligatoire
- **ESLint** : Respect des règles de linting
- **Prettier** : Formatage automatique
- **Conventional Commits** : Messages de commit standardisés

### Tests
- Tests unitaires avec **Vitest**
- Tests d'intégration avec **Testing Library**
- Tests E2E avec **Playwright**

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 🔗 Liens utiles

- **Documentation React Router v7** : https://reactrouter.com/docs
- **Documentation Puter.com** : https://docs.puter.com/
- **Guide TypeScript** : https://www.typescriptlang.org/docs/
- **Tailwind CSS** : https://tailwindcss.com/docs

## 📞 Support

Pour toute question ou problème :
- **Issues GitHub** : [Créer une issue](https://github.com/votre-username/resume-analyzer/issues)
- **Discussions** : [Forum de discussion](https://github.com/votre-username/resume-analyzer/discussions)
- **Email** : support@resume-analyzer.com

---

**Développé avec ❤️ par Patrick NAMEGNI**

*Resume Analyzer - Optimisez vos CV avec l'intelligence artificielle*