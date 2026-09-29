import React from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Folder, Calendar, ArrowRight } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import SEOHead from './SEOHead';
import { fetchCategoryBySlug, fetchPostsByCategory, WPCategory, WPPost, WPPostsResponse } from '../utils/wp';
import { decodeHtml } from '../utils/htmlDecode';
import { fonts } from '../theme/mallorcaPalette';
import themeConfig, { getBorder, getShadow, getColorWithOpacity } from '../theme/themeConfig';

const Section = styled.section`
  position: relative;
  min-height: 100vh;
  background: ${themeConfig.background.main};
  padding-top: 70px;
  overflow: hidden;

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

const Container = styled.div`
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1.5rem 8rem;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Badge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: ${themeConfig.background.card};
  backdrop-filter: blur(30px);
  border: ${getBorder(themeConfig.primary, '30')};
  border-radius: 9999px;
  margin-bottom: 1rem;
  box-shadow: 
    ${themeConfig.shadows.button} rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
`;

const BadgeIcon = styled(Folder)`
  width: 18px;
  height: 18px;
  color: ${themeConfig.primary.main};
`;

const BadgeText = styled.span`
  font-size: 0.875rem;
  color: ${themeConfig.primary.main};
  font-weight: 700;
  font-family: ${fonts.body};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.25rem, 5vw, 3.5rem);
  font-weight: 700;
  font-family: ${fonts.heading};
  color: ${themeConfig.text.primary};
  margin: 0 0 1rem 0;
  line-height: 1.2;
`;

const Description = styled(motion.div)`
  font-size: 1.125rem;
  color: ${themeConfig.text.secondary};
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
  font-family: ${fonts.body};
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1.5rem;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const CardLink = styled(Link)`
  display: block;
  background: ${themeConfig.background.card};
  backdrop-filter: blur(20px);
  border: ${getBorder(themeConfig.primary, '15')};
  border-radius: 1.25rem;
  overflow: hidden;
  box-shadow: 
    ${getShadow('card', themeConfig.primary, '0.15')},
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${themeConfig.primary.gradient};
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 0;
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: 
      ${getShadow('cardHover', themeConfig.primary, '0.3')},
      inset 0 1px 0 rgba(255, 255, 255, 0.9);
    border-color: ${getColorWithOpacity(themeConfig.primary, '30')};
    
    &::before {
      opacity: 0.03;
    }
  }
`;

const Cover = styled(motion.div)<{src?: string}>`
  position: relative;
  width: 100%;
  height: 220px;
  background: ${({src}) => src ? `url(${src}) center/cover no-repeat` : themeConfig.primary.gradient};
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 100%);
  }
`;

const CardBody = styled.div`
  position: relative;
  z-index: 1;
  padding: 1.25rem 1.5rem 1.5rem;
`;

const PostTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  font-family: ${fonts.body};
  color: ${themeConfig.text.primary};
  margin: 0 0 0.75rem 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: ${themeConfig.text.secondary};
  font-family: ${fonts.body};
`;

const CalendarIcon = styled(Calendar)`
  width: 14px;
  height: 14px;
`;

const ReadMore = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: ${getBorder(themeConfig.primary, '10')};
  color: ${themeConfig.primary.main};
  font-size: 0.875rem;
  font-weight: 600;
  font-family: ${fonts.body};
  transition: gap 0.3s ease;

  ${CardLink}:hover & {
    gap: 0.75rem;
  }
`;

const Card = motion(CardLink);

const ReadMoreArrow = styled(ArrowRight)`
  width: 16px;
  height: 16px;
`;

const LoadMore = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  border-radius: 1rem;
  border: ${getBorder(themeConfig.primary, '30')};
  background: ${themeConfig.background.card};
  backdrop-filter: blur(20px);
  color: ${themeConfig.primary.main};
  font-weight: 600;
  font-family: ${fonts.body};
  cursor: pointer;
  margin: 3rem auto 0;
  box-shadow: 
    ${getShadow('card', themeConfig.primary, '0.15')},
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: ${themeConfig.primary.main};
    color: white;
    border-color: ${themeConfig.primary.main};
    transform: translateY(-2px);
    box-shadow: ${getShadow('cardHover', themeConfig.primary, '0.3')};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LoadMoreContainer = styled.div`
  text-align: center;
  margin-top: 3rem;
`;

