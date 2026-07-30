const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetStart = `    { name: 'BonusEvent', icon: Star, label: '13. Bonus Event Screen' },`;

const replacement = `    { name: 'Niyam', icon: Star, label: '12b. Daily Niyam Screen' },
    { name: 'BonusEvent', icon: Star, label: '13. Bonus Event Screen' },`;

if (content.includes(targetStart)) {
  content = content.replace(targetStart, replacement);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Updated screens array successfully.");
} else {
  console.log("Target screens array not found.");
}
