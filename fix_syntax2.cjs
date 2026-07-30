const fs = require('fs');
let lines = fs.readFileSync('src/App.tsx', 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('g-white px-5 py-4 flex items-center gap-3 border-b border-slate-200 sticky top-0 z-20">')) {
    lines[i] = '                        <div className="bg-white px-5 py-4 flex items-center gap-3 border-b border-slate-200 sticky top-0 z-20">';
  }
}

fs.writeFileSync('src/App.tsx', lines.join('\n'));
