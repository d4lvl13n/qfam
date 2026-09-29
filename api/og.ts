/**
 * Vercel Edge Function — OG Meta Tags for Social Crawlers
 *
 * Social media crawlers (Facebook, Twitter, LinkedIn, WhatsApp, etc.) don't
 * execute JavaScript, so they can't see the meta tags injected by React Helmet.
 * This function intercepts bot requests (via vercel.json rewrites) and returns
 * a minimal HTML page with the correct og:title, og:description, og:image.
 *
 * Supported routes:
 *   /blog/:slug        → fetches post from WP REST API
 *   /category/:slug    → fetches category from WP REST API
 *   /tag/:slug         → fetches tag from WP REST API
 *   /experiences/:slug → returns hardcoded experience category data
 *   /*                 → returns site defaults
 */

export const config = { runtime: 'edge' };

const SITE_URL = 'https://quefaireamajorque.com';
const WP_API = 'https://quefaireamajorque-wordpress.captain.codolie.com/wp-json/wp/v2';
const DEFAULT_IMAGE = `${SITE_URL}/img/logo.webp`;
const DEFAULT_TITLE = 'Que faire à Majorque - Guides, location de voiture, activités et visites';
const DEFAULT_DESCRIPTION = 'Le meilleur de Majorque: guide numérique, location de voiture avec Offugo, visites guidées à Palma en français et billets (Tiqets). Paiements sécurisés via Stripe.';

// Experience category metadata
const EXPERIENCE_META: Record<string, { title: string; description: string; image: string }> = {
  'billets-et-entrees': {
    title: 'Billets et Entrées à Majorque - Réservez vos activités',
    description: 'Réservez vos billets et entrées pour les meilleures attractions de Majorque: cathédrale de Palma, grottes du Drach, aquarium et plus encore.',
    image: 'https://quefaireamajorque-wordpress.captain.codolie.com/wp-content/uploads/2026/01/2-1024x576.webp',
  },
  'excursions-en-bateau': {
    title: 'Excursions en Bateau à Majorque - Croisières et sorties en mer',
    description: 'Découvrez les plus belles croisières et excursions en bateau à Majorque: calanques, couchers de soleil, snorkeling et fêtes en mer.',
    image: 'https://quefaireamajorque-wordpress.captain.codolie.com/wp-content/uploads/2025/09/1-1024x576.webp',
  },
  'activites-famille': {
    title: 'Activités Famille à Majorque - Sorties avec enfants',
    description: 'Les meilleures activités familiales à Majorque: parcs aquatiques, zoos, excursions adaptées aux enfants et aventures en plein air.',
    image: 'https://quefaireamajorque-wordpress.captain.codolie.com/wp-content/uploads/2025/09/3-1024x576.webp',
  },
  'excursions-et-activites': {
    title: 'Excursions et Activités à Majorque - Aventures et découvertes',
    description: 'Explorez Majorque avec nos excursions et activités: randonnées, visites culturelles, aventures sportives et découvertes authentiques.',
    image: 'https://quefaireamajorque-wordpress.captain.codolie.com/wp-content/uploads/2025/09/4-1024x576.webp',
  },
};

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&#(\d+);/g, (_, num) => String.fromCharCode(Number(num)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&rsquo;/g, '\u2019')
    .replace(/&lsquo;/g, '\u2018')
    .replace(/&rdquo;/g, '\u201D')
    .replace(/&ldquo;/g, '\u201C')
    .replace(/&hellip;/g, '\u2026')
    .replace(/&ndash;/g, '\u2013')
    .replace(/&mdash;/g, '\u2014')
    .replace(/&nbsp;/g, ' ');
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

function truncate(str: string, max: number): string {
  if (str.length <= max) return str;
  return str.slice(0, max - 1).trimEnd() + '\u2026';
}

