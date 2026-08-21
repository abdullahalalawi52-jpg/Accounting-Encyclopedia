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
      className="group relative flex flex-col justify-between h-full p-6 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] hover:border-[var(--primary-accent)] transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5"
    >
      {/* 1. القسم العلوي (الأيقونة والنصوص) */}
      <div className="flex items-start gap-4">
        {/* الأيقونة الدائرية */}
        <div className="relative shrink-0 w-12 h-12">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm transition-transform duration-300 group-hover:scale-105"
            style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}
          >
            {IconComponent && <IconComponent size={24} strokeWidth={2.2} />}
          </div>
        </div>
        
        {/* النصوص */}
        <div className="flex-1 min-w-0 pt-0.5">
          <h3 className="font-bold text-[var(--text-primary)] text-lg sm:text-xl mb-1 leading-snug group-hover:text-[var(--primary-accent)] transition-colors">
            {title}
          </h3>
          <p className="text-[var(--text-secondary)] text-xs sm:text-sm leading-relaxed line-clamp-2 m-0">
            {desc}
          </p>
        </div>
      </div>
      
      {/* 2. القسم السفلي (الشارة وسهم الانتقال) */}
      <div className="flex items-center justify-between pt-4 mt-4 border-t border-[var(--border-color)]/60">
        {/* شارة عدد المقالات */}
        <div 
          className="px-3 py-1 rounded-lg flex items-center gap-1.5 text-xs font-semibold border transition-all duration-300"
          style={{ 
            backgroundColor: `${color}15`, 
            color: color,
            borderColor: `${color}35` 
          }}
        >
          <Layers size={13} strokeWidth={2.2} className="opacity-80" />
          <span className="flex items-center gap-1">
            <strong className="font-bold">{category.count}</strong>
            <span className="opacity-90">{t('home.article_count', 'مقال')}</span>
          </span>
        </div>

        {/* زر سهم الانتقال */}
        <div className="w-8 h-8 rounded-full bg-[var(--bg-main)] border border-[var(--border-color)] group-hover:border-[var(--primary-accent)] group-hover:bg-[var(--primary-accent)] group-hover:text-white text-[var(--text-muted)] flex items-center justify-center transition-all duration-300 shadow-sm">
          {isEn ? (
            <ChevronRight size={15} strokeWidth={2.5} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          ) : (
            <ChevronLeft size={15} strokeWidth={2.5} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
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
