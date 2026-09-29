import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Sparkles, ChevronRight, X, Mail, Send, Sun, MapPin, Gift, Check, Palmtree } from 'lucide-react';
import { fonts } from '../theme/mallorcaPalette';
import themeConfig, { getColorWithOpacity } from '../theme/themeConfig';

// Animations
const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.05); opacity: 1; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-8px) rotate(3deg); }
`;

const wave = keyframes`
  0% { transform: rotate(0deg); }
  10% { transform: rotate(14deg); }
  20% { transform: rotate(-8deg); }
  30% { transform: rotate(14deg); }
  40% { transform: rotate(-4deg); }
  50% { transform: rotate(10deg); }
  60% { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }
`;

// Styled Components - Desktop
const SidebarContainer = styled(motion.aside)`
  position: relative;
  width: 380px;
  flex-shrink: 0;
  z-index: 99;
  align-self: stretch;
  
  @media (max-width: 1279px) {
    width: 320px;
  }
  
  @media (max-width: 1023px) {
    display: none;
  }
`;

const SidebarCard = styled(motion.div)`
  position: sticky;
  top: 100px;
  background: linear-gradient(
    165deg,
    rgba(255, 255, 255, 0.98) 0%,
    rgba(240, 248, 255, 0.95) 50%,
    rgba(255, 255, 255, 0.98) 100%
  );
  backdrop-filter: blur(40px);
  border: 2px solid transparent;
  background-clip: padding-box;
  border-radius: 28px;
  box-shadow: 
    0 25px 80px -20px rgba(10, 126, 164, 0.25),
    0 10px 30px -10px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 1),
    inset 0 0 0 1px ${getColorWithOpacity(themeConfig.secondary, '12')};
  overflow: hidden;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${getColorWithOpacity(themeConfig.secondary, '20')};
    border-radius: 4px;
  }
  
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
      rgba(10, 126, 164, 0.06),
      transparent
    );
    animation: ${shimmer} 5s infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 28px;
    padding: 2px;
    background: linear-gradient(
      145deg,
      ${themeConfig.secondary.light},
      rgba(255, 183, 77, 0.4),
      ${themeConfig.primary.light}
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0.5;
    pointer-events: none;
  }
`;

// Email Capture Section
const EmailSection = styled.div`
  position: relative;
  padding: 2rem;
  background: linear-gradient(
    135deg,
    rgba(10, 126, 164, 0.08) 0%,
    rgba(255, 183, 77, 0.06) 50%,
    rgba(10, 126, 164, 0.04) 100%
  );
  border-bottom: 1px solid ${getColorWithOpacity(themeConfig.secondary, '15')};
  overflow: hidden;
`;

const EmailDecorations = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
`;

const FloatingIcon = styled.div<{ $top: string; $right?: string; $left?: string; $delay: string }>`
  position: absolute;
  top: ${props => props.$top};
  right: ${props => props.$right};
  left: ${props => props.$left};
  opacity: 0.15;
  animation: ${float} 4s ease-in-out infinite;
  animation-delay: ${props => props.$delay};
  color: ${themeConfig.secondary.main};
`;

