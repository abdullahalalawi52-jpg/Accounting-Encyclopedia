import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Copy, 
  RefreshCw, 
  Layers, 
  Trophy, 
  HelpCircle,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { useToast } from '../../context/ToastContext.jsx';
import Button from '../ui/Button.jsx';

const SCENARIOS = [
  {
    id: 'vat_sales',
    title_ar: 'بيع بضاعة (نقداً وآجلاً) مع ضريبة 15%',
    title_en: 'Sales with 15% VAT (Cash & Credit)',
    desc_ar: 'بيع بضاعة بقيمة 100,000 ريال + 15,000 ضريبة، تم استلام 50,000 نقداً والباقي آجل.',
    desc_en: 'Sale of $100k + $15k VAT, received $50k in cash and remainder on credit.',
    lines: [
      { id: 1, type: 'debit', account_ar: 'حـ/ الصندوق (النقدية)', account_en: 'Cash on Hand', amount: 50000, category: 'assets' },
      { id: 2, type: 'debit', account_ar: 'حـ/ العملاء (المدينون)', account_en: 'Accounts Receivable', amount: 65000, category: 'assets' },
      { id: 3, type: 'credit', account_ar: 'حـ/ إيراد المبيعات', account_en: 'Sales Revenue', amount: 100000, category: 'revenue' },
      { id: 4, type: 'credit', account_ar: 'حـ/ ضريبة القيمة المضافة المستحقة (مخرجات)', account_en: 'VAT Output Payable', amount: 15000, category: 'liabilities' },
    ]
  },
  {
    id: 'asset_purchase',
    title_ar: 'شراء أصل ثابت بتمويل بنكي ودفعة مقدمة',
    title_en: 'Fixed Asset Acquisition with Loan & Down Payment',
    desc_ar: 'شراء خط إنتاج بقيمة 200,000 ريال، سداد 40,000 من الحساب البنكي، والباقي بقرض طويل الأجل.',
    desc_en: 'Purchase of production line for $200k, $40k cash down payment, and $160k long-term loan.',
    lines: [
      { id: 1, type: 'debit', account_ar: 'حـ/ الآلات والمعدات (أصول ثابتة)', account_en: 'Machinery & Equipment', amount: 200000, category: 'assets' },
      { id: 2, type: 'credit', account_ar: 'حـ/ البنك', account_en: 'Bank Account', amount: 40000, category: 'assets' },
      { id: 3, type: 'credit', account_ar: 'حـ/ قروض طويلة الأجل', account_en: 'Long-term Bank Loans', amount: 160000, category: 'liabilities' },
    ]
  },
  {
    id: 'discount_purchase',
    title_ar: 'شراء بضاعة مع خصم نقدي تعجيل دفع وضريبة',
    title_en: 'Purchase with Cash Discount (2/10, n/30) & VAT',
    desc_ar: 'شراء بضاعة بـ 50,000 ريال + 7,500 ضريبة، وسداد المستحق خلال فترة الخصم النقدي (5% خصم = 2,500 ريال).',
    desc_en: 'Purchases of $50k + $7.5k VAT, settled within discount period with 5% cash discount ($2.5k).',
    lines: [
      { id: 1, type: 'debit', account_ar: 'حـ/ المشتريات (أو المخزون)', account_en: 'Purchases / Inventory', amount: 50000, category: 'expenses' },
      { id: 2, type: 'debit', account_ar: 'حـ/ ضريبة القيمة المضافة المدخلات (أصول متداولة)', account_en: 'VAT Input Tax', amount: 7500, category: 'assets' },
      { id: 3, type: 'credit', account_ar: 'حـ/ الخصم المكتسب (إيراد)', account_en: 'Discount Received (Revenue)', amount: 2500, category: 'revenue' },
      { id: 4, type: 'credit', account_ar: 'حـ/ البنك (الصافي المسدد)', account_en: 'Bank Account', amount: 55000, category: 'assets' },
    ]
  },
  {
    id: 'prepaid_rent',
    title_ar: 'تسوية جردية - إثبات إيجار مدفوع مقدماً واستهلاكه',
    title_en: 'Prepaid Rent Adjusting Entry',
    desc_ar: 'سداد إيجار سنوي 120,000 ريال مقدماً، وفي نهاية الشهر تم إثبات استهلاك شهر واحد (10,000 ريال).',
    desc_en: 'Annual prepaid rent $120k, recognizing one month rent expense adjustment of $10k.',
    lines: [
      { id: 1, type: 'debit', account_ar: 'حـ/ مصروف الإيجار (قائمة الدخل)', account_en: 'Rent Expense', amount: 10000, category: 'expenses' },
      { id: 2, type: 'credit', account_ar: 'حـ/ الإيجار المدفوع مقدماً (أصل متداول)', account_en: 'Prepaid Rent', amount: 10000, category: 'assets' },
    ]
  },
  {
    id: 'payroll',
    title_ar: 'إثبات وصرف الرواتب مع استقطاع التأمينات',
    title_en: 'Payroll Settlement with Deductions',
    desc_ar: 'إجمالي رواتب 80,000 ريال، خصم تأمينات 8,000 ريال، وسداد الصافي 72,000 ريال بشيك.',
    desc_en: 'Gross payroll $80k, social insurance deduction $8k, net payment $72k via bank.',
    lines: [
      { id: 1, type: 'debit', account_ar: 'حـ/ مصروف الرواتب والأجور', account_en: 'Salaries & Wages Expense', amount: 80000, category: 'expenses' },
      { id: 2, type: 'credit', account_ar: 'حـ/ مصلحة التأمينات الاجتماعية (دائنون)', account_en: 'Social Insurance Payable', amount: 8000, category: 'liabilities' },
      { id: 3, type: 'credit', account_ar: 'حـ/ البنك (صافي الرواتب المسددة)', account_en: 'Bank (Net Payroll)', amount: 72000, category: 'assets' },
    ]
  }
];

