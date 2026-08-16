import { memo } from 'react';
import PropTypes from 'prop-types';
import { Search } from 'lucide-react';

function SearchInput({ 
  value, 
  onChange, 
  onSubmit, 
  placeholder = 'ابحث...', 
  className = 'mb-8 max-w-2xl mx-auto', 
  withButton = false,
  buttonText = 'بحث'
}) {
  const innerContent = (
    <div className="relative flex items-center shadow-lg rounded-2xl overflow-hidden bg-[var(--bg-card)] border border-[var(--border-color)] focus-within:border-[var(--primary-accent)] focus-within:ring-4 focus-within:ring-[var(--primary-accent)]/15 transition-all w-full">
      <div className="ps-4 pe-2 text-[var(--text-muted)] pointer-events-none">
        <Search size={20} />
      </div>
      <input 
        type="text" 
        placeholder={placeholder} 
        className="w-full py-3.5 px-2 bg-transparent text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-sm md:text-base outline-none font-medium"
        value={value}
        onChange={onChange}
      />
      {withButton && (
        <button 
          type="submit" 
          className="m-1.5 px-5 py-2.5 rounded-xl font-bold text-sm bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] text-white shadow-md transition-all active:scale-95 shrink-0"
        >
          {buttonText}
        </button>
      )}
    </div>
  );

  if (onSubmit) {
    return (
      <form onSubmit={onSubmit} className={className}>
        {innerContent}
      </form>
    );
  }

  return (
    <div className={className}>
      {innerContent}
    </div>
  );
}

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  withButton: PropTypes.bool,
  buttonText: PropTypes.string,
};

export default memo(SearchInput);
