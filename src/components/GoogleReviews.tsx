import React, { useEffect } from 'react';
import styled from 'styled-components';

declare global {
  interface Window {
    eapps?: { initWidgets: () => void };
  }
}
import { useTranslation } from 'react-i18next';
import { palette, gradients, fonts } from '../theme/mallorcaPalette';

const Section = styled.section`
  background: ${palette.white};
  padding: 4rem 1.5rem;
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-family: ${fonts.heading};
  font-weight: 800;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  color: ${palette.ink};
  margin: 0 0 0.5rem 0;
`;

const WidgetContainer = styled.div`
  background: ${palette.white};
  border-radius: 1rem;
  min-height: 220px;
`;

const CTA = styled.a`
  display: inline-block;
  margin-top: 1.25rem;
  padding: 0.75rem 1.25rem;
  border-radius: 0.75rem;
  background: ${gradients.seaSky};
  color: ${palette.white};
  text-decoration: none;
  font-family: ${fonts.body};
  font-weight: 600;
`;

const GoogleReviews: React.FC = () => {
  const { t } = useTranslation('common');

  useEffect(() => {
    const scriptSrc = 'https://static.elfsight.com/platform/platform.js';
    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = scriptSrc;
      script.async = true;
      document.body.appendChild(script);
    } else if (window.eapps) {
      // Script already loaded from a previous navigation — force re-init
      try {
        window.eapps.initWidgets();
      } catch (_) {
        // silent
      }
    }
  }, []);

  return (
    <Section>
      <Container>
        <Header>
          <Title>{t('home.reviews.title')}</Title>
        </Header>

        <div style={{ textAlign: 'center' }}>
          <WidgetContainer>
            <div
              className="elfsight-app-80700202-6e4b-4af1-882e-bb385b21290a"
              data-elfsight-app-lazy
            />
          </WidgetContainer>
          <CTA href="#products">{t('home.reviews.cta')}</CTA>
        </div>
      </Container>
    </Section>
  );
};

export default GoogleReviews;


