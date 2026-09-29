# Thème

Deux fichiers de couleurs coexistent (migration partielle) :

```
src/theme/
├── mallorcaPalette.ts   Palette de base (couleurs, dégradés, polices)
└── themeConfig.ts       Configuration centralisée du thème et fonctions utilitaires
```

## themeConfig.ts

Point d'entrée à modifier pour changer les couleurs du site. Il expose `primary`, `secondary`, `accent`, `warm`, `background`, `text`, `border`, `shadows`, `radialEffects`. Chaque couleur fournit `main`, `light`, `dark`, `gradient` et `rgb` (chaîne `'r, g, b'` utilisée pour les `rgba()`).

Palette actuelle :

- `primary` (sable) : `#F2E8D5`, `rgb` `212, 196, 168`
- `secondary` (mer) : `#0A7EA4`, `rgb` `10, 126, 164`
- `accent` reprend `secondary` ; `warm` reprend `primary`

Lors d'un changement de `main`, mettre à jour `rgb` en même temps.

## Fonctions utilitaires

```typescript
import themeConfig, { getBorder, getShadow, getColorWithOpacity } from '../theme/themeConfig';

border: ${getBorder(themeConfig.primary, '30')};             // opacités : '10' | '15' | '20' | '30' | '40'
box-shadow: ${getShadow('card', themeConfig.primary, '0.15')}; // types : card | cardHover | button
background: ${getColorWithOpacity(themeConfig.primary, '20')};
```

## mallorcaPalette.ts

Exporte `palette`, `gradients` et `fonts`. Familles de `palette` : `sand*`, `sea*`, `villageGreen*`, `terracotta*`, `stone*`, `ink*`, `white`, `cream`.

## Migration

De nombreux composants importent encore directement `mallorcaPalette`. Pour migrer un composant :

```typescript
// Avant
import { palette } from '../theme/mallorcaPalette';
border: 1px solid ${palette.villageGreen}30;

// Après
import themeConfig, { getBorder } from '../theme/themeConfig';
border: ${getBorder(themeConfig.primary, '30')};
```

Composants utilisant déjà `themeConfig` : BlogList, BlogPost, BlogPostSidebar, CategoryIndex, CategoryPage, Contact, ElfsightWidgets, ExperienceDetailPage, Footer, ProductGrid, ProductPage, RelatedPosts, TagPage, ainsi que `routes/WPRoute.tsx`.
