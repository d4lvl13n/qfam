import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Heart, 
  Check, 
  MapPin, 
  Users, 
  Star,
  BookOpen,
  MessageCircle,
  FileText,
  Shield,
  Target
} from 'lucide-react';
import { palette, gradients, fonts } from '../theme/mallorcaPalette';
import Header from './Header';
import Footer from './Footer';
import SEOHead from './SEOHead';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${palette.white};
`;

// Hero Section
const HeroSection = styled.section`
  position: relative;
  min-height: 70vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, ${palette.cream} 0%, ${palette.sandLight} 50%, ${palette.white} 100%);
  overflow: hidden;
  
  @media (max-width: 768px) {
    min-height: auto;
    padding: 6rem 0 4rem;
  }
`;

const HeroBackground = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 80%;
    height: 150%;
    background: radial-gradient(circle, ${palette.sea}10 0%, transparent 70%);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: -10%;
    width: 60%;
    height: 100%;
    background: radial-gradient(circle, ${palette.terracotta}08 0%, transparent 60%);
  }
`;

const HeroContainer = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
`;

const HeroContent = styled(motion.div)`
  @media (max-width: 992px) {
    order: 2;
  }
`;

const HeroBadge = styled(motion.span)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${gradients.seaSky};
  color: white;
  border-radius: 2rem;
  font-weight: 600;
  font-size: 0.8rem;
  font-family: ${fonts.body};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 15px ${palette.sea}40;
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  font-family: ${fonts.heading};
  color: ${palette.ink};
  line-height: 1.15;
  margin: 0 0 1.5rem 0;
  
  span {
    background: ${gradients.seaSky};
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: ${palette.inkLight};
  font-family: ${fonts.body};
  line-height: 1.8;
  margin: 0 0 2rem 0;
  max-width: 500px;
  
  @media (max-width: 992px) {
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
`;

const HeroStats = styled(motion.div)`
  display: flex;
  gap: 2.5rem;
  
  @media (max-width: 992px) {
    justify-content: center;
  }
  
  @media (max-width: 480px) {
    gap: 1.5rem;
    flex-wrap: wrap;
  }
`;

const StatItem = styled.div`
  text-align: left;
  
  @media (max-width: 992px) {
    text-align: center;
  }
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  font-family: ${fonts.heading};
  color: ${palette.sea};
  line-height: 1;
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${palette.inkLight};
  font-family: ${fonts.body};
  margin-top: 0.25rem;
`;

const HeroImageWrapper = styled(motion.div)`
  position: relative;
  
  @media (max-width: 992px) {
    order: 1;
    max-width: 400px;
    margin: 0 auto;
  }
`;

const HeroImageContainer = styled.div`
  position: relative;
  border-radius: 2rem;
  overflow: hidden;
  box-shadow: 
    0 40px 80px -20px ${palette.sea}30,
    0 0 0 1px ${palette.sandDark}50;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 60%, ${palette.ink}20 100%);
    z-index: 1;
  }
`;

const HeroImage = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  display: block;
  
  @media (max-width: 768px) {
    height: 400px;
  }
