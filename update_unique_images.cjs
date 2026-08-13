const fs = require('fs');
const path = require('path');
const p = path.join(process.cwd(), 'public/data/articles.json');
const text = fs.readFileSync(p, 'utf-8');
const data = JSON.parse(text);

data.forEach(item => {
  if (item.id >= 1 && item.id <= 5) {
    item.image = `/images/articles/art${item.id}.png`;
  }
});

fs.writeFileSync(p, JSON.stringify(data, null, 2));
console.log('Unique images assigned to first 5 articles');
