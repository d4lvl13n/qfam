import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const WhatsAppButton = styled(motion.a)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #25D366, #128C7E);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  box-shadow: 0 10px 25px -5px rgba(37, 211, 102, 0.4);
  z-index: 1000;
  cursor: pointer;
  text-decoration: none;

  bottom: 5.5rem;

  @media (max-width: 1023px) {
    bottom: 5.5rem;
    right: 1rem;
    width: 50px;
    height: 50px;

    svg {
      width: 26px;
      height: 26px;
    }
  }

  svg {
    width: 32px;
    height: 32px;
  }
`;

const PulseEffect = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #25D366;
  z-index: -1;
`;

const FloatingWhatsAppButton: React.FC = () => {
  const { t } = useTranslation('footer'); // Re-using the footer translations for the WhatsApp message

  const openWhatsApp = () => {
    const envPhone = import.meta.env.VITE_WHATSAPP_PHONE as string | undefined;
    const phoneNumber = (envPhone && envPhone.replace(/\D/g, '')) || "+34674494245";
    const message = encodeURIComponent(t('contact.whatsapp_message'));
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <WhatsAppButton
      onClick={openWhatsApp}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1, type: 'spring' }}
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.95 }}
      aria-label={t('social.whatsapp')}
    >
      <PulseEffect 
        animate={{ 
          scale: [1, 1.4, 1],
          opacity: [0.7, 0, 0.7]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      <MessageCircle />
    </WhatsAppButton>
  );
};

export default FloatingWhatsAppButton; 