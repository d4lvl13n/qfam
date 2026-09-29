import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { 
  Download,
  Check,
  Shield,
  Zap,
  Sparkles,
  Lock,
  CreditCard,
  ChevronRight,
  ArrowRight,
  Star,
  Clock,
  TrendingUp,
  Award,
  X,
  ChevronDown,
  Users
} from 'lucide-react';
import { palette, gradients, fonts } from '../theme/mallorcaPalette';
import Header from './Header';
import Footer from './Footer';
import SEOHead from './SEOHead';
import { generateProductSchema, generateFAQSchema } from '../utils/schemaMarkup';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${palette.white};
  overflow-x: hidden;
`;

// Floating CTA Sticky
const FloatingCTA = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, #FFD93D 0%, #F4A261 100%);
  padding: 1.25rem 2rem;
  z-index: 1000;
  box-shadow: 0 -10px 40px -10px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem 1.5rem;
    gap: 1rem;
  }
`;

const FloatingCTAContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
`;

const FloatingCTAPrice = styled.div`
  font-size: 2.5rem;
  font-weight: 900;
  color: #000;
  font-family: ${fonts.heading};
  line-height: 1;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const FloatingCTAText = styled.div`
  color: #000;
  font-family: ${fonts.body};
  
  strong {
    display: block;
    font-size: 1.125rem;
    font-weight: 800;
    margin-bottom: 0.25rem;
  }
  
  span {
    font-size: 0.875rem;
    opacity: 0.8;
  }
  
  @media (max-width: 768px) {
    strong {
      font-size: 1rem;
    }
    span {
      font-size: 0.8rem;
    }
  }
`;

const FloatingCTAButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem 2.5rem;
  background: #000;
  color: #FFD93D;
  font-weight: 800;
  font-size: 1.125rem;
  font-family: ${fonts.body};
  border-radius: 3rem;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
  white-space: nowrap;
  
  &:hover {
    background: #1a1a1a;
  }
  
  @media (max-width: 768px) {
    padding: 1rem 2rem;
    font-size: 1rem;
    width: 100%;
    justify-content: center;
  }
`;

// Hero immersif
const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%),
      url('https://images.unsplash.com/photo-1489749798305-4fea3ba63d60?q=80&w=2070') center/cover no-repeat;
    background-attachment: fixed;
    z-index: 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.5) 100%);
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1400px;
  width: 100%;
  padding: 8rem 2rem 4rem;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 6rem 1.5rem 3rem;
  }
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
  box-shadow: 0 20px 60px -15px rgba(255, 217, 61, 0.5);
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 5.5rem;
  font-weight: 900;
  color: white;
  line-height: 1;
  margin-bottom: 1.5rem;
  font-family: ${fonts.heading};
  text-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  letter-spacing: -0.03em;
  
  span {
    background: linear-gradient(135deg, #FFD93D 0%, #F4A261 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    display: block;
    margin-top: 0.5rem;
  }
  
  @media (max-width: 968px) {
    font-size: 3.5rem;
  }
  
  @media (max-width: 600px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.75rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  font-family: ${fonts.heading};
  font-style: italic;
  font-weight: 400;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 1.35rem;
  }
`;

const SocialProofBar = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

const SocialProofItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: white;
  font-family: ${fonts.body};
  font-weight: 600;
  font-size: 1.1rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Stars = styled.div`
  display: flex;
  gap: 0.25rem;
  color: #FFD93D;
`;

const CTAGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const HeroCTA = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 3rem;
  background: linear-gradient(135deg, #FFD93D 0%, #F4A261 100%);
  color: #000;
  font-weight: 800;
  font-size: 1.25rem;
  font-family: ${fonts.body};
  border-radius: 4rem;
  text-decoration: none;
  box-shadow: 0 20px 60px -15px rgba(255, 217, 61, 0.6);
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.3), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    padding: 1.25rem 2.5rem;
    font-size: 1.1rem;
  }
