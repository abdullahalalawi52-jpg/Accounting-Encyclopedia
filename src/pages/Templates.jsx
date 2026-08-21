import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import PageHero from '../components/ui/PageHero.jsx';
import TemplateCard from '../components/cards/TemplateCard.jsx';
import { useToast } from '../context/ToastContext.jsx';
import './Templates.css';

import { TEMPLATES } from '../data/templates.js';

function Templates() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const { addToast } = useToast();

  const [activeType, setActiveType] = useState('All');
  const [activeCategory, setActiveCategory] = useState('all');
  
  const generateTemplateContent = (template) => {
    // 1. Financial Statements
    if (template.id === 1) {
      return `موسوعة المحاسبة والمالية - القوائم المالية الكاملة (IFRS)
قائمة المركز المالي وقائمة الدخل الشامل
البند,السنة الحالية (SAR),السنة المقارنة (SAR),ملاحظات
الأصول المتداولة:,,,
النقد وما في حكمه,"450,000","320,000",حسابات بنكية وخزينة
العملاء والمدينون التجاريون,"680,000","540,000",صافي بعد مخصص الديون
المخزون السلعي,"820,000","710,000",بالتكلفة أو صافي القيمة القابلة للتحقق
مصاريف مدفوعة مقدماً,"65,000","50,000",إيجارات وتأمينات
إجمالي الأصول المتداولة,"2,015,000","1,620,000",
الأصول غير المتداولة:,,,
الآلات والمعدات (صافي),"1,450,000","1,600,000",بعد مجمع الإهلاك
المباني والإنشاءات,"3,200,000","3,300,000",
استثمارات طويلة الأجل,"500,000","400,000",شركات زميلة
إجمالي الأصول,"7,165,000","6,920,000",
الالتزامات وحقوق الملكية:,,,
الموردون والدائنون,"520,000","480,000",
قروض بنكية قصيرة الأجل,"300,000","250,000",
مخصص الزكاة والضريبة,"140,000","120,000",
قروض طويلة الأجل,"1,200,000","1,500,000",
رأس المال المدفوع,"3,500,000","3,500,000",
الاحتياطي النظامي,"700,000","650,000",
الأرباح المبقاة (المدورة),"805,000","420,000",
إجمالي الالتزامات وحقوق الملكية,"7,165,000","6,920,000",متطابق مع إجمالي الأصول`;
    }

    // 2. Payroll
    if (template.id === 2) {
      return `موسوعة المحاسبة والمالية - كشف مسير الرواتب والأجور الشهرية (WPS)
الرقم الوظيفي,اسم الموظف,المسمى الوظيفي,الراتب الأساسي,بدل السكن,بدل النقل,إجمالي الراتب,خصم التأمينات (GOSI),سلف وغيابات,صافي الراتب المستحق
EMP-101,أحمد محمد العلي,مدير مالي,"18,000","4,500","1,500","24,000","1,755","0","22,245"
EMP-102,سارة خالد الدوسري,محاسب عام,"10,000","2,500","1,000","13,500","975","500","12,025"
EMP-103,عمر حسن القحطاني,مدير مبيعات,"12,000","3,000","1,200","16,200","1,170","0","15,030"
EMP-104,فاطمة صالح النمر,أخصائي موارد بشرية,"9,000","2,250","900","12,150","877.5","0","11,272.5"
EMP-105,يوسف طارق المنصور,أمين مستودع,"7,500","1,875","800","10,175","731.25","300","9,143.75"
,,الإجمالي العام,"56,500","14,125","5,400","76,025","5,508.75","800","69,716.25"`;
    }

    // 3. Trial Balance
    if (template.id === 3) {
      return `موسوعة المحاسبة والمالية - ميزان المراجعة بالأرصدة والمجاميع
رمز الحساب,اسم الحساب المحاسبي,المجاميع مدين,المجاميع دائن,الأرصدة مدين,الأرصدة دائن
101,النقدية بالبنوك,"3,450,000","2,950,000","500,000","0"
102,الصندوق (الخزينة الرئيسية),"420,000","360,000","60,000","0"
103,العملاء والمدينون,"1,850,000","1,200,000","650,000","0"
104,المخزون السلعي,"900,000","450,000","450,000","0"
105,الأصول الثابتة - آلات ومعدات,"1,200,000","0","1,200,000","0"
106,مجمع إهلاك الآلات والمعدات,"0","300,000","0","300,000"
201,الموردون والدائنون,"850,000","1,400,000","0","550,000"
202,ضريبة القيمة المضافة المستحقة,"120,000","195,000","0","75,000"
301,رأس المال,"0","1,500,000","0","1,500,000"
401,إيراد المبيعات,"0","1,800,000","0","1,800,000"
501,تكلفة البضاعة المباعة,"950,000","0","950,000","0"
502,مصروف الرواتب والأجور,"340,000","0","340,000","0"
503,مصروف الإيجار,"75,000","0","75,000","0"
,الإجمالي المتوازن,"10,105,000","10,105,000","4,225,000","4,225,000"`;
    }

    // 4. Bank Reconciliation
    if (template.id === 4) {
      return `موسوعة المحاسبة والمالية - مذكرة تسوية البنك الشهرية
البيان,المبلغ الجزئي (SAR),المبلغ الكلي (SAR)
رصيد النقدية بموجب دفاتر الشركة,,425000
يضاف: إيداعات وتحصيلات مباشرة بالبنك لم تسجل بالدفاتر:,,
إيداع عميل مباشر (مؤسسة الأمل),45000,
إيراد استثمارات وأرباح أسهم محصلة,12000,57000
يخصم: مصاريف وشيكات مخصومة بالبنك لم تسجل بالدفاتر:,,
عمولات ومصروفات بنكية,1500,
شيك مرتجع لعدم كفاية الرصيد,18500,(20000)
الرصيد المعدل بموجب الدفاتر,,462000
,,,
رصيد كشف حساب البنك,,515000
يضاف: إيداعات بالطريق لم تظهر بكشف البنك:,,
مقبوضات نقدية وشيكات أودعت نهاية الشهر,65000,65000
يخصم: شيكات مسحوبة للموردين لم تصرف بعد (معلقة):,,
شيك رقم 10425 (شركة التوريدات),-82000,
شيك رقم 10430 (مؤسسة التقنية),-36000,(118000)
الرصيد المعدل بموجب كشف حساب البنك,,462000
النتيجة: الرصيدان متطابقان تماماً (تمت التسوية بنجاح),,✓ متطابق`;
    }

    // 5. Fixed Assets
    if (template.id === 5) {
      return `موسوعة المحاسبة والمالية - سجل الأصول الثابتة وحساب الإهلاك
كود الأصل,اسم وتوصيف الأصل,تاريخ الشراء,التكلفة التاريخية,القيمة التخريدية,العمر الإنتاجي (سنوات),طريقة الإهلاك,القسط السنوي,مجمع الإهلاك,صافي القيمة الدفترية
AST-01,شاحنة توزيع مرسيدس,2021/01/15,"180,000","20,000",5,قسط ثابت,"32,000","96,000","84,000"
AST-02,خط إنتاج تعبئة وتغليف,2020/06/01,"450,000","50,000",10,قسط ثابت,"40,000","160,000","290,000"
AST-03,أجهزة حاسب وسيرفرات,2022/03/10,"75,000","5,000",3,قسط ثابت,"23,333.33","46,666.67","28,333.33"
AST-04,مكيفات ومعدات تبريد,2021/08/20,"90,000","10,000",4,قسط ثابت,"20,000","60,000","30,000"
AST-05,أثاث وديكورات المكاتب,2019/12/01,"120,000","12,000",6,قسط ثابت,"18,000","90,000","30,000"
,,الإجمالي,"915,000","97,000",,,"133,333.33","452,666.67","462,333.33"`;
    }

    // Default template fallback (Structured text or Word/PDF)
    if (template.type === 'Excel') {
      return `موسوعة المحاسبة والمالية - ${template.title}
الرقم,البيان المحاسبي,النوع,المبلغ (SAR),التاريخ,ملاحظات
1,الرصيد الافتتاحي,دائن,"250,000",2024/01/01,معتمد
2,مشتريات بضاعة,مدين,"45,000",2024/01/05,فاتورة ضريبية
3,مبيعات نقدية وآجلة,دائن,"85,000",2024/01/12,شامل الضريبة
4,مصروفات تشغيلية ورواتب,مدين,"32,000",2024/01/25,تحويل بنكي
,الصافي النهائي,, "258,000",,`;
    } else if (template.type === 'Word') {
      return `موسوعة المحاسبة والمالية
==================================================
الوثيقة الرسمية: ${template.title}
التصنيف: ${template.category_ar || 'نماذج عامة'}
تاريخ الإصدار: 2024/03/15
==================================================

1. مقدمة وتمهيد:
تحدد هذه الوثيقة الضوابط المحاسبية والإدارية المعتمدة وفقاً للأنظمة واللوائح المهنية المعمول بها.

2. نطاق التطبيق والمسؤوليات:
تسري هذه الأحكام على كافة العمليات المالية المرتبطة بالمنشأة وتعتبر ملزمة لكافة الإدارات المعنية.

3. الإجراءات والشروط التفصيلية:
- البند الأول: توثيق كافة المعاملات بمستندات مؤيدة ومعتمدة من المفوضين بالتوقيع.
- البند الثاني: إجراء المطابقات والتسويات الدورية في المواعيد المحددة نظاماً.
- البند الثالث: الالتزام بمعايير الإفصاح والشفافية وحفظ السجلات المحاسبية للمدة النظامية.

4. الاعتماد والتوقيعات:
المدير المالي: ____________________       المدير العام: ____________________`;
    } else {
      return `موسوعة المحاسبة والمالية
==================================================
النموذج الرسمي: ${template.title}
نوع الملف: PDF جاهز للطباعة والتوثيق
==================================================

رقم السند / الفاتورة: #ACC-2024-0891
التاريخ: 2024/03/15
الطرف المستفيد / العميل: مؤسسة الريادة التجارية
الرقم الضريبي: 300123456700003

تفاصيل المعاملة:
--------------------------------------------------
البيان: تقديم خدمات واستشارات محاسبية وتدقيق داخلي
المبلغ قبل الضريبة: 20,000.00 ريال
ضريبة القيمة المضافة (15%): 3,000.00 ريال
إجمالي المبلغ المستحق: 23,000.00 ريال فقط لا غير.

توقيع المستلم: __________________    توقيع المحاسب: __________________`;
    }
  };

  const handleDownload = (template) => {
    const content = generateTemplateContent(template);
    let mimeType = 'text/plain;charset=utf-8;';
    let extension = '.txt';

    if (template.type === 'Excel') {
      mimeType = 'text/csv;charset=utf-8;';
      extension = '.csv';
    } else if (template.type === 'Word') {
      mimeType = 'application/msword;charset=utf-8;';
      extension = '.doc';
    } else if (template.type === 'PDF') {
      mimeType = 'text/plain;charset=utf-8;';
      extension = '.txt';
    }

    // Add UTF-8 BOM so Excel and Notepad display Arabic correctly
    const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    const blob = new Blob([bom, content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    const downloadTitle = (isEn && template.title_en) ? template.title_en : template.title;
    link.download = `${downloadTitle}${extension}`;
    document.body.appendChild(link);
    link.click();
    
    addToast(isEn ? `Downloading: ${downloadTitle}` : `جاري تحميل: ${downloadTitle}`);

    // Cleanup
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  };

  const filteredTemplates = TEMPLATES.filter(t => {
    const matchesType = (activeType === 'All' || activeType === 'الكل') || t.type === activeType;
    const matchesCat = activeCategory === 'all' || t.category === activeCategory;
    return matchesType && matchesCat;
  });

  return (
    <div className="templates-page animate-fade-in pb-10">
      
      <PageHero 
        title={isEn ? 'Templates & Forms Library' : 'مكتبة النماذج والقوالب المحاسبية'}
        description={isEn ? 'Download ready-to-use professional accounting spreadsheets and documents in Excel, Word, and PDF.' : 'حمل أحدث النماذج المحاسبية والمالية المتكاملة الجاهزة للاستخدام بصيغ Excel, Word, PDF.'}
      />

      <div className="container py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Filter Sidebar */}
          <aside className="w-full lg:w-1/4 flex-shrink-0">
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm sticky top-24">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border-color)]">
                <h3 className="font-bold text-[var(--text-primary)] text-lg m-0 flex items-center gap-2">{isEn ? 'Filter' : 'الفلترة والبحث'}</h3>
                <button
                  type="button" 
                  onClick={() => {
                    setActiveType('All');
                    setActiveCategory('all');
                  }}
                  className="text-[var(--text-secondary)] text-sm cursor-pointer hover:text-[var(--primary-accent)] font-medium transition-colors bg-[var(--bg-main)] px-3 py-1 rounded-full border-none"
                >
                  {isEn ? 'Reset All' : 'إعادة ضبط'}
                </button>
              </div>
              
              <div className="filter-group mb-8">
                <h4 className="font-bold text-[var(--text-primary)] flex items-center justify-between mb-4">
                  {isEn ? 'File Type' : 'نوع الملف'}
                  <ChevronDown size={18} className="text-[var(--text-secondary)]" />
                </h4>
                <div className="flex flex-col gap-3">
                  {['All', 'Excel', 'Word', 'PDF'].map(type => (
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
                        activeType === type ? 'text-[var(--primary-accent)] font-bold' : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'
                      }`}>{type === 'All' ? (isEn ? 'All Formats' : 'جميع الصيغ') : type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h4 className="font-bold text-[var(--text-primary)] flex items-center justify-between mb-4">
                  {isEn ? 'Categories' : 'التصنيفات التخصصية'}
                  <ChevronDown size={18} className="text-[var(--text-secondary)]" />
                </h4>
                <div className="flex flex-col gap-3">
                  {[
                    { id: 'all', ar: 'كافة التصنيفات', en: 'All Categories' },
                    { id: 'financial', ar: 'محاسبة مالية', en: 'Financial Accounting' },
                    { id: 'cost', ar: 'محاسبة تكاليف', en: 'Cost Accounting' },
                    { id: 'hr', ar: 'الموارد البشرية (HR)', en: 'Human Resources (HR)' },
                    { id: 'tax', ar: 'نماذج ضريبية وزكوية', en: 'Tax & Zakat Forms' }
                  ].map(cat => (
                    <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all duration-300 shadow-sm ${
                        activeCategory === cat.id 
                          ? 'bg-[var(--primary-accent)] border-[var(--primary-accent)] text-white' 
                          : 'bg-[var(--bg-main)] border-[var(--border-color)] text-transparent group-hover:border-[var(--primary-accent)]'
                      }`}>
                        <Check size={14} strokeWidth={4} />
                      </div>
                      <input 
                        type="checkbox" 
                        className="hidden"
                        checked={activeCategory === cat.id}
                        onChange={() => setActiveCategory(cat.id)}
                      />
                      <span className={`text-sm font-medium transition-colors ${
                        activeCategory === cat.id ? 'text-[var(--primary-accent)] font-bold' : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'
                      }`}>{isEn ? cat.en : cat.ar}</span>
                    </label>
                  ))}
                </div>
              </div>

            </div>
          </aside>

          {/* Main Grid */}
          <main className="w-full lg:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                {isEn ? `Showing ${filteredTemplates.length} Templates` : `عرض ${filteredTemplates.length} نماذج وقوالب جاهزة`}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTemplates.map(template => (
                <TemplateCard key={template.id} template={template} onDownload={handleDownload} />
              ))}
            </div>
            
            {filteredTemplates.length === 0 && (
              <div className="text-center py-16 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] text-[var(--text-muted)]">
                <p className="text-base font-bold mb-1">{isEn ? 'No templates match the selected filter.' : 'لا توجد قوالب تطابق الفلتر المحدد.'}</p>
                <p className="text-xs">{isEn ? 'Try choosing a different file type or category.' : 'جرب تغيير نوع الملف أو التصنيف لعرض المزيد من النماذج.'}</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Templates;

