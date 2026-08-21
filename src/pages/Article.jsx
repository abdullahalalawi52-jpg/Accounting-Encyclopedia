import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ChevronRight, Calendar, User, Tag, Bookmark, ArrowRight, ArrowLeft, Eye, Share2, ZoomIn, ZoomOut } from 'lucide-react';
import { sanitizeHTML } from '../utils/security.js';
import { useData } from '../hooks/useData.js';
import { useBookmarks } from '../context/AppContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { useTranslation } from 'react-i18next';
import ArticleQuiz from '../components/ArticleQuiz.jsx';
import './Article.css';

function Article() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const isEn = i18n.language?.startsWith('en');
  const { addToast } = useToast();
  
  const { data: articles, loading: loadingArticles } = useData('/data/articles.json');
  const { data: quizzesData } = useData('/data/quizzes.json');
  
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1); // 0.9, 1, 1.15, 1.3

  const article = articles?.find(a => String(a.id) === id);
  const articleQuiz = quizzesData ? quizzesData[id] : null;

  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(id);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast(isEn ? 'Article link copied to clipboard!' : 'تم نسخ رابط المقال للمشاركة!');
    }
  };

  const increaseFont = () => {
    setFontSizeMultiplier(prev => Math.min(1.4, prev + 0.1));
  };

  const decreaseFont = () => {
    setFontSizeMultiplier(prev => Math.max(0.85, prev - 0.1));
  };

  if (loadingArticles) {
    return (
      <div className="article-page flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-xl mb-4 text-[var(--text-secondary)]">{t('article_page.loading')}</h2>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="article-page flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-3xl mb-3 text-[var(--primary-accent)] font-extrabold">{t('article_page.not_found')}</h2>
          <p className="text-[var(--text-muted)] mb-6 max-w-md mx-auto">{t('article_page.not_found_desc')}</p>
          <Link to="/categories" className="btn btn-primary">{t('article_page.back_cats')}</Link>
        </div>
      </div>
    );
  }

  // Dynamic related articles (prioritize same category)
  const relatedArticles = articles
    ? articles.filter(a => String(a.id) !== id && a.categoryId === article.categoryId).slice(0, 3)
    : [];
  const displayRelated = relatedArticles.length > 0
    ? relatedArticles
    : (articles ? articles.filter(a => String(a.id) !== id).slice(0, 3) : []);

  return (
    <div className="article-page animate-fade-in relative">
      {/* 1. Fixed Reading Progress Bar at the top */}
      <div 
        className="fixed top-0 left-0 right-0 h-1.5 z-50 bg-slate-800/40 pointer-events-none"
        aria-hidden="true"
      >
        <div 
          className="h-full bg-gradient-to-r from-[var(--primary-accent)] via-sky-400 to-cyan-400 transition-all duration-150 shadow-[0_0_8px_rgba(56,189,248,0.5)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="container py-8">
        {/* Breadcrumb */}
        {!isFocusMode && (
          <div className="breadcrumb flex items-center gap-2 mb-6 text-sm text-[var(--text-muted)] flex-wrap">
            <Link to="/" className="hover:text-[var(--primary-accent)]">{t('article_page.home')}</Link>
            <ChevronRight size={14} className={isEn ? '' : 'rotate-180'} />
            <Link to={`/category/${article.categoryId}`} className="hover:text-[var(--primary-accent)]">
              {isEn && article.categoryName_en ? article.categoryName_en : article.categoryName}
            </Link>
            <ChevronRight size={14} className={isEn ? '' : 'rotate-180'} />
            <span className="current text-[var(--text-primary)] font-semibold truncate max-w-xs sm:max-w-md">
              {isEn && article.title_en ? article.title_en : article.title}
            </span>
          </div>
        )}

        {/* Reader Control Toolbar */}
        <div className="flex items-center justify-between gap-3 mb-6 p-3 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFocusMode(!isFocusMode)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isFocusMode 
                  ? 'bg-[var(--primary-accent)] text-white shadow-md' 
                  : 'bg-[var(--bg-main)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)]'
              }`}
              title={isFocusMode ? (isEn ? 'Exit Focus Mode' : 'الخروج من وضع التركيز') : (isEn ? 'Focus Mode' : 'وضع القراءة المركز')}
            >
              <Eye size={14} />
              <span>{isFocusMode ? (isEn ? 'Exit Focus' : 'وضع عادي') : (isEn ? 'Focus Mode' : 'وضع القارئ المركز')}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Font Zoom Controls */}
            <button
              onClick={decreaseFont}
              className="p-1.5 rounded-lg bg-[var(--bg-main)] hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-color)] transition-colors"
              title={isEn ? 'Decrease Font' : 'تصغير الخط'}
            >
              <ZoomOut size={15} />
            </button>
            <span className="text-xs font-mono text-[var(--text-muted)] px-1">
              {Math.round(fontSizeMultiplier * 100)}%
            </span>
            <button
              onClick={increaseFont}
              className="p-1.5 rounded-lg bg-[var(--bg-main)] hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-color)] transition-colors"
              title={isEn ? 'Increase Font' : 'تكبير الخط'}
            >
              <ZoomIn size={15} />
            </button>

            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg bg-[var(--bg-main)] hover:text-[var(--primary-accent)] hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-color)] transition-colors ms-1"
              title={isEn ? 'Share Article' : 'مشاركة المقال'}
            >
              <Share2 size={15} />
            </button>
          </div>
        </div>

        {/* Article Body Layout */}
        <div className={`grid grid-cols-1 gap-8 ${isFocusMode ? 'max-w-3xl mx-auto' : 'lg:grid-cols-3'}`}>
          <div className={`main-content col-span-1 glass-panel p-6 sm:p-10 rounded-2xl ${isFocusMode ? 'w-full shadow-2xl' : 'lg:col-span-2'}`}>
            <div className="flex items-center justify-between mb-4 gap-4">
              <h1 className="article-title mb-0 text-2xl sm:text-3xl font-extrabold leading-tight text-[var(--text-primary)]">
                {isEn && article.title_en ? article.title_en : article.title}
              </h1>
              <button 
                onClick={() => toggleBookmark(id)} 
                className="btn-icon p-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[var(--primary-accent)] transition-all shrink-0" 
                style={{ color: bookmarked ? 'var(--primary-accent)' : 'var(--text-muted)' }}
                title={bookmarked ? t('article_page.bookmark_rem') : t('article_page.bookmark_add')}
                aria-label={bookmarked ? t('article_page.bookmark_rem') : t('article_page.bookmark_add')}
              >
                <Bookmark size={24} fill={bookmarked ? 'currentColor' : 'none'} />
              </button>
            </div>
            
            <div className="article-meta flex items-center gap-4 sm:gap-6 mb-8 text-xs sm:text-sm text-[var(--text-muted)] flex-wrap border-b border-[var(--border-color)] pb-4">
              <span className="flex items-center gap-1.5"><User size={15}/> {isEn ? 'Accounting Encyclopedia' : (article.author || 'فريق الموسوعة')}</span>
              <span className="flex items-center gap-1.5"><Calendar size={15}/> {article.date}</span>
              <span className="flex items-center gap-1.5"><Tag size={15}/> {isEn && article.categoryName_en ? article.categoryName_en : article.categoryName}</span>
            </div>

            <div 
              className="article-body leading-relaxed text-[var(--text-primary)] transition-all"
              style={{ fontSize: `${1.05 * fontSizeMultiplier}rem`, lineHeight: `${1.8 * fontSizeMultiplier}` }}
              dangerouslySetInnerHTML={{ __html: sanitizeHTML((isEn && article.content_en ? article.content_en : article.content) || '') }}
            />
            
            {articleQuiz && <ArticleQuiz quizData={articleQuiz} t={t} isEn={isEn} />}
          </div>

          {/* Sidebar (hidden in Focus Mode) */}
          {!isFocusMode && (
            <aside className="sidebar col-span-1 flex flex-col gap-6">
              {displayRelated.length > 0 && (
                <div className="glass-panel rounded-2xl border border-[var(--border-color)] p-6 shadow-sm overflow-hidden">
                  <h3 className="sidebar-title font-bold text-lg text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--border-color)]">
                    {t('article_page.related')}
                  </h3>
                  <ul className="related-links flex flex-col gap-3 list-none p-0 m-0">
                    {displayRelated.map((rel) => (
                      <li key={rel.id}>
                        <Link 
                          to={`/article/${rel.id}`}
                          className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--primary-accent)] transition-colors flex items-center gap-2 group"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-accent)] shrink-0"></span>
                          <span className="line-clamp-2 leading-snug">
                            {isEn && rel.title_en ? rel.title_en : rel.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="glass-panel rounded-2xl border border-[var(--border-color)] p-6 shadow-sm overflow-hidden">
                <h3 className="sidebar-title font-bold text-lg text-[var(--text-primary)] mb-2">{t('article_page.forum_title')}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">{t('article_page.forum_desc')}</p>
                <Link 
                  to="/faq" 
                  className="btn btn-secondary w-full rounded-xl font-bold text-sm py-2.5 flex items-center justify-center gap-2"
                >
                  <span>{t('article_page.forum_btn')}</span>
                  {isEn ? <ArrowRight size={15} /> : <ArrowLeft size={15} />}
                </Link>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}

export default Article;
