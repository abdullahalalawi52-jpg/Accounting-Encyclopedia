import { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function ArticleCard({ article }) {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  return (
    <Link 
      to={`/article/${article.id}`} 
      className="group relative flex flex-col h-full bg-[var(--bg-card)] rounded-2xl overflow-hidden border border-[var(--border-color)] hover:border-[var(--primary-accent)] transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5"
    >
      <div className="h-48 w-full relative overflow-hidden bg-[var(--bg-tertiary)]">
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)]/80 via-transparent to-transparent z-10"></div>
        <img 
          src={article.image || '/images/placeholder.svg'} 
          alt={article.title} 
          loading="lazy" 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        <span 
          style={{ insetInlineStart: '1rem' }}
          className="absolute top-4 bg-[var(--bg-card)]/90 backdrop-blur-md text-[var(--text-primary)] text-xs px-3 py-1.5 rounded-full font-bold border border-[var(--border-color)] z-20 shadow-md"
        >
          {isEn && article.categoryName_en ? article.categoryName_en : article.categoryName}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-1 relative z-20">
        <h3 className="font-bold text-lg sm:text-xl mb-4 text-[var(--text-primary)] group-hover:text-[var(--primary-accent)] transition-colors line-clamp-2 leading-snug">
          {isEn && article.title_en ? article.title_en : article.title}
        </h3>
        <div className="mt-auto flex justify-between items-center text-sm pt-4 border-t border-[var(--border-color)]/70">
          <span className="text-[var(--primary-accent)] font-semibold flex items-center gap-1.5 group-hover:gap-2 transition-all">
            {t('article.read_more')} {isEn ? <ArrowRight size={15} /> : <ArrowLeft size={15} />}
          </span>
          <div className="flex items-center gap-1.5 text-[var(--text-secondary)] bg-[var(--bg-main)] px-2.5 py-1 rounded-md text-xs font-medium border border-[var(--border-color)]/40">
            <Clock size={13} />
            <span>{(isEn && article.time_en ? article.time_en : article.time) || t('article.default_time')}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

ArticleCard.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    categoryName: PropTypes.string,
    image: PropTypes.string,
    time: PropTypes.string,
  }).isRequired,
};

export default memo(ArticleCard);
