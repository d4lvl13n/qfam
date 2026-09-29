// Google Analytics 4 Measurement ID
// To use: Add VITE_GA_MEASUREMENT_ID to your .env file
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

// Declare gtag on window
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

// Initialize Google Analytics
export const initGA = (): void => {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    console.warn('Google Analytics not configured. Add VITE_GA_MEASUREMENT_ID to your .env file.');
    return;
  }

  // Check if script already exists
  if (document.querySelector(`script[src*="googletagmanager.com/gtag"]`)) {
    return;
  }

  // Add gtag.js script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false, // We'll send page views manually for SPA
  });
};

// Track page views
export const trackPageView = (path: string, title?: string): void => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title || document.title,
    page_location: window.location.href,
  });
};

// Track custom events
export const trackEvent = (
  eventName: string,
  params?: Record<string, string | number | boolean>
): void => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', eventName, params);
};

// Track outbound links
export const trackOutboundLink = (url: string, label?: string): void => {
  trackEvent('click', {
    event_category: 'outbound',
    event_label: label || url,
    transport_type: 'beacon',
  });
};

// Track conversions (e.g., guide purchase)
export const trackConversion = (
  conversionType: 'guide_purchase' | 'contact_form' | 'whatsapp_click',
  value?: number,
  currency?: string
): void => {
  trackEvent('conversion', {
    event_category: 'conversion',
    event_label: conversionType,
    value: value || 0,
    currency: currency || 'EUR',
  });
};
