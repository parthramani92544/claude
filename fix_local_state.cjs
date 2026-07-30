const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Remove local useState in TeacherLiveClassDetails
content = content.replace(
  /const \[teacherLiveClassDetailsStatus, setTeacherLiveClassDetailsStatus\] = React\.useState.*?\n/,
  ""
);

// Add useEffect in App.tsx right after teacherLiveClassDetailsStatus declaration
content = content.replace(
  /const \[teacherLiveClassDetailsStatus, setTeacherLiveClassDetailsStatus\] = useState<'scheduled' \| 'in-progress' \| 'ended'>\('scheduled'\);/,
  `const [teacherLiveClassDetailsStatus, setTeacherLiveClassDetailsStatus] = useState<'scheduled' | 'in-progress' | 'ended'>('scheduled');
  useEffect(() => {
    if (teacherSelectedLiveClass) {
      setTeacherLiveClassDetailsStatus(teacherSelectedLiveClass.status === 'Completed' ? 'ended' : 'scheduled');
    }
  }, [teacherSelectedLiveClass]);`
);

fs.writeFileSync('src/App.tsx', content);
