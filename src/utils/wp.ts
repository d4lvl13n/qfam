export interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  modified?: string;
  categories?: number[];
  tags?: number[];
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
    "wp:term"?: Array<Array<{
      id: number;
      name: string;
      slug: string;
      taxonomy: string;
    }>>;
    [key: string]: unknown;
  };
}

export interface WPPostsResponse {
  posts: WPPost[];
  totalPages: number;
  totalPosts: number;
  currentPage: number;
}

const API_BASE = import.meta.env.VITE_WP_API_BASE || 'https://quefaireamajorque-wordpress.captain.codolie.com/wp-json/wp/v2';

export async function fetchPosts(page: number = 1, perPage: number = 6, search?: string): Promise<WPPostsResponse> {
  let url = `${API_BASE}/posts?_embed&page=${page}&per_page=${perPage}`;
  if (search && search.trim()) {
    url += `&search=${encodeURIComponent(search.trim())}`;
  }
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  const posts = (await res.json()) as WPPost[];
  const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1');
  const totalPosts = parseInt(res.headers.get('X-WP-Total') || '0');

  return {
    posts,
    totalPages,
    totalPosts,
    currentPage: page
  };
}

export async function fetchPostBySlug(slug: string): Promise<WPPost | null> {
  const res = await fetch(`${API_BASE}/posts?slug=${slug}&_embed`);
  if (!res.ok) {
    throw new Error('Failed to fetch post');
  }
  const posts = (await res.json()) as WPPost[];
  return posts.length ? posts[0] : null;
} 

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  parent?: number;
  count?: number;
}

export async function fetchCategoryBySlug(slug: string): Promise<WPCategory | null> {
  const res = await fetch(`${API_BASE}/categories?slug=${slug}`);
  if (!res.ok) return null;
  const cats = (await res.json()) as WPCategory[];
  return cats[0] || null;
}

export async function fetchCategories(perPage: number = 100): Promise<WPCategory[]> {
  const res = await fetch(`${API_BASE}/categories?per_page=${perPage}`);
  if (!res.ok) return [];
  return (await res.json()) as WPCategory[];
}

export async function fetchPostsByCategory(categoryId: number, page: number = 1, perPage: number = 6): Promise<WPPostsResponse> {
  const res = await fetch(`${API_BASE}/posts?_embed&categories=${categoryId}&page=${page}&per_page=${perPage}`);
  if (!res.ok) {
    throw new Error('Failed to fetch posts by category');
  }

  const posts = (await res.json()) as WPPost[];
  const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1');
  const totalPosts = parseInt(res.headers.get('X-WP-Total') || '0');

  return {
    posts,
    totalPages,
    totalPosts,
    currentPage: page
  };
}

export interface WPTag {
  id: number;
  name: string;
  slug: string;
  description?: string;
  count?: number;
}

export async function fetchTagBySlug(slug: string): Promise<WPTag | null> {
  const res = await fetch(`${API_BASE}/tags?slug=${slug}`);
  if (!res.ok) return null;
  const tags = (await res.json()) as WPTag[];
  return tags[0] || null;
}

export async function fetchPostsByTag(tagId: number, page: number = 1, perPage: number = 6): Promise<WPPostsResponse> {
  const res = await fetch(`${API_BASE}/posts?_embed&tags=${tagId}&page=${page}&per_page=${perPage}`);
  if (!res.ok) {
    throw new Error('Failed to fetch posts by tag');
  }

  const posts = (await res.json()) as WPPost[];
  const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1');
  const totalPosts = parseInt(res.headers.get('X-WP-Total') || '0');

  return {
    posts,
    totalPages,
    totalPosts,
    currentPage: page
  };
}

// --- Activity Pages (Experiences) ---

export interface ActivityWidget {
  type: 'tiqets' | 'viator';
  // Tiqets
  productId?: string;
  partner?: string;
  layout?: string;
  orientation?: string;
  language?: string;
  currency?: string;
  // Viator
  partnerId?: string;
  widgetRef?: string;
}

