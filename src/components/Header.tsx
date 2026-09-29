import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { Menu, X, Globe } from 'lucide-react';
import { palette, gradients, fonts } from '../theme/mallorcaPalette';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HeaderWrapper = styled.div<{ $isBlogPost?: boolean; $hidden?: boolean }>`
  position: ${props => props.$isBlogPost ? 'relative' : 'fixed'};
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  padding: 1.5rem 2rem 0;
  pointer-events: none;
  transform: ${props => props.$hidden ? 'translateY(-100%)' : 'translateY(0)'};
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 768px) {
    padding: 1rem 1rem 0;
  }
`;

const HeaderContainer = styled(motion.header)<{ scrolled: boolean }>`
  max-width: 1200px;
  width: 100%;
  background: ${props => props.scrolled
    ? 'rgba(30, 58, 82, 0.92)'
    : 'rgba(30, 58, 82, 0.85)'};
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border-radius: 2rem;
  border: 1px solid ${props => props.scrolled
    ? 'rgba(255, 255, 255, 0.15)'
    : 'rgba(255, 255, 255, 0.1)'};
  box-shadow: 0 15px 40px -10px rgba(0, 0, 0, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: auto;

  @media (max-width: 768px) {
    border-radius: 1.5rem;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;

  @media (max-width: 768px) {
    padding: 0.875rem 1rem;
  }
`;

const Logo = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;

  @media (max-width: 968px) {
    gap: 0.5rem;
  }
`;

const LogoIcon = styled.div`
  width: 44px;
  height: 44px;
  background: ${gradients.seaSky};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px -6px rgba(10, 126, 164, 0.4);
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.3), transparent);
    border-radius: 50%;
  }

  @media (max-width: 768px) {
    width: 38px;
    height: 38px;
  }
`;

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  position: relative;
  z-index: 1;
`;

const LogoTextGroup = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    display: none;
  }
`;

const LogoText = styled.span`
  font-size: 1.35rem;
  font-weight: 700;
  color: white;
  font-family: ${fonts.heading};
  letter-spacing: -0.02em;
  line-height: 1.2;

  @media (max-width: 968px) {
    font-size: 1.15rem;
  }
`;

const LogoBaseline = styled.span`
  font-size: 0.7rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  font-family: ${fonts.body};
  letter-spacing: 0.01em;
  line-height: 1.2;
`;

const Navigation = styled.nav<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 968px) {
    position: fixed;
    top: 6rem;
    left: 1rem;
    right: 1rem;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 1.5rem;
    border: 1px solid rgba(0, 0, 0, 0.08);
    box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.15);
    flex-direction: column;
    padding: 1.5rem;
    gap: 0.5rem;
    max-height: ${props => props.isOpen ? '80vh' : '0'};
    opacity: ${props => props.isOpen ? '1' : '0'};
    visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
    transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-20px)'};
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
  }
`;

const NavLink = styled(motion.button)`
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  padding: 0.625rem 1rem;
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: ${fonts.body};
  position: relative;
  white-space: nowrap;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }

  &:active {
    transform: scale(0.96);
  }

  @media (max-width: 968px) {
    width: 100%;
    padding: 1rem 1.25rem;
    font-size: 1rem;
    text-align: left;
    border-radius: 1rem;
    color: ${palette.ink};

    &:hover {
      background: rgba(10, 126, 164, 0.08);
      color: ${palette.sea};
    }
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 968px) {
    gap: 0.5rem;
  }
`;

const LanguageButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.5rem 0.7rem;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: ${fonts.body};
  position: relative;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }
`;

const LanguageDropdown = styled(motion.div)`
  position: absolute;
  top: calc(100% + 0.75rem);
  right: 0;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 1rem;
  box-shadow: 0 20px 50px -10px rgba(10, 126, 164, 0.08);
  padding: 0.5rem;
  min-width: 140px;
  overflow: hidden;
`;

const LanguageOption = styled(motion.button)`
  width: 100%;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  text-align: left;
  color: ${palette.ink};
  font-weight: 500;
  font-size: 0.85rem;
  cursor: pointer;
  border-radius: 0.75rem;
  transition: all 0.2s ease;
  font-family: ${fonts.body};
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background: rgba(10, 126, 164, 0.1);
  }

  &:active {
    transform: scale(0.96);
  }
`;

const CTAButton = styled(motion.button)`
  padding: 0.625rem 1.5rem;
  background: ${gradients.seaSky};
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  font-family: ${fonts.body};
  box-shadow: 0 8px 20px -6px rgba(10, 126, 164, 0.4);
  position: relative;
  overflow: hidden;
  white-space: nowrap;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.2), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  &:active {
    transform: scale(0.96);
  }

  @media (max-width: 768px) {
    padding: 0.625rem 1.25rem;
    font-size: 0.85rem;
  }
`;

const CTAGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;

  @media (max-width: 968px) {
    display: none;
  }
`;

