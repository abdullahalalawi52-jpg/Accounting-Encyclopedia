import { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Card = forwardRef(function Card(
  {
    children,
    className = '',
    hover = true,
    shimmer = true,
    padding = 'p-6',
    ...props
  },
  ref
) {
  const hoverClasses = hover ? 'hover:-translate-y-1 hover:shadow-xl hover:border-[var(--primary-accent)]/70' : '';
  const shimmerClass = shimmer ? 'card-shimmer' : '';

  return (
    <div
      ref={ref}
      className={`bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] transition-all duration-300 ${padding} ${hoverClasses} ${shimmerClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hover: PropTypes.bool,
  shimmer: PropTypes.bool,
  padding: PropTypes.string,
};

export default Card;
