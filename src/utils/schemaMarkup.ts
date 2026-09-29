// Schema.org structured data utilities for SEO

interface Address {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

interface ContactPoint {
  telephone: string;
  contactType: string;
  availableLanguage: string[];
  email?: string;
}

interface Review {
  author: string;
  reviewBody: string;
  reviewRating: number;
  datePublished: string;
}

interface Service {
  name: string;
  description: string;
  price: string;
  priceCurrency: string;
  category?: string;
}

// Local Business Schema
export const generateLocalBusinessSchema = (
  name: string,
  description: string,
  url: string,
  address: Address,
  geo: GeoCoordinates,
  contactPoint: ContactPoint,
  logo: string,
  image: string[],
  openingHours: string[],
  priceRange: string,
  services: Service[],
  aggregateRating?: { ratingValue: number; reviewCount: number },
  sameAs?: string[]
) => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${url}/#business`,
    "name": name,
    "description": description,
    "url": url,
    "telephone": contactPoint.telephone,
    "email": contactPoint.email,
    "image": image,
    "logo": logo,
    "address": {
      "@type": "PostalAddress",
      ...address
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": geo.latitude,
      "longitude": geo.longitude
    },
    "contactPoint": {
      "@type": "ContactPoint",
      ...contactPoint
    },
    "openingHours": openingHours,
    "priceRange": priceRange,
    "category": "Travel Agency",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services touristiques à Majorque",
      "itemListElement": services.map(service => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service.name,
          "description": service.description,
          "category": service.category || "Tourism"
        },
        "price": service.price,
        "priceCurrency": service.priceCurrency
      }))
    },
    ...(aggregateRating && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": aggregateRating.ratingValue,
        "reviewCount": aggregateRating.reviewCount
      }
    }),
    ...(sameAs && { "sameAs": sameAs })
  };
};

// Organization Schema
export const generateOrganizationSchema = (
  name: string,
  url: string,
  logo: string,
  description: string,
  contactPoint: ContactPoint,
  address: Address,
  sameAs?: string[]
) => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": name,
    "url": url,
    "logo": logo,
    "description": description,
    "contactPoint": {
      "@type": "ContactPoint",
      ...contactPoint
    },
    "address": {
      "@type": "PostalAddress",
      ...address
    },
    ...(sameAs && { "sameAs": sameAs })
  };
};

// Event Schema for Classes
export const generateEventSchema = (
  name: string,
  description: string,
  startDate: string,
  endDate: string,
  location: Address,
  organizer: string,
  price: string,
  priceCurrency: string,
  url: string,
  image?: string
) => {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": name,
    "description": description,
    "startDate": startDate,
    "endDate": endDate,
    "location": {
      "@type": "Place",
      "name": "Playa de Alcudia",
      "address": {
        "@type": "PostalAddress",
        ...location
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": organizer
    },
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": priceCurrency,
      "availability": "https://schema.org/InStock",
      "url": url
    },
    ...(image && { "image": image })
  };
};

// Review Schema
export const generateReviewSchema = (
  itemReviewed: string,
  reviews: Review[],
  aggregateRating: { ratingValue: number; reviewCount: number }
) => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": itemReviewed,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": aggregateRating.ratingValue,
      "reviewCount": aggregateRating.reviewCount,
      "bestRating": 5,
      "worstRating": 1
    },
    "review": reviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "reviewBody": review.reviewBody,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.reviewRating,
        "bestRating": 5,
        "worstRating": 1
      },
      "datePublished": review.datePublished
    }))
  };
};

// Website Schema
export const generateWebsiteSchema = (
  name: string,
  url: string,
  description: string,
  inLanguage: string[]
) => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": name,
    "url": url,
    "description": description,
    "inLanguage": inLanguage,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
};

// Service Schema
export const generateServiceSchema = (
  name: string,
  description: string,
  provider: string,
  areaServed: string,
  serviceType: string,
  offers: Service[]
) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "provider": {
      "@type": "LocalBusiness",
      "name": provider
    },
    "areaServed": {
      "@type": "Place",
      "name": areaServed
    },
    "serviceType": serviceType,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Travel & Tourism Services",
      "itemListElement": offers.map(offer => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": offer.name,
          "description": offer.description
        },
        "price": offer.price,
        "priceCurrency": offer.priceCurrency
      }))
    }
  };
};