const CHALLENGES = [
  {
    id: 'ch_1',
    title_ar: 'تحدي: بيع أصل ثابت بربح رأسمالي',
    title_en: 'Challenge: Gain on Disposal of Fixed Asset',
    question_ar: 'باعت المنشأة شاحنة نقل تكلفتها 80,000 ريال ومجمع إهلاكها 50,000 ريال بمبلغ 40,000 ريال نقداً. قم بتركيب القيد المحاسبي المتوازن لإثبات عملية البيع وإقفال مجمع الإهلاك والربح الرأسمالي.',
    question_en: 'Company sold a truck (Cost: $80k, Acc. Dep: $50k) for $40k cash. Formulate the journal entry recognizing cash, closing accumulated depreciation, removing asset cost, and recording gain on disposal.',
    correctDebit: 90000,
    correctCredit: 90000,
    solution_lines: [
      { type: 'debit', account_ar: 'حـ/ الصندوق أو البنك (ثمن البيع)', amount: 40000 },
      { type: 'debit', account_ar: 'حـ/ مجمع إهلاك الشاحنة (إقفال)', amount: 50000 },
      { type: 'credit', account_ar: 'حـ/ الشاحنات - أصول ثابتة (إقفال التكلفة)', amount: 80000 },
      { type: 'credit', account_ar: 'حـ/ أرباح رأسمالية من بيع أصول (قائمة الدخل)', amount: 10000 },
    ]
  },
  {
    id: 'ch_2',
    title_ar: 'تحدي: زيادة رأس المال بإصدار أسهم بعلاوة إصدار',
    title_en: 'Challenge: Stock Issuance with Share Premium',
    question_ar: 'أصدرت شركة مساهمة 10,000 سهم بقيمة اسمية 10 ريالات للسهم وسعر إصدار 15 ريالاً نقدياً تم إيداعها في الحساب البنكي. قم بتسجيل قيد زيادة رأس المال وعلاوة الإصدار.',
    question_en: 'Issued 10,000 shares (Par: $10, Issue Price: $15) deposited in bank. Record the entry for cash, common stock, and additional paid-in capital.',
    correctDebit: 150000,
    correctCredit: 150000,
    solution_lines: [
      { type: 'debit', account_ar: 'حـ/ البنك', amount: 150000 },
      { type: 'credit', account_ar: 'حـ/ رأس مال الأسهم العادية', amount: 100000 },
      { type: 'credit', account_ar: 'حـ/ علاوة إصدار الأسهم (احتياطي نظامي)', amount: 50000 },
    ]
  }
];

