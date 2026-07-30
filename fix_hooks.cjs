const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add lifted states near teacherSelectedLiveClass
const stateInsert = `
  const [teacherLiveClassesActiveTab, setTeacherLiveClassesActiveTab] = useState<'today' | 'upcoming' | 'previous'>('today');
  const [teacherLiveClassesSelectedClass, setTeacherLiveClassesSelectedClass] = useState<any>(null);
  const [teacherLiveClassesClassStatus, setTeacherLiveClassesClassStatus] = useState<'scheduled' | 'in-progress' | 'ended'>('scheduled');
  const [teacherLiveClassDetailsStatus, setTeacherLiveClassDetailsStatus] = useState<'scheduled' | 'in-progress' | 'ended'>('scheduled');
`;
content = content.replace(
  /const \[teacherSelectedLiveClass, setTeacherSelectedLiveClass\] = useState<any>\(null\);/,
  "const [teacherSelectedLiveClass, setTeacherSelectedLiveClass] = useState<any>(null);" + stateInsert
);

// 2. Remove the local React.useState in TeacherLiveClasses
content = content.replace(
  /const \[activeTab, setActiveTab\] = React\.useState<'today' \| 'upcoming' \| 'previous'>\('today'\);/,
  ""
);
content = content.replace(
  /const \[selectedClass, setSelectedClass\] = React\.useState<any>\(null\);/,
  ""
);
content = content.replace(
  /const \[classStatus, setClassStatus\] = React\.useState\<'scheduled' \| 'in-progress' \| 'ended'\>\('scheduled'\);/g,
  ""
);

// 3. Rename variables in TeacherLiveClasses
// Since we used activeTab, selectedClass, classStatus
// Let's do string replacement for the TeacherLiveClasses block.
// Wait, we also used it in TeacherLiveClassDetails.