`;

const SecondaryCTA = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem 3rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  font-family: ${fonts.body};
  border-radius: 4rem;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
  }
  
  @media (max-width: 768px) {
    padding: 1.25rem 2.5rem;
    font-size: 1rem;
  }
`;

// Trust Bar
const TrustBar = styled.section`
  background: linear-gradient(135deg, ${palette.sea} 0%, ${palette.seaDark} 100%);
  padding: 3rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 2rem;
    padding: 2rem 1.5rem;
  }
`;

const TrustItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: white;
  text-align: center;
`;

const TrustNumber = styled.div`
  font-size: 3rem;
  font-weight: 900;
  font-family: ${fonts.heading};
  line-height: 1;
  color: #FFD93D;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const TrustLabel = styled.div`
  font-size: 1rem;
  font-family: ${fonts.body};
  opacity: 0.9;
  font-weight: 500;
`;

// Comparison Section
const ComparisonSection = styled.section`
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

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 5rem;
  
  @media (max-width: 768px) {
    margin-bottom: 3rem;
  }
`;

const SectionBadge = styled(motion.span)`
  display: inline-block;
  padding: 0.5rem 1.25rem;
  background: rgba(10, 126, 164, 0.08);
  border: 1px solid rgba(10, 126, 164, 0.15);
  border-radius: 2rem;
  color: ${palette.sea};
  font-weight: 600;
  font-size: 0.875rem;
  font-family: ${fonts.body};
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3.5rem;
  font-weight: 900;
  color: ${palette.ink};
  margin-bottom: 1.5rem;
  font-family: ${fonts.heading};
  line-height: 1.1;
  letter-spacing: -0.02em;
  
  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: ${palette.inkLight};
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.7;
  font-family: ${fonts.body};
`;

const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ComparisonCard = styled(motion.div)<{ negative?: boolean }>`
  padding: 3rem;
  background: ${props => props.negative ? '#fff' : 'linear-gradient(135deg, #10B981 0%, #059669 100%)'};
  border-radius: 2rem;
  border: ${props => props.negative ? '2px solid #EF4444' : 'none'};
  position: relative;
  box-shadow: 0 20px 60px -15px ${props => props.negative ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.3)'};
  
  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const ComparisonIcon = styled.div<{ negative?: boolean }>`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${props => props.negative ? '#FEE2E2' : 'rgba(255, 255, 255, 0.2)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.negative ? '#EF4444' : 'white'};
  margin-bottom: 1.5rem;
`;

const ComparisonTitle = styled.h3<{ negative?: boolean }>`
  font-size: 1.75rem;
  font-weight: 800;
  color: ${props => props.negative ? palette.ink : 'white'};
  margin-bottom: 1.5rem;
  font-family: ${fonts.heading};
`;

const ComparisonList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ComparisonItem = styled.li<{ negative?: boolean }>`
  display: flex;
  align-items: start;
  gap: 0.75rem;
  font-size: 1.05rem;
  color: ${props => props.negative ? palette.inkLight : 'rgba(255, 255, 255, 0.95)'};
  font-family: ${fonts.body};
  line-height: 1.6;
  
  svg {
    flex-shrink: 0;
    margin-top: 0.25rem;
  }
`;

// Testimonials Section
const TestimonialsSection = styled.section`
  padding: 8rem 2rem;
  background: #fff;
  
  @media (max-width: 768px) {
    padding: 5rem 1.5rem;
  }
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TestimonialCard = styled(motion.div)`
  padding: 2.5rem;
  background: white;
  border-radius: 2rem;
  border: 1px solid ${palette.sandDark};
  box-shadow: 0 4px 30px -10px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px -15px rgba(10, 126, 164, 0.25);
    border-color: ${palette.sea};
  }
`;

const TestimonialStars = styled.div`
  display: flex;
  gap: 0.25rem;
  color: #FFD93D;
  margin-bottom: 1rem;
