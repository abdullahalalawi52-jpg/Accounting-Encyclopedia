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
      className="group relative flex flex-col h-full bg-[var(--bg-card)] rounded-2xl overflow-hidden border border-[var(--border-color)] hover:border-[var(--primary-accent)] transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
    >
      <div className="h-48 w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] to-transparent z-10 opacity-60"></div>
        <img 
          src={article.image || '/images/placeholder.svg'} 
          alt={article.title} 
          loading="lazy" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <span className={`absolute top-4 ${isEn ? 'left-4' : 'right-4'} bg-[var(--bg-card)]/90 backdrop-blur-sm text-[var(--text-primary)] text-xs px-3 py-1.5 rounded-full font-bold border border-[var(--border-color)] z-20 shadow-sm`}>
          {isEn && article.categoryName_en ? article.categoryName_en : article.categoryName}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-grow relative z-20">
        <h3 className="font-bold text-xl mb-4 text-[var(--text-primary)] group-hover:text-[var(--primary-accent)] transition-colors line-clamp-3 leading-snug">
          {isEn && article.title_en ? article.title_en : article.title}
        </h3>
        <div className="mt-auto flex justify-between items-center text-sm pt-4 border-t border-[var(--border-color)]">
          <span className="text-[var(--primary-accent)] font-medium flex items-center gap-1 group">
            {t('article.read_more')} {isEn ? <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" /> : <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1" />}
          </span>
          <div className="flex items-center gap-1.5 text-[var(--text-secondary)] bg-[var(--bg-main)] px-2.5 py-1 rounded-md">
            <Clock size={14} />
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