const EmailBadge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: linear-gradient(135deg, #FF6B6B 0%, #FFB347 100%);
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 800;
  color: white;
  font-family: ${fonts.body};
  text-transform: uppercase;
  letter-spacing: 1.2px;
  margin-bottom: 1rem;
  box-shadow: 
    0 8px 20px rgba(255, 107, 107, 0.35),
    0 2px 8px rgba(255, 107, 107, 0.2);
  width: fit-content;
  position: relative;
  z-index: 1;
`;

const WavingHand = styled.span`
  display: inline-block;
  animation: ${wave} 2.5s infinite;
  transform-origin: 70% 70%;
`;

const EmailTitle = styled.h3`
  font-family: ${fonts.heading};
  font-size: 1.4rem;
  font-weight: 800;
  color: ${themeConfig.text.primary};
  margin: 0 0 8px 0;
  line-height: 1.25;
  position: relative;
  z-index: 1;
  
  span {
    background: linear-gradient(
      135deg,
      ${themeConfig.secondary.main} 0%,
      #FFB347 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const EmailSubtitle = styled.p`
  font-family: ${fonts.body};
  font-size: 0.85rem;
  color: ${themeConfig.text.secondary};
  margin: 0 0 1.25rem 0;
  line-height: 1.5;
  position: relative;
  z-index: 1;
`;

const EmailForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  position: relative;
  z-index: 1;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const EmailInput = styled.input`
  width: 100%;
  padding: 14px 16px 14px 46px;
  border: 2px solid ${getColorWithOpacity(themeConfig.secondary, '20')};
  border-radius: 14px;
  font-family: ${fonts.body};
  font-size: 0.9rem;
  color: ${themeConfig.text.primary};
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
  
  &::placeholder {
    color: ${themeConfig.text.secondary};
    opacity: 0.7;
  }
  
  &:focus {
    outline: none;
    border-color: ${themeConfig.secondary.main};
    box-shadow: 0 0 0 4px ${getColorWithOpacity(themeConfig.secondary, '15')};
    background: white;
  }
`;

const InputIcon = styled(Mail)`
  position: absolute;
  left: 14px;
  width: 20px;
  height: 20px;
  color: ${themeConfig.secondary.main};
  opacity: 0.7;
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 14px 20px;
  background: ${themeConfig.secondary.gradient};
  border: none;
  border-radius: 14px;
  color: white;
  font-family: ${fonts.body};
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 8px 25px -5px rgba(10, 126, 164, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
  
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
  
  &:hover {
    box-shadow: 
      0 12px 35px -5px rgba(10, 126, 164, 0.5),
      0 0 0 1px rgba(255, 255, 255, 0.2) inset;
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 20px;
  background: linear-gradient(135deg, #10B981 0%, #34D399 100%);
  border-radius: 14px;
  color: white;
  font-family: ${fonts.body};
  font-size: 0.95rem;
  font-weight: 600;
`;

const PrivacyText = styled.p`
  font-family: ${fonts.body};
  font-size: 0.7rem;
  color: ${themeConfig.text.secondary};
  text-align: center;
  margin-top: 0.5rem;
  opacity: 0.8;
`;

// Links Section
const HeaderSection = styled.div`
  padding: 1.5rem 2rem 1rem;
  position: relative;
`;

const SectionDivider = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1rem;
`;

const DividerLine = styled.div`
  flex: 1;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    ${getColorWithOpacity(themeConfig.secondary, '30')},
    transparent
  );
`;

const Badge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: ${themeConfig.secondary.gradient};
  border-radius: 20px;
  font-size: 0.65rem;
  font-weight: 700;
  color: white;
  font-family: ${fonts.body};
  text-transform: uppercase;
  letter-spacing: 0.8px;
  box-shadow: 0 4px 12px rgba(10, 126, 164, 0.3);
`;

const SparkleIcon = styled(Sparkles)`
  width: 12px;
  height: 12px;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const Title = styled.h3`
  font-family: ${fonts.heading};
  font-size: 1.2rem;
  font-weight: 700;
  background: linear-gradient(
    135deg,
    ${themeConfig.accent.main} 0%,
    ${themeConfig.secondary.main} 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 4px 0;
  line-height: 1.2;
`;

const Subtitle = styled.p`
  font-family: ${fonts.body};
  font-size: 0.8rem;
  color: ${themeConfig.text.secondary};
  margin: 0;
  line-height: 1.4;
`;

const LinksList = styled.ul`
  list-style: none;
  padding: 0 1.5rem 1.5rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

const LinkItem = styled(motion.li)`
  margin: 0;
`;

const PlanLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 1rem;
  background: linear-gradient(
    135deg,
    ${getColorWithOpacity(themeConfig.secondary, '05')} 0%,
    ${getColorWithOpacity(themeConfig.primary, '03')} 100%
  );
  border: 1px solid ${getColorWithOpacity(themeConfig.secondary, '12')};
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${themeConfig.secondary.gradient};
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    border-color: ${themeConfig.secondary.main};
    transform: translateX(4px);
    box-shadow: 0 8px 20px -6px rgba(10, 126, 164, 0.2);
    
    &::before {
      opacity: 1;
    }
  }
`;

const LinkNumber = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: ${themeConfig.secondary.gradient};
  color: white;
  font-weight: 800;
  font-size: 0.8rem;
  font-family: ${fonts.body};
  flex-shrink: 0;
  margin-right: 0.75rem;
  box-shadow: 0 3px 8px rgba(10, 126, 164, 0.3);
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  
  ${PlanLink}:hover & {
    background: rgba(255, 255, 255, 0.25);
    transform: scale(1.1);
  }
`;

const LinkLabel = styled.span`
  flex: 1;
  font-family: ${fonts.body};
  font-size: 0.85rem;
  font-weight: 600;
  color: ${themeConfig.text.primary};
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  
  ${PlanLink}:hover & {
    color: white;
  }
`;

const LinkIcon = styled(ChevronRight)`
  width: 18px;
  height: 18px;
  color: ${themeConfig.secondary.main};
  transition: all 0.3s ease;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  
  ${PlanLink}:hover & {
    color: white;
    transform: translateX(4px);
  }
`;

// Mobile Components
const MobileButtonContainer = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  display: none;
  padding: 0 env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
  
  @media (max-width: 1023px) {
    display: block;
  }
`;

const MobileFloatingButton = styled(motion.button)`
  width: 100%;
  padding: 1rem 1.5rem;
  background: ${themeConfig.secondary.gradient};
  border: none;
  border-radius: 0;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  box-shadow: 
    0 -8px 32px -8px rgba(10, 126, 164, 0.4),
    0 -2px 12px -2px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  font-family: ${fonts.body};
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.15),
      transparent
    );
    transform: translateX(-100%);
    animation: ${shimmer} 3s infinite;
  }
`;

const ButtonIcon = styled(Gift)`
  width: 22px;
  height: 22px;
  flex-shrink: 0;
`;

const ButtonText = styled.span`
  position: relative;
  z-index: 1;
`;

const ButtonBadge = styled.span`
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  background: linear-gradient(135deg, #FF6B6B 0%, #FFB347 100%);
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  animation: ${pulse} 2s ease-in-out infinite;
`;

const MobileDrawerOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: none;
  
  @media (max-width: 1023px) {
    display: block;
  }
`;

const MobileDrawer = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.98) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  backdrop-filter: blur(40px);
  border-radius: 28px 28px 0 0;
  box-shadow: 
    0 -20px 60px -10px rgba(10, 126, 164, 0.2),
    0 -8px 25px -8px rgba(0, 0, 0, 0.15);
  z-index: 1001;
  max-height: 85vh;
  overflow-y: auto;
  padding-bottom: env(safe-area-inset-bottom);
`;

const MobileDrawerHandle = styled.div`
  width: 48px;
  height: 5px;
  background: ${getColorWithOpacity(themeConfig.secondary, '30')};
  border-radius: 3px;
  margin: 1rem auto 0.5rem;
`;

const MobileDrawerHeader = styled.div`
  padding: 1rem 1.5rem 1.5rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const MobileCloseButton = styled(motion.button)`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${getColorWithOpacity(themeConfig.secondary, '10')};
  border: none;
  color: ${themeConfig.secondary.main};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  &:active {
    background: ${getColorWithOpacity(themeConfig.secondary, '20')};
    transform: scale(0.95);
  }
`;

const MobileEmailSection = styled.div`
  padding: 1.5rem;
  margin: 0 1rem;
  background: linear-gradient(
    135deg,
    rgba(10, 126, 164, 0.08) 0%,
    rgba(255, 183, 77, 0.06) 50%,
    rgba(10, 126, 164, 0.04) 100%
  );
  border-radius: 20px;
  margin-bottom: 1rem;
`;

const MobileLinksList = styled.ul`
  list-style: none;
  padding: 0 1rem 1.5rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

const MobilePlanLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: linear-gradient(
    135deg,
    ${getColorWithOpacity(themeConfig.secondary, '06')} 0%,
    ${getColorWithOpacity(themeConfig.primary, '04')} 100%
  );
  border: 1px solid ${getColorWithOpacity(themeConfig.secondary, '15')};
  border-radius: 14px;
  text-decoration: none;
  
  &:active {
    transform: scale(0.98);
    background: ${themeConfig.secondary.gradient};
    border-color: ${themeConfig.secondary.main};
  }
`;

const MobileLinkNumber = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: ${themeConfig.secondary.gradient};
  color: white;
  font-weight: 800;
  font-size: 0.9rem;
  font-family: ${fonts.body};
  flex-shrink: 0;
  margin-right: 0.75rem;
  box-shadow: 0 4px 12px rgba(10, 126, 164, 0.3);
`;

const MobileLinkLabel = styled.span`
  flex: 1;
  font-family: ${fonts.body};
  font-size: 0.9rem;
  font-weight: 600;
  color: ${themeConfig.text.primary};
`;

const MobileLinkIcon = styled(ChevronRight)`
  width: 20px;
  height: 20px;
  color: ${themeConfig.secondary.main};
  flex-shrink: 0;
`;

const BlogPostSidebar: React.FC = () => {
  const { t } = useTranslation('blogSidebar');
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mobileEmail, setMobileEmail] = useState('');
  const [isMobileSubmitted, setIsMobileSubmitted] = useState(false);

  const plans = [
    { key: 'plan1', number: '1' },
    { key: 'plan2', number: '2' },
    { key: 'plan3', number: '3' },
    { key: 'plan4', number: '4' },
  ];

  const handleCloseMobileDrawer = () => {
    setIsMobileDrawerOpen(false);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formspree.io/f/xdkrzneq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          source: 'Blog Post Sidebar - Desktop',
          page: window.location.pathname,
        }),
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        setEmail('');
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      // Still show success to user even if there's an error
      setIsSubmitted(true);
      setEmail('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMobileEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileEmail || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formspree.io/f/xdkrzneq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: mobileEmail,
          source: 'Blog Post Sidebar - Mobile',
          page: window.location.pathname,
        }),
      });
      
      if (response.ok) {
        setIsMobileSubmitted(true);
        setMobileEmail('');
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      // Still show success to user even if there's an error
      setIsMobileSubmitted(true);
      setMobileEmail('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <SidebarContainer
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ 
          type: 'spring', 
          stiffness: 260, 
          damping: 20,
          delay: 0.5
        }}
      >
        <SidebarCard
          whileHover={{ scale: 1.005 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {/* Email Capture Section */}
          <EmailSection>
            <EmailDecorations>
              <FloatingIcon $top="10px" $right="20px" $delay="0s">
                <Sun size={24} />
              </FloatingIcon>
              <FloatingIcon $top="60%" $left="10px" $delay="1s">
                <Palmtree size={20} />
              </FloatingIcon>
              <FloatingIcon $top="30%" $right="10px" $delay="2s">
                <MapPin size={18} />
              </FloatingIcon>
            </EmailDecorations>
            
            <EmailBadge
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
            >
              <WavingHand>🌴</WavingHand>
              Exclusif
            </EmailBadge>
            
            <EmailTitle>
              Reçois les <span>meilleurs bons plans</span> de Majorque
            </EmailTitle>
            
            <EmailSubtitle>
              Plages secrètes, restaurants locaux, réductions exclusives... directement dans ta boîte mail !
            </EmailSubtitle>
            
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <EmailForm onSubmit={handleEmailSubmit}>
                  <InputWrapper>
                    <InputIcon />
                    <EmailInput
                      type="email"
                      placeholder="ton@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </InputWrapper>
                  <SubmitButton
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      'Inscription...'
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Recevoir les bons plans</span>
                      </>
                    )}
                  </SubmitButton>
                  <PrivacyText>
                    🔒 Pas de spam • Désabonnement en 1 clic
                  </PrivacyText>
                </EmailForm>
              ) : (
                <SuccessMessage
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <Check size={20} />
                  Bienvenue dans la communauté ! 🎉
                </SuccessMessage>
              )}
            </AnimatePresence>
          </EmailSection>

          {/* Links Section */}
          <HeaderSection>
            <SectionDivider>
              <DividerLine />
              <Badge
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
              >
                <SparkleIcon />
                <span>Bons Plans</span>
              </Badge>
              <DividerLine />
            </SectionDivider>
            <Title>{t('title')}</Title>
            <Subtitle>{t('subtitle')}</Subtitle>
          </HeaderSection>

          <LinksList>
            {plans.map((plan, index) => (
              <LinkItem
                key={plan.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.08 }}
              >
                <PlanLink to={t(`links.${plan.key}.url`)}>
                  <LinkNumber>{plan.number}</LinkNumber>
                  <LinkLabel>{t(`links.${plan.key}.label`)}</LinkLabel>
                  <LinkIcon size={18} />
                </PlanLink>
              </LinkItem>
            ))}
          </LinksList>
        </SidebarCard>
      </SidebarContainer>

      {/* Mobile Floating Button */}
      <MobileButtonContainer
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          type: 'spring',
          stiffness: 260,
          damping: 20,
          delay: 0.8
        }}
      >
        <MobileFloatingButton
          onClick={() => setIsMobileDrawerOpen(true)}
          whileTap={{ scale: 0.98 }}
          aria-label="Ouvrir les bons plans"
        >
          <ButtonIcon />
          <ButtonText>Bons Plans & Newsletter</ButtonText>
          <ButtonBadge>NEW</ButtonBadge>
        </MobileFloatingButton>
      </MobileButtonContainer>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileDrawerOpen && (
          <>
            <MobileDrawerOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={handleCloseMobileDrawer}
            />
            <MobileDrawer
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ 
                type: 'spring',
                stiffness: 300,
                damping: 30
              }}
            >
              <MobileDrawerHandle />
              <MobileDrawerHeader>
                <div>
                  <EmailBadge style={{ marginBottom: '0.75rem' }}>
                    <WavingHand>🌴</WavingHand>
                    Exclusif
                  </EmailBadge>
                  <EmailTitle style={{ fontSize: '1.2rem' }}>
                    Reçois les <span>meilleurs bons plans</span>
                  </EmailTitle>
                </div>
                <MobileCloseButton
                  onClick={handleCloseMobileDrawer}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Fermer"
                >
                  <X size={20} />
                </MobileCloseButton>
              </MobileDrawerHeader>
              
              {/* Mobile Email Section */}
              <MobileEmailSection>
                <EmailSubtitle style={{ marginBottom: '1rem' }}>
                  Plages secrètes, restaurants locaux, réductions exclusives... 
                </EmailSubtitle>
                
                <AnimatePresence mode="wait">
                  {!isMobileSubmitted ? (
                    <EmailForm onSubmit={handleMobileEmailSubmit}>
                      <InputWrapper>
                        <InputIcon />
                        <EmailInput
                          type="email"
                          placeholder="ton@email.com"
                          value={mobileEmail}
                          onChange={(e) => setMobileEmail(e.target.value)}
                          required
                        />
                      </InputWrapper>
                      <SubmitButton
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Send size={18} />
                        <span>S'inscrire</span>
                      </SubmitButton>
                    </EmailForm>
                  ) : (
                    <SuccessMessage
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <Check size={20} />
                      Bienvenue ! 🎉
                    </SuccessMessage>
                  )}
                </AnimatePresence>
              </MobileEmailSection>
              
              {/* Mobile Links */}
              <div style={{ padding: '0 1rem' }}>
                <SectionDivider>
                  <DividerLine />
                  <Badge>
                    <SparkleIcon />
                    <span>Bons Plans</span>
                  </Badge>
                  <DividerLine />
                </SectionDivider>
              </div>
              
              <MobileLinksList>
                {plans.map((plan) => (
                  <li key={plan.key}>
                    <MobilePlanLink 
                      to={t(`links.${plan.key}.url`)}
                      onClick={handleCloseMobileDrawer}
                    >
                      <MobileLinkNumber>{plan.number}</MobileLinkNumber>
                      <MobileLinkLabel>{t(`links.${plan.key}.label`)}</MobileLinkLabel>
                      <MobileLinkIcon size={20} />
                    </MobilePlanLink>
                  </li>
                ))}
              </MobileLinksList>
            </MobileDrawer>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default BlogPostSidebar;
