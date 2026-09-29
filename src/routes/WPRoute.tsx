import React, { useRef, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { palette, fonts } from '../theme/mallorcaPalette';
import themeConfig, { getColorWithOpacity } from '../theme/themeConfig';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import NotFound from '../components/NotFound';

declare global {
  interface Window {
    TiqetsWidget?: { init: () => void };
  }
}

type WPNode =
  | ({ __typename: 'Post' } & { id: string; title: string; content: string; date?: string; uri: string; featuredImage?: { node?: { sourceUrl?: string } } })
  | ({ __typename: 'Page' } & { id: string; title: string; content: string; uri: string; featuredImage?: { node?: { sourceUrl?: string } } })
  | ({ __typename: 'Category' } & { id?: string; name: string; description?: string | null; uri: string })
  | ({ __typename: 'Tag' } & { id?: string; name: string; description?: string | null; uri: string })
  | null;

// Ensure HTTPS if page is loaded over HTTPS (fixes mixed content errors)
function ensureHttps(url: string | undefined): string | undefined {
  if (!url) return undefined;
  if (typeof window !== 'undefined' && window.location.protocol === 'https:' && url.startsWith('http://')) {
    return url.replace('http://', 'https://');
  }
  return url;
}

// Normalize GraphQL endpoint URL (ensure it ends with /graphql)
function normalizeGraphQLEndpoint(url: string | undefined): string | undefined {
  if (!url) return undefined;
  const trimmed = url.trim();
  const isAbsolute = /^https?:\/\//.test(trimmed);
  if (!isAbsolute) return trimmed.replace(/\/$/, '');
  let normalized = trimmed.replace(/\/$/, '');
  if (!normalized.endsWith('/graphql')) {
    normalized = `${normalized}/graphql`;
  }
  return normalized;
}

const GRAPHQL_ENDPOINT = normalizeGraphQLEndpoint(
  ensureHttps(import.meta.env.VITE_WP_GRAPHQL_URL as string | undefined)
);
const FALLBACK_ENDPOINT = '/wp-graphql';

// Redirect old WP activity page slugs to new /experiences detail pages
const ACTIVITY_REDIRECTS: Record<string, string> = {
  '/billets-et-entrees': '/experiences/billets-et-entrees',
  '/excursions-en-bateau': '/experiences/excursions-en-bateau',
  '/activites-famille': '/experiences/activites-famille',
  '/excursions-et-activites': '/experiences/excursions-et-activites',
  '/experiences-incontournables': '/experiences/excursions-en-bateau',
};

// ─── Styled Components for WP Pages ──────────────────────────────────

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${palette.cream};
  overflow-x: hidden;
`;

const HeroBanner = styled.div<{ $bg?: string }>`
  position: relative;
  height: ${p => p.$bg ? '320px' : '200px'};
  background: ${p => p.$bg ? `url(${p.$bg}) center/cover no-repeat` : `linear-gradient(135deg, ${palette.sea}, ${palette.seaDark || palette.sea})`};
  margin-top: 70px;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.1) 100%);
  }

  @media (max-width: 768px) {
    height: ${p => p.$bg ? '240px' : '160px'};
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

const HeroTitle = styled(motion.h1)`
  font-family: ${fonts.heading};
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin: 0;
  line-height: 1.15;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 12px rgba(0,0,0,0.3);

  @media (max-width: 768px) { font-size: 1.8rem; }
`;

const ContentWrapper = styled.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 2.5rem 2rem 6rem;

  @media (max-width: 768px) { padding: 1.5rem 1rem 4rem; }
`;

const WPContent = styled.div`
  font-size: 1.05rem;
  color: ${themeConfig.text.primary};
  line-height: 1.75;
  font-family: ${fonts.body};

  .wp-block-columns {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin: 0 0 2rem;

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }

  .wp-block-column { min-width: 0; }

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

  h2 + p {
    font-size: 1.05rem;
    color: ${palette.inkLight};
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }

  p { margin-bottom: 1.25rem; }
  p:empty { display: none; }

  /* Booking widgets */
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

  /* WP gallery */
  .wp-block-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0.75rem;
    margin: 1.5rem 0;
  }

  /* Hide links to old WP domain */
  a[href*="quefaireamajorque-wordpress.captain.codolie.com"] {
    pointer-events: none;
    color: inherit;
    text-decoration: none;
  }
`;

// ─── ContentWithScripts (handles Tiqets, TuriTop, etc.) ─────────────

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

// ─── Loading ─────────────────────────────────────────────────────────

const LoadingWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  gap: 1.25rem;
`;

const LoadingLabel = styled.p`
  font-family: ${fonts.body};
  font-size: 1rem;
  color: ${palette.inkLight};
  margin: 0;
`;

// ─── Main Component ──────────────────────────────────────────────────

