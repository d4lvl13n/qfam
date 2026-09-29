import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, Share2, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { fetchPostBySlug, fetchRelatedPosts, WPPost } from '../utils/wp';
import SEOHead from './SEOHead';
import Header from './Header';
import Footer from './Footer';
import BlogPostSidebar from './BlogPostSidebar';
import RelatedPosts from './RelatedPosts';
import { generateArticleSchema, generateBreadcrumbSchema } from '../utils/schemaMarkup';

import { fonts } from '../theme/mallorcaPalette';
import themeConfig, { getBorder, getShadow, getColorWithOpacity } from '../theme/themeConfig';

// Extend Window interface for third-party widgets
declare global {
  interface Window {
    TiqetsWidget?: {
      init: () => void;
    };
  }
}

const BlogSection = styled.section`
  position: relative;
  min-height: 100vh;
  background: ${themeConfig.background.main};
  /* Note: No overflow property - needed for position: sticky to work in sidebar */
  padding-top: 0;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      ${themeConfig.radialEffects.primary},
      ${themeConfig.radialEffects.secondary};
    pointer-events: none;
  }
`;

const GlassmorphOverlay = styled.div`
  display: none;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 2rem 8rem;
  display: flex;
  gap: 2rem;
  align-items: stretch; /* Allow sidebar to stretch full height */
  
  @media (max-width: 1023px) {
    flex-direction: column;
    max-width: 900px;
  }
  
  @media (max-width: 768px) {
    padding: 2rem 0 10rem;
  }
`;

const Container = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  
  @media (min-width: 1024px) {
    max-width: calc(100% - 380px);
  }
`;

const ArticleContainer = styled(motion.article)`
  background: ${themeConfig.background.card};
  backdrop-filter: blur(30px);
  border: ${getBorder(themeConfig.secondary, '20')};
  border-radius: 2rem;
  overflow: hidden;
  box-shadow: 
    ${getShadow('card', themeConfig.secondary, '0.15')},
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  
  @media (max-width: 768px) {
    border-radius: 0;
    border-left: none;
    border-right: none;
  }
`;

const ArticleHeader = styled.div`
  padding: 3rem 3rem 2rem;
  border-bottom: ${getBorder(themeConfig.primary, '20')};
  
  @media (max-width: 768px) {
    padding: 2rem 1.5rem 1.5rem;
  }
`;

const Badge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: ${themeConfig.accent.gradient};
  color: white;
  border-radius: 9999px;
  margin-bottom: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: ${fonts.body};
  box-shadow: ${getShadow('card', themeConfig.accent, '0.4')};
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  font-family: ${fonts.heading};
  color: ${themeConfig.text.primary};
  line-height: 1.2;
  
  @media (min-width: 768px) {
    font-size: 3rem;
  }
  
  @media (min-width: 1024px) {
    font-size: 3.5rem;
  }
`;

const MetaContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  color: ${themeConfig.text.secondary};
  font-family: ${fonts.body};
  
  svg {
    width: 18px;
    height: 18px;
    color: ${themeConfig.secondary.main};
  }
