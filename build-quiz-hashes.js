/**
 * Build script: Convert correctIndex to a hashed answer key
 * so quiz answers aren't plain-readable in the public JSON.
 * 
 * Run: node build-quiz-hashes.js
 */
import { readFileSync, writeFileSync } from 'fs';

const quizzes = JSON.parse(readFileSync('public/data/quizzes.json', 'utf-8'));

// Simple hash: base64 encode "articleId:questionIndex:correctIndex"
// This isn't crypto-grade, but prevents casual inspection of answers
function hashAnswer(articleId, questionIndex, correctIndex) {
  const raw = `${articleId}:${questionIndex}:${correctIndex}`;
  return btoa(raw);
}

const result = {};

for (const [articleId, questions] of Object.entries(quizzes)) {
  result[articleId] = questions.map((q, qIndex) => ({
    question: q.question,
    options: q.options,
    answerHash: hashAnswer(articleId, qIndex, q.correctIndex)
  }));
}

writeFileSync('public/data/quizzes.json', JSON.stringify(result, null, 2), 'utf-8');
console.log('✅ Quiz answers hashed successfully.');
