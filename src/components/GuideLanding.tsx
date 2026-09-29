import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  ChevronLeft,
  Star,
  Clock,
  TrendingUp,
  X,
  ChevronDown,
  Users,
  BookOpen,
  Eye
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

// Hero immersif avec double CTA
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
      linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.5) 100%),
      url('/img/Images/majorca-4009529_1920.webp') center/cover no-repeat;
    background-attachment: fixed;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.3) 100%);
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1400px;
  width: 100%;
  padding: 8rem 2rem 4rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 3rem;
  }

  @media (max-width: 768px) {
    padding: 6rem 1.5rem 3rem;
  }
`;

const HeroTextContent = styled.div`
  order: 2;

  @media (max-width: 968px) {
    order: 2;
  }
`;

const HeroLeftImageContainer = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  order: 1;

  @media (max-width: 968px) {
    order: 1;
  }
`;

const GuidePreviewImage = styled(motion.img)`
  width: 100%;
  max-width: 420px;
  height: auto;
  border-radius: 16px;
  box-shadow:
    0 0 0 4px rgba(255, 217, 61, 0.4),
    0 0 0 10px rgba(255, 217, 61, 0.2),
    0 0 60px 15px rgba(255, 217, 61, 0.25),
    0 40px 80px -20px rgba(0, 0, 0, 0.5);
  transform: perspective(1000px) rotateY(5deg) rotateX(-2deg);
  transition: all 0.5s ease;

  &:hover {
    transform: perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1.02);
    box-shadow:
      0 0 0 4px rgba(255, 217, 61, 0.6),
      0 0 0 10px rgba(255, 217, 61, 0.3),
      0 0 80px 20px rgba(255, 217, 61, 0.35),
      0 50px 100px -20px rgba(0, 0, 0, 0.6);
  }

  @media (max-width: 968px) {
    max-width: 320px;
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
  font-size: 4.5rem;
  font-weight: 900;
  color: white;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  font-family: ${fonts.heading};
  text-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  letter-spacing: -0.03em;
  text-align: left;

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
    text-align: center;
  }

  @media (max-width: 600px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  font-family: ${fonts.heading};
  font-style: italic;
  font-weight: 400;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  max-width: 600px;
  text-align: left;

  @media (max-width: 968px) {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const SocialProofBar = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;

  @media (max-width: 968px) {
    justify-content: center;
  }

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
  justify-content: flex-start;
  gap: 1rem;

  @media (max-width: 968px) {
    justify-content: center;
    flex-wrap: wrap;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const HeroCTA = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem 2rem;
  background: linear-gradient(135deg, #FFD93D 0%, #F4A261 100%);
  color: #000;
  font-weight: 800;
  font-size: 1.1rem;
  font-family: ${fonts.body};
  border-radius: 4rem;
  text-decoration: none;
  box-shadow: 0 20px 60px -15px rgba(255, 217, 61, 0.6);
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;

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
    padding: 1rem 1.75rem;
    font-size: 1rem;
  }
`;

