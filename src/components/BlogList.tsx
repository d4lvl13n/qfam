import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, BookOpen, MoreHorizontal, Search, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { fetchPosts, WPPost, WPPostsResponse } from '../utils/wp';
import SEOHead from './SEOHead';
import Header from './Header';
import Footer from './Footer';

import { fonts } from '../theme/mallorcaPalette';
import themeConfig, { getBorder, getShadow, getColorWithOpacity } from '../theme/themeConfig';

const BlogSection = styled.section`
  position: relative;
  min-height: 100vh;
  background: ${themeConfig.background.main};
  overflow: hidden;
  padding-top: 70px;

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

const Container = styled.div`
  position: relative;
  z-index: 10;
  max-width: 1280px;
  margin: 0 auto;
  padding: 6rem 2rem 8rem;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 6rem;
`;

const Badge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: ${themeConfig.background.card};
  backdrop-filter: blur(30px);
  border: ${getBorder(themeConfig.primary, '30')};
  border-radius: 9999px;
  margin-bottom: 2rem;
  box-shadow: 
    ${themeConfig.shadows.button} rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
`;

const BadgeText = styled.span`
  font-size: 0.875rem;
  color: ${themeConfig.primary.main};
  font-weight: 600;
  font-family: ${fonts.body};
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  font-family: ${fonts.heading};
  color: ${themeConfig.text.primary};
  
  @media (min-width: 768px) {
    font-size: 4rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: ${themeConfig.text.secondary};
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
  font-family: ${fonts.body};
`;

const SearchWrapper = styled(motion.div)`
  max-width: 560px;
  margin: 0 auto;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 3rem 1rem 3.25rem;
  background: ${themeConfig.background.card};
  backdrop-filter: blur(30px);
  border: ${getBorder(themeConfig.secondary, '20')};
  border-radius: 1.25rem;
  font-size: 1rem;
  font-family: ${fonts.body};
  color: ${themeConfig.text.primary};
  outline: none;
  transition: all 0.3s ease;
  box-shadow:
    ${themeConfig.shadows.button} rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);

  &::placeholder {
    color: ${themeConfig.text.secondary};
    opacity: 0.6;
  }

  &:focus {
    border-color: ${getColorWithOpacity(themeConfig.secondary, '50')};
    box-shadow:
      ${getShadow('card', themeConfig.secondary, '0.15')},
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1.1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${themeConfig.text.secondary};
  pointer-events: none;
  display: flex;
  align-items: center;

  svg {
    width: 18px;
    height: 18px;
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 0.85rem;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: ${themeConfig.text.secondary};
  cursor: pointer;
  padding: 0.35rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${getColorWithOpacity(themeConfig.secondary, '10')};
    color: ${themeConfig.text.primary};
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2.5rem;
  margin-top: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const Card = styled(motion(Link))`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  border-radius: 2rem;
  background: ${themeConfig.background.card};
  backdrop-filter: blur(30px);
  border: ${getBorder(themeConfig.secondary, '20')};
  overflow: hidden;
  box-shadow: 
    ${getShadow('card', themeConfig.secondary, '0.15')},
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  color: ${themeConfig.text.primary};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 
      ${getShadow('cardHover', themeConfig.secondary, '0.25')},
      inset 0 1px 0 rgba(255, 255, 255, 0.9);
    border-color: ${getColorWithOpacity(themeConfig.secondary, '30')};
  }
`;

const CoverContainer = styled.div`
  position: relative;
  height: 220px;
  overflow: hidden;
`;

const Cover = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const CoverOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(0, 0, 0, 0.1) 50%,
    rgba(0, 0, 0, 0.3) 100%
  );
`;

const CardContent = styled.div`
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const PostTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-family: ${fonts.heading};
  color: ${themeConfig.accent.main};
  font-weight: 700;
  line-height: 1.3;
  
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Excerpt = styled.div`
  font-size: 0.95rem;
  color: ${themeConfig.text.secondary};
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex: 1;
  font-family: ${fonts.body};
  
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  
  p {
    margin: 0;
  }
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: auto;
  padding-top: 1rem;
  border-top: ${getBorder(themeConfig.secondary, '20')};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: ${themeConfig.text.secondary};
  font-family: ${fonts.body};
  
  svg {
    width: 16px;
    height: 16px;
    color: ${themeConfig.secondary.main};
  }
`;

const ReadMoreButton = styled.div`
  margin-left: auto;
  padding: 0.5rem 1rem;
  background: ${themeConfig.secondary.gradient};
  color: white;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: ${fonts.body};
  transition: all 0.3s ease;
  
  ${Card}:hover & {
    background: ${themeConfig.secondary.dark};
    transform: translateX(4px);
  }
`;

const Loading = styled(motion.div)`
  text-align: center;
  margin-top: 6rem;
  color: ${themeConfig.text.primary};
  font-size: 1.25rem;
  font-family: ${fonts.body};
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  margin-top: 6rem;
  padding: 4rem 2rem;
  background: ${themeConfig.background.card};
  backdrop-filter: blur(30px);
  border: ${getBorder(themeConfig.secondary, '20')};
  border-radius: 2rem;
  box-shadow: 
    ${getShadow('card', themeConfig.secondary, '0.15')},
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
`;

const LoadMoreContainer = styled.div`
  text-align: center;
  margin-top: 4rem;
