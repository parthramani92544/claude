const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  /g-white px-5 py-4 flex items-center gap-3 border-b border-slate-200 sticky top-0 z-20">/,
  `{/* Header */}
                      <div className="bg-white px-5 py-4 flex items-center gap-3 border-b border-slate-200 sticky top-0 z-20">`
);

// I should also fix the rest of tlcdBlock! Since my replacement script only ran on a small chunk of tlcdBlock!
// Let me replace `classStatus` with `teacherLiveClassDetailsStatus` in the rest of the TeacherLiveClassDetails block.

// Find the end of TeacherLiveClassDetails block:
const tlcdStart = content.indexOf("{/* 25. TEACHER LIVE CLASS DETAILS */}");
const nextBlockStart = content.indexOf("{/* 26.", tlcdStart);
let block = content.substring(tlcdStart, nextBlockStart > -1 ? nextBlockStart : content.length);

block = block.replace(/classStatus/g, "teacherLiveClassDetailsStatus");
block = block.replace(/setClassStatus/g, "setTeacherLiveClassDetailsStatus");
block = block.replace(/teacherLiveClassDetailsStatus/g, "teacherLiveClassDetailsStatus"); // prevent double replace if any

content = content.substring(0, tlcdStart) + block + (nextBlockStart > -1 ? content.substring(nextBlockStart) : "");

fs.writeFileSync('src/App.tsx', content);
