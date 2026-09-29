import React from 'react';
import styled from 'styled-components';
import { palette, fonts } from '../theme/mallorcaPalette';
import Header from './Header';
import Footer from './Footer';
import SEOHead from './SEOHead';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${palette.white};
`;

const Content = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 8rem 2rem 6rem;

  @media (max-width: 768px) {
    padding: 6rem 1rem 4rem;
  }
`;

const Title = styled.h1`
  font-family: ${fonts.heading};
  font-size: 2.5rem;
  font-weight: 800;
  color: ${palette.ink};
  margin: 0 0 2rem;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const Section = styled.section`
  margin-bottom: 2.5rem;
`;

const SectionTitle = styled.h2`
  font-family: ${fonts.heading};
  font-size: 1.4rem;
  font-weight: 700;
  color: ${palette.ink};
  margin: 0 0 1rem;
`;

const Text = styled.p`
  font-family: ${fonts.body};
  font-size: 1rem;
  color: ${palette.inkLight};
  line-height: 1.8;
  margin: 0 0 1rem;
`;

const LastUpdated = styled.p`
  font-family: ${fonts.body};
  font-size: 0.85rem;
  color: ${palette.inkLight};
  margin: 0 0 2rem;
  font-style: italic;
`;

// --- Mentions Légales ---

export const MentionsLegales: React.FC = () => (
  <>
    <SEOHead
      title="Mentions légales — Que faire à Majorque"
      description="Mentions légales du site quefaireamajorque.com"
      url="https://quefaireamajorque.com/mentions-legales"
      canonical="https://quefaireamajorque.com/mentions-legales"
    />
    <PageContainer>
      <Header />
      <Content>
        <Title>Mentions légales</Title>
        <LastUpdated>Dernière mise à jour : Mars 2026</LastUpdated>

        <Section>
          <SectionTitle>Éditeur du site</SectionTitle>
          <Text>
            Le site quefaireamajorque.com est édité par Rony.<br />
            Adresse : Palma de Majorque, Espagne<br />
            Email : quefaireamajorque@gmail.com
          </Text>
        </Section>

        <Section>
          <SectionTitle>Hébergement</SectionTitle>
          <Text>
            Le site est hébergé par Vercel Inc.<br />
            340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.
          </Text>
        </Section>

        <Section>
          <SectionTitle>Propriété intellectuelle</SectionTitle>
          <Text>
            L'ensemble du contenu de ce site (textes, images, vidéos, logos) est protégé par le droit d'auteur.
            Toute reproduction, même partielle, est interdite sans autorisation préalable.
          </Text>
        </Section>

        <Section>
          <SectionTitle>Liens d'affiliation</SectionTitle>
          <Text>
            Ce site contient des liens d'affiliation vers des partenaires (Tiqets, TuriTop, Offugo, etc.).
            Lorsque vous effectuez un achat via ces liens, nous pouvons percevoir une commission,
            sans surcoût pour vous. Nos recommandations restent indépendantes et basées sur notre expérience personnelle.
          </Text>
        </Section>

        <Section>
          <SectionTitle>Responsabilité</SectionTitle>
          <Text>
            Les informations fournies sur ce site le sont à titre indicatif. Nous nous efforçons de les maintenir à jour,
            mais ne pouvons garantir leur exactitude à tout moment. L'utilisation des informations se fait sous votre
            entière responsabilité.
          </Text>
        </Section>
      </Content>
      <Footer />
    </PageContainer>
  </>
);

// --- Politique de confidentialité ---

export const Confidentialite: React.FC = () => (
  <>
    <SEOHead
      title="Politique de confidentialité — Que faire à Majorque"
      description="Politique de confidentialité du site quefaireamajorque.com"
      url="https://quefaireamajorque.com/confidentialite"
      canonical="https://quefaireamajorque.com/confidentialite"
    />
    <PageContainer>
      <Header />
      <Content>
        <Title>Politique de confidentialité</Title>
        <LastUpdated>Dernière mise à jour : Mars 2026</LastUpdated>

        <Section>
          <SectionTitle>Données collectées</SectionTitle>
          <Text>
            Nous collectons uniquement les données nécessaires au bon fonctionnement du site :
            données de navigation (via Google Analytics), et les informations que vous nous transmettez
            volontairement via le formulaire de contact (nom, email, message).
          </Text>
        </Section>

        <Section>
          <SectionTitle>Utilisation des données</SectionTitle>
          <Text>
            Vos données sont utilisées pour répondre à vos demandes de contact, améliorer l'expérience
            utilisateur sur le site, et analyser le trafic de manière anonyme. Nous ne vendons ni ne
            partageons vos données personnelles avec des tiers à des fins commerciales.
          </Text>
        </Section>

        <Section>
          <SectionTitle>Cookies</SectionTitle>
          <Text>
            Ce site utilise des cookies techniques nécessaires à son fonctionnement, ainsi que des cookies
            d'analyse (Google Analytics) pour mesurer l'audience. Vous pouvez configurer vos préférences
            de cookies via les paramètres de votre navigateur.
          </Text>
        </Section>

        <Section>
          <SectionTitle>Vos droits</SectionTitle>
          <Text>
            Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression
            et de portabilité de vos données. Pour exercer ces droits, contactez-nous à :
            quefaireamajorque@gmail.com
          </Text>
        </Section>
      </Content>
      <Footer />
    </PageContainer>
  </>
);

// --- Politique de cookies ---

export const Cookies: React.FC = () => (
  <>
    <SEOHead
      title="Politique de cookies — Que faire à Majorque"
      description="Politique de cookies du site quefaireamajorque.com"
      url="https://quefaireamajorque.com/cookies"
      canonical="https://quefaireamajorque.com/cookies"
    />
    <PageContainer>
      <Header />
      <Content>
        <Title>Politique de cookies</Title>
        <LastUpdated>Dernière mise à jour : Mars 2026</LastUpdated>

        <Section>
          <SectionTitle>Qu'est-ce qu'un cookie ?</SectionTitle>
          <Text>
            Un cookie est un petit fichier texte déposé sur votre appareil lors de votre visite sur un site web.
            Il permet de stocker des informations relatives à votre navigation.
          </Text>
        </Section>

        <Section>
          <SectionTitle>Cookies utilisés sur ce site</SectionTitle>
          <Text>
            <strong>Cookies techniques :</strong> nécessaires au fonctionnement du site (préférences de langue, session).<br /><br />
            <strong>Cookies d'analyse :</strong> Google Analytics — nous permettent de comprendre comment vous utilisez le site
            afin d'améliorer votre expérience. Ces données sont anonymisées.<br /><br />
            <strong>Cookies tiers :</strong> certains de nos partenaires (Tiqets, TuriTop, Elfsight) peuvent déposer
            des cookies lors de l'affichage de leurs widgets sur nos pages.
          </Text>
        </Section>

        <Section>
          <SectionTitle>Gérer vos cookies</SectionTitle>
          <Text>
            Vous pouvez à tout moment modifier vos préférences de cookies via les paramètres de votre navigateur.
            La désactivation de certains cookies peut affecter votre expérience de navigation.
          </Text>
        </Section>
      </Content>
      <Footer />
    </PageContainer>
  </>
);
