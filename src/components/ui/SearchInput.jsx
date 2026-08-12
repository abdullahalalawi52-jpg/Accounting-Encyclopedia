import { Search } from 'lucide-react';

function SearchInput({ value, onChange, onSubmit, placeholder = 'ابحث...', className = 'mb-10', withButton = false }) {
  const innerContent = (
    <div className={`search-bar glass-panel flex items-center ${!withButton ? 'mx-auto' : ''}`} style={{ maxWidth: withButton ? '100%' : '600px', padding: withButton ? '' : '0.5rem 1rem', borderRadius: '50px' }}>
      <Search className="search-icon" size={24} color="var(--text-muted)" style={{ margin: withButton ? '' : '0 1rem' }} />
      <input 
        type="text" 
        placeholder={placeholder} 
        className="search-input w-full"
        style={withButton ? {} : {
          padding: '1rem', 
          background: 'transparent', 
          border: 'none',
          color: 'var(--text-primary)',
          fontSize: '1.1rem',
          outline: 'none',
          boxShadow: 'none'
        }}
        value={value}
        onChange={onChange}
      />
      {withButton && <button type="submit" className="btn btn-primary">بحث</button>}
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

export default SearchInput;
