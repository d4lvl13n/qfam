import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { palette, fonts } from '../theme/mallorcaPalette';
import themeConfig, { getColorWithOpacity } from '../theme/themeConfig';
import { fetchActivityPageBySlug, ACTIVITY_PAGES } from '../utils/wp';
import { generateBreadcrumbSchema } from '../utils/schemaMarkup';
import Header from './Header';
import Footer from './Footer';
import SEOHead from './SEOHead';

declare global {
  interface Window {
    TiqetsWidget?: { init: () => void };
  }
}

// ─── Category cover images ───────────────────────────────────────────

const CATEGORY_IMAGES: Record<string, string> = {
  'billets-et-entrees': 'https://quefaireamajorque-wordpress.captain.codolie.com/wp-content/uploads/2026/01/2-1024x576.webp',
  'excursions-en-bateau': 'https://quefaireamajorque-wordpress.captain.codolie.com/wp-content/uploads/2025/09/1-1024x576.webp',
  'activites-famille': 'https://quefaireamajorque-wordpress.captain.codolie.com/wp-content/uploads/2025/09/3-1024x576.webp',
  'excursions-et-activites': 'https://quefaireamajorque-wordpress.captain.codolie.com/wp-content/uploads/2025/09/4-1024x576.webp',
};

// ─── Layout ──────────────────────────────────────────────────────────

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${palette.cream};
  overflow-x: hidden;
`;

// Full-width hero with category image
const HeroBanner = styled.div<{ $bg: string }>`
  position: relative;
  height: 360px;
  background: url(${p => p.$bg}) center/cover no-repeat;
  margin-top: 70px;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.1) 100%);
  }

  @media (max-width: 768px) {
    height: 260px;
    margin-top: 60px;
  }
`;

const HeroContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 2rem 2.5rem;

  @media (max-width: 768px) { padding: 0 1.25rem 1.5rem; }
`;

const HeroBack = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: ${fonts.body};
  font-size: 0.85rem;
  font-weight: 500;
  color: rgba(255,255,255,0.85);
  text-decoration: none;
  margin-bottom: 0.75rem;
  transition: gap 0.2s, color 0.2s;

  &:hover { gap: 0.6rem; color: white; }
  svg { width: 16px; height: 16px; }
`;

const HeroTitle = styled(motion.h1)`
  font-family: ${fonts.heading};
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin: 0;
  line-height: 1.15;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 12px rgba(0,0,0,0.3);

  @media (max-width: 768px) { font-size: 2rem; }
`;

const HeroSubtitle = styled(motion.p)`
  font-family: ${fonts.body};
  font-size: 1.05rem;
  color: rgba(255,255,255,0.9);
  margin: 0.5rem 0 0;
  line-height: 1.5;

  @media (max-width: 768px) { font-size: 0.9rem; }
`;

// ─── Main content area ───────────────────────────────────────────────

const ContentWrapper = styled.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 2.5rem 2rem 6rem;

  @media (max-width: 768px) { padding: 1.5rem 1rem 4rem; }
`;

// ─── WP Content — polished rendering of WordPress blocks ─────────────