`;

const FloatingCard = styled(motion.div)<{ top?: string; left?: string; right?: string; bottom?: string }>`
  position: absolute;
  top: ${props => props.top || 'auto'};
  left: ${props => props.left || 'auto'};
  right: ${props => props.right || 'auto'};
  bottom: ${props => props.bottom || 'auto'};
  background: white;
  padding: 1rem 1.25rem;
  border-radius: 1rem;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  z-index: 10;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const FloatingIcon = styled.div<{ color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 0.75rem;
  background: ${props => props.color}15;
  color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FloatingText = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${palette.ink};
  font-family: ${fonts.body};
`;

// Content Section
const ContentSection = styled.section`
  padding: 6rem 2rem;
  background: ${palette.white};
`;

const ContentContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const SectionBadge = styled(motion.span)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${palette.cream};
  color: ${palette.sea};
  border-radius: 2rem;
  font-weight: 600;
  font-size: 0.8rem;
  font-family: ${fonts.body};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 800;
  font-family: ${fonts.heading};
  color: ${palette.ink};
  margin: 0 0 1.5rem 0;
`;

const SectionDescription = styled(motion.p)`
  font-size: 1.1rem;
  color: ${palette.inkLight};
  font-family: ${fonts.body};
  line-height: 1.9;
  margin: 0 0 1.5rem 0;
`;

const SectionDetail = styled(motion.p)`
  font-size: 1rem;
  color: ${palette.inkLight};
  font-family: ${fonts.body};
  line-height: 1.8;
  margin: 0;
`;

// Commitment Points
const CommitmentList = styled(motion.ul)`
  list-style: none;
  padding: 0;
  margin: 1.5rem 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CommitmentItem = styled(motion.li)`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  font-size: 1.05rem;
  color: ${palette.ink};
  font-family: ${fonts.body};
  line-height: 1.7;
`;

const CheckIcon = styled.div`
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${gradients.seaSky};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
  box-shadow: 0 2px 8px rgba(10, 126, 164, 0.3);
`;

// Commitment Section
const ValuesSection = styled.section`
  padding: 6rem 2rem;
  background: ${palette.cream};
`;

const ValuesContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

// CTA Section
const CTASection = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(135deg, ${palette.sea} 0%, ${palette.seaDark} 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 80%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%);
  }
`;

const CTAContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 2;
`;

const CTATitle = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 800;
  font-family: ${fonts.heading};
  color: white;
  margin: 0 0 1rem 0;
`;

const CTASubtitle = styled(motion.p)`
  font-size: 1.15rem;
  color: rgba(255, 255, 255, 0.9);
  font-family: ${fonts.body};
  line-height: 1.7;
  margin: 0 0 2.5rem 0;
`;

const CTAButtons = styled(motion.div)`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const CTAButton = styled(Link)<{ variant?: 'primary' | 'secondary' }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: ${props => props.variant === 'secondary' ? 'transparent' : 'white'};
  color: ${props => props.variant === 'secondary' ? 'white' : palette.sea};
  font-size: 1rem;
  font-weight: 600;
  font-family: ${fonts.body};
  border-radius: 100px;
  text-decoration: none;
  border: 2px solid ${props => props.variant === 'secondary' ? 'rgba(255,255,255,0.3)' : 'white'};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    background: ${props => props.variant === 'secondary' ? 'rgba(255,255,255,0.1)' : 'white'};
    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.3);
  }
`;

const About: React.FC = () => {
  const { t } = useTranslation('about');

  const sections = [
    {
      key: 'mission',
      icon: Target,
      color: palette.sea,
      badge: t('about.mission.badge'),
      title: t('about.mission.title'),
      description: t('about.mission.description'),
      detail: t('about.mission.missionText')
    },
    {
      key: 'team',
      icon: Users,
      color: palette.villageGreen,
      badge: t('about.team.badge'),
      title: t('about.team.title'),
      description: t('about.team.description'),
      detail: t('about.team.detail')
    },
    {
      key: 'content',
      icon: FileText,
      color: palette.terracotta,
      badge: t('about.content.badge'),
      title: t('about.content.title'),
      description: t('about.content.description')
    },
    {
      key: 'services',
      icon: Shield,
      color: palette.seaDark,
      badge: t('about.services.badge'),
      title: t('about.services.title'),
      description: t('about.services.description')
    }
  ];

  return (
    <>
      <SEOHead 
        title="À propos | Que faire à Majorque"
        description="Découvrez Que Faire à Majorque, une agence de contenu et de services touristiques spécialisée dans la découverte authentique de l'île."
        url="https://quefaireamajorque.com/a-propos"
        canonical="https://quefaireamajorque.com/a-propos"
        image="https://quefaireamajorque.com/img/rony.webp"
      />
      <PageContainer>
        <Header />
        
        {/* Hero Section */}
        <HeroSection>
          <HeroBackground />
          <HeroContainer>
            <HeroContent
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <HeroBadge
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Heart size={14} />
                {t('about.badge')}
              </HeroBadge>
              
              <HeroTitle
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {t('about.hero.title')} <span>{t('about.hero.titleHighlight')}</span> !
              </HeroTitle>
              
              <HeroSubtitle
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {t('about.hero.subtitle')}
              </HeroSubtitle>
              
              <HeroStats
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <StatItem>
                  <StatValue>{t('about.hero.stat1.value')}</StatValue>
                  <StatLabel>{t('about.hero.stat1.label')}</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>{t('about.hero.stat2.value')}</StatValue>
                  <StatLabel>{t('about.hero.stat2.label')}</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>{t('about.hero.stat3.value')}</StatValue>
                  <StatLabel>{t('about.hero.stat3.label')}</StatLabel>
                </StatItem>
              </HeroStats>
            </HeroContent>
            
            <HeroImageWrapper
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <HeroImageContainer>
                <HeroImage src="/img/rony.webp" alt="Rony - Que faire à Majorque" />
              </HeroImageContainer>
              
              <FloatingCard
                top="-20px"
                right="-30px"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <FloatingIcon color={palette.sea}>
                  <MapPin size={20} />
                </FloatingIcon>
                <FloatingText>{t('about.hero.floatingCard1')}</FloatingText>
              </FloatingCard>
              
              <FloatingCard
                bottom="40px"
                left="-40px"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <FloatingIcon color={palette.villageGreen}>
                  <Star size={20} />
                </FloatingIcon>
                <FloatingText>{t('about.hero.floatingCard2')}</FloatingText>
              </FloatingCard>
            </HeroImageWrapper>
          </HeroContainer>
        </HeroSection>
        
        {/* Content Sections */}
        {sections.map((section, index) => (
          <ContentSection key={section.key}>
            <ContentContainer>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <SectionBadge>
                  <section.icon size={14} />
                  {section.badge}
                </SectionBadge>
                <SectionTitle>{section.title}</SectionTitle>
                <SectionDescription>{section.description}</SectionDescription>
                {section.detail && (
                  <SectionDetail>{section.detail}</SectionDetail>
                )}
              </motion.div>
            </ContentContainer>
          </ContentSection>
        ))}
        
        {/* Commitment Section */}
        <ValuesSection>
          <ValuesContainer>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ textAlign: 'center' }}
            >
              <SectionBadge>
                <Target size={14} />
                {t('about.commitment.badge')}
              </SectionBadge>
              <SectionTitle>{t('about.commitment.title')}</SectionTitle>
              <SectionDescription>{t('about.commitment.description')}</SectionDescription>
            </motion.div>
            
            <CommitmentList
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {(t('about.commitment.points', { returnObjects: true }) as string[]).map((point: string, index: number) => (
                <CommitmentItem
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <CheckIcon>
                    <Check size={14} />
                  </CheckIcon>
                  <span>{point}</span>
                </CommitmentItem>
              ))}
            </CommitmentList>
          </ValuesContainer>
        </ValuesSection>
        
        {/* CTA Section */}
        <CTASection>
          <CTAContainer>
            <CTATitle
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {t('about.cta.title')}
            </CTATitle>
            <CTASubtitle
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {t('about.cta.subtitle')}
            </CTASubtitle>
            <CTAButtons
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <CTAButton to="/guides">
                <BookOpen size={20} />
                {t('about.cta.button1')}
              </CTAButton>
              <CTAButton to="/contact" variant="secondary">
                <MessageCircle size={20} />
                {t('about.cta.button2')}
              </CTAButton>
            </CTAButtons>
          </CTAContainer>
        </CTASection>
        
        <Footer />
      </PageContainer>
    </>
  );
};

export default About;