export interface Activity {
  title: string;
  description: string;
  widget: ActivityWidget | null;
  category: string;
  categorySlug: string;
}

export interface ActivityCategory {
  id: number;
  slug: string;
  title: string;
  activities: Activity[];
  image?: string;
}

const ACTIVITY_PAGES = [
  { id: 12738, slug: 'billets-et-entrees', tabLabel: 'Billets & Entrées', tabSlug: 'billets' },
  { id: 12744, slug: 'excursions-en-bateau', tabLabel: 'Bateaux', tabSlug: 'bateaux' },
  { id: 12753, slug: 'activites-famille', tabLabel: 'Famille', tabSlug: 'famille' },
  { id: 12756, slug: 'excursions-et-activites', tabLabel: 'Excursions', tabSlug: 'excursions' },
];

export { ACTIVITY_PAGES };

function decodeHTMLEntities(text: string): string {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

export function parseActivitiesFromHTML(html: string, categoryTitle: string, categorySlug: string): { activities: Activity[]; image?: string } {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // Extract first category image from <figure> blocks
  const firstImg = doc.querySelector('figure img');
  const image = firstImg?.getAttribute('src') || undefined;

  // Find all h2 elements
  const h2s = Array.from(doc.querySelectorAll('h2'));
  const activities: Activity[] = [];

  for (let i = 0; i < h2s.length; i++) {
    const h2 = h2s[i];
    const title = decodeHTMLEntities(h2.textContent?.trim() || '');

    // Skip the first h2 if it matches the page/category title
    if (i === 0 && title.toLowerCase() === decodeHTMLEntities(categoryTitle).toLowerCase()) continue;

    // Find description: next <p> sibling after h2
    let description = '';
    let sibling = h2.nextElementSibling;
    while (sibling) {
      if (sibling.tagName === 'P' && sibling.textContent?.trim()) {
        description = decodeHTMLEntities(sibling.textContent.trim());
        break;
      }
      if (sibling.tagName === 'H2') break;
      sibling = sibling.nextElementSibling;
    }

    // Find widget between this h2 and the next h2
    let widget: ActivityWidget | null = null;
    const nextH2 = h2s[i + 1];

    // Collect all elements between this h2 and next h2
    let el = h2.nextElementSibling;
    while (el && el !== nextH2) {
      // Check for Tiqets widget
      const tiqetsEl = el.matches('[data-tiqets-widget]') ? el : el.querySelector('[data-tiqets-widget]');
      if (tiqetsEl) {
        widget = {
          type: 'tiqets',
          productId: tiqetsEl.getAttribute('data-product-id') || undefined,
          partner: tiqetsEl.getAttribute('data-partner') || undefined,
          layout: tiqetsEl.getAttribute('data-layout') || undefined,
          orientation: tiqetsEl.getAttribute('data-orientation') || undefined,
          language: tiqetsEl.getAttribute('data-language') || undefined,
          currency: tiqetsEl.getAttribute('data-currency') || undefined,
        };
        break;
      }

      // Check for Viator widget
      const viatorEl = el.matches('[data-vi-partner-id]') ? el : el.querySelector('[data-vi-partner-id]');
      if (viatorEl) {
        widget = {
          type: 'viator',
          partnerId: viatorEl.getAttribute('data-vi-partner-id') || undefined,
          widgetRef: viatorEl.getAttribute('data-vi-widget-ref') || undefined,
        };
        break;
      }

      el = el.nextElementSibling;
    }

    activities.push({
      title,
      description,
      widget,
      category: categoryTitle,
      categorySlug,
    });
  }

  return { activities, image };
}

export async function fetchActivityPages(): Promise<ActivityCategory[]> {
  const ids = ACTIVITY_PAGES.map(p => p.id).join(',');
  const res = await fetch(`${API_BASE}/pages?include=${ids}&_fields=id,slug,title,content`);
  if (!res.ok) throw new Error('Failed to fetch activity pages');

  const pages = (await res.json()) as Array<{ id: number; slug: string; title: { rendered: string }; content: { rendered: string } }>;

  return ACTIVITY_PAGES.map(config => {
    const page = pages.find(p => p.id === config.id);
    if (!page) return { id: config.id, slug: config.slug, title: config.tabLabel, activities: [] };

    const { activities, image } = parseActivitiesFromHTML(
      page.content.rendered,
      page.title.rendered,
      config.tabSlug
    );

    return {
      id: config.id,
      slug: config.slug,
      title: config.tabLabel,
      activities,
      image,
    };
  });
}

// Fetch a single activity page by slug (raw HTML for ContentWithScripts rendering)
export interface ActivityPageRaw {
  id: number;
  slug: string;
  title: string;
  html: string;
}

export async function fetchActivityPageBySlug(slug: string): Promise<ActivityPageRaw | null> {
  const config = ACTIVITY_PAGES.find(p => p.slug === slug);
  if (!config) return null;

  const res = await fetch(`${API_BASE}/pages/${config.id}?_fields=id,slug,title,content`);
  if (!res.ok) return null;

  const page = (await res.json()) as { id: number; slug: string; title: { rendered: string }; content: { rendered: string } };
  return {
    id: page.id,
    slug: page.slug,
    title: decodeHTMLEntities(page.title.rendered),
    html: page.content.rendered,
  };
}

// --- Related Posts ---

/**
 * Check if a post belongs to a specific category by slug
 */
export function isPostInCategory(post: WPPost, categorySlug: string): boolean {
  if (!post._embedded?.['wp:term']) return false;
  
  // wp:term is an array of arrays: [categories[], tags[], ...]
  // Categories are usually the first array
  const categories = post._embedded['wp:term'][0] || [];
  return categories.some((cat: { slug: string }) => cat.slug === categorySlug);
}

/**
 * Get category slugs for a post
 */
export function getPostCategorySlugs(post: WPPost): string[] {
  if (!post._embedded?.['wp:term']) return [];
  const categories = post._embedded['wp:term'][0] || [];
  return categories.map((cat: { slug: string }) => cat.slug);
}

/**
 * Fetch related posts based on intelligent scoring algorithm
 * Scoring: Categories (+3), Tags (+2), Recent date (+1)
 */
export async function fetchRelatedPosts(currentPost: WPPost, limit: number = 4): Promise<WPPost[]> {
  try {
    // Fetch all posts (we'll filter and score them)
    const res = await fetch(`${API_BASE}/posts?_embed&per_page=50`);
    if (!res.ok) {
      throw new Error('Failed to fetch posts for related posts');
    }

    const allPosts = (await res.json()) as WPPost[];
    
    // Filter out current post
    const otherPosts = allPosts.filter(post => post.id !== currentPost.id);
    
    if (otherPosts.length === 0) {
      return [];
    }

    // Score each post
    const scoredPosts = otherPosts.map(post => {
      let score = 0;
      
      // Score by categories (priority 1: +3 points per match)
      if (currentPost.categories && post.categories) {
        const commonCategories = currentPost.categories.filter(catId => 
          post.categories?.includes(catId)
        );
        score += commonCategories.length * 3;
      }
      
      // Score by tags (priority 2: +2 points per match)
      if (currentPost.tags && post.tags) {
        const commonTags = currentPost.tags.filter(tagId => 
          post.tags?.includes(tagId)
        );
        score += commonTags.length * 2;
      }
      
      // Score by recency (priority 3: +1 point if < 30 days)
      const postDate = new Date(post.date);
      const daysSincePost = (Date.now() - postDate.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSincePost < 30) {
        score += 1;
      }
      
      return { post, score };
    });
    
    // Sort by score (descending) and take top N
    const relatedPosts = scoredPosts
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(({ post }) => post); // Remove score before returning
    
    return relatedPosts;
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}
