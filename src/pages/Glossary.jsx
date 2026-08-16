import { useState, useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import { BookA } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useData } from '../hooks/useData.js';
import SearchInput from '../components/ui/SearchInput.jsx';
import './Glossary.css';

const TermCard = memo(function TermCard({ item, isEn, t }) {
  return (
    <div className="term-card">
      <div className="flex justify-between items-start mb-3">
        <h3 className="mb-0">{isEn && item.term_en ? item.term_en : item.term}</h3>
        <button 
          onClick={() => {
            const englishTerm = item.term.match(/\((.*?)\)/)?.[1] || item.term_en || item.term;
            const msg = new SpeechSynthesisUtterance(englishTerm);
            msg.lang = 'en-US';
            window.speechSynthesis.speak(msg);
          }}
          className="p-2 bg-[var(--bg-tertiary)] hover:bg-[var(--primary-accent)] hover:text-white rounded-full transition-colors flex-shrink-0"
          title={t('glossary.listen')}
        >
          🔊
        </button>
      </div>
      <p>{isEn && item.definition_en ? item.definition_en : item.definition}</p>
    </div>
  );
});

TermCard.propTypes = {
  item: PropTypes.shape({
    term: PropTypes.string.isRequired,
    definition: PropTypes.string.isRequired,
    term_en: PropTypes.string,
    definition_en: PropTypes.string
  }).isRequired,
  isEn: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired
};

function Glossary() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language?.startsWith('en');
  const [searchTerm, setSearchTerm] = useState('');
  const { data: glossaryTerms, loading } = useData('/data/glossary.json');

  const filteredTerms = useMemo(() => {
    if (!glossaryTerms || !Array.isArray(glossaryTerms)) return [];
    if (!searchTerm.trim()) return glossaryTerms;
    const lower = searchTerm.toLowerCase();
    return glossaryTerms.filter(item => {
      const term = isEn && item.term_en ? item.term_en : item.term;
      const def = isEn && item.definition_en ? item.definition_en : item.definition;
      return term.toLowerCase().includes(lower) || def.toLowerCase().includes(lower);
    });
  }, [glossaryTerms, searchTerm, isEn]);

  return (
    <div className="glossary-page animate-fade-in">
      <div className="container">
        <div className="glossary-header text-center mb-10">
          <div className="inline-block p-4 rounded-full bg-gradient mb-4">
            <BookA size={32} color="var(--primary-accent)" />
          </div>
          <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{t('glossary.title')}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            {t('glossary.desc')}
          </p>
        </div>

        <SearchInput 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t('glossary.search_ph')}
          className="mb-10 max-w-xl mx-auto"
        />

        {loading ? (
          <div className="text-center py-10">
            <h2 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>{t('glossary.loading')}</h2>
          </div>
        ) : filteredTerms.length > 0 ? (
          <div className="glossary-grid">
            {filteredTerms.map((item, index) => (
              <TermCard key={index} item={item} isEn={isEn} t={t} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            {t('glossary.no_results')} "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
}

export default Glossary;
