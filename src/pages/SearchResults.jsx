import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Search, FileText, BookA } from 'lucide-react';
import { useData } from '../hooks/useData.js';
import SearchInput from '../components/ui/SearchInput.jsx';
import './SearchResults.css';

function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  
  const { data: articlesData, loading: loadingArticles } = useData('/data/articles.json');
  const { data: glossaryData, loading: loadingGlossary } = useData('/data/glossary.json');

  useEffect(() => {
    if (initialQuery && articlesData && glossaryData) {
      performSearch(initialQuery);
    }
  }, [initialQuery, articlesData, glossaryData]);

  const performSearch = (searchQuery) => {
    if (!searchQuery.trim() || !articlesData || !glossaryData) {
      setResults([]);
      return;
    }
    const lowerQuery = searchQuery.toLowerCase();
    
    const articleResults = articlesData.filter(item => 
      item.title.toLowerCase().includes(lowerQuery) || 
      (item.summary && item.summary.toLowerCase().includes(lowerQuery)) ||
      (item.content && item.content.toLowerCase().includes(lowerQuery))
    ).map(item => ({
      id: `/article/${item.id}`,
      type: 'مقال',
      title: item.title,
      content: item.summary || 'انقر لقراءة المقال...',
      icon: FileText
    }));

    const glossaryResults = glossaryData.filter(item => 
      item.term.toLowerCase().includes(lowerQuery) || 
      item.definition.toLowerCase().includes(lowerQuery)
    ).map(item => ({
      id: '/glossary',
      type: 'مصطلح',
      title: item.term,
      content: item.definition,
      icon: BookA
    }));

    setResults([...articleResults, ...glossaryResults]);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="search-results-page animate-fade-in">
      <div className="container" style={{ maxWidth: '800px' }}>
        
        <SearchInput 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onSubmit={handleSearchSubmit}
          placeholder="ابحث عن مقال أو مصطلح..."
          withButton={true}
        />

        <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>
          نتائج البحث عن: <span className="search-query-highlight">"{initialQuery}"</span>
        </h2>
        
        <p style={{ color: 'var(--text-muted)' }}>
          تم العثور على {results.length} نتيجة.
        </p>

        {(loadingArticles || loadingGlossary) ? (
          <div className="text-center py-10">
            <h2 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>جاري البحث...</h2>
          </div>
        ) : (
          <div className="results-list">
            {results.length > 0 ? (
              results.map((result, index) => (
                <Link to={result.id} key={index} className="result-card">
                  <span className="result-type-badge">{result.type}</span>
                  <h3>
                    <result.icon size={20} color="var(--primary-accent)" /> 
                    {result.title}
                  </h3>
                  <p>{result.content}</p>
                </Link>
              ))
            ) : (
              <div className="glass-panel text-center p-10 mt-6">
                <Search size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>لا توجد نتائج!</h3>
                <p style={{ color: 'var(--text-secondary)' }}>حاول استخدام كلمات مفتاحية مختلفة (مثل: أصول، ضريبة، ميزانية).</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default SearchResults;
