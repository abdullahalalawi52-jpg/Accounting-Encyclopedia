import { useTranslation } from 'react-i18next';
import { useState, useMemo } from 'react';
import { Search, BookText, Copy, Layers, Library } from 'lucide-react';
import { useToast } from '../context/ToastContext.jsx';
import JournalSimulator from '../components/accounting/JournalSimulator.jsx';

const JOURNAL_ENTRIES_DB = [
  { 
    id: 1, 
    query: 'شراء بضاعة نقدا purchase goods cash', 
    title: 'شراء بضاعة نقداً',
    title_en: 'Cash Purchase of Merchandise',
    entry: 'من حـ/ المشتريات\n  إلى حـ/ النقدية (الصندوق)',
    entry_en: 'Dr. Merchandise Purchases\n  Cr. Cash on Hand',
    notes: 'عند شراء بضاعة ودفع قيمتها نقداً، تزيد المشتريات (مدين) وينقص الصندوق (دائن).',
    notes_en: 'When goods are purchased and paid for in cash, inventory/purchases increase (Debit) and cash decreases (Credit).'
  },
  { 
    id: 2, 
    query: 'شراء بضاعة بشيك purchase goods check bank', 
    title: 'شراء بضاعة بشيك',
    title_en: 'Purchase of Merchandise by Check',
    entry: 'من حـ/ المشتريات\n  إلى حـ/ البنك',
    entry_en: 'Dr. Merchandise Purchases\n  Cr. Bank Account',
    notes: 'الدفع تم عن طريق البنك، لذلك ينقص رصيد البنك.',
    notes_en: 'Payment was made via bank transfer or check, reducing the bank balance.'
  },
  { 
    id: 3, 
    query: 'شراء بضاعة بالاجل على الحساب credit purchase vendor', 
    title: 'شراء بضاعة بالأجل',
    title_en: 'Purchase of Merchandise on Credit',
    entry: 'من حـ/ المشتريات\n  إلى حـ/ الموردين (الدائنون)',
    entry_en: 'Dr. Merchandise Purchases\n  Cr. Accounts Payable (Vendors)',
    notes: 'لم يتم الدفع فوراً، مما ينشئ التزاماً على الشركة لصالح الموردين.',
    notes_en: 'Payment is deferred, establishing a short-term liability owed to vendors.'
  },
  { 
    id: 4, 
    query: 'بيع بضاعة نقدا cash sales revenue', 
    title: 'بيع بضاعة نقداً',
    title_en: 'Cash Sale of Merchandise',
    entry: 'من حـ/ النقدية\n  إلى حـ/ المبيعات',
    entry_en: 'Dr. Cash on Hand\n  Cr. Sales Revenues',
    notes: 'زيادة في النقدية نتيجة تحقيق إيراد مبيعات.',
    notes_en: 'Cash inflow resulting from recognized sales revenue.'
  },
  { 
    id: 5, 
    query: 'بيع بضاعة بالاجل على الحساب credit sales customer accounts receivable', 
    title: 'بيع بضاعة بالأجل',
    title_en: 'Sale of Merchandise on Credit',
    entry: 'من حـ/ العملاء (المدينون)\n  إلى حـ/ المبيعات',
    entry_en: 'Dr. Accounts Receivable\n  Cr. Sales Revenues',
    notes: 'تم تسليم البضاعة ولكن لم يتم تحصيل المبلغ بعد.',
    notes_en: 'Goods delivered with credit terms, recognizing a customer receivable.'
  },
  { 
    id: 6, 
    query: 'دفع رواتب الموظفين payroll salaries wages', 
    title: 'دفع الرواتب والأجور',
    title_en: 'Payment of Salaries & Payroll',
    entry: 'من حـ/ مصروف الرواتب والأجور\n  إلى حـ/ البنك أو النقدية',
    entry_en: 'Dr. Salaries & Wages Expense\n  Cr. Bank Account',
    notes: 'إثبات مصروف الرواتب وسدادها.',
    notes_en: 'Recognition and settlement of employee compensation expenses.'
  },
  { 
    id: 7, 
    query: 'شراء سيارة اصل معدات purchase fixed asset vehicle car equipment', 
    title: 'شراء أصل ثابت (سيارة)',
    title_en: 'Purchase of Fixed Asset (Vehicle)',
    entry: 'من حـ/ الأصول الثابتة (السيارات)\n  إلى حـ/ البنك أو الدائنين',
    entry_en: 'Dr. Fixed Assets (Vehicles)\n  Cr. Bank Account / Creditors',
    notes: 'السيارة تعتبر أصل ثابت وليس مشتريات بضاعة للتجارة.',
    notes_en: 'Vehicles are long-term capital assets rather than trading inventory.'
  },
  { 
    id: 8, 
    query: 'ايداع راس المال initial capital investment', 
    title: 'بدء النشاط وإيداع رأس المال',
    title_en: 'Initial Capital Injection',
    entry: 'من حـ/ البنك أو النقدية\n  إلى حـ/ رأس المال',
    entry_en: 'Dr. Bank Account\n  Cr. Owner Capital',
    notes: 'إثبات استثمار المالك في الشركة.',
    notes_en: 'Recording initial equity investment into the company.'
  },
  { 
    id: 9, 
    query: 'دفع ايجار rent expense showroom office', 
    title: 'سداد مصروف الإيجار',
    title_en: 'Payment of Rent Expense',
    entry: 'من حـ/ مصروف الإيجار\n  إلى حـ/ البنك أو الصندوق',
    entry_en: 'Dr. Rent Expense\n  Cr. Cash on Hand / Bank Account',
    notes: 'إثبات مصروف الإيجار.',
    notes_en: 'Periodic operating lease or rental expenditure payment.'
  }
];