function buildHtml(
  url: string,
  title: string,
  description: string,
  image: string,
  type: 'website' | 'article' = 'website',
  articleMeta?: { publishedTime?: string; modifiedTime?: string; author?: string }
): string {
  // Escape for HTML attributes
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

  const articleTags = type === 'article' && articleMeta ? `
${articleMeta.publishedTime ? `<meta property="article:published_time" content="${esc(articleMeta.publishedTime)}"/>` : ''}
${articleMeta.modifiedTime ? `<meta property="article:modified_time" content="${esc(articleMeta.modifiedTime)}"/>` : ''}
<meta property="article:author" content="${esc(articleMeta.author || 'Rony')}"/>` : '';

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8"/>
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}"/>
<meta property="og:type" content="${type}"/>
<meta property="og:url" content="${esc(url)}"/>
<meta property="og:title" content="${esc(title)}"/>
<meta property="og:description" content="${esc(description)}"/>
<meta property="og:image" content="${esc(image)}"/>
<meta property="og:image:width" content="1200"/>
<meta property="og:image:height" content="630"/>
<meta property="og:site_name" content="Que faire à Majorque"/>
<meta property="og:locale" content="fr_FR"/>${articleTags}
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="${esc(title)}"/>
<meta name="twitter:description" content="${esc(description)}"/>
<meta name="twitter:image" content="${esc(image)}"/>
<link rel="canonical" href="${esc(url)}"/>
</head>
<body>
<p>${esc(title)}</p>
<p>${esc(description)}</p>
</body>
</html>`;
}

async function fetchBlogPost(slug: string): Promise<{ title: string; description: string; image: string; date: string; modified: string } | null> {
  try {
    const res = await fetch(
      `${WP_API}/posts?slug=${encodeURIComponent(slug)}&_embed&_fields=title,excerpt,date,modified,_links&per_page=1`
    );
    if (!res.ok) return null;
    const posts = await res.json();
    if (!posts.length) return null;

    const post = posts[0];
    const title = decodeHtmlEntities(post.title?.rendered || '');
    const rawExcerpt = stripHtml(decodeHtmlEntities(post.excerpt?.rendered || ''));
    const description = truncate(rawExcerpt, 200) || DEFAULT_DESCRIPTION;
    const image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || DEFAULT_IMAGE;

    return { title, description, image, date: post.date || '', modified: post.modified || post.date || '' };
  } catch {
    return null;
  }
}

async function fetchCategory(slug: string): Promise<{ title: string; description: string } | null> {
  try {
    const res = await fetch(
      `${WP_API}/categories?slug=${encodeURIComponent(slug)}&_fields=name,description&per_page=1`
    );
    if (!res.ok) return null;
    const cats = await res.json();
    if (!cats.length) return null;

    const cat = cats[0];
    const title = `${decodeHtmlEntities(cat.name || '')} - Que faire à Majorque`;
    const description = truncate(stripHtml(decodeHtmlEntities(cat.description || '')), 200) || DEFAULT_DESCRIPTION;

    return { title, description };
  } catch {
    return null;
  }
}

async function fetchTag(slug: string): Promise<{ title: string; description: string } | null> {
  try {
    const res = await fetch(
      `${WP_API}/tags?slug=${encodeURIComponent(slug)}&_fields=name,description&per_page=1`
    );
    if (!res.ok) return null;
    const tags = await res.json();
    if (!tags.length) return null;

    const tag = tags[0];
    const title = `${decodeHtmlEntities(tag.name || '')} - Que faire à Majorque`;
    const description = truncate(stripHtml(decodeHtmlEntities(tag.description || '')), 200) || DEFAULT_DESCRIPTION;

    return { title, description };
  } catch {
    return null;
  }
}

export default async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const path = url.searchParams.get('path') || '/';

  const fullUrl = `${SITE_URL}${path}`;

  // Route: /blog/:slug
  const blogMatch = path.match(/^\/blog\/([^/]+)\/?$/);
  if (blogMatch) {
    const data = await fetchBlogPost(blogMatch[1]);
    if (data) {
      return new Response(
        buildHtml(fullUrl, data.title, data.description, data.image, 'article', {
          publishedTime: data.date,
          modifiedTime: data.modified,
          author: 'Rony',
        }),
        { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } }
      );
    }
  }

  // Route: /category/:slug
  const catMatch = path.match(/^\/category\/([^/]+)\/?$/);
  if (catMatch) {
    const data = await fetchCategory(catMatch[1]);
    if (data) {
      return new Response(buildHtml(fullUrl, data.title, data.description, DEFAULT_IMAGE), {
        headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
      });
    }
  }

  // Route: /tag/:slug
  const tagMatch = path.match(/^\/tag\/([^/]+)\/?$/);
  if (tagMatch) {
    const data = await fetchTag(tagMatch[1]);
    if (data) {
      return new Response(buildHtml(fullUrl, data.title, data.description, DEFAULT_IMAGE), {
        headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
      });
    }
  }

  // Route: /experiences/:slug
  const expMatch = path.match(/^\/experiences\/([^/]+)\/?$/);
  if (expMatch) {
    const meta = EXPERIENCE_META[expMatch[1]];
    if (meta) {
      return new Response(buildHtml(fullUrl, meta.title, meta.description, meta.image), {
        headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, s-maxage=86400' },
      });
    }
  }

  // Route: /experiences
  if (path === '/experiences' || path === '/experiences/') {
    return new Response(
      buildHtml(
        fullUrl,
        'Expériences & Activités à Majorque - Billets, excursions et plus',
        'Découvrez toutes les expériences et activités à faire à Majorque: billets, excursions en bateau, activités famille et aventures.',
        DEFAULT_IMAGE
      ),
      { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, s-maxage=86400' } }
    );
  }

  // Fallback: site defaults
  return new Response(buildHtml(fullUrl, DEFAULT_TITLE, DEFAULT_DESCRIPTION, DEFAULT_IMAGE), {
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, s-maxage=3600' },
  });
}
