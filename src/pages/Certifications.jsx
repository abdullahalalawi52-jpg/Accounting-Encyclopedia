import { useTranslation } from 'react-i18next';
import { Award, BookOpen, Clock, Target } from 'lucide-react';

const certificationsDB = [
  {
    id: 'socpa',
    title: 'زمالة الهيئة السعودية للمراجعين والمحاسبين (SOCPA)',
    organization: 'الهيئة السعودية للمراجعين والمحاسبين',
    desc: 'الشهادة الأهم للمحاسبين في المملكة العربية السعودية، وتعتبر شرطاً لافتتاح مكتب مراجعة أو تولي مناصب قيادية مالية.',
    subjects: ['المحاسبة', 'المراجعة', 'الزكاة والضريبة', 'فقه المعاملات', 'الأنظمة التجارية'],
    time: 'سنة إلى سنتين',
    difficulty: 'مرتفع'
  },
  {
    id: 'cpa',
    title: 'محاسب قانوني معتمد (CPA)',
    organization: 'المعهد الأمريكي للمحاسبين القانونيين (AICPA)',
    desc: 'شهادة عالمية تعتبر المعيار الذهبي في مهنة المحاسبة والمراجعة حول العالم.',
    subjects: ['المحاسبة المالية وإعداد التقارير (FAR)', 'المراجعة (AUD)', 'التنظيم والضرائب (REG)', 'بيئة الأعمال (BEC - أو النظام الجديد)'],
    time: '12-18 شهراً',
    difficulty: 'عالي جداً'
  },
  {
    id: 'cma',
    title: 'محاسب إداري معتمد (CMA)',
    organization: 'معهد المحاسبين الإداريين (IMA)',
    desc: 'تركز على المحاسبة الإدارية، الإدارة المالية، واتخاذ القرارات الاستراتيجية في الشركات.',
    subjects: ['التقارير المالية والأداء', 'التخطيط والتحكم', 'القرارات المالية', 'إدارة المخاطر'],
    time: '6-12 شهراً',
    difficulty: 'متوسط إلى مرتفع'
  },
  {
    id: 'acca',
    title: 'جمعية المحاسبين القانونيين المعتمدين (ACCA)',
    organization: 'جمعية ACCA البريطانية',
    desc: 'شهادة بريطانية واسعة الانتشار عالمياً، تركز على معايير IFRS والضرائب والقانون.',
    subjects: ['13-14 ورقة امتحان تشمل المحاسبة، الإدارة، القانون، الضرائب، والمراجعة'],
    time: '3-4 سنوات',
    difficulty: 'مرتفع'
  }
];

function Certifications() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  return (
    <div className="container py-12 animate-fade-in">
      <div className="text-center mb-12">
        <div className="inline-block p-4 rounded-full bg-gradient mb-4">
          <Award size={32} color="var(--primary-accent)" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-gradient">{isEn ? 'Accounting Professional Certifications' : 'الشهادات المهنية المحاسبية'}</h1>
        <p className="text-xl text-[var(--text-secondary)]">دليلك الشامل لأهم الشهادات المهنية في عالم المحاسبة والمالية</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {certificationsDB.map(cert => (
          <div key={cert.id} className="glass-panel border border-[var(--border-color)] p-6 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all">
            <h2 className="text-2xl font-bold mb-2 text-[var(--primary-accent)]">{cert.title}</h2>
            <p className="text-sm font-semibold text-[var(--text-muted)] mb-4">{cert.organization}</p>
            <p className="mb-6 line-clamp-3">{cert.desc}</p>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <BookOpen size={20} className="text-[var(--secondary-accent)] shrink-0 mt-1" />
                <div>
                  <strong className="block mb-1">المواد / الأجزاء:</strong>
                  <ul className="list-disc list-inside text-sm text-[var(--text-secondary)]">
                    {cert.subjects.map((sub, i) => <li key={i}>{sub}</li>)}
                  </ul>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-[var(--secondary-accent)] shrink-0" />
                <span><strong className="ml-2">المدة المتوقعة:</strong> {cert.time}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Target size={20} className="text-[var(--secondary-accent)] shrink-0" />
                <span><strong className="ml-2">مستوى الصعوبة:</strong> {cert.difficulty}</span>
              </div>
            </div>
            
            <button className="btn btn-outline w-full text-center mt-auto">
              {isEn ? 'How to Prepare (Coming Soon)' : 'كيفية التحضير (قريباً)'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Certifications;