const COMMON_ACCOUNTS = [
  { ar: 'حـ/ النقدية بالصندوق', en: 'Cash on Hand', category: 'assets', nature: 'debit' },
  { ar: 'حـ/ البنك', en: 'Bank Account', category: 'assets', nature: 'debit' },
  { ar: 'حـ/ العملاء (المدينون)', en: 'Accounts Receivable', category: 'assets', nature: 'debit' },
  { ar: 'حـ/ المخزون السلعي', en: 'Merchandise Inventory', category: 'assets', nature: 'debit' },
  { ar: 'حـ/ الأصول الثابتة', en: 'Fixed Assets', category: 'assets', nature: 'debit' },
  { ar: 'حـ/ مجمع الإهلاك (أصل مقابل)', en: 'Accumulated Depreciation', category: 'assets', nature: 'credit' },
  { ar: 'حـ/ الإيجار المدفوع مقدماً', en: 'Prepaid Rent', category: 'assets', nature: 'debit' },
  { ar: 'حـ/ الموردين (الدائنون)', en: 'Accounts Payable', category: 'liabilities', nature: 'credit' },
  { ar: 'حـ/ قروض بنكية', en: 'Bank Loans Payable', category: 'liabilities', nature: 'credit' },
  { ar: 'حـ/ ضريبة القيمة المضافة', en: 'VAT Payable / Receivable', category: 'liabilities', nature: 'credit' },
  { ar: 'حـ/ رأس المال', en: 'Owner Capital', category: 'equity', nature: 'credit' },
  { ar: 'حـ/ علاوة الإصدار', en: 'Share Premium', category: 'equity', nature: 'credit' },
  { ar: 'حـ/ إيراد المبيعات', en: 'Sales Revenue', category: 'revenue', nature: 'credit' },
  { ar: 'حـ/ أرباح بيع أصول', en: 'Gain on Sale of Assets', category: 'revenue', nature: 'credit' },
  { ar: 'حـ/ الخصم المكتسب', en: 'Discount Received', category: 'revenue', nature: 'credit' },
  { ar: 'حـ/ المشتريات', en: 'Purchases', category: 'expenses', nature: 'debit' },
  { ar: 'حـ/ مصروف الرواتب والأجور', en: 'Salaries & Wages Expense', category: 'expenses', nature: 'debit' },
  { ar: 'حـ/ مصروف الإيجار', en: 'Rent Expense', category: 'expenses', nature: 'debit' },
  { ar: 'حـ/ مصروف الاستهلاك', en: 'Depreciation Expense', category: 'expenses', nature: 'debit' },
];

