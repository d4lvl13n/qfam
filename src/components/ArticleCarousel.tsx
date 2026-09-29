import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  ArrowRight,
  Loader2
} from 'lucide-react';
import { palette, fonts } from '../theme/mallorcaPalette';

// Decode HTML entities (handles &amp;, &quot;, etc.)
const decodeHtml = (html: string): string => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

// Types
interface WPPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  date: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>;
    'wp:term'?: Array<Array<{ name: string; slug: string }>>;
  };
}

interface ArticleCarouselProps {
  title?: string;
  subtitle?: string;
  categorySlug?: string;
  limit?: number;
  showViewAll?: boolean;
  orderBy?: 'date' | 'comment_count' | 'modified'; // For sorting: date (recent), comment_count (popular), modified (recently updated)
}

const Section = styled.section`
  padding: 5rem 0;
  background: ${palette.white};
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 3rem 0;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 2.5rem;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 1.5rem;
  }
`;

const HeaderLeft = styled.div``;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${palette.ink};
  font-family: ${fonts.heading};
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.02em;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${palette.inkLight};
  font-family: ${fonts.body};
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NavigationButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavButton = styled(motion.button)<{ disabled?: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid ${props => props.disabled ? palette.sandDark : palette.ink};
  background: ${props => props.disabled ? palette.sandLight : 'white'};
  color: ${props => props.disabled ? palette.inkLight : palette.ink};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background: ${palette.ink};
    color: white;
  }
`;

const ViewAllLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${palette.sea};
  font-weight: 600;
  font-size: 1rem;
  font-family: ${fonts.body};
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    gap: 0.75rem;
  }
`;

const CarouselWrapper = styled.div`
  position: relative;
  overflow: hidden;
  /* Mobile scroll optimizations */
  touch-action: pan-y pinch-zoom;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-x: contain;
`;

const CarouselTrack = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  cursor: grab;
  /* GPU acceleration for smooth scrolling */
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  will-change: transform;
  /* Allow horizontal panning on mobile */
  touch-action: pan-x;
  
  &:active {
    cursor: grabbing;
  }
`;

const Card = styled(motion.article)`
  flex: 0 0 calc(33.333% - 1rem);
  min-width: 300px;
  background: white;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 4px 20px -8px rgba(0, 0, 0, 0.1);
  border: 1px solid ${palette.sandLight};
  transition: all 0.4s ease;
  /* GPU acceleration */
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  /* Prevent text selection on drag */
  -webkit-user-select: none;
  user-select: none;
  touch-action: manipulation;
  
  &:hover {
    transform: translateY(-8px) translateZ(0);
    box-shadow: 0 20px 40px -15px rgba(10, 126, 164, 0.2);
    border-color: ${palette.sea};
  }
  
  @media (max-width: 1024px) {
    flex: 0 0 calc(50% - 0.75rem);
    min-width: 280px;
  }
  
  @media (max-width: 640px) {
    flex: 0 0 85%;
    min-width: 260px;
  }
`;

const CardLink = styled(Link)`
  text-decoration: none;
  display: block;
`;

const CardImage = styled.div<{ src?: string }>`
  width: 100%;
  height: 200px;
  background: ${props => props.src ? `url(${props.src})` : palette.sandLight};
  background-size: cover;
  background-position: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 60%, rgba(0, 0, 0, 0.1) 100%);
  }
`;

const CardCategory = styled.span`
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.375rem 0.875rem;
  background: white;
  color: ${palette.ink};
  font-size: 0.75rem;
  font-weight: 600;
  font-family: ${fonts.body};
  border-radius: 2rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px -4px rgba(0, 0, 0, 0.15);
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${palette.ink};
  font-family: ${fonts.heading};
  margin: 0 0 0.75rem 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardExcerpt = styled.p`
  font-size: 0.95rem;
  color: ${palette.inkLight};
  font-family: ${fonts.body};
  line-height: 1.6;
  margin: 0 0 1rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardDate = styled.span`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.85rem;
  color: ${palette.inkLight};
  font-family: ${fonts.body};
`;

const ReadMore = styled.span`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.9rem;
  color: ${palette.sea};
  font-weight: 600;
  font-family: ${fonts.body};
  transition: gap 0.3s ease;
  
  ${Card}:hover & {
    gap: 0.625rem;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  color: ${palette.sea};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${palette.inkLight};
  font-family: ${fonts.body};
`;

// Mobile Scroll Indicator
const ScrollIndicator = styled.div`
  display: none;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

const ScrollDot = styled.div<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.active ? palette.sea : palette.sandDark};
  transition: all 0.3s ease;
