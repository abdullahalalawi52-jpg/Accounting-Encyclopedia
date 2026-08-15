import { memo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Download, Star, FileText, Calendar } from 'lucide-react';

function TemplateCard({ template, onDownload }) {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  const title = isEn && template.title_en ? template.title_en : template.title;

  return (
    <div 
      style={{ padding: '24px' }}
      className="group relative bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--primary-accent)] rounded-2xl flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      {/* 1. Header with Badge and Rating */}
      <div className="flex justify-between items-center mb-4 relative z-10">
        <span className={`text-xs px-3 py-1 rounded-lg font-bold shadow-sm ${
          template.type === 'Excel' ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' :
          template.type === 'Word' ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/20' :
          'bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/20'
        }`}>
          {template.type}
        </span>
        <div className="flex items-center gap-1.5 text-[var(--text-primary)] font-bold text-xs bg-[var(--bg-main)] px-2.5 py-1 rounded-lg border border-[var(--border-color)]">
          {template.rating} <Star size={13} className="text-amber-400" fill="currentColor" />
        </div>
      </div>
      
      {/* 2. Title */}
      <h3 className="font-bold text-[var(--text-primary)] text-lg leading-snug group-hover:text-[var(--primary-accent)] transition-colors mb-5 flex-grow relative z-10 flex items-start gap-2.5">
        <FileText size={20} className="shrink-0 mt-0.5 text-[var(--primary-accent)] opacity-90" />
        <span>{title}</span>
      </h3>
      
      {/* 3. Metadata (Date & Downloads) */}
      <div className="flex justify-between items-center text-[var(--text-secondary)] text-xs mb-5 border-t border-[var(--border-color)] pt-4 relative z-10">
        <span className="flex items-center gap-1.5"><Calendar size={14} className="text-[var(--text-muted)]" /> {template.date}</span>
        <span className="flex items-center gap-1.5"><Download size={14} className="text-[var(--text-muted)]" /> {template.downloads} {isEn ? 'downloads' : 'تحميل'}</span>
      </div>
      
      {/* 4. Action Button */}
      <button 
        onClick={() => onDownload(template)} 
        className="bg-[var(--bg-main)] text-[var(--text-primary)] border border-[var(--border-color)] hover:bg-[var(--primary-accent)] hover:text-white hover:border-[var(--primary-accent)] w-full py-3 rounded-xl font-bold text-sm flex justify-center items-center gap-2 transition-all duration-300 shadow-sm mt-auto relative z-10 active:scale-[0.98]"
      >
        <span>{isEn ? 'Download Template' : 'تحميل النموذج'}</span>
        <Download size={16} className="transition-transform group-hover:-translate-y-0.5" />
      </button>
    </div>
  );
}

TemplateCard.propTypes = {
  template: PropTypes.shape({
    type: PropTypes.string,
    rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string.isRequired,
    date: PropTypes.string,
    downloads: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  onDownload: PropTypes.func.isRequired,
};

export default memo(TemplateCard);
