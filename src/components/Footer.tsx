import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { 
  Instagram, 
  Facebook, 
  MessageCircle,
  Mail,
  MapPin,
  Heart,
  Youtube,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { palette, fonts } from '../theme/mallorcaPalette';
import themeConfig, { getShadow } from '../theme/themeConfig';
import ElfsightWidgets from './ElfsightWidgets';

const FooterSection = styled.footer`
  position: relative;
  background: linear-gradient(
      ${palette.seaDark} 0%, 
      ${palette.ink} 100%
    ),
    url('/img/59e724fc9fc19073257209-YX4a7Pr33KCj00PQ.avif') center/cover no-repeat;
  border-top: 1px solid ${palette.sandDark};
  overflow: hidden;
`;

const FooterGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, ${palette.terracotta}, transparent);
`;

const GlassmorphOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(193, 120, 91, 0.1) 0%,
    rgba(95, 179, 214, 0.05) 50%,
    rgba(74, 103, 65, 0.1) 100%
  );
  backdrop-filter: blur(1px);
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 4rem 2rem 2rem;
  position: relative;
  z-index: 10;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr;
  }
`;

const BrandSection = styled.div``;

const Logo = styled(motion.div)`
  font-size: 2rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-family: ${fonts.heading};
`;

const LogoIcon = styled.div`
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 25px -8px rgba(251, 146, 60, 0.3);
  overflow: hidden;
`;

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const BrandDescription = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  max-width: 350px;
  font-family: ${fonts.body};
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled(motion.a)`
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
  backdrop-filter: blur(20px);
  box-shadow: 0 4px 15px -4px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  
  &:hover {
    background: ${themeConfig.secondary.gradient};
    border-color: ${themeConfig.secondary.light};
    transform: translateY(-3px) scale(1.05);
    color: #ffffff;
    box-shadow: ${getShadow('card', themeConfig.secondary, '0.4')};
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
  
  &.whatsapp:hover {
    background: linear-gradient(135deg, #25D366, #128C7E);
    border-color: #25D366;
  }
`;

const FooterColumn = styled.div``;

const ColumnTitle = styled.h4`
  font-size: 1.125rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 1.5rem;
  font-family: ${fonts.body};
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterLinkItem = styled.li`
  margin-bottom: 0.75rem;
`;

const FooterNavLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 0.95rem;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  transition: all 0.3s ease;
  font-family: ${fonts.body};
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);

  &:hover {
    color: #fed7aa;
    transform: translateX(5px);
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.95rem;
  margin-bottom: 1rem;
  font-family: ${fonts.body};
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
    
    svg {
    color: #fed7aa;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  }
`;

const WhatsAppContact = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.95rem;
  margin-bottom: 1rem;
  font-family: ${fonts.body};
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 0.5rem;
  
  svg {
    color: #25D366;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  }
  
  &:hover {
    background: rgba(37, 211, 102, 0.1);
    color: #ffffff;
    transform: translateX(5px);
  }
`;

const FooterBottom = styled.div`
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Copyright = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${fonts.body};
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const LegalNavLink = styled(Link)`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.3s ease;
  font-family: ${fonts.body};
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);

  &:hover {
    color: #fed7aa;
  }
`;

const Footer: React.FC = () => {
  const { t } = useTranslation('footer');

  const openWhatsApp = () => {
    const envPhone = import.meta.env.VITE_WHATSAPP_PHONE as string | undefined;
    const phoneNumber = (envPhone && envPhone.replace(/\D/g, '')) || "34674494245"; // Remove + and spaces for WhatsApp URL
    const message = encodeURIComponent(t('contact.whatsapp_message'));
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
    <ElfsightWidgets />
    <FooterSection>
      <GlassmorphOverlay />
      <FooterGradient />
      
      <Container>
        <FooterContent>
          <BrandSection>
            <Logo
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogoIcon>
                <LogoImage src="/img/LOGO_2026.png" alt="Que faire à Majorque Logo" />
              </LogoIcon>
              Que faire à Majorque
            </Logo>
            
            <BrandDescription>
              {t('brand.description')}
            </BrandDescription>
            
            <SocialLinks>
              <SocialLink 
                href="https://www.instagram.com/ronyquefaireamajorque/"
                target="_blank"
                rel="noopener noreferrer"
                className="instagram"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={t('social.instagram')}
              >
                <Instagram size={20} />
              </SocialLink>
              <SocialLink 
                href="https://www.facebook.com/quefaireamajorque"
                target="_blank"
                rel="noopener noreferrer"
                className="facebook"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={t('social.facebook')}
              >
                <Facebook size={20} />
              
              </SocialLink>
              <SocialLink 
                href="https://www.youtube.com/@QuefaireaMajorque"
                target="_blank"
                rel="noopener noreferrer"
                className="youtube"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={t('social.youtube')}
              >
                <Youtube size={20} />
              </SocialLink>
            </SocialLinks>
          </BrandSection>
          
          <FooterColumn>
            <ColumnTitle>{t('navigation.title')}</ColumnTitle>
            <FooterLinks>
              <FooterLinkItem>
                <FooterNavLink to="/">
                  {t('navigation.home')}
                </FooterNavLink>
              </FooterLinkItem>
              <FooterLinkItem>
                <FooterNavLink to="/experiences/billets-et-entrees">
                  Visites
                </FooterNavLink>
              </FooterLinkItem>
              <FooterLinkItem>
                <FooterNavLink to="/experiences/excursions-en-bateau">
                  Excursions
                </FooterNavLink>
              </FooterLinkItem>
              <FooterLinkItem>
                <FooterNavLink to="/blog/location-voiture-majorque-offugo">
                  Location voiture
                </FooterNavLink>
              </FooterLinkItem>
              <FooterLinkItem>
                <FooterNavLink to="/guide">
                  Guide
                </FooterNavLink>
              </FooterLinkItem>
              <FooterLinkItem>
                <FooterNavLink to="/blog">
                  Blog
                </FooterNavLink>
              </FooterLinkItem>
              <FooterLinkItem>
                <FooterNavLink to="/a-propos">
                  {t('navigation.about')}
                </FooterNavLink>
              </FooterLinkItem>
              <FooterLinkItem>
                <FooterNavLink to="/contact">
                  {t('navigation.contact')}
                </FooterNavLink>
              </FooterLinkItem>
            </FooterLinks>
          </FooterColumn>
          
          <FooterColumn>
            <ColumnTitle>{t('contact.title' )}</ColumnTitle>
            <ContactInfo>
              <MapPin size={18} />
              <span>{t('contact.location')}</span>
            </ContactInfo>
            <ContactInfo>
              <Mail size={18} />
              <span>{t('contact.email')}</span>
            </ContactInfo>
            <WhatsAppContact onClick={openWhatsApp}>
              <MessageCircle size={18} />
              <span>{t('contact.whatsapp')}</span>
            </WhatsAppContact>
          </FooterColumn>
        </FooterContent>
        
        <FooterBottom>
          <Copyright>
            <span>{t('bottom.copyright')}</span>
            <Heart size={16} color="#fed7aa" fill="#fed7aa" />
            <span>{t('bottom.made_with_love')}</span>
          </Copyright>
          
          <LegalLinks>
            <LegalNavLink to="/confidentialite">{t('bottom.privacy')}</LegalNavLink>
            <LegalNavLink to="/mentions-legales">{t('bottom.terms')}</LegalNavLink>
            <LegalNavLink to="/cookies">Cookies</LegalNavLink>
          </LegalLinks>
        </FooterBottom>
      </Container>
    </FooterSection>
    </>
  );
};

export default Footer; 