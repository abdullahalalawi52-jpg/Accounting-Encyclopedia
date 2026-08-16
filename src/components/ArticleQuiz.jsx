import { useState, memo } from 'react';
import PropTypes from 'prop-types';

function ArticleQuiz({ quizData, t, isEn }) {
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
      setSelectedAnswers((prev) => ({ ...prev, [qIndex]: oIndex }));
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
    <div className="glass-panel p-6 mt-8 rounded-2xl border border-[var(--primary-accent)]/40 shadow-sm">
      <h3 className="text-xl font-bold text-[var(--primary-accent)] mb-6 flex items-center gap-2">
        <span>{t('article_page.quiz_title', 'اختبر معلوماتك 📝')}</span>
      </h3>
      
      {quizData.map((q, qIndex) => (
        <div key={qIndex} className="mb-6">
          <p className="font-bold text-[var(--text-primary)] mb-3">
            {qIndex + 1}. {isEn && q.question_en ? q.question_en : q.question}
          </p>
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
                    textAlign: isEn ? 'left' : 'right',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: `1px solid ${isSelected ? 'var(--primary-accent)' : 'var(--border-color)'}`,
                    background: bg,
                    color: 'var(--text-primary)',
                    cursor: submitted ? 'default' : 'pointer',
                    transition: 'all 0.2s',
                  }}
                  className="font-medium hover:border-[var(--primary-accent)]/60"
                >
                  {isEn && q.options_en ? q.options_en[oIndex] : option}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {!submitted ? (
        <button 
          onClick={handleSubmit} 
          className="btn btn-primary w-full py-3 rounded-xl font-bold mt-2" 
          disabled={Object.keys(selectedAnswers).length < quizData.length}
        >
          {t('article_page.submit_answers', 'إرسال الإجابات')}
        </button>
      ) : (
        <div className="text-center p-5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] mt-6">
          <h4 className="text-lg font-bold text-[var(--text-primary)] mb-1">
            {t('article_page.score', { score, total: quizData.length, defaultValue: `نتيجتك: ${score} من ${quizData.length}` })}
          </h4>
          <p className="text-sm text-[var(--text-secondary)] m-0">
            {score === quizData.length 
              ? t('article_page.score_perfect', 'ممتاز! لقد فهمت الدرس جيداً 👏') 
              : t('article_page.score_good', 'يمكنك مراجعة المقال مرة أخرى لمحاولة أفضل.')}
          </p>
        </div>
      )}
    </div>
  );
}

ArticleQuiz.propTypes = {
  quizData: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      question_en: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.string).isRequired,
      options_en: PropTypes.arrayOf(PropTypes.string),
      answerHash: PropTypes.string.isRequired,
    })
  ).isRequired,
  t: PropTypes.func.isRequired,
  isEn: PropTypes.bool.isRequired,
};

export default memo(ArticleQuiz);
