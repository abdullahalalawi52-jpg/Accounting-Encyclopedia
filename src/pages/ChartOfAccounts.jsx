import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { ChevronDown, ChevronUp, FileText } from 'lucide-react';
function ChartOfAccounts() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  const accountsData = [
    {
      id: 1,
      name: (isEn ? 'Assets' : 'الأصول (Assets)'),
      type: 'مدين',
      description: (isEn ? 'Resources owned by the company with future economic value.' : 'الموارد التي تمتلكها الشركة ولها قيمة اقتصادية مستقبلية.'),
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
      name: (isEn ? 'Liabilities' : 'الخصوم / الالتزامات (Liabilities)'),
      type: 'دائن',
      description: (isEn ? 'Debts and obligations owed by the company to others.' : 'الديون والالتزامات المستحقة على الشركة للغير.'),
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
      name: (isEn ? 'Equity' : 'حقوق الملكية (Equity)'),
      type: 'دائن',
      description: (isEn ? 'Owners share in company assets after deducting liabilities.' : 'حصة الملاك في أصول الشركة بعد خصم الالتزامات.'),
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
      name: (isEn ? 'Revenues' : 'الإيرادات (Revenues)'),
      type: 'دائن',
      description: (isEn ? 'Income generated from the company main activity.' : 'الدخل الناتج عن النشاط الرئيسي للشركة.'),
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
      name: (isEn ? 'Expenses' : 'المصروفات (Expenses)'),
      type: 'مدين',
      description: (isEn ? 'Costs incurred by the company to generate revenues.' : 'التكاليف التي تتحملها الشركة لتحقيق الإيرادات.'),
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

  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (id) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <div className="container py-12 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gradient">{isEn ? 'Comprehensive Chart of Accounts' : 'دليل الحسابات الشامل'}</h1>
        <p className="text-xl text-[var(--text-secondary)]">شجرة الحسابات المحاسبية مع أمثلة عملية للقيود اليومية</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {accountsData.map((account) => (
          <div key={account.id} className="glass-panel border border-[var(--border-color)] rounded-2xl overflow-hidden shadow-sm">
            <button 
              onClick={() => toggleSection(account.id)}
              className="w-full flex items-center justify-between p-6 bg-[var(--bg-card)] hover:bg-[var(--bg-tertiary)]/50 transition-colors"
            >
              <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold m-0">{account.name}</h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    account.type === 'مدين' 
                      ? 'bg-blue-500/15 text-blue-500 border-blue-500/30' 
                      : 'bg-red-500/15 text-red-500 border-red-500/30'
                  }`}>
                    {isEn ? `Account Nature: ${account.type === 'مدين' ? 'Debit' : 'Credit'}` : `طبيعة الحساب: ${account.type}`}
                  </span>
                </div>
                <p className="text-[var(--text-secondary)] text-sm m-0">{account.description}</p>
              </div>
              {expandedSection === account.id ? <ChevronUp size={24} className="text-[var(--primary-accent)]" /> : <ChevronDown size={24} className="text-[var(--text-muted)]" />}
            </button>

            {expandedSection === account.id && (
              <div className="p-6 md:p-8 bg-[var(--bg-card)] border-t border-[var(--border-color)]">
                {account.subAccounts.map((sub, idx) => (
                  <div key={idx} className="mb-8 last:mb-0">
                    <h3 className="text-lg font-bold mb-4 text-[var(--primary-accent)] border-b border-[var(--border-color)] pb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[var(--primary-accent)]"></span>
                      <span>{sub.name}</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {sub.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="bg-[var(--bg-dark)] p-5 rounded-xl border border-[var(--border-color)] flex flex-col justify-between">
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="font-bold text-base m-0 flex items-center gap-2 text-[var(--text-primary)]">
                              <FileText size={17} className="text-[var(--primary-accent)]"/> {item.name}
                            </h4>
                            <span className="bg-[var(--bg-card)] px-2.5 py-1 rounded-lg text-xs text-[var(--text-muted)] font-mono border border-[var(--border-color)]">رقم: {item.code}</span>
                          </div>
                          <div className="bg-[#0b0f19] border border-white/10 rounded-xl p-3.5 text-left rtl:text-right shadow-inner" dir="ltr">
                            <pre className="text-emerald-400 font-mono text-xs md:text-sm whitespace-pre-wrap font-bold m-0" dir="rtl">{item.example}</pre>
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
