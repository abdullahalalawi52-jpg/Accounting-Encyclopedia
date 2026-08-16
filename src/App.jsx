import { lazy, Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { AppProvider } from './context/AppContext.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import { ROUTES } from './constants/routes.js';
import './index.css';

// Code-split lazy-loaded pages
const Home = lazy(() => import('./pages/Home.jsx'));
const Article = lazy(() => import('./pages/Article.jsx'));
const Categories = lazy(() => import('./pages/Categories.jsx'));
const Category = lazy(() => import('./pages/Category.jsx'));
const Glossary = lazy(() => import('./pages/Glossary.jsx'));
const Faq = lazy(() => import('./pages/Faq.jsx'));
const SearchResults = lazy(() => import('./pages/SearchResults.jsx'));
const Bookmarks = lazy(() => import('./pages/Bookmarks.jsx'));
const Templates = lazy(() => import('./pages/Templates.jsx'));
const Calculators = lazy(() => import('./pages/Calculators.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Privacy = lazy(() => import('./pages/Privacy.jsx'));
const Terms = lazy(() => import('./pages/Terms.jsx'));
const ChartOfAccounts = lazy(() => import('./pages/ChartOfAccounts.jsx'));
const JournalEntries = lazy(() => import('./pages/JournalEntries.jsx'));
const Certifications = lazy(() => import('./pages/Certifications.jsx'));
const Courses = lazy(() => import('./pages/Courses.jsx'));
const Standards = lazy(() => import('./pages/Standards.jsx'));
const Tools = lazy(() => import('./pages/Tools.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

// Accessible, smooth loading fallback
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
    <AppProvider>
      <ErrorBoundary variant="global">
        <Router>
          <MainLayout>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path={ROUTES.HOME} element={<Home />} />
                <Route path={ROUTES.ARTICLE()} element={<Article />} />
                <Route path={ROUTES.CATEGORIES} element={<Categories />} />
                <Route path={ROUTES.CATEGORY()} element={<Category />} />
                <Route path={ROUTES.SEARCH} element={<SearchResults />} />
                <Route path={ROUTES.BOOKMARKS} element={<Bookmarks />} />
                <Route path={ROUTES.TEMPLATES} element={<Templates />} />
                <Route path={`${ROUTES.TEMPLATES}/:id`} element={<Templates />} />
                <Route path={ROUTES.TOOLS} element={<Tools />} />
                <Route path={ROUTES.CALCULATORS} element={<Calculators />} />
                <Route path={ROUTES.GLOSSARY} element={<Glossary />} />
                <Route path={ROUTES.FAQ} element={<Faq />} />
                <Route path={ROUTES.ABOUT} element={<About />} />
                <Route path={ROUTES.PRIVACY} element={<Privacy />} />
                <Route path={ROUTES.TERMS} element={<Terms />} />
                <Route path={ROUTES.CHART_OF_ACCOUNTS} element={<ChartOfAccounts />} />
                <Route path={ROUTES.JOURNAL_ENTRIES} element={<JournalEntries />} />
                <Route path={ROUTES.CERTIFICATIONS} element={<Certifications />} />
                <Route path={ROUTES.COURSES} element={<Courses />} />
                <Route path={ROUTES.STANDARDS} element={<Standards />} />
                <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
              </Routes>
            </Suspense>
          </MainLayout>
        </Router>
      </ErrorBoundary>
    </AppProvider>
  );
}

export default App;
