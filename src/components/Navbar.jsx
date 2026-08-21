import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, Search, Moon, Sun, Bookmark, ChevronDown } from 'lucide-react';
import { useTheme, useBookmarks } from '../context/AppContext.jsx';
import { useTranslation } from 'react-i18next';
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();
  const { bookmarks } = useBookmarks();
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('ar') ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      closeMenu();
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="navbar">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Brand Logo */}
          <Link to="/" onClick={closeMenu} className="navbar-brand flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[var(--primary-accent)]/20 to-[var(--primary-accent)]/5 border border-[var(--primary-accent)]/30 flex items-center justify-center text-[var(--primary-accent)] shadow-sm group-hover:shadow-[0_0_18px_rgba(37,99,235,0.35)] group-hover:scale-105 transition-all duration-300">
              <BookOpen size={24} strokeWidth={2} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-black text-[var(--text-primary)] tracking-tight">{t('navbar.brand_line1')}</span>
              <span className="text-xl font-black text-[var(--primary-accent)] tracking-tight">{t('navbar.brand_line2')}</span>
            </div>
          </Link>
          
          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-3">
            <Link 
              to="/categories" 
              className={`nav-link px-3 lg:px-4 py-2 rounded-xl text-xs lg:text-sm font-semibold transition-all border ${
                isActive('/categories') 
                  ? 'bg-[var(--primary-accent)]/10 text-[var(--primary-accent)] border-[var(--primary-accent)]/30 shadow-sm' 
                  : 'text-[var(--text-secondary)] border-transparent hover:border-[var(--border-color)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]'
              }`}
            >
              {t('navbar.articles')}
            </Link>
            <Link 
              to="/templates" 
              className={`nav-link px-3 lg:px-4 py-2 rounded-xl text-xs lg:text-sm font-semibold transition-all border ${
                isActive('/templates') 
                  ? 'bg-[var(--primary-accent)]/10 text-[var(--primary-accent)] border-[var(--primary-accent)]/30 shadow-sm' 
                  : 'text-[var(--text-secondary)] border-transparent hover:border-[var(--border-color)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]'
              }`}
            >
              {t('navbar.templates')}
            </Link>
            <Link 
              to="/standards" 
              className={`nav-link px-3 lg:px-4 py-2 rounded-xl text-xs lg:text-sm font-semibold transition-all border ${
                isActive('/standards') 
                  ? 'bg-[var(--primary-accent)]/10 text-[var(--primary-accent)] border-[var(--primary-accent)]/30 shadow-sm' 
                  : 'text-[var(--text-secondary)] border-transparent hover:border-[var(--border-color)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]'
              }`}
            >
              {t('navbar.standards')}
            </Link>
            
            {/* Dropdown for Tools & References */}
            <div className="nav-item-dropdown relative cursor-pointer group py-1">
              <div className="flex items-center gap-1.5 px-3 lg:px-4 py-2 rounded-xl text-xs lg:text-sm font-semibold text-[var(--text-secondary)] border border-transparent group-hover:border-[var(--border-color)] group-hover:text-[var(--text-primary)] group-hover:bg-[var(--bg-card)] transition-all">
                <span>{t('navbar.tools_and_refs')}</span>
                <ChevronDown size={14} className="transition-transform duration-200 group-hover:rotate-180 text-[var(--text-muted)]" />
              </div>
              <div className="dropdown-menu absolute top-full inset-inline-start-0 mt-2 hidden group-hover:block bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-2xl min-w-[220px] p-2 z-50 animate-fade-in backdrop-blur-xl">
                <Link to="/glossary" className="dropdown-link">{t('navbar.glossary')}</Link>
                <Link to="/calculators" className="dropdown-link">{t('navbar.calculators')}</Link>
                <Link to="/chart-of-accounts" className="dropdown-link">{t('navbar.chart_of_accounts')}</Link>
                <Link to="/journal-entries" className="dropdown-link">{t('navbar.journal_entries')}</Link>
                <Link to="/certifications" className="dropdown-link">{t('navbar.certifications')}</Link>
                <Link to="/courses" className="dropdown-link">{t('navbar.courses')}</Link>
              </div>
            </div>
          </nav>
        </div>

        {/* Right Actions & Search */}
        <div className="flex items-center gap-2 lg:gap-3">
          <form onSubmit={handleSearch} className="nav-search hidden lg:flex items-center m-0 bg-[var(--bg-dark)] border border-[var(--border-color)] focus-within:border-[var(--primary-accent)] focus-within:ring-2 focus-within:ring-[var(--primary-accent)]/20 rounded-full px-3.5 py-1.5 gap-2.5 transition-all w-48 xl:w-64 shadow-xs">
            <Search size={16} className="text-[var(--text-muted)] shrink-0 pointer-events-none" />
            <input 
              type="text" 
              placeholder={t('navbar.search_placeholder')} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs md:text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none p-0 leading-normal font-medium border-0 focus:ring-0"
            />
          </form>

          <div className="navbar-actions flex items-center gap-2">
            <Link to="/bookmarks" onClick={closeMenu} className="nav-action-btn relative" aria-label={i18n.language.startsWith('ar') ? 'المفضلة' : 'Bookmarks'}>
              <Bookmark size={18} className="icon" />
              {bookmarks.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[var(--primary-accent)] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {bookmarks.length}
                </span>
              )}
            </Link>

            <button 
              className="nav-action-btn nav-action-btn-text font-bold text-xs"
              onClick={toggleLanguage}
              aria-label={i18n.language.startsWith('ar') ? 'تغيير اللغة' : 'Change language'}
            >
              {i18n.language.startsWith('ar') ? 'English' : 'عربي'}
            </button>

            <button 
              className="nav-action-btn"
              onClick={toggleTheme}
              aria-label={i18n.language.startsWith('ar') ? 'تبديل المظهر' : 'Toggle theme'}
            >
              {isDarkMode ? <Sun size={18} className="icon sun-icon text-amber-400" /> : <Moon size={18} className="icon moon-icon text-slate-700" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-[var(--border-color)] bg-[var(--bg-card)]/95 backdrop-blur-xl px-4 py-6 animate-fade-in shadow-xl">
          <form onSubmit={handleSearch} className="mb-4 flex items-center bg-[var(--bg-dark)] border border-[var(--border-color)] focus-within:border-[var(--primary-accent)] rounded-xl px-3.5 py-2.5 gap-2.5">
            <Search size={18} className="text-[var(--text-muted)] shrink-0 pointer-events-none" />
            <input 
              type="text" 
              placeholder={t('navbar.search_placeholder')} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none p-0 border-0 focus:ring-0"
            />
          </form>
          <nav className="flex flex-col gap-2">
            <Link to="/categories" onClick={closeMenu} className="px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-[var(--bg-dark)] text-[var(--text-primary)]">{t('navbar.articles')}</Link>
            <Link to="/templates" onClick={closeMenu} className="px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-[var(--bg-dark)] text-[var(--text-primary)]">{t('navbar.templates')}</Link>
            <Link to="/standards" onClick={closeMenu} className="px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-[var(--bg-dark)] text-[var(--text-primary)]">{t('navbar.standards')}</Link>
            <div className="pt-2 border-t border-[var(--border-color)] mt-2">
              <span className="px-4 text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">{t('navbar.tools_and_refs')}</span>
              <div className="grid grid-cols-2 gap-1 mt-2">
                <Link to="/glossary" onClick={closeMenu} className="px-4 py-2 rounded-lg text-sm text-[var(--text-secondary)] hover:text-[var(--primary-accent)] hover:bg-[var(--bg-dark)]">{t('navbar.glossary')}</Link>
                <Link to="/calculators" onClick={closeMenu} className="px-4 py-2 rounded-lg text-sm text-[var(--text-secondary)] hover:text-[var(--primary-accent)] hover:bg-[var(--bg-dark)]">{t('navbar.calculators')}</Link>
                <Link to="/chart-of-accounts" onClick={closeMenu} className="px-4 py-2 rounded-lg text-sm text-[var(--text-secondary)] hover:text-[var(--primary-accent)] hover:bg-[var(--bg-dark)]">{t('navbar.chart_of_accounts')}</Link>
                <Link to="/journal-entries" onClick={closeMenu} className="px-4 py-2 rounded-lg text-sm text-[var(--text-secondary)] hover:text-[var(--primary-accent)] hover:bg-[var(--bg-dark)]">{t('navbar.journal_entries')}</Link>
                <Link to="/certifications" onClick={closeMenu} className="px-4 py-2 rounded-lg text-sm text-[var(--text-secondary)] hover:text-[var(--primary-accent)] hover:bg-[var(--bg-dark)]">{t('navbar.certifications')}</Link>
                <Link to="/courses" onClick={closeMenu} className="px-4 py-2 rounded-lg text-sm text-[var(--text-secondary)] hover:text-[var(--primary-accent)] hover:bg-[var(--bg-dark)]">{t('navbar.courses')}</Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
