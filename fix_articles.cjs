const fs = require('fs');
const path = require('path');
const p = path.join(process.cwd(), 'public/data/articles.json');
let text = fs.readFileSync(p, 'utf-8');

// Fix the syntax error (double quotes before /images)
text = text.replace(/""\/images\/placeholder\.svg"/g, '"/images/placeholder.svg"');

const data = JSON.parse(text);

const enCategories = {
  'المحاسبة المالية': 'Financial Accounting',
  'المحاسبة الإدارية': 'Managerial Accounting',
  'المراجعة والتدقيق': 'Auditing',
  'المحاسبة الضريبية': 'Tax Accounting',
  'محاسبة التكاليف': 'Cost Accounting',
  'محاسبة الشركات': 'Corporate Accounting',
  'الاتجاهات الحديثة': 'Modern Trends',
  'المعايير الدولية (IFRS)': 'International Standards (IFRS)'
};

const enTitles = {
  1: 'What is a Balance Sheet?',
  2: 'Income Statement Explained',
  3: 'Break-Even Point Analysis',
  4: 'Internal vs External Audit',
  5: 'Value Added Tax (VAT)',
  6: 'Inventory Pricing Methods',
  7: 'Establishing Joint Stock Companies',
  8: 'Journal Entries and Recording',
  9: 'AI in Accounting',
  10: 'Cloud Accounting',
  11: 'Accounting for Cryptocurrencies',
  12: 'ESG Sustainability Reports',
  13: 'Depreciation and its Methods',
  14: 'Income and Corporate Tax',
  15: 'Zakat Guide',
  16: 'Introduction to IFRS',
  17: 'IFRS 15: Revenue from Contracts',
  18: 'IFRS 16: Leases'
};

data.forEach(item => {
  item.categoryName_en = enCategories[item.categoryName] || item.categoryName;
  item.title_en = enTitles[item.id] || item.title;
  item.summary_en = item.summary;
  item.time_en = item.time ? item.time.replace('دقائق قراءة', 'min read') : null;
});

fs.writeFileSync(p, JSON.stringify(data, null, 2));
console.log('Fixed and translated articles.json successfully!');
