import { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function CategoryCard({ category, IconComponent }) {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const color = category.color || '#3B82F6';
  const title = isEn && category.title_en ? category.title_en : category.title;
  const desc = (isEn && category.desc_en ? category.desc_en : category.desc) || (isEn ? 'Principles, Fundamentals and Reports' : 'المبادئ والأساسيات والتقارير');

  return (
    <Link 
      to={`/category/${category.id}`} 
      className="group card-shimmer relative flex flex-col justify-between h-full p-5 sm:p-6 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] hover:border-[var(--primary-accent)]/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 overflow-hidden"
    >
      {/* Ambient background glow on hover */}
      <div 
        className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: color }}
      ></div>
      {/* 1. القسم العلوي (الأيقونة والنصوص بفاصل 12px) */}
      <div className="flex items-start gap-3 relative z-10">
        {/* الأيقونة الدائرية */}
        <div className="relative shrink-0 w-12 h-12">
          <div 
            className="absolute inset-0 rounded-full blur-md opacity-30 group-hover:opacity-60 transition-opacity duration-300"
            style={{ backgroundColor: color }}
          ></div>
          <div 
            className="relative w-12 h-12 rounded-full flex items-center justify-center text-white shadow-sm transition-transform duration-300 group-hover:scale-105"
            style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}
          >
            {IconComponent && <IconComponent size={24} strokeWidth={2.2} />}
          </div>
        </div>
        
        {/* النصوص */}
        <div className="flex-1 min-w-0 pt-0.5">
          <h3 className="font-bold text-[var(--text-primary)] text-xl mb-1 leading-snug group-hover:text-[var(--primary-accent)] transition-colors">
            {title}
          </h3>
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed line-clamp-2">
            {desc}
          </p>
        </div>
      </div>
      
      {/* 2. القسم السفلي (الشارة وسهم الانتقال بتصميم عصري فخم) */}
      <div className="flex items-center justify-between pt-3 mt-4 border-t border-[var(--border-color)]/40 relative z-10">
        {/* شارة عدد المقالات */}
        <div 
          className="px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-medium border transition-all duration-300"
          style={{ 
            backgroundColor: `${color}12`, 
            color: color,
            borderColor: `${color}30` 
          }}
        >
          <Layers size={13} strokeWidth={2.2} className="opacity-80" />
          <span className="flex items-center gap-1">
            <strong className="font-bold">{category.count}</strong>
            <span className="opacity-90">{t('home.article_count', 'مقال')}</span>
          </span>
        </div>

        {/* زر سهم الانتقال الدائري التفاعلي */}
        <div className="w-8 h-8 rounded-full bg-[var(--bg-main)] border border-[var(--border-color)] group-hover:border-[var(--primary-accent)] group-hover:bg-[var(--primary-accent)] group-hover:text-white text-[var(--text-muted)] flex items-center justify-center transition-all duration-300 shadow-sm">
          {isEn ? (
            <ChevronRight size={16} strokeWidth={2.5} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          ) : (
            <ChevronLeft size={16} strokeWidth={2.5} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
          )}
        </div>
      </div>
    </Link>
  );
}

CategoryCard.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    color: PropTypes.string,
    count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    desc: PropTypes.string,
  }).isRequired,
  IconComponent: PropTypes.elementType,
};

export default memo(CategoryCard);
