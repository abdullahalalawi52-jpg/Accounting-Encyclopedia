import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Book, ChevronLeft } from 'lucide-react';
import { useData } from '../hooks/useData.js';
import ArticleCard from '../components/cards/ArticleCard.jsx';
import SearchInput from '../components/ui/SearchInput.jsx';

function Category() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  const { id } = useParams();
  const { data: categoriesData, loading: loadingCategories } = useData('/data/categories.json');
  const { data: articlesData, loading: loadingArticles } = useData('/data/articles.json');
  
  const info = (categoriesData?.info && categoriesData.info[id]) || { title: 'قسم غير معروف', desc: '' };
  
  const articles = articlesData ? articlesData.filter(a => a.categoryId === id) : [];
  
  const [searchTerm, setSearchTerm] = useState('');

  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (article.summary && article.summary.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loadingCategories || loadingArticles) {
    return (
      <div className="category-view animate-fade-in flex items-center justify-center" style={{ minHeight: '60vh' }}>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>جاري تحميل القسم...</h2>
      </div>
    );
  }

  return (
    <div className="category-view animate-fade-in" style={{ padding: '4rem 0' }}>
      <div className="container">
        <div className="text-center mb-10">
          <div className="inline-block p-4 rounded-full bg-gradient mb-4">
            <Book size={32} color="var(--primary-accent)" />
          </div>
          <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>{info.title}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>{info.desc}</p>
        </div>

        {/* Deep Search Feature inside the category */}
        <SearchInput 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={`ابحث بعمق في قسم ${info.title}...`}
          className="mb-10"
        />

        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center glass-panel p-10 mt-6 mx-auto" style={{ border: '1px solid var(--primary-accent)', maxWidth: '600px' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>لا توجد مقالات مطابقة 🔍</h3>
            <p style={{ color: 'var(--text-secondary)' }}>لم نتمكن من العثور على أي معلومات تطابق بحثك داخل هذا القسم.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Category;
