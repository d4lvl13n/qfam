import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { palette } from '../theme/mallorcaPalette';
import Header from './Header';
import HeroSection from './HeroSection';
import ArticleCarousel from './ArticleCarousel';
import ProductGrid from './ProductGrid';
import Footer from './Footer';
import SEOHead from './SEOHead';
import GoogleReviews from './GoogleReviews';
import WhoWeAre from './WhoWeAre';
import FinalCTA from './FinalCTA';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${palette.white};
  color: ${palette.ink};
  overflow-x: hidden;
  position: relative;
`;

const ScrollProgressBar = styled(motion.div)`
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, ${palette.sea}, ${palette.villageGreen}, ${palette.terracotta});
  transform-origin: 0%;
  z-index: 99;
  /* GPU acceleration */
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  will-change: transform;
  /* Prevent touch interactions */
  pointer-events: none;
  touch-action: none;
`;

const Section = styled.section<{ id?: string; background?: string }>`
  scroll-margin-top: 70px;
  background: ${props => props.background || 'transparent'};
`;

const LandingPageAlt: React.FC = () => {
  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = window.scrollY / totalHeight;
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <SEOHead />
      <PageContainer>
        <Header />
        
        <ScrollProgressBar
          style={{ scaleX: scrollProgress }}
          transition={{ type: "spring", stiffness: 400 }}
        />
        
        {/* Hero Section */}
        <HeroSection />

        {/* 4 Product Pillars Grid */}
        <Section id="products">
          <ProductGrid />
        </Section>
        
        {/* Recent Articles Carousel */}
        <Section background={palette.cream}>
          <ArticleCarousel 
            title="Articles Récents"
            subtitle="Les derniers bons plans et conseils"
            orderBy="date"
          />
        </Section>
        
        {/* Who We Are */}
        <Section id="about">
          <WhoWeAre />
        </Section>
        
        {/* Google Reviews */}
        <Section id="reviews" background={palette.cream}>
          <GoogleReviews />
        </Section>
        
        {/* Final CTA */}
        <FinalCTA />
        
        {/* Footer */}
        <Footer />
        
      </PageContainer>
    </>
  );
};

export default LandingPageAlt;