export function JournalSimulator({ isEn = false }) {
  const { addToast } = useToast();
  
  const [activeMode, setActiveMode] = useState('free'); // 'free' | 'challenge'
  const [currentChallenge, setCurrentChallenge] = useState(CHALLENGES[0]);
  const [showChallengeSolution, setShowChallengeSolution] = useState(false);

  const [lines, setLines] = useState([
    { id: 1, type: 'debit', account_ar: 'حـ/ النقدية بالصندوق', account_en: 'Cash on Hand', amount: 10000, category: 'assets' },
    { id: 2, type: 'credit', account_ar: 'حـ/ رأس المال', account_en: 'Owner Capital', amount: 10000, category: 'equity' },
  ]);

  const [transactionDesc, setTransactionDesc] = useState('');

  // Calculations
  const { totalDebit, totalCredit, difference, isBalanced } = useMemo(() => {
    let debitSum = 0;
    let creditSum = 0;

    lines.forEach(l => {
      const val = parseFloat(l.amount) || 0;
      if (l.type === 'debit') debitSum += val;
      else creditSum += val;
    });

    const diff = Math.abs(debitSum - creditSum);
    const balanced = diff < 0.001 && debitSum > 0;

    return {
      totalDebit: parseFloat(debitSum.toFixed(2)),
      totalCredit: parseFloat(creditSum.toFixed(2)),
      difference: parseFloat(diff.toFixed(2)),
      isBalanced: balanced,
    };
  }, [lines]);

  const addLine = (type = 'debit') => {
    const defaultAcc = type === 'debit' ? COMMON_ACCOUNTS[0] : COMMON_ACCOUNTS[7];
    setLines(prev => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        type,
        account_ar: defaultAcc.ar,
        account_en: defaultAcc.en,
        amount: '',
        category: defaultAcc.category,
      }
    ]);
  };

  const removeLine = (id) => {
    if (lines.length <= 2) {
      addToast(isEn ? 'Journal entry requires at least 2 lines' : 'يجب أن يحتوي القيد على سطرين على الأقل', 'error');
      return;
    }
    setLines(prev => prev.filter(l => l.id !== id));
  };

  const updateLine = (id, field, value) => {
    setLines(prev => prev.map(l => {
      if (l.id !== id) return l;
      return { ...l, [field]: value };
    }));
  };

  const loadScenario = (scenario) => {
    setLines(scenario.lines);
    setTransactionDesc(isEn ? scenario.desc_en : scenario.desc_ar);
    addToast(isEn ? `Loaded scenario: ${scenario.title_en}` : `تم تحميل السيناريو: ${scenario.title_ar}`);
  };

  const copyEntry = () => {
    let text = isEn ? '=== JOURNAL ENTRY ===\n' : '=== قيد اليومية المحاسبي ===\n';
    if (transactionDesc) text += `${isEn ? 'Description' : 'البيان'}: ${transactionDesc}\n\n`;

    lines.filter(l => l.type === 'debit').forEach(l => {
      text += `${isEn ? 'Dr.' : 'من حـ/'} ${isEn ? l.account_en : l.account_ar}    ${l.amount}\n`;
    });

    lines.filter(l => l.type === 'credit').forEach(l => {
      text += `    ${isEn ? 'Cr.' : 'إلى حـ/'} ${isEn ? l.account_en : l.account_ar}    ${l.amount}\n`;
    });

    text += `\n${isEn ? 'Total Debit' : 'إجمالي المدين'}: ${totalDebit} | ${isEn ? 'Total Credit' : 'إجمالي الدائن'}: ${totalCredit}`;

    navigator.clipboard.writeText(text);
    addToast(isEn ? 'Journal entry copied to clipboard!' : 'تم نسخ القيد المحاسبي بنجاح!');
  };

  const handleVerifyChallenge = () => {
    if (!isBalanced) {
      addToast(isEn ? 'Entry is not balanced yet!' : 'القيد غير متوازن حالياً!', 'error');
      return;
    }

    if (totalDebit === currentChallenge.correctDebit) {
      addToast(isEn ? '🎉 Excellent! Correct balanced entry!' : '🎉 إجابة ممتازة وصحيحة 100%!', 'success');
    } else {
      addToast(isEn ? 'Entry is balanced but totals do not match scenario amount.' : 'القيد متوازن لكن المبالغ لا تطابق شروط المسألة تماماً.', 'warning');
    }
  };

  return (
    <div className="bg-[var(--bg-card)] rounded-3xl border border-[var(--border-color)] p-6 md:p-8 shadow-xl mb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-color)]">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <Layers size={22} />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">
              {isEn ? 'Interactive Journal Entry Simulator' : 'محاكي القيود المحاسبية التفاعلي المتقدم'}
            </h2>
          </div>
          <p className="text-sm text-[var(--text-secondary)]">
            {isEn 
              ? 'Build multi-leg compound journal entries, test accounting challenges, and analyze financial impacts in real-time.' 
              : 'قم بتركيب قيود مركبة متعددة الأطراف، خوض تحديات عملية، وتحقق فورياً من توازن القيد وطبيعة الحسابات.'}
          </p>
        </div>

        {/* Mode Switch & Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              activeMode === 'free'
                ? 'bg-emerald-500 text-white border-emerald-500'
                : 'bg-[var(--bg-main)] text-[var(--text-secondary)] border-[var(--border-color)]'
            }`}
            onClick={() => setActiveMode('free')}
          >
            {isEn ? 'Free Simulator' : 'المحاكي الحر'}
          </button>
          <button
            type="button"
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${
              activeMode === 'challenge'
                ? 'bg-amber-500 text-white border-amber-500'
                : 'bg-[var(--bg-main)] text-[var(--text-secondary)] border-[var(--border-color)]'
            }`}
            onClick={() => setActiveMode('challenge')}
          >
            <Trophy size={14} />
            {isEn ? 'Practice Challenges' : 'وضع التحديات'}
          </button>

          <Button variant="outline" size="sm" icon={Copy} onClick={copyEntry} disabled={!isBalanced}>
            {isEn ? 'Copy' : 'نسخ'}
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            icon={RefreshCw} 
            onClick={() => {
              setLines([
                { id: 1, type: 'debit', account_ar: 'حـ/ النقدية بالصندوق', account_en: 'Cash on Hand', amount: '', category: 'assets' },
                { id: 2, type: 'credit', account_ar: 'حـ/ رأس المال', account_en: 'Owner Capital', amount: '', category: 'equity' },
              ]);
              setTransactionDesc('');
              setShowChallengeSolution(false);
            }}
          >
            {isEn ? 'Reset' : 'إعادة ضبط'}
          </Button>
        </div>
      </div>

      {/* Mode Content: Challenge Banner or Ready Scenarios */}
      {activeMode === 'challenge' ? (
        <div className="my-6 p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                <Trophy size={18} />
              </span>
              <h3 className="font-bold text-base text-amber-300 m-0">
                {isEn ? currentChallenge.title_en : currentChallenge.title_ar}
              </h3>
            </div>
            
            <div className="flex items-center gap-2">
              {CHALLENGES.map((ch, idx) => (
                <button
                  key={ch.id}
                  onClick={() => {
                    setCurrentChallenge(ch);
                    setShowChallengeSolution(false);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${
                    currentChallenge.id === ch.id
                      ? 'bg-amber-500 text-white border-amber-500'
                      : 'bg-[var(--bg-main)] text-[var(--text-secondary)] border-[var(--border-color)]'
                  }`}
                >
                  {isEn ? `Challenge #${idx + 1}` : `تحدي #${idx + 1}`}
                </button>
              ))}
            </div>
          </div>

          <p className="text-sm text-[var(--text-primary)] leading-relaxed mb-4">
            {isEn ? currentChallenge.question_en : currentChallenge.question_ar}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" size="sm" onClick={handleVerifyChallenge}>
              {isEn ? '✓ Verify My Entry' : '✓ تحقق من صحة القيد'}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              icon={HelpCircle} 
              onClick={() => setShowChallengeSolution(!showChallengeSolution)}
            >
              {showChallengeSolution ? (isEn ? 'Hide Model Answer' : 'إخفاء الإجابة النموذجية') : (isEn ? 'Show Model Answer' : 'عرض الإجابة النموذجية')}
            </Button>
          </div>

          {showChallengeSolution && (
            <div className="mt-4 p-4 rounded-xl bg-[var(--bg-main)] border border-amber-500/20 text-xs">
              <h4 className="font-bold text-amber-400 mb-2">{isEn ? 'Model Journal Entry:' : 'القيد النموذجي الصحيح:'}</h4>
              <div className="space-y-1 font-mono">
                {currentChallenge.solution_lines.map((sl, i) => (
                  <div key={i} className={sl.type === 'debit' ? 'text-emerald-400' : 'text-sky-400 ps-4'}>
                    {sl.type === 'debit' ? (isEn ? 'Dr. ' : 'من حـ/ ') : (isEn ? 'Cr. ' : 'إلى حـ/ ')}
                    {sl.account_ar} — <strong>{sl.amount.toLocaleString()}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="py-5">
          <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-3">
            {isEn ? '⚡ Load Ready-Made Real-World Scenarios:' : '⚡ تحميل سيناريوهات محاسبية واقعية جاهزة:'}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {SCENARIOS.map(sc => (
              <button
                key={sc.id}
                onClick={() => loadScenario(sc)}
                className="text-start p-3.5 rounded-xl border border-[var(--border-color)] hover:border-emerald-500/60 bg-[var(--bg-main)]/60 hover:bg-emerald-500/5 transition-all text-xs group"
              >
                <div className="font-bold text-[var(--text-primary)] group-hover:text-emerald-400 mb-1 flex items-center justify-between">
                  <span>{isEn ? sc.title_en : sc.title_ar}</span>
                  <Sparkles size={13} className="text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-[var(--text-muted)] line-clamp-1 m-0">{isEn ? sc.desc_en : sc.desc_ar}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Description Field */}
      <div className="mb-6">
        <label className="text-xs font-bold text-[var(--text-secondary)] block mb-2">
          {isEn ? 'Transaction Description / Memo:' : 'شرح المعاملة / البيان المحاسبي:'}
        </label>
        <input
          type="text"
          value={transactionDesc}
          onChange={(e) => setTransactionDesc(e.target.value)}
          placeholder={isEn ? 'e.g. Recording sale of goods to Al-Amal Trading Est.' : 'مثال: إثبات بيع بضاعة نقداً وآجلاً وسداد الضريبة'}
          className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 text-[var(--text-primary)] transition-all"
        />
      </div>

      {/* Lines Table / Cards */}
      <div className="space-y-3 mb-6">
        <div className="hidden md:grid grid-cols-12 gap-3 px-3 text-xs font-bold text-[var(--text-muted)]">
          <div className="col-span-2">{isEn ? 'Side' : 'الطرف'}</div>
          <div className="col-span-6">{isEn ? 'Account Title' : 'اسم الحساب المحاسبي'}</div>
          <div className="col-span-3">{isEn ? 'Amount (SAR / $)' : 'المبلغ'}</div>
          <div className="col-span-1 text-center">{isEn ? 'Action' : 'حذف'}</div>
        </div>

        {lines.map((line, idx) => {
          const isDebit = line.type === 'debit';

          return (
            <div
              key={line.id}
              className={`grid grid-cols-1 md:grid-cols-12 gap-3 p-3.5 rounded-2xl border transition-all items-center ${
                isDebit 
                  ? 'bg-emerald-500/5 border-emerald-500/20' 
                  : 'bg-sky-500/5 border-sky-500/20'
              }`}
            >
              {/* Type Switcher */}
              <div className="col-span-1 md:col-span-2 flex items-center gap-2">
                <span className="text-xs text-[var(--text-muted)] font-mono">#{idx + 1}</span>
                <select
                  value={line.type}
                  onChange={(e) => updateLine(line.id, 'type', e.target.value)}
                  className={`w-full text-xs font-bold py-1.5 px-2.5 rounded-lg border focus:outline-none cursor-pointer ${
                    isDebit 
                      ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30' 
                      : 'bg-sky-500/10 text-sky-500 border-sky-500/30'
                  }`}
                >
                  <option value="debit">{isEn ? 'Debit (Dr.)' : 'مدين (من حـ/)'}</option>
                  <option value="credit">{isEn ? 'Credit (Cr.)' : 'دائن (إلى حـ/)'}</option>
                </select>
              </div>

              {/* Account Selection / Input */}
              <div className="col-span-1 md:col-span-6">
                <input
                  type="text"
                  value={isEn ? line.account_en : line.account_ar}
                  onChange={(e) => updateLine(line.id, isEn ? 'account_en' : 'account_ar', e.target.value)}
                  placeholder={isEn ? 'Type or select account...' : 'اسم الحساب المحاسبي...'}
                  list={`accounts-list-${line.id}`}
                  className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] rounded-xl px-3.5 py-2 text-sm font-semibold text-[var(--text-primary)] focus:outline-none focus:border-emerald-500"
                />
                <datalist id={`accounts-list-${line.id}`}>
                  {COMMON_ACCOUNTS.map((acc, i) => (
                    <option key={i} value={isEn ? acc.en : acc.ar} />
                  ))}
                </datalist>
              </div>

              {/* Amount */}
              <div className="col-span-1 md:col-span-3">
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={line.amount}
                  onChange={(e) => updateLine(line.id, 'amount', e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] rounded-xl px-3.5 py-2 text-sm font-mono font-bold text-end text-[var(--text-primary)] focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Delete Button */}
              <div className="col-span-1 text-center flex justify-end md:justify-center">
                <button
                  type="button"
                  onClick={() => removeLine(line.id)}
                  className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-colors"
                  title={isEn ? 'Delete row' : 'حذف السطر'}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Row Buttons */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <Button variant="secondary" size="sm" icon={Plus} onClick={() => addLine('debit')}>
          {isEn ? '+ Add Debit Leg (Dr.)' : '+ إضافة طرف مدين (من حـ/)'}
        </Button>
        <Button variant="secondary" size="sm" icon={Plus} onClick={() => addLine('credit')}>
          {isEn ? '+ Add Credit Leg (Cr.)' : '+ إضافة طرف دائن (إلى حـ/)'}
        </Button>
      </div>

      {/* Balance Verification Banner */}
      <div className={`p-5 rounded-2xl border transition-all mb-8 ${
        isBalanced 
          ? 'bg-emerald-500/10 border-emerald-500/30' 
          : 'bg-rose-500/10 border-rose-500/30'
      }`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {isBalanced ? (
              <CheckCircle2 size={28} className="text-emerald-400 shrink-0 animate-bounce" />
            ) : (
              <AlertTriangle size={28} className="text-rose-400 shrink-0" />
            )}
            <div>
              <h3 className={`font-bold text-base sm:text-lg ${isBalanced ? 'text-emerald-300' : 'text-rose-300'}`}>
                {isBalanced 
                  ? (isEn ? 'Entry is Perfectly Balanced (Debits = Credits)' : 'القيد متوازن تماماً ومطابق لمعادلة الميزانية!') 
                  : (isEn ? `Entry is Imbalanced (Difference: ${difference.toLocaleString()})` : `القيد غير متوازن (الفرق: ${difference.toLocaleString()})`)}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] m-0">
                {isBalanced
                  ? (isEn ? 'Ready for posting to general ledger.' : 'القيد جاهز ومؤهل للترحيل إلى دفتر الأستاذ العام.')
                  : (isEn ? 'Debits and credits must be equal before recording.' : 'يجب أن يتساوى مجموع الطرف المدين مع مجموع الطرف الدائن.')}
              </p>
            </div>
          </div>

          {/* Totals Summary */}
          <div className="flex items-center gap-6 font-mono text-sm">
            <div className="text-center">
              <span className="text-xs text-[var(--text-muted)] block">{isEn ? 'Total Debit' : 'مجموع المدين'}</span>
              <span className="text-lg font-bold text-emerald-400">{totalDebit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="text-center">
              <span className="text-xs text-[var(--text-muted)] block">{isEn ? 'Total Credit' : 'مجموع الدائن'}</span>
              <span className="text-lg font-bold text-sky-400">{totalCredit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Accounting Guidance Card */}
      <div className="p-5 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs leading-relaxed">
        <h4 className="font-bold text-sm text-[var(--text-primary)] mb-2 flex items-center gap-2">
          <BookOpen size={16} className="text-emerald-400" />
          {isEn ? 'Accounting Rules & Nature of Accounts:' : 'قواعد القيد المزدوج وطبيعة الحسابات:'}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[var(--text-secondary)]">
          <div>
            <span className="font-bold text-emerald-400 block mb-1">
              {isEn ? '1. Fundamental Accounting Equation:' : '1. معادلة الميزانية الأساسية:'}
            </span>
            {isEn 
              ? 'Assets = Liabilities + Equity + (Revenues - Expenses). Every debit must have a matching credit.' 
              : 'الأصول = الخصوم + حقوق الملكية + (الإيرادات - المصروفات). كل حركة مدينة يجب أن يقابلها حركة دائنة مساوية لها.'}
          </div>
          <div>
            <span className="font-bold text-sky-400 block mb-1">
              {isEn ? '2. Nature & Movements (مدين ودائن):' : '2. طبيعة وحركات الحسابات:'}
            </span>
            {isEn 
              ? 'Assets & Expenses: Debit increases (+), Credit decreases (-). Liabilities, Equity & Revenues: Credit increases (+), Debit decreases (-).' 
              : 'الأصول والمصروفات: طبيعتها مدينة (تزيد بالمدين وتنقص بالدائن). الخصوم وحقوق الملكية والإيرادات: طبيعتها دائنة (تزيد بالدائن وتنقص بالمدين).'}
          </div>
        </div>
      </div>
    </div>
  );
}

JournalSimulator.propTypes = {
  isEn: PropTypes.bool,
};

export default JournalSimulator;

