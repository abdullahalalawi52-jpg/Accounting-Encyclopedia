import { Link } from 'react-router-dom';
import { BookOpen, Globe, Mail, Share2, ArrowUp, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './Footer.css';

function Footer() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer relative mt-20 border-t border-[var(--border-color)] bg-[var(--bg-dark)]">
      <div className="container py-12">
        <div className="footer-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Col */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-brand flex items-center gap-3 mb-4 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[var(--primary-accent)]/20 to-[var(--primary-accent)]/5 border border-[var(--primary-accent)]/30 flex items-center justify-center text-[var(--primary-accent)] shadow-sm">
                <BookOpen size={22} strokeWidth={2} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-black text-lg text-[var(--text-primary)]">{t('footer.brand')}</span>
                <span className="text-xs text-[var(--primary-accent)] font-bold">{isEn ? 'Accounting Knowledge' : 'الموسوعة المحاسبية'}</span>
              </div>
            </Link>
            <p className="footer-desc text-[var(--text-muted)] text-sm leading-relaxed mb-4">
              {t('footer.description')}
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)] font-semibold">
              <Sparkles size={13} className="text-[var(--primary-accent)]" />
              <span>{isEn ? 'Updated for 2026 Standards' : 'محدث لمعايير عام 2026'}</span>
            </div>
          </div>

          {/* Categories Col */}
          <div className="footer-col text-start flex flex-col items-start">
            <h4 className="footer-title text-base font-bold text-[var(--text-primary)] mb-4">{t('footer.categories')}</h4>
            <div className="footer-links flex flex-col items-start gap-2.5 w-full text-sm">
              <Link to="/categories?cat=financial" className="text-[var(--text-secondary)] hover:text-[var(--primary-accent)] transition-colors">{t('footer.financial_accounting')}</Link>
              <Link to="/categories?cat=cost" className="text-[var(--text-secondary)] hover:text-[var(--primary-accent)] transition-colors">{t('footer.cost_accounting')}</Link>
              <Link to="/categories?cat=audit" className="text-[var(--text-secondary)] hover:text-[var(--primary-accent)] transition-colors">{t('footer.auditing')}</Link>
              <Link to="/categories?cat=tax" className="text-[var(--text-secondary)] hover:text-[var(--primary-accent)] transition-colors">{isEn ? 'Tax & Zakat' : 'الضرائب والزكاة'}</Link>
            </div>
          </div>

          {/* Quick Links Col */}
          <div className="footer-col text-start flex flex-col items-start">
            <h4 className="footer-title text-base font-bold text-[var(--text-primary)] mb-4">{t('footer.quick_links')}</h4>
            <div className="footer-links flex flex-col items-start gap-2.5 w-full text-sm">
              <Link to="/templates" className="text-[var(--text-secondary)] hover:text-[var(--primary-accent)] transition-colors">{t('navbar.templates')}</Link>
              <Link to="/standards" className="text-[var(--text-secondary)] hover:text-[var(--primary-accent)] transition-colors">{t('navbar.standards')}</Link>
              <Link to="/glossary" className="text-[var(--text-secondary)] hover:text-[var(--primary-accent)] transition-colors">{t('navbar.glossary')}</Link>
              <Link to="/calculators" className="text-[var(--text-secondary)] hover:text-[var(--primary-accent)] transition-colors">{t('navbar.calculators')}</Link>
            </div>
          </div>

          {/* Connect / Social Col */}
          <div className="footer-social flex flex-col items-start">
            <h4 className="footer-heading text-base font-bold text-[var(--text-primary)] mb-4">{t('footer.connect_with_us')}</h4>
            <p className="text-xs text-[var(--text-muted)] mb-4 leading-relaxed">
              {isEn ? 'Connect with our platform or share with colleagues.' : 'تواصل معنا أو شارك المنصة مع زملائك.'}
            </p>
            <div className="social-icons flex items-center gap-2.5 mb-6">
              <a href="#" className="social-icon" aria-label="Website"><Globe size={18} /></a>
              <a href="mailto:contact@accounting-encyclopedia.com" className="social-icon" aria-label="Email"><Mail size={18} /></a>
              <a href="#" className="social-icon" aria-label="Share"><Share2 size={18} /></a>
            </div>
            <button 
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:border-[var(--primary-accent)] hover:text-[var(--primary-accent)] transition-all shadow-sm group"
            >
              <ArrowUp size={14} className="transition-transform group-hover:-translate-y-0.5" />
              <span>{isEn ? 'Back to top' : 'الرجوع للأعلى'}</span>
            </button>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom pt-6 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <p className="m-0">{t('footer.copyright', { year: new Date().getFullYear() })}</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-[var(--text-primary)] transition-colors">{t('footer.privacy')}</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-[var(--text-primary)] transition-colors">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
