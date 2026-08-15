import { useTranslation } from 'react-i18next';
import { PlayCircle, Clock, Star } from 'lucide-react';

function Courses() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  const coursesDB = [
    {
      id: 1,
      title: 'مبادئ المحاسبة المالية (المستوى الأول)',
      instructor: 'أ. أحمد عبدالله',
      duration: '4 ساعات',
      level: (isEn ? 'Beginner' : 'مبتدئ'),
      rating: 4.8,
      image: '/images/placeholder.svg'
    },
    {
      id: 2,
      title: 'إعداد القوائم المالية وفقاً لـ IFRS',
      instructor: 'د. خالد محمد',
      duration: '6.5 ساعات',
      level: (isEn ? 'Intermediate' : 'متوسط'),
      rating: 4.9,
      image: '/images/placeholder.svg'
    },
    {
      id: 3,
      title: 'تطبيقات الإكسل في المحاسبة',
      instructor: 'م. سارة علي',
      duration: '5 ساعات',
      level: 'جميع المستويات',
      rating: 4.7,
      image: '/images/placeholder.svg'
    },
    {
      id: 4,
      title: 'المحاسبة الضريبية (ضريبة القيمة المضافة)',
      instructor: 'مستشار ضريبي / عمر سعيد',
      duration: '3 ساعات',
      level: (isEn ? 'Intermediate' : 'متوسط'),
      rating: 4.6,
      image: '/images/placeholder.svg'
    }
  ];

  return (
    <div className="container py-12 animate-fade-in min-h-screen">
      <div className="text-center mb-12">
        <div className="inline-block p-4 rounded-full bg-gradient mb-4">
          <PlayCircle size={32} color="var(--primary-accent)" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-gradient">المسارات التعليمية والدورات</h1>
        <p className="text-xl text-[var(--text-secondary)]">طور مهاراتك المحاسبية عبر دورات تطبيقية وعملية (نسخة تجريبية)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {coursesDB.map(course => (
          <div key={course.id} className="glass-panel card-shimmer rounded-2xl overflow-hidden flex flex-col group border border-[var(--border-color)] hover:border-[var(--primary-accent)]/80 transition-all hover:shadow-xl hover:-translate-y-1.5 shadow-sm">
            <div className="relative h-48 overflow-hidden bg-[var(--bg-main)]">
              <img 
                src={course.image} 
                alt={course.title} 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs">
                <PlayCircle size={48} className="text-white" />
              </div>
            </div>
            
            <div style={{ padding: '22px' }} className="flex flex-col flex-1 justify-between">
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-xs bg-[var(--bg-dark)] px-2.5 py-1 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] font-semibold">{course.level}</span>
                  <div className="flex items-center gap-1 text-amber-400 font-bold text-xs">
                    <Star size={13} fill="currentColor" /> {course.rating}
                  </div>
                </div>
                
                <h3 className="font-bold text-base md:text-lg mb-2 line-clamp-2 leading-snug text-[var(--text-primary)] group-hover:text-[var(--primary-accent)] transition-colors">{course.title}</h3>
                <p className="text-xs md:text-sm text-[var(--text-muted)] mb-4">{course.instructor}</p>
              </div>
              
              <div className="mt-auto flex items-center justify-between border-t border-[var(--border-color)] pt-3.5">
                <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                  <Clock size={14} className="text-[var(--primary-accent)] opacity-80" /> {course.duration}
                </div>
                <button className="text-[var(--primary-accent)] font-bold text-xs hover:underline">
                  {isEn ? 'Start Learning' : 'ابدأ التعلم'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
