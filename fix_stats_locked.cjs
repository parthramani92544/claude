const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const target2 = `                          <div className="flex items-center gap-1 justify-end">
                            {currentDay.locked && <Lock className="w-3 h-3 text-slate-400" />}
                            <span className={\`text-[10px] font-bold uppercase tracking-wider \${currentDay.submitted ? 'text-emerald-600' : 'text-amber-600'}\`}>`;

const replacement2 = `                          <div className="flex items-center gap-1 justify-end">
                            {currentDay.locked && currentDay.label !== 'Yesterday' && <Lock className="w-3 h-3 text-slate-400" />}
                            <span className={\`text-[10px] font-bold uppercase tracking-wider \${currentDay.submitted ? 'text-emerald-600' : 'text-amber-600'}\`}>`;

if (content.includes(target2)) {
  content = content.replace(target2, replacement2);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Updated Stats locked status.");
} else {
  console.log("Target 2 not found.");
}
