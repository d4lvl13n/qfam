import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import Spanish translations
import esFooter from '../locales/es/footer.json';
import esCommon from '../locales/es/common.json';
import esGallery from '../locales/es/gallery.json';
import esGuideLanding from '../locales/es/guideLanding.json';
import esGuideExpatiation from '../locales/es/guideExpatiation.json';
import esBlogSidebar from '../locales/es/blogSidebar.json';
import esFinalCTA from '../locales/es/finalCTA.json';
import esRelatedPosts from '../locales/es/relatedPosts.json';
import esContact from '../locales/es/contact.json';

// Import English translations
import enFooter from '../locales/en/footer.json';
import enCommon from '../locales/en/common.json';
import enGallery from '../locales/en/gallery.json';
import enGuideLanding from '../locales/en/guideLanding.json';
import enGuideExpatiation from '../locales/en/guideExpatiation.json';
import enBlogSidebar from '../locales/en/blogSidebar.json';
import enFinalCTA from '../locales/en/finalCTA.json';
import enRelatedPosts from '../locales/en/relatedPosts.json';
import enContact from '../locales/en/contact.json';

// Import French translations
import frFooter from '../locales/fr/footer.json';
import frCommon from '../locales/fr/common.json';
import frGallery from '../locales/fr/gallery.json';
import frGuideLanding from '../locales/fr/guideLanding.json';
import frGuideExpatiation from '../locales/fr/guideExpatiation.json';
import frBlogSidebar from '../locales/fr/blogSidebar.json';
import frFinalCTA from '../locales/fr/finalCTA.json';
import frRelatedPosts from '../locales/fr/relatedPosts.json';
import frContact from '../locales/fr/contact.json';
import frHeroSearch from '../locales/fr/heroSearch.json';
import frAbout from '../locales/fr/about.json';

// Import Spanish heroSearch
import esHeroSearch from '../locales/es/heroSearch.json';
import esAbout from '../locales/es/about.json';

// Import English heroSearch
import enHeroSearch from '../locales/en/heroSearch.json';
import enAbout from '../locales/en/about.json';

const resources = {
  es: {
    footer: esFooter.footer,
    common: esCommon,
    gallery: esGallery.gallery,
    guideLanding: esGuideLanding.guideLanding,
    guideExpatiation: esGuideExpatiation.guideExpatiation,
    blogSidebar: esBlogSidebar,
    finalCTA: esFinalCTA.finalCTA,
    relatedPosts: esRelatedPosts.relatedPosts,
    contact: esContact,
    heroSearch: esHeroSearch,
    about: esAbout
  },
  en: {
    footer: enFooter.footer,
    common: enCommon,
    gallery: enGallery.gallery,
    guideLanding: enGuideLanding.guideLanding,
    guideExpatiation: enGuideExpatiation.guideExpatiation,
    blogSidebar: enBlogSidebar,
    finalCTA: enFinalCTA.finalCTA,
    relatedPosts: enRelatedPosts.relatedPosts,
    contact: enContact,
    heroSearch: enHeroSearch,
    about: enAbout
  },
  fr: {
    footer: frFooter.footer,
    common: frCommon,
    gallery: frGallery.gallery,
    guideLanding: frGuideLanding.guideLanding,
    guideExpatiation: frGuideExpatiation.guideExpatiation,
    blogSidebar: frBlogSidebar,
    finalCTA: frFinalCTA.finalCTA,
    relatedPosts: frRelatedPosts.relatedPosts,
    contact: frContact,
    heroSearch: frHeroSearch,
    about: frAbout
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr', // French as default language for quefaireamajorque.com
    fallbackLng: 'fr', // fallback to French to avoid partial translations flashing
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    react: {
      useSuspense: false,
    }
  });

export default i18n; 