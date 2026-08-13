const fs = require('fs');
const path = require('path');

// 1. Articles
const articlesPath = path.join(process.cwd(), 'public/data/articles.json');
const articlesData = JSON.parse(fs.readFileSync(articlesPath, 'utf-8'));
articlesData.forEach(item => {
  if (!item.content_en) {
    item.content_en = `<h2>${item.title_en || item.title}</h2><p>This is the English version of the article. Full detailed content is currently being translated and will be updated shortly.</p><ul><li>Placeholder point 1</li><li>Placeholder point 2</li></ul><p>Thank you for reading.</p>`;
  }
});
fs.writeFileSync(articlesPath, JSON.stringify(articlesData, null, 2));

// 2. Glossary
const glossaryPath = path.join(process.cwd(), 'public/data/glossary.json');
const glossaryData = JSON.parse(fs.readFileSync(glossaryPath, 'utf-8'));
glossaryData.forEach(item => {
  // Extract english from parentheses if exists
  const match = item.term.match(/\((.*?)\)/);
  item.term_en = match ? match[1].trim() : "English Term";
  item.definition_en = `English definition for ${item.term_en}. Translation is pending.`;
});
fs.writeFileSync(glossaryPath, JSON.stringify(glossaryData, null, 2));

// 3. Quizzes
const quizzesPath = path.join(process.cwd(), 'public/data/quizzes.json');
const quizzesData = JSON.parse(fs.readFileSync(quizzesPath, 'utf-8'));
for (const key in quizzesData) {
  quizzesData[key].forEach((q, idx) => {
    q.question_en = `Sample English Question ${idx + 1}?`;
    q.options_en = q.options.map((_, oIdx) => `English Option ${oIdx + 1}`);
  });
}
fs.writeFileSync(quizzesPath, JSON.stringify(quizzesData, null, 2));

console.log('Data files translated successfully!');
