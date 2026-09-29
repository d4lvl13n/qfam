import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Heart, Check } from 'lucide-react';
import { palette, gradients, fonts } from '../theme/mallorcaPalette';

const Section = styled.section`
  position: relative;
  background: linear-gradient(180deg, ${palette.cream} 0%, ${palette.white} 100%);
  padding: 8rem 2rem;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 5rem 1.5rem;
  }
`;

const Container = styled.div`
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
`;

const PremiumCard = styled(motion.div)`
  position: relative;
  background: linear-gradient(135deg, 
    ${palette.white} 0%, 
    ${palette.cream} 50%, 
    ${palette.sandLight} 100%
  );
  border-radius: 2.5rem;
  box-shadow: 
    0 30px 80px -20px rgba(10, 126, 164, 0.2),
    0 0 0 1px ${palette.sandDark},
    inset 0 2px 4px rgba(255, 255, 255, 0.9);
  overflow: hidden;
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  min-height: 500px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`;

const ImageSide = styled(motion.div)`
  position: relative;
  overflow: hidden;
  background: ${gradients.beachNatural};
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to right,
      transparent 0%,
      transparent 70%,
      rgba(254, 243, 199, 0.3) 100%
    );
    z-index: 2;
  }
  
  @media (max-width: 992px) {
    min-height: 300px;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.6s ease;
  
  ${PremiumCard}:hover & {
    transform: scale(1.05);
  }
`;

const ContentSide = styled(motion.div)`
  padding: 3.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  
  @media (max-width: 992px) {
    padding: 2.5rem 2rem;
  }
  
  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const Badge = styled(motion.span)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${gradients.seaSky};
  color: white;
  border-radius: 2rem;
  font-weight: 600;
  font-size: 0.75rem;
  font-family: ${fonts.body};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(10, 126, 164, 0.4);
  width: fit-content;
`;

const Title = styled(motion.h2)`
  font-family: ${fonts.heading};
  font-weight: 800;
  font-size: clamp(2rem, 4vw, 2.75rem);
  background: linear-gradient(
    135deg,
    ${palette.sea} 0%,
    ${palette.seaDark} 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 1rem 0;
  line-height: 1.2;
`;

const Excerpt = styled(motion.p)`
  font-family: ${fonts.body};
  color: ${palette.inkLight};
  line-height: 1.8;
  font-size: 1.05rem;
  margin: 0 0 2rem 0;
`;

const FeaturesList = styled(motion.ul)`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FeatureItem = styled(motion.li)`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-family: ${fonts.body};
  font-size: 0.95rem;
  color: ${palette.ink};
  line-height: 1.5;
`;

const CheckIcon = styled.div`
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${gradients.seaSky};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
  box-shadow: 0 2px 8px rgba(10, 126, 164, 0.3);
`;

const CTAButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.1rem 2rem;
  border-radius: 1rem;
  background: ${gradients.seaSky};
  border: none;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  font-family: ${fonts.body};
  cursor: pointer;
  box-shadow: 
    0 10px 25px -5px rgba(10, 126, 164, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  width: fit-content;
  
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

  &:hover::before {
    width: 300px;
    height: 300px;
  }

  svg {
    transition: transform 0.3s ease;
    position: relative;
    z-index: 1;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 15px 35px -5px rgba(10, 126, 164, 0.5),
      0 0 0 1px rgba(255, 255, 255, 0.2) inset;

    svg {
      transform: translateX(4px);
    }
  }
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const WhoWeAre: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('common');

  return (
    <Section>
      <Container>
        <PremiumCard
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.01 }}
        >
          <ImageSide
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ProfileImage 
              src="/img/rony.webp" 
              alt="Rony - Que faire à Majorque"
            />
          </ImageSide>
          
          <ContentSide
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Badge
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
            >
              <Heart size={14} />
              À propos
            </Badge>
            
            <Title
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {t('home.about.title')}
            </Title>
            
            <Excerpt
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {t('home.about.excerpt')}
            </Excerpt>
            
            <FeaturesList
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <FeatureItem
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                <CheckIcon>
                  <Check size={12} />
                </CheckIcon>
                <span>{t('home.about.feature1')}</span>
              </FeatureItem>
              <FeatureItem
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 }}
              >
                <CheckIcon>
                  <Check size={12} />
                </CheckIcon>
                <span>{t('home.about.feature2')}</span>
              </FeatureItem>
              <FeatureItem
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.0 }}
              >
                <CheckIcon>
                  <Check size={12} />
                </CheckIcon>
                <span>{t('home.about.feature3')}</span>
              </FeatureItem>
            </FeaturesList>
            
            <CTAButton
              onClick={() => navigate('/a-propos')}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('home.about.cta')}
              <ArrowRight size={18} />
            </CTAButton>
          </ContentSide>
        </PremiumCard>
      </Container>
    </Section>
  );
};

export default WhoWeAre;