const TrustBadge = styled.span`
  font-size: 0.65rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  font-family: ${fonts.body};
  white-space: nowrap;
  letter-spacing: 0.01em;
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.875rem;
  color: white;
  cursor: pointer;
  padding: 0.625rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  &:active {
    transform: scale(0.92);
  }

  @media (max-width: 968px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const LanguageSelectorWrapper = styled.div`
  position: relative;
`;

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const lastScrollY = React.useRef(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation('common');

  // Check if we're on a blog post page
  const isBlogPost = location.pathname.startsWith('/blog/') && location.pathname !== '/blog';

  React.useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 50);

      if (!isBlogPost) {
        if (currentY > lastScrollY.current && currentY > 80) {
          setHidden(true);
        } else {
          setHidden(false);
        }
      }

      lastScrollY.current = currentY;
    };

    const handleClickOutside = () => {
      if (isLanguageOpen) {
        setIsLanguageOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isLanguageOpen, isBlogPost]);

  const handleLogoClick = () => {
    navigate('/');
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigateToExcursions = () => {
    navigate('/experiences/excursions-en-bateau');
    setIsMenuOpen(false);
  };

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setIsLanguageOpen(false);
  };

  const toggleLanguageDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLanguageOpen(!isLanguageOpen);
  };

  const currentLanguage = i18n.language;
  
  return (
    <HeaderWrapper $isBlogPost={isBlogPost} $hidden={hidden}>
      <HeaderContainer
        scrolled={scrolled}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.6, 0.01, 0.05, 0.95] }}
      >
        <HeaderContent>
          <Logo
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleLogoClick}
          >
            <LogoIcon>
              <LogoImage src="/img/LOGO_2026.png" alt="Que faire à Majorque" />
            </LogoIcon>
            <LogoTextGroup>
              <LogoText>Que faire à Majorque</LogoText>
              <LogoBaseline>Visites guidées & expériences locales à Majorque</LogoBaseline>
            </LogoTextGroup>
          </Logo>

          <Navigation isOpen={isMenuOpen}>
            <NavLink
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { navigate('/experiences/billets-et-entrees'); setIsMenuOpen(false); }}
            >
              Visites
            </NavLink>
            <NavLink
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={navigateToExcursions}
            >
              Excursions
            </NavLink>
            <NavLink
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { navigate('/blog/louez-une-voiture-a-majorque-avec-offugo-et-profitez-de-10'); setIsMenuOpen(false); }}
            >
              Location voiture
            </NavLink>
            <NavLink
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { navigate('/guide'); setIsMenuOpen(false); }}
            >
              Guide
            </NavLink>
          </Navigation>

          <RightSection>
            <LanguageSelectorWrapper>
              <LanguageButton
                whileTap={{ scale: 0.97 }}
                onClick={toggleLanguageDropdown}
              >
                <Globe size={14} />
                {t('languages.current')}
              </LanguageButton>
              
              <AnimatePresence>
                {isLanguageOpen && (
                  <LanguageDropdown
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <LanguageOption
                      whileHover={{ x: 3 }}
                      onClick={() => changeLanguage('fr')}
                      style={{ 
                        backgroundColor: currentLanguage === 'fr' ? 'rgba(10, 126, 164, 0.12)' : 'transparent',
                        fontWeight: currentLanguage === 'fr' ? 600 : 500
                      }}
                    >
                      <span>{t('languages.french')}</span>
                      {currentLanguage === 'fr' && <span>✓</span>}
                    </LanguageOption>
                    <LanguageOption
                      whileHover={{ x: 3 }}
                      onClick={() => changeLanguage('en')}
                      style={{ 
                        backgroundColor: currentLanguage === 'en' ? 'rgba(10, 126, 164, 0.12)' : 'transparent',
                        fontWeight: currentLanguage === 'en' ? 600 : 500
                      }}
                    >
                      <span>{t('languages.english')}</span>
                      {currentLanguage === 'en' && <span>✓</span>}
                    </LanguageOption>
                    <LanguageOption
                      whileHover={{ x: 3 }}
                      onClick={() => changeLanguage('es')}
                      style={{ 
                        backgroundColor: currentLanguage === 'es' ? 'rgba(10, 126, 164, 0.12)' : 'transparent',
                        fontWeight: currentLanguage === 'es' ? 600 : 500
                      }}
                    >
                      <span>{t('languages.spanish')}</span>
                      {currentLanguage === 'es' && <span>✓</span>}
                    </LanguageOption>
                  </LanguageDropdown>
                )}
              </AnimatePresence>
            </LanguageSelectorWrapper>

            <CTAGroup>
              <CTAButton
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/visite-de-palma-avec-guide-francophone')}
              >
                Réserver une visite
              </CTAButton>
              <TrustBadge>★ 4,9/5 · Guide local basé à Palma</TrustBadge>
            </CTAGroup>
          </RightSection>

          <MobileMenuButton 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </MobileMenuButton>
        </HeaderContent>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header; 