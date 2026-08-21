import { memo } from 'react';
import PropTypes from 'prop-types';

function PageHero({ title, description, badge, padding = 'py-16 md:py-20', children }) {
  return (
    <section className={`relative bg-gradient-to-b from-[var(--bg-dark)] to-[var(--bg-main)] ${padding} text-center border-b border-[var(--border-color)] overflow-hidden`}>
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--primary-accent)] rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob pointer-events-none"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--secondary-accent)] rounded-full mix-blend-screen filter blur-[100px] opacity-15 animate-blob animation-delay-2000 pointer-events-none"></div>
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-blue-600 rounded-full mix-blend-screen filter blur-[90px] opacity-15 animate-blob animation-delay-4000 pointer-events-none"></div>
      
      <div className="container relative z-10 text-[var(--text-primary)]">
        {badge && (
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-[var(--primary-accent)]/30 bg-[var(--primary-accent)]/10 backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[var(--primary-accent)] animate-pulse"></span>
            <span className="text-[var(--primary-accent)] text-xs md:text-sm font-bold tracking-wide">{badge}</span>
          </div>
        )}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 leading-tight tracking-tight text-[var(--text-primary)]">
          {title}
        </h1>
        {description && (
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-0 font-medium">
            {description}
          </p>
        )}
        {children && (
          <div className="mt-8">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}

PageHero.propTypes = {
  title: PropTypes.node.isRequired,
  description: PropTypes.node,
  badge: PropTypes.node,
  padding: PropTypes.string,
  children: PropTypes.node,
};

export default memo(PageHero);
