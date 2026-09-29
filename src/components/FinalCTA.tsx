import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Sparkles, Check, Download } from 'lucide-react';
import { palette, gradients, fonts } from '../theme/mallorcaPalette';

// Animations
const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.05); opacity: 1; }
`;

const FinalCTASection = styled.section`
  padding: 8rem 2rem;
  background: linear-gradient(180deg, ${palette.cream} 0%, ${palette.white} 100%);
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 5rem 1.5rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Badge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: ${gradients.seaSky};
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 600;
  color: ${palette.white};
  font-family: ${fonts.body};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(10, 126, 164, 0.4);
  backdrop-filter: blur(10px);
  width: fit-content;
  margin: 0 auto 1.5rem auto;
  
  @media (max-width: 768px) {
    font-size: 0.65rem;
    padding: 5px 10px;
  }
`;

const SparkleIcon = styled(Sparkles)`
  width: 14px;
  height: 14px;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const Title = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 700;
  text-align: center;
  margin: 0 0 0.75rem 0;
  font-family: ${fonts.heading};
  line-height: 1.2;
  background: linear-gradient(
    135deg,
    ${palette.sea} 0%,
    ${palette.seaDark} 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1rem;
  color: ${palette.inkLight};
  text-align: center;
  margin: 0 auto 3rem auto;
  max-width: 600px;
  font-family: ${fonts.body};
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 2rem;
  }
`;

const CTAGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const GuideCard = styled(motion(Link))`
  background: linear-gradient(135deg, 
    ${palette.white} 0%, 
    ${palette.cream} 50%, 
    ${palette.sandLight} 100%
  );
  border-radius: 20px;
  box-shadow: 
    0 25px 50px -12px rgba(10, 126, 164, 0.25),
    0 0 0 1px ${palette.sandDark},
    inset 0 2px 4px rgba(255, 255, 255, 0.9);
  overflow: hidden;
  position: relative;
  text-decoration: none;
  color: ${palette.ink};
  display: flex;
  flex-direction: column;
  transition: all 0.4s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    animation: ${shimmer} 3s infinite;
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 
      0 35px 70px -15px rgba(10, 126, 164, 0.35),
      0 0 0 1px ${palette.sea},
      inset 0 2px 4px rgba(255, 255, 255, 0.95);
  }
`;

const CardBadgeContainer = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 5;
`;

const CardBadge = styled(motion.div)<{ bg?: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: ${props => props.bg || gradients.seaSky};
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 600;
  color: ${palette.white};
  font-family: ${fonts.body};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(10, 126, 164, 0.4);
  backdrop-filter: blur(10px);
  width: fit-content;
`;

const ImageContainer = styled.div<{ bgImage: string }>`
  position: relative;
  width: 100%;
  height: 180px;
  background-image: url('${props => props.bgImage}');
  background-size: cover;
  background-position: center;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      transparent 0%,
      transparent 40%,
      rgba(0, 0, 0, 0.05) 100%
    );
  }
  
  @media (max-width: 768px) {
    height: 160px;
  }
`;

const TextContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
  
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const GuideTitle = styled.h3`
  font-family: ${fonts.heading};
  font-size: 1.3rem;
  font-weight: 700;
  color: ${palette.ink};
  margin: 0 0 8px 0;
  line-height: 1.2;
  background: linear-gradient(
    135deg,
    ${palette.sea} 0%,
    ${palette.seaDark} 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 1.15rem;
  }
`;

const GuidePrice = styled.div`
  font-size: 2rem;
  font-weight: 800;
  background: ${gradients.seaSky};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin: 0.5rem 0 12px 0;
  font-family: ${fonts.heading};
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const GuideSocialProof = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${palette.sea};
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 12px;
  font-family: ${fonts.body};
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 16px 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
`;

const FeatureItem = styled(motion.li)`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-family: ${fonts.body};
  font-size: 0.8rem;
  color: ${palette.ink};
  line-height: 1.3;
`;

const CheckIcon = styled.div`
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${gradients.seaSky};
  color: ${palette.white};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1px;
`;

const GuideCTA = styled(motion.div)`
  width: 100%;
  padding: 14px 20px;
  background: ${gradients.seaSky};
  border: none;
  border-radius: 12px;
  color: ${palette.white};
  font-family: ${fonts.body};
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 10px 25px -5px rgba(10, 126, 164, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
  text-decoration: none;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }
  
  ${GuideCard}:hover &::before {
    width: 300px;
    height: 300px;
  }
  
  ${GuideCard}:hover & {
    transform: translateY(-2px);
    box-shadow: 
      0 15px 35px -5px rgba(10, 126, 164, 0.5),
      0 0 0 1px rgba(255, 255, 255, 0.2) inset;
  }
  
  @media (max-width: 768px) {
    padding: 12px 16px;
    font-size: 0.85rem;
  }
