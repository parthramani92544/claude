const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add import
if (!content.includes('TeacherStudentsFlow')) {
  content = content.replace(
    /import \{ TeacherLiveClassesFlow \} from '\.\/components\/TeacherLiveClassesFlow';/,
    "import { TeacherLiveClassesFlow } from './components/TeacherLiveClassesFlow';\nimport { TeacherStudentsFlow } from './components/TeacherStudentsFlow';"
  );
}

// 2. Add id for Students in Quick Actions
content = content.replace(
  /\{ label: 'Students', icon: Users \},/,
  "{ label: 'Students', icon: Users, id: 'TeacherStudents' },"
);

// 3. Render TeacherStudentsFlow
const targetStr = "{/* 24 & 25. TEACHER LIVE CLASSES & DETAILS */}";
if (content.includes(targetStr) && !content.includes('TeacherStudentsFlow activeScreen')) {
  content = content.replace(
    targetStr,
    targetStr + "\n                {['TeacherStudents', 'TeacherStudentProfile'].includes(activeScreen) && (\n                  <TeacherStudentsFlow \n                    activeScreen={activeScreen}\n                    setActiveScreen={setActiveScreen}\n                    currentLoggedInTeacher={currentLoggedInTeacher}\n                  />\n                )}"
  );
}

fs.writeFileSync('src/App.tsx', content);
console.log('App.tsx updated successfully.');
