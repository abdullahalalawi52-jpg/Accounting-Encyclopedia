import { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function ArticleCard({ article }) {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const title = isEn && article.title_en ? article.title_en : article.title;
  const categoryName = isEn && article.categoryName_en ? article.categoryName_en : article.categoryName;
  const time = (isEn && article.time_en ? article.time_en : article.time) || t('article.default_time', '5 min read');

  return (
    <Link 
      to={`/article/${article.id}`} 
      className="group relative flex flex-col h-full bg-[var(--bg-card)] rounded-2xl overflow-hidden border border-[var(--border-color)] hover:border-[var(--primary-accent)]/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5"
    >
      {/* 1. صورة المقال مع شارة التصنيف */}
      <div className="h-48 sm:h-52 w-full relative overflow-hidden bg-[var(--bg-main)] flex items-center justify-center">
        <img 
          src={article.image || '/images/placeholder.svg'} 
          alt={title} 
          loading="lazy" 
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" 
        />
        
        {/* شارة التصنيف العائمة */}
        {categoryName && (
          <div 
            style={{ insetInlineStart: '1rem' }}
            className="absolute top-3.5 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-900/90 text-white border border-white/20 shadow-lg"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
            <span className="leading-none">{categoryName}</span>
          </div>
        )}
      </div>

      {/* 2. محتوى المقال */}
      <div className="flex flex-col flex-1 justify-between" style={{ padding: '22px' }}>
        <div className="space-y-2.5">
          <h3 className="font-bold text-lg text-[var(--text-primary)] group-hover:text-[var(--primary-accent)] transition-colors line-clamp-2 leading-snug">
            {title}
          </h3>
          {(article.summary || article.desc) && (
            <p className="text-[var(--text-secondary)] text-sm line-clamp-2 leading-relaxed">
              {isEn && article.summary_en ? article.summary_en : (article.summary || article.desc)}
            </p>
          )}
        </div>

        {/* 3. شريط التذييل السفلي */}
        <div className="flex justify-between items-center text-sm pt-4 mt-5 border-t border-[var(--border-color)]">
          <span className="text-[var(--primary-accent)] font-bold text-sm flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
            {t('article.read_more', 'اقرأ المزيد')} 
            {isEn ? (
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            ) : (
              <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
            )}
          </span>

          <div className="flex items-center gap-1.5 text-[var(--text-secondary)] bg-[var(--bg-main)] px-3 py-1 rounded-full text-xs font-medium border border-[var(--border-color)]">
            <Clock size={13} className="text-[var(--primary-accent)] opacity-80" />
            <span>{time}</span>
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
    title_en: PropTypes.string,
    categoryName: PropTypes.string,
    categoryName_en: PropTypes.string,
    image: PropTypes.string,
    time: PropTypes.string,
    time_en: PropTypes.string,
    summary: PropTypes.string,
    summary_en: PropTypes.string,
    desc: PropTypes.string,
  }).isRequired,
};

export default memo(ArticleCard);
