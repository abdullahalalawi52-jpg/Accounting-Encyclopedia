import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Calendar, User, Tag, Bookmark } from 'lucide-react';
import DOMPurify from 'dompurify';
import { useData } from '../hooks/useData.js';
import { useBookmarks } from '../context/BookmarkContext.jsx';
import './Article.css';

function Article() {
  const { id } = useParams();
  
  const { data: articles, loading: loadingArticles } = useData('/data/articles.json');
  const { data: quizzesData } = useData('/data/quizzes.json');
  
  const article = articles?.find(a => String(a.id) === id);
  const articleQuiz = quizzesData ? quizzesData[id] : null;

  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(id);


  if (loadingArticles) {
    return (
      <div className="article-page flex items-center justify-center" style={{ minHeight: '60vh' }}>
        <div className="text-center">
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>جاري تحميل المقال...</h2>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="article-page flex items-center justify-center" style={{ minHeight: '60vh' }}>
        <div className="text-center">
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--primary-accent)' }}>عذراً، المقال غير موجود أو قيد الإعداد!</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>نعمل على إضافة محتوى هذا المقال قريباً.</p>
          <Link to="/categories" className="btn btn-primary">العودة للأقسام</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="article-page animate-fade-in">
      <div className="container">
        <div className="breadcrumb flex items-center gap-2 mb-6">
          <Link to="/">الرئيسية</Link>
          <ChevronRight size={16} />
          <Link to={`/category/${article.categoryId}`}>{article.categoryName}</Link>
          <ChevronRight size={16} />
          <span className="current">{article.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="main-content col-span-1 lg:col-span-2 glass-panel p-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="article-title mb-0">{article.title}</h1>
              <button 
                onClick={() => toggleBookmark(id)} 
                className="btn-icon" 
                style={{ color: bookmarked ? 'var(--primary-accent)' : 'var(--text-muted)' }}
                title={bookmarked ? 'إزالة من المفضلة' : 'حفظ المقال'}
              >
                <Bookmark size={28} fill={bookmarked ? 'currentColor' : 'none'} />
              </button>
            </div>
            
            <div className="article-meta flex items-center gap-6 mb-8">
              <span className="flex items-center gap-2"><User size={16}/> {article.author}</span>
              <span className="flex items-center gap-2"><Calendar size={16}/> {article.date}</span>
              <span className="flex items-center gap-2"><Tag size={16}/> {article.categoryName}</span>
            </div>

            <div 
              className="article-body"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content) }}
            />
            
            {articleQuiz && <ArticleQuiz quizData={articleQuiz} articleId={id} />}
          </div>

          <aside className="sidebar col-span-1">
            <div className="glass-panel p-6 mb-6">
              <h3 className="sidebar-title">مقالات ذات صلة</h3>
              <ul className="related-links">
                {/* Dynamically we could fetch related articles here, but keeping static as before for simplicity */}
                <li><Link to="/article/2">قائمة الدخل ومكوناتها</Link></li>
                <li><Link to="/article/3">تحليل نقطة التعادل</Link></li>
                <li><Link to="/article/4">الفرق بين المراجعة الداخلية والخارجية</Link></li>
              </ul>
            </div>

            <div className="glass-panel p-6 bg-gradient">
              <h3 className="sidebar-title">هل لديك سؤال محاسبي؟</h3>
              <p>اطرح سؤالك في منتدى المحاسبين وسيجيبك الخبراء في أسرع وقت.</p>
              <button className="btn btn-secondary w-full mt-4">اطرح سؤالاً</button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function ArticleQuiz({ quizData, articleId }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState({});

  // Decode the answer hash to get the correct index (only after submit)
  const decodeAnswer = (hash) => {
    try {
      const decoded = atob(hash); // e.g. "1:0:1"
      const parts = decoded.split(':');
      return parseInt(parts[2], 10);
    } catch {
      return -1;
    }
  };

  const handleSelect = (qIndex, oIndex) => {
    if (!submitted) {
      setSelectedAnswers({ ...selectedAnswers, [qIndex]: oIndex });
    }
  };

  const handleSubmit = () => {
    let newScore = 0;
    const answers = {};
    quizData.forEach((q, index) => {
      const correct = decodeAnswer(q.answerHash);
      answers[index] = correct;
      if (selectedAnswers[index] === correct) newScore++;
    });
    setCorrectAnswers(answers);
    setScore(newScore);
    setSubmitted(true);
  };

  return (
    <div className="glass-panel p-6 mt-8" style={{ border: '1px solid var(--primary-accent)' }}>
      <h3 style={{ color: 'var(--primary-accent)', marginBottom: '1.5rem', fontSize: '1.5rem' }}>اختبر معلوماتك 📝</h3>
      
      {quizData.map((q, qIndex) => (
        <div key={qIndex} className="mb-6">
          <p style={{ fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-primary)' }}>{qIndex + 1}. {q.question}</p>
          <div className="flex flex-col gap-2">
            {q.options.map((option, oIndex) => {
              const isSelected = selectedAnswers[qIndex] === oIndex;
              let bg = 'var(--bg-card)';
              if (submitted) {
                if (oIndex === correctAnswers[qIndex]) bg = 'rgba(16, 185, 129, 0.2)'; // Green
                else if (isSelected) bg = 'rgba(239, 68, 68, 0.2)'; // Red
              } else if (isSelected) {
                bg = 'var(--bg-tertiary)';
              }

              return (
                <button
                  key={oIndex}
                  onClick={() => handleSelect(qIndex, oIndex)}
                  style={{
                    textAlign: 'right',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: `1px solid ${isSelected ? 'var(--primary-accent)' : 'var(--border-color)'}`,
                    background: bg,
                    color: 'var(--text-primary)',
                    cursor: submitted ? 'default' : 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {!submitted ? (
        <button onClick={handleSubmit} className="btn btn-primary w-full" disabled={Object.keys(selectedAnswers).length < quizData.length}>إرسال الإجابات</button>
      ) : (
        <div className="text-center p-4 rounded-lg bg-gradient mt-4">
          <h4 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>نتيجتك: {score} من {quizData.length}</h4>
          <p style={{ color: 'var(--text-secondary)' }}>{score === quizData.length ? 'ممتاز! لقد فهمت الدرس جيداً 👏' : 'يمكنك مراجعة المقال مرة أخرى لمحاولة أفضل.'}</p>
        </div>
      )}
    </div>
  );
}

export default Article;
