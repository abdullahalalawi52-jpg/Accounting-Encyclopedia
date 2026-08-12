import { Link } from 'react-router-dom';
import { BookOpen, Globe, Mail, Share2 } from 'lucide-react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col brand-col">
            <Link to="/" className="footer-brand flex items-center gap-2 mb-4">
              <BookOpen size={24} color="var(--primary-accent)" />
              <span className="font-bold text-xl text-[var(--text-primary)]">موسوعة المحاسبة</span>
            </Link>
            <p className="footer-desc text-[var(--text-muted)]">
              الموسوعة العربية الشاملة لكل ما يخص المحاسبة، المعايير المالية، والزكاة والضريبة. مرجعك الأول الموثوق.
            </p>
          </div>

          <div className="footer-col text-start flex flex-col items-start">
            <h4 className="footer-title">التصنيفات</h4>
            <div className="footer-links flex flex-col items-start w-full">
              <Link to="/category/financial">محاسبة مالية</Link>
              <Link to="/category/cost">محاسبة تكاليف</Link>
              <Link to="/category/audit">المراجعة والتدقيق</Link>
            </div>
          </div>

          <div className="footer-col text-start flex flex-col items-start">
            <h4 className="footer-title">روابط سريعة</h4>
            <div className="footer-links flex flex-col items-start w-full">
              <Link to="/about">من نحن</Link>
              <Link to="/contact">اتصل بنا</Link>
              <Link to="/privacy">سياسة الخصوصية</Link>
              <Link to="/terms">الشروط والأحكام</Link>
            </div>
          </div>

          <div className="footer-social">
            <h4 className="footer-heading">تواصل معنا</h4>
            <div className="social-icons">
              <a href="#" className="social-icon" aria-label="Website"><Globe size={20} /></a>
              <a href="#" className="social-icon" aria-label="Email"><Mail size={20} /></a>
              <a href="#" className="social-icon" aria-label="Share"><Share2 size={20} /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom text-center">
          <p>© {new Date().getFullYear()} موسوعة المحاسبة. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
