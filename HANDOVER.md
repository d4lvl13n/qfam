# Document de passation

Ce document complète le [README](./README.md). Il décrit l'architecture, les intégrations tierces, les points d'attention et les pistes d'évolution. Les faits ont été vérifiés par rapport au code au moment de la rédaction ; les éléments qui vivent dans WordPress ou chez un prestataire (et non dans le dépôt) sont signalés comme tels.

## 1. Architecture

### Vue d'ensemble

Application monopage Vite + React 18 + TypeScript. Le contenu éditorial (articles, pages, catégories, étiquettes) est stocké dans un WordPress headless. Le front-end le récupère par l'API REST et par GraphQL, et le rend avec son propre design (styled-components, Framer Motion). Les pages spécifiques (guides payants, pages légales, remerciements) sont codées dans le front-end.

### Routage (`src/App.tsx`)

Routeur : `react-router-dom` (BrowserRouter).

| Route | Composant |
| --- | --- |
| `/` | `LandingPageAlt` |
| `/gallery` | `Gallery` |
| `/contact` | `Contact` |
| `/categories` | `CategoryIndex` |
| `/category/:slug` | `CategoryPage` |
| `/tag/:slug` | `TagPage` |
| `/a-propos` | `About` |
| `/guides` | `GuidesPage` |
| `/guide` | `GuideLanding` |
| `/guide-expatriation` | `GuideLanding2` |
| `/c/v7k9m2p` | `ThankYouGuide` (remerciement achat du guide) |
| `/c/n3j8f5q` | `ThankYouExpat` (remerciement achat du guide expatriation) |
| `/experiences/:slug` | `ExperienceDetailPage` |
| `/mentions-legales`, `/confidentialite`, `/cookies` | `LegalPage` (exports `MentionsLegales`, `Confidentialite`, `Cookies`) |
| `/blog` | `BlogList` |
| `/blog/:slug` | `BlogPost` |
| `/products/:slug` | `ProductPage` |
| `*` | `WPRoute` (catch-all) |

Éléments globaux rendus hors des routes : `GoogleAnalytics`, `Analytics` (Vercel), `FloatingBookButton`, `FloatingWhatsAppButton`.

Il n'existe pas de route `/experiences` (liste) : seules les pages `/experiences/:slug` existent. Le sitemap et le middleware OG y font pourtant référence (voir points d'attention).

### Page d'accueil (`LandingPageAlt.tsx`)

Ordre des sections : `Header`, `HeroSection`, `ProductGrid`, `ArticleCarousel`, `WhoWeAre`, `GoogleReviews`, `FinalCTA`, `Footer`. Les boutons flottants (réservation, WhatsApp) viennent d'`App.tsx`.

### Route catch-all `WPRoute` (`src/routes/WPRoute.tsx`)

Toute URL non déclarée explicitement arrive ici. Le composant :

- interroge WordPress en GraphQL (`nodeByUri`) ; l'endpoint est `VITE_WP_GRAPHQL_URL`, avec repli sur `/wp-graphql` (réécrit par Vercel vers le WordPress de production) ;
- redirige les articles vers `/blog/:slug`, les catégories vers `/category/:slug`, les étiquettes vers `/tag/:slug` ;
- redirige d'anciennes URL de pages d'activités vers `/experiences/:slug` (table `ACTIVITY_REDIRECTS`) ;
- rend les pages WordPress avec le design du site (en-tête, pied de page, bannière, contenu stylé), avec l'image mise en avant comme fond de bannière, à défaut un dégradé ;
- charge et exécute les scripts présents dans le contenu (FareHarbor, TuriTop, Tiqets) via `ContentWithScripts`.

Des composants `ContentWithScripts` distincts existent aussi dans `BlogPost.tsx`, `ProductPage.tsx` et `ExperienceDetailPage.tsx` (code dupliqué).

### Couche API WordPress (`src/utils/wp.ts`)

