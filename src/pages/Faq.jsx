import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { sanitizeInput } from '../utils/security.js';
import './Faq.css';

function Faq() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language?.startsWith('en');
  const [openIndex, setOpenIndex] = useState(0); // First item open by default
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const faqsList = t('faq.list', { returnObjects: true }) || [];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const cleanName = sanitizeInput(formData.name, 100);
    const cleanEmail = sanitizeInput(formData.email, 120);
    const cleanMsg = sanitizeInput(formData.message, 500);

    if (!cleanName || !cleanEmail || !cleanMsg) return;

    // Form processed safely without risk of script injection
    setSubmitted(true);
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
              {submitted ? (
                <div className="p-4 rounded-xl bg-[var(--primary-accent)]/10 border border-[var(--primary-accent)]/30 text-[var(--primary-accent)] text-center animate-fade-in">
                  <p className="font-bold text-base m-0">
                    {isEn ? 'Thank you! Your message has been safely received.' : 'شكراً لك! تم استلام رسالتك بأمان وسنتواصل معك قريباً.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit}>
                  <div className="form-group">
                    <label htmlFor="faq-name">{t('faq.name')}</label>
                    <input 
                      id="faq-name"
                      type="text" 
                      required
                      maxLength={100}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="form-control" 
                      placeholder={t('faq.name_ph')} 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="faq-email">{t('faq.email')}</label>
                    <input 
                      id="faq-email"
                      type="email" 
                      required
                      maxLength={120}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="form-control" 
                      placeholder={t('faq.email_ph')} 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="faq-subject">{t('faq.subject')}</label>
                    <textarea 
                      id="faq-subject"
                      required
                      maxLength={500}
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="form-control" 
                      placeholder={t('faq.subject_ph')}
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary w-full flex items-center justify-center gap-2">
                    <span>{t('faq.submit')}</span> <Send size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Faq;
