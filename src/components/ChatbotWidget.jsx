import { useState, useRef, useEffect, memo } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { sanitizeInput } from '../utils/security.js';

function ChatbotWidget() {
  const { i18n } = useTranslation();
  const isEn = i18n.language?.startsWith('en');

  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: isEn ? 'Welcome to Accounting Encyclopedia! I am your AI assistant 🤖. How can I help you today?' : 'مرحباً بك في موسوعة المحاسبة! أنا مساعدك الذكي 🤖. كيف يمكنني مساعدتك اليوم؟', 
      sender: 'bot' 
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const quickQuestions = isEn ? [
    'How to calculate depreciation?',
    'What is IFRS 15 standard?',
    'Payroll Journal Entries',
    'Financial Ratios guide'
  ] : [
    'كيف أحسب قسط الإهلاك؟',
    'ما هو معيار IFRS 15؟',
    'قيود الرواتب والأجور',
    'حساب ضريبة القيمة المضافة'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const sendQuery = (queryText) => {
    const cleanQuery = sanitizeInput(queryText, 250);
    if (!cleanQuery) return;
    
    setMessages(prev => [...prev, { id: Date.now(), text: cleanQuery, sender: 'user' }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = isEn 
        ? 'You can explore our interactive Tools, Glossary, and Articles library for in-depth guidance on this topic!' 
        : 'يمكنك الاستزادة أكثر من خلال أدوات المنصة، القاموس المحاسبي، والمقالات المتخصصة بالأعلى!';
      
      const lower = userText.toLowerCase();
      if (lower.includes('قيد') || lower.includes('قيود') || lower.includes('journal') || lower.includes('entry') || lower.includes('راتب') || lower.includes('payroll')) {
        botResponse = isEn 
          ? 'For journal entries, check out our "Journal Entries Library" or browse Financial Accounting articles.' 
          : 'لقيود اليومية، يمكنك تصفح "مكتبة القيود اليومية" في قائمة الأدوات أو استعراض قسم المحاسبة المالية.';
      } else if (lower.includes('إهلاك') || lower.includes('depreciation') || lower.includes('قسط')) {
        botResponse = isEn 
          ? 'You can calculate asset depreciation instantly using our "Asset Depreciation Calculator" under Tools.' 
          : 'يمكنك حساب قسط الإهلاك بدقة باستخدام "حاسبة إهلاك الأصول" في قسم الحاسبات بالأعلى.';
      } else if (lower.includes('ضريبة') || lower.includes('vat') || lower.includes('tax') || lower.includes('قيمة مضافة')) {
        botResponse = isEn 
          ? 'Use our VAT Calculator in the Tools section to calculate 15% tax and extract amounts seamlessly.' 
          : 'استخدم "حاسبة ضريبة القيمة المضافة" في صفحة الحاسبات لحساب الضريبة (15%) واستخراج المبالغ قبل وبعد الضريبة فورياً.';
      } else if (lower.includes('معيار') || lower.includes('ifrs') || lower.includes('socpa') || lower.includes('standard')) {
        botResponse = isEn 
          ? 'Visit the "Standards" page for an interactive guide on IFRS 9, 15, 16, and SOCPA local frameworks.' 
          : 'تفضل بزيارة صفحة "المعايير والقوانين" لاستعراض معايير المحاسبة الدولية IFRS والمعايير السعودية SOCPA مع أمثلة عملية.';
      }

      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
    }, 600);
  };

  const handleSend = (e) => {
    e.preventDefault();
    sendQuery(input);
  };

  return (
    <div className="fixed bottom-6 z-50" style={{ insetInlineEnd: '1.5rem' }}>
      {isOpen ? (
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-2xl w-80 sm:w-96 h-[460px] flex flex-col overflow-hidden animate-fade-in backdrop-blur-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-[var(--primary-accent)] to-[var(--primary-hover)] p-4 flex justify-between items-center text-white shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Bot size={18} />
              </div>
              <div>
                <div className="flex items-center gap-1.5 leading-tight">
                  <span className="font-bold text-sm">{isEn ? 'Accounting Assistant' : 'المساعد المحاسبي'}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                </div>
                <span className="text-[10px] text-white/80">{isEn ? 'Online • 24/7 Guide' : 'متصل • مرشدك الذكي'}</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1.5 rounded-lg transition-colors" aria-label="Close chat">
              <X size={18} />
            </button>
          </div>
          
          {/* Chat Area */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-[var(--bg-main)]/40">
            {messages.map(msg => (
              <div 
                key={msg.id} 
                className={`max-w-[85%] p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'bot' 
                    ? 'bg-[var(--bg-card)] text-[var(--text-primary)] self-start rounded-bs-none border border-[var(--border-color)] shadow-sm' 
                    : 'bg-[var(--primary-accent)] text-white self-end rounded-be-none shadow-sm'
                }`}
              >
                <p className="m-0 font-medium">{msg.text}</p>
              </div>
            ))}

            {isTyping && (
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-muted)] self-start p-3 rounded-2xl rounded-bs-none shadow-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-accent)] animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-accent)] animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-accent)] animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          <div className="px-3 py-2 bg-[var(--bg-card)] border-t border-[var(--border-color)] flex gap-1.5 overflow-x-auto no-scrollbar" role="group" aria-label={isEn ? "Quick question suggestions" : "اقتراحات أسئلة سريعة"}>
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => sendQuery(q)}
                aria-label={q}
                className="whitespace-nowrap text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-[var(--bg-main)] hover:bg-[var(--primary-accent)]/10 text-[var(--text-secondary)] hover:text-[var(--primary-accent)] border border-[var(--border-color)] transition-all shrink-0"
              >
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
              placeholder={isEn ? 'Ask a question...' : 'اكتب سؤالك هنا...'} 
              className="flex-1 bg-[var(--bg-dark)] border border-[var(--border-color)] rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:border-[var(--primary-accent)] text-[var(--text-primary)]"
            />
            <button 
              type="submit" 
              className="bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] text-white px-3 py-2 rounded-xl transition-all flex items-center justify-center shadow-sm active:scale-95 shrink-0"
              aria-label="Send message"
            >
              <Send size={15} />
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
