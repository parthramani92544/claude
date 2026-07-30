const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const target = `              {/* CONSISTENT BOTTOM NAVIGATION - Active on appropriate screens */}
              {['Home', 'Syllabus', 'LiveClassList', 'LiveClassDetails', 'SutraList', 'SutraDetails', 'AudioLyrics', 'StavanList', 'StavanDetails', 'Niyam', 'BonusEvent', 'GamesHome', 'GamesQuizHub', 'Quiz', 'Profile', 'ProfileReportCard', 'Downloads', 'Notifications', 'Settings', 'Search'].includes(activeScreen) && (`;

const replacement = `              {/* CONSISTENT BOTTOM NAVIGATION - Active on appropriate screens */}
              {['Home', 'Syllabus', 'LiveClassList', 'LiveClassDetails', 'SutraList', 'SutraDetails', 'AudioLyrics', 'StavanList', 'StavanDetails', 'Niyam', 'BonusEvent', 'GamesHome', 'GamesQuizHub', 'Quiz', 'Profile', 'ProfileReportCard', 'ProfileBatchChange', 'Downloads', 'Notifications', 'Settings', 'Search'].includes(activeScreen) && (`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Updated bottom nav");
} else {
  console.log("Could not find bottom nav target.");
}
