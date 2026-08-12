import { useState } from 'react';
import { Download, Star, FileText, CheckSquare, Calendar, ChevronDown, Check } from 'lucide-react';
import PageHero from '../components/ui/PageHero.jsx';
import TemplateCard from '../components/cards/TemplateCard.jsx';
import './Templates.css';

import { TEMPLATES } from '../data/templates.js';

function Templates() {
  const [activeType, setActiveType] = useState('الكل');
  
  const handleDownload = (template) => {
    let content = '';
    let mimeType = 'text/plain';
    let extension = '.txt';

    if (template.type === 'Excel') {
      content = `الرقم,البيان,النوع,المبلغ\n1,رأس المال,دائن,100000\n2,مشتريات بضاعة,مدين,20000\n3,مبيعات,دائن,35000\n,الصافي,,115000`;
      mimeType = 'text/csv;charset=utf-8;';
      extension = '.csv';
    } else if (template.type === 'Word') {
      content = `نموذج: ${template.title}\n\nالتاريخ: 2024/01/01\nالطرف الأول: ________________\nالطرف الثاني: ________________\n\nبناءً على هذا العقد، تم الاتفاق على الشروط والأحكام التالية:\n1. البند الأول...\n2. البند الثاني...`;
      mimeType = 'text/plain;charset=utf-8;';
      extension = '.txt';
    } else if (template.type === 'PDF') {
      content = `نموذج: ${template.title}\n\nهذا الملف هو معاينة نصية سريعة. في النسخة النهائية للمنصة سيتم توفير ملفات PDF حقيقية جاهزة للطباعة.\n\nتاريخ الإصدار: 2024`;
      mimeType = 'text/plain;charset=utf-8;';
      extension = '.txt'; // Browsers need jsPDF for real PDFs, TXT is used as fallback.
    }

    // Add UTF-8 BOM so Excel and Notepad display Arabic correctly
    const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    const blob = new Blob([bom, content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${template.title}${extension}`;
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  };

  const filteredTemplates = activeType === 'الكل' 
    ? TEMPLATES 
    : TEMPLATES.filter(t => t.type === activeType);

  return (
    <div className="templates-page animate-fade-in pb-10">
      
      <PageHero 
        title="مكتبة النماذج والقوالب"
        description="حمل أحدث النماذج المحاسبية والمالية الجاهزة للاستخدام بصيغ Excel, Word, PDF."
      />

      <div className="container py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Filter Sidebar */}
          <aside className="w-full lg:w-1/4 flex-shrink-0">
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm sticky top-24">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border-color)]">
                <h3 className="font-bold text-[var(--text-primary)] text-lg m-0 flex items-center gap-2">
                  الفلترة
                </h3>
                <span className="text-[var(--text-secondary)] text-sm cursor-pointer hover:text-[var(--primary-accent)] font-medium transition-colors bg-[var(--bg-main)] px-3 py-1 rounded-full">مسح الكل</span>
              </div>
              
              <div className="filter-group mb-8">
                <h4 className="font-bold text-[var(--text-primary)] flex items-center justify-between cursor-pointer mb-4">
                  نوع الملف <ChevronDown size={18} className="text-[var(--text-secondary)]" />
                </h4>
                <div className="flex flex-col gap-3">
                  {['الكل', 'Excel', 'Word', 'PDF'].map(type => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all duration-300 shadow-sm ${
                        activeType === type 
                          ? 'bg-[var(--primary-accent)] border-[var(--primary-accent)] text-white' 
                          : 'bg-[var(--bg-main)] border-[var(--border-color)] text-transparent group-hover:border-[var(--primary-accent)]'
                      }`}>
                        <Check size={14} strokeWidth={4} />
                      </div>
                      <input 
                        type="checkbox" 
                        className="hidden"
                        checked={activeType === type}
                        onChange={() => setActiveType(type)}
                      />
                      <span className={`text-sm font-medium transition-colors ${
                        activeType === type ? 'text-[var(--primary-accent)]' : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'
                      }`}>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h4 className="font-bold text-[var(--text-primary)] flex items-center justify-between cursor-pointer mb-4">
                  التصنيفات <ChevronDown size={18} className="text-[var(--text-secondary)]" />
                </h4>
                <div className="flex flex-col gap-3">
                  {['محاسبة مالية', 'محاسبة تكاليف', 'الموارد البشرية', 'نماذج ضريبية'].map(cat => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-5 h-5 rounded flex items-center justify-center border bg-[var(--bg-main)] border-[var(--border-color)] text-transparent transition-all duration-300 shadow-sm group-hover:border-[var(--primary-accent)]">
                        <Check size={14} strokeWidth={4} />
                      </div>
                      <input type="checkbox" className="hidden" />
                      <span className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

            </div>
          </aside>

          {/* Main Grid */}
          <main className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTemplates.map(template => (
                <TemplateCard key={template.id} template={template} onDownload={handleDownload} />
              ))}
            </div>
            
            {filteredTemplates.length === 0 && (
              <div className="text-center py-10 text-muted">
                لا توجد قوالب تطابق الفلتر المحدد.
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Templates;