REST via `VITE_WP_API_BASE`. Fonctions principales : `fetchPosts` (paramètre `search` pris en charge), `fetchPostBySlug`, `fetchPostsByCategory`, `fetchPostsByTag`, `fetchRelatedPosts`, `fetchActivityPageBySlug`. Les articles liés sont classés par un score : catégories communes (+3), étiquettes communes (+2), récence (+1).

Les quatre pages de catégories d'expériences sont codées en dur dans `ACTIVITY_PAGES` (identifiants de pages WordPress 12738, 12744, 12753, 12756 ; slugs `billets-et-entrees`, `excursions-en-bateau`, `activites-famille`, `excursions-et-activites`). Les pages d'activités individuelles sont des pages WordPress rendues par `WPRoute`.

Autres utilitaires : `analytics.ts` (Google Analytics), `schemaMarkup.ts` (JSON-LD), `htmlDecode.ts`.

### Blog

`BlogList` propose une recherche avec anti-rebond, qui appelle le paramètre `?search=` de l'API REST. Cette recherche ne porte que sur les articles, pas sur les pages ni les activités (limite de l'API REST WordPress). `BlogPost` rend l'article.

### Thème (`src/theme/`)

`themeConfig.ts` est la configuration centralisée (à modifier pour changer les couleurs), `mallorcaPalette.ts` la palette de base. Palette actuelle : sable (principal) et mer (secondaire). Voir `src/theme/README.md`.

### Internationalisation (`src/i18n/index.ts`, `src/locales/`)

Langues : français (défaut et repli), espagnol, anglais. Un fichier JSON par espace de noms et par langue dans `src/locales/{fr,es,en}/`. Les ressources sont importées statiquement et déclarées dans `src/i18n/index.ts` ; un nouvel espace de noms doit être ajouté aux trois langues et enregistré dans ce fichier. Les préfixes `/fr` et `/en` sont redirigés vers la racine par `vercel.json` : il n'y a pas d'URL par langue.

### Style

styled-components, Framer Motion pour les animations, effets de verre dépoli (`backdrop-filter: blur()`), approche mobile-first.

## 2. Intégrations tierces

### WordPress

- Back-office : https://quefaireamajorque-wordpress.captain.codolie.com/
- API REST : `/wp-json/wp/v2` ; GraphQL : `/graphql` (extension WPGraphQL).
- L'URL est codée en dur dans `src/utils/wp.ts` (défaut), `vercel.json`, `api/og.ts` et `scripts/generate-sitemap.js`.
- Les images sont servies depuis `wp-content/uploads` du même domaine.

### FareHarbor (système de réservation principal)

- Script Lightframe chargé dans `index.html` : `https://fareharbor.com/embeds/api/v1/?autolightframe=yes`. Il intercepte automatiquement les clics sur les liens `fareharbor.com/embeds/book/...` et ouvre la réservation dans une fenêtre modale.
- Shortname : `quefaireamajorque`. Flow ID : `1587507`.
- `FloatingBookButton` (`src/components/FloatingBookButton.tsx`, affiché sur toutes les pages) pointe vers `https://fareharbor.com/embeds/book/quefaireamajorque/?full-items=yes`, libellé « Réserve ta visite de Palma ».
- Les boutons de réservation par activité ne sont pas dans le dépôt : ils sont insérés dans le contenu des pages WordPress (par exemple la page « visite-de-palma-avec-guide-francophone », identifiant 12950). Identifiants d'items, tels que documentés par l'équipe (non vérifiables dans le code) :
  - `711819` : visite guidée de Palma à pied
  - `711822` : tour de Palma à vélo
  - `711824` : dégustation gastronomique à Palma
  - `711832` : soirée tapas à Palma
- Pour ajouter une activité : créer ou modifier la page WordPress et y insérer un lien `https://fareharbor.com/embeds/book/quefaireamajorque/items/<ID>/?flow=1587507` ; le Lightframe se charge du reste.

### TuriTop (ancien système, encore actif)

