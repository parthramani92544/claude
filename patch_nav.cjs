const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetNavStart = `                  {[
                    { id: 'Home', icon: LayoutDashboard, label: 'Home' },
                    { id: 'Syllabus', icon: BookMarked, label: 'Syllabus' },
                    { id: 'LiveClassList', icon: Video, label: 'Live' },
                    { id: 'SutraList', icon: BookOpenCheck, label: 'Sutra' },
                    { id: 'GamesHome', icon: Gamepad2, label: 'Games' },
                    { id: 'Profile', icon: User, label: 'Profile' },
                  ].map((nav) => {`;

const navReplacement = `                  {[
                    { id: 'Home', icon: LayoutDashboard, label: 'Home' },
                    { id: 'LiveClassList', icon: Video, label: 'Live' },
                    { id: 'BonusEvent', icon: Star, label: 'Niyam' },
                    { id: 'Syllabus', icon: BookMarked, label: 'Syllabus' },
                  ].map((nav) => {`;

if (content.includes(targetNavStart)) {
  content = content.replace(targetNavStart, navReplacement);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Nav replaced");
} else {
  console.log("Not found");
}

