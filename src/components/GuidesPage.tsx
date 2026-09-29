import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { BookOpen, Plane, ArrowRight, Check, Star, Users } from 'lucide-react';
import { palette, fonts } from '../theme/mallorcaPalette';
import Header from './Header';
import Footer from './Footer';
import SEOHead from './SEOHead';
import { generateProductSchema } from '../utils/schemaMarkup';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${palette.white};
  overflow-x: hidden;
`;

// Hero Section
const HeroSection = styled.section`
  position: relative;
  padding: 10rem 2rem 6rem;
  background: linear-gradient(135deg, ${palette.sea} 0%, ${palette.seaDark} 100%);
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 800px;
    height: 800px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%);
    border-radius: 50%;
  }
  
  @media (max-width: 768px) {
    padding: 7rem 1.5rem 4rem;
  }
`;

const HeroContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 2;
`;

const HeroBadge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 217, 61, 0.2);
  backdrop-filter: blur(20px);
  border: 2px solid #FFD93D;
  border-radius: 3rem;
  color: #FFD93D;
  font-weight: 700;
  font-size: 0.95rem;
  font-family: ${fonts.body};
  margin-bottom: 2rem;
  box-shadow: 0 20px 60px -15px rgba(255, 217, 61, 0.3);
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 4.5rem;
  font-weight: 900;
  color: white;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  font-family: ${fonts.heading};
  letter-spacing: -0.02em;
  
  @media (max-width: 968px) {
    font-size: 3rem;
  }
  
  @media (max-width: 600px) {
    font-size: 2.25rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 3rem;
  font-family: ${fonts.body};
  line-height: 1.6;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

// Guides Section
const GuidesSection = styled.section`
  padding: 8rem 2rem;
  background: linear-gradient(180deg, #fff 0%, ${palette.cream} 100%);
  
  @media (max-width: 768px) {
    padding: 5rem 1.5rem;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const GuidesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const GuideCard = styled(motion.div)`
  position: relative;
  background: white;
  border-radius: 2.5rem;
  overflow: hidden;
  box-shadow: 0 20px 60px -15px rgba(0, 0, 0, 0.15);
  border: 1px solid ${palette.sandDark};
  transition: all 0.4s ease;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 30px 80px -20px rgba(10, 126, 164, 0.3);
    border-color: ${palette.sea};
  }
`;

const GuideImage = styled.div<{ bgImage: string }>`
  width: 100%;
  height: 280px;
  background-image: url('${props => props.bgImage}');
  background-size: cover;
  background-position: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.4) 100%);
  }
  
  @media (max-width: 768px) {
    height: 220px;
  }
`;

const GuideHeader = styled.div<{ gradient: string }>`
  padding: 2.5rem 2.5rem 2rem;
  background: ${props => props.gradient};
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    right: -30%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%);
    border-radius: 50%;
  }
`;

const GuideIcon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 1rem;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 2;
`;

const GuideBadge = styled.span`
  display: inline-block;
  padding: 0.5rem 1.25rem;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 2rem;
  color: white;
  font-weight: 700;
  font-size: 0.85rem;
  font-family: ${fonts.body};
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  z-index: 2;
`;

const GuideTitle = styled.h2`
  font-size: 2rem;
  font-weight: 900;
  color: white;
  margin-bottom: 0.75rem;
  font-family: ${fonts.heading};
  line-height: 1.2;
  position: relative;
  z-index: 2;
  
  @media (max-width: 600px) {
    font-size: 1.75rem;
  }
`;

const GuidePrice = styled.div`
  font-size: 3rem;
  font-weight: 900;
  color: white;
  font-family: ${fonts.heading};
  line-height: 1;
  position: relative;
  z-index: 2;
  
  @media (max-width: 600px) {
    font-size: 2.5rem;
  }
`;

const GuideBody = styled.div`
  padding: 2.5rem;
`;

const GuideDescription = styled.p`
  font-size: 1.05rem;
  color: ${palette.inkLight};
  line-height: 1.7;
  margin-bottom: 2rem;
  font-family: ${fonts.body};
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: start;
  gap: 0.75rem;
  font-size: 0.95rem;
  color: ${palette.ink};
  font-family: ${fonts.body};
  line-height: 1.5;
  
  svg {
    flex-shrink: 0;
    margin-top: 0.125rem;
    color: #10B981;
  }
`;

const SocialProof = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, ${palette.cream} 0%, ${palette.sandLight} 100%);
  border-radius: 1.25rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const SocialProofItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${palette.ink};
  font-family: ${fonts.body};
  font-weight: 600;
  font-size: 0.95rem;
`;

const Stars = styled.div`
  display: flex;
  gap: 0.125rem;
  color: #FFD93D;
`;

const GuideCTA = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  padding: 1.25rem 2rem;
  background: ${palette.ink};
  color: white;
  font-weight: 800;
  font-size: 1.125rem;
  font-family: ${fonts.body};
  border-radius: 4rem;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 8px 20px -8px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    background: ${palette.sea};
    transform: translateY(-2px);
    box-shadow: 0 12px 30px -10px rgba(10, 126, 164, 0.4);
  }
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateX(4px);
  }
`;

