import { useTranslation } from 'react-i18next';
import { BookOpen, Users, Target, ShieldCheck } from 'lucide-react';

function About() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  return (
    <div className="about-page animate-fade-in" style={{ padding: '4rem 0' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <div className="text-center mb-12">
          <div className="inline-block p-4 rounded-full bg-gradient mb-6">
            <BookOpen size={48} color="var(--primary-accent)" />
          </div>
          <h1 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>عن الموسوعة</h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>
            المرجع العربي الأول الموثوق لتبسيط علوم المحاسبة والمالية وجعلها في متناول الجميع.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '3rem', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--primary-accent)' }}>{isEn ? 'Our Vision' : 'رؤيتنا'}</h2>
          <p style={{ fontSize: '1.15rem', lineHeight: '1.8', marginBottom: '1rem' }}>
            نسعى في "موسوعة المحاسبة" لسد الفجوة في المحتوى المالي والمحاسبي باللغة العربية على الإنترنت. نؤمن بأن المعرفة المالية يجب أن تكون متاحة، دقيقة، وسهلة الفهم للطلاب، رواد الأعمال، والمهنيين على حد سواء.
          </p>
          <p style={{ fontSize: '1.15rem', lineHeight: '1.8' }}>
            نطمح لأن نكون المنصة التي يلجأ إليها كل من يبحث عن تفسير لمصطلح، أو فهم لمعيار محاسبي دولي، أو أمثلة عملية توضح تعقيدات الأرقام بأسلوب سلس.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel text-center" style={{ padding: '2rem' }}>
            <Users size={32} color="var(--secondary-accent)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>للجميع</h3>
            <p style={{ color: 'var(--text-muted)' }}>محتوى يناسب المبتدئين والمحترفين.</p>
          </div>
          <div className="glass-panel text-center" style={{ padding: '2rem' }}>
            <Target size={32} color="var(--primary-accent)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>دقة الهدف</h3>
            <p style={{ color: 'var(--text-muted)' }}>معلومات مركزة ومدعومة بأمثلة واقعية.</p>
          </div>
          <div className="glass-panel text-center" style={{ padding: '2rem' }}>
            <ShieldCheck size={32} color="var(--secondary-accent)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>موثوقية</h3>
            <p style={{ color: 'var(--text-muted)' }}>مراجع مبنية على معايير التقارير المالية (IFRS).</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
