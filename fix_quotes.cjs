const fs = require('fs');
let content = fs.readFileSync('src/components/TeacherLiveClassesFlow.tsx', 'utf8');
content = content.replace(/className=\{\\\`/g, 'className={`');
content = content.replace(/\\\`\}/g, '`}');
fs.writeFileSync('src/components/TeacherLiveClassesFlow.tsx', content);
