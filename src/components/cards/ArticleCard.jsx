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
      className="group relative flex flex-col h-full bg-[var(--bg-card)] rounded-2xl overflow-hidden border border-[var(--border-color)] hover:border-[var(--primary-accent)]/70 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5"
    >
      {/* 1. منطقة الصورة مع الشارة الزجاجية المضيئة */}
      <div className="h-48 w-full relative overflow-hidden bg-slate-950">
        <img 
          src={article.image || '/images/placeholder.svg'} 
          alt={title} 
          loading="lazy" 
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20 pointer-events-none"></div>
        
        {/* شارة التصنيف العائمة بتصميم زجاجي فاخر */}
        {categoryName && (
          <div 
            style={{ insetInlineStart: '0.875rem' }}
            className="absolute top-3.5 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-900/85 dark:bg-black/75 backdrop-blur-md text-white border border-white/15 shadow-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-accent)] shadow-[0_0_8px_var(--primary-accent)]"></span>
            <span>{categoryName}</span>
          </div>
        )}
      </div>

      {/* 2. محتوى المقال */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-bold text-lg sm:text-xl text-[var(--text-primary)] group-hover:text-[var(--primary-accent)] transition-colors line-clamp-2 leading-snug mb-3">
            {title}
          </h3>
          {(article.summary || article.desc) && (
            <p className="text-[var(--text-secondary)] text-sm line-clamp-2 leading-relaxed mb-4">
              {isEn && article.summary_en ? article.summary_en : (article.summary || article.desc)}
            </p>
          )}
        </div>

        {/* 3. شريط الإجراءات السفلي */}
        <div className="flex justify-between items-center text-sm pt-3.5 border-t border-[var(--border-color)]/50 mt-auto">
          <span className="text-[var(--primary-accent)] font-semibold text-xs sm:text-sm flex items-center gap-1.5 group-hover:gap-2 transition-all">
            {t('article.read_more', 'اقرأ المزيد')} 
            {isEn ? (
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            ) : (
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            )}
          </span>

          <div className="flex items-center gap-1.5 text-[var(--text-muted)] bg-[var(--bg-main)] px-2.5 py-1 rounded-full text-xs font-medium border border-[var(--border-color)]/60">
            <Clock size={12} className="opacity-70" />
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
