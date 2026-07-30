const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const target1 = `                            <div className="flex items-center gap-1 opacity-80 text-[8px] font-mono">
                              {day.locked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                              <span>{day.locked ? 'Locked' : 'Open'}</span>
                            </div>`;

const replacement1 = `                            <div className="flex items-center gap-1 opacity-80 text-[8px] font-mono">
                              {day.locked && day.label !== 'Yesterday' ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                              <span>{day.locked && day.label !== 'Yesterday' ? 'Locked' : 'Open'}</span>
                            </div>`;

if (content.includes(target1)) {
  content = content.replace(target1, replacement1);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Updated Date Selector locked status.");
} else {
  console.log("Target 1 not found.");
}