const GuidesPage: React.FC = () => {
  const guides = [
    {
      id: 1,
      icon: Plane,
      badge: 'Best-Seller',
      title: 'Guide Voyage Majorque',
      price: '20€',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2070',
      description: 'Le guide complet pour découvrir les trésors cachés de Majorque. Plages secrètes, restaurants authentiques, bons plans locaux.',
      gradient: `linear-gradient(135deg, ${palette.sea} 0%, ${palette.seaDark} 100%)`,
      features: [
        'Les plus belles criques et plages secrètes',
        'Villages authentiques hors des sentiers battus',
        'Meilleurs restaurants testés (sans arnaques)',
        'Bons plans location voiture, parking, bus',
        'Réductions exclusives avec partenaires',
        'Mise à jour 2026 gratuite incluse'
      ],
      stats: { sold: '500+', rating: '5.0', reviews: '16' },
      link: '/guide'
    },
    {
      id: 2,
      icon: BookOpen,
      badge: 'Nouveau 2026',
      title: 'Guide Expatriation',
      price: '9,99€',
      image: 'https://images.unsplash.com/photo-1489749798305-4fea3ba63d60?q=80&w=2070',
      description: 'Tout pour réussir votre expatriation à Majorque et en Espagne. Démarches administratives, logement, travail, santé expliqués simplement.',
      gradient: `linear-gradient(135deg, ${palette.sand} 0%, ${palette.sandDark} 100%)`,
      features: [
        'Toutes les démarches administratives détaillées',
        'Trouver un logement rapidement (astuces)',
        'Opportunités emploi et vie sociale locale',
        'Santé, fiscalité, éducation',
        'Contacts directs et bons plans locaux',
        'Support direct par WhatsApp/Email'
      ],
      stats: { sold: '300+', rating: '5.0', reviews: '12' },
      link: '/guide-expatriation'
    }
  ];

  // Product schemas for both guides
  const productSchemas = [
    generateProductSchema(
      'Guide Digital Majorque 2026',
      'Le guide complet pour découvrir les trésors cachés de Majorque. Plages secrètes, restaurants authentiques, bons plans locaux.',
      'https://quefaireamajorque.com/img/guide-majorque-cover.webp',
      '20',
      'EUR',
      'https://quefaireamajorque.com/guide',
      'InStock',
      5.0,
      16
    ),
    generateProductSchema(
      'Guide Expatriation Espagne 2026',
      'Tout pour réussir votre expatriation à Majorque et en Espagne. Démarches administratives, logement, travail, santé.',
      'https://quefaireamajorque.com/img/guide-expatriation-cover.webp',
      '9.99',
      'EUR',
      'https://quefaireamajorque.com/guide-expatriation',
      'InStock',
      5.0,
      12
    )
  ];

  // ItemList schema for the collection
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Guides Majorque 2026",
    "description": "Collection de guides pour découvrir et s'installer à Majorque",
    "numberOfItems": 2,
    "itemListElement": guides.map((guide, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": guide.title,
      "url": `https://quefaireamajorque.com${guide.link}`
    }))
  };

  return (
    <PageContainer>
      <SEOHead 
        title="Nos Guides Majorque 2026 | Voyage & Expatriation"
        description="Découvrez nos guides complets pour Majorque : Guide Voyage pour les vacanciers et Guide Expatriation pour les futurs résidents. Écrits par un local."
        url="https://quefaireamajorque.com/guides"
        canonical="https://quefaireamajorque.com/guides"
        image="https://quefaireamajorque.com/img/guide2026.webp"
      />
      {/* Structured Data for Products */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([...productSchemas, itemListSchema])
        }}
      />
      <Header />
      
      {/* Hero */}
      <HeroSection>
        <HeroContent>
          <HeroBadge
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            ✨ Guides 2026 • Par un Local de l'Île
          </HeroBadge>
          
          <HeroTitle
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Choisissez Votre Guide Majorque
          </HeroTitle>
          
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Vacancier ou futur expatrié ? Nous avons le guide parfait pour vous, écrit par quelqu'un qui vit à Majorque depuis +10 ans.
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>
      
      {/* Guides Grid */}
      <GuidesSection>
        <Container>
          <GuidesGrid>
            {guides.map((guide, index) => (
              <GuideCard
                key={guide.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <GuideImage bgImage={guide.image} />
                
                <GuideHeader gradient={guide.gradient}>
                  <GuideBadge>{guide.badge}</GuideBadge>
                  <GuideIcon>
                    <guide.icon size={36} />
                  </GuideIcon>
                  <GuideTitle>{guide.title}</GuideTitle>
                  <GuidePrice>{guide.price}</GuidePrice>
                </GuideHeader>
                
                <GuideBody>
                  <GuideDescription>{guide.description}</GuideDescription>
                  
                  <SocialProof>
                    <SocialProofItem>
                      <Stars>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill="#FFD93D" />
                        ))}
                      </Stars>
                      <span>{guide.stats.rating}</span>
                    </SocialProofItem>
                    <SocialProofItem>
                      <Users size={16} />
                      <span>{guide.stats.sold} achetés</span>
                    </SocialProofItem>
                  </SocialProof>
                  
                  <FeaturesList>
                    {guide.features.map((feature, idx) => (
                      <FeatureItem key={idx}>
                        <Check size={18} />
                        <span>{feature}</span>
                      </FeatureItem>
                    ))}
                  </FeaturesList>
                  
                  <GuideCTA
                    href={guide.link}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Voir le Guide Complet
                    <ArrowRight size={20} />
                  </GuideCTA>
                </GuideBody>
              </GuideCard>
            ))}
          </GuidesGrid>
        </Container>
      </GuidesSection>
      
      <Footer />
    </PageContainer>
  );
};

export default GuidesPage;

