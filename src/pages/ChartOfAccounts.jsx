import { useState } from 'react';
import { ChevronDown, ChevronUp, FileText } from 'lucide-react';
const accountsData = [
  {
    id: 1,
    name: 'الأصول (Assets)',
    type: 'مدين',
    description: 'الموارد التي تمتلكها الشركة ولها قيمة اقتصادية مستقبلية.',
    subAccounts: [
      {
        name: 'الأصول المتداولة',
        items: [
          { name: 'النقدية بالصندوق', code: '1101', example: '10,000 من حـ/ النقدية بالصندوق\n  10,000 إلى حـ/ رأس المال\n(إيداع رأس المال)' },
          { name: 'البنك', code: '1102', example: '5,000 من حـ/ البنك\n  5,000 إلى حـ/ الصندوق\n(إيداع نقدي في البنك)' },
          { name: 'العملاء (المدينون)', code: '1103', example: '2,000 من حـ/ العملاء\n  2,000 إلى حـ/ المبيعات\n(بيع بضاعة بالأجل)' }
        ]
      },
      {
        name: 'الأصول غير المتداولة (الثابتة)',
        items: [
          { name: 'الآلات والمعدات', code: '1201', example: '50,000 من حـ/ الآلات\n  50,000 إلى حـ/ البنك\n(شراء آلة بشيك)' },
          { name: 'مجمع الإهلاك - الآلات', code: '1202', example: '5,000 من حـ/ مصروف الإهلاك\n  5,000 إلى حـ/ مجمع الإهلاك\n(إثبات إهلاك السنة)' }
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'الخصوم / الالتزامات (Liabilities)',
    type: 'دائن',
    description: 'الديون والالتزامات المستحقة على الشركة للغير.',
    subAccounts: [
      {
        name: 'الخصوم المتداولة',
        items: [
          { name: 'الموردون (الدائنون)', code: '2101', example: '3,000 من حـ/ المشتريات\n  3,000 إلى حـ/ الموردين\n(شراء بضاعة بالأجل)' },
          { name: 'أوراق الدفع', code: '2102', example: '1,000 من حـ/ الموردين\n  1,000 إلى حـ/ أوراق الدفع\n(تحرير كمبيالة للمورد)' }
        ]
      }
    ]
  },
  {
    id: 3,
    name: 'حقوق الملكية (Equity)',
    type: 'دائن',
    description: 'حصة الملاك في أصول الشركة بعد خصم الالتزامات.',
    subAccounts: [
      {
        name: 'رأس المال والأرباح',
        items: [
          { name: 'رأس المال', code: '3101', example: '100,000 من حـ/ البنك\n  100,000 إلى حـ/ رأس المال\n(بدء النشاط)' },
          { name: 'المسحوبات الشخصية', code: '3102', example: '2,000 من حـ/ المسحوبات الشخصية\n  2,000 إلى حـ/ الصندوق\n(سحب نقدي للمالك)' }
        ]
      }
    ]
  },
  {
    id: 4,
    name: 'الإيرادات (Revenues)',
    type: 'دائن',
    description: 'الدخل الناتج عن النشاط الرئيسي للشركة.',
    subAccounts: [
      {
        name: 'إيرادات النشاط',
        items: [
          { name: 'المبيعات', code: '4101', example: '15,000 من حـ/ البنك\n  15,000 إلى حـ/ المبيعات\n(بيع بضاعة نقداً)' },
          { name: 'إيرادات خدمات', code: '4102', example: '8,000 من حـ/ العملاء\n  8,000 إلى حـ/ إيرادات الخدمات\n(تقديم خدمة بالأجل)' }
        ]
      }
    ]
  },
  {
    id: 5,
    name: 'المصروفات (Expenses)',
    type: 'مدين',
    description: 'التكاليف التي تتحملها الشركة لتحقيق الإيرادات.',
    subAccounts: [
      {
        name: 'مصروفات التشغيل',
        items: [
          { name: 'مصروف الرواتب', code: '5101', example: '6,000 من حـ/ الرواتب\n  6,000 إلى حـ/ البنك\n(سداد رواتب الموظفين)' },
          { name: 'مصروف الإيجار', code: '5102', example: '2,000 من حـ/ الإيجار\n  2,000 إلى حـ/ الصندوق\n(سداد إيجار المعرض)' }
        ]
      }
    ]
  }
];

function ChartOfAccounts() {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (id) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <div className="container py-12 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gradient">دليل الحسابات الشامل</h1>
        <p className="text-xl text-[var(--text-secondary)]">شجرة الحسابات المحاسبية مع أمثلة عملية للقيود اليومية</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {accountsData.map((account) => (
          <div key={account.id} className="glass-panel border border-[var(--border-color)] overflow-hidden">
            <button 
              onClick={() => toggleSection(account.id)}
              className="w-full flex items-center justify-between p-6 bg-[var(--bg-card)] hover:bg-[var(--bg-tertiary)] transition-colors"
            >
              <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold m-0">{account.name}</h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${account.type === 'مدين' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>
                    طبيعة الحساب: {account.type}
                  </span>
                </div>
                <p className="text-[var(--text-secondary)] m-0">{account.description}</p>
              </div>
              {expandedSection === account.id ? <ChevronUp size={28} /> : <ChevronDown size={28} />}
            </button>

            {expandedSection === account.id && (
              <div className="p-6 bg-[var(--bg-card)] border-t border-[var(--border-color)]">
                {account.subAccounts.map((sub, idx) => (
                  <div key={idx} className="mb-8 last:mb-0">
                    <h3 className="text-xl font-bold mb-4 text-[var(--primary-accent)] border-b border-[var(--border-color)] pb-2">{sub.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {sub.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="bg-[var(--bg-tertiary)] p-4 rounded-lg border border-[var(--border-color)]">
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="font-bold text-lg m-0 flex items-center gap-2">
                              <FileText size={18} className="text-[var(--primary-accent)]"/> {item.name}
                            </h4>
                            <span className="bg-[var(--bg-card)] px-2 py-1 rounded text-sm text-[var(--text-muted)] font-mono">رقم: {item.code}</span>
                          </div>
                          <div className="bg-[#1e1e1e] rounded p-3 text-left rtl:text-right" dir="ltr">
                            <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap font-bold" dir="rtl">{item.example}</pre>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChartOfAccounts;
