import { memo } from 'react';
import PropTypes from 'prop-types';

const VARIANT_CLASSES = {
  emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
  sky: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30',
  amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
  indigo: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
  rose: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
  slate: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/30',
};

function Badge({ children, variant = 'emerald', className = '', icon: Icon }) {
  const variantClass = VARIANT_CLASSES[variant] || VARIANT_CLASSES.emerald;

  return (
    <span 
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${variantClass} ${className}`}
    >
      {Icon && <Icon size={13} className="shrink-0" />}
      <span>{children}</span>
    </span>
  );
}

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['emerald', 'sky', 'amber', 'indigo', 'rose', 'slate']),
  className: PropTypes.string,
  icon: PropTypes.elementType,
};

export default memo(Badge);
