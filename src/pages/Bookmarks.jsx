import { Link } from 'react-router-dom';
import { Bookmark, Trash2, ArrowRight } from 'lucide-react';
import { useData } from '../hooks/useData.js';
import { useBookmarks } from '../context/BookmarkContext.jsx';
import './Bookmarks.css';

function Bookmarks() {
  const { bookmarks: savedIds, removeBookmark } = useBookmarks();
  
  const { data: articlesData, loading } = useData('/data/articles.json');

  return (
    <div className="bookmarks-page animate-fade-in">
      <div className="container">
        <div className="text-center mb-10">
          <div className="inline-block p-4 rounded-full bg-gradient mb-4">
            <Bookmark size={32} color="var(--primary-accent)" />
          </div>
          <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>مفضلتي</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            المقالات التي قمت بحفظها للرجوع إليها لاحقاً
          </p>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <h2 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>جاري تحميل المقالات...</h2>
          </div>
        ) : savedIds.length > 0 ? (
          <div className="bookmarks-grid">
            {savedIds.map(id => {
              const article = articlesData ? articlesData.find(a => String(a.id) === String(id)) : null;
              if (!article) return null;
              
              return (
                <div key={id} className="bookmark-card">
                  <span className="badge mb-2 inline-block w-max">{article.categoryName}</span>
                  <h3>{article.title}</h3>
                  <div className="bookmark-meta">{article.date}</div>
                  
                  <div className="bookmark-actions mt-4">
                    <Link to={`/article/${id}`} className="flex items-center gap-1" style={{ color: 'var(--primary-accent)' }}>
                      اقرأ المقال <ArrowRight size={16} />
                    </Link>
                    <button onClick={() => removeBookmark(id)} className="btn-icon" style={{ color: '#EF4444' }} title="إزالة من المفضلة">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="glass-panel text-center p-12 mt-6">
            <Bookmark size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>لا توجد مقالات محفوظة</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>قم بتصفح الأقسام وحفظ المقالات التي تهمك للعودة إليها بسهولة.</p>
            <Link to="/categories" className="btn btn-primary">تصفح الأقسام</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Bookmarks;