`;

const ShareButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: ${getColorWithOpacity(themeConfig.secondary, '10')};
  border: ${getBorder(themeConfig.secondary, '30')};
  border-radius: 1rem;
  color: ${themeConfig.secondary.main};
  font-weight: 600;
  font-family: ${fonts.body};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${getColorWithOpacity(themeConfig.secondary, '20')};
    transform: translateY(-2px);
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const Content = styled(motion.div)`
  padding: 3rem;
  font-size: 1.125rem;
  color: ${themeConfig.text.primary};
  line-height: 1.8;
  font-family: ${fonts.body};
  
  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    font-size: 1rem;
  }
  
  /* Ensure widgets are properly displayed */
  [data-tiqets-widget] {
    min-height: 400px;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${fonts.heading};
    color: ${themeConfig.accent.main};
    margin-top: 3rem;
    margin-bottom: 1.5rem;
    line-height: 1.3;
  }
  
  h2 {
    font-size: 2rem;
    border-bottom: ${getBorder(themeConfig.secondary, '20')};
    padding-bottom: 0.5rem;
  }
  
  h3 {
    font-size: 1.5rem;
  }
  
  h4 {
    font-size: 1.25rem;
  }

  p {
    margin-bottom: 1.5rem;
    text-align: justify;
  }
  
  p:first-child {
    font-size: 1.25rem;
    font-weight: 500;
    color: ${themeConfig.text.secondary};
    margin-bottom: 2rem;
    
    @media (max-width: 768px) {
      font-size: 1.125rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 1rem;
    margin: 2rem 0;
    box-shadow: ${getShadow('card', themeConfig.secondary, '0.15')};
  }
  
  blockquote {
    background: ${getColorWithOpacity(themeConfig.secondary, '05')};
    border-left: 4px solid ${themeConfig.secondary.main};
    padding: 2rem;
    margin: 2rem 0;
    border-radius: 0 1rem 1rem 0;
    font-style: italic;
    font-size: 1.125rem;
    color: ${themeConfig.text.secondary};
  }
  
  ul, ol {
    margin: 1.5rem 0;
    padding-left: 2rem;
  }
  
  li {
    margin-bottom: 0.75rem;
  }
  
  a {
    color: ${themeConfig.secondary.main};
    text-decoration: underline;
    transition: color 0.3s ease;
    
    &:hover {
      color: ${themeConfig.secondary.dark};
    }
  }
  
  strong {
    color: ${themeConfig.accent.main};
    font-weight: 600;
  }
  
  em {
    font-style: italic;
    color: ${themeConfig.text.secondary};
  }
`;

const LoadingContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  text-align: center;
`;

const LoadingSpinner = styled(motion.div)`
  width: 60px;
  height: 60px;
  border: 4px solid ${getColorWithOpacity(themeConfig.secondary, '30')};
  border-top: 4px solid ${themeConfig.secondary.main};
  border-radius: 50%;
  margin-bottom: 2rem;
`;

const LoadingText = styled.p`
  color: ${themeConfig.text.primary};
  font-size: 1.25rem;
  font-family: ${fonts.body};
`;

const ErrorContainer = styled(motion.div)`
  background: ${themeConfig.background.card};
  backdrop-filter: blur(30px);
  border: ${getBorder(themeConfig.secondary, '20')};
  border-radius: 2rem;
  padding: 4rem 2rem;
  text-align: center;
  box-shadow: 
    ${getShadow('card', themeConfig.secondary, '0.15')},
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
`;

// Component to render HTML content with script execution support
const ContentWithScripts: React.FC<{ html: string }> = ({ html }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const scriptsLoadedRef = useRef<Set<string>>(new Set());
  const executedScriptsRef = useRef<HTMLScriptElement[]>([]);

  useEffect(() => {
    if (!contentRef.current) return;

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      if (!contentRef.current) return;

      // Find all script tags in the injected HTML
      const scripts = Array.from(contentRef.current.querySelectorAll('script'));
      const scriptsToExecute: HTMLScriptElement[] = [];
      
      scripts.forEach((script) => {
        const src = script.getAttribute('src');
        const inlineScript = script.textContent || script.innerHTML;

        // Skip if script already loaded
        if (src && scriptsLoadedRef.current.has(src)) {
          script.remove();
          return;
        }

        // Create new script element
        const newScript = document.createElement('script');
        
        if (src) {
          // External script
          newScript.src = src;
          newScript.defer = script.hasAttribute('defer');
          newScript.async = script.hasAttribute('async');
          scriptsLoadedRef.current.add(src);
          
          newScript.onload = () => {
            // Script loaded, trigger widget initialization if needed
            if (src.includes('tiqets.com')) {
              // Tiqets widget initialization - wait for DOM to be ready
              setTimeout(() => {
                // Check if widget containers exist
                const widgetContainers = document.querySelectorAll('[data-tiqets-widget]');
                if (widgetContainers.length > 0) {
                  // Tiqets widgets should auto-initialize, but we can trigger manually if needed
                  if (window.TiqetsWidget && typeof window.TiqetsWidget.init === 'function') {
                    window.TiqetsWidget.init();
                  }
                }
              }, 200);
            }
          };
          
          newScript.onerror = () => {
            // Note: Tiqets widgets return 403 errors in development (localhost) due to CORS/security restrictions
            // This is normal and expected. Widgets will work correctly in production when domain is authorized.
            if (src.includes('tiqets.com') && window.location.hostname === 'localhost') {
              // Silently ignore Tiqets errors in development
              return;
            }
            console.error(`Failed to load script: ${src}`);
          };
        } else if (inlineScript) {
          // Inline script - execute immediately (WordPress content, trusted source)
          const inlineEl = document.createElement('script');
          inlineEl.textContent = inlineScript;
          document.body.appendChild(inlineEl);
          inlineEl.remove();
          script.remove();
          return; // Skip adding to scriptsToExecute
        }

        // Copy all attributes from original script
        Array.from(script.attributes).forEach((attr) => {
          if (attr.name !== 'src' && attr.name !== 'defer' && attr.name !== 'async') {
            newScript.setAttribute(attr.name, attr.value);
          }
        });

        scriptsToExecute.push(newScript);
        executedScriptsRef.current.push(newScript);
        
        // Remove the original script tag from content (it won't execute anyway)
        script.remove();
      });

      // Execute external scripts in order
      scriptsToExecute.forEach((script) => {
        document.body.appendChild(script);
      });
    }, 100);

    // Cleanup function - remove scripts when component unmounts or content changes
    return () => {
      clearTimeout(timeoutId);
      executedScriptsRef.current.forEach((script) => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
      executedScriptsRef.current = [];
    };
  }, [html]);

  return <Content ref={contentRef} dangerouslySetInnerHTML={{ __html: html }} />;
};

