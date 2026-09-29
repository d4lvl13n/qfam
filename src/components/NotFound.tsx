import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Search, BookOpen, ArrowLeft, MapPin, Compass, X, Calendar, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { palette, fonts } from '../theme/mallorcaPalette';
import Header from './Header';
import Footer from './Footer';
import SEOHead from './SEOHead';

// Types for search
interface WPPost {
  id: number;
  title: { rendered: string };
  slug: string;
  date: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>;
  };
}

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(2deg); }
  75% { transform: translateY(10px) rotate(-2deg); }
`;

const wave = keyframes`
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(-5%); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, ${palette.cream} 0%, ${palette.white} 50%, ${palette.sandLight} 100%);
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  position: relative;
  overflow: hidden;
`;

// Decorative elements
const WaveBackground = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 300px;
  background: linear-gradient(180deg, transparent 0%, ${palette.sea}15 100%);
  animation: ${wave} 8s ease-in-out infinite;
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: -10%;
    right: -10%;
    height: 150px;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%230A7EA4' fill-opacity='0.1' d='M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,128C672,128,768,160,864,165.3C960,171,1056,149,1152,133.3C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E") no-repeat bottom;
    background-size: cover;
  }
`;

const FloatingIcon = styled(motion.div)<{ delay?: number; left?: string; top?: string }>`
  position: absolute;
  left: ${props => props.left || '10%'};
  top: ${props => props.top || '20%'};
  color: ${palette.sea}30;
  animation: ${float} 6s ease-in-out infinite;
  animation-delay: ${props => props.delay || 0}s;
`;

const ContentWrapper = styled(motion.div)`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 700px;
`;

const ErrorCode = styled(motion.h1)`
  font-size: clamp(8rem, 25vw, 14rem);
  font-weight: 900;
  font-family: ${fonts.heading};
  line-height: 1;
  margin: 0;
  background: linear-gradient(
    135deg,
    ${palette.sea} 0%,
    ${palette.seaDark} 25%,
    ${palette.villageGreen} 50%,
    ${palette.terracotta} 75%,
    ${palette.sea} 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${shimmer} 4s linear infinite;
  text-shadow: none;
  filter: drop-shadow(0 10px 30px ${palette.sea}30);
`;

const Title = styled(motion.h2)`
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
  font-family: ${fonts.heading};
  color: ${palette.ink};
  margin: 1rem 0 1.5rem 0;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.15rem;
  color: ${palette.inkLight};
  font-family: ${fonts.body};
  line-height: 1.7;
  margin: 0 0 2.5rem 0;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

const ButtonsContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
`;

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, ${palette.sea} 0%, ${palette.seaDark} 100%);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  font-family: ${fonts.body};
  border-radius: 100px;
  text-decoration: none;
  box-shadow: 0 10px 30px -10px ${palette.sea}60;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px -10px ${palette.sea}70;
  }
`;

const SecondaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  padding: 1rem 2rem;
  background: white;
  color: ${palette.ink};
  font-size: 1rem;
  font-weight: 600;
  font-family: ${fonts.body};
  border-radius: 100px;
  text-decoration: none;
  border: 2px solid ${palette.sandDark};
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${palette.sea};
    color: ${palette.sea};
    transform: translateY(-3px);
  }
`;

const QuickLinks = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
`;

const QuickLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background: ${palette.cream};
  color: ${palette.inkLight};
  font-size: 0.9rem;
  font-family: ${fonts.body};
  border-radius: 2rem;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${palette.sea}15;
    color: ${palette.sea};
  }
`;

const Illustration = styled(motion.div)`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

// Search Section Styles
const SearchSection = styled(motion.div)`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid ${palette.sandDark}40;
  width: 100%;
  max-width: 600px;
`;

const SearchTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${palette.ink};
  font-family: ${fonts.body};
  margin: 0 0 1rem 0;
`;

const SearchContainer = styled.div`
  position: relative;
  z-index: 100;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 100px;
  padding: 0.375rem;
  box-shadow: 0 4px 20px -8px rgba(0, 0, 0, 0.15);
  border: 2px solid ${palette.sandLight};
  transition: border-color 0.3s ease;
  
  &:focus-within {
    border-color: ${palette.sea};
  }
`;

const SearchInputWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
`;

const SearchIcon = styled.div`
  color: ${palette.sea};
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  font-family: ${fonts.body};
  color: ${palette.ink};
  background: transparent;
  
  &::placeholder {
    color: ${palette.inkLight};
  }
`;

const ClearButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background: ${palette.sandLight};
  border-radius: 50%;
  color: ${palette.inkLight};
  cursor: pointer;
  
  &:hover {
    background: ${palette.sand};
  }
`;

const SearchButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, ${palette.sea} 0%, ${palette.seaDark} 100%);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ResultsDropdown = styled(motion.div)<{ top: number; left: number; width: number }>`
  position: fixed;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  width: ${props => props.width}px;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 15px 40px -10px rgba(0, 0, 0, 0.2);
  max-height: 300px;
  overflow-y: auto;
  z-index: 9999;
`;

const ResultItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  text-decoration: none;
  border-bottom: 1px solid ${palette.sandLight};
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background: ${palette.cream};
  }
  
  &:first-child {
    border-radius: 1rem 1rem 0 0;
  }
  
  &:last-child {
    border-radius: 0 0 1rem 1rem;
  }
