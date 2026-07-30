const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const target = `                  // Filter by current logged in teacher
                  const currentTeacherName = currentLoggedInTeacher?.name || "Samani Pragya ji";`;

const replacement = `                  // Level Completion Status
                  const getSyllabusKey = (studentLevel: string): string => {
                    const lvl = studentLevel ? studentLevel.toLowerCase() : '';
                    if (lvl.includes('level 1') || lvl.includes('bal shala')) return "Level 1: Basic Sutras & Stories";
                    if (lvl.includes('level 2') || lvl.includes('kumar shala')) return "Level 2: Jain Geography & Symbols";
                    return "Level 3: Pratikraman & Advanced Vows";
                  };
                  const activeSyllabusKey = getSyllabusKey(student.level);
                  const activeSyllabus = syllabusDataState[activeSyllabusKey] || syllabusDataState["Level 3: Pratikraman & Advanced Vows"];
                  let tcTotalTopics = 0;
                  let tcCompletedTopics = 0;
                  activeSyllabus.chapters.forEach(ch => {
                    ch.topics.forEach(t => {
                      tcTotalTopics++;
                      if (t.status === 'Approved') tcCompletedTopics++;
                    });
                  });
                  const isEligibleForPromotion = tcTotalTopics > 0 && tcCompletedTopics === tcTotalTopics;

                  // Filter by current logged in teacher
                  const currentTeacherName = currentLoggedInTeacher?.name || "Samani Pragya ji";`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync('src/App.tsx', content);
  console.log('Patched Teacher calculation!');
} else {
  console.log('Target not found.');
}
