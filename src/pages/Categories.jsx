import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  
  const { data: articles, loading } = useNewsAPI();

  const filteredArticles = loading ? [] : (activeCategory === 'all' 
    ? (articles || []) 
    : (articles || []).filter(article => article.categoryId === activeCategory));

  return (
    <div className="archive-page animate-fade-in pb-10">
      <PageHero 
        title={t('categories.page_title')}
        description={t('categories.page_desc')}
      />

      <div className="container py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
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
                        onChange={() => setActiveCategory(cat.id)}
                      />
                      <span className="radio-text text-sm">{isEn ? cat.en : cat.ar}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="w-full lg:w-3/4">
            {loading ? (
              <div className="text-center py-10">
                <h2 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>{t('categories.loading')}</h2>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredArticles.map((article, index) => (
                    <ArticleCard key={index} article={article} />
                  ))}
                </div>

                {filteredArticles.length === 0 && (
                  <div className="text-center py-10 text-muted">
                    {t('categories.no_articles')}
                  </div>
                )}

                {/* Pagination Placeholder */}
                {filteredArticles.length > 0 && (
                  <div className="pagination mt-10 flex justify-center gap-2">
                    <button className="page-btn active">1</button>
                    <button className="page-btn">2</button>
                    <button className="page-btn">3</button>
                    <span className="page-dots">...</span>
                    <button className="page-btn">{t('categories.next')}</button>
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
