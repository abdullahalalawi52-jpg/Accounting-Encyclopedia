import { lazy, Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import ChatbotWidget from './components/ChatbotWidget';
import { ThemeProvider } from './context/ThemeContext';
import { BookmarkProvider } from './context/BookmarkContext';
import './index.css';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const Article = lazy(() => import('./pages/Article'));
const Categories = lazy(() => import('./pages/Categories'));
const Category = lazy(() => import('./pages/Category'));
const Glossary = lazy(() => import('./pages/Glossary'));
const Faq = lazy(() => import('./pages/Faq'));
const SearchResults = lazy(() => import('./pages/SearchResults'));
const Bookmarks = lazy(() => import('./pages/Bookmarks'));
const Templates = lazy(() => import('./pages/Templates'));
const Calculators = lazy(() => import('./pages/Calculators'));
const About = lazy(() => import('./pages/About'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const ChartOfAccounts = lazy(() => import('./pages/ChartOfAccounts'));
const JournalEntries = lazy(() => import('./pages/JournalEntries'));
const Certifications = lazy(() => import('./pages/Certifications'));
const Courses = lazy(() => import('./pages/Courses'));
const Standards = lazy(() => import('./pages/Standards'));
const Tools = lazy(() => import('./pages/Tools'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading fallback component
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-12 h-12 border-4 border-[var(--primary-accent)] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const handleLanguageChange = (lng) => {
      // Force dir attribute based on language to ensure Tailwind updates correctly
      const direction = lng && lng.startsWith('ar') ? 'rtl' : 'ltr';
      document.documentElement.setAttribute('dir', direction);
      document.documentElement.setAttribute('lang', lng || 'ar');
    };
    
    handleLanguageChange(i18n.language || 'ar');
    i18n.on('languageChanged', handleLanguageChange);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  return (
    <ThemeProvider>
      <BookmarkProvider>
        <ErrorBoundary>
          <Router>
            <div className="app-container flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow pt-16">
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/article/:id" element={<Article />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/category/:id" element={<Category />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/bookmarks" element={<Bookmarks />} />
                    <Route path="/templates" element={<Templates />} />
                    <Route path="/templates/:id" element={<Templates />} />
                    <Route path="/tools" element={<Tools />} />
                    <Route path="/calculators" element={<Calculators />} />
                    <Route path="/glossary" element={<Glossary />} />
                    <Route path="/faq" element={<Faq />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/chart-of-accounts" element={<ChartOfAccounts />} />
                    <Route path="/journal-entries" element={<JournalEntries />} />
                    <Route path="/certifications" element={<Certifications />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/standards" element={<Standards />} />
                    {/* Catch-all 404 route */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
              <ChatbotWidget />
            </div>
          </Router>
        </ErrorBoundary>
      </BookmarkProvider>
    </ThemeProvider>
  );
}

export default App;
