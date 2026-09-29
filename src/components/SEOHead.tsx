import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface StructuredData {
  "@context": string;
  "@type": string;
  [key: string]: unknown;
}

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'service';
  structuredData?: StructuredData | StructuredData[];
  noIndex?: boolean;
  canonical?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

const SEOHead: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image = '/img/LOGO_2026.png',
  url,
  type = 'website',
  structuredData,
  noIndex = false,
  canonical,
  publishedTime,
  modifiedTime,
  author
}) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const languageCode = currentLanguage === 'es' ? 'es' : currentLanguage === 'en' ? 'en' : 'fr';
  
  // Default SEO values
  const defaultTitle = currentLanguage === 'es' 
    ? 'Que hacer en Mallorca - Guías, alquiler de coche, actividades y visitas'
    : currentLanguage === 'en'
    ? 'Things to do in Mallorca - Guides, car rental, activities and tours'
    : 'Que faire à Majorque - Guides, location de voiture, activités et visites';
    
  const defaultDescription = currentLanguage === 'es'
    ? 'Le mejor de Mallorca: guía digital, alquiler de coche con Offugo, visitas guiadas en Palma en español y entradas (Tiqets). Pagos seguros con Stripe.'
    : currentLanguage === 'en'
    ? 'Your Mallorca essentials: digital guide, car rental with Offugo, French guided tours in Palma and tickets (Tiqets). Secure payments with Stripe.'
    : 'Vos essentiels à Majorque: guide digital, location de voiture avec Offugo, visites guidées à Palma en français et billets (Tiqets). Paiements sécurisés via Stripe.';
    
  const defaultKeywords = currentLanguage === 'es'
    ? 'Mallorca guía digital, alquiler coche Offugo, visitas Palma francés, Tiqets Mallorca, actividades Mallorca, que hacer Mallorca'
    : currentLanguage === 'en'
    ? 'Mallorca digital guide, Offugo car rental, Palma French tours, Tiqets Mallorca, Mallorca activities, things to do Mallorca'
    : 'Majorque guide digital, location voiture Offugo, visites Palma français, Tiqets Majorque, activités Majorque, que faire à Majorque';

  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;
  const baseUrl = 'https://quefaireamajorque.com';
  const locationOrigin = typeof window !== 'undefined' ? window.location.origin : baseUrl;
  const locationPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const locationUrl = `${locationOrigin}${locationPath}`;
  const finalCanonical = canonical || url || locationUrl || baseUrl;
  const finalUrl = url || finalCanonical;
  const finalImage = image.startsWith('http') ? image : `${baseUrl}${image}`;

  // Language-specific alternate URLs
  // Note: Since the app uses client-side i18n without separate URL routes,
  // we only set the canonical URL and x-default hreflang
  const getAlternateUrls = () => {
    const canonicalPath = finalCanonical.startsWith(baseUrl)
      ? finalCanonical.slice(baseUrl.length)
      : '';
    return {
      default: `${baseUrl}${canonicalPath}`
    };
  };

  const alternateUrls = getAlternateUrls();

  return (
    <Helmet htmlAttributes={{ lang: languageCode }}>
      {/* Primary Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="title" content={finalTitle} />
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      
      {/* Robots */}
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="language" content={currentLanguage === 'es' ? 'Spanish' : currentLanguage === 'en' ? 'English' : 'French'} />
      <meta name="author" content="Que faire à Majorque" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalCanonical} />
      
      {/* Alternate Language Pages */}
      {/* Note: Language switching is handled client-side via i18n, not separate URLs */}
      <link rel="alternate" hrefLang="x-default" href={alternateUrls.default} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Que faire à Majorque" />
      <meta property="og:locale" content={currentLanguage === 'es' ? 'es_ES' : currentLanguage === 'en' ? 'en_US' : 'fr_FR'} />

      {/* Article-specific OG tags */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && (
        <meta property="article:author" content={author || 'Rony'} />
      )}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={finalUrl} />
      <meta property="twitter:title" content={finalTitle} />
      <meta property="twitter:description" content={finalDescription} />
      <meta property="twitter:image" content={finalImage} />
      
      {/* Geo Location - Always Alcudia, Mallorca */}
      <meta name="geo.region" content="ES-PM" />
      <meta name="geo.placename" content="Alcudia, Mallorca" />
      <meta name="geo.position" content="39.8542;3.1268" />
      <meta name="ICBM" content="39.8542, 3.1268" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* Performance Hints */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
    </Helmet>
  );
};

export default SEOHead; 
