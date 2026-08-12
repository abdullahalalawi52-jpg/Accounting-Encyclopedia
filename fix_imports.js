const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const fixImports = (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      fixImports(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (!content.includes('from \'react\'') && !content.includes('from "react"')) {
        const hooks = [];
        if (content.includes('useState(')) hooks.push('useState');
        if (content.includes('useEffect(')) hooks.push('useEffect');
        if (content.includes('useContext(')) hooks.push('useContext');
        if (content.includes('useRef(')) hooks.push('useRef');
        if (content.includes('createContext(')) hooks.push('createContext');
        
        if (hooks.length > 0) {
          content = 'import { ' + hooks.join(', ') + ' } from "react";\n' + content;
          fs.writeFileSync(fullPath, content);
        }
      }
    }
  }
};

fixImports(srcDir);