`;

const TestimonialText = styled.p`
  font-size: 1rem;
  color: ${palette.ink};
  line-height: 1.7;
  margin-bottom: 1.5rem;
  font-family: ${fonts.body};
  font-style: italic;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const TestimonialAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${gradients.seaSky};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.125rem;
  font-family: ${fonts.heading};
`;

const TestimonialAuthorInfo = styled.div`
  flex: 1;
`;

const TestimonialAuthorName = styled.div`
  font-weight: 700;
  color: ${palette.ink};
  font-family: ${fonts.body};
  font-size: 0.95rem;
`;

const TestimonialAuthorDate = styled.div`
  font-size: 0.85rem;
  color: ${palette.inkLight};
  font-family: ${fonts.body};
`;

// FAQ Section
const FAQSection = styled.section`
  padding: 8rem 2rem;
  background: linear-gradient(135deg, ${palette.cream} 0%, ${palette.sandLight} 100%);
  
  @media (max-width: 768px) {
    padding: 5rem 1.5rem;
  }
`;

const FAQList = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FAQItem = styled(motion.div)`
  background: white;
  border-radius: 1.5rem;
  border: 1px solid ${palette.sandDark};
  overflow: hidden;
  box-shadow: 0 4px 20px -8px rgba(0, 0, 0, 0.08);
`;

const FAQQuestion = styled.button`
  width: 100%;
  padding: 2rem 2.5rem;
  background: none;
  border: none;
  text-align: left;
  font-size: 1.25rem;
  font-weight: 700;
  color: ${palette.ink};
  font-family: ${fonts.heading};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${palette.sea};
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem 1.5rem;
    font-size: 1.1rem;
  }
`;

const FAQAnswer = styled(motion.div)`
  padding: 0 2.5rem 2rem;
  font-size: 1.05rem;
  color: ${palette.inkLight};
  line-height: 1.8;
  font-family: ${fonts.body};
  
  @media (max-width: 768px) {
    padding: 0 1.5rem 1.5rem;
    font-size: 1rem;
  }
`;

// Value Proposition Section
const ValueSection = styled.section`
  padding: 8rem 2rem;
  background: linear-gradient(180deg, ${palette.sea} 0%, ${palette.seaDark} 100%);
  color: white;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 800px;
    height: 800px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
    border-radius: 50%;
  }
  
  @media (max-width: 768px) {
    padding: 5rem 1.5rem;
  }
`;

const ValueGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  position: relative;
  z-index: 2;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ValueCard = styled(motion.div)`
  text-align: center;
`;

const ValueIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 217, 61, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFD93D;
  margin: 0 auto 1.5rem;
  box-shadow: 0 10px 40px -10px rgba(255, 217, 61, 0.3);
`;

const ValueTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 800;
  margin-bottom: 1rem;
  font-family: ${fonts.heading};
`;

const ValueText = styled.p`
  font-size: 1.05rem;
  opacity: 0.9;
  line-height: 1.7;
  font-family: ${fonts.body};
`;

// Final CTA Section
const CTASection = styled.section`
  position: relative;
  padding: 10rem 2rem;
  background: 
    linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 100%),
    url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070') center/cover no-repeat;
  background-attachment: fixed;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.5) 100%);
  }
  
  @media (max-width: 768px) {
    padding: 6rem 1.5rem;
  }
`;

const CTAContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
`;

const CTATitle = styled(motion.h2)`
  font-size: 4rem;
  font-weight: 900;
  color: white;
  margin-bottom: 1.5rem;
  font-family: ${fonts.heading};
  line-height: 1.1;
  text-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const CTASubtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 3rem;
  font-family: ${fonts.body};
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const PriceTag = styled(motion.div)`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem 4rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(30px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 2rem;
  margin-bottom: 3rem;
  box-shadow: 0 30px 80px -20px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    padding: 2rem 3rem;
  }
`;

const Price = styled.div`
  font-size: 5rem;
  font-weight: 900;
  color: #FFD93D;
  font-family: ${fonts.heading};
  line-height: 1;
  text-shadow: 0 8px 30px rgba(255, 217, 61, 0.5);
  
  @media (max-width: 768px) {
    font-size: 4rem;
  }
