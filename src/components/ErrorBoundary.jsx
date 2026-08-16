import { Component } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  componentDidUpdate(prevProps) {
    // Automatically reset error if resetKey (like route path) changed
    if (this.props.resetKey !== undefined && prevProps.resetKey !== this.props.resetKey) {
      if (this.state.hasError) {
        this.handleReset();
      }
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        if (typeof this.props.fallback === 'function') {
          return this.props.fallback(this.state.error, this.handleReset);
        }
        return this.props.fallback;
      }

      const isEn = Boolean(this.props.isEn);
      const isCard = this.props.variant === 'card';
      const isPage = this.props.variant === 'page';

      if (isCard) {
        return (
          <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-red-500/30 text-center my-4 shadow-sm">
            <AlertTriangle className="mx-auto text-amber-500 mb-2" size={28} />
            <h4 className="font-bold text-sm text-[var(--text-primary)] mb-1">
              {isEn ? 'Component Error' : 'حدث خطأ في تحميل هذا العنصر'}
            </h4>
            <p className="text-xs text-[var(--text-muted)] mb-3">
              {isEn ? 'Unable to display this part of the interface.' : 'تعذر عرض هذا الجزء بشكل صحيح.'}
            </p>
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[var(--primary-accent)] text-white hover:bg-[var(--primary-hover)] transition-all"
            >
              <RefreshCw size={13} />
              <span>{isEn ? 'Retry' : 'إعادة المحاولة'}</span>
            </button>
          </div>
        );
      }

      return (
        <div className={`flex flex-col items-center justify-center text-center px-4 ${isPage ? 'py-16 min-h-[50vh]' : 'py-20 min-h-[70vh]'}`}>
          <div className="p-5 rounded-3xl bg-red-500/10 border border-red-500/20 mb-6 shadow-lg shadow-red-500/5 animate-pulse">
            <AlertTriangle size={isPage ? 40 : 48} className="text-red-500" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] mb-3 leading-snug">
            {isPage
              ? (isEn ? 'Unable to Load Page Content' : 'تعذر عرض محتوى الصفحة')
              : (isEn ? 'An Unexpected Error Occurred' : 'حدث خطأ غير متوقع')}
          </h2>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-md mb-8 leading-relaxed">
            {isPage
              ? (isEn ? 'An error occurred while loading this page. You can retry or navigate to another section from the menu above.' : 'حدث خطأ أثناء معالجة الصفحة. يمكنك المحاولة مجدداً أو الانتقال لأي قسم آخر عبر شريط التنقل بالأعلى.')
              : (isEn ? 'Sorry, something went wrong while running the application. Please try reloading.' : 'عذراً، حدث خطأ أثناء تشغيل المنصة. يرجى المحاولة مرة أخرى.')}
          </p>

          {import.meta.env.MODE === 'development' && this.state.error && (
            <pre className="bg-[var(--bg-dark)] text-red-400 p-4 rounded-xl text-xs text-left max-w-xl w-full overflow-auto mb-6 border border-red-500/20 font-mono shadow-inner" dir="ltr">
              {this.state.error.toString()}
            </pre>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={this.handleReset}
              className="bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] text-white font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md active:scale-95 text-sm"
            >
              <RefreshCw size={16} />
              <span>{isEn ? 'Try Again' : 'إعادة المحاولة'}</span>
            </button>

            {this.props.onGoHome && (
              <button
                onClick={this.props.onGoHome}
                className="bg-[var(--bg-card)] hover:bg-[var(--bg-dark)] text-[var(--text-primary)] border border-[var(--border-color)] font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-sm active:scale-95 text-sm"
              >
                <Home size={16} />
                <span>{isEn ? 'Back to Home' : 'العودة للرئيسية'}</span>
              </button>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
  fallback: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  variant: PropTypes.oneOf(['global', 'page', 'card']),
  resetKey: PropTypes.any,
  onReset: PropTypes.func,
  onGoHome: PropTypes.func,
  isEn: PropTypes.bool,
};

/**
 * RouteErrorBoundary
 * Automatically connects to React Router location and i18n
 * to provide route-isolated fault tolerance.
 */
export function RouteErrorBoundary({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language?.startsWith('en');

  return (
    <ErrorBoundary
      variant="page"
      resetKey={location.pathname}
      isEn={isEn}
      onGoHome={() => navigate('/')}
    >
      {children}
    </ErrorBoundary>
  );
}

RouteErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
