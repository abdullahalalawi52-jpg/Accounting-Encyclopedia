import { useTranslation } from 'react-i18next';
import { BookOpen, Users, Target, ShieldCheck } from 'lucide-react';

function About() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  return (
    <div className="about-page animate-fade-in" style={{ padding: '4rem 0' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <div className="text-center mb-12">
          <div className="inline-block p-4 rounded-full bg-gradient mb-6">
            <BookOpen size={48} color="var(--primary-accent)" />
          </div>
          <h1 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
            {isEn ? 'About the Encyclopedia' : 'عن الموسوعة'}
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>
            {isEn 
              ? 'The premier trusted reference simplifying accounting and financial sciences, making them accessible to everyone.' 
              : 'المرجع العربي الأول الموثوق لتبسيط علوم المحاسبة والمالية وجعلها في متناول الجميع.'}
          </p>
        </div>

        <div className="glass-panel rounded-2xl border border-[var(--border-color)] overflow-hidden shadow-sm" style={{ padding: '2.5rem', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--primary-accent)' }}>{isEn ? 'Our Vision' : 'رؤيتنا'}</h2>
          <p style={{ fontSize: '1.15rem', lineHeight: '1.8', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
            {isEn 
              ? 'At "Accounting Encyclopedia", we strive to bridge the gap in financial and accounting content online. We believe financial literacy should be accessible, accurate, and easy to understand for students, entrepreneurs, and professionals alike.' 
              : 'نسعى في "موسوعة المحاسبة" لسد الفجوة في المحتوى المالي والمحاسبي باللغة العربية على الإنترنت. نؤمن بأن المعرفة المالية يجب أن تكون متاحة، دقيقة، وسهلة الفهم للطلاب، رواد الأعمال، والمهنيين على حد سواء.'}
          </p>
          <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
            {isEn 
              ? 'We aspire to be the go-to platform for anyone seeking a term definition, understanding an international accounting standard, or practical examples explaining financial intricacies smoothly.' 
              : 'نطمح لأن نكون المنصة التي يلجأ إليها كل من يبحث عن تفسير لمصطلح، أو فهم لمعيار محاسبي دولي، أو أمثلة عملية توضح تعقيدات الأرقام بأسلوب سلس.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel rounded-2xl border border-[var(--border-color)] text-center shadow-sm" style={{ padding: '24px' }}>
            <Users size={32} color="var(--secondary-accent)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>{isEn ? 'For Everyone' : 'للجميع'}</h3>
            <p style={{ color: 'var(--text-muted)' }}>{isEn ? 'Content tailored for beginners and professionals alike.' : 'محتوى يناسب المبتدئين والمحترفين.'}</p>
          </div>
          <div className="glass-panel rounded-2xl border border-[var(--border-color)] text-center shadow-sm" style={{ padding: '24px' }}>
            <Target size={32} color="var(--primary-accent)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>{isEn ? 'Goal Accuracy' : 'دقة الهدف'}</h3>
            <p style={{ color: 'var(--text-muted)' }}>{isEn ? 'Focused information backed by practical real-world examples.' : 'معلومات مركزة ومدعومة بأمثلة واقعية.'}</p>
          </div>
          <div className="glass-panel rounded-2xl border border-[var(--border-color)] text-center shadow-sm" style={{ padding: '24px' }}>
            <ShieldCheck size={32} color="var(--secondary-accent)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>{isEn ? 'Reliability' : 'موثوقية'}</h3>
            <p style={{ color: 'var(--text-muted)' }}>{isEn ? 'References built on International Financial Reporting Standards (IFRS).' : 'مراجع مبنية على معايير التقارير المالية (IFRS).'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
