import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { WPPost } from '../utils/wp';
import { fonts } from '../theme/mallorcaPalette';
import themeConfig, { getColorWithOpacity } from '../theme/themeConfig';

const Section = styled.section`
  margin-top: 5rem;
  padding-top: 4rem;
  border-top: 2px solid ${getColorWithOpacity(themeConfig.secondary, '15')};
  
  @media (max-width: 768px) {
    margin-top: 3rem;
    padding-top: 3rem;
  }
`;

const SectionHeader = styled.div`
  margin-bottom: 3rem;
  text-align: center;
  
  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.25rem;
  font-weight: 800;
  color: ${themeConfig.text.primary};
  margin: 0 0 0.75rem 0;
  font-family: ${fonts.heading};
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.1rem;
  color: ${themeConfig.text.secondary};
  margin: 0;
  font-family: ${fonts.body};
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const Card = styled(motion(Link))`
  background: ${themeConfig.background.card};
  backdrop-filter: blur(30px);
  border: 1px solid ${getColorWithOpacity(themeConfig.secondary, '20')};
  border-radius: 1.5rem;
  overflow: hidden;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 10px 30px -12px rgba(10, 126, 164, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  
  &:hover {
    transform: translateY(-8px);
    border-color: ${themeConfig.secondary.main};
    box-shadow: 
      0 20px 50px -15px rgba(10, 126, 164, 0.25),
      inset 0 1px 0 rgba(255, 255, 255, 0.9);
  }
`;

const ImageContainer = styled.div<{ bgImage: string }>`
  width: 100%;
  height: 200px;
  background-image: url('${props => props.bgImage}');
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      transparent 0%,
      rgba(0, 0, 0, 0.3) 100%
    );
    transition: opacity 0.4s ease;
  }
  
  ${Card}:hover &::after {
    opacity: 0.5;
  }
  
  @media (max-width: 768px) {
    height: 180px;
  }
`;

const CardContent = styled.div`
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const CardTitle = styled.h3`
  font-size: 1.35rem;
  font-weight: 700;
  color: ${themeConfig.text.primary};
  margin: 0 0 1rem 0;
  font-family: ${fonts.heading};
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.3s ease;
  
  ${Card}:hover & {
    color: ${themeConfig.secondary.main};
  }
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const CardExcerpt = styled.p`
  font-size: 0.95rem;
  color: ${themeConfig.text.secondary};
  margin: 0 0 1.5rem 0;
  font-family: ${fonts.body};
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding-top: 1.25rem;
  border-top: 1px solid ${getColorWithOpacity(themeConfig.secondary, '10')};
  font-size: 0.875rem;
  color: ${themeConfig.text.secondary};
  font-family: ${fonts.body};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const ReadMore = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${themeConfig.secondary.main};
  font-weight: 600;
  font-size: 0.95rem;
  font-family: ${fonts.body};
  margin-top: auto;
  transition: all 0.3s ease;
  
  ${Card}:hover & {
    gap: 0.75rem;
    color: ${themeConfig.secondary.dark};
  }
  
  svg {
    transition: transform 0.3s ease;
  }
  
  ${Card}:hover svg {
    transform: translateX(4px);
  }
`;

const SkeletonCard = styled(motion.div)`
  background: ${themeConfig.background.card};
  backdrop-filter: blur(30px);
  border: 1px solid ${getColorWithOpacity(themeConfig.secondary, '20')};
  border-radius: 1.5rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: default;
`;

interface RelatedPostsProps {
  posts: WPPost[];
  loading?: boolean;
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts, loading = false }) => {
  const { t, i18n } = useTranslation('relatedPosts');

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

  const estimateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const textContent = content.replace(/<[^>]+>/g, '');
    const wordCount = textContent.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const stripHtml = (html: string): string => {
    return html.replace(/<[^>]+>/g, '');
  };

  if (loading) {
    return (
      <Section>
        <SectionHeader>
          <SectionTitle>{t('title')}</SectionTitle>
          <SectionSubtitle>{t('subtitle')}</SectionSubtitle>
        </SectionHeader>
        <Grid>
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i}>
              <ImageContainer bgImage="/img/QFAM 1.webp" />
              <CardContent>
                <CardTitle style={{ background: '#e0e0e0', height: '1.5rem', borderRadius: '4px' }} />
                <CardExcerpt style={{ background: '#f0f0f0', height: '4rem', borderRadius: '4px' }} />
              </CardContent>
            </SkeletonCard>
          ))}
        </Grid>
      </Section>
    );
  }

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <Section>
      <SectionHeader>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('title')}
        </SectionTitle>
        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {t('subtitle')}
        </SectionSubtitle>
      </SectionHeader>

      <Grid>
        {posts.map((post, index) => (
          <Card
            key={post.id}
            to={`/blog/${post.slug}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ImageContainer bgImage={getFeaturedImage(post)} />
            <CardContent>
              <CardTitle dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
              <CardExcerpt>{stripHtml(post.excerpt.rendered)}</CardExcerpt>
              
              <CardMeta>
                <MetaItem>
                  <Calendar size={16} />
                  {formatDate(post.date)}
                </MetaItem>
                <MetaItem>
                  <Clock size={16} />
                  {estimateReadingTime(post.content.rendered)} {t('reading_time')}
                </MetaItem>
              </CardMeta>
              
              <ReadMore>
                {t('read_more')}
                <ArrowRight size={18} />
              </ReadMore>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Section>
  );
};

export default RelatedPosts;

