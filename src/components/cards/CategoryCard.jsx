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
      className="group relative flex flex-col justify-between h-full bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] hover:border-[var(--primary-accent)] transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 py-5 ps-5 pe-4 overflow-hidden"
    >
      {/* خلفية توهج خفيفة عند التحويم */}
      <div 
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-10 group-hover:opacity-25 transition-opacity pointer-events-none"
        style={{ backgroundColor: color }}
      ></div>

      {/* 1. القسم العلوي (الأيقونة والنصوص بفاصل 10px) */}
      <div className="flex items-start gap-[10px] mb-6 relative z-10">
        {/* الأيقونة المضيئة */}
        <div className="relative shrink-0">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md transition-transform duration-300 group-hover:scale-105"
            style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}
          >
            {IconComponent && <IconComponent size={24} strokeWidth={2.2} />}
          </div>
        </div>
        
        {/* النصوص */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-[var(--text-primary)] text-lg sm:text-xl mb-1.5 leading-snug group-hover:text-[var(--primary-accent)] transition-colors">
            {title}
          </h3>
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed line-clamp-2">
            {desc}
          </p>
        </div>
      </div>
      
      {/* 2. القسم السفلي (الشارة وسهم الانتقال بفاصل 10px) */}
      <div className="flex items-center justify-end gap-[10px] pt-4 border-t border-[var(--border-color)]/60 mt-auto relative z-10">
        {/* شارة عدد المقالات */}
        <div 
          className="px-3.5 py-1.5 rounded-full flex items-center gap-1.5 font-semibold text-xs transition-colors"
          style={{ backgroundColor: `${color}15`, color: color }}
        >
          <span className="flex items-center gap-1">
            <span className="font-bold text-sm">{category.count}</span>
            <span>{t('home.article_count', 'مقال')}</span>
          </span>
          <Layers size={14} strokeWidth={2.5} className="opacity-80" />
        </div>

        {/* سهم الانتقال */}
        <div className={`text-[var(--text-muted)] group-hover:text-[var(--primary-accent)] transition-all duration-300 flex items-center justify-center ${isEn ? 'group-hover:translate-x-1' : 'group-hover:-translate-x-1'}`}>
          {isEn ? <ChevronRight size={20} strokeWidth={2.5} /> : <ChevronLeft size={20} strokeWidth={2.5} />}
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