const WPContent = styled.div`
  font-size: 1.05rem;
  color: ${themeConfig.text.primary};
  line-height: 1.75;
  font-family: ${fonts.body};

  /* ── Image gallery (wp-block-columns with figures) ── */
  .wp-block-columns {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin: 0 0 2rem;

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }

  .wp-block-column {
    min-width: 0;
  }

  .wp-block-image,
  figure {
    margin: 0;
    border-radius: 12px;
    overflow: hidden;
  }

  .wp-block-image img,
  figure img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 12px;
    transition: transform 0.3s ease;
  }

  .wp-block-image:hover img,
  figure:hover img {
    transform: scale(1.02);
  }

  figcaption {
    font-size: 0.8rem;
    color: ${themeConfig.text.secondary};
    text-align: center;
    margin-top: 0.5rem;
  }

  /* ── Category title h2 (first one, centered, styled) — show as subtitle ── */
  > h2.wp-block-heading.is-style-text-annotation,
  > h2.wp-block-heading.has-text-align-center,
  > h2.wp-block-heading[class*="is-style-text-annotation"] {
    display: none; /* Already shown in hero */
  }

  /* Category subtitle (the centered p right after the main h2) */
  > h2.wp-block-heading + p.has-text-align-center {
    display: none; /* Already shown in hero subtitle */
  }

  /* ── Activity section h2 ── */
  h2 {
    font-family: ${fonts.heading};
    font-size: 1.75rem;
    font-weight: 700;
    color: ${palette.ink};
    margin: 3rem 0 0.75rem;
    padding-top: 2.5rem;
    border-top: 1px solid rgba(0,0,0,0.08);
    line-height: 1.3;

    &:first-of-type {
      border-top: none;
      padding-top: 0;
      margin-top: 0;
    }

    @media (max-width: 768px) {
      font-size: 1.4rem;
      padding-top: 2rem;
      margin: 2rem 0 0.5rem;
    }
  }

  h3 {
    font-family: ${fonts.heading};
    font-size: 1.3rem;
    font-weight: 700;
    color: ${palette.ink};
    margin: 1.5rem 0 0.5rem;
  }

  /* ── Activity description ── */
  h2 + p {
    font-size: 1.05rem;
    color: ${palette.inkLight};
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }

  p {
    margin-bottom: 1.25rem;
  }

  /* Empty paragraphs */
  p:empty {
    display: none;
  }

  /* ── Booking widgets ── */
  [data-tiqets-widget] {
    min-height: 380px;
    margin: 1rem 0 2rem;
    background: white;
    border-radius: 12px;
    border: 1px solid rgba(0,0,0,0.06);
    padding: 1rem;
    box-shadow: 0 2px 8px -2px rgba(0,0,0,0.06);
  }

  [data-vi-partner-id] {
    min-height: 200px;
    margin: 1rem 0 2rem;
    background: white;
    border-radius: 12px;
    border: 1px solid rgba(0,0,0,0.06);
    padding: 1rem;
    box-shadow: 0 2px 8px -2px rgba(0,0,0,0.06);
  }

  /* TuriTop booking widgets */
  .turitop-widget,
  [data-service],
  .turitop_button {
    margin: 1rem 0 2rem;
  }

  /* ── General styling ── */
  a {
    color: ${themeConfig.secondary.main};
    text-decoration: underline;
    text-underline-offset: 2px;
    &:hover { color: ${themeConfig.secondary.dark}; }
  }

  strong {
    font-weight: 600;
    color: ${palette.ink};
  }

  blockquote {
    background: ${getColorWithOpacity(themeConfig.secondary, '05')};
    border-left: 4px solid ${themeConfig.secondary.main};
    padding: 1.5rem;
    margin: 1.5rem 0;
    border-radius: 0 12px 12px 0;
    font-style: italic;
    color: ${themeConfig.text.secondary};
  }

  ul, ol { margin: 1.25rem 0; padding-left: 1.75rem; }
  li { margin-bottom: 0.5rem; }

  .wp-block-separator {
    border: none;
    border-top: 1px solid rgba(0,0,0,0.08);
    margin: 2.5rem 0;
  }

  iframe {
    max-width: 100%;
    border-radius: 8px;
  }

  /* Hide any links pointing to old WP slugs (internal cross-links to other categories) */
  a[href*="quefaireamajorque-wordpress.captain.codolie.com"] {
    pointer-events: none;
    color: inherit;
    text-decoration: none;
  }
`;

// ─── Loading ─────────────────────────────────────────────────────────

const LoadingWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  gap: 1.25rem;
`;

const Spinner = styled(motion.div)`
  color: ${palette.sea};
`;

const LoadingLabel = styled.p`
  font-family: ${fonts.body};
  font-size: 1rem;
  color: ${palette.inkLight};
  margin: 0;
