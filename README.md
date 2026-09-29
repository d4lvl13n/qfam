# Que faire à Majorque

Site de tourisme et de réservation d'activités à Majorque (quefaireamajorque.com). Application monopage React qui consomme un WordPress headless pour le contenu éditorial (articles, pages, catégories) et délègue la réservation à FareHarbor (et, pour une partie des pages, à TuriTop). Elle vend également deux guides PDF via des liens de paiement Stripe.

Documentation détaillée pour la reprise du projet : [HANDOVER.md](./HANDOVER.md).

## Stack

- Vite 4, React 18, TypeScript 5
- react-router-dom 6
- styled-components 6, Framer Motion
- i18next / react-i18next (français par défaut, espagnol, anglais)
- react-helmet-async (SEO), @vercel/analytics
- WordPress headless (API REST et GraphQL)
- Déploiement : Vercel (fonction edge et middleware edge)
- Qualité : ESLint (zéro avertissement toléré), Vitest (configuré, aucun test écrit à ce jour)

## Prérequis

- Node.js 18 ou supérieur (aucun champ `engines` ni fichier `.nvmrc` dans le dépôt)
- npm
- Accès réseau à l'instance WordPress (nécessaire au build, voir plus bas)

## Installation

```bash
npm install
npm run dev
```

Le serveur de développement écoute sur http://localhost:5173. Aucune variable d'environnement n'est obligatoire : chacune a une valeur par défaut ou une dégradation gracieuse (voir ci-dessous).

## Scripts npm

| Script | Commande | Description |
| --- | --- | --- |
| `dev` | `vite` | Serveur de développement (port 5173) |
| `build` | `npm run lint && npm run generate-sitemap && tsc && vite build` | Build de production : lint, génération du sitemap depuis WordPress, vérification TypeScript, build Vite vers `dist/` |
| `build:no-sitemap` | `npm run lint && tsc && vite build` | Idem sans régénérer le sitemap (utile hors ligne) |
| `generate-sitemap` | `node scripts/generate-sitemap.js` | Interroge l'API REST WordPress et écrit `public/sitemap.xml` |
| `lint` | `eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0` | Lint, aucun avertissement toléré |
| `preview` | `vite preview` | Prévisualisation du build (port 4173) |
| `test` | `vitest run --passWithNoTests` | Tests unitaires (aucun test présent) |

Comme `build` exécute le lint, tout avertissement ESLint fait échouer le build. Le sitemap est généré à partir de l'API WordPress : la machine de build doit pouvoir la joindre, sinon le sitemap produit est incomplet.

## Variables d'environnement

Fichiers `.env*` ignorés par git. Toutes les variables `VITE_*` sont lues au build et exposées au navigateur.

| Variable | Utilisée dans | Rôle | Défaut |
| --- | --- | --- | --- |
| `VITE_WP_API_BASE` | `src/utils/wp.ts` | URL de base de l'API REST WordPress (`.../wp-json/wp/v2`) | `https://quefaireamajorque-wordpress.captain.codolie.com/wp-json/wp/v2` |
| `VITE_WP_GRAPHQL_URL` | `src/routes/WPRoute.tsx` | Endpoint GraphQL WordPress pour la route catch-all ; `https` forcé et `/graphql` ajouté si absent | Aucun : repli sur `/wp-graphql` (réécriture Vercel vers le WordPress de production) |
| `VITE_GA_MEASUREMENT_ID` | `src/utils/analytics.ts` | Identifiant de mesure Google Analytics 4 | `G-XXXXXXXXXX` (valeur factice : GA n'est pas initialisé) |
| `VITE_WHATSAPP_PHONE` | `src/components/FloatingWhatsAppButton.tsx`, `src/components/Footer.tsx` | Numéro WhatsApp du bouton flottant et du pied de page | `+34674494245` (codé en dur) |
| `NODE_ENV` | `src/i18n/index.ts` | Active le mode debug d'i18next en développement | Fourni par Vite / l'outillage |

Aucun `process.env.*` n'est lu dans `api/`, `middleware.ts` ni `scripts/` : l'URL WordPress et l'URL du site y sont codées en dur (`api/og.ts`, `scripts/generate-sitemap.js`). Un changement d'hébergement WordPress impose de modifier ces fichiers ainsi que `vercel.json`.

## Structure du projet

```
.
├── api/og.ts                 Fonction edge : balises Open Graph pour les robots sociaux
├── middleware.ts             Middleware edge : détection des robots et réécriture vers /api/og
├── scripts/generate-sitemap.js   Génération de public/sitemap.xml
├── public/                   Images, guides (webp), robots.txt, sitemap.xml
├── index.html                Point d'entrée, scripts tiers (FareHarbor, TuriTop), JSON-LD
├── vercel.json               Redirections, réécritures, en-têtes
├── vite.config.ts
└── src/
    ├── App.tsx               Routes et éléments globaux
    ├── main.tsx
    ├── components/           Pages et composants (une page ou section par fichier)
    ├── routes/WPRoute.tsx    Route catch-all pour les pages WordPress
    ├── utils/                wp.ts (API WordPress), analytics.ts, schemaMarkup.ts, htmlDecode.ts
    ├── theme/                Palette et configuration du thème
    ├── i18n/index.ts         Initialisation i18next
    └── locales/{fr,es,en}/   Fichiers de traduction JSON par espace de noms
```

## Déploiement

Le site est déployé sur Vercel (`buildCommand: npm run build`, `outputDirectory: dist`).

`vercel.json` :

- En-tête `X-Robots-Tag: index, follow` sur toutes les routes.
- Redirections 301 : `/produit/*` vers `/guides`, deux anciennes URL vers des articles du blog, et suppression des préfixes de langue `/fr` et `/en`.
- Réécritures : `/wp-rest/*` vers `.../wp-json/*` et `/wp-graphql` vers `.../graphql` du WordPress de production (proxy sans CORS ; `/wp-graphql` sert de repli à la route catch-all, `/wp-rest` n'est pas utilisé par le code actuel), puis `/(.*)` vers `/index.html` pour le routage côté client.

Aperçu social (Open Graph) : les robots des réseaux sociaux n'exécutent pas JavaScript et ne voient donc pas les balises injectées par React Helmet.

- `middleware.ts` (edge, matcher `/blog`, `/category`, `/tag`, `/experiences`) détecte les user-agents de robots (Facebook, Twitter, LinkedIn, WhatsApp, Slack, Discord, Telegram, Pinterest, Applebot, etc.). Pour ces robots uniquement, il réécrit la requête vers `/api/og?path=<chemin>`. Les autres visiteurs sont servis normalement.
- `api/og.ts` (edge function) renvoie un HTML minimal avec `og:title`, `og:description`, `og:image` et les balises Twitter. Il interroge l'API REST WordPress pour `/blog/:slug`, `/category/:slug` et `/tag/:slug`, utilise des métadonnées codées en dur pour `/experiences/:slug`, et des valeurs par défaut du site sinon.

Le build doit pouvoir joindre WordPress (génération du sitemap). Voir [HANDOVER.md](./HANDOVER.md) pour les intégrations tierces et les points d'attention.
