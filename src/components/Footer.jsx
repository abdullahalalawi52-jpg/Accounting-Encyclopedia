import { Link } from 'react-router-dom';
import { BookOpen, Globe, Mail, Share2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './Footer.css';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col brand-col">
            <Link to="/" className="footer-brand flex items-center gap-2 mb-4">
              <BookOpen size={24} color="var(--primary-accent)" />
              <span className="font-bold text-xl text-[var(--text-primary)]">{t('footer.brand')}</span>
            </Link>
            <p className="footer-desc text-[var(--text-muted)]">
              {t('footer.description')}
            </p>
          </div>

          <div className="footer-col text-start flex flex-col items-start">
            <h4 className="footer-title">{t('footer.categories')}</h4>
            <div className="footer-links flex flex-col items-start w-full">
              <Link to="/category/financial">{t('footer.financial_accounting')}</Link>
              <Link to="/category/cost">{t('footer.cost_accounting')}</Link>
              <Link to="/category/audit">{t('footer.auditing')}</Link>
            </div>
          </div>

          <div className="footer-col text-start flex flex-col items-start">
            <h4 className="footer-title">{t('footer.quick_links')}</h4>
            <div className="footer-links flex flex-col items-start w-full">
              <Link to="/about">{t('footer.about')}</Link>
              <Link to="/contact">{t('footer.contact')}</Link>
              <Link to="/privacy">{t('footer.privacy')}</Link>
              <Link to="/terms">{t('footer.terms')}</Link>
            </div>
          </div>

          <div className="footer-social">
            <h4 className="footer-heading">{t('footer.connect_with_us')}</h4>
            <div className="social-icons">
              <a href="#" className="social-icon" aria-label="Website"><Globe size={20} /></a>
              <a href="#" className="social-icon" aria-label="Email"><Mail size={20} /></a>
              <a href="#" className="social-icon" aria-label="Share"><Share2 size={20} /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom text-center">
          <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
