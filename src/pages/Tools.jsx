import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Calculator, Book, FileText, ClipboardList, GraduationCap, PlayCircle, ChevronLeft } from 'lucide-react';

function Tools() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  const toolsList = [
    {
      id: 'glossary',
      path: '/glossary',
      title: (isEn ? 'Accounting Glossary' : 'القاموس المحاسبي'),
      desc: (isEn ? 'Comprehensive dictionary for all accounting terms (Arabic/English).' : 'قاموس شامل بجميع المصطلحات المحاسبية (عربي/إنجليزي).'),
      icon: <Book size={32} />,
      color: 'var(--primary-accent)'
    },
    {
      id: 'calculators',
      path: '/calculators',
      title: (isEn ? 'Smart Calculators' : 'حاسبات ذكية'),
      desc: (isEn ? 'Smart calculators for payroll, depreciation, zakat, and taxes.' : 'حاسبات ذكية للرواتب، الإهلاك، الزكاة، والضرائب.'),
      icon: <Calculator size={32} />,
      color: '#3B82F6'
    },
    {
      id: 'coa',
      path: '/chart-of-accounts',
      title: (isEn ? 'Chart of Accounts' : 'دليل الحسابات'),
      desc: (isEn ? 'Tree-structured chart of accounts built on international standards.' : 'دليل حسابات شجري جاهز ومبني على المعايير الدولية.'),
      icon: <FileText size={32} />,
      color: '#10B981'
    },
    {
      id: 'journal',
      path: '/journal-entries',
      title: (isEn ? 'Journal Entries Library' : 'مكتبة القيود'),
      desc: (isEn ? 'Huge library containing hundreds of examples of journal entries.' : 'مكتبة ضخمة تضم مئات الأمثلة على القيود اليومية.'),
      icon: <ClipboardList size={32} />,
      color: '#F97316'
    },
    {
      id: 'certs',
      path: '/certifications',
      title: (isEn ? 'Professional Certifications' : 'الشهادات المهنية'),
      desc: (isEn ? 'Your comprehensive guide to top professional certs (CPA, SOCPA).' : 'دليلك الشامل لأهم الشهادات المهنية (CPA, SOCPA).'),
      icon: <GraduationCap size={32} />,
      color: '#8B5CF6'
    },
    {
      id: 'courses',
      path: '/courses',
      title: (isEn ? 'Training Courses' : 'الدورات التعليمية'),
      desc: (isEn ? 'The best training courses to develop your accounting skills.' : 'أفضل الدورات التعليمية لتطوير مهاراتك المحاسبية.'),
      icon: <PlayCircle size={32} />,
      color: '#EF4444'
    }
  ];

  return (
    <div className="tools-page animate-fade-in pb-20">
      <div className="bg-[var(--bg-dark)] py-16 border-b border-[var(--border-color)] text-center relative overflow-hidden">
        <div className="container relative z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-4">{isEn ? 'Tools and References' : 'الأدوات والمراجع'}</h1>
          <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">{isEn ? 'A comprehensive set of tools, glossaries, and references every accountant needs for daily productivity.' : 'مجموعة متكاملة من الأدوات، القواميس، والمراجع التي يحتاجها كل محاسب في عمله اليومي لتسريع الإنتاجية.'}</p>
        </div>
      </div>

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {toolsList.map((tool) => (
            <Link to={tool.path} key={tool.id} className="card card-shimmer hover-lift bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl flex flex-col items-center text-center overflow-hidden group shadow-sm hover:border-[var(--primary-accent)]/60">
              {/* Colored Top Border */}
              <div className="w-full h-1.5" style={{ backgroundColor: tool.color }}></div>
              
              <div style={{ padding: '26px' }} className="flex flex-col items-center flex-grow w-full">
                <div 
                  className="mb-4 transition-transform duration-300 group-hover:-translate-y-1 p-3 rounded-2xl bg-[var(--bg-dark)] border border-[var(--border-color)] shadow-inner"
                  style={{ color: tool.color }}
                >
                  {tool.icon}
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-3">
                  {tool.title}
                </h2>
                <p className="text-[var(--text-secondary)] text-sm mb-6 leading-relaxed flex-grow">
                  {tool.desc}
                </p>
                <div className="w-full flex justify-end text-sm mt-auto" style={{ color: tool.color }}>
                  <span className="flex items-center gap-1 font-bold group-hover:opacity-80 transition-opacity">{isEn ? 'View All' : 'عرض الكل'}<ChevronLeft size={16} className={isEn ? 'rotate-180' : ''}/>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tools;
