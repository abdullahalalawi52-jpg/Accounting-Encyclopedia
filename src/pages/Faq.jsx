import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './Faq.css';

function Faq() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(0); // First item open by default
  const faqsList = t('faq.list', { returnObjects: true }) || [];

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
          <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{t('faq.title')}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            {t('faq.desc')}
          </p>
        </div>

        <div className="faq-container">
          <div className="faq-section">
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>{t('faq.faq_title')}</h2>
            <div className="faq-list">
              {Array.isArray(faqsList) && faqsList.map((faq, index) => (
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
              <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)', fontSize: '1.5rem' }}>{t('faq.contact_title')}</h2>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label>{t('faq.name')}</label>
                  <input type="text" className="form-control" placeholder={t('faq.name_ph')} />
                </div>
                <div className="form-group">
                  <label>{t('faq.email')}</label>
                  <input type="email" className="form-control" placeholder={t('faq.email_ph')} />
                </div>
                <div className="form-group">
                  <label>{t('faq.subject')}</label>
                  <textarea className="form-control" placeholder={t('faq.subject_ph')}></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-full flex items-center justify-center gap-2">
                  {t('faq.submit')} <Send size={18} />
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
