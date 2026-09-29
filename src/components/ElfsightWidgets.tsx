import React, { useEffect } from 'react';
import styled from 'styled-components';
import { palette, fonts } from '../theme/mallorcaPalette';
import themeConfig from '../theme/themeConfig';

declare global {
  interface Window {
    eapps?: { initWidgets: () => void };
  }
}

const ELFSIGHT_SCRIPT_SRC = 'https://static.elfsight.com/platform/platform.js';

// Widget IDs
const INSTAGRAM_FEED_ID = 'elfsight-app-17270c0a-c746-4546-a6d8-c75389efac39';

// ─── Styled Components ──────────────────────────────────────────────

const WidgetsSection = styled.section`
  background: ${palette.white};
`;

const InstagramBlock = styled.div`
  padding: 3.5rem 1.5rem 2rem;
`;

const BlockContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const BlockHeader = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const BlockTitle = styled.h2`
  font-family: ${fonts.heading};
  font-weight: 800;
  font-size: clamp(1.6rem, 3.5vw, 2.2rem);
  color: ${palette.ink};
  margin: 0 0 0.25rem 0;
`;

const BlockSubtitle = styled.p`
  font-family: ${fonts.body};
  font-size: 1rem;
  color: ${themeConfig.text.secondary};
  margin: 0;
`;

const WidgetContainer = styled.div`
  min-height: 200px;
`;

// ─── Component ──────────────────────────────────────────────────────

const ElfsightWidgets: React.FC = () => {
  useEffect(() => {
    const existingScript = document.querySelector(
      `script[src="${ELFSIGHT_SCRIPT_SRC}"]`
    );

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = ELFSIGHT_SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    } else if (window.eapps) {
      try {
        window.eapps.initWidgets();
      } catch (_) {
        // silent
      }
    }
  }, []);

  return (
    <WidgetsSection>
      {/* Instagram Feed */}
      <InstagramBlock>
        <BlockContainer>
          <BlockHeader>
            <BlockTitle>Suivez-nous sur Instagram</BlockTitle>
            <BlockSubtitle>
              Les coulisses de nos aventures majorquines
            </BlockSubtitle>
          </BlockHeader>
          <WidgetContainer>
            <div className={INSTAGRAM_FEED_ID} data-elfsight-app-lazy />
          </WidgetContainer>
        </BlockContainer>
      </InstagramBlock>
    </WidgetsSection>
  );
};

export default ElfsightWidgets;
