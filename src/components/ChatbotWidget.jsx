import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquare, X, Send } from 'lucide-react';

function ChatbotWidget() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: isEn ? 'Welcome to Accounting Encyclopedia! I am your smart assistant 🤖. How can I help you today?' : 'مرحباً بك في موسوعة المحاسبة! أنا مساعدك الذكي 🤖. كيف يمكنني مساعدتك اليوم؟', 
      sender: 'bot' 
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userText = input.trim();
    // Add user message
    const newMessages = [...messages, { id: Date.now(), text: userText, sender: 'user' }];
    setMessages(newMessages);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      let botResponse = isEn 
        ? 'I am currently in learning mode. You can explore the Glossary or Journal Entries library to find answers!' 
        : 'عذراً، ما زلت في مرحلة التعلم. لكن يمكنك البحث في "القاموس" أو "مكتبة القيود" عن ما تريد!';
      
      const lower = userText.toLowerCase();
      if (lower.includes('قيد') || lower.includes('قيود') || lower.includes('journal') || lower.includes('entry')) {
        botResponse = isEn 
          ? 'For journal entries, visit the "Journal Entries Library" or check the Financial Accounting category.' 
          : 'لقيود اليومية، أنصحك بزيارة قسم "مكتبة القيود" أو البحث في قسم "المحاسبة المالية" عن المقالات المتعلقة.';
      } else if (lower.includes('إهلاك') || lower.includes('depreciation')) {
        botResponse = isEn 
          ? 'You can calculate depreciation easily using our Asset Depreciation Calculator in the Tools section.' 
          : 'يمكنك حساب الإهلاك باستخدام حاسبة الإهلاك الموجودة في قسم "حاسبات" أعلى الصفحة.';
      } else if (lower.includes('ضريبة') || lower.includes('vat') || lower.includes('tax')) {
        botResponse = isEn 
          ? 'Check our VAT Calculator in the Calculators page to quickly calculate taxes.' 
          : 'يمكنك حساب ضريبة القيمة المضافة من خلال حاسبة الضريبة في صفحة الحاسبات.';
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 inset-inline-end-6 z-50">
      {isOpen ? (
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-2xl w-80 sm:w-96 h-[420px] flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-[var(--primary-accent)] p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <MessageSquare size={20} />
              <span className="font-bold">{isEn ? 'Smart Assistant' : 'المساعد الذكي'}</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-black/20 p-1 rounded-lg transition-colors" aria-label="Close chat">
              <X size={20} />
            </button>
          </div>
          
          {/* Chat Area */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
            {messages.map(msg => (
              <div 
                key={msg.id} 
                className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'bot' 
                    ? 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] self-start rounded-bs-none border border-[var(--border-color)]' 
                    : 'bg-[var(--primary-accent)] text-white self-end rounded-be-none shadow-sm'
                }`}
              >
                <p className="m-0">{msg.text}</p>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-3 bg-[var(--bg-card)] border-t border-[var(--border-color)] flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isEn ? 'Ask a question...' : 'اكتب سؤالك هنا...'} 
              className="flex-1 bg-[var(--bg-dark)] border border-[var(--border-color)] rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[var(--primary-accent)] text-[var(--text-primary)]"
            />
            <button 
              type="submit" 
              className="bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] text-white p-2.5 rounded-full transition-colors flex-shrink-0 shadow-sm"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] text-white p-4 rounded-full shadow-lg hover:scale-105 transition-all flex items-center justify-center shadow-emerald-500/20"
          aria-label="Open chat"
        >
          <MessageSquare size={24} />
        </button>
      )}
    </div>
  );
}

export default ChatbotWidget;
