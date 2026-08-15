import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Search, BookText } from 'lucide-react';
const journalEntriesDB = [
  { id: 1, query: 'شراء بضاعة نقدا', title: 'شراء بضاعة نقداً', entry: 'من حـ/ المشتريات\nإلى حـ/ النقدية (الصندوق)', notes: 'عند شراء بضاعة ودفع قيمتها نقداً، تزيد المشتريات (مدين) وينقص الصندوق (دائن).' },
  { id: 2, query: 'شراء بضاعة بشيك', title: 'شراء بضاعة بشيك', entry: 'من حـ/ المشتريات\nإلى حـ/ البنك', notes: 'الدفع تم عن طريق البنك، لذلك ينقص رصيد البنك.' },
  { id: 3, query: 'شراء بضاعة بالاجل على الحساب', title: 'شراء بضاعة بالأجل', entry: 'من حـ/ المشتريات\nإلى حـ/ الموردين (الدائنون)', notes: 'لم يتم الدفع فوراً، مما ينشئ التزاماً على الشركة لصالح الموردين.' },
  { id: 4, query: 'بيع بضاعة نقدا', title: 'بيع بضاعة نقداً', entry: 'من حـ/ النقدية\nإلى حـ/ المبيعات', notes: 'زيادة في النقدية نتيجة تحقيق إيراد مبيعات.' },
  { id: 5, query: 'بيع بضاعة بالاجل على الحساب', title: 'بيع بضاعة بالأجل', entry: 'من حـ/ العملاء (المدينون)\nإلى حـ/ المبيعات', notes: 'تم تسليم البضاعة ولكن لم يتم تحصيل المبلغ بعد.' },
  { id: 6, query: 'دفع رواتب الموظفين', title: 'دفع الرواتب والأجور', entry: 'من حـ/ مصروف الرواتب والأجور\nإلى حـ/ البنك أو النقدية', notes: 'إثبات مصروف الرواتب وسدادها.' },
  { id: 7, query: 'شراء سيارة اصل معدات', title: 'شراء أصل ثابت (سيارة)', entry: 'من حـ/ الأصول الثابتة (السيارات)\nإلى حـ/ البنك أو الدائنين', notes: 'السيارة تعتبر أصل ثابت وليس مشتريات بضاعة للتجارة.' },
  { id: 8, query: 'ايداع راس المال', title: 'بدء النشاط وإيداع رأس المال', entry: 'من حـ/ البنك أو النقدية\nإلى حـ/ رأس المال', notes: 'إثبات استثمار المالك في الشركة.' },
  { id: 9, query: 'دفع ايجار', title: 'سداد مصروف الإيجار', entry: 'من حـ/ مصروف الإيجار\nإلى حـ/ البنك', notes: 'إثبات مصروف الإيجار.' }
];

function JournalEntries() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  const [searchTerm, setSearchTerm] = useState('');

  const filteredEntries = journalEntriesDB.filter(item => 
    item.query.includes(searchTerm.toLowerCase().replace(/أ|إ|آ/g, 'ا').replace(/ة/g, 'ه')) ||
    item.title.includes(searchTerm)
  );

  return (
    <div className="container py-12 animate-fade-in min-h-[70vh]">
      <div className="text-center mb-12">
        <div className="inline-block p-4 rounded-full bg-gradient mb-4">
          <BookText size={32} color="var(--primary-accent)" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-gradient">{isEn ? 'Journal Entries Library' : 'مكتبة القيود اليومية'}</h1>
        <p className="text-xl text-[var(--text-secondary)]">ابحث عن أي معاملة مالية (مثال: "شراء بضاعة") ليظهر لك القيد المحاسبي الصحيح.</p>
      </div>

      <div className="max-w-2xl mx-auto mb-12 relative">
        <div className="absolute top-1/2 right-4 -translate-y-1/2 text-[var(--text-muted)]">
          <Search size={24} />
        </div>
        <input 
          type="text" 
          placeholder="اكتب المعاملة... (مثال: شراء سيارة بالآجل)" 
          className="w-full bg-[var(--bg-card)] border-2 border-[var(--border-color)] rounded-full py-4 pr-14 pl-6 text-lg focus:outline-none focus:border-[var(--primary-accent)] text-[var(--text-primary)] shadow-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {searchTerm ? (
          filteredEntries.length > 0 ? (
            filteredEntries.map(entry => (
              <div key={entry.id} className="glass-panel p-6 border-l-4 border-[var(--primary-accent)]">
                <h3 className="text-xl font-bold mb-4 text-[var(--text-primary)]">{entry.title}</h3>
                <div className="bg-[#1e1e1e] rounded-lg p-4 mb-4" dir="ltr">
                  <pre className="text-green-400 font-mono text-base font-bold whitespace-pre-wrap text-right" dir="rtl">{entry.entry}</pre>
                </div>
                <p className="text-sm text-[var(--text-muted)] m-0 flex items-start gap-2">
                  <span className="font-bold text-[var(--secondary-accent)]">ملاحظة:</span> {entry.notes}
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 text-center p-12 glass-panel">
              <p className="text-xl text-[var(--text-muted)]">لم يتم العثور على قيود تطابق بحثك. جرب كتابة كلمات أبسط مثل "شراء" أو "بيع".</p>
            </div>
          )
        ) : (
          <div className="col-span-1 md:col-span-2 text-center p-8">
            <p className="text-lg text-[var(--text-muted)]">ابدأ الكتابة في مربع البحث لتظهر النتائج...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default JournalEntries;