`;

const LoadMoreButton = styled(motion.button)`
  padding: 1.5rem 3rem;
  background: ${themeConfig.background.card};
  backdrop-filter: blur(30px);
  border: ${getBorder(themeConfig.secondary, '30')};
  border-radius: 1.5rem;
  color: ${themeConfig.secondary.main};
  font-weight: 600;
  font-size: 1.125rem;
  font-family: ${fonts.body};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
  box-shadow: 
    ${themeConfig.shadows.button} rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);

  &:hover:not(:disabled) {
    background: ${themeConfig.secondary.gradient};
    color: white;
    border-color: transparent;
    transform: translateY(-2px);
    box-shadow: 
      ${getShadow('cardHover', themeConfig.secondary, '0.3')},
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const BlogList: React.FC = () => {
  const { t, i18n } = useTranslation('common');
  const [posts, setPosts] = React.useState<WPPost[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [error, setError] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [hasMorePosts, setHasMorePosts] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const debounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadPosts = async (page: number = 1, append: boolean = false, search?: string) => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const response: WPPostsResponse = await fetchPosts(page, 6, search);

      if (append) {
        setPosts(prevPosts => [...prevPosts, ...response.posts]);
      } else {
        setPosts(response.posts);
      }

      setCurrentPage(response.currentPage);
      setHasMorePosts(response.currentPage < response.totalPages);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  React.useEffect(() => {
    loadPosts(1, false);
  }, []);

  React.useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      loadPosts(1, false, searchQuery);
    }, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchQuery]);

  const handleLoadMore = () => {
    if (!loadingMore && hasMorePosts) {
      loadPosts(currentPage + 1, true, searchQuery);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const getFeaturedImage = (post: WPPost): string => {
    if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
      return post._embedded['wp:featuredmedia'][0].source_url;
    }
    return '/img/QFAM 1.webp';
  };

  const formatDate = (dateString: string): string => {
    const locale = i18n.language === 'en' ? 'en-US' : i18n.language === 'fr' ? 'fr-FR' : 'es-ES';
    return new Date(dateString).toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const stripHtml = (html: string): string => {
    return html.replace(/<[^>]+>/g, '');
  };

  return (
    <>
      <Header />
      <BlogSection>
        <SEOHead 
          title={t('blog.meta_title')}
          description={t('blog.meta_description')}
          url="https://quefaireamajorque.com/blog"
          canonical="https://quefaireamajorque.com/blog"
          image="https://quefaireamajorque.com/img/LOGO_2026.png"
        />
        <GlassmorphOverlay />
        
        <Container>
          <SectionHeader>
            <Badge
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <BookOpen size={20} />
              <BadgeText>{t('blog.badge')}</BadgeText>
            </Badge>
            
            <Title
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t('blog.title')}
            </Title>
            
            <Subtitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {t('blog.subtitle')}
            </Subtitle>
            <SearchWrapper
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <SearchIcon><Search /></SearchIcon>
              <SearchInput
                type="text"
                placeholder={t('blog.search_placeholder', 'Rechercher un article...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <ClearButton onClick={handleClearSearch} aria-label="Effacer la recherche">
                  <X />
                </ClearButton>
              )}
            </SearchWrapper>
          </SectionHeader>

          {loading && (
            <Loading
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {t('blog.loading')}
            </Loading>
          )}
          
          {error && (
            <EmptyState
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h3 style={{ color: themeConfig.accent.main, marginBottom: '1rem' }}>{t('blog.error_title')}</h3>
              <p style={{ color: themeConfig.text.secondary }}>{error}</p>
            </EmptyState>
          )}
          
          {!loading && !error && posts.length === 0 && (
            <EmptyState
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h3 style={{ color: themeConfig.accent.main, marginBottom: '1rem' }}>{t('blog.coming_soon_title')}</h3>
              <p style={{ color: themeConfig.text.secondary }}>{t('blog.coming_soon_subtitle')}</p>
            </EmptyState>
          )}
          
          {!loading && !error && posts.length > 0 && (
            <>
              <Grid
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {posts.map((post, index) => (
                  <Card 
                    key={post.id} 
                    to={`/blog/${post.slug}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <CoverContainer>
                      <Cover 
                        src={getFeaturedImage(post)} 
                        alt={stripHtml(post.title.rendered)}
                        loading="lazy"
                      />
                      <CoverOverlay />
                    </CoverContainer>
                    
                    <CardContent>
                      <PostTitle dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                      <Excerpt dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                      
                      <CardMeta>
                        <MetaItem>
                          <Calendar />
                          {formatDate(post.date)}
                        </MetaItem>
                        <ReadMoreButton>
                          {t('blog.read_more')}
                        </ReadMoreButton>
                      </CardMeta>
                    </CardContent>
                  </Card>
                ))}
              </Grid>

              {hasMorePosts && (
                <LoadMoreContainer>
                  <LoadMoreButton
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {loadingMore ? (
                      <>
                        <MoreHorizontal className="animate-pulse" />
                        {t('blog.loading_more', 'Cargando más...')}
                      </>
                    ) : (
                      <>
                        <MoreHorizontal />
                        {t('blog.load_more', 'Cargar más artículos')}
                      </>
                    )}
                  </LoadMoreButton>
                </LoadMoreContainer>
              )}
            </>
          )}
        </Container>
      </BlogSection>
      <Footer />
    </>
  );
};

export default BlogList; 