const SecondaryCTA = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1.25rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  font-weight: 700;
  font-size: 1rem;
  font-family: ${fonts.body};
  border-radius: 4rem;
  text-decoration: none;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
  }

  @media (max-width: 768px) {
    padding: 1rem 1.75rem;
    font-size: 0.95rem;
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

// Comparison Section (Avant/Après)
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

// Ebook Preview Section — Immersive Carousel
const PreviewSection = styled.section`
  padding: 6rem 0 8rem;
  background: linear-gradient(180deg, ${palette.ink} 0%, #1a2a38 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 120px;
    background: linear-gradient(180deg, ${palette.cream} 0%, transparent 100%);
    z-index: 1;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 4rem 0 5rem;
  }
`;

const PreviewHeaderWrapper = styled.div`
  padding: 0 2rem;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const PreviewSectionBadge = styled(motion.span)`
  display: inline-block;
  padding: 0.5rem 1.25rem;
  background: rgba(255, 217, 61, 0.15);
  border: 1px solid rgba(255, 217, 61, 0.3);
  border-radius: 2rem;
  color: #FFD93D;
  font-weight: 600;
  font-size: 0.875rem;
  font-family: ${fonts.body};
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const PreviewSectionTitle = styled(motion.h2)`
  font-size: 3.5rem;
  font-weight: 900;
  color: white;
  margin-bottom: 1rem;
  font-family: ${fonts.heading};
  line-height: 1.1;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

const PreviewSectionSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.7);
  max-width: 700px;
  margin: 0 auto 1rem;
  line-height: 1.7;
  font-family: ${fonts.body};
`;

const CarouselWrapper = styled.div`
  position: relative;
  margin-top: 3rem;
`;

const CarouselTrack = styled.div`
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  padding: 2rem 2rem 3rem;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    gap: 1rem;
    padding: 1.5rem 1rem 2.5rem;
  }
`;

const PageCard = styled(motion.div)<{ $isActive?: boolean }>`
  flex: 0 0 auto;
  width: 320px;
  scroll-snap-align: center;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  background: white;
  box-shadow: ${props => props.$isActive
    ? '0 30px 80px -15px rgba(255, 217, 61, 0.4), 0 0 0 2px rgba(255, 217, 61, 0.6)'
    : '0 20px 60px -15px rgba(0, 0, 0, 0.5)'};
  transition: box-shadow 0.4s ease;

  &:first-child {
    margin-left: calc(50vw - 160px);
  }

  &:last-child {
    margin-right: calc(50vw - 160px);
  }

  &:hover {
    box-shadow: 0 30px 80px -15px rgba(255, 217, 61, 0.35), 0 0 0 2px rgba(255, 217, 61, 0.5);
  }

  @media (max-width: 768px) {
    width: 260px;

    &:first-child {
      margin-left: calc(50vw - 130px);
    }

    &:last-child {
      margin-right: calc(50vw - 130px);
    }
  }

  @media (max-width: 480px) {
    width: 220px;

    &:first-child {
      margin-left: calc(50vw - 110px);
    }

    &:last-child {
      margin-right: calc(50vw - 110px);
    }
  }
`;

const PageCardInner = styled.div`
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
`;

const PageCardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);

  ${PageCard}:hover & {
    transform: scale(1.04);
  }
`;

const PageCardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 40%, rgba(0, 0, 0, 0.7) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;

  ${PageCard}:hover & {
    opacity: 1;
  }
`;

const PageCardLabel = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.25rem;
  color: white;
  font-family: ${fonts.body};
  transform: translateY(100%);
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);

  ${PageCard}:hover & {
    transform: translateY(0);
  }
`;

const PageCardTitle = styled.div`
  font-weight: 700;
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
  line-height: 1.3;
`;

const PageCardCategory = styled.div`
  font-size: 0.75rem;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const PageIndicator = styled.div`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  color: white;
  font-family: ${fonts.body};
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.3rem 0.6rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const CarouselControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
  padding: 0 2rem;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

const CarouselArrow = styled(motion.button)`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 217, 61, 0.2);
    border-color: rgba(255, 217, 61, 0.4);
    color: #FFD93D;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const CarouselDots = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const CarouselDot = styled.button<{ $active: boolean }>`
  width: ${props => props.$active ? '24px' : '8px'};
  height: 8px;
  border-radius: 4px;
  border: none;
  background: ${props => props.$active ? '#FFD93D' : 'rgba(255, 255, 255, 0.3)'};
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;

  &:hover {
    background: ${props => props.$active ? '#FFD93D' : 'rgba(255, 255, 255, 0.5)'};
  }
`;

const PreviewCTAWrapper = styled(motion.div)`
  text-align: center;
  margin-top: 3rem;
  padding: 0 2rem;
`;

const PreviewCTAButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem 2.5rem;
  background: linear-gradient(135deg, #FFD93D 0%, #F4A261 100%);
  color: #000;
  font-weight: 800;
  font-size: 1.1rem;
  font-family: ${fonts.body};
  border-radius: 4rem;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 20px 60px -15px rgba(255, 217, 61, 0.5);
  position: relative;
  overflow: hidden;

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
    padding: 1rem 2rem;
    font-size: 1rem;
  }
`;

// Lightbox
const LightboxOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.92);
  backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: zoom-out;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const LightboxContent = styled(motion.div)`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  cursor: default;
`;

const LightboxImage = styled(motion.img)`
  max-width: 100%;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.8);
`;

const LightboxClose = styled(motion.button)`
  position: absolute;
  top: -3rem;
  right: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    top: -2.5rem;
  }
`;

