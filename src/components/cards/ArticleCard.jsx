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
      className="group relative flex flex-col justify-between h-full bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] hover:border-[var(--primary-accent)] transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 p-4"
    >
      {/* 1. صورة المقال مع شارة التصنيف */}
      <div>
        <div className="h-48 w-full relative overflow-hidden bg-slate-100 dark:bg-slate-900/60 rounded-xl border border-[var(--border-color)]/60 flex items-center justify-center mb-4">
          <img 
            src={article.image || '/images/placeholder.svg'} 
            alt={title} 
            loading="lazy" 
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" 
          />
          
          {/* شارة التصنيف العائمة */}
          {categoryName && (
            <div 
              style={{ insetInlineStart: '0.75rem' }}
              className="absolute top-2.5 z-10 flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-slate-900/90 text-white border border-white/20 shadow-md backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]"></span>
              <span className="leading-none">{categoryName}</span>
            </div>
          )}
        </div>

        {/* 2. محتوى المقال */}
        <div className="space-y-1.5">
          <h3 className="font-bold text-base md:text-lg text-[var(--text-primary)] group-hover:text-[var(--primary-accent)] transition-colors line-clamp-2 leading-snug m-0">
            {title}
          </h3>
          {(article.summary || article.desc) && (
            <p className="text-[var(--text-secondary)] text-xs md:text-sm line-clamp-2 leading-relaxed m-0 mt-1">
              {isEn && article.summary_en ? article.summary_en : (article.summary || article.desc)}
            </p>
          )}
        </div>
      </div>

      {/* 3. شريط التذييل السفلي */}
      <div className="flex justify-between items-center text-xs sm:text-sm pt-4 mt-5 border-t border-[var(--border-color)]/60">
        <span className="text-[var(--primary-accent)] font-bold flex items-center gap-1.5 group-hover:gap-2 transition-all">
          {t('article.read_more', 'اقرأ المزيد')} 
          {isEn ? (
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          ) : (
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
          )}
        </span>

        <div className="flex items-center gap-1 text-[var(--text-muted)] bg-[var(--bg-main)] px-2.5 py-1 rounded-lg text-xs font-semibold border border-[var(--border-color)]/60">
          <Clock size={12} className="text-[var(--primary-accent)]" />
          <span>{time}</span>
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