- Script global chargé dans `index.html` (identifiant société `T1629`).
- Les widgets sont des `div.load-turitop` avec un attribut `data-service="Pxx"` dans le contenu WordPress.
- Les composants `ContentWithScripts` (`WPRoute.tsx`, `ExperienceDetailPage.tsx`) rechargent le script TuriTop à chaque navigation, car l'application est une SPA.
- Selon l'inventaire de l'équipe, 16 pages WordPress utilisent encore TuriTop (excursions en bateau, snorkeling / paddle, FOKO, dauphins, etc.). Codes de service restants : P16, P17, P18, P20, P21, P23, P24, P25, P26, P27, P29, P33, P34, P35, P41, P42. Ces éléments vivent dans WordPress et ne sont pas vérifiables depuis le dépôt.
- Migration vers FareHarbor : obtenir l'identifiant d'item FareHarbor de chaque activité, remplacer le widget TuriTop de la page par un lien FareHarbor, puis, quand plus aucune page ne l'utilise, retirer le script de `index.html` et le code de rechargement dans les `ContentWithScripts`.
- Tiqets : des widgets Tiqets peuvent aussi apparaître dans le contenu WordPress ; ils sont réinitialisés par les mêmes composants.

### Elfsight

- Avis Google : `GoogleReviews.tsx` charge le script Elfsight dynamiquement et affiche le widget `elfsight-app-80700202-6e4b-4af1-882e-bb385b21290a` ; `window.eapps.initWidgets()` est rappelé à chaque navigation.
- Flux Instagram : `ElfsightWidgets.tsx` (identifiant `elfsight-app-17270c0a-c746-4546-a6d8-c75389efac39`), rendu globalement dans le `Footer`.
- Limite connue : le plan Elfsight du compte plafonne le nombre de vues mensuelles. Lorsque le quota est atteint (erreur `APP_VIEWS_LIMIT_REACHED`), les widgets ne s'affichent plus jusqu'à la réinitialisation mensuelle ou un changement de plan. Ce n'est pas un défaut du code.

### Stripe et pages de remerciement

- Les guides PDF sont vendus par des liens de paiement Stripe (`buy.stripe.com/...`) codés en dur dans `GuideLanding.tsx` (guide principal) et `GuideLanding2.tsx` (guide expatriation).
- Après paiement, l'acheteur est redirigé vers une URL peu devinable : `/c/v7k9m2p` (guide principal) ou `/c/n3j8f5q` (guide expatriation). Ces pages donnent accès au PDF, hébergé sur Vercel Blob (URL codée dans `ThankYouGuide.tsx` et `ThankYouExpat.tsx`). La protection repose uniquement sur l'obscurité de l'URL : toute personne qui la connaît peut télécharger le PDF. La redirection après paiement se configure dans le tableau de bord Stripe.
- Les PDF ne sont pas dans le dépôt (`public/dl/*.pdf` est ignoré par git).

### Formspree

Le formulaire de la barre latérale des articles (`BlogPostSidebar.tsx`) envoie ses données à `https://formspree.io/f/xdkrzneq`.

### Analytics

- Google Analytics 4 : initialisé par `src/utils/analytics.ts` via `VITE_GA_MEASUREMENT_ID` ; sans identifiant valide, GA n'est pas chargé. `GoogleAnalytics.tsx` suit les changements de page.
- Vercel Analytics : composant `<Analytics />` dans `App.tsx`.

### WhatsApp

`FloatingWhatsAppButton` (rond vert en bas à droite, placé au-dessus de la barre de réservation, plus petit sur mobile) et le `Footer` ouvrent `https://wa.me/<numéro>` avec un message prérempli (clé de traduction `contact.whatsapp_message`). Numéro : `VITE_WHATSAPP_PHONE`, sinon `+34674494245` codé en dur.

## 3. Points d'attention et dette technique

