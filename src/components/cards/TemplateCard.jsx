import { memo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Download, Star, FileText, Calendar } from 'lucide-react';

function TemplateCard({ template, onDownload }) {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  const title = isEn && template.title_en ? template.title_en : template.title;

  return (
    <div className="group relative bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--primary-accent)] rounded-2xl p-6 flex flex-col h-full transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
      
      <div className="flex justify-between items-center mb-6 relative z-10">
        <span className={`text-xs px-3 py-1.5 rounded-md font-bold shadow-sm ${
          template.type === 'Excel' ? 'bg-emerald-500/10 text-emerald-600' :
          template.type === 'Word' ? 'bg-blue-500/10 text-blue-600' :
          'bg-red-500/10 text-red-600'
        }`}>
          {template.type}
        </span>
        <div className="flex items-center gap-1.5 text-[var(--text-primary)] font-bold text-sm bg-[var(--bg-main)] px-2.5 py-1 rounded-md">
          {template.rating} <Star size={14} className="text-amber-400" fill="currentColor" />
        </div>
      </div>
      
      <h3 className="font-bold text-[var(--text-primary)] text-lg md:text-xl mb-6 flex-grow leading-snug group-hover:text-[var(--primary-accent)] transition-colors relative z-10 flex items-start gap-2">
        <FileText size={20} className="shrink-0 mt-1 text-[var(--primary-accent)] opacity-80" />
        <span>{title}</span>
      </h3>
      
      <div className="flex justify-between items-center text-[var(--text-secondary)] text-sm mb-6 border-t border-[var(--border-color)] pt-5 relative z-10">
        <span className="flex items-center gap-1.5"><Calendar size={16} /> {template.date}</span>
        <span className="flex items-center gap-1.5"><Download size={16} /> {template.downloads} {isEn ? 'downloads' : 'تحميل'}</span>
      </div>
      
      <button onClick={() => onDownload(template)} className="bg-[var(--bg-main)] text-[var(--text-primary)] border border-[var(--border-color)] group-hover:bg-[var(--primary-accent)] group-hover:text-white group-hover:border-[var(--primary-accent)] w-full py-3 rounded-xl font-bold flex justify-center items-center gap-2 transition-all duration-300 shadow-sm mt-auto relative z-10">
        {isEn ? 'Download Template' : 'تحميل النموذج'} <Download size={18} className="transition-transform group-hover:-translate-y-1" />
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
