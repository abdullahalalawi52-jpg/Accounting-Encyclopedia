import { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: 'مرحباً بك في موسوعة المحاسبة! أنا مساعدك الذكي 🤖. كيف يمكنني مساعدتك اليوم؟', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    const newMessages = [...messages, { id: Date.now(), text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      let botResponse = 'عذراً، ما زلت في مرحلة التعلم. لكن يمكنك البحث في "القاموس" أو "مكتبة القيود" عن ما تريد!';
      if (input.includes('قيد') || input.includes('قيود')) {
        botResponse = 'لقيود اليومية، أنصحك بزيارة قسم "مكتبة القيود" أو البحث في قسم "المحاسبة المالية" عن المقالات المتعلقة.';
      } else if (input.includes('إهلاك')) {
        botResponse = 'يمكنك حساب الإهلاك باستخدام حاسبة الإهلاك الموجودة في قسم "حاسبات" أعلى الصفحة.';
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl shadow-2xl w-80 h-96 flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-[var(--primary-accent)] p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <MessageSquare size={20} />
              <span className="font-bold">المساعد الذكي</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-black/20 p-1 rounded">
              <X size={20} />
            </button>
          </div>
          
          {/* Chat Area */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
            {messages.map(msg => (
              <div key={msg.id} className={`max-w-[80%] p-3 rounded-lg ${msg.sender === 'bot' ? 'bg-[var(--bg-tertiary)] self-start rounded-tr-none' : 'bg-[var(--primary-accent)] text-white self-end rounded-tl-none'}`}>
                <p className="text-sm">{msg.text}</p>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-3 border-t border-[var(--border-color)] flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="اكتب سؤالك هنا..." 
              className="flex-1 bg-transparent border border-[var(--border-color)] rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[var(--primary-accent)] text-[var(--text-primary)]"
            />
            <button type="submit" className="bg-[var(--primary-accent)] text-white p-2 rounded-full hover:opacity-90 flex-shrink-0">
              <Send size={18} />
            </button>
          </form>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-[var(--primary-accent)] text-white p-4 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center justify-center"
        >
          <MessageSquare size={24} />
        </button>
      )}
    </div>
  );
}

export default ChatbotWidget;
