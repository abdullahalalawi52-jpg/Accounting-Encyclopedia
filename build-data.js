import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Mock import mechanism for this script
import { articles, quizzes } from './src/data/articles.js';
import { featuredArticles, categoryArticles, categoriesInfo, categories } from './src/data/categories.js';
import { glossaryTerms } from './src/data/glossary.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDataPath = path.join(__dirname, 'public', 'data');

// 1. Process Articles
// Combine data from `articles.js` and `categories.js`
const unifiedArticles = [];

for (const [id, articleData] of Object.entries(articles)) {
  const articleId = parseInt(id, 10);
  
  // Find if it's featured
  const featuredInfo = featuredArticles.find(a => a.id === articleId);
  
  // Find summary from categoryArticles
  let summary = '';
  let categoryId = 'financial'; // default fallback
  
  for (const [catId, catArticles] of Object.entries(categoryArticles)) {
    const found = catArticles.find(a => a.id === articleId);
    if (found) {
      summary = found.summary;
      categoryId = catId;
      break;
    }
  }

  unifiedArticles.push({
    id: articleId,
    title: articleData.title,
    categoryName: articleData.category,
    categoryId: categoryId,
    author: articleData.author,
    date: articleData.date,
    content: articleData.content,
    summary: summary,
    image: featuredInfo ? featuredInfo.image : null,
    time: featuredInfo ? featuredInfo.time : null,
    isFeatured: !!featuredInfo
  });
}

// 2. Process Glossary
const unifiedGlossary = glossaryTerms;

// 3. Process Categories
const unifiedCategories = {
  list: categories.map(c => {
    // We can't serialize Lucide icons easily, so just store their names or omit
    // We'll map icons in the UI component
    return {
      id: c.id,
      title: c.title,
      color: c.color,
      count: c.count
    };
  }),
  info: categoriesInfo
};

// Write to files
fs.writeFileSync(path.join(publicDataPath, 'articles.json'), JSON.stringify(unifiedArticles, null, 2));
fs.writeFileSync(path.join(publicDataPath, 'quizzes.json'), JSON.stringify(quizzes, null, 2));
fs.writeFileSync(path.join(publicDataPath, 'glossary.json'), JSON.stringify(unifiedGlossary, null, 2));
fs.writeFileSync(path.join(publicDataPath, 'categories.json'), JSON.stringify(unifiedCategories, null, 2));

console.log('Data successfully extracted to public/data/');