// Article Schema for Blog Posts
export const generateArticleSchema = (
  title: string,
  description: string,
  url: string,
  image: string,
  datePublished: string,
  dateModified: string,
  authorName: string = 'Rony',
  publisherName: string = 'Que faire à Majorque',
  publisherLogo: string = 'https://quefaireamajorque.com/img/LOGO_2026.png'
) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "url": url,
    "image": image,
    "datePublished": datePublished,
    "dateModified": dateModified,
    "author": {
      "@type": "Person",
      "name": authorName,
      "url": "https://quefaireamajorque.com/a-propos"
    },
    "publisher": {
      "@type": "Organization",
      "name": publisherName,
      "logo": {
        "@type": "ImageObject",
        "url": publisherLogo
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };
};

// BreadcrumbList Schema
export const generateBreadcrumbSchema = (
  items: Array<{ name: string; url: string }>
) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

// Product Schema for Guides
export const generateProductSchema = (
  name: string,
  description: string,
  image: string,
  price: string,
  priceCurrency: string = 'EUR',
  url: string,
  availability: 'InStock' | 'OutOfStock' = 'InStock',
  ratingValue?: number,
  reviewCount?: number
) => {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "description": description,
    "image": image,
    "url": url,
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": priceCurrency,
      "availability": `https://schema.org/${availability}`,
      "url": url,
      "priceValidUntil": "2026-12-31"
    },
    ...(ratingValue && reviewCount && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": ratingValue,
        "reviewCount": reviewCount
      }
    })
  };
};

// FAQ Schema
export const generateFAQSchema = (
  questions: Array<{ question: string; answer: string }>
) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map(q => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer
      }
    }))
  };
};

// Default schemas for Que faire à Majorque
export const getDefaultBusinessSchema = () => {
  const services: Service[] = [
    {
      name: "Guide numérique Majorque",
      description: "Guide digital complet pour découvrir Majorque comme un local, avec itinéraires, bonnes adresses et conseils pratiques",
      price: "14.99",
      priceCurrency: "EUR",
      category: "Tourism"
    },
    {
      name: "Guide expatriation Espagne & Majorque",
      description: "Guide complet pour s'expatrier à Majorque: démarches administratives, logement, travail et vie quotidienne",
      price: "19.99",
      priceCurrency: "EUR",
      category: "Tourism"
    },
    {
      name: "Réservation d'activités et excursions",
      description: "Billets et entrées pour les meilleures attractions de Majorque via Tiqets et Viator",
      price: "0",
      priceCurrency: "EUR",
      category: "Tourism"
    }
  ];

  return generateLocalBusinessSchema(
    "Que faire à Majorque",
    "Le meilleur de Majorque: guide numérique, location de voiture avec Offugo, visites guidées à Palma en français et billets (Tiqets). Paiements sécurisés via Stripe.",
    "https://quefaireamajorque.com",
    {
      streetAddress: "Palma de Mallorca",
      addressLocality: "Palma",
      addressRegion: "Mallorca",
      postalCode: "07001",
      addressCountry: "ES"
    },
    {
      latitude: 39.5696,
      longitude: 2.6502
    },
    {
      telephone: "+34674494245",
      contactType: "customer service",
      availableLanguage: ["Spanish", "English", "French"],
      email: "quefaireamajorque@gmail.com"
    },
    "https://quefaireamajorque.com/img/LOGO_2026.png",
    ["https://quefaireamajorque.com/img/LOGO_2026.png"],
    ["Mo-Su 09:00-20:00"],
    "€€",
    services,
    undefined,
    [
      "https://www.instagram.com/ronyquefaireamajorque",
      "https://www.facebook.com/quefaireamajorque",
      "https://www.youtube.com/@QuefaireaMajorque"
    ]
  );
}; 