const WPPage: React.FC<{ pathname: string }> = ({ pathname }) => {
  const uri = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const [node, setNode] = React.useState<WPNode>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [endpoint, setEndpoint] = React.useState<string | undefined>(GRAPHQL_ENDPOINT || FALLBACK_ENDPOINT);

  React.useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    if (!endpoint) {
      setError('WP GraphQL endpoint not configured. Please set VITE_WP_GRAPHQL_URL environment variable.');
      setLoading(false);
      return;
    }

    const originalUrl = import.meta.env.VITE_WP_GRAPHQL_URL as string | undefined;
    if (originalUrl && originalUrl.startsWith('http://') && (GRAPHQL_ENDPOINT || '').startsWith('https://')) {
      console.warn('⚠️ WP GraphQL URL was converted from HTTP to HTTPS to avoid mixed content errors. Please update VITE_WP_GRAPHQL_URL to use HTTPS.');
    }

    const controller = new AbortController();

    fetch(endpoint, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query NodeByUri($uri: String!) {
            nodeByUri(uri: $uri) {
              __typename
              ... on Post { id title content date uri }
              ... on Page { id title content uri featuredImage { node { sourceUrl } } }
              ... on Category { name description uri }
              ... on Tag { name description uri }
            }
          }
        `,
        variables: { uri },
      }),
      signal: controller.signal,
    })
      .then(async (r) => {
        if (!r.ok) {
          throw new Error(`HTTP error! status: ${r.status}`);
        }
        const json = await r.json();
        if (!isMounted) return;
        if (json.errors) {
          console.error('GraphQL errors:', json.errors);
          throw new Error(json.errors[0]?.message || 'GraphQL error');
        }
        setNode((json.data?.nodeByUri as WPNode) ?? null);
      })
      .catch((e) => {
        if (!isMounted) return;
        console.error('WP GraphQL fetch error:', e);

        const errorMessage = e instanceof Error ? e.message : '';

        if (errorMessage.includes('CORS') || errorMessage.includes('Access-Control-Allow-Origin') || errorMessage.includes('Failed to fetch')) {
          if (endpoint !== FALLBACK_ENDPOINT) {
            console.warn('Retrying WP GraphQL via same-origin proxy:', FALLBACK_ENDPOINT);
            setEndpoint(FALLBACK_ENDPOINT);
            return;
          }
          const origin = typeof window !== 'undefined' ? window.location.origin : 'your domain';
          setError(`CORS Error: Le serveur WordPress doit autoriser les requêtes depuis ${origin}. Vérifiez la configuration CORS sur WordPress.`);
        } else if (errorMessage.includes('Mixed Content') || errorMessage.includes('insecure')) {
          setError('Mixed Content Error: WordPress URL must use HTTPS. Please update VITE_WP_GRAPHQL_URL to use https:// instead of http://');
        } else {
          setError(errorMessage || 'Network error');
        }
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [uri, endpoint]);

  if (loading) {
    return (
      <PageContainer>
        <Header />
        <div style={{ marginTop: 70 }}>
          <LoadingWrap>
            <LoadingLabel>Chargement…</LoadingLabel>
          </LoadingWrap>
        </div>
        <Footer />
      </PageContainer>
    );
  }

  if (error || !node) return <NotFound />;

  const canonicalUrl = typeof window !== 'undefined' ? `${window.location.origin}${uri}` : undefined;

  switch (node.__typename) {
    case 'Post':
      {
        const uriNoTrail = node.uri.endsWith('/') ? node.uri.slice(0, -1) : node.uri;
        const parts = uriNoTrail.split('/').filter(Boolean);
        const slug = parts[parts.length - 1];
        return <Navigate to={`/blog/${slug}`} replace />;
      }
    case 'Page':
      if (node.uri === '/blog/') {
        return <Navigate to="/blog" replace />;
      }
      {
        const pageTitle = stripTags(node.title);
        const featuredImg = node.featuredImage?.node?.sourceUrl;
        return (
          <>
            <SEOHead
              title={`${pageTitle} — Que faire à Majorque`}
              canonical={canonicalUrl}
              url={canonicalUrl}
            />
            <PageContainer>
              <Header />

              <HeroBanner $bg={featuredImg}>
                <HeroContent>
                  <HeroTitle
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {pageTitle}
                  </HeroTitle>
                </HeroContent>
              </HeroBanner>

              <ContentWrapper>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <ContentWithScripts html={node.content} />
                </motion.div>
              </ContentWrapper>

              <Footer />
            </PageContainer>
          </>
        );
      }
    case 'Category':
      {
        const uriNoTrail = node.uri.endsWith('/') ? node.uri.slice(0, -1) : node.uri;
        const parts = uriNoTrail.split('/').filter(Boolean);
        const slug = parts[parts.length - 1];
        return <Navigate to={`/category/${slug}`} replace />;
      }
    case 'Tag':
      {
        const uriNoTrail = node.uri.endsWith('/') ? node.uri.slice(0, -1) : node.uri;
        const parts = uriNoTrail.split('/').filter(Boolean);
        const slug = parts[parts.length - 1];
        return <Navigate to={`/tag/${slug}`} replace />;
      }
    default:
      return <NotFound />;
  }
};

const WPRoute: React.FC = () => {
  const { pathname } = useLocation();

  // Check for activity page redirects
  const cleanPath = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  const redirect = ACTIVITY_REDIRECTS[cleanPath];
  if (redirect) {
    return <Navigate to={redirect} replace />;
  }

  return <WPPage pathname={pathname} />;
};

function stripTags(html: string): string {
  if (!html) return '';
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

export default WPRoute;
