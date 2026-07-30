const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Restore the activeScreen condition for TeacherLiveClassesFlow
content = content.replace(
  /\{\['\]\.includes\(activeScreen\) && \(\s*<TeacherLiveClassesFlow/,
  "{['TeacherLiveClasses', 'TeacherLiveClassDetails'].includes(activeScreen) && (\n                  <TeacherLiveClassesFlow"
);

fs.writeFileSync('src/App.tsx', content);
