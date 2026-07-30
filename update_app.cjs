const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add import
if (!content.includes('TeacherLiveClassesFlow')) {
  content = content.replace(
    /import \{ motion, AnimatePresence \} from 'motion\/react';/,
    "import { motion, AnimatePresence } from 'motion/react';\nimport { TeacherLiveClassesFlow } from './components/TeacherLiveClassesFlow';"
  );
}

// 2. Replace blocks 24 and 25
const startIdx = content.indexOf('{/* 24. TEACHER LIVE CLASSES */}');
const endIdx = content.indexOf('{/* 4. HOME DASHBOARD (Integrated tab 1) */}');

if (startIdx > -1 && endIdx > startIdx) {
  const replacement = `
                {/* 24 & 25. TEACHER LIVE CLASSES & DETAILS */}
                {['TeacherLiveClasses', 'TeacherLiveClassDetails'].includes(activeScreen) && (
                  <TeacherLiveClassesFlow 
                    activeScreen={activeScreen}
                    setActiveScreen={setActiveScreen}
                    teacherSelectedLiveClass={teacherSelectedLiveClass}
                    setTeacherSelectedLiveClass={setTeacherSelectedLiveClass}
                    currentLoggedInTeacher={currentLoggedInTeacher}
                  />
                )}
                
                `;
  
  content = content.substring(0, startIdx) + replacement + content.substring(endIdx);
  fs.writeFileSync('src/App.tsx', content);
  console.log('App.tsx updated successfully.');
} else {
  console.log('Could not find start/end indices.');
}
