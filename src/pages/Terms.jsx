import { FileText } from 'lucide-react';

function Terms() {
  return (
    <div className="terms-page animate-fade-in" style={{ padding: '4rem 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="text-center mb-10">
          <FileText size={48} color="var(--primary-accent)" style={{ margin: '0 auto 1rem' }} />
          <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>شروط الاستخدام</h1>
        </div>

        <div className="glass-panel" style={{ padding: '3rem' }}>
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary-accent)' }}>1. قبول الشروط</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              باستخدامك لموقع "موسوعة المحاسبة"، فإنك توافق على الالتزام بشروط الاستخدام الموضحة أدناه. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام الموقع.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary-accent)' }}>2. حقوق الملكية الفكرية</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              جميع المحتويات المنشورة على هذا الموقع من نصوص، صور، وجداول هي ملك لموقع "موسوعة المحاسبة". يُسمح بالاقتباس للأغراض التعليمية بشرط الإشارة إلى المصدر، ولا يُسمح بالنقل الكامل للمقالات لأغراض تجارية دون إذن مسبق.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary-accent)' }}>3. إخلاء المسؤولية</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              المعلومات الواردة في الموقع تهدف إلى الأغراض التعليمية والتثقيفية فقط. لا تعتبر بديلاً عن الاستشارات المالية، القانونية، أو المحاسبية الاحترافية. نحن لا نتحمل المسؤولية عن أي قرارات مالية تتخذ بناءً على المحتوى المقدم.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Terms;