`;

const ResultImage = styled.div<{ src?: string }>`
  width: 50px;
  height: 50px;
  border-radius: 0.5rem;
  background: ${props => props.src ? `url(${props.src})` : palette.sandLight};
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
`;

const ResultContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const ResultTitle = styled.h4`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${palette.ink};
  margin: 0 0 0.125rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ResultMeta = styled.p`
  font-size: 0.75rem;
  color: ${palette.inkLight};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

const NoResults = styled.div`
  padding: 1.5rem;
  text-align: center;
  color: ${palette.inkLight};
  font-size: 0.9rem;
`;

const LoadingSpinner = styled(motion.div)`
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${palette.sea};
`;

// Decode HTML entities
const decodeHtml = (html: string): string => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

const NotFound: React.FC = () => {
  const { t } = useTranslation('heroSearch');
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<WPPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  // Calculate dropdown position
  useEffect(() => {
    const updatePosition = () => {
      if (searchRef.current) {
        const rect = searchRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + 8,
          left: rect.left,
          width: rect.width
        });
      }
    };

    if (showResults) {
      updatePosition();
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
      
      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [showResults]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    if (showResults) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showResults]);

  const searchPosts = async (query: string) => {
    if (query.length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setIsLoading(true);
    setShowResults(true);

    try {
      const response = await fetch(
        `https://quefaireamajorque-wordpress.captain.codolie.com/wp-json/wp/v2/posts?search=${encodeURIComponent(query)}&per_page=5&_embed`
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      searchPosts(value);
    }, 300);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/blog?search=${encodeURIComponent(searchQuery)}`);
      setShowResults(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setResults([]);
    setShowResults(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <>
      <SEOHead 
        title="Page introuvable | Que faire à Majorque" 
        description="Oops ! Cette page n'existe pas. Découvrez nos guides et articles sur Majorque."
        noIndex={true}
      />
      <PageContainer>
        <Header />
        
        <MainContent>
          <WaveBackground />
          
          {/* Floating decorative icons */}
          <FloatingIcon left="5%" top="15%" delay={0}>
            <Compass size={48} />
          </FloatingIcon>
          <FloatingIcon left="85%" top="25%" delay={1.5}>
            <MapPin size={40} />
          </FloatingIcon>
          <FloatingIcon left="10%" top="70%" delay={3}>
            <BookOpen size={36} />
          </FloatingIcon>
          <FloatingIcon left="90%" top="65%" delay={2}>
            <Search size={32} />
          </FloatingIcon>
          
          <ContentWrapper
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Illustration
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            >
              🏝️
            </Illustration>
            
            <ErrorCode
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              404
            </ErrorCode>
            
            <Title
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Oups ! Cette page s'est perdue en mer
            </Title>
            
            <Subtitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              La page que vous cherchez n'existe plus ou a peut-être changé d'adresse. 
              Pas de panique, on va vous aider à retrouver votre chemin !
            </Subtitle>
            
            <ButtonsContainer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <PrimaryButton to="/">
                <Home size={20} />
                Retour à l'accueil
              </PrimaryButton>
              <SecondaryButton to="/blog">
                <ArrowLeft size={20} />
                Voir le blog
              </SecondaryButton>
            </ButtonsContainer>
            
            <QuickLinks
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <QuickLink to="/guides">
                <BookOpen size={16} />
                Nos Guides
              </QuickLink>
              <QuickLink to="/categories">
                <Compass size={16} />
                Catégories
              </QuickLink>
              <QuickLink to="/contact">
                <MapPin size={16} />
                Contact
              </QuickLink>
            </QuickLinks>
            
            {/* Search Section */}
            <SearchSection
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <SearchTitle>🔍 Ou recherchez directement :</SearchTitle>
              <SearchContainer ref={searchRef}>
                <SearchBar>
                  <SearchInputWrapper>
                    <SearchIcon>
                      <Search size={20} />
                    </SearchIcon>
                    <SearchInput
                      type="text"
                      placeholder={t('heroSearch.searchPlaceholder')}
                      value={searchQuery}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
                    />
                    {searchQuery && (
                      <ClearButton onClick={clearSearch}>
                        <X size={14} />
                      </ClearButton>
                    )}
                  </SearchInputWrapper>
                  <SearchButton
                    onClick={handleSearch}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!searchQuery.trim()}
                  >
                    <Search size={18} />
                  </SearchButton>
                </SearchBar>

                <AnimatePresence>
                  {showResults && (
                    <ResultsDropdown
                      top={dropdownPosition.top}
                      left={dropdownPosition.left}
                      width={dropdownPosition.width}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isLoading ? (
                        <LoadingSpinner
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                          <Loader2 size={24} />
                        </LoadingSpinner>
                      ) : results.length > 0 ? (
                        results.map((post) => (
                          <ResultItem
                            key={post.id}
                            to={`/blog/${post.slug}`}
                            onClick={() => setShowResults(false)}
                          >
                            <ResultImage
                              src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url}
                            />
                            <ResultContent>
                              <ResultTitle>{decodeHtml(post.title.rendered)}</ResultTitle>
                              <ResultMeta>
                                <Calendar size={12} />
                                {formatDate(post.date)}
                              </ResultMeta>
                            </ResultContent>
                          </ResultItem>
                        ))
                      ) : searchQuery.length >= 2 ? (
                        <NoResults>
                          {t('heroSearch.noResults')} "{searchQuery}"
                        </NoResults>
                      ) : null}
                    </ResultsDropdown>
                  )}
                </AnimatePresence>
              </SearchContainer>
            </SearchSection>
          </ContentWrapper>
        </MainContent>
        
        <Footer />
      </PageContainer>
    </>
  );
};

export default NotFound;