const LightboxCaption = styled(motion.div)`
  position: absolute;
  bottom: -3rem;
  left: 0;
  right: 0;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  font-family: ${fonts.body};
  font-size: 0.9rem;

  strong {
    color: white;
    font-weight: 700;
  }
`;

const LightboxNav = styled(motion.button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 217, 61, 0.2);
    border-color: rgba(255, 217, 61, 0.4);
    color: #FFD93D;
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
  }
`;

const LightboxPrev = styled(LightboxNav)`
  left: -4rem;

  @media (max-width: 968px) {
    left: -2.5rem;
  }

  @media (max-width: 768px) {
    left: -0.5rem;
  }
`;

const LightboxNext = styled(LightboxNav)`
  right: -4rem;

  @media (max-width: 968px) {
    right: -2.5rem;
  }

  @media (max-width: 768px) {
    right: -0.5rem;
  }
`;

const GradientEdge = styled.div<{ $side: 'left' | 'right' }>`
  position: absolute;
  top: 0;
  bottom: 0;
  ${props => props.$side}: 0;
  width: 80px;
  background: linear-gradient(
    ${props => props.$side === 'left' ? '90deg' : '270deg'},
    ${palette.ink} 0%,
    transparent 100%
  );
  z-index: 3;
  pointer-events: none;

  @media (max-width: 768px) {
    width: 40px;
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
    url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070') center/cover no-repeat;
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

const GuideLanding: React.FC = () => {
  const { t } = useTranslation('guideLanding');
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const ebookPages = [
    { src: '/guides/sommaire.webp', title: 'Sommaire', category: 'Table des matières' },
    { src: '/guides/introduction.webp', title: 'Introduction', category: 'Bienvenue' },
    { src: '/guides/playa-de-formentor.webp', title: 'Playa de Formentor', category: 'Plages' },
    { src: '/guides/restaurant-palma.webp', title: 'Restaurants à Palma', category: 'Gastronomie' },
    { src: '/guides/la-gran-tortuga.webp', title: 'La Gran Tortuga', category: 'Bons plans locaux' },
    { src: '/guides/conduire-majorque.webp', title: 'Conduire à Majorque', category: 'Conseils pratiques' },
    { src: '/guides/soiree-tapas.webp', title: 'Soirée Tapas', category: 'Sorties' },
    { src: '/guides/dauphins.webp', title: 'Nager avec les Dauphins', category: 'Activités' },
    { src: '/guides/faire-la-fete.webp', title: 'Faire la Fête', category: 'Vie nocturne' },
    { src: '/guides/infos-utiles.webp', title: 'Infos Utiles', category: 'Avant de partir' },
  ];

  const scrollToSlide = useCallback((index: number) => {
    if (!carouselRef.current) return;
    const track = carouselRef.current;
    const cards = track.children;
    if (cards[index]) {
      const card = cards[index] as HTMLElement;
      const trackRect = track.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const scrollLeft = track.scrollLeft + (cardRect.left - trackRect.left) - (trackRect.width / 2) + (cardRect.width / 2);
      track.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
    setActiveSlide(index);
  }, []);

  const handleCarouselScroll = useCallback(() => {
    if (!carouselRef.current) return;
    const track = carouselRef.current;
    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;
    Array.from(track.children).forEach((child, index) => {
      const el = child as HTMLElement;
      const elCenter = el.offsetLeft + el.offsetWidth / 2;
      const distance = Math.abs(trackCenter - elCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });
    setActiveSlide(closestIndex);
  }, []);

  // Lightbox keyboard nav + body scroll lock
  useEffect(() => {
    if (lightboxIndex === null) return;
    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex(prev => prev !== null ? Math.min(ebookPages.length - 1, prev + 1) : null);
      if (e.key === 'ArrowLeft') setLightboxIndex(prev => prev !== null ? Math.max(0, prev - 1) : null);
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [lightboxIndex, ebookPages.length]);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingCTA(window.scrollY > 800);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const testimonials = [
    {
      name: "Cathy M.",
      text: "Grâce aux infos de Rony, nous avons découvert des endroits magnifiques avec une facilité incroyable. Ses conseils étaient justes et précieux. Merci à lui 🙏",
      stars: 5,
      date: "Il y a 3 mois"
    },
    {
      name: "Chloé H.",
      text: "Guide très complet ! Je recommande si vous voulez partir sans trop anticiper !",
      stars: 5,
      date: "Il y a 3 mois"
    },
    {
      name: "Mélanie D.",
      text: "Un guide virtuel complet, qui donne plein d'endroits magnifiques à découvrir pour un prix plus que correct ! Je recommande à 100%",
      stars: 5,
      date: "Il y a 3 mois"
    },
    {
      name: "Elvira",
      text: "Merci Rony pour les bons plans ! J'ai loué chez Offugo suite aux publications. Tarif défiant toute concurrence. Également pour toutes les bonnes adresses !",
      stars: 5,
      date: "Il y a 4 mois"
    },
    {
      name: "Sophie L.",
      text: "Guide très complet et extrêmement bien fait. Il m'a été d'une aide précieuse pour l'organisation de notre première visite. Bravo pour le travail accompli.",
      stars: 5,
      date: "Il y a 6 mois"
    },
    {
      name: "Sandra G.",
      text: "Très complet, des bonnes adresses, des lieux cachés, très bien illustré. Très sérieux. Merci",
      stars: 5,
      date: "Il y a 7 mois"
    }
  ];

  const faqs = [
    {
      question: "Le guide est-il vraiment à jour pour 2026 ?",
      answer: "Oui ! Le guide est mis à jour régulièrement avec les dernières informations, nouveaux restaurants, événements 2026, et bons plans actuels. Vous recevez gratuitement toutes les mises à jour."
    },
    {
      question: "Je reçois le guide immédiatement après paiement ?",
      answer: "Absolument ! Dès validation de votre paiement, vous recevez un email avec le lien de téléchargement. Le guide est au format PDF, accessible sur tous vos appareils (smartphone, tablette, ordinateur)."
    },
    {
      question: "Que faire si j'ai un problème avec le téléchargement ?",
      answer: "Contactez-nous directement par email (Quefaireamajorque@gmail.com) ou WhatsApp. Nous répondons en moins de 24h et vous renverrons le guide immédiatement."
    },
    {
      question: "Le guide vaut-il vraiment 20€ ?",
      answer: "Le guide vous fait économiser des centaines d'euros en pièges à touristes évités, et des dizaines d'heures de recherche. Il inclut aussi des réductions exclusives avec nos partenaires. Un investissement qui se rentabilise dès la première journée !"
    }
  ];

  // Product Schema for SEO
  const productSchema = generateProductSchema(
    'Guide Digital Majorque 2026',
    'Le guide complet pour découvrir Majorque comme un local. 132 pages avec les meilleures adresses, itinéraires, bons plans et conseils pratiques. Mise à jour gratuite incluse.',
    'https://quefaireamajorque.com/img/guide-majorque-cover.webp',
    '20',
    'EUR',
    'https://quefaireamajorque.com/guide',
    'InStock',
    4.9,
    127
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
        url="https://quefaireamajorque.com/guide"
        canonical="https://quefaireamajorque.com/guide"
        image="https://quefaireamajorque.com/img/guide2026.webp"
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
            <FloatingCTAPrice>20€</FloatingCTAPrice>
            <FloatingCTAText>
              <strong>Guide Digital Majorque 2026</strong>
              <span>Téléchargement immédiat • Paiement sécurisé</span>
            </FloatingCTAText>
          </FloatingCTAContent>
          <FloatingCTAButton
            href="https://buy.stripe.com/14A3cvfNu0337kx3C06c00G"
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
          <HeroLeftImageContainer
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <GuidePreviewImage
              src="/img/Images/guide1.webp"
              alt="Aperçu du Guide Majorque 2026"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
          </HeroLeftImageContainer>

          <HeroTextContent>
            <HeroBadge
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Sparkles size={18} />
              ✨ Édition 2026 • Mise à jour gratuite incluse
            </HeroBadge>

            <HeroTitle
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {t('hero.title')}
              <span>Majorque 2026</span>
            </HeroTitle>

            <HeroSubtitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Le seul guide écrit par un Français qui vit sur l'île depuis +10 ans
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
                <span>5.0 sur Google</span>
              </SocialProofItem>
              <SocialProofItem>
                <Users size={24} />
                <span>500+ voyageurs conquis</span>
              </SocialProofItem>
            </SocialProofBar>

            <CTAGroup>
              <HeroCTA
                href="https://buy.stripe.com/14A3cvfNu0337kx3C06c00G"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download size={24} />
                Obtenir le Guide • 20€
              </HeroCTA>

              <SecondaryCTA
                href="#testimonials"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                Voir les avis
                <ChevronDown size={20} />
              </SecondaryCTA>
            </CTAGroup>
          </HeroTextContent>
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
          <TrustNumber>500+</TrustNumber>
          <TrustLabel>Guides vendus</TrustLabel>
        </TrustItem>
        <TrustItem
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <TrustNumber>5.0★</TrustNumber>
          <TrustLabel>Note Google</TrustLabel>
        </TrustItem>
        <TrustItem
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <TrustNumber>10+</TrustNumber>
          <TrustLabel>Ans sur l'île</TrustLabel>
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
              Guide Traditionnel vs Guide Local
            </SectionTitle>
            <SectionSubtitle
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Pourquoi les voyageurs choisissent notre guide plutôt que le Routard ou Lonely Planet
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
              <ComparisonTitle negative>Guides Génériques</ComparisonTitle>
              <ComparisonList>
                <ComparisonItem negative>
                  <X size={20} color="#EF4444" />
                  <span>Informations datées et périmées</span>
                </ComparisonItem>
                <ComparisonItem negative>
                  <X size={20} color="#EF4444" />
                  <span>Pièges à touristes inclus</span>
                </ComparisonItem>
                <ComparisonItem negative>
                  <X size={20} color="#EF4444" />
                  <span>Lieux surpeuplés uniquement</span>
                </ComparisonItem>
                <ComparisonItem negative>
                  <X size={20} color="#EF4444" />
                  <span>Écrit par des journalistes de passage</span>
                </ComparisonItem>
                <ComparisonItem negative>
                  <X size={20} color="#EF4444" />
                  <span>Prix gonflés sans réductions</span>
                </ComparisonItem>
                <ComparisonItem negative>
                  <X size={20} color="#EF4444" />
                  <span>Aucune mise à jour après achat</span>
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
              <ComparisonTitle>Notre Guide Local</ComparisonTitle>
              <ComparisonList>
                <ComparisonItem>
                  <Check size={20} />
                  <span>Mis à jour en continu (gratuit)</span>
                </ComparisonItem>
                <ComparisonItem>
                  <Check size={20} />
                  <span>Spots secrets et vrais bons plans</span>
                </ComparisonItem>
                <ComparisonItem>
                  <Check size={20} />
                  <span>Lieux authentiques hors des sentiers battus</span>
                </ComparisonItem>
                <ComparisonItem>
                  <Check size={20} />
                  <span>Écrit par un local de l'île (10+ ans)</span>
                </ComparisonItem>
                <ComparisonItem>
                  <Check size={20} />
                  <span>Réductions exclusives avec partenaires</span>
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
      
      {/* Ebook Preview Section — Immersive Carousel */}
      <PreviewSection>
        <PreviewHeaderWrapper>
          <Container>
            <SectionHeader>
              <PreviewSectionBadge
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Eye size={14} /> Aperçu exclusif
              </PreviewSectionBadge>
              <PreviewSectionTitle
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Feuilletez le Guide
              </PreviewSectionTitle>
              <PreviewSectionSubtitle
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                132 pages de bons plans, adresses secrètes et itinéraires — glissez pour explorer
              </PreviewSectionSubtitle>
            </SectionHeader>
          </Container>
        </PreviewHeaderWrapper>

        <CarouselWrapper>
          <GradientEdge $side="left" />
          <GradientEdge $side="right" />

          <CarouselTrack
            ref={carouselRef}
            onScroll={handleCarouselScroll}
          >
            {ebookPages.map((page, index) => (
              <PageCard
                key={index}
                $isActive={activeSlide === index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(index * 0.08, 0.5) }}
                whileHover={{ y: -8 }}
                onClick={() => setLightboxIndex(index)}
              >
                <PageCardInner>
                  <PageCardImage
                    src={page.src}
                    alt={page.title}
                    loading="lazy"
                  />
                  <PageCardOverlay />
                  <PageIndicator>
                    <BookOpen size={10} />
                    {index + 1}/{ebookPages.length}
                  </PageIndicator>
                  <PageCardLabel>
                    <PageCardCategory>{page.category}</PageCardCategory>
                    <PageCardTitle>{page.title}</PageCardTitle>
                  </PageCardLabel>
                </PageCardInner>
              </PageCard>
            ))}
          </CarouselTrack>

          <CarouselControls>
            <CarouselArrow
              onClick={() => scrollToSlide(Math.max(0, activeSlide - 1))}
              disabled={activeSlide === 0}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={22} />
            </CarouselArrow>

            <CarouselDots>
              {ebookPages.map((_, index) => (
                <CarouselDot
                  key={index}
                  $active={activeSlide === index}
                  onClick={() => scrollToSlide(index)}
                />
              ))}
            </CarouselDots>

            <CarouselArrow
              onClick={() => scrollToSlide(Math.min(ebookPages.length - 1, activeSlide + 1))}
              disabled={activeSlide === ebookPages.length - 1}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight size={22} />
            </CarouselArrow>
          </CarouselControls>
        </CarouselWrapper>

        <PreviewCTAWrapper
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <PreviewCTAButton
            href="https://buy.stripe.com/14A3cvfNu0337kx3C06c00G"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download size={20} />
            Obtenir les 132 pages • 20€
            <ChevronRight size={20} />
          </PreviewCTAButton>
        </PreviewCTAWrapper>
      </PreviewSection>

      {/* Testimonials */}
      <TestimonialsSection id="testimonials">
        <Container>
          <SectionHeader>
            <SectionBadge
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Avis Google
            </SectionBadge>
            <SectionTitle
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              500+ Voyageurs Satisfaits
            </SectionTitle>
            <SectionSubtitle
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Note moyenne : 5.0/5 ⭐ sur Google
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
              20€ Qui Vous Font Économiser des Centaines
            </SectionTitle>
            <SectionSubtitle style={{ color: 'rgba(255, 255, 255, 0.8)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Un guide qui se rentabilise dès le premier jour de votre voyage
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
              <ValueTitle>Gagnez 20h de Recherche</ValueTitle>
              <ValueText>
                Toutes les infos concentrées au même endroit. Fini le temps perdu sur 15 blogs différents avec des infos contradictoires.
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
              <ValueTitle>Économisez 200€+ en Pièges</ValueTitle>
              <ValueText>
                Évitez les restos surpayés, les excursions trop chères, les locations de voiture hors de prix. Payez les prix locaux, pas les prix touristes.
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
              <ValueTitle>Réductions Partenaires</ValueTitle>
              <ValueText>
                Codes promo exclusifs avec Offugo (location voiture), Tiqets (billets), et nos restaurants partenaires. Le guide se rembourse seul !
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
            Prêt à Découvrir la Vraie Majorque ?
          </CTATitle>
          
          <CTASubtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Rejoignez 500+ voyageurs qui ont transformé leur séjour
          </CTASubtitle>
          
          <PriceTag
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Price>20€</Price>
            <PriceLabel>Paiement unique • Accès à vie • Mises à jour gratuites</PriceLabel>
          </PriceTag>
          
          <HeroCTA
            href="https://buy.stripe.com/14A3cvfNu0337kx3C06c00G"
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
      
      {/* Lightbox */}
      {lightboxIndex !== null && (
        <LightboxOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => setLightboxIndex(null)}
        >
          <LightboxContent
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <LightboxClose
              onClick={() => setLightboxIndex(null)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={20} />
            </LightboxClose>

            {lightboxIndex > 0 && (
              <LightboxPrev
                onClick={() => setLightboxIndex(lightboxIndex - 1)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft size={22} />
              </LightboxPrev>
            )}

            <LightboxImage
              key={lightboxIndex}
              src={ebookPages[lightboxIndex].src}
              alt={ebookPages[lightboxIndex].title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            />

            {lightboxIndex < ebookPages.length - 1 && (
              <LightboxNext
                onClick={() => setLightboxIndex(lightboxIndex + 1)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight size={22} />
              </LightboxNext>
            )}

            <LightboxCaption>
              <strong>{ebookPages[lightboxIndex].title}</strong> — {ebookPages[lightboxIndex].category} ({lightboxIndex + 1}/{ebookPages.length})
            </LightboxCaption>
          </LightboxContent>
        </LightboxOverlay>
      )}

      <Footer />
    </PageContainer>
  );
};

export default GuideLanding;
