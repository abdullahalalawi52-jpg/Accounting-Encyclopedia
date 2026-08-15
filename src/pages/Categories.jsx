import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNewsAPI } from '../hooks/useNewsAPI.js';
import ArticleCard from '../components/cards/ArticleCard.jsx';
import PageHero from '../components/ui/PageHero.jsx';
import './Categories.css';

const ALL_CATEGORIES = [
  { id: 'all', ar: 'الكل', en: 'All' },
  { id: 'financial', ar: 'المحاسبة المالية', en: 'Financial Accounting' },
  { id: 'cost', ar: 'محاسبة التكاليف', en: 'Cost Accounting' },
  { id: 'audit', ar: 'المراجعة والتدقيق', en: 'Auditing' },
  { id: 'tax', ar: 'الضرائب والزكاة', en: 'Tax & Zakat' },
  { id: 'standards', ar: 'المعايير والقوانين', en: 'Standards & Laws' },
  { id: 'managerial', ar: 'المحاسبة الإدارية', en: 'Managerial Accounting' },
  { id: 'specialized', ar: 'المحاسبة المتخصصة', en: 'Specialized Accounting' }
];

function Categories() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  const { data: articles, loading } = useNewsAPI();

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setCurrentPage(1);
  };

  const filteredArticles = loading ? [] : (activeCategory === 'all' 
    ? (articles || []) 
    : (articles || []).filter(article => article.categoryId === activeCategory));

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / itemsPerPage));
  const paginatedArticles = filteredArticles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="archive-page animate-fade-in pb-10">
      <PageHero 
        title={t('categories.page_title')}
        description={t('categories.page_desc')}
      />

      <div className="container py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4 flex-shrink-0">
            <div className="card bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm mb-6 sticky top-24">
              <h3 className="font-bold text-[var(--text-primary)] text-lg mb-5 flex items-center gap-2.5 border-b border-[var(--border-color)]/60 pb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--primary-accent)] shadow-sm shadow-[var(--primary-accent)]/50"></span> {t('categories.sidebar_title')}
              </h3>
              <div className="flex flex-col gap-1.5">
                {ALL_CATEGORIES.map(cat => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <label 
                      key={cat.id} 
                      className={`radio-label px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-3 ${
                        isActive 
                          ? 'bg-[var(--primary-accent)]/10 text-[var(--primary-accent)] font-semibold' 
                          : 'hover:bg-[var(--bg-main)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="category" 
                        value={cat.id} 
                        checked={isActive}
                        onChange={() => handleCategoryChange(cat.id)}
                      />
                      <span className="radio-text text-sm">{isEn ? cat.en : cat.ar}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="w-full lg:w-3/4 flex flex-col">
            {loading ? (
              <div className="text-center py-10">
                <h2 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>{t('categories.loading')}</h2>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {paginatedArticles.map((article, index) => (
                    <ArticleCard key={index} article={article} />
                  ))}
                </div>

                {filteredArticles.length === 0 && (
                  <div className="text-center py-16 text-[var(--text-secondary)] bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl">
                    <p className="text-base font-medium">{t('categories.no_articles')}</p>
                  </div>
                )}

                {/* Interactive Pagination */}
                {totalPages > 1 && (
                  <div className="pagination-wrapper mt-12 pt-8 border-t border-[var(--border-color)] flex flex-wrap justify-center items-center gap-2">
                    <button 
                      disabled={currentPage === 1}
                      onClick={() => {
                        setCurrentPage(prev => Math.max(prev - 1, 1));
                        window.scrollTo({ top: 350, behavior: 'smooth' });
                      }}
                      className="page-nav-btn flex items-center gap-1.5 px-4 h-10 rounded-xl text-sm font-semibold border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:border-[var(--primary-accent)] hover:text-[var(--primary-accent)] disabled:opacity-40 disabled:pointer-events-none transition-all duration-200"
                    >
                      {isEn ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                      <span>{isEn ? 'Previous' : 'السابق'}</span>
                    </button>

                    <div className="flex items-center gap-1.5 mx-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button 
                          key={page}
                          onClick={() => {
                            setCurrentPage(page);
                            window.scrollTo({ top: 350, behavior: 'smooth' });
                          }}
                          className={`min-w-[40px] h-10 px-3 rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-center border ${
                            currentPage === page 
                              ? 'bg-[var(--primary-accent)] text-white border-[var(--primary-accent)] shadow-md shadow-[var(--primary-accent)]/30' 
                              : 'bg-[var(--bg-card)] border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--primary-accent)] hover:text-[var(--primary-accent)]'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <button 
                      disabled={currentPage === totalPages}
                      onClick={() => {
                        setCurrentPage(prev => Math.min(prev + 1, totalPages));
                        window.scrollTo({ top: 350, behavior: 'smooth' });
                      }}
                      className="page-nav-btn flex items-center gap-1.5 px-4 h-10 rounded-xl text-sm font-semibold border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:border-[var(--primary-accent)] hover:text-[var(--primary-accent)] disabled:opacity-40 disabled:pointer-events-none transition-all duration-200"
                    >
                      <span>{isEn ? 'Next' : 'التالي'}</span>
                      {isEn ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                    </button>
                  </div>
                )}
              </>
            )}
          </main>

        </div>
      </div>
    </div>
  );
}

export default Categories;