const LoadingSpinner = styled(motion.div)`
  text-align: center;
  padding: 4rem 2rem;
  color: ${themeConfig.text.secondary};
  font-family: ${fonts.body};
  font-size: 1.125rem;
`;

const ErrorMessage = styled(motion.div)`
  text-align: center;
  padding: 3rem;
  color: ${themeConfig.secondary.main};
  font-family: ${fonts.body};
  background: ${themeConfig.background.card};
  border-radius: 1.5rem;
  border: ${getBorder(themeConfig.secondary, '30')};
  max-width: 600px;
  margin: 0 auto;
`;

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = React.useState<WPCategory | null>(null);
  const [posts, setPosts] = React.useState<WPPost[]>([]);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [error, setError] = React.useState('');

  const stripHtml = (value?: string): string => {
    if (!value) return '';
    return value.replace(/<[^>]+>/g, '').trim();
  };

  const getFeatured = (post: WPPost): string | undefined => {
    return post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  };

  React.useEffect(() => {
    let mounted = true;
    async function run() {
      if (!slug) return;
      setLoading(true);
      setError('');
      try {
        const cat = await fetchCategoryBySlug(slug);
        if (!mounted) return;
        setCategory(cat);
        if (cat) {
          const res: WPPostsResponse = await fetchPostsByCategory(cat.id, 1, 9);
          if (!mounted) return;
          setPosts(res.posts);
          setPage(1);
          setHasMore(res.currentPage < res.totalPages);
        }
      } catch (e) {
        if (!mounted) return;
        setError(e instanceof Error ? e.message : 'Error');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    run();
    return () => { mounted = false; };
  }, [slug]);

  const loadMore = async () => {
    if (!category || loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const res = await fetchPostsByCategory(category.id, nextPage, 9);
      setPosts(prev => [...prev, ...res.posts]);
      setPage(nextPage);
      setHasMore(res.currentPage < res.totalPages);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error');
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <>
      <Header />
      <SEOHead
        title={`${category?.name ? decodeHtml(category.name) : 'Catégorie'} | Que faire à Majorque`}
        description={
          stripHtml(category?.description) ||
          (category?.name ? `Découvrez nos articles sur ${decodeHtml(category.name)} à Majorque.` : 'Découvrez nos articles classés par catégorie à Majorque.')
        }
        url={slug ? `https://quefaireamajorque.com/category/${slug}` : undefined}
        canonical={slug ? `https://quefaireamajorque.com/category/${slug}` : undefined}
        type="website"
      />
      <Section>
        <Container>
          {loading ? (
            <LoadingSpinner
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Chargement…
            </LoadingSpinner>
          ) : error ? (
            <ErrorMessage
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              Une erreur est survenue : {error}
            </ErrorMessage>
          ) : (
            <>
              <HeaderSection>
                <Badge
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <BadgeIcon />
                  <BadgeText>Catégorie</BadgeText>
                </Badge>
                <Title
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  {category?.name ? decodeHtml(category.name) : 'Catégorie'}
                </Title>
                {category?.description ? (
                  <Description
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    dangerouslySetInnerHTML={{ __html: category.description }}
                  />
                ) : null}
              </HeaderSection>

              <Grid
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
              >
                {posts.map((post) => (
                  <Card
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ y: -6 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Cover src={getFeatured(post)} />
                    <CardBody>
                      <PostTitle dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                      <Meta>
                        <CalendarIcon />
                        {new Date(post.date).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </Meta>
                      <ReadMore>
                        Lire l'article
                        <ReadMoreArrow />
                      </ReadMore>
                    </CardBody>
                  </Card>
                ))}
              </Grid>

              {hasMore ? (
                <LoadMoreContainer>
                  <LoadMore
                    whileTap={{ scale: 0.95 }}
                    onClick={loadMore}
                    disabled={loadingMore}
                  >
                    {loadingMore ? 'Chargement…' : 'Charger plus d\'articles'}
                  </LoadMore>
                </LoadMoreContainer>
              ) : null}
            </>
          )}
        </Container>
      </Section>
      <Footer />
    </>
  );
};

export default CategoryPage;
