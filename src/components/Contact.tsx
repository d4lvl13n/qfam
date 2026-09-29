import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle,
  Instagram,
  Facebook,
  Youtube
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';
import SEOHead from './SEOHead';
import { fonts } from '../theme/mallorcaPalette';
import themeConfig, { getBorder, getShadow, getColorWithOpacity } from '../theme/themeConfig';

const ContactPageContainer = styled.div`
  min-height: 100vh;
  background: ${themeConfig.background.main};
  padding-top: 70px;
`;

const HeroSection = styled.section`
  position: relative;
  padding: 6rem 0;
  background: linear-gradient(
      rgba(0, 0, 0, 0.4), 
      rgba(0, 0, 0, 0.6)
    ),
    url('/img/31-atardecerplayaalcudia514-AR0MObgqpbcypPk9.jpg') center/cover no-repeat;
  text-align: center;
  overflow: hidden;
`;

const GlassmorphOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    ${getColorWithOpacity(themeConfig.secondary, '10')} 25%,
    ${getColorWithOpacity(themeConfig.accent, '05')} 50%,
    rgba(255, 255, 255, 0.05) 100%
  );
  backdrop-filter: blur(2px);
`;

const Container = styled.div`
  position: relative;
  z-index: 10;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Badge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: ${themeConfig.background.card};
  backdrop-filter: blur(30px);
  border: ${getBorder(themeConfig.secondary, '30')};
  border-radius: 9999px;
  margin-bottom: 2rem;
  box-shadow: 
    ${themeConfig.shadows.button} rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
