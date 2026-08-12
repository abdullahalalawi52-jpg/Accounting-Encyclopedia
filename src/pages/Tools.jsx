import { Link } from 'react-router-dom';
import { Calculator, Book, FileText, ClipboardList, GraduationCap, PlayCircle, ChevronLeft } from 'lucide-react';

function Tools() {
  const toolsList = [
    {
      id: 'glossary',
      path: '/glossary',
      title: 'القاموس المحاسبي',
      desc: 'قاموس شامل بجميع المصطلحات المحاسبية (عربي/إنجليزي).',
      icon: <Book size={32} />,
      color: 'var(--primary-accent)'
    },
    {
      id: 'calculators',
      path: '/calculators',
      title: 'حاسبات ذكية',
      desc: 'حاسبات ذكية للرواتب، الإهلاك، الزكاة، والضرائب.',
      icon: <Calculator size={32} />,
      color: '#3B82F6'
    },
    {
      id: 'coa',
      path: '/chart-of-accounts',
      title: 'دليل الحسابات',
      desc: 'دليل حسابات شجري جاهز ومبني على المعايير الدولية.',
      icon: <FileText size={32} />,
      color: '#10B981'
    },
    {
      id: 'journal',
      path: '/journal-entries',
      title: 'مكتبة القيود',
      desc: 'مكتبة ضخمة تضم مئات الأمثلة على القيود اليومية.',
      icon: <ClipboardList size={32} />,
      color: '#F97316'
    },
    {
      id: 'certs',
      path: '/certifications',
      title: 'الشهادات المهنية',
      desc: 'دليلك الشامل لأهم الشهادات المهنية (CPA, SOCPA).',
      icon: <GraduationCap size={32} />,
      color: '#8B5CF6'
    },
    {
      id: 'courses',
      path: '/courses',
      title: 'الدورات التعليمية',
      desc: 'أفضل الدورات التعليمية لتطوير مهاراتك المحاسبية.',
      icon: <PlayCircle size={32} />,
      color: '#EF4444'
    }
  ];

  return (
    <div className="tools-page animate-fade-in pb-20">
      <div className="bg-[var(--bg-dark)] py-16 border-b border-[var(--border-color)] text-center relative overflow-hidden">
        <div className="container relative z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-4">
            الأدوات والمراجع
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
            مجموعة متكاملة من الأدوات، القواميس، والمراجع التي يحتاجها كل محاسب في عمله اليومي لتسريع الإنتاجية.
          </p>
        </div>
      </div>

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {toolsList.map((tool) => (
            <Link to={tool.path} key={tool.id} className="card hover-lift bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl flex flex-col items-center text-center overflow-hidden group">
              {/* Colored Top Border */}
              <div className="w-full h-1" style={{ backgroundColor: tool.color }}></div>
              
              <div className="p-8 flex flex-col items-center flex-grow w-full">
                <div 
                  className="mb-4 transition-transform duration-300 group-hover:-translate-y-1"
                  style={{ color: tool.color }}
                >
                  {tool.icon}
                </div>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
                  {tool.title}
                </h2>
                <p className="text-[var(--text-secondary)] text-sm mb-6 leading-relaxed flex-grow">
                  {tool.desc}
                </p>
                <div className="w-full flex justify-end text-sm mt-auto" style={{ color: tool.color }}>
                  <span className="flex items-center gap-1 font-bold group-hover:opacity-80 transition-opacity">
                    عرض الكل 
                    <ChevronLeft size={16} />
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
