import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Search, Menu, X, Globe, Moon, Sun, Bookmark } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useBookmarks } from '../context/BookmarkContext';
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const { bookmarks } = useBookmarks();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="navbar">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="navbar-brand flex items-center gap-3">
            <div className="text-[var(--text-primary)]">
              <BookOpen size={36} strokeWidth={1.5} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-black text-[var(--text-primary)] tracking-tight">موسوعة</span>
              <span className="text-2xl font-black text-[var(--text-primary)] tracking-tight">المحاسبة</span>
            </div>
          </Link>
          
          <nav className={`navbar-nav ${isMenuOpen ? 'open' : ''} flex items-center gap-2`}>
            <Link to="/categories" className="nav-link">المقالات</Link>
            <Link to="/templates" className="nav-link">نماذج وقوالب</Link>
            <Link to="/standards" className="nav-link">القوانين والمعايير</Link>
            
            <div className="nav-item-dropdown relative cursor-pointer group">
              <Link to="/tools" className="nav-link block">أدوات ومراجع</Link>
              <div className="dropdown-menu absolute top-full right-0 mt-2 hidden group-hover:block bg-[var(--bg-card)] border border-[var(--border-color)] rounded-md shadow-lg min-w-[200px] p-2 z-50">
                <Link to="/glossary" className="dropdown-link">القاموس المحاسبي</Link>
                <Link to="/calculators" className="dropdown-link">حاسبات ذكية</Link>
                <Link to="/chart-of-accounts" className="dropdown-link">دليل الحسابات</Link>
                <Link to="/journal-entries" className="dropdown-link">مكتبة القيود</Link>
                <Link to="/certifications" className="dropdown-link">الشهادات المهنية</Link>
                <Link to="/courses" className="dropdown-link">الدورات التعليمية</Link>
              </div>
            </div>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="nav-search hidden lg:block m-0 max-w-[250px]">
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              placeholder="بحث في الموسوعة..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <div className="navbar-actions">
            <Link to="/bookmarks" className="nav-action-btn relative" aria-label="المفضلة">
              <Bookmark size={18} className="icon" />
              {bookmarks.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[var(--primary-accent)] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {bookmarks.length}
                </span>
              )}
            </Link>
            <button 
              className="nav-action-btn"
              onClick={toggleTheme}
              aria-label="تبديل المظهر"
            >
              {isDarkMode ? <Sun size={18} className="icon sun-icon" /> : <Moon size={18} className="icon moon-icon" />}
            </button>
            <button className="md-hidden" onClick={toggleMenu} aria-label="Menu">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