`;

const ArticleCarousel: React.FC<ArticleCarouselProps> = ({
  title,
  subtitle,
  categorySlug,
  limit = 6,
  showViewAll = true,
  orderBy = 'date'
}) => {
  const { t } = useTranslation('heroSearch');
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
  const [cardWidth, setCardWidth] = useState(340);

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        // WordPress REST API supports: date, modified, title, id, include, slug, comment_count
        // If comment_count is not supported, fallback to date
        let effectiveOrderBy = orderBy;
        if (orderBy === 'comment_count') {
          // Try comment_count first, but WordPress may not support it without a plugin
          effectiveOrderBy = 'comment_count';
        }
        
        let url = `https://quefaireamajorque-wordpress.captain.codolie.com/wp-json/wp/v2/posts?per_page=${limit}&_embed=true&orderby=${effectiveOrderBy}&order=desc`;
        
        if (categorySlug) {
          // First get category ID
          const catResponse = await fetch(
            `https://quefaireamajorque-wordpress.captain.codolie.com/wp-json/wp/v2/categories?slug=${categorySlug}`
          );
          const catData = await catResponse.json();
          if (catData.length > 0) {
            url += `&categories=${catData[0].id}`;
          }
        }
        
        const response = await fetch(url);
        
        // Check if response is OK
        if (!response.ok) {
          // If comment_count fails, try with date instead
          if (orderBy === 'comment_count' && response.status === 400) {
            console.warn('comment_count not supported, falling back to date');
            url = url.replace('orderby=comment_count', 'orderby=date');
            const fallbackResponse = await fetch(url);
            if (fallbackResponse.ok) {
              const fallbackData = await fallbackResponse.json();
              setPosts(Array.isArray(fallbackData) ? fallbackData : []);
              return;
            }
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Ensure data is an array
        if (!Array.isArray(data)) {
          console.error('API response is not an array:', data);
          setPosts([]);
          return;
        }
        
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [categorySlug, limit, orderBy]);

  // Calculate drag constraints and card width
  useEffect(() => {
    const calculateDimensions = () => {
      if (carouselRef.current && carouselRef.current.parentElement) {
        const containerWidth = carouselRef.current.parentElement.offsetWidth;
        const gap = 24; // 1.5rem
        
        // Calculate card width based on screen size
        let visibleCards = 3;
        if (window.innerWidth <= 640) {
          visibleCards = 1.15; // Show partial next card
        } else if (window.innerWidth <= 1024) {
          visibleCards = 2;
        }
        
        const calculatedCardWidth = (containerWidth - (gap * (Math.floor(visibleCards) - 1))) / visibleCards;
        setCardWidth(calculatedCardWidth + gap);
        
        const totalWidth = posts.length * (calculatedCardWidth + gap);
        setDragConstraints({
          left: -(totalWidth - containerWidth),
          right: 0
        });
      }
    };

    calculateDimensions();
    window.addEventListener('resize', calculateDimensions);
    return () => window.removeEventListener('resize', calculateDimensions);
  }, [posts]);

  // Strip HTML and decode entities
  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    const text = tmp.textContent || tmp.innerText || '';
    return decodeHtml(text);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short'
    });
  };

  // Navigation - calculate visible cards based on screen
  const getVisibleCards = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth <= 640) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  };

  const visibleCards = getVisibleCards();
  const maxIndex = Math.max(0, posts.length - visibleCards);
  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < maxIndex;

  const handlePrev = () => {
    if (canGoBack) {
      setCurrentIndex(prev => Math.max(0, prev - 1));
    }
  };

  const handleNext = () => {
    if (canGoForward) {
      setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
    }
  };

  if (isLoading) {
    return (
      <Section>
        <Container>
          <LoadingContainer>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <Loader2 size={40} />
            </motion.div>
          </LoadingContainer>
        </Container>
      </Section>
    );
  }

  if (posts.length === 0) {
    return (
      <Section>
        <Container>
          <EmptyState>
            {t('articleCarousel.noArticles')}
          </EmptyState>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container>
        <Header>
          <HeaderLeft>
            <SectionTitle>{title || t('articleCarousel.recentTitle')}</SectionTitle>
            <SectionSubtitle>{subtitle || t('articleCarousel.recentSubtitle')}</SectionSubtitle>
          </HeaderLeft>
          <HeaderRight>
            <NavigationButtons>
              <NavButton
                onClick={handlePrev}
                disabled={!canGoBack}
                whileHover={canGoBack ? { scale: 1.05 } : {}}
                whileTap={canGoBack ? { scale: 0.95 } : {}}
              >
                <ChevronLeft size={22} />
              </NavButton>
              <NavButton
                onClick={handleNext}
                disabled={!canGoForward}
                whileHover={canGoForward ? { scale: 1.05 } : {}}
                whileTap={canGoForward ? { scale: 0.95 } : {}}
              >
                <ChevronRight size={22} />
              </NavButton>
            </NavigationButtons>
            {showViewAll && (
              <ViewAllLink to="/blog">
                {t('articleCarousel.viewAll')}
                <ArrowRight size={18} />
              </ViewAllLink>
            )}
          </HeaderRight>
        </Header>

        <CarouselWrapper>
          <CarouselTrack
            ref={carouselRef}
            drag="x"
            dragConstraints={dragConstraints}
            animate={{ x: -currentIndex * cardWidth }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {posts.map((post, index) => {
              const category = post._embedded?.['wp:term']?.[0]?.[0];
              const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
              
              return (
                <Card
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <CardLink to={`/blog/${post.slug}`}>
                    <CardImage src={imageUrl}>
                      {category && (
                        <CardCategory>{decodeHtml(category.name)}</CardCategory>
                      )}
                    </CardImage>
                    <CardContent>
                      <CardTitle>{decodeHtml(post.title.rendered)}</CardTitle>
                      <CardExcerpt>{stripHtml(post.excerpt.rendered)}</CardExcerpt>
                      <CardMeta>
                        <CardDate>
                          <Clock size={14} />
                          {formatDate(post.date)}
                        </CardDate>
                        <ReadMore>
                          {t('articleCarousel.read')}
                          <ArrowRight size={16} />
                        </ReadMore>
                      </CardMeta>
                    </CardContent>
                  </CardLink>
                </Card>
              );
            })}
          </CarouselTrack>
        </CarouselWrapper>

        <ScrollIndicator>
          {posts.slice(0, Math.min(5, posts.length)).map((_, index) => (
            <ScrollDot key={index} active={index === Math.floor(currentIndex / (posts.length / 5))} />
          ))}
        </ScrollIndicator>
      </Container>
    </Section>
  );
};

export default ArticleCarousel;

