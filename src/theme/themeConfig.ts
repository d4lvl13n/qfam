import { palette, gradients } from './mallorcaPalette';

/**
 * Configuration centralisée du thème - Tons de Majorque
 * Palette simplifiée : Sable (tan) et Mer (bleu)
 * 
 * Modifiez les valeurs ici pour changer les couleurs de tout le site
 */
export const themeConfig = {
  // Couleur principale : Sable chaud des plages majorquines
  primary: {
    main: palette.sand,
    light: palette.sandLight,
    dark: palette.sandDark,
    gradient: gradients.beachNatural,
    rgb: '212, 196, 168', // RGB de sandDark pour les rgba() (plus saturé)
  },

  // Couleur secondaire : Mer Méditerranée
  secondary: {
    main: palette.sea,
    light: palette.seaLight,
    dark: palette.seaDark,
    gradient: gradients.seaSky,
    rgb: '10, 126, 164',
  },

  // Accent : Utilise la mer pour les accents (remplace le vert villages)
  accent: {
    main: palette.sea,
    light: palette.seaLight,
    dark: palette.seaDark,
    gradient: gradients.seaSky,
    rgb: '10, 126, 164',
  },

  // Warm : Utilise le sable pour les touches chaleureuses (remplace terracotta)
  warm: {
    main: palette.sand,
    light: palette.sandLight,
    dark: palette.sandDark,
    gradient: gradients.beachNatural,
    rgb: '212, 196, 168',
  },

  // Couleurs de fond
  background: {
    main: gradients.beachNatural,
    overlay: palette.cream,
    card: 'rgba(255, 255, 255, 0.95)',
  },

  // Effets radiaux pour les backgrounds (sable + mer uniquement)
  radialEffects: {
    primary: `radial-gradient(circle at 20% 30%, ${palette.sandLight}25 0%, transparent 50%)`,
    secondary: `radial-gradient(circle at 80% 70%, ${palette.seaLight}15 0%, transparent 50%)`,
  },

  // Texte
  text: {
    primary: palette.ink,
    secondary: palette.inkLight,
    white: palette.white,
    sand: palette.sandDark, // Pour texte sur fond clair
    sea: palette.seaDark,   // Pour liens et accents
  },

  // Bordures
  border: {
    light: '1px solid',
    medium: '2px solid',
    opacity: {
      10: '10',
      15: '15',
      20: '20',
      30: '30',
      40: '40',
    },
  },

  // Ombres
  shadows: {
    card: '0 10px 30px -12px',
    cardHover: '0 25px 50px -12px',
    button: '0 20px 40px -10px',
  },
};

/**
 * Fonction helper pour générer une couleur avec opacité
 * Usage: getColorWithOpacity(themeConfig.primary, '30')
 */
export const getColorWithOpacity = (
  color: { main: string; rgb: string },
  opacity: string
) => {
  return `rgba(${color.rgb}, 0.${opacity})`;
};

/**
 * Fonction helper pour générer une bordure colorée
 * Usage: getBorder(themeConfig.primary, '30')
 */
export const getBorder = (
  color: { main: string; rgb: string },
  opacity: '10' | '15' | '20' | '30' | '40' = '20'
) => {
  const opacityValue = themeConfig.border.opacity[opacity];
  return `${themeConfig.border.light} rgba(${color.rgb}, 0.${opacityValue})`;
};

/**
 * Fonction helper pour générer une ombre colorée
 * Usage: getShadow('card', themeConfig.primary, '0.15')
 */
export const getShadow = (
  type: keyof typeof themeConfig.shadows,
  color: { rgb: string },
  opacity: string = '0.15'
) => {
  return `${themeConfig.shadows[type]} rgba(${color.rgb}, ${opacity})`;
};

export default themeConfig;

