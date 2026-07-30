const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetStart = `                  {[
                    { id: 'Home', icon: LayoutDashboard, label: 'Home' },
                    { id: 'LiveClassList', icon: Video, label: 'Live' },
                    { id: 'BonusEvent', icon: Star, label: 'Niyam' },
                    { id: 'Syllabus', icon: BookMarked, label: 'Syllabus' },
                  ].map((nav) => {`;

const replacement = `                  {[
                    { id: 'Home', icon: LayoutDashboard, label: 'Home' },
                    { id: 'LiveClassList', icon: Video, label: 'Live' },
                    { id: 'Niyam', icon: Star, label: 'Niyam' },
                    { id: 'Syllabus', icon: BookMarked, label: 'Syllabus' },
                  ].map((nav) => {`;

if (content.includes(targetStart)) {
  content = content.replace(targetStart, replacement);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Updated bottom nav successfully.");
} else {
  console.log("Nav target not found.");
}
