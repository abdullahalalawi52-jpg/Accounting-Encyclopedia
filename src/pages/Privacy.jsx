import { Shield } from 'lucide-react';

function Privacy() {
  return (
    <div className="privacy-page animate-fade-in" style={{ padding: '4rem 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="text-center mb-10">
          <Shield size={48} color="var(--primary-accent)" style={{ margin: '0 auto 1rem' }} />
          <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>سياسة الخصوصية</h1>
          <p style={{ color: 'var(--text-muted)' }}>آخر تحديث: أغسطس 2026</p>
        </div>

        <div className="glass-panel rounded-2xl border border-[var(--border-color)] overflow-hidden shadow-sm" style={{ padding: '2.5rem' }}>
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary-accent)' }}>1. جمع المعلومات</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              نحن في "موسوعة المحاسبة" لا نقوم بجمع أي بيانات شخصية حساسة عن الزوار. يتم فقط جمع البيانات الأساسية مثل البريد الإلكتروني عند الاشتراك في النشرة البريدية، وذلك لغرض إرسال التحديثات والمقالات الجديدة.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary-accent)' }}>2. استخدام المعلومات</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              نستخدم المعلومات التي نجمعها لتحسين تجربة المستخدم، وتطوير المحتوى بما يتناسب مع اهتمامات الزوار. لا نقوم ببيع أو تأجير أو مشاركة بياناتك مع أي أطراف ثالثة لأغراض تجارية.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary-accent)' }}>3. ملفات تعريف الارتباط (Cookies)</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              قد يستخدم الموقع ملفات تعريف الارتباط لتحسين أداء التصفح وفهم كيفية تفاعل المستخدمين مع الصفحات. يمكنك دائماً إيقاف تفعيل هذه الملفات من خلال إعدادات المتصفح الخاص بك.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
