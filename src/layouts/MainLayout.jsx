import PropTypes from 'prop-types';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import ChatbotWidget from '../components/ChatbotWidget.jsx';
import { RouteErrorBoundary } from '../components/ErrorBoundary.jsx';
import { ToastProvider } from '../context/ToastContext.jsx';
import ToastContainer from '../components/ui/Toast.jsx';

/**
 * Main Shell Layout for the application
 */
export function MainLayout({ children }) {
  return (
    <ToastProvider>
      <div className="flex flex-col min-h-screen">
        {/* 1. Skip Link for Accessibility (WCAG 2.1 Compliant) */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-[var(--primary-accent)] focus:text-white focus:font-bold focus:rounded-xl focus:shadow-2xl focus:outline-none focus:ring-4 focus:ring-emerald-400"
          style={{ insetInlineStart: '1rem' }}
        >
          الانتقال مباشرة إلى المحتوى الرئيسي / Skip to content
        </a>

        {/* 2. Top Navigation Bar */}
        <Navbar />

        {/* 3. Main Content Area protected by RouteErrorBoundary */}
        <main id="main-content" className="flex-grow focus:outline-none" tabIndex="-1">
          <RouteErrorBoundary>
            {children}
          </RouteErrorBoundary>
        </main>

        {/* 4. Global Footer */}
        <Footer />

        {/* 5. Floating AI Assistant Widget */}
        <ChatbotWidget />

        {/* 6. Global Interactive Toast Notifications */}
        <ToastContainer />
      </div>
    </ToastProvider>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
