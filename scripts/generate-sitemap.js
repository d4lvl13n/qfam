/**
 * Script de génération du sitemap.xml
 * 
 * Ce script récupère les articles et catégories depuis WordPress
 * et génère un sitemap complet avec toutes les URLs.
 * 
 * Usage: node scripts/generate-sitemap.js
 * Ou via npm: npm run generate-sitemap
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://quefaireamajorque.com';
const WP_API_BASE = 'https://quefaireamajorque-wordpress.captain.codolie.com/wp-json/wp/v2';

// Pages statiques avec leurs priorités
const staticPages = [
  { path: '/', changefreq: 'weekly', priority: 1.0 },
  { path: '/blog', changefreq: 'daily', priority: 0.9 },
  { path: '/categories', changefreq: 'weekly', priority: 0.8 },
  { path: '/guides', changefreq: 'monthly', priority: 0.9 },
  { path: '/guide', changefreq: 'monthly', priority: 0.85 },
  { path: '/guide-expatriation', changefreq: 'monthly', priority: 0.85 },
  { path: '/a-propos', changefreq: 'monthly', priority: 0.7 },
  { path: '/contact', changefreq: 'monthly', priority: 0.7 },
  { path: '/gallery', changefreq: 'monthly', priority: 0.6 },
  { path: '/experiences', changefreq: 'weekly', priority: 0.9 },
  { path: '/experiences/billets-et-entrees', changefreq: 'weekly', priority: 0.85 },
  { path: '/experiences/excursions-en-bateau', changefreq: 'weekly', priority: 0.85 },
  { path: '/experiences/activites-famille', changefreq: 'weekly', priority: 0.85 },
  { path: '/experiences/excursions-et-activites', changefreq: 'weekly', priority: 0.85 },
];

// Fonction pour récupérer tous les articles WordPress
async function fetchAllPosts() {
  const posts = [];
  let page = 1;
  let hasMore = true;

  console.log('📝 Récupération des articles WordPress...');

  while (hasMore) {
    try {
      const response = await fetch(`${WP_API_BASE}/posts?per_page=100&page=${page}&_fields=slug,modified`);
      
      if (!response.ok) {
        if (response.status === 400) {
          hasMore = false;
          break;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.length === 0) {
        hasMore = false;
      } else {
        posts.push(...data);
        page++;
        console.log(`  ✓ Page ${page - 1}: ${data.length} articles`);
      }
    } catch (error) {
      console.error(`  ✗ Erreur page ${page}:`, error.message);
      hasMore = false;
    }
  }

  console.log(`  Total: ${posts.length} articles\n`);
  return posts;
}

// Fonction pour récupérer toutes les catégories WordPress
async function fetchAllCategories() {
  console.log('📂 Récupération des catégories WordPress...');

  try {
    const response = await fetch(`${WP_API_BASE}/categories?per_page=100&hide_empty=true&_fields=slug,count`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const filtered = data.filter(cat => cat.slug !== 'uncategorized' && cat.slug !== 'non-classe');
    
    console.log(`  Total: ${filtered.length} catégories\n`);
    return filtered;
  } catch (error) {
    console.error('  ✗ Erreur:', error.message);
    return [];
  }
}

// Fonction pour récupérer tous les tags WordPress
async function fetchAllTags() {
  console.log('🏷️  Récupération des tags WordPress...');

  try {
    const response = await fetch(`${WP_API_BASE}/tags?per_page=100&hide_empty=true&_fields=slug,count`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    console.log(`  Total: ${data.length} tags\n`);
    return data;
  } catch (error) {
    console.error('  ✗ Erreur:', error.message);
    return [];
  }
}

// Formater la date pour le sitemap
function formatDate(dateString) {
  if (!dateString) {
    return new Date().toISOString().split('T')[0];
  }
  return new Date(dateString).toISOString().split('T')[0];
}

// Générer l'entrée XML pour une URL
function generateUrlEntry(loc, lastmod, changefreq, priority) {
  return `  <url>
    <loc>${SITE_URL}${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

// Générer le sitemap complet
async function generateSitemap() {
  console.log('🚀 Génération du sitemap...\n');

  const today = formatDate();
  const urls = [];

  // Ajouter les pages statiques
  console.log('📄 Ajout des pages statiques...');
  for (const page of staticPages) {
    urls.push(generateUrlEntry(page.path, today, page.changefreq, page.priority));
  }
  console.log(`  ✓ ${staticPages.length} pages statiques\n`);

  // Récupérer et ajouter les articles
  const posts = await fetchAllPosts();
  for (const post of posts) {
    urls.push(generateUrlEntry(
      `/blog/${post.slug}`,
      formatDate(post.modified),
      'weekly',
      0.7
    ));
  }

  // Récupérer et ajouter les catégories
  const categories = await fetchAllCategories();
  for (const category of categories) {
    urls.push(generateUrlEntry(
      `/category/${category.slug}`,
      today,
      'weekly',
      0.6
    ));
  }

  // Récupérer et ajouter les tags
  const tags = await fetchAllTags();
  for (const tag of tags) {
    urls.push(generateUrlEntry(
      `/tag/${tag.slug}`,
      today,
      'monthly',
      0.5
    ));
  }

  // Générer le XML final
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  // Écrire le fichier
  const outputPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(outputPath, sitemap, 'utf8');

  console.log('✅ Sitemap généré avec succès!');
  console.log(`📍 Emplacement: ${outputPath}`);
  console.log(`📊 Total URLs: ${urls.length}`);
  console.log(`   - Pages statiques: ${staticPages.length}`);
  console.log(`   - Articles: ${posts.length}`);
  console.log(`   - Catégories: ${categories.length}`);
  console.log(`   - Tags: ${tags.length}`);
}

// Exécuter le script
generateSitemap().catch(console.error);

