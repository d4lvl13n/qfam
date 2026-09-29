import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { 
  X
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';
import SEOHead from './SEOHead';
import { palette, gradients, fonts } from '../theme/mallorcaPalette';

const GalleryPageContainer = styled.div`
  min-height: 100vh;
  background: ${gradients.beachNatural};
  padding-top: 70px;
`;

const HeroSection = styled.section`
  position: relative;
  min-height: calc(100vh - 70px);
  display: flex;
  align-items: center;
  overflow: hidden;
  background: ${gradients.beachNatural};
`;

const HeroContainer = styled.div`
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    height: calc(100vh - 70px);
  }
`;

const ImageSide = styled(motion.div)`
  position: relative;
  min-height: 400px;
  overflow: hidden;
  
  @media (min-width: 1024px) {
    min-height: 100%;
  }
  
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
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const ContentSide = styled(motion.div)`
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgba(255, 255, 255, 0.95);
  
  @media (min-width: 768px) {
    padding: 4rem;
  }
  
  @media (min-width: 1024px) {
    padding: 5rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${palette.ink};
  margin-bottom: 1.5rem;
  font-family: ${fonts.heading};
  line-height: 1.2;
  
  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
  
  @media (min-width: 1024px) {
    font-size: 4rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.1rem;
  color: ${palette.inkLight};
  margin-bottom: 2rem;
  line-height: 1.8;
  font-family: ${fonts.body};
  
  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

const BioText = styled(motion.p)`
  font-size: 1rem;
  color: ${palette.ink};
  margin-bottom: 3rem;
  line-height: 1.8;
  font-family: ${fonts.body};
  font-style: italic;
  background: linear-gradient(135deg, rgba(193, 120, 91, 0.05), rgba(255, 255, 255, 0.8));
  border-left: 4px solid ${palette.terracotta};
  padding: 1.5rem;
  padding-left: 2rem;
  border-radius: 0 1rem 1rem 0;
  
  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
`;

const GallerySection = styled.section`
  position: relative;
  padding: 6rem 0;
  background: linear-gradient(
      rgba(255, 255, 255, 0.98), 
      rgba(255, 255, 255, 0.95)
    );
`;

const Container = styled.div`
  position: relative;
  z-index: 10;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const GalleryTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: ${palette.ink};
  font-family: ${fonts.heading};
  
  @media (min-width: 768px) {
    font-size: 4rem;
  }
`;

const GalleryGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 280px;
  gap: 1rem;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 200px;
  }
`;

const GalleryCard = styled(motion.div)<{ gridArea?: string }>`
  position: relative;
  grid-area: ${props => props.gridArea};
  border-radius: 1.5rem;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 
    0 20px 40px -10px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 
      0 30px 60px -12px rgba(0, 0, 0, 0.25),
      inset 0 1px 0 rgba(255, 255, 255, 0.9);
    z-index: 10;
  }
  
  /* Specific grid areas for desktop - keeping original layout style */
  @media (min-width: 769px) {
    &:nth-child(1) { grid-column: 1 / 3; grid-row: 1 / 2; }
    &:nth-child(2) { grid-column: 3 / 4; grid-row: 1 / 2; }
    &:nth-child(3) { grid-column: 4 / 5; grid-row: 1 / 3; }
    &:nth-child(4) { grid-column: 1 / 2; grid-row: 2 / 3; }
    &:nth-child(5) { grid-column: 2 / 4; grid-row: 2 / 3; }
    &:nth-child(6) { grid-column: 1 / 3; grid-row: 3 / 4; }
    &:nth-child(7) { grid-column: 3 / 4; grid-row: 3 / 4; }
    &:nth-child(8) { grid-column: 4 / 5; grid-row: 3 / 4; }
    /* Continuing the pattern for additional images */
    &:nth-child(9) { grid-column: 1 / 3; grid-row: 4 / 5; }
    &:nth-child(10) { grid-column: 3 / 4; grid-row: 4 / 5; }
    &:nth-child(11) { grid-column: 4 / 5; grid-row: 4 / 6; }
    &:nth-child(12) { grid-column: 1 / 2; grid-row: 5 / 6; }
    &:nth-child(13) { grid-column: 2 / 4; grid-row: 5 / 6; }
    &:nth-child(14) { grid-column: 1 / 3; grid-row: 6 / 7; }
    &:nth-child(15) { grid-column: 3 / 4; grid-row: 6 / 7; }
    &:nth-child(16) { grid-column: 4 / 5; grid-row: 6 / 7; }
    &:nth-child(17) { grid-column: 1 / 5; grid-row: 7 / 8; }
  }
  
  /* Mobile layout */
  @media (max-width: 768px) {
    &:nth-child(1) { grid-column: 1 / 3; grid-row: 1 / 2; }
    &:nth-child(2) { grid-column: 1 / 2; grid-row: 2 / 3; }
    &:nth-child(3) { grid-column: 2 / 3; grid-row: 2 / 3; }
    &:nth-child(4) { grid-column: 1 / 3; grid-row: 3 / 4; }
    &:nth-child(5) { grid-column: 1 / 2; grid-row: 4 / 5; }
    &:nth-child(6) { grid-column: 2 / 3; grid-row: 4 / 5; }
    &:nth-child(7) { grid-column: 1 / 3; grid-row: 5 / 6; }
    &:nth-child(8) { grid-column: 1 / 3; grid-row: 6 / 7; }
    &:nth-child(9) { grid-column: 1 / 2; grid-row: 7 / 8; }
    &:nth-child(10) { grid-column: 2 / 3; grid-row: 7 / 8; }
    &:nth-child(11) { grid-column: 1 / 3; grid-row: 8 / 9; }
    &:nth-child(12) { grid-column: 1 / 2; grid-row: 9 / 10; }
    &:nth-child(13) { grid-column: 2 / 3; grid-row: 9 / 10; }
    &:nth-child(14) { grid-column: 1 / 3; grid-row: 10 / 11; }
    &:nth-child(15) { grid-column: 1 / 2; grid-row: 11 / 12; }
    &:nth-child(16) { grid-column: 2 / 3; grid-row: 11 / 12; }
    &:nth-child(17) { grid-column: 1 / 3; grid-row: 12 / 13; }
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
  
  ${GalleryCard}:hover & {
    transform: scale(1.1);
  }
`;

const GalleryOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    transparent 60%,
    rgba(0, 0, 0, 0.1) 80%,
    rgba(0, 0, 0, 0.8) 100%
  );
  display: flex;
  align-items: flex-end;
  padding: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${GalleryCard}:hover & {
    opacity: 1;
  }
`;

const GalleryCaption = styled.div`
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
`;

const GalleryCaptionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
  font-family: ${fonts.body};
`;

const GalleryCaptionText = styled.p`
  font-size: 0.875rem;
  margin: 0;
  opacity: 0.9;
  font-family: ${fonts.body};
`;

const Modal = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalImage = styled(motion.img)`
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 1rem;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5);
`;

const ModalClose = styled(motion.button)`
  position: absolute;
  top: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const Gallery: React.FC = () => {
  const { t } = useTranslation('gallery');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    // Original images
    {
      src: '/img/playas-de-alcudia-Yg2qM9KxxGFp23k5.jpg',
      title: t('images.alcudia_beach.title'),
      description: t('images.alcudia_beach.description')
    },
    {
      src: '/img/4087playa-de-alcudia-palmeras-YleqByKExoIDeqZa.jpeg',
      title: t('images.palm_trees.title'),
      description: t('images.palm_trees.description')
    },
    {
      src: '/img/alcudia-mxBMN7K3e8TqngJk.webp',
      title: t('images.crystal_waters.title'),
      description: t('images.crystal_waters.description')
    },
    {
      src: '/img/31-atardecerplayaalcudia514-AR0MObgqpbcypPk9.jpg',
      title: t('images.sunset_alcudia.title'),
      description: t('images.sunset_alcudia.description')
    },
    // QFAM images
    {
      src: '/img/QFAM 1.webp',
      title: t('images.qfam1.title'),
      description: t('images.qfam1.description')
    },
    {
      src: '/img/QFAM 2.webp',
      title: t('images.qfam2.title'),
      description: t('images.qfam2.description')
    },
    {
      src: '/img/QFAM 3.webp',
      title: t('images.qfam3.title'),
      description: t('images.qfam3.description')
    },
    {
      src: '/img/QFAM 4.webp',
      title: t('images.qfam4.title'),
      description: t('images.qfam4.description')
    },
    {
      src: '/img/QFAM 5.webp',
      title: t('images.qfam5.title'),
      description: t('images.qfam5.description')
    },
    {
      src: '/img/QFAM 6.webp',
      title: t('images.qfam6.title'),
      description: t('images.qfam6.description')
    },
    {
      src: '/img/QFAM 7.webp',
      title: t('images.qfam7.title'),
      description: t('images.qfam7.description')
    },
    {
      src: '/img/QFAM 8.webp',
      title: t('images.qfam8.title'),
      description: t('images.qfam8.description')
    },
    {
      src: '/img/QFAM 10.webp',
      title: t('images.qfam10.title'),
      description: t('images.qfam10.description')
    },
    {
      src: '/img/QFAM 11.webp',
      title: t('images.qfam11.title'),
      description: t('images.qfam11.description')
    },
    {
      src: '/img/QFAM 12.webp',
      title: t('images.qfam12.title'),
      description: t('images.qfam12.description')
    },
    {
      src: '/img/QFAM 13.webp',
      title: t('images.qfam13.title'),
      description: t('images.qfam13.description')
    },
    {
      src: '/img/QFAM 14.webp',
      title: t('images.qfam14.title'),
      description: t('images.qfam14.description')
    }
  ];

  return (
    <GalleryPageContainer>
      <SEOHead 
        title="Galerie Photos | Que faire à Majorque"
        description="Découvrez Majorque en images : plages paradisiaques, couchers de soleil, villages pittoresques et moments authentiques capturés par notre équipe locale."
        url="https://quefaireamajorque.com/gallery"
        canonical="https://quefaireamajorque.com/gallery"
        image="https://quefaireamajorque.com/img/rony.webp"
      />
      <Header />
      
      <HeroSection>
        <HeroContainer>
          <ImageSide
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <HeroImage src="/img/rony.webp" alt="Que faire à Majorque - Guide numérique, location de voiture avec Offugo, visites guidées à Palma en français et billets (Tiqets). Paiements sécurisés via Stripe." />
          </ImageSide>
          
          <ContentSide
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <ContentWrapper>
              <HeroTitle
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {t('hero.title')}
              </HeroTitle>
              
              <HeroSubtitle
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {t('hero.subtitle')}
              </HeroSubtitle>

              {t('hero.bio') && (
                <BioText
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  {t('hero.bio')}
                </BioText>
              )}
            </ContentWrapper>
          </ContentSide>
        </HeroContainer>
      </HeroSection>

      <GallerySection>
        <Container>
          <GalleryTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {t('section.title')}
          </GalleryTitle>
          
          <GalleryGrid
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {galleryImages.map((image, index) => (
              <GalleryCard
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedImage(image.src)}
              >
                <GalleryImage src={image.src} alt={image.title} />
                <GalleryOverlay>
                  <GalleryCaption>
                    <GalleryCaptionTitle>{image.title}</GalleryCaptionTitle>
                    <GalleryCaptionText>{image.description}</GalleryCaptionText>
                  </GalleryCaption>
                </GalleryOverlay>
              </GalleryCard>
            ))}
          </GalleryGrid>
        </Container>
      </GallerySection>

      <AnimatePresence>
        {selectedImage && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <ModalClose
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </ModalClose>
            <ModalImage
              src={selectedImage}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            />
          </Modal>
        )}
      </AnimatePresence>

      <Footer />
    </GalleryPageContainer>
  );
};

export default Gallery; 