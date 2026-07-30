const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add state variable
if (!content.includes('teacherSelectedLiveClass')) {
  content = content.replace(
    /const \[newTeacherSubject, setNewTeacherSubject\] = useState<string>\(''\);/,
    "const [newTeacherSubject, setNewTeacherSubject] = useState<string>('');\n  const [teacherSelectedLiveClass, setTeacherSelectedLiveClass] = useState<any>(null);"
  );
}

// 2. Update Dashboard "View Details" buttons
content = content.replace(
  /<button onClick=\{\(\) => setActiveScreen\("TeacherLiveClasses"\)\} className="w-full mt-4 py-2 bg-white border border-slate-200 text-slate-600 font-bold text-xs rounded-xl hover:bg-slate-50 transition-colors cursor-pointer active:scale-95">/g,
  `<button onClick={() => { setTeacherSelectedLiveClass({ id: 'c1', name: 'Sutra Pronunciation', level: 'Level 1: Basic Sutras & Stories', batch: 'Batch A - Morning', teacher: currentLoggedInTeacher?.name || 'Teacher', date: new Date().toLocaleDateString(), time: '09:00 AM', duration: '60 min', students: 15, status: 'Completed', subject: 'Navkar Mantra' }); setActiveScreen('TeacherLiveClassDetails'); }} className="w-full mt-4 py-2 bg-white border border-slate-200 text-slate-600 font-bold text-xs rounded-xl hover:bg-slate-50 transition-colors cursor-pointer active:scale-95">`
);

content = content.replace(
  /<button onClick=\{\(\) => setActiveScreen\("TeacherLiveClasses"\)\} className="w-full mt-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition-colors shadow-sm cursor-pointer active:scale-95">/g,
  `<button onClick={() => { setTeacherSelectedLiveClass({ id: 'c2', name: 'Jain Principles', level: 'Level 2: Jain Geography & Symbols', batch: 'Batch B - Afternoon', teacher: currentLoggedInTeacher?.name || 'Teacher', date: new Date().toLocaleDateString(), time: '04:00 PM', duration: '60 min', students: 20, status: 'Upcoming', subject: 'Ahinsa Paramo Dharma' }); setActiveScreen('TeacherLiveClassDetails'); }} className="w-full mt-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition-colors shadow-sm cursor-pointer active:scale-95">`
);

fs.writeFileSync('src/App.tsx', content);
