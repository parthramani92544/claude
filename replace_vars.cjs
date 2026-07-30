const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const tlcStart = content.indexOf("{/* 24. TEACHER LIVE CLASSES */}");
const tlcdStart = content.indexOf("{/* 25. TEACHER LIVE CLASS DETAILS */}");
const adminStart = content.indexOf("{/* 26. "); // next block if any, or just up to ProfileBatchChange

let tlcBlock = content.substring(tlcStart, tlcdStart);
let tlcdBlock = content.substring(tlcdStart, content.indexOf("{/*", tlcdStart + 10)); // Actually find the next {/*

tlcBlock = tlcBlock.replace(/activeTab/g, "teacherLiveClassesActiveTab");
tlcBlock = tlcBlock.replace(/setActiveTab/g, "setTeacherLiveClassesActiveTab");
tlcBlock = tlcBlock.replace(/selectedClass/g, "teacherLiveClassesSelectedClass");
tlcBlock = tlcBlock.replace(/setSelectedClass/g, "setTeacherLiveClassesSelectedClass");
tlcBlock = tlcBlock.replace(/classStatus/g, "teacherLiveClassesClassStatus");
tlcBlock = tlcBlock.replace(/setClassStatus/g, "setTeacherLiveClassesClassStatus");

tlcdBlock = tlcdBlock.replace(/classStatus/g, "teacherLiveClassDetailsStatus");
tlcdBlock = tlcdBlock.replace(/setClassStatus/g, "setTeacherLiveClassDetailsStatus");

content = content.substring(0, tlcStart) + tlcBlock + tlcdBlock + content.substring(tlcdStart + tlcdBlock.length);

fs.writeFileSync('src/App.tsx', content);
