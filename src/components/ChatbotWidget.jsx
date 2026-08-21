import { useState, useRef, useEffect, memo } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, RefreshCw, Layers, Calculator, BookOpen, CheckCircle, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { sanitizeInput } from '../utils/security.js';
import { processQueryWithMAS } from '../services/agents/supervisorOrchestrator.js';

function formatBotResponse(text) {
  // Split lines and render cleanly
  return text.split('\n').map((line, idx) => {
    if (!line.trim()) return <div key={idx} className="h-1.5" />;
    
    // Debit journal line highlight
    if (line.startsWith('من حـ/') || line.startsWith('Dr.')) {
      return (
        <div key={idx} className="font-mono text-xs font-bold text-emerald-400 py-0.5 ps-1 border-s-2 border-emerald-500 my-0.5 bg-emerald-500/10 rounded-e">
          {line}
        </div>
      );
    }
    // Credit journal line highlight
    if (line.startsWith('إلى حـ/') || line.startsWith('Cr.') || line.includes('إلى حـ/')) {
      return (
        <div key={idx} className="font-mono text-xs font-bold text-sky-400 py-0.5 ps-3 border-s-2 border-sky-500 my-0.5 bg-sky-500/10 rounded-e">
          {line}
        </div>
      );
    }
    // Header / Bullet lines
    if (line.startsWith('•') || line.startsWith('-') || line.startsWith('*')) {
      return (
        <div key={idx} className="flex items-start gap-1.5 my-1">
          <span className="text-emerald-400 shrink-0 mt-0.5">▪</span>
          <span className="text-[var(--text-secondary)]">{line.replace(/^[•\-*]\s*/, '')}</span>
        </div>
      );
    }

    return <p key={idx} className="m-0 leading-relaxed text-[var(--text-primary)]">{line}</p>;
  });
}

