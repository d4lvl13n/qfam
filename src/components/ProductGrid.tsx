import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { palette, fonts } from '../theme/mallorcaPalette';
import themeConfig, { getShadow } from '../theme/themeConfig';

const Section = styled.div`
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-family: ${fonts.heading};
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 800;
  color: ${palette.ink};
  text-align: center;
  margin: 0 0 0.5rem;
  letter-spacing: -0.02em;
`;

const SectionSubtitle = styled.p`
  font-family: ${fonts.body};
  font-size: 1.05rem;
  color: ${palette.inkLight};
  text-align: center;
  margin: 0 0 3rem;
  line-height: 1.6;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const Card = styled(motion(Link))`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: ${getShadow('card', themeConfig.secondary, '0.08')};
  transition: box-shadow 0.3s ease, border-color 0.3s ease;

  &:hover {
    box-shadow: ${getShadow('cardHover', themeConfig.secondary, '0.15')};
    border-color: rgba(0, 0, 0, 0.1);
  }
`;

const CardImage = styled.div<{ $bg?: string }>`
  width: 100%;
  aspect-ratio: 4 / 3;
  background: ${props => props.$bg ? `url(${props.$bg}) center/cover no-repeat` : palette.sandLight};
  transition: transform 0.4s ease;

  ${Card}:hover & {
    transform: scale(1.04);
  }
`;

const CardImageWrapper = styled.div`
  overflow: hidden;
`;

const CardBody = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
`;

const CardTitle = styled.h3`
  font-family: ${fonts.heading};
  font-size: 1.1rem;
  font-weight: 700;
  color: ${palette.ink};
  margin: 0;
  line-height: 1.3;
`;

const CardCTA = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: ${fonts.body};
  font-size: 0.9rem;
  font-weight: 600;
  color: ${palette.sea};
  margin-top: auto;
  transition: gap 0.2s ease;

  ${Card}:hover & {
    gap: 0.7rem;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const PRODUCTS = [
  {
    title: 'Visites guidées de Palma',
    cta: 'Découvrir Palma',
    to: '/visite-de-palma-avec-guide-francophone',
    image: '/img/Images/visite-guidee.webp',
  },
  {
    title: 'Excursions & sorties bateau',
    cta: 'Voir les sorties en mer',
    to: '/experiences/excursions-en-bateau',
    image: '/img/Images/excursion-bateau.webp',
  },
  {
    title: 'Location de voiture',
    cta: 'Louer une voiture',
    to: '/blog/louez-une-voiture-a-majorque-avec-offugo-et-profitez-de-10',
    image: '/img/Images/location-voiture.webp',
  },
  {
    title: 'Guide PDF 2026',
    cta: 'Télécharger le guide',
    to: '/guide',
    image: '/img/Images/guide-pdf.webp',
  },
];

const ProductGrid: React.FC = () => {
  return (
    <Section>
      <SectionTitle>Explorez Majorque avec nous</SectionTitle>
      <SectionSubtitle>Nos 4 services pour préparer votre séjour</SectionSubtitle>

      <Grid>
        {PRODUCTS.map((product, idx) => (
          <Card
            key={product.title}
            to={product.to}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <CardImageWrapper>
              <CardImage $bg={product.image} />
            </CardImageWrapper>
            <CardBody>
              <CardTitle>{product.title}</CardTitle>
              <CardCTA>
                {product.cta} <ArrowRight />
              </CardCTA>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </Section>
  );
};

export default ProductGrid;
