import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

function NotFound() {
  return (
    <div className="animate-fade-in flex flex-col items-center justify-center text-center py-20 px-4 min-h-[60vh]">
      <div className="relative mb-8">
        <span className="text-[8rem] md:text-[12rem] font-black text-[#1E293B] leading-none select-none">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <AlertTriangle size={64} className="text-[var(--primary-accent)] animate-pulse" />
        </div>
      </div>
      
      <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-4">
        الصفحة غير موجودة
      </h1>
      <p className="text-lg text-[var(--text-muted)] max-w-md mb-8">
        عذراً، الصفحة التي تبحث عنها غير موجودة أو ربما تم نقلها إلى عنوان آخر.
      </p>
      
      <Link 
        to="/" 
        className="bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] text-white font-bold px-8 py-3 rounded-xl flex items-center gap-2 transition-colors"
      >
        <Home size={20} />
        العودة للرئيسية
      </Link>
    </div>
  );
}

export default NotFound;
