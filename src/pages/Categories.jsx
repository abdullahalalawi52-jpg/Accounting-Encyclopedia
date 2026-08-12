import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Mail, Clock } from 'lucide-react';
import { useNewsAPI } from '../hooks/useNewsAPI.js';
import ArticleCard from '../components/cards/ArticleCard.jsx';
import PageHero from '../components/ui/PageHero.jsx';
import './Categories.css';

const ALL_CATEGORIES = [
  'الكل',
  'المحاسبة المالية',
  'محاسبة التكاليف',
  'المراجعة والتدقيق',
  'الضرائب والزكاة',
  'المعايير والقوانين',
  'المحاسبة الإدارية',
  'المحاسبة المتخصصة'
];

function Categories() {
  const [activeCategory, setActiveCategory] = useState('الكل');
  
  const { data: articles, loading } = useNewsAPI();

  const filteredArticles = loading ? [] : (activeCategory === 'الكل' 
    ? (articles || []) 
    : (articles || []).filter(article => article.categoryName === activeCategory));

  return (
    <div className="archive-page animate-fade-in pb-10">
      <PageHero 
        title="أرشيف المقالات"
        description="تصفح أحدث المقالات والمراجع المحاسبية الموثوقة."
      />

      <div className="container py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4 flex-shrink-0">
            <div className="card bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl mb-6 sticky top-24 min-h-[450px]" style={{ padding: '2.5rem' }}>
              <h3 className="font-bold text-[var(--text-primary)] text-xl mb-8 flex items-center gap-3 border-b border-[var(--border-color)] pb-4">
                <span className="w-2 h-2 rounded-full bg-[var(--primary-accent)]"></span> التصنيفات
              </h3>
              <div className="radio-group flex flex-row flex-wrap lg:flex-col gap-4">
                {ALL_CATEGORIES.map(cat => (
                  <label key={cat} className="radio-label text-lg py-2 whitespace-nowrap">
                    <input 
                      type="radio" 
                      name="category" 
                      value={cat} 
                      checked={activeCategory === cat}
                      onChange={() => setActiveCategory(cat)}
                    />
                    <span className="radio-text">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

          </aside>

          {/* Main Content */}
          <main className="w-full lg:w-3/4">
            {loading ? (
              <div className="text-center py-10">
                <h2 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>جاري تحميل المقالات...</h2>
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
                    لا توجد مقالات في هذا التصنيف حالياً.
                  </div>
                )}

                {/* Pagination Placeholder */}
                {filteredArticles.length > 0 && (
                  <div className="pagination mt-10 flex justify-center gap-2">
                    <button className="page-btn active">1</button>
                    <button className="page-btn">2</button>
                    <button className="page-btn">3</button>
                    <span className="page-dots">...</span>
                    <button className="page-btn">التالي</button>
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
