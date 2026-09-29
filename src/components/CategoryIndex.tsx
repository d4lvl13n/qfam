import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Folder, ChevronRight } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import SEOHead from './SEOHead';
import { fetchCategories, WPCategory } from '../utils/wp';
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
  padding: 4rem 1.5rem 8rem;
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
  margin-bottom: 1.5rem;
  box-shadow: 
    ${themeConfig.shadows.button} rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
`;

const BadgeIcon = styled(Folder)`
  width: 20px;
  height: 20px;
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
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  font-family: ${fonts.heading};
  color: ${themeConfig.text.primary};
  margin: 0 0 1rem 0;
  line-height: 1.2;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.125rem;
  color: ${themeConfig.text.secondary};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  font-family: ${fonts.body};
`;

const Grid = styled(motion.div)`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  @media (min-width: 640px) { 
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.25rem;
  }
  @media (min-width: 1024px) { 
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.5rem;
  }
`;

const CardLink = styled(Link)`
  display: block;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border: ${getBorder(themeConfig.primary, '20')};
  border-radius: 1rem;
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
  box-shadow: 
    ${getShadow('card', themeConfig.primary, '0.15')},
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${themeConfig.primary.gradient};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 
      ${getShadow('cardHover', themeConfig.primary, '0.25')},
      inset 0 1px 0 rgba(255, 255, 255, 0.9);
    border-color: ${getColorWithOpacity(themeConfig.primary, '40')};

    &::before {
      transform: scaleX(1);
    }
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.75rem;
`;

const CardIconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${themeConfig.primary.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px ${getColorWithOpacity(themeConfig.primary, '25')};
`;

const CardIcon = styled(Folder)`
  width: 24px;
  height: 24px;
  color: white;
`;

const Name = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
  font-family: ${fonts.body};
  color: ${themeConfig.text.primary};
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
`;

const CountBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  background: ${getColorWithOpacity(themeConfig.primary, '20')};
  color: ${themeConfig.primary.main};
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  font-family: ${fonts.body};
`;

const Arrow = styled(ChevronRight)`
  width: 20px;
  height: 20px;
  color: ${themeConfig.primary.main};
  opacity: 0;
  transform: translateX(-4px);
  transition: all 0.3s ease;

  ${CardLink}:hover & {
    opacity: 1;
    transform: translateX(0);
  }
`;

const Card = motion(CardLink);

const LoadingSpinner = styled(motion.div)`
  text-align: center;
  padding: 3rem;
  color: ${themeConfig.text.secondary};
  font-family: ${fonts.body};
`;

const ErrorMessage = styled(motion.div)`
  text-align: center;
  padding: 3rem;
  color: ${themeConfig.secondary.main};
  font-family: ${fonts.body};
  background: rgba(255, 255, 255, 0.9);
  border-radius: 1rem;
  border: ${getBorder(themeConfig.secondary, '30')};
`;

const CategoryIndex: React.FC = () => {
  const [cats, setCats] = React.useState<WPCategory[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetchCategories(100);
        if (!mounted) return;
        // hide empty categories optionally
        setCats(res.filter(c => (c.count ?? 0) > 0));
      } catch (e) {
        if (!mounted) return;
        setError(e instanceof Error && e.message ? e.message : 'Error');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <>
      <SEOHead 
        title="Catégories | Blog Que faire à Majorque"
        description="Explorez toutes nos catégories d'articles sur Majorque : plages, restaurants, activités, culture, nature et bien plus encore."
        url="https://quefaireamajorque.com/categories"
        canonical="https://quefaireamajorque.com/categories"
        image="https://quefaireamajorque.com/img/LOGO_2026.png"
      />
      <Header />
      <Section>
        <Container>
          <HeaderSection>
            <Badge
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <BadgeIcon />
              <BadgeText>Explorer</BadgeText>
            </Badge>
            <Title
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Toutes les Catégories
            </Title>
            <Subtitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Découvrez nos guides et conseils classés par thématiques
            </Subtitle>
          </HeaderSection>

          {loading ? (
            <LoadingSpinner
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Chargement des catégories…
            </LoadingSpinner>
          ) : error ? (
            <ErrorMessage
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              Une erreur est survenue : {error}
            </ErrorMessage>
          ) : (
            <Grid
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.08
                  }
                }
              }}
            >
              {cats.map(c => (
                <Card
                  key={c.id}
                  to={`/category/${c.slug}`}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CardHeader>
                    <CardIconWrapper>
                      <CardIcon />
                    </CardIconWrapper>
                    <CountBadge>{c.count ?? 0}</CountBadge>
                  </CardHeader>
                  <Name>{decodeHtml(c.name)}</Name>
                  <Arrow />
                </Card>
              ))}
            </Grid>
          )}
        </Container>
      </Section>
      <Footer />
    </>
  );
};

export default CategoryIndex;
