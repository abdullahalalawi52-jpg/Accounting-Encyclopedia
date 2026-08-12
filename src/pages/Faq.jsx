import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Send } from 'lucide-react';
import './Faq.css';

const faqs = [
  {
    question: 'ما هي موسوعة المحاسبة؟',
    answer: 'موسوعة المحاسبة هي منصة تعليمية عربية مجانية تهدف إلى تبسيط المفاهيم المحاسبية والمالية للطلاب، المحاسبين المبتدئين، ورواد الأعمال.'
  },
  {
    question: 'هل المقالات والدروس مجانية؟',
    answer: 'نعم، جميع المقالات والمصطلحات في الموسوعة متاحة مجاناً بالكامل ولا تتطلب أي اشتراك مدفوع.'
  },
  {
    question: 'كيف يمكنني البدء في تعلم المحاسبة من الصفر؟',
    answer: 'ننصحك بالبدء بقسم "المحاسبة المالية" حيث يحتوي على الأساسيات مثل فهم الميزانية العمومية، قائمة الدخل، والقيود اليومية، ثم الانتقال للأقسام المتقدمة.'
  },
  {
    question: 'هل يمكنني المساهمة في كتابة مقالات؟',
    answer: 'نرحب بجميع الخبراء المحاسبين! يمكنك التواصل معنا عبر النموذج الموجود في هذه الصفحة وسنقوم بالرد عليك لترتيب عملية النشر.'
  },
  {
    question: 'ما هو الفرق بين المحاسبة المالية والإدارية؟',
    answer: 'المحاسبة المالية تهتم بإعداد القوائم المالية للأطراف الخارجية (المستثمرين، البنوك)، بينما المحاسبة الإدارية تركز على توفير تقارير وتحليلات داخلية لمساعدة الإدارة في اتخاذ القرارات.'
  }
];

function Faq() {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="faq-page animate-fade-in">
      <div className="container">
        <div className="faq-header">
          <div className="inline-block p-4 rounded-full bg-gradient mb-4">
            <HelpCircle size={32} color="var(--primary-accent)" />
          </div>
          <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>الأسئلة الشائعة والدعم</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            تجد هنا إجابات على أكثر الأسئلة شيوعاً، أو يمكنك مراسلتنا مباشرة.
          </p>
        </div>

        <div className="faq-container">
          <div className="faq-section">
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>الأسئلة المتكررة</h2>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <button 
                    className="faq-question" 
                    onClick={() => toggleFaq(index)}
                  >
                    {faq.question}
                    {openIndex === index ? 
                      <ChevronUp size={20} className="faq-icon" /> : 
                      <ChevronDown size={20} className="faq-icon" />
                    }
                  </button>
                  <div className={`faq-answer ${openIndex === index ? 'open' : ''}`}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="contact-section">
            <div className="contact-form glass-panel">
              <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)', fontSize: '1.5rem' }}>تواصل معنا</h2>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label>الاسم الكامل</label>
                  <input type="text" className="form-control" placeholder="أدخل اسمك..." />
                </div>
                <div className="form-group">
                  <label>البريد الإلكتروني</label>
                  <input type="email" className="form-control" placeholder="example@mail.com" />
                </div>
                <div className="form-group">
                  <label>موضوع الرسالة أو الاستفسار</label>
                  <textarea className="form-control" placeholder="كيف يمكننا مساعدتك؟"></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-full flex items-center justify-center gap-2">
                  إرسال الرسالة <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Faq;