`;

// ─── ContentWithScripts ──────────────────────────────────────────────

const ContentWithScripts: React.FC<{ html: string }> = ({ html }) => {
  const ref = useRef<HTMLDivElement>(null);
  const loadedScripts = useRef<Set<string>>(new Set());
  const activeScripts = useRef<HTMLScriptElement[]>([]);

  useEffect(() => {
    if (!ref.current) return;

    const timer = setTimeout(() => {
      if (!ref.current) return;

      const scripts = Array.from(ref.current.querySelectorAll('script'));
      const toExecute: HTMLScriptElement[] = [];

      scripts.forEach(script => {
        const src = script.getAttribute('src');
        const inline = script.textContent || script.innerHTML;

        if (src && loadedScripts.current.has(src)) {
          script.remove();
          return;
        }

        const el = document.createElement('script');

        if (src) {
          el.src = src;
          el.defer = script.hasAttribute('defer');
          el.async = script.hasAttribute('async');
          loadedScripts.current.add(src);

          el.onload = () => {
            if (src.includes('tiqets.com')) {
              setTimeout(() => {
                if (window.TiqetsWidget?.init) window.TiqetsWidget.init();
              }, 300);
            }
          };
        } else if (inline) {
          const inlineEl = document.createElement('script');
          inlineEl.textContent = inline;
          document.body.appendChild(inlineEl);
          inlineEl.remove();
          script.remove();
          return;
        }

        Array.from(script.attributes).forEach(attr => {
          if (!['src', 'defer', 'async'].includes(attr.name)) {
            el.setAttribute(attr.name, attr.value);
          }
        });

        toExecute.push(el);
        activeScripts.current.push(el);
        script.remove();
      });

      toExecute.forEach(s => document.body.appendChild(s));

      // Re-init Tiqets if already loaded globally
      setTimeout(() => {
        if (window.TiqetsWidget?.init) window.TiqetsWidget.init();
      }, 600);

      // Re-init TuriTop: remove and re-add the global script to force DOM re-scan
      if (ref.current?.querySelector('.load-turitop')) {
        const existingTuritop = document.getElementById('js-turitop');
        if (existingTuritop) existingTuritop.remove();
        const turitopScript = document.createElement('script');
        turitopScript.id = 'js-turitop';
        turitopScript.src = 'https://app.turitop.com/js/load-turitop.min.js';
        turitopScript.setAttribute('data-company', 'T1629');
        turitopScript.setAttribute('data-buttoncolor', 'green');
        turitopScript.setAttribute('data-afftag', 'ttafid');
        document.body.appendChild(turitopScript);
        activeScripts.current.push(turitopScript);
      }
    }, 150);

    return () => {
      clearTimeout(timer);
      activeScripts.current.forEach(s => {
        if (s.parentNode) s.parentNode.removeChild(s);
      });
      activeScripts.current = [];
    };
  }, [html]);

  return <WPContent ref={ref} dangerouslySetInnerHTML={{ __html: html }} />;
};

// ─── Helper: extract subtitle from HTML ──────────────────────────────

function extractSubtitle(html: string): string {
  const match = html.match(/<p[^>]*class="[^"]*has-text-align-center[^"]*"[^>]*>(.*?)<\/p>/);
  if (match) {
    return match[1].replace(/<[^>]+>/g, '').trim();
  }
  return '';
}

// ─── Page ────────────────────────────────────────────────────────────

const ExperienceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [title, setTitle] = useState('');
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setNotFound(false);
    fetchActivityPageBySlug(slug)
      .then(page => {
        if (!page) { setNotFound(true); return; }
        setTitle(page.title);
        setHtml(page.html);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));

    // Scroll to top on page change
    window.scrollTo(0, 0);
  }, [slug]);

  const config = ACTIVITY_PAGES.find(p => p.slug === slug);
  const heroImage = slug ? CATEGORY_IMAGES[slug] : '';
  const subtitle = html ? extractSubtitle(html) : '';

  const structuredData = [
    generateBreadcrumbSchema([
      { name: 'Accueil', url: 'https://quefaireamajorque.com/' },
      { name: 'Expériences', url: 'https://quefaireamajorque.com/experiences' },
      { name: title || config?.tabLabel || '', url: `https://quefaireamajorque.com/experiences/${slug}` },
    ]),
  ];

  return (
    <>
      <SEOHead
        title={`${title || config?.tabLabel || 'Activité'} — Que faire à Majorque`}
        description={`Découvrez et réservez : ${title || config?.tabLabel || ''} à Majorque. ${subtitle || 'Billets en ligne au meilleur prix.'}`}
        keywords={`${title} Majorque, activités Majorque, réservation Majorque`}
        url={`https://quefaireamajorque.com/experiences/${slug}`}
        canonical={`https://quefaireamajorque.com/experiences/${slug}`}
        type="website"
      />
      {title && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      )}

      <PageContainer>
        <Header />

        {/* Hero banner with category image */}
        {!loading && !notFound && heroImage && (
          <HeroBanner $bg={heroImage}>
            <HeroContent>
              <HeroBack to="/">
                <ArrowLeft /> Accueil
              </HeroBack>
              <HeroTitle
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {title}
              </HeroTitle>
              {subtitle && (
                <HeroSubtitle
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                >
                  {subtitle}
                </HeroSubtitle>
              )}
            </HeroContent>
          </HeroBanner>
        )}

        <ContentWrapper>
          {loading && (
            <LoadingWrap>
              <Spinner animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                <Loader2 size={36} />
              </Spinner>
              <LoadingLabel>Chargement…</LoadingLabel>
            </LoadingWrap>
          )}

          {notFound && (
            <LoadingWrap>
              <LoadingLabel>Page introuvable.</LoadingLabel>
              <Link to="/" style={{ color: palette.sea, fontFamily: fonts.body, fontSize: '0.9rem' }}>
                <ArrowLeft size={16} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                Retour à l'accueil
              </Link>
            </LoadingWrap>
          )}

          {!loading && !notFound && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <ContentWithScripts html={html} />
            </motion.div>
          )}
        </ContentWrapper>

        <Footer />
      </PageContainer>
    </>
  );
};

export default ExperienceDetailPage;