`;

const PriceLabel = styled.span`
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.8);
  font-family: ${fonts.body};
  margin-top: 0.75rem;
`;

const SecurityBadges = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 3rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 2rem;
  }
`;

const SecurityBadge = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.9);
  font-family: ${fonts.body};
`;

const SecurityIconWrapper = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFD93D;
`;

const GuideLanding2: React.FC = () => {
  const { t } = useTranslation('guideExpatiation');
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingCTA(window.scrollY > 800);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const testimonials = [
    {
      name: "Marie L.",
      text: "Grâce à ce guide, j'ai évité toutes les erreurs classiques d'expatriation. Les démarches administratives étaient un jeu d'enfant avec les explications claires et les contacts fournis.",
      stars: 5,
      date: "Il y a 2 mois"
    },
    {
      name: "Thomas D.",
      text: "Guide ultra complet ! J'ai trouvé un appartement en 2 semaines grâce aux astuces et plateformes recommandées. Le prix du guide est dérisoire comparé aux économies réalisées.",
      stars: 5,
      date: "Il y a 1 mois"
    },
    {
      name: "Julie & Marc",
      text: "Nous nous sommes expatriés en famille et ce guide nous a fait gagner des mois de recherche. Les infos sur l'éducation et la santé sont précieuses !",
      stars: 5,
      date: "Il y a 3 mois"
    },
    {
      name: "Alexandre P.",
      text: "J'hésitais à m'expatrier, mais ce guide m'a donné toutes les clés pour franchir le pas en toute sérénité. Rony connaît parfaitement les démarches et les pièges à éviter.",
      stars: 5,
      date: "Il y a 2 mois"
    },
    {
      name: "Camille R.",
      text: "Le meilleur investissement pour mon expatriation ! Tout y est : NIE, banco, empadronamiento... avec les bons contacts. Je recommande à 200% !",
      stars: 5,
      date: "Il y a 1 mois"
    },
    {
      name: "Laurent S.",
      text: "Guide clair, précis et à jour. Rony répond rapidement par WhatsApp si besoin. Un vrai accompagnement personnalisé pour moins de 10€ !",
      stars: 5,
      date: "Il y a 3 semaines"
    }
  ];

  const faqs = [
    {
      question: "Le guide est-il vraiment complet pour s'expatrier ?",
      answer: "Oui ! Toutes les démarches administratives, de la demande de NIE à l'ouverture de compte bancaire, en passant par le logement, le travail, la santé et l'éducation. Tout est expliqué étape par étape avec les contacts utiles."
    },
    {
      question: "Je dois connaître l'espagnol pour comprendre le guide ?",
      answer: "Non, le guide est en français et inclut le vocabulaire administratif espagnol traduit. Vous aurez aussi des phrases types pour communiquer avec les administrations."
    },
    {
      question: "Le guide vaut-il 9,99€ pour une expatriation ?",
      answer: "Absolument ! Vous économiserez des centaines d'euros en évitant les erreurs coûteuses (mauvais logement, assurance trop chère, etc.) et des dizaines d'heures de recherche. L'investissement le plus rentable de votre expatriation !"
    },
    {
      question: "Puis-je contacter l'auteur si j'ai des questions ?",
      answer: "Oui ! Rony est disponible par WhatsApp et email pour répondre à vos questions spécifiques. C'est un vrai accompagnement, pas juste un PDF."
    },
    {
      question: "Y a-t-il une garantie si le guide ne me convient pas ?",
      answer: "Oui, garantie 30 jours satisfait ou remboursé, sans condition. Si le guide ne vous aide pas, vous êtes remboursé intégralement."
    }
  ];

  // Product Schema for SEO
  const productSchema = generateProductSchema(
    'Guide Expatriation Espagne 2026',
    'Le guide complet pour réussir votre expatriation en Espagne. Toutes les démarches administratives (NIE, empadronamiento, compte bancaire), logement, travail, santé et éducation. Par un expatrié de +10 ans.',
    'https://quefaireamajorque.com/img/guide-expatriation-cover.webp',
    '9.99',
    'EUR',
    'https://quefaireamajorque.com/guide-expatriation',
    'InStock',
    4.9,
    300
  );

  // FAQ Schema for SEO
  const faqSchema = generateFAQSchema(faqs.map(faq => ({
    question: faq.question,
    answer: faq.answer
  })));

  return (
    <PageContainer>
      <SEOHead 
        title={t('meta.title')}
        description={t('meta.description')}
        url="https://quefaireamajorque.com/guide-expatriation"
        canonical="https://quefaireamajorque.com/guide-expatriation"
        image="https://quefaireamajorque.com/img/guide2025.webp"
      />
      {/* Structured Data for Product and FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([productSchema, faqSchema])
        }}
      />
      <Header />
      
      {/* Floating CTA Sticky */}
      {showFloatingCTA && (
        <FloatingCTA
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <FloatingCTAContent>
            <FloatingCTAPrice>9,99€</FloatingCTAPrice>
            <FloatingCTAText>
              <strong>Guide Expatriation Espagne 2026</strong>
              <span>Téléchargement immédiat • Paiement sécurisé</span>
            </FloatingCTAText>
          </FloatingCTAContent>
          <FloatingCTAButton
            href="https://buy.stripe.com/00g28P0iucHQdzOfZp"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <CreditCard size={22} />
            Acheter Maintenant
          </FloatingCTAButton>
        </FloatingCTA>
      )}
      
      {/* Hero avec double CTA */}
      <HeroSection>
        <HeroContent>
          <HeroBadge
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Sparkles size={18} />
            ✨ Guide Complet 2026 • Par un expatrié de +10 ans
          </HeroBadge>
          
          <HeroTitle
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t('hero.title')}
            <span>Majorque & Espagne 2026</span>
          </HeroTitle>
          
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Toutes les démarches expliquées par quelqu'un qui l'a fait (et qui vit ici depuis +10 ans)
          </HeroSubtitle>
          
          <SocialProofBar
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <SocialProofItem>
              <Stars>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="#FFD93D" />
                ))}
              </Stars>
              <span>5.0 Note</span>
            </SocialProofItem>
            <SocialProofItem>
              <Users size={24} />
              <span>300+ expatriés conquis</span>
            </SocialProofItem>
            <SocialProofItem>
              <Award size={24} />
              <span>Guide #1 Expatriation</span>
            </SocialProofItem>
          </SocialProofBar>
          
          <CTAGroup>
            <HeroCTA
              href="https://buy.stripe.com/00g28P0iucHQdzOfZp"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download size={24} />
              Obtenir le Guide • 9,99€
              <ArrowRight size={24} />
            </HeroCTA>
            
            <SecondaryCTA
              href="#testimonials"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              Voir les avis
              <ChevronDown size={20} />
            </SecondaryCTA>
          </CTAGroup>
        </HeroContent>
      </HeroSection>
      
      {/* Trust Bar */}
      <TrustBar>
        <TrustItem
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <TrustNumber>300+</TrustNumber>
          <TrustLabel>Expatriés aidés</TrustLabel>
        </TrustItem>
        <TrustItem
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <TrustNumber>5.0★</TrustNumber>
          <TrustLabel>Note moyenne</TrustLabel>
        </TrustItem>
        <TrustItem
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <TrustNumber>10+</TrustNumber>
          <TrustLabel>Ans d'expérience</TrustLabel>
        </TrustItem>
        <TrustItem
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <TrustNumber>100%</TrustNumber>
          <TrustLabel>Satisfait ou remboursé</TrustLabel>
        </TrustItem>
      </TrustBar>
      
      {/* Comparison Section */}
      <ComparisonSection>
        <Container>
          <SectionHeader>
            <SectionBadge
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              La différence
            </SectionBadge>
            <SectionTitle
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              S'Expatrier Seul vs Avec Notre Guide
            </SectionTitle>
            <SectionSubtitle
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Pourquoi des centaines d'expatriés ont choisi ce guide pour réussir leur installation
            </SectionSubtitle>
          </SectionHeader>
          
          <ComparisonGrid>
            <ComparisonCard
              negative
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <ComparisonIcon negative>
                <X size={32} />
              </ComparisonIcon>
              <ComparisonTitle negative>Sans Guide</ComparisonTitle>
              <ComparisonList>
                <ComparisonItem negative>
                  <X size={20} color="#EF4444" />
                  <span>Des semaines de recherche sur Google</span>
                </ComparisonItem>
                <ComparisonItem negative>
                  <X size={20} color="#EF4444" />
                  <span>Infos contradictoires et obsolètes</span>
                </ComparisonItem>
                <ComparisonItem negative>
                  <X size={20} color="#EF4444" />
                  <span>Erreurs coûteuses à répétition</span>
                </ComparisonItem>
                <ComparisonItem negative>
                  <X size={20} color="#EF4444" />
                  <span>Démarches administratives confuses</span>
                </ComparisonItem>
                <ComparisonItem negative>
                  <X size={20} color="#EF4444" />
                  <span>Loyers et services surpayés</span>
                </ComparisonItem>
                <ComparisonItem negative>
                  <X size={20} color="#EF4444" />
                  <span>Stress et perte de temps constant</span>
                </ComparisonItem>
              </ComparisonList>
            </ComparisonCard>
            
            <ComparisonCard
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <ComparisonIcon>
                <Check size={32} />
              </ComparisonIcon>
              <ComparisonTitle>Avec Notre Guide</ComparisonTitle>
              <ComparisonList>
                <ComparisonItem>
                  <Check size={20} />
                  <span>Toutes les infos centralisées (mis à jour 2026)</span>
                </ComparisonItem>
                <ComparisonItem>
                  <Check size={20} />
                  <span>Démarches détaillées étape par étape</span>
                </ComparisonItem>
                <ComparisonItem>
                  <Check size={20} />
                  <span>Évitez les pièges et arnaques classiques</span>
                </ComparisonItem>
                <ComparisonItem>
                  <Check size={20} />
                  <span>Contacts directs et bons plans locaux</span>
                </ComparisonItem>
                <ComparisonItem>
                  <Check size={20} />
                  <span>Économisez temps et argent</span>
                </ComparisonItem>
                <ComparisonItem>
                  <Check size={20} />
                  <span>Support direct par WhatsApp/Email</span>
                </ComparisonItem>
              </ComparisonList>
            </ComparisonCard>
          </ComparisonGrid>
        </Container>
      </ComparisonSection>
      
      {/* Testimonials */}
      <TestimonialsSection id="testimonials">
        <Container>
          <SectionHeader>
            <SectionBadge
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Témoignages
            </SectionBadge>
            <SectionTitle
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              300+ Expatriés Ravis
            </SectionTitle>
            <SectionSubtitle
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Ils ont réussi leur expatriation grâce au guide
            </SectionSubtitle>
          </SectionHeader>
          
          <TestimonialsGrid>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <TestimonialStars>
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star key={i} size={18} fill="#FFD93D" />
                  ))}
                </TestimonialStars>
                <TestimonialText>"{testimonial.text}"</TestimonialText>
                <TestimonialAuthor>
                  <TestimonialAvatar>
                    {testimonial.name.charAt(0)}
                  </TestimonialAvatar>
                  <TestimonialAuthorInfo>
                    <TestimonialAuthorName>{testimonial.name}</TestimonialAuthorName>
                    <TestimonialAuthorDate>{testimonial.date}</TestimonialAuthorDate>
                  </TestimonialAuthorInfo>
                </TestimonialAuthor>
              </TestimonialCard>
            ))}
          </TestimonialsGrid>
        </Container>
      </TestimonialsSection>
      
      {/* Value Proposition */}
      <ValueSection>
        <Container>
          <SectionHeader>
            <SectionBadge style={{ background: 'rgba(255, 217, 61, 0.15)', border: '1px solid rgba(255, 217, 61, 0.3)', color: '#FFD93D' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Votre investissement
            </SectionBadge>
            <SectionTitle style={{ color: 'white' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              9,99€ Qui Vous Font Économiser des Milliers
            </SectionTitle>
            <SectionSubtitle style={{ color: 'rgba(255, 255, 255, 0.8)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              L'investissement le plus rentable de votre expatriation
            </SectionSubtitle>
          </SectionHeader>
          
          <ValueGrid>
            <ValueCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <ValueIcon>
                <Clock size={36} />
              </ValueIcon>
              <ValueTitle>Gagnez 50h+ de Recherche</ValueTitle>
              <ValueText>
                Toutes les démarches concentrées au même endroit. Fini les forums contradictoires et les infos périmées sur Google.
              </ValueText>
            </ValueCard>
            
            <ValueCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <ValueIcon>
                <TrendingUp size={36} />
              </ValueIcon>
              <ValueTitle>Économisez 1000€+ en Erreurs</ValueTitle>
              <ValueText>
                Évitez les arnaques au logement, les assurances trop chères, les erreurs fiscales coûteuses. Payez le juste prix, pas le prix touriste.
              </ValueText>
            </ValueCard>
            
            <ValueCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <ValueIcon>
                <Shield size={36} />
              </ValueIcon>
              <ValueTitle>Support Direct Inclus</ValueTitle>
              <ValueText>
                Questions spécifiques ? Rony répond par WhatsApp/Email. Un vrai accompagnement personnalisé, pas juste un PDF abandonné.
              </ValueText>
            </ValueCard>
          </ValueGrid>
        </Container>
      </ValueSection>
      
      {/* FAQ */}
      <FAQSection>
        <Container>
          <SectionHeader>
            <SectionBadge
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Questions fréquentes
            </SectionBadge>
            <SectionTitle
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Vous Avez des Questions ?
            </SectionTitle>
          </SectionHeader>
          
          <FAQList>
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <FAQQuestion onClick={() => setOpenFAQ(openFAQ === index ? null : index)}>
                  {faq.question}
                  <ChevronDown 
                    size={24} 
                    style={{ 
                      transform: openFAQ === index ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease'
                    }} 
                  />
                </FAQQuestion>
                {openFAQ === index && (
                  <FAQAnswer
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {faq.answer}
                  </FAQAnswer>
                )}
              </FAQItem>
            ))}
          </FAQList>
        </Container>
      </FAQSection>
      
      {/* Final CTA */}
      <CTASection id="buy">
        <CTAContent>
          <CTATitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Prêt à Réussir Votre Expatriation ?
          </CTATitle>
          
          <CTASubtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Rejoignez 300+ expatriés qui ont transformé leur rêve en réalité
          </CTASubtitle>
          
          <PriceTag
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Price>9,99€</Price>
            <PriceLabel>Paiement unique • Accès à vie • Support inclus</PriceLabel>
          </PriceTag>
          
          <HeroCTA
            href="https://buy.stripe.com/00g28P0iucHQdzOfZp"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            <CreditCard size={24} />
            Télécharger Maintenant
            <ChevronRight size={24} />
          </HeroCTA>
          
          <SecurityBadges>
            {[
              { icon: Lock, text: 'Paiement 100% Sécurisé' },
              { icon: Zap, text: 'Accès Immédiat' }
            ].map((badge, index) => (
              <SecurityBadge
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <SecurityIconWrapper>
                  <badge.icon size={24} />
                </SecurityIconWrapper>
                <span>{badge.text}</span>
              </SecurityBadge>
            ))}
          </SecurityBadges>
        </CTAContent>
      </CTASection>
      
      <Footer />
    </PageContainer>
  );
};

export default GuideLanding2;
