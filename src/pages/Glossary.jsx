import { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { BookA, Search } from 'lucide-react';
import { useData } from '../hooks/useData.js';
import './Glossary.css';

const TermCard = memo(function TermCard({ item }) {
  return (
    <div className="term-card">
      <div className="flex justify-between items-start mb-3">
        <h3 className="mb-0">{item.term}</h3>
        <button 
          onClick={() => {
            const englishTerm = item.term.match(/\((.*?)\)/)?.[1] || item.term;
            const msg = new SpeechSynthesisUtterance(englishTerm);
            msg.lang = 'en-US';
            window.speechSynthesis.speak(msg);
          }}
          className="p-2 bg-[var(--bg-tertiary)] hover:bg-[var(--primary-accent)] hover:text-white rounded-full transition-colors flex-shrink-0"
          title="استمع للمصطلح باللغة الإنجليزية"
        >
          🔊
        </button>
      </div>
      <p>{item.definition}</p>
    </div>
  );
});

TermCard.propTypes = {
  item: PropTypes.shape({
    term: PropTypes.string.isRequired,
    definition: PropTypes.string.isRequired,
  }).isRequired,
};

function Glossary() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: glossaryTerms, loading } = useData('/data/glossary.json');

  const filteredTerms = (glossaryTerms || []).filter(item => 
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="glossary-page animate-fade-in">
      <div className="container">
        <div className="glossary-header text-center mb-12">
          <div className="inline-block p-4 rounded-full bg-gradient mb-4">
            <BookA size={32} color="var(--primary-accent)" />
          </div>
          <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>القاموس المحاسبي</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            مرجع سريع وسهل لأهم المصطلحات المحاسبية والمالية.
          </p>
        </div>

        <div className="glossary-search-container relative">
          <div className="flex items-center absolute right-4 top-1/2" style={{ transform: 'translateY(-50%)' }}>
            <Search size={20} color="var(--text-muted)" />
          </div>
          <input 
            type="text" 
            placeholder="ابحث عن مصطلح..." 
            className="glossary-search-input"
            style={{ paddingRight: '3rem' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="text-center py-10">
            <h2 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>جاري تحميل المصطلحات...</h2>
          </div>
        ) : filteredTerms.length > 0 ? (
          <div className="glossary-grid">
            {filteredTerms.map((item, index) => (
              <TermCard key={index} item={item} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            لم يتم العثور على مصطلحات تطابق بحثك "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
}

export default Glossary;