function ChatbotWidget() {
  const { i18n } = useTranslation();
  const isEn = i18n.language?.startsWith('en');

  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: isEn 
        ? 'Welcome to Accounting Encyclopedia! I am your AI accounting assistant 🤖. Ask me about journal entries, IFRS standards, VAT & Zakat, financial ratios, or valuation problems!' 
        : 'مرحباً بك في موسوعة المحاسبة والمالية! أنا مساعدك الذكي 🤖. اسألني عن قيود اليومية، معايير IFRS، الزكاة والضريبة، النسب المالية، أو أي مسألة محاسبية وسأجيبك فوراً!', 
      sender: 'bot' 
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const quickQuestions = isEn ? [
    'How to record asset purchase with loan?',
    'Explain IFRS 16 lease standard',
    'Corporate Zakat formula (ZATCA)',
    'Straight-line depreciation formula',
    'Payroll journal entry breakdown'
  ] : [
    'كيف أسجل قيد شراء أصل بقرض؟',
    'شرح معيار عقود الإيجار IFRS 16',
    'حساب وعاء الزكاة للشركات',
    'طريقة حساب قسط الإهلاك',
    'قيد إثبات وصرف الرواتب'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const generateAIResponse = (query) => {
    const q = query.toLowerCase();

    // 1. Journal entries / القيود اليومية
    if (q.includes('شراء أصل') || (q.includes('asset') && (q.includes('buy') || q.includes('purchase')))) {
      return isEn 
        ? `Here is the journal entry for acquiring a fixed asset with down payment and loan:\n\nDr. Machinery & Equipment (Fixed Assets)\nCr. Bank Account (Down Payment)\nCr. Long-term Bank Loans (Payable)\n\n• Impact: Increases non-current assets and records corresponding financial liabilities.`
        : `إليك القيد المحاسبي لإثبات شراء أصل ثابت بدفعة مقدمة وقرض تمويلي:\n\nمن حـ/ الآلات والمعدات (أصول ثابتة) [إجمالي التكلفة]\nإلى حـ/ البنك (الدفعة المسددة نقداً)\nإلى حـ/ قروض بنكية طويلة الأجل (الالتزام المتبقي)\n\n• الأثر المالي: زيادة في الأصول غير المتداولة يقابلها نقص في النقدية وزيادة في الالتزامات طويلة الأجل.`;
    }

    if (q.includes('راتب') || q.includes('رواتب') || q.includes('payroll') || q.includes('salary') || q.includes('أجور')) {
      return isEn
        ? `Here is the standard Payroll journal entry under labor laws:\n\nDr. Salaries and Wages Expense (Gross)\nCr. Social Insurance Payable (GOSI/Deductions)\nCr. Bank Account (Net Payroll Transferred)\n\n• Check out our "Templates" section to download the full WPS Salary Sheet Excel template!`
        : `إليك قيد إثبات وصرف الرواتب والأجور المتوافق مع نظام العمل وحماية الأجور:\n\nمن حـ/ مصروف الرواتب والأجور (إجمالي الاستحقاق)\nإلى حـ/ مصلحة التأمينات الاجتماعية (استقطاع 9.75% / 10%)\nإلى حـ/ البنك (صافي الرواتب المحولة للموظفين)\n\n• نصيحة: يمكنك تحميل نموذج مسير الرواتب الكامل بصيغة Excel من صفحة "النماذج والقوالب" بالأعلى!`;
    }

    if (q.includes('بيع') || q.includes('sales') || q.includes('مبيعات')) {
      return isEn
        ? `Standard sales journal entry with 15% VAT:\n\nDr. Cash or Accounts Receivable (Gross Total)\nCr. Sales Revenue (Net Price)\nCr. VAT Output Payable (15% Tax)\n\n• Tip: Use our interactive Journal Simulator to test custom multi-leg sales scenarios!`
        : `إليك قيد المبيعات المعتمد مع ضريبة القيمة المضافة 15%:\n\nمن حـ/ الصندوق أو العملاء (إجمالي المبلغ شامل الضريبة)\nإلى حـ/ إيراد المبيعات (المبلغ الصافي غير شامل الضريبة)\nإلى حـ/ ضريبة القيمة المضافة المستحقة - مخرجات (15%)\n\n• يمكنك تجربة تركيب وتعديل القيد فورياً عبر "محاكي القيود المحاسبية"!`;
    }

    // 2. Zakat & Tax / الزكاة والضريبة
    if (q.includes('زكاة') || q.includes('zakat') || q.includes('zatca') || q.includes('وعاء')) {
      return isEn
        ? `Corporate Zakat Calculation (ZATCA Sources of Funds Method):\n\n• Zakat Base = (Paid-up Capital + Retained Earnings + Provisions + Long-term Debt) - (Net Fixed Assets + Long-term Investments) + Adjusted Net Profit.\n• Rate: 2.5% for Hijri year, or 2.577% for Gregorian fiscal year.\n\n• You can use our newly added "Zakat Calculator" under Tools for automated computation!`
        : `طريقة حساب وعاء زكاة الشركات المعتمدة لدى هيئة الزكاة والضريبة والجمارك (ZATCA):\n\n• وعاء الزكاة = (رأس المال + الأرباح المدورة + المخصصات + القروض طويلة الأجل) - (صافي الأصول الثابتة + الاستثمارات طويلة الأجل) + صافي الربح المعدل.\n• النسبة الشرعية: 2.5% للحول الهجري أو 2.577% للسنة المالية الميلادية.\n\n• يمكنك حساب وعاء وزكاة شركتك أو أموالك بدقة عبر "حاسبة الزكاة الشرعية" المتاحة في صفحة الحاسبات!`;
    }

    if (q.includes('ضريبة') || q.includes('vat') || q.includes('tax') || q.includes('مضافة')) {
      return isEn
        ? `Value Added Tax (VAT) Guide:\n\n• Standard Rate: 15% (Saudi Arabia)\n• Net Base Calculation: Gross Amount / 1.15\n• Tax Amount: Base Amount * 0.15\n• Net VAT Due = Output VAT (Sales) - Input VAT (Purchases).\n\n• Try our VAT Calculator under Tools for instant amount extraction.`
        : `دليل ضريبة القيمة المضافة (VAT 15%):\n\n• النسبة الأساسية: 15%\n• استخراج المبلغ قبل الضريبة: المبلغ الإجمالي ÷ 1.15\n• قيمة الضريبة: المبلغ الصافي × 15%\n• الضريبة الواجبة السداد للهيئة = ضريبة المخرجات (المبيعات) - ضريبة المدخلات (المشتريات).\n\n• استخدم "حاسبة ضريبة القيمة المضافة" في قسم الأدوات لاستخراج المبالغ فوراً.`;
    }

    // 3. IFRS & Accounting Standards / المعايير المحاسبية
    if (q.includes('16') || q.includes('إيجار') || q.includes('lease')) {
      return isEn
        ? `IFRS 16 (Leases) Summary:\n\n• Eliminates operating lease off-balance-sheet treatment for lessees.\n• Lessees must recognize a "Right-of-Use (ROU) Asset" and a corresponding "Lease Liability" measured at present value of lease payments.\n• Expense profile: Depreciation of ROU asset + Interest on lease liability instead of straight rent expense.`
        : `ملخص المعيار الدولي للتقرير المالي IFRS 16 (عقود الإيجار):\n\n• ألغى المعيار التصنيف القديم للإيجار التشغيلي خارج الميزانية للمستأجر.\n• يلزم المستأجر بإثبات "أصل حق استخدام (ROU Asset)" في جانب الأصول مقابل "التزام عقد إيجار (Lease Liability)" في جانب الخصوم بالقيمة الحالية للدفعات.\n• يترتب عليه إثبات قسط إهلاك للأصل ومصروف فائدة تمويلية بدلاً من مصروف الإيجار المباشر.`;
    }

    if (q.includes('15') || q.includes('إيراد') || q.includes('revenue')) {
      return isEn
        ? `IFRS 15 (Revenue from Contracts with Customers) 5-Step Model:\n\n1. Identify the contract with customer.\n2. Identify distinct performance obligations.\n3. Determine transaction price.\n4. Allocate transaction price to performance obligations.\n5. Recognize revenue when (or as) obligations are satisfied.`
        : `نموذج الخطوات الخمس للاعتراف بالإيراد وفق معيار IFRS 15:\n\n1. تحديد العقد المبرم مع العميل.\n2. تحديد التزامات الأداء المنفصلة في العقد.\n3. تحديد سعر المعاملة الإجمالي.\n4. تخصيص وتوزيع سعر المعاملة على التزامات الأداء.\n5. الاعتراف بالإيراد عند (أو مع) الوفاء بالتزام الأداء.`;
    }

    if (q.includes('9') || q.includes('مخصص') || q.includes('خسائر') || q.includes('ecl')) {
      return isEn
        ? `IFRS 9 (Financial Instruments) Highlights:\n\n• Introduces the Expected Credit Loss (ECL) forward-looking model for provisioning bad debts instead of incurred loss model.\n• Classifies financial assets into: Amortized Cost, FVOCI, and FVTPL.`
        : `أبرز متطلبات معيار IFRS 9 (الأدوات المالية):\n\n• استبدال نموذج الخسائر المحققة بنموذج "الخسائر الائتمانية المتوقعة (ECL)" الاستباقي لتكوين مخصصات الديون المشكوك في تحصيلها.\n• تصنيف الأصول المالية إلى: التكلفة المطفأة، القيمة العادلة من خلال الدخل الشامل (FVOCI)، أو من خلال الأرباح والخسائر (FVTPL).`;
    }

    // 4. Financial Calculations / الإهلاك ونقطة التعادل
    if (q.includes('إهلاك') || q.includes('depreciation') || q.includes('قسط')) {
      return isEn
        ? `Straight-Line Depreciation Formula:\n\n• Depreciable Base = Asset Cost - Salvage Value\n• Annual Depreciation = Depreciable Base / Useful Life in Years\n• Monthly Depreciation = Annual Depreciation / 12\n\n• Calculate asset depreciation instantly with our Depreciation Calculator tool!`
        : `طريقة حساب إهلاك الأصول (القسط الثابت):\n\n• الوعاء القابل للإهلاك = تكلفة الأصل التاريخية - القيمة التخريدية (الخردة)\n• قسط الإهلاك السنوي = الوعاء القابل للإهلاك ÷ العمر الإنتاجي بالسنوات\n• قسط الإهلاك الشهري = القسط السنوي ÷ 12\n\n• يمكنك استخدام "حاسبة إهلاك الأصول" في صفحة الأدوات للحصول على جدول زمني تفصيلي!`;
    }

    if (q.includes('تعادل') || q.includes('break') || q.includes('even')) {
      return isEn
        ? `Break-Even Point (BEP) Formula:\n\n• Unit Contribution Margin = Selling Price - Variable Cost per Unit\n• BEP (in Units) = Total Fixed Costs / Unit Contribution Margin\n• BEP (in Revenue) = BEP Units * Selling Price.`
        : `معادلة حساب نقطة التعادل (Break-Even Point):\n\n• هامش المساهمة للوحدة = سعر بيع الوحدة - التكلفة المتغيرة للوحدة\n• نقطة التعادل بالوحدات = التكاليف الثابتة الإجمالية ÷ هامش المساهمة للوحدة\n• نقطة التعادل بالريال = عدد وحدات التعادل × سعر بيع الوحدة.`;
    }

    // Default intelligent guidance response
    return isEn
      ? `Thank you for your question! You can explore our dedicated sections:\n\n• "Calculators": Zakat, VAT, Depreciation, Break-even, NPV & Loans.\n• "Journal Simulator": Interactive double-entry simulator with challenges.\n• "Templates": 12+ downloadable Excel, Word, and PDF models.\n• "Standards": Deep dive into IFRS & SOCPA frameworks.`
      : `سؤال محاسبي مميز! يمكنك الاستفادة من أقسام المنصة المتخصصة لمزيد من التفاصيل العملية:\n\n• "الحاسبات المالية": حاسبة الزكاة، ضريبة 15%، الإهلاك، نقطة التعادل، والقروض.\n• "محاكي القيود": تجربة تركيب القيود المحاسبية التفاعلية وخوض التحديات.\n• "مكتبة النماذج": تحميل أكثر من 12 نموذج إكسل وورد وPDF جاهز للاستخدام.\n• "المعايير والقوانين": شروحات شاملة لمعايير IFRS والأنظمة المحلية.`;
  };

  const sendQuery = async (queryText) => {
    const cleanQuery = sanitizeInput(queryText, 250);
    if (!cleanQuery) return;
    
    setMessages(prev => [...prev, { id: Date.now(), text: cleanQuery, sender: 'user' }]);
    setInput('');
    setIsTyping(true);

    try {
      const masState = await processQueryWithMAS(cleanQuery, i18n.language);
      setIsTyping(false);
      setMessages(prev => [
        ...prev, 
        { 
          id: Date.now() + 1, 
          text: masState.finalResponse, 
          sender: 'bot',
          auditVerdict: masState.auditVerdict,
          routingPlan: masState.routingPlan
        }
      ]);
    } catch {
      setIsTyping(false);
      const fallbackResponse = isEn
        ? '⚠️ System busy. Please check your query or try selecting from the quick topics above.'
        : '⚠️ النظام مشغول حالياً. يرجى تجربة أحد المواضيع السريعة بالأعلى.';
      setMessages(prev => [...prev, { id: Date.now() + 1, text: fallbackResponse, sender: 'bot' }]);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    sendQuery(input);
  };

  const resetChat = () => {
    setMessages([
      { 
        id: Date.now(), 
        text: isEn 
          ? 'Chat reset! How can I assist you with your accounting calculations or journal entries?' 
          : 'تمت إعادة ضبط المحادثة! كيف يمكنني مساعدتك في استفساراتك المحاسبية أو تركيب القيود اليوم؟', 
        sender: 'bot' 
      }
    ]);
  };

  return (
    <div className="fixed bottom-6 z-50" style={{ insetInlineEnd: '1.5rem' }}>
      {isOpen ? (
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl shadow-2xl w-80 sm:w-[420px] h-[520px] flex flex-col overflow-hidden animate-fade-in backdrop-blur-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-[var(--primary-accent)] to-[var(--primary-hover)] p-4 flex justify-between items-center text-white shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-white/20 flex items-center justify-center shadow-inner">
                <Bot size={20} />
              </div>
              <div>
                <div className="flex items-center gap-1.5 leading-tight">
                  <span className="font-bold text-sm">{isEn ? 'AI Accounting Advisor' : 'المساعد المحاسبي الذكي'}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                </div>
                <span className="text-[10px] text-white/80">{isEn ? 'Online • 24/7 Smart Accounting Engine' : 'متصل • محرك الإجابة والقيود الذكي'}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <button 
                type="button"
                onClick={resetChat} 
                className="hover:bg-white/20 p-1.5 rounded-lg transition-colors text-white/90" 
                title={isEn ? 'Reset chat' : 'إعادة ضبط المحادثة'}
              >
                <RefreshCw size={15} />
              </button>
              <button 
                type="button"
                onClick={() => setIsOpen(false)} 
                className="hover:bg-white/20 p-1.5 rounded-lg transition-colors text-white" 
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>
          
          {/* Chat Area */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-[var(--bg-main)]/50">
            {messages.map(msg => (
              <div 
                key={msg.id} 
                className={`max-w-[90%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'bot' 
                    ? 'bg-[var(--bg-card)] text-[var(--text-primary)] self-start rounded-bs-none border border-[var(--border-color)] shadow-sm' 
                    : 'bg-[var(--primary-accent)] text-white self-end rounded-be-none shadow-sm font-medium'
                }`}
              >
                {msg.sender === 'bot' && msg.routingPlan && (
                  <div className="mb-2 pb-1.5 border-b border-[var(--border-color)]/60 flex items-center justify-between gap-1 text-[10px] text-[var(--text-muted)] font-mono">
                    <span className="flex items-center gap-1 text-blue-400">
                      <Bot size={11} />
                      <span>Orchestrator ➔ {msg.routingPlan.length} Workers</span>
                    </span>
                    {msg.auditVerdict?.status === 'APPROVED' && (
                      <span className="flex items-center gap-1 text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                        <ShieldCheck size={11} />
                        <span>QA Approved (100%)</span>
                      </span>
                    )}
                  </div>
                )}
                {msg.sender === 'bot' ? formatBotResponse(msg.text) : <p className="m-0">{msg.text}</p>}
              </div>
            ))}

            {isTyping && (
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-muted)] self-start p-3 rounded-2xl rounded-bs-none shadow-sm flex items-center gap-2">
                <span className="text-xs font-semibold text-emerald-400">{isEn ? 'Analyzing accounting logic...' : 'جاري تحليل القواعد المحاسبية...'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-accent)] animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-accent)] animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-accent)] animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="px-3 py-2 bg-[var(--bg-card)] border-t border-[var(--border-color)] flex gap-1.5 overflow-x-auto no-scrollbar" role="group" aria-label={isEn ? "Quick question suggestions" : "اقتراحات أسئلة سريعة"}>
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => sendQuery(q)}
                aria-label={q}
                className="whitespace-nowrap text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-[var(--bg-main)] hover:bg-[var(--primary-accent)]/10 text-[var(--text-secondary)] hover:text-[var(--primary-accent)] border border-[var(--border-color)] transition-all shrink-0 flex items-center gap-1"
              >
                <Sparkles size={11} className="text-emerald-400" />
                {q}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-3 bg-[var(--bg-card)] border-t border-[var(--border-color)] flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isEn ? 'Ask anything (e.g. journal entries, zakat, IFRS)...' : 'اسأل عن القيود المحاسبية، المعايير، الزكاة، الإهلاك...'} 
              className="flex-1 bg-[var(--bg-dark)] border border-[var(--border-color)] rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:border-[var(--primary-accent)] text-[var(--text-primary)]"
            />
            <button 
              type="submit" 
              className="bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] text-white px-3.5 py-2 rounded-xl transition-all flex items-center justify-center shadow-sm active:scale-95 shrink-0"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="group relative bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center shadow-emerald-500/30 ring-4 ring-emerald-500/20"
          aria-label="Open chat"
        >
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-300 rounded-full border-2 border-slate-900 animate-ping"></span>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-300 rounded-full border-2 border-slate-900"></span>
          <MessageSquare size={24} className="transition-transform group-hover:scale-110" />
        </button>
      )}
    </div>
  );
}

export default memo(ChatbotWidget);

