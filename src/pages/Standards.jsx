import { useTranslation } from 'react-i18next';
import { ChevronLeft, BookOpen, AlertCircle } from 'lucide-react';
import './Standards.css';

function Standards() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  const TIMELINE = [
    { 
      year: '2024', 
      text: isEn 
        ? 'IFRS 16 (Leases) update and amendments relating to sale and leaseback transactions.' 
        : 'تحديث معيار IFRS 16 (عقود الإيجار) والتعديلات المتعلقة بالبيع والاستئجار.' 
    },
    { 
      year: '2023', 
      text: isEn 
        ? 'Mandatory adoption of IFRS 17 (Insurance Contracts) for listed companies.' 
        : 'الإلزام بتطبيق IFRS 17 (عقود التأمين) للشركات المدرجة.' 
    },
    { 
      year: '2017', 
      text: isEn 
        ? 'Full transition to IFRS in Saudi Arabia (SOCPA).' 
        : 'التحول الكامل لمعايير IFRS في المملكة العربية السعودية (SOCPA).' 
    },
  ];

  const IFRS_STANDARDS = [
    { 
      id: 'ifrs9', 
      title: isEn ? 'IFRS 9 - Financial Instruments' : 'IFRS 9 - الأدوات المالية', 
      desc: isEn 
        ? 'Specifies recognition and measurement requirements for financial assets and liabilities.' 
        : 'يحدد متطلبات الاعتراف والقياس للأصول والالتزامات المالية.' 
    },
    { 
      id: 'ifrs15', 
      title: isEn ? 'IFRS 15 - Revenue from Contracts' : 'IFRS 15 - الإيرادات من العقود', 
      desc: isEn 
        ? 'A 5-step model to determine when and how much revenue to recognize.' 
        : 'نموذج من 5 خطوات لتحديد متى وكيف يتم الاعتراف بالإيرادات.' 
    },
    { 
      id: 'ias1', 
      title: isEn ? 'IAS 1 - Presentation of Financial Statements' : 'IAS 1 - عرض القوائم المالية', 
      desc: isEn 
        ? 'Basis for presenting general purpose financial statements to ensure comparability.' 
        : 'الأساس لعرض القوائم المالية ذات الغرض العام لضمان قابلية المقارنة.' 
    },
  ];

  return (
    <div className="standards-page animate-fade-in">
      
      {/* Hero Banner with Background Image overlay */}
      <div className="standards-hero">
        <div className="standards-hero-overlay">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] mb-4 text-shadow-lg">{isEn ? 'Standards and Regulations' : 'القوانين والمعايير المهنية'}</h1>
            <p className="text-lg text-gray-200" style={{margin: '0 auto', maxWidth: '600px'}}>{isEn ? 'The comprehensive reference for IFRS and local regulations organizing the accounting profession.' : 'المرجع الشامل للمعايير الدولية للتقارير المالية (IFRS) والأنظمة المحلية لتنظيم مهنة المحاسبة.'}</p>
          </div>
        </div>
      </div>

      <div className="container py-10 flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4">
            <div className="card bg-[var(--bg-card)] border border-[var(--border-color)] p-6 rounded-xl mb-6">
              <h3 className="font-bold text-[var(--text-primary)] text-lg mb-4 border-b border-[var(--border-color)] pb-3">{isEn ? 'Guide Contents' : 'محتويات الدليل'}</h3>
              <ul className="list-none p-0 flex flex-col gap-3">
                <li><a href="#ifrs" className="text-[var(--text-secondary)] hover:text-[var(--primary-accent)] flex items-center gap-2 transition-colors"><ChevronLeft size={16} className={isEn ? 'rotate-180' : ''}/>{isEn ? 'International Standards (IFRS)' : 'المعايير الدولية (IFRS)'}</a></li>
                <li><a href="#socpa" className="text-[var(--text-secondary)] hover:text-[var(--primary-accent)] flex items-center gap-2 transition-colors"><ChevronLeft size={16} className={isEn ? 'rotate-180' : ''}/>{isEn ? 'Local Regulations (SOCPA)' : 'الأنظمة المحلية (SOCPA)'}</a></li>
                <li><a href="#comparison" className="text-[var(--text-secondary)] hover:text-[var(--primary-accent)] flex items-center gap-2 transition-colors"><ChevronLeft size={16} className={isEn ? 'rotate-180' : ''}/>{isEn ? 'IFRS vs US GAAP Comparison' : 'مقارنة IFRS و US GAAP'}</a></li>
              </ul>
            </div>

            <div className="card bg-[var(--bg-card)] border border-[var(--border-color)] p-6 rounded-xl">
              <h3 className="font-bold text-[var(--text-primary)] text-lg mb-6 border-b border-[var(--border-color)] pb-3">{isEn ? 'Mandatory and Update Dates' : 'تواريخ الإلزام والتحديث'}</h3>
              <div className="timeline">
                {TIMELINE.map((item, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <span className="timeline-year text-[var(--primary-accent)] font-bold">{item.year}</span>
                      <p className="text-sm text-[var(--text-secondary)] mt-1 leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="w-full lg:w-3/4">
            
            {/* IFRS Section */}
            <section id="ifrs" className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="text-[var(--text-primary)]" size={28} />
                <h2 className="text-2xl font-bold text-[var(--text-primary)]">{isEn ? 'International Standards (IAS / IFRS)' : 'المعايير الدولية (IAS / IFRS)'}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {IFRS_STANDARDS.map(std => (
                  <div key={std.id} className="card bg-[var(--bg-card)] border border-[var(--border-color)] p-6 rounded-xl border-t-[var(--primary-accent)] border-t-4 hover-lift">
                    <h3 className="font-bold text-[var(--text-primary)] text-lg mb-2">{std.title}</h3>
                    <p className="text-[var(--text-secondary)] text-sm mb-6 leading-relaxed">{std.desc}</p>
                    <button className="bg-transparent border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--primary-accent)] hover:text-[var(--primary-accent)] px-4 py-2 rounded-lg transition-all duration-300 text-sm font-bold shadow-sm hover:shadow-[0_0_10px_rgba(16,185,129,0.2)]">{isEn ? 'Show Details' : 'عرض التفاصيل'}</button>
                  </div>
                ))}
              </div>
            </section>

            {/* Local Standards */}
            <section id="socpa" className="mb-12">
               <div className="card bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] p-8 rounded-xl relative overflow-hidden">
                 <div className="relative z-10">
                   <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">{isEn ? 'Local Regulations & Authority Recommendations (SOCPA)' : 'الأنظمة المحلية وتوصيات الهيئة (SOCPA)'}</h2>
                   <p className="mb-8 text-[var(--text-secondary)] max-w-2xl leading-relaxed">
                     {isEn 
                       ? 'Explore modifications and additions approved by the Saudi Organization for Chartered and Professional Accountants (SOCPA) to align IFRS with the local regulatory environment.'
                       : 'تعرف على التعديلات والإضافات التي أقرتها الهيئة السعودية للمراجعين والمحاسبين على المعايير الدولية لتتناسب مع البيئة النظامية المحلية.'}
                   </p>
                   <button className="bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] text-white px-6 py-2.5 rounded font-bold transition-colors shadow-lg">{isEn ? 'Browse Authority Publications' : 'استعرض إصدارات الهيئة'}</button>
                 </div>
                 <AlertCircle size={180} className="absolute left-[-20px] bottom-[-40px] opacity-[0.03] text-[var(--text-primary)]" />
               </div>
            </section>

            {/* Comparison Table */}
            <section id="comparison">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">{isEn ? 'Quick Comparison: IFRS vs US GAAP' : 'مقارنة سريعة: IFRS مقابل US GAAP'}</h2>
              <div className="card bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl overflow-hidden">
                <table className={`w-full ${isEn ? 'text-left' : 'text-right'} border-collapse text-[var(--text-primary)]`}>
                  <thead className="bg-[var(--bg-dark)] border-b border-[var(--border-color)]">
                    <tr>
                      <th className="p-4 font-bold">{isEn ? 'Item' : 'البند'}</th>
                      <th className="p-4 font-bold text-[var(--primary-accent)]">{isEn ? 'IFRS (International)' : 'IFRS (المعايير الدولية)'}</th>
                      <th className="p-4 font-bold text-[var(--text-muted)]">{isEn ? 'US GAAP (American)' : 'US GAAP (الأمريكية)'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[var(--border-color)] hover:bg-[var(--bg-main)] transition-colors">
                      <td className="p-4 font-bold bg-[var(--bg-dark)]">{isEn ? 'Methodology' : 'المنهجية'}</td>
                      <td className="p-4 text-[var(--text-secondary)]">{isEn ? 'Principles-based' : 'يعتمد على المبادئ (Principles-based)'}</td>
                      <td className="p-4 text-[var(--text-secondary)]">{isEn ? 'Rules-based' : 'يعتمد على القواعد (Rules-based)'}</td>
                    </tr>
                    <tr className="border-b border-[var(--border-color)] hover:bg-[var(--bg-main)] transition-colors">
                      <td className="p-4 font-bold bg-[var(--bg-dark)]">{isEn ? 'Inventory Valuation (LIFO)' : 'تقييم المخزون (LIFO)'}</td>
                      <td className="p-4 text-[var(--text-secondary)]">{isEn ? 'Not Allowed' : 'غير مسموح'}</td>
                      <td className="p-4 text-[var(--text-secondary)]">{isEn ? 'Allowed' : 'مسموح'}</td>
                    </tr>
                    <tr className="border-b border-[var(--border-color)] hover:bg-[var(--bg-main)] transition-colors">
                      <td className="p-4 font-bold bg-[var(--bg-dark)]">{isEn ? 'Asset Revaluation' : 'إعادة تقييم الأصول'}</td>
                      <td className="p-4 text-[var(--text-secondary)]">{isEn ? 'Allowed with conditions (Revaluation model)' : 'مسموح ببعض الشروط (نموذج إعادة التقييم)'}</td>
                      <td className="p-4 text-[var(--text-secondary)]">{isEn ? 'Not Allowed, uses historical cost only' : 'غير مسموح، يستخدم التكلفة التاريخية فقط'}</td>
                    </tr>
                    <tr className="hover:bg-[var(--bg-main)] transition-colors">
                      <td className="p-4 font-bold bg-[var(--bg-dark)]">{isEn ? 'Development Costs' : 'تكاليف التطوير'}</td>
                      <td className="p-4 text-[var(--text-secondary)]">{isEn ? 'Capitalized if certain conditions are met' : 'تُرسمل إذا استوفت شروطاً معينة'}</td>
                      <td className="p-4 text-[var(--text-secondary)]">{isEn ? 'Usually expensed in the income statement' : 'تُعتبر مصروفاً في قائمة الدخل غالباً'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

          </main>
        </div>
    </div>
  );
}

export default Standards;