- **Contenu WordPress non assaini.** Le HTML WordPress est injecté via `dangerouslySetInnerHTML` sans assainissement (19 occurrences dans `src/`), et les balises `<script>` inline ou externes qu'il contient sont recréées et exécutées (`ContentWithScripts`). Conséquence : toute personne disposant d'un accès éditeur à WordPress peut exécuter du JavaScript sur le site. L'accès au back-office doit être considéré comme de confiance et protégé en conséquence (comptes nominatifs, mots de passe forts, double authentification).
- **Aucun test automatisé.** Vitest est configuré (`npm test` passe grâce à `--passWithNoTests`) mais aucun test n'existe.
- **Bundle volumineux.** Le bundle JS principal fait environ 580 ko. Aucun découpage par route (`React.lazy`) n'est en place ; `vite.config.ts` ne sépare que `react`, `react-dom` et `react-router-dom`.
- **Deux fichiers de thème en parallèle.** `mallorcaPalette.ts` (33 fichiers l'importent) et `themeConfig.ts` (une quinzaine) : migration partielle.
- **Composants très volumineux.** `GuideLanding.tsx` (environ 2300 lignes) et `GuideLanding2.tsx` (environ 1500 lignes) mêlent styles, données et rendu ; ils gagneraient à être découpés.
- **Code dupliqué.** `ContentWithScripts` est réimplémenté quatre fois.
- **Sitemap généré au build.** `scripts/generate-sitemap.js` interroge l'API REST WordPress pendant `npm run build`. Si la machine de build ne peut pas joindre WordPress, le sitemap est tronqué. Le fichier `public/sitemap.xml` est versionné. Le script liste aussi `/experiences`, qui n'est pas une route du front-end.
- **Lint bloquant.** Le build échoue au moindre avertissement ESLint.
- **URL WordPress dupliquée** en plusieurs endroits (voir section WordPress). La variable `VITE_WP_API_BASE` ne couvre que `wp.ts`.
- **Middleware OG.** Il ne couvre que `/blog`, `/category`, `/tag` et `/experiences` ; les autres pages (guides, pages WordPress) n'ont pas d'aperçu social propre pour les robots. `api/og.ts` contient des métadonnées d'expériences codées en dur et un auteur par défaut pour les articles.
- **Migration TuriTop vers FareHarbor incomplète** (voir section dédiée).
- **Identifiants et liens codés en dur** : liens Stripe, identifiants Elfsight, endpoint Formspree, numéro WhatsApp par défaut.

## 4. Pistes d'évolution

### Type de contenu `activite` (ACF / Custom Post Type)

Objectif : remplacer les pages d'activités codées en dur (`ACTIVITY_PAGES`) et les pages WordPress au HTML libre par un type de contenu structuré, pour garantir un rendu homogène et éviter que la mise en page soit cassée par la saisie.

Côté WordPress :

- Custom Post Type `activite`, exposé dans l'API REST.
- Champs ACF : titre, description, image mise en avant (et galerie), prix, identifiant d'item FareHarbor, ordre d'affichage.
- Taxonomie personnalisée `activite_categorie`.

Côté React :

- Nouvelle récupération : `GET /wp-json/wp/v2/activite?_embed`.
- Route dynamique `/activites/:slug` avec un gabarit fixe : bannière, galerie d'images, description, prix, bouton de réservation FareHarbor construit à partir de l'identifiant d'item.
- Page catalogue `/activites` : grille filtrable par catégorie (image, prix, appel à l'action pour chaque activité).
- Suppression de `ACTIVITY_PAGES` et des redirections associées ; mise à jour du sitemap, du middleware OG et de `api/og.ts`.

Cette évolution supprime aussi, pour les activités, le besoin d'exécuter des scripts issus du contenu WordPress, et facilite la migration finale de TuriTop vers FareHarbor.

### Autres pistes

- Découpage par route (`React.lazy` et `Suspense`) pour réduire le bundle initial.
- Assainissement du HTML WordPress (par exemple DOMPurify) et liste blanche des scripts autorisés.
- Factorisation de `ContentWithScripts` en un composant unique.
- Finalisation de la migration vers `themeConfig.ts`.
- Découpage de `GuideLanding.tsx` et `GuideLanding2.tsx` (sections, données, styles).
- Premiers tests Vitest sur `wp.ts` (score des articles liés, normalisation des URL) et sur les utilitaires.
- Centralisation de l'URL WordPress dans une variable d'environnement partagée par le front-end, la fonction edge et le script de sitemap.