`;

const ButtonText = styled.span`
  position: relative;
  z-index: 1;
`;

const TrustBar = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.9) 0%, 
    rgba(255, 255, 255, 0.95) 100%
  );
  backdrop-filter: blur(20px);
  border: 1px solid ${palette.sandDark};
  border-radius: 20px;
  color: ${palette.ink};
  font-size: 1rem;
  font-weight: 500;
  font-family: ${fonts.body};
  flex-wrap: wrap;
  box-shadow: 
    0 10px 30px -12px rgba(10, 126, 164, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 1.25rem 1.5rem;
    text-align: center;
  }
`;

const FinalCTA: React.FC = () => {
  const { t } = useTranslation('finalCTA');

  return (
    <FinalCTASection>
      <Container>
        <Badge
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <SparkleIcon />
          <span>{t('badge')}</span>
        </Badge>

        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t('title')}
        </Title>

        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t('subtitle')}
        </Subtitle>

        <CTAGrid>
          <GuideCard
            to="/guide"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <CardBadgeContainer>
              <CardBadge
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
              >
                <Sparkles size={12} />
                <span>Nouveau</span>
              </CardBadge>
            </CardBadgeContainer>
            
            <ImageContainer bgImage="/img/Images/guide-cover.webp" />
            
            <TextContent>
              <GuideTitle>{t('guideTravel.title')}</GuideTitle>
              <GuidePrice>{t('guideTravel.price')}</GuidePrice>
              <GuideSocialProof>
                <Star size={16} fill="currentColor" />
                {t('guideTravel.socialProof')}
              </GuideSocialProof>
              
              <FeaturesList>
                <FeatureItem
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <CheckIcon>
                    <Check size={11} />
                  </CheckIcon>
                  <span>PDF instantané avec liens cliquables</span>
                </FeatureItem>
                <FeatureItem
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <CheckIcon>
                    <Check size={11} />
                  </CheckIcon>
                  <span>132 pages de vrais bons plans</span>
                </FeatureItem>
                <FeatureItem
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                >
                  <CheckIcon>
                    <Check size={11} />
                  </CheckIcon>
                  <span>Guide pratique à lire sans besoin de connexion</span>
                </FeatureItem>
              </FeaturesList>

              <GuideCTA
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download size={18} style={{ position: 'relative', zIndex: 1 }} />
                <ButtonText>{t('guideTravel.cta')}</ButtonText>
                <ArrowRight size={18} style={{ position: 'relative', zIndex: 1 }} />
              </GuideCTA>
            </TextContent>
          </GuideCard>

          <GuideCard
            to="/guide-expatriation"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
          >
            <CardBadgeContainer>
              <CardBadge
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                bg={gradients.sunsetWarm}
              >
                <Shield size={12} />
                <span>Essentiel</span>
              </CardBadge>
            </CardBadgeContainer>
            
            <ImageContainer bgImage="/img/guide-expat.webp" />
            
            <TextContent>
              <GuideTitle>{t('guideExpat.title')}</GuideTitle>
              <GuidePrice>{t('guideExpat.price')}</GuidePrice>
              <GuideSocialProof>
                <Star size={16} fill="currentColor" />
                {t('guideExpat.socialProof')}
              </GuideSocialProof>
              
              <FeaturesList>
                <FeatureItem
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <CheckIcon>
                    <Check size={11} />
                  </CheckIcon>
                  <span>PDF instantané</span>
                </FeatureItem>
                <FeatureItem
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                >
                  <CheckIcon>
                    <Check size={11} />
                  </CheckIcon>
                  <span>Conseils pratiques</span>
                </FeatureItem>
                <FeatureItem
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                >
                  <CheckIcon>
                    <Check size={11} />
                  </CheckIcon>
                  <span>Support inclus</span>
                </FeatureItem>
              </FeaturesList>
              
              <GuideCTA
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download size={18} style={{ position: 'relative', zIndex: 1 }} />
                <ButtonText>{t('guideExpat.cta')}</ButtonText>
                <ArrowRight size={18} style={{ position: 'relative', zIndex: 1 }} />
              </GuideCTA>
            </TextContent>
          </GuideCard>
        </CTAGrid>

        <TrustBar
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {t('trust')}
        </TrustBar>
      </Container>
    </FinalCTASection>
  );
};

export default FinalCTA;

