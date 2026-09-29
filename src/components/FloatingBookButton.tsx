import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { fonts } from '../theme/mallorcaPalette';

const FAREHARBOR_URL = 'https://fareharbor.com/embeds/book/quefaireamajorque/?full-items=yes';

const Bar = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.08);

  @media (min-width: 1024px) {
    padding: 0.75rem 2rem;
  }
`;

const BookLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  width: 100%;
  max-width: 420px;
  padding: 0.9rem 1.5rem;
  background: linear-gradient(135deg, #e8a838, #d4922a);
  color: white;
  font-family: ${fonts.body};
  font-weight: 700;
  font-size: 1rem;
  border-radius: 14px;
  text-decoration: none;
  box-shadow: 0 6px 20px -4px rgba(212, 146, 42, 0.45);
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, #d4922a, #c0841f);
    transform: translateY(-1px);
    box-shadow: 0 8px 24px -4px rgba(212, 146, 42, 0.55);
  }

  &:active {
    transform: scale(0.98);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const FloatingBookButton: React.FC = () => {
  return (
    <Bar
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8, type: 'spring', stiffness: 120 }}
    >
      <BookLink href={FAREHARBOR_URL}>
        <Calendar />
        Réserve ta visite de Palma
      </BookLink>
    </Bar>
  );
};

export default FloatingBookButton;
