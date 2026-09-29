import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { fonts } from '../theme/mallorcaPalette';

const Hero = styled.section`
  position: relative;
  width: 100%;
  min-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const BackgroundImage = styled.div`
  position: absolute;
  inset: 0;
  background-image: url('/img/QFAM 7.webp');
  background-size: cover;
  background-position: center;
  z-index: 0;
  transform: translateZ(0);
  pointer-events: none;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 40, 80, 0.45) 0%,
      rgba(0, 40, 80, 0.25) 40%,
      rgba(0, 40, 80, 0.55) 100%
    );
  }
`;

const ContentWrapper = styled(motion.div)`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 900px;
  padding: 2rem;
  text-align: center;
`;

const MainTitle = styled(motion.h1)`
  font-size: clamp(2.8rem, 7vw, 5rem);
  font-weight: 900;
  line-height: 1.05;
  color: white;
  font-family: ${fonts.heading};
  text-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
  margin: 0 0 1.25rem 0;
  letter-spacing: -0.02em;
  text-transform: uppercase;
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(0.9rem, 1.8vw, 1.15rem);
  color: rgba(255, 255, 255, 0.9);
  max-width: 650px;
  margin: 0 auto 2.5rem auto;
  line-height: 1.6;
  font-family: ${fonts.body};
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.02em;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;
  }
`;

const PrimaryButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.75rem;
  background: linear-gradient(135deg, #d4a053 0%, #b8863a 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  font-family: ${fonts.body};
  cursor: pointer;
  box-shadow: 0 4px 16px -4px rgba(180, 134, 58, 0.5);
  transition: all 0.3s ease;
  letter-spacing: 0.01em;

  &:hover {
    box-shadow: 0 8px 24px -4px rgba(180, 134, 58, 0.6);
    background: linear-gradient(135deg, #daa95c 0%, #c4933e 100%);
  }

  svg {
    width: 16px;
    height: 16px;
  }

  @media (max-width: 600px) {
    width: 100%;
    justify-content: center;
  }
`;

const SecondaryButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.75rem;
  background: rgba(255, 255, 255, 0.08);
  color: white;
  border: 1.5px solid rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  font-family: ${fonts.body};
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
  letter-spacing: 0.01em;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.8);
  }

  svg {
    width: 16px;
    height: 16px;
  }

  @media (max-width: 600px) {
    width: 100%;
    justify-content: center;
  }
`;

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Hero>
      <BackgroundImage />

      <ContentWrapper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <MainTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Que faire à Majorque ?
        </MainTitle>

        <Subtitle
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Visites guidées à Palma · Excursions en bateau · Location voiture · Guide 2026
        </Subtitle>

        <ButtonGroup
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <PrimaryButton
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/visite-de-palma-avec-guide-francophone')}
          >
            <ArrowRight size={18} />
            Réserver une visite guidée
          </PrimaryButton>

          <SecondaryButton
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/experiences/excursions-en-bateau')}
          >
            <ArrowRight size={18} />
            Voir les excursions en bateau
          </SecondaryButton>
        </ButtonGroup>
      </ContentWrapper>
    </Hero>
  );
};

export default HeroSection;
