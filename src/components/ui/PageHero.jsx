function PageHero({ title, description, badge, padding = 'py-16' }) {
  return (
    <section className={`relative bg-[var(--bg-dark)] ${padding} text-center border-b border-[var(--border-color)] overflow-hidden`}>
      {badge && (
        <>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--primary-accent)] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--secondary-accent)] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob animation-delay-4000"></div>
        </>
      )}
      <div className="container relative z-10 text-[var(--text-primary)]">
        {badge && (
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-card)]/50 backdrop-blur-md">
            <span className="text-[var(--primary-accent)] text-sm font-bold tracking-widest">{badge}</span>
          </div>
        )}
        <h1 className={`font-extrabold mb-4 leading-tight ${badge ? 'text-4xl md:text-6xl mb-6' : 'text-3xl md:text-4xl'}`}>
          {title}
        </h1>
        <p className={`text-[var(--text-muted)] max-w-3xl mx-auto ${badge ? 'text-lg md:text-xl mb-10 leading-relaxed text-[var(--text-secondary)]' : 'text-lg'}`}>
          {description}
        </p>
      </div>
    </section>
  );
}

export default PageHero;
