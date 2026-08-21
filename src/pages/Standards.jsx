import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, BookOpen, AlertCircle } from 'lucide-react';
import { useData } from '../hooks/useData.js';
import './Standards.css';

function Standards() {
  const { i18n } = useTranslation();
  const isEn = i18n.language?.startsWith('en');

  const { data: standardsData, loading } = useData('/data/standards.json');

  const timelineList = standardsData?.timeline || [];
  const ifrsList = standardsData?.standards || [];
  const comparisonList = standardsData?.comparison || [];

  return (
    <div className="standards-page animate-fade-in">
      
      {/* Hero Banner with Background Image overlay */}
      <div className="standards-hero">
        <div className="standards-hero-overlay">
          <div className="container text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 text-shadow-lg">
              {isEn ? 'Standards and Regulations' : 'القوانين والمعايير المهنية'}
            </h1>
            <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed font-medium">
              {isEn 
                ? 'The comprehensive reference for IFRS and local regulations organizing the accounting profession.' 
                : 'المرجع الشامل للمعايير الدولية للتقارير المالية (IFRS) والأنظمة المحلية لتنظيم مهنة المحاسبة.'}
            </p>
          </div>
        </div>
      </div>

      <div className="container py-10 flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-1/4">
          <div className="card bg-[var(--bg-card)] border border-[var(--border-color)] p-6 rounded-2xl mb-6 shadow-sm">
            <h3 className="font-bold text-[var(--text-primary)] text-lg mb-4 border-b border-[var(--border-color)] pb-3">
              {isEn ? 'Guide Contents' : 'محتويات الدليل'}
            </h3>
            <ul className="list-none p-0 flex flex-col gap-3">
              <li>
                <a href="#ifrs" className="text-[var(--text-secondary)] hover:text-[var(--primary-accent)] flex items-center gap-2 transition-colors">
                  {isEn ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                  <span>{isEn ? 'International Standards (IFRS)' : 'المعايير الدولية (IFRS)'}</span>
                </a>
              </li>
              <li>
                <a href="#socpa" className="text-[var(--text-secondary)] hover:text-[var(--primary-accent)] flex items-center gap-2 transition-colors">
                  {isEn ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                  <span>{isEn ? 'Local Regulations (SOCPA)' : 'الأنظمة المحلية (SOCPA)'}</span>
                </a>
              </li>
              <li>
                <a href="#comparison" className="text-[var(--text-secondary)] hover:text-[var(--primary-accent)] flex items-center gap-2 transition-colors">
                  {isEn ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                  <span>{isEn ? 'IFRS vs US GAAP Comparison' : 'مقارنة IFRS و US GAAP'}</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="card bg-[var(--bg-card)] border border-[var(--border-color)] p-6 rounded-2xl shadow-sm">
            <h3 className="font-bold text-[var(--text-primary)] text-lg mb-6 border-b border-[var(--border-color)] pb-3">
              {isEn ? 'Mandatory and Update Dates' : 'تواريخ الإلزام والتحديث'}
            </h3>
            <div className="timeline">
              {timelineList.map((item, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <span className="timeline-year text-[var(--primary-accent)] font-bold">{item.year}</span>
                    <p className="text-sm text-[var(--text-secondary)] mt-1 leading-relaxed">
                      {isEn && item.text_en ? item.text_en : item.text}
                    </p>
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
              <BookOpen className="text-[var(--primary-accent)]" size={26} />
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                {isEn ? 'International Standards (IAS / IFRS)' : 'المعايير الدولية (IAS / IFRS)'}
              </h2>
            </div>
            
            {loading ? (
              <div className="text-center py-10 text-[var(--text-secondary)]">
                {isEn ? 'Loading standards...' : 'جاري تحميل المعايير...'}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ifrsList.map(std => (
                  <div key={std.id} className="card bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl border-t-[var(--primary-accent)] border-t-4 p-6 hover-lift flex flex-col justify-between shadow-sm">
                    <div>
                      <h3 className="font-bold text-[var(--text-primary)] text-lg mb-2">
                        {isEn && std.title_en ? std.title_en : std.title}
                      </h3>
                      <p className="text-[var(--text-secondary)] text-sm mb-6 leading-relaxed">
                        {isEn && std.desc_en ? std.desc_en : std.desc}
                      </p>
                    </div>
                    <button className="bg-transparent border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--primary-accent)] hover:text-[var(--primary-accent)] hover:bg-[var(--primary-accent)]/5 px-4 py-2 rounded-xl transition-all duration-300 text-sm font-bold shadow-sm w-fit">
                      {isEn ? 'Show Details' : 'عرض التفاصيل'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Local Standards */}
          <section id="socpa" className="mb-12">
            <div className="card bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-2xl p-7 relative overflow-hidden shadow-sm">
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                  {isEn ? 'Local Regulations & Authority Recommendations (SOCPA)' : 'الأنظمة المحلية وتوصيات الهيئة (SOCPA)'}
                </h2>
                <p className="mb-8 text-[var(--text-secondary)] max-w-2xl leading-relaxed">
                  {isEn 
                    ? 'Explore modifications and additions approved by the Saudi Organization for Chartered and Professional Accountants (SOCPA) to align IFRS with the local regulatory environment.'
                    : 'تعرف على التعديلات والإضافات التي أقرتها الهيئة السعودية للمراجعين والمحاسبين على المعايير الدولية لتتناسب مع البيئة النظامية المحلية.'}
                </p>
                <button className="bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] text-white px-6 py-2.5 rounded-xl font-bold transition-colors shadow-lg">
                  {isEn ? 'Browse Authority Publications' : 'استعرض إصدارات الهيئة'}
                </button>
              </div>
              <AlertCircle size={180} className="absolute left-[-20px] bottom-[-40px] opacity-[0.03] text-[var(--text-primary)] pointer-events-none" />
            </div>
          </section>

          {/* Comparison Table */}
          <section id="comparison">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
              {isEn ? 'Quick Comparison: IFRS vs US GAAP' : 'مقارنة سريعة: IFRS مقابل US GAAP'}
            </h2>
            <div className="card bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className={`w-full ${isEn ? 'text-left' : 'text-right'} border-collapse text-[var(--text-primary)]`}>
                  <thead className="bg-[var(--bg-dark)] border-b border-[var(--border-color)]">
                    <tr>
                      <th className="p-4 font-bold">{isEn ? 'Item' : 'البند'}</th>
                      <th className="p-4 font-bold text-[var(--primary-accent)]">{isEn ? 'IFRS (International)' : 'IFRS (المعايير الدولية)'}</th>
                      <th className="p-4 font-bold text-[var(--text-muted)]">{isEn ? 'US GAAP (American)' : 'US GAAP (الأمريكية)'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonList.map((row, rIdx) => (
                      <tr key={rIdx} className="border-b border-[var(--border-color)] last:border-0 hover:bg-[var(--bg-main)] transition-colors">
                        <td className="p-4 font-bold bg-[var(--bg-dark)]/40">{isEn && row.item_en ? row.item_en : row.item}</td>
                        <td className="p-4 text-[var(--text-secondary)]">{isEn && row.ifrs_en ? row.ifrs_en : row.ifrs}</td>
                        <td className="p-4 text-[var(--text-secondary)]">{isEn && row.gaap_en ? row.gaap_en : row.gaap}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}

export default Standards;
