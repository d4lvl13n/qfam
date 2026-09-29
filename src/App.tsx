import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import './i18n'; // Initialize i18n
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';
import FloatingBookButton from './components/FloatingBookButton';
import WPRoute from './routes/WPRoute';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import ProductPage from './components/ProductPage';
import About from './components/About';
import GuideLanding from './components/GuideLanding';
import GuideLanding2 from './components/GuideLanding2';
import GuidesPage from './components/GuidesPage';
import CategoryPage from './components/CategoryPage';
import CategoryIndex from './components/CategoryIndex';
import TagPage from './components/TagPage';
import ThankYouGuide from './components/ThankYouGuide';
import ThankYouExpat from './components/ThankYouExpat';
import LandingPageAlt from './components/LandingPageAlt';
import GoogleAnalytics from './components/GoogleAnalytics';
import ExperienceDetailPage from './components/ExperienceDetailPage';
import { MentionsLegales, Confidentialite, Cookies } from './components/LegalPage';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Google Analytics - tracks page views automatically */}
        <GoogleAnalytics />
        
        <Routes>
          <Route path="/" element={<LandingPageAlt />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/categories" element={<CategoryIndex />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/tag/:slug" element={<TagPage />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/guides" element={<GuidesPage />} />
          <Route path="/guide" element={<GuideLanding />} />
          <Route path="/guide-expatriation" element={<GuideLanding2 />} />
          {/* Thank you pages after Stripe purchase (stealth URLs) */}
          <Route path="/c/v7k9m2p" element={<ThankYouGuide />} />
          <Route path="/c/n3j8f5q" element={<ThankYouExpat />} />
          {/* Experiences / Activities */}
          <Route path="/experiences/:slug" element={<ExperienceDetailPage />} />
          {/* Legal pages */}
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
          <Route path="/cookies" element={<Cookies />} />
          {/* Blog routes (custom front, REST API) */}
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          {/* Product routes */}
          <Route path="/products/:slug" element={<ProductPage />} />
          {/* Catch-all for WP headless URLs (e.g., /2025/10/26/post-slug/) */}
          <Route path="*" element={<WPRoute />} />
        </Routes>
        <Analytics />
        <FloatingBookButton />
        <FloatingWhatsAppButton />
      </div>
    </Router>
  );
}

export default App; 