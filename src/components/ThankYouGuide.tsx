import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Download, 
  Mail, 
  MessageCircle,
  ArrowLeft,
  Sparkles,
  Heart
} from 'lucide-react';
import { palette, fonts } from '../theme/mallorcaPalette';
import Header from './Header';
import Footer from './Footer';
import SEOHead from './SEOHead';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, ${palette.cream} 0%, ${palette.white} 100%);
  overflow-x: hidden;
`;

const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 2rem 4rem;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 400px;
    background: linear-gradient(135deg, #10B981 0%, #059669 100%);
    z-index: 0;
  }
  
  @media (max-width: 768px) {
    padding: 100px 1.5rem 3rem;
  }
`;

const ContentCard = styled(motion.div)`
  position: relative;
  z-index: 2;
  max-width: 700px;
  width: 100%;
  background: white;
  border-radius: 2.5rem;
  padding: 4rem 3rem;
  box-shadow: 0 30px 80px -20px rgba(0, 0, 0, 0.2);
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
    border-radius: 2rem;
  }
`;

const SuccessIcon = styled(motion.div)`
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  box-shadow: 0 20px 40px -10px rgba(16, 185, 129, 0.4);
  
  svg {
    color: white;
  }
`;

const Title = styled(motion.h1)`
  font-size: 2.75rem;
  font-weight: 900;
  color: ${palette.ink};
  margin-bottom: 1rem;
  font-family: ${fonts.heading};
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: ${palette.inkLight};
  margin-bottom: 2.5rem;
  font-family: ${fonts.body};
  line-height: 1.7;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const DownloadSection = styled(motion.div)`
  background: linear-gradient(135deg, #FFD93D 0%, #F4A261 100%);
  border-radius: 1.5rem;
  padding: 2.5rem;
  margin-bottom: 2.5rem;
`;

const DownloadTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 800;
  color: #000;
  margin-bottom: 0.5rem;
  font-family: ${fonts.heading};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const DownloadSubtitle = styled.p`
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.7);
  margin-bottom: 1.5rem;
  font-family: ${fonts.body};
`;

const DownloadButton = styled(motion.a)`
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
  box-shadow: 0 15px 40px -10px rgba(0, 0, 0, 0.4);
  
  &:hover {
    background: #1a1a1a;
  }
`;

const InfoSection = styled.div`
  text-align: left;
  background: ${palette.cream};
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const InfoTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: ${palette.ink};
  margin-bottom: 1rem;
  font-family: ${fonts.heading};
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const InfoItem = styled.li`
  display: flex;
  align-items: start;
  gap: 0.75rem;
  font-size: 0.95rem;
  color: ${palette.inkLight};
  font-family: ${fonts.body};
  line-height: 1.5;
  
  svg {
    flex-shrink: 0;
    margin-top: 0.15rem;
    color: #10B981;
  }
`;

const ContactSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ContactTitle = styled.p`
  font-size: 0.95rem;
  color: ${palette.inkLight};
  font-family: ${fonts.body};
`;

const ContactButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const ContactButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: white;
  border: 2px solid ${palette.sandDark};
  color: ${palette.ink};
  font-weight: 600;
  font-size: 0.9rem;
  font-family: ${fonts.body};
  border-radius: 2rem;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${palette.sea};
    color: ${palette.sea};
  }
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${palette.sea};
  font-weight: 600;
  font-size: 1rem;
  font-family: ${fonts.body};
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    gap: 0.75rem;
  }
`;

const ThankYouMessage = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${palette.inkLight};
  font-size: 0.95rem;
  font-family: ${fonts.body};
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid ${palette.sandDark};
`;

const ThankYouGuide: React.FC = () => {
  // URL du PDF hébergé sur Vercel Blob
  const pdfUrl = 'https://mkavnkgudzpr5iys.public.blob.vercel-storage.com/dl/GUIDE%202026%20QFAM.pdf';

  return (
    <PageContainer>
      <SEOHead
        title="Merci pour votre achat ! | Guide Voyage Majorque 2026"
        description="Téléchargez votre Guide Digital Majorque 2026"
        noIndex={true}
      />
      <Header />
      
      <HeroSection>
        <ContentCard
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <SuccessIcon
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
          >
            <CheckCircle size={50} />
          </SuccessIcon>
          
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Paiement Confirmé ! 🎉
          </Title>
          
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Merci pour votre confiance. Votre Guide Digital Majorque 2026 est prêt à être téléchargé !
          </Subtitle>
          
          <DownloadSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <DownloadTitle>
              <Sparkles size={24} />
              Votre Guide est Prêt
            </DownloadTitle>
            <DownloadSubtitle>
              Cliquez sur le bouton ci-dessous pour télécharger votre PDF
            </DownloadSubtitle>
            <DownloadButton
              href={pdfUrl}
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download size={22} />
              Télécharger le Guide (PDF)
            </DownloadButton>
          </DownloadSection>
          
          <InfoSection>
            <InfoTitle>📋 Informations importantes</InfoTitle>
            <InfoList>
              <InfoItem>
                <CheckCircle size={18} />
                <span>Le guide est au format PDF, lisible sur tous vos appareils</span>
              </InfoItem>
              <InfoItem>
                <CheckCircle size={18} />
                <span>Vous pouvez le télécharger autant de fois que vous le souhaitez depuis cette page</span>
              </InfoItem>
              <InfoItem>
                <CheckCircle size={18} />
                <span>Ajoutez cette page à vos favoris pour y accéder facilement</span>
              </InfoItem>
              <InfoItem>
                <CheckCircle size={18} />
                <span>Les mises à jour sont gratuites - vous recevrez un email lors des prochaines versions</span>
              </InfoItem>
            </InfoList>
          </InfoSection>
          
          <ContactSection>
            <ContactTitle>
              Un problème ou une question ? Contactez-nous :
            </ContactTitle>
            <ContactButtons>
              <ContactButton href="mailto:quefaireamajorque@gmail.com">
                <Mail size={18} />
                Email
              </ContactButton>
              <ContactButton 
                href="https://wa.me/34674494245" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <MessageCircle size={18} />
                WhatsApp
              </ContactButton>
            </ContactButtons>
          </ContactSection>
          
          <BackLink to="/">
            <ArrowLeft size={20} />
            Retour à l'accueil
          </BackLink>
          
          <ThankYouMessage
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <Heart size={18} color="#EF4444" fill="#EF4444" />
            Merci de soutenir un créateur local !
          </ThankYouMessage>
        </ContentCard>
      </HeroSection>
      
      <Footer />
    </PageContainer>
  );
};

export default ThankYouGuide;

