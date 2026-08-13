const fs = require('fs');
const path = require('path');

function replaceInFile(filename, replacements) {
  const filePath = path.join(process.cwd(), 'src/pages', filename);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Add useTranslation if not exists
  if (!content.includes('useTranslation')) {
    content = content.replace("import {", "import { useTranslation } from 'react-i18next';\nimport {");
  }

  // Add { t, i18n } hook
  const functionMatch = content.match(/function\s+[A-Za-z0-9_]+\s*\([^)]*\)\s*\{/);
  if (functionMatch && !content.includes('useTranslation()')) {
    content = content.replace(functionMatch[0], `${functionMatch[0]}\n  const { t, i18n } = useTranslation();\n  const isEn = i18n.language.startsWith('en');\n`);
  }

  for (const [ar, en] of replacements) {
    // Escape special regex chars in ar string
    const safeAr = ar.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`>\\s*${safeAr}\\s*<`, 'g');
    content = content.replace(regex, `>{isEn ? '${en}' : '${ar}'}<`);
    
    // Also try quotes for placeholders/titles
    const regex2 = new RegExp(`(['"])${safeAr}(['"])`, 'g');
    content = content.replace(regex2, `{isEn ? '${en}' : '${ar}'}`);
  }

  fs.writeFileSync(filePath, content);
}

// 1. About.jsx
replaceInFile('About.jsx', [
  ['عن موسوعة المحاسبة', 'About Accounting Encyclopedia'],
  ['منصتك الأولى لتعلم المحاسبة باللغة العربية', 'Your first platform to learn accounting'],
  ['من نحن؟', 'Who Are We?'],
  ['موسوعة المحاسبة هي مبادرة تعليمية تهدف إلى إثراء المحتوى العربي في مجالات المحاسبة، المالية، والضرائب.', 'Accounting Encyclopedia is an educational initiative aimed at enriching Arabic content in accounting, finance, and taxes.'],
  ['نسعى لتقديم معلومات دقيقة، مبسطة، وموثوقة لمساعدة الطلاب والمحاسبين ورواد الأعمال على فهم لغة الأعمال.', 'We strive to provide accurate, simplified, and reliable information.'],
  ['رؤيتنا', 'Our Vision'],
  ['أن نكون المرجع العربي الأول والأكثر شمولاً لكل ما يخص المحاسبة والمالية.', 'To be the first and most comprehensive Arabic reference for everything related to accounting.'],
  ['رسالتنا', 'Our Mission'],
  ['تبسيط المفاهيم المعقدة، وتقديم أدوات عملية، ونشر الوعي المالي للمساهمة في بناء مجتمع أعمال واعٍ وناجح.', 'Simplifying complex concepts, providing practical tools, and spreading financial awareness.'],
  ['قيمنا', 'Our Values'],
  ['الدقة، التبسيط، الشمولية، والتعلم المستمر.', 'Accuracy, Simplification, Inclusivity, and Continuous Learning.']
]);

// 2. Bookmarks.jsx
replaceInFile('Bookmarks.jsx', [
  ['المقالات المحفوظة', 'Saved Articles'],
  ['مقالاتك ومراجعك المفضلة في مكان واحد.', 'Your favorite articles and references in one place.'],
  ['جاري تحميل المقالات...', 'Loading articles...'],
  ['لا توجد مقالات محفوظة بعد!', 'No saved articles yet!'],
  ['تصفح المقالات', 'Browse Articles'],
  ['قراءة المقال', 'Read Article']
]);

// 3. NotFound.jsx
replaceInFile('NotFound.jsx', [
  ['الصفحة غير موجودة', 'Page Not Found'],
  ['عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.', 'Sorry, the page you are looking for does not exist or has been moved.'],
  ['العودة للرئيسية', 'Back to Home']
]);

console.log('Static pages refactored successfully!');
