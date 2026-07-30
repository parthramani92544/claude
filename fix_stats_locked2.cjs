const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const target1 = `{day.locked && day.label !== 'Yesterday' ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                              <span>{day.locked && day.label !== 'Yesterday' ? 'Locked' : 'Open'}</span>`;

const replacement1 = `{day.locked && day.submitted ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                              <span>{day.locked && day.submitted ? 'Locked' : 'Open'}</span>`;

const target2 = `{currentDay.locked && currentDay.label !== 'Yesterday' && <Lock className="w-3 h-3 text-slate-400" />}`;
const replacement2 = `{currentDay.locked && currentDay.submitted && <Lock className="w-3 h-3 text-slate-400" />}`;

let changed = false;
if (content.includes(target1)) {
  content = content.replace(target1, replacement1);
  changed = true;
}

if (content.includes(target2)) {
  content = content.replace(target2, replacement2);
  changed = true;
}

if (changed) {
  fs.writeFileSync('src/App.tsx', content);
  console.log("Updated Stats locked status.");
} else {
  console.log("Targets not found.");
}
