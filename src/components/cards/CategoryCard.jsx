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
      className="group flex flex-col justify-between bg-white dark:bg-[var(--bg-card)] rounded-[24px] border border-slate-200 dark:border-[var(--border-color)] hover:border-[var(--primary-accent)]/50 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-none hover:-translate-y-1 relative overflow-hidden"
      style={{ padding: '10px' }}
    >
      {/* 1. القسم العلوي (الأيقونة والنصوص) */}
      <div className="flex items-start w-full min-h-[58px]">
        
        {/* الأيقونة المضيئة */}
        <div className="relative shrink-0">
          <div 
            className="absolute inset-0 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 scale-125"
            style={{ backgroundColor: color }}
          ></div>
          <div 
            className="relative w-[58px] h-[58px] rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105 shadow-sm text-white"
            style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}
          >
            {IconComponent && <IconComponent size={28} strokeWidth={2} />}
          </div>
        </div>
        
        {/* النصوص */}
        <div className="flex-1 min-w-0 mt-1 ms-4">
          <h3 className="font-bold text-slate-800 dark:text-[var(--text-primary)] text-xl mb-1 truncate group-hover:text-[var(--primary-accent)] transition-colors">
            {title}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium truncate">
            {desc}
          </p>
        </div>
      </div>
      
      {/* 2. القسم السفلي (الشارة والسهم في أسفل اليسار) */}
      <div className="flex items-center justify-end gap-4 w-full mt-[34px]">
        
        {/* شارة عدد المقالات */}
        <div 
          className="h-[38px] px-4 rounded-full flex items-center gap-2 font-semibold text-sm transition-colors duration-300 border border-transparent group-hover:border-current"
          style={{ backgroundColor: `${color}15`, color: color }}
        >
           <span className="flex items-center gap-1.5" dir={isEn ? "ltr" : "rtl"}>
              <span className="font-bold text-base">{category.count}</span>
              <span className="opacity-90">{t('home.article_count', 'مقال')}</span>
           </span>
           <Layers size={16} strokeWidth={2.5} className="opacity-70" />
        </div>

        {/* سهم الانتقال */}
        <div className={`text-slate-400 group-hover:text-[var(--primary-accent)] transition-transform duration-300 ${isEn ? 'group-hover:translate-x-1' : 'group-hover:-translate-x-1'}`}>
          {isEn ? <ChevronRight size={24} strokeWidth={2.5} /> : <ChevronLeft size={24} strokeWidth={2.5} />}
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