const BlogPost: React.FC = () => {
  const { t } = useTranslation('common');
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = React.useState<WPPost | null>(null);
  const [relatedPosts, setRelatedPosts] = React.useState<WPPost[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [loadingRelated, setLoadingRelated] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetchPostBySlug(slug)
      .then((data) => {
        setPost(data);
        // Fetch related posts after main post is loaded
        if (data) {
          setLoadingRelated(true);
          fetchRelatedPosts(data, 3)
            .then((related) => setRelatedPosts(related))
            .catch((err) => console.error('Error fetching related posts:', err))
            .finally(() => setLoadingRelated(false));
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const estimateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const textContent = content.replace(/<[^>]+>/g, '');
    const wordCount = textContent.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title.rendered.replace(/<[^>]+>/g, ''),
          url: window.location.href,
        });
      } catch (err) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const stripHtml = (html: string): string => {
    return html.replace(/<[^>]+>/g, '');
  };

  if (loading) {
    return (
      <>
        <Header />
        <BlogSection>
          <GlassmorphOverlay />
          <ContentWrapper>
            <Container>
              <LoadingContainer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <LoadingSpinner
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <LoadingText>{t('blog.loading_article')}</LoadingText>
              </LoadingContainer>
            </Container>
            <BlogPostSidebar />
          </ContentWrapper>
        </BlogSection>
        <Footer />
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <Header />
        <BlogSection>
          <GlassmorphOverlay />
          <ContentWrapper>
            <Container>
              <ErrorContainer
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <h2 style={{ color: themeConfig.accent.main, marginBottom: '1rem' }}>
                  {error ? t('blog.error_title') : t('blog.post_not_found')}
                </h2>
                <p style={{ color: themeConfig.text.secondary, marginBottom: '2rem' }}>
                  {error || t('blog.post_not_found_description')}
                </p>
                <Link 
                  to="/blog"
                  style={{
                    display: 'inline-block',
                    padding: '1rem 2rem',
                    background: themeConfig.secondary.gradient,
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '1rem',
                    fontWeight: '600'
                  }}
                >
                  {t('blog.view_all_articles')}
                </Link>
              </ErrorContainer>
            </Container>
            <BlogPostSidebar />
          </ContentWrapper>
        </BlogSection>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <BlogSection>
        <SEOHead
          title={`${stripHtml(post.title.rendered)} | Que faire à Majorque`}
          description={stripHtml(post.excerpt.rendered) || ''}
          image={post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || 'https://quefaireamajorque.com/img/og-image.webp'}
          url={`https://quefaireamajorque.com/blog/${post.slug}`}
          canonical={`https://quefaireamajorque.com/blog/${post.slug}`}
          type="article"
          publishedTime={post.date}
          modifiedTime={post.modified || post.date}
          author="Rony"
        />
        {/* Structured Data for Article */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              generateArticleSchema(
                stripHtml(post.title.rendered),
                stripHtml(post.excerpt.rendered),
                `https://quefaireamajorque.com/blog/${post.slug}`,
                post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || 'https://quefaireamajorque.com/img/og-image.webp',
                post.date,
                post.date,
                'Rony',
                'Que faire à Majorque',
                'https://quefaireamajorque.com/img/LOGO_2026.png'
              ),
              generateBreadcrumbSchema([
                { name: 'Accueil', url: 'https://quefaireamajorque.com/' },
                { name: 'Blog', url: 'https://quefaireamajorque.com/blog' },
                { name: stripHtml(post.title.rendered), url: `https://quefaireamajorque.com/blog/${post.slug}` }
              ])
            ])
          }}
        />
        <GlassmorphOverlay />
        
        <ContentWrapper>
          <Container>
          <ArticleContainer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ArticleHeader>
              <Badge
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <BookOpen size={16} />
                {t('blog.article_badge')}
              </Badge>
              
              <Title
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                dangerouslySetInnerHTML={{ __html: post.title.rendered }} 
              />
              
              <MetaContainer>
                <MetaItem>
                  <Calendar />
                  {formatDate(post.date)}
                </MetaItem>
                
                <MetaItem>
                  <Clock />
                  {estimateReadingTime(post.content.rendered)} {t('blog.reading_time')}
                </MetaItem>
                
                <ShareButton
                  onClick={handleShare}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 />
                  {t('blog.share')}
                </ShareButton>
              </MetaContainer>
            </ArticleHeader>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <ContentWithScripts html={post.content.rendered} />
            </motion.div>
          </ArticleContainer>
          
          <RelatedPosts posts={relatedPosts} loading={loadingRelated} />
        </Container>
        <BlogPostSidebar />
        </ContentWrapper>
      </BlogSection>
      <Footer />
    </>
  );
};

export default BlogPost; 
