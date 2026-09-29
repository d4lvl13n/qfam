export const palette = {
  // Tons authentiques de Majorque
  sand: '#F2E8D5',          // Sable chaud des plages
  sandLight: '#FAF4E8',     // Sable très clair
  sandDark: '#D4C4A8',      // Sable foncé
  
  sea: '#0A7EA4',           // Bleu mer Méditerranée
  seaLight: '#5FB3D6',      // Bleu clair cristallin
  seaDark: '#055A7A',       // Bleu profond
  
  villageGreen: '#4A6741',  // Vert des villages (Deià, Valldemossa)
  villageGreenLight: '#6B8A62', // Vert olivier
  villageGreenDark: '#2F4029',  // Vert forêt
  
  terracotta: '#C1785B',    // Terracotta tuiles majorquines
  terracottaLight: '#D9A088',   // Terracotta clair
  terracottaDark: '#9E5940',    // Terracotta foncé
  
  stone: '#9B8E7E',         // Pierre calcaire locale
  stoneLight: '#B5A899',    // Pierre claire
  
  ink: '#2C3A47',           // Texte principal
  inkLight: '#54667A',      // Texte secondaire
  
  white: '#FFFFFF',
  cream: '#FFFBF5',         // Blanc cassé chaleureux
};

export const gradients = {
  seaSky: `linear-gradient(135deg, ${palette.seaLight} 0%, ${palette.sea} 100%)`,
  villageHills: `linear-gradient(135deg, ${palette.villageGreen} 0%, ${palette.villageGreenDark} 100%)`,
  sunsetWarm: `linear-gradient(135deg, ${palette.terracottaLight} 0%, ${palette.terracotta} 100%)`,
  beachNatural: `linear-gradient(180deg, ${palette.cream} 0%, ${palette.sandLight} 50%, ${palette.sand} 100%)`,
  heroOverlay: `linear-gradient(135deg, rgba(10, 126, 164, 0.85) 0%, rgba(74, 103, 65, 0.90) 100%)`,
};

// Typography - Fonts optimized for travel and discovery
export const fonts = {
  heading: "'Cormorant Garamond', serif",  // Élégant et méditerranéen pour les titres
  body: "'Poppins', sans-serif",           // Moderne et lisible pour le texte
};

