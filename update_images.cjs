const fs = require('fs');
const path = require('path');
const p = path.join(process.cwd(), 'public/data/articles.json');
const text = fs.readFileSync(p, 'utf-8');
const data = JSON.parse(text);

data.forEach(item => {
  const cat = item.categoryId;
  if (cat === 'financial' || cat === 'cost' || cat === 'corporate' || cat === 'managerial') {
    item.image = '/images/articles/finance.png';
  } else if (cat === 'audit' || cat === 'tax') {
    item.image = '/images/articles/audit.png';
  } else if (cat === 'modern') {
    item.image = '/images/articles/modern.png';
  } else if (cat === 'ifrs' || cat === 'standards') {
    item.image = '/images/articles/standards.png';
  } else {
    item.image = '/images/articles/finance.png'; // default fallback
  }
});

fs.writeFileSync(p, JSON.stringify(data, null, 2));
console.log('Images updated successfully in articles.json');