`;

const BadgeText = styled.span`
  font-size: 0.875rem;
  color: ${themeConfig.secondary.main};
  font-weight: 600;
  font-family: ${fonts.body};
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1.5rem;
  font-family: ${fonts.heading};
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  
  @media (min-width: 768px) {
    font-size: 4.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
  font-family: ${fonts.body};
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const ContactSection = styled.section`
  position: relative;
  padding: 8rem 0;
  background: linear-gradient(
      rgba(255, 255, 255, 0.95), 
      rgba(255, 255, 255, 0.98)
    ),
    url('/img/playas-de-alcudia-Yg2qM9KxxGFp23k5.jpg') center/cover no-repeat fixed;
`;

const ContactContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const ContactInfo = styled(motion.div)`
  background: ${themeConfig.background.card};
  backdrop-filter: blur(30px);
  border: ${getBorder(themeConfig.secondary, '20')};
  border-radius: 2rem;
  padding: 3rem;
  box-shadow: 
    ${getShadow('card', themeConfig.secondary, '0.15')},
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${themeConfig.accent.main};
  margin-bottom: 2rem;
  font-family: ${fonts.heading};
  
  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, ${getColorWithOpacity(themeConfig.secondary, '05')}, rgba(255, 255, 255, 0.8));
  border: ${getBorder(themeConfig.secondary, '20')};
  border-radius: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${getShadow('card', themeConfig.secondary, '0.2')};
  }
`;

const ContactIcon = styled.div`
  width: 50px;
  height: 50px;
  background: ${themeConfig.secondary.gradient};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  box-shadow: ${getShadow('card', themeConfig.secondary, '0.3')};
`;

const ContactDetails = styled.div`
  flex: 1;
`;

const ContactLabel = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${themeConfig.accent.main};
  margin: 0 0 0.5rem 0;
  font-family: ${fonts.body};
`;

const ContactText = styled.p`
  color: ${themeConfig.text.secondary};
  margin: 0;
  line-height: 1.5;
  font-family: ${fonts.body};
`;

const SocialSection = styled.div`
  margin-top: 2rem;
  text-align: center;
`;

const SocialTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${themeConfig.accent.main};
  margin-bottom: 1rem;
  font-family: ${fonts.body};
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const SocialLink = styled(motion.a)`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, ${getColorWithOpacity(themeConfig.secondary, '10')}, ${getColorWithOpacity(themeConfig.secondary, '05')});
  border: ${getBorder(themeConfig.secondary, '30')};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${themeConfig.secondary.main};
  transition: all 0.3s ease;
  text-decoration: none;
  
  &:hover {
    background: ${themeConfig.secondary.gradient};
    color: white;
    transform: translateY(-3px);
    box-shadow: ${getShadow('card', themeConfig.secondary, '0.3')};
  }
  
  &.instagram:hover {
    background: linear-gradient(135deg, #E4405F, #C13584, #833AB4);
    border-color: #E4405F;
  }
  
  &.facebook:hover {
    background: linear-gradient(135deg, #1877F2, #0A66C2);
    border-color: #1877F2;
  }
  
  &.youtube:hover {
    background: linear-gradient(135deg, #FF0000, #CC0000);
    border-color: #FF0000;
  }
`;

// Map Section
const MapSection = styled.section`
  padding: 6rem 0;
  background: ${themeConfig.background.main};
`;

const MapContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const MapTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${themeConfig.accent.main};
  margin-bottom: 2rem;
  text-align: center;
  font-family: ${fonts.heading};
  
  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const MapWrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 500px;
  border-radius: 2rem;
  overflow: hidden;
  box-shadow: 
    0 20px 60px -15px rgba(0, 0, 0, 0.3),
    0 0 0 1px ${getBorder(themeConfig.secondary, '20')};
  
  @media (max-width: 768px) {
    height: 400px;
    border-radius: 1.5rem;
  }
`;

const MapIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  display: block;
`;

const MapLink = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  background: ${themeConfig.secondary.gradient};
  color: white;
  border-radius: 100px;
  text-decoration: none;
  font-weight: 600;
  font-family: ${fonts.body};
  font-size: 0.95rem;
  transition: all 0.3s ease;
  box-shadow: ${getShadow('button', themeConfig.secondary, '0.3')};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${getShadow('button', themeConfig.secondary, '0.4')};
  }
`;

const Contact: React.FC = () => {
  const { t } = useTranslation('contact');

  return (
    <ContactPageContainer>
      <SEOHead 
        title="Contact | Que faire à Majorque"
        description="Contactez Que faire à Majorque pour toute question sur nos guides, locations de voiture, visites guidées et activités. Nous sommes là pour vous aider !"
        url="https://quefaireamajorque.com/contact"
        canonical="https://quefaireamajorque.com/contact"
        image="https://quefaireamajorque.com/img/LOGO_2026.png"
      />
      <Header />
      
      <HeroSection>
        <GlassmorphOverlay />
        <Container>
          <Badge
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <MessageCircle size={20} />
            <BadgeText>{t('hero.badge')}</BadgeText>
          </Badge>
          
          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('hero.title')}
          </HeroTitle>
          
          <HeroSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t('hero.subtitle')}
          </HeroSubtitle>
        </Container>
      </HeroSection>

      {/* Map Section */}
      <MapSection>
        <MapContainer>
          <MapTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {t('map.title', 'Nous trouver')}
          </MapTitle>
          
          <div style={{ textAlign: 'center' }}>
            <MapWrapper
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <MapIframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3075.123456789!2d2.6517369!3d39.5731332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x129793c0140b2861%3A0x7a04b3dcd18ab8a8!2sQue%20faire%20%C3%A0%20Majorque!5e0!3m2!1sfr!2sfr!4v1735123456789!5m2!1sfr!2sfr"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Que faire à Majorque - Localisation"
              />
            </MapWrapper>
            
            <MapLink
              href="https://www.google.com/maps/place/Que+faire+%C3%A0+Majorque/@39.5731332,2.649162,17z/data=!3m2!4b1!5s0x1297925104e0b5db:0xab16b6c9c8b19bfb!4m6!3m5!1s0x129793c0140b2861:0x7a04b3dcd18ab8a8!8m2!3d39.5731332!4d2.6517369!16s%2Fg%2F11wttvrwd9?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <MapPin size={18} />
              {t('map.openInGoogleMaps', 'Ouvrir dans Google Maps')}
            </MapLink>
          </div>
        </MapContainer>
      </MapSection>

      <ContactSection>
        <ContactContainer>
          <ContactInfo
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SectionTitle>{t('info.title')}</SectionTitle>
            
            <ContactItem>
              <ContactIcon>
                <Phone size={24} />
              </ContactIcon>
              <ContactDetails>
                <ContactLabel>{t('info.phone.label')}</ContactLabel>
                <ContactText>{t('info.phone.number')}</ContactText>
              </ContactDetails>
            </ContactItem>

            <ContactItem>
              <ContactIcon>
                <Mail size={24} />
              </ContactIcon>
              <ContactDetails>
                <ContactLabel>{t('info.email.label')}</ContactLabel>
                <ContactText>{t('info.email.address')}</ContactText>
              </ContactDetails>
            </ContactItem> 

            <SocialSection>
              <SocialTitle>{t('info.social.title')}</SocialTitle>
              <SocialLinks>
                <SocialLink
                  href="https://www.instagram.com/ronyquefaireamajorque/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="instagram"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Instagram"
                >
                  <Instagram size={24} />
                </SocialLink>
                <SocialLink
                  href="https://www.facebook.com/quefaireamajorque"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="facebook"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Facebook"
                >
                  <Facebook size={24} />
                </SocialLink>
                <SocialLink
                  href="https://www.youtube.com/@QuefaireaMajorque"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="youtube"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="YouTube"
                >
                  <Youtube size={24} />
                </SocialLink>
              </SocialLinks>
            </SocialSection>
          </ContactInfo>
        </ContactContainer>
      </ContactSection>

      <Footer />
    </ContactPageContainer>
  );
};

export default Contact; 