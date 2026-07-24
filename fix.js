const fs = require('fs');
const path = require('path');
function fix(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      fix(full);
    } else if (full.endsWith('.jsx')) {
      let content = fs.readFileSync(full, 'utf8');
      let newContent = content.replace(/\\`/g, '`').replace(/\\\$/g, '$');
      if (content !== newContent) {
        fs.writeFileSync(full, newContent);
        console.log('Fixed', full);
      }
    }
  });
}
fix('src');
