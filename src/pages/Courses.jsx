import { PlayCircle, Clock, Star } from 'lucide-react';

const coursesDB = [
  {
    id: 1,
    title: 'مبادئ المحاسبة المالية (المستوى الأول)',
    instructor: 'أ. أحمد عبدالله',
    duration: '4 ساعات',
    level: 'مبتدئ',
    rating: 4.8,
    image: '/images/placeholder.svg'
  },
  {
    id: 2,
    title: 'إعداد القوائم المالية وفقاً لـ IFRS',
    instructor: 'د. خالد محمد',
    duration: '6.5 ساعات',
    level: 'متوسط',
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
    level: 'متوسط',
    rating: 4.6,
    image: '/images/placeholder.svg'
  }
];

function Courses() {
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
          <div key={course.id} className="glass-panel overflow-hidden flex flex-col group border border-[var(--border-color)]">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={course.image} 
                alt={course.title} 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <PlayCircle size={48} className="text-white" />
              </div>
            </div>
            
            <div className="p-5 flex flex-col flex-1">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs bg-[var(--bg-tertiary)] px-2 py-1 rounded text-[var(--text-secondary)]">{course.level}</span>
                <div className="flex items-center gap-1 text-yellow-500 text-sm">
                  <Star size={14} fill="currentColor" /> {course.rating}
                </div>
              </div>
              
              <h3 className="font-bold text-lg mb-2 line-clamp-2">{course.title}</h3>
              <p className="text-sm text-[var(--text-muted)] mb-4">{course.instructor}</p>
              
              <div className="mt-auto flex items-center justify-between border-t border-[var(--border-color)] pt-4">
                <div className="flex items-center gap-1 text-sm text-[var(--text-secondary)]">
                  <Clock size={16} /> {course.duration}
                </div>
                <button className="text-[var(--primary-accent)] font-semibold text-sm hover:underline">
                  ابدأ التعلم
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