function JournalEntries() {
  const { i18n } = useTranslation();
  const isEn = i18n.language?.startsWith('en');
  const { addToast } = useToast();

  const [activeView, setActiveView] = useState('simulator'); // 'simulator' or 'library'
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEntries = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const normalized = searchTerm.toLowerCase().replace(/أ|إ|آ/g, 'ا').replace(/ة/g, 'ه');
    return JOURNAL_ENTRIES_DB.filter(item => 
      item.query.toLowerCase().includes(normalized) ||
      item.title.toLowerCase().includes(normalized) ||
      (item.title_en && item.title_en.toLowerCase().includes(normalized))
    );
  }, [searchTerm]);

  const copyEntryText = (entry) => {
    const title = isEn && entry.title_en ? entry.title_en : entry.title;
    const text = isEn && entry.entry_en ? entry.entry_en : entry.entry;
    navigator.clipboard.writeText(`${title}\n${text}`);
    addToast(isEn ? 'Journal entry copied!' : 'تم نسخ القيد بنجاح!');
  };

  return (
    <div className="container py-12 animate-fade-in min-h-[70vh]">
      <div className="text-center mb-10">
        <div className="inline-block p-4 rounded-full bg-gradient mb-4">
          <BookText size={32} color="var(--primary-accent)" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-gradient">
          {isEn ? 'Journal Entries & Simulator' : 'مكتبة ومحاكي القيود اليومية'}
        </h1>
        <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
          {isEn 
            ? 'Build interactive journal entries with instant balance verification, or search hundreds of standard accounting transactions.' 
            : 'قم بتركيب واختبار القيود المحاسبية التفاعلية مع التحقق الفوري من التوازن، أو ابحث في بنك القيود النموذجية.'}
        </p>
      </div>

      {/* View Switcher Tabs */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex p-1.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm">
          <button
            onClick={() => setActiveView('simulator')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeView === 'simulator'
                ? 'bg-[var(--primary-accent)] text-white shadow-md'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Layers size={16} />
            <span>{isEn ? 'Interactive Simulator' : 'المحاكي التفاعلي'}</span>
          </button>
          <button
            onClick={() => setActiveView('library')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeView === 'library'
                ? 'bg-[var(--primary-accent)] text-white shadow-md'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Library size={16} />
            <span>{isEn ? 'Entries Search Bank' : 'بنك القيود الجاهزة'}</span>
          </button>
        </div>
      </div>

      {activeView === 'simulator' ? (
        <JournalSimulator isEn={isEn} />
      ) : (
        <div className="animate-fade-in">
          <div className="max-w-2xl mx-auto mb-12 relative">
            <div className="absolute top-1/2 inset-inline-start-4 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none">
              <Search size={22} />
            </div>
            <input 
              type="text" 
              placeholder={isEn ? 'Type transaction... (e.g. buying car on credit)' : 'اكتب المعاملة... (مثال: شراء سيارة بالآجل)'} 
              className="w-full bg-[var(--bg-card)] border-2 border-[var(--border-color)] rounded-full py-4 ps-14 pe-6 text-base md:text-lg focus:outline-none focus:border-[var(--primary-accent)] text-[var(--text-primary)] shadow-md transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {searchTerm.trim() ? (
              filteredEntries.length > 0 ? (
                filteredEntries.map(entry => (
                  <div key={entry.id} className="glass-panel card-shimmer rounded-2xl border border-[var(--border-color)] border-s-4 border-s-[var(--primary-accent)] p-6 overflow-hidden shadow-sm flex flex-col justify-between hover-lift">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
                          {isEn && entry.title_en ? entry.title_en : entry.title}
                        </h3>
                        <button
                          onClick={() => copyEntryText(entry)}
                          className="p-2 text-slate-400 hover:text-[var(--primary-accent)] hover:bg-[var(--primary-accent)]/10 rounded-xl transition-all"
                          title={isEn ? 'Copy entry' : 'نسخ القيد'}
                        >
                          <Copy size={16} />
                        </button>
                      </div>
                      <div className="bg-[#0A1128] border border-blue-500/20 rounded-xl p-4 mb-4 shadow-inner" dir={isEn ? 'ltr' : 'rtl'}>
                        <pre className="text-sky-400 font-mono text-xs sm:text-sm font-bold whitespace-pre-wrap text-start m-0 leading-relaxed" dir={isEn ? 'ltr' : 'rtl'}>
                          {isEn && entry.entry_en ? entry.entry_en : entry.entry}
                        </pre>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-[var(--text-muted)] m-0 flex items-start gap-2 pt-3 border-t border-[var(--border-color)]/50 leading-relaxed">
                      <span className="font-bold text-[var(--primary-accent)] shrink-0">{isEn ? 'Note:' : 'ملاحظة:'}</span> 
                      <span>{isEn && entry.notes_en ? entry.notes_en : entry.notes}</span>
                    </p>
                  </div>
                ))
              ) : (
                <div className="col-span-1 md:col-span-2 text-center p-12 glass-panel rounded-2xl border border-[var(--border-color)]">
                  <p className="text-lg text-[var(--text-muted)] m-0">
                    {isEn ? 'No journal entries found. Try simpler keywords like "purchase", "sale", or "payroll".' : 'لم يتم العثور على قيود تطابق بحثك. جرب كتابة كلمات أبسط مثل "شراء" أو "بيع" أو "رواتب".'}
                  </p>
                </div>
              )
            ) : (
              <div className="col-span-1 md:col-span-2 text-center p-10 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)]">
                <p className="text-base md:text-lg text-[var(--text-muted)] m-0">
                  {isEn ? 'Start typing in the search box to see matching accounting entries...' : 'ابدأ الكتابة في مربع البحث لتظهر النتائج والقيود المحاسبية...'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default JournalEntries;
