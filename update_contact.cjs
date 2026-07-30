const fs = require('fs');
let content = fs.readFileSync('src/components/TeacherStudentsFlow.tsx', 'utf8');

content = content.replace(
  /<div className="flex justify-between text-xs">\s*<span className="font-bold text-slate-400">Parent:<\/span>\s*<span className="font-medium text-slate-700">\{student\.parentName\}<\/span>\s*<\/div>/,
  '<div className="flex justify-between text-xs">\n                    <span className="font-bold text-slate-400">Parent:</span>\n                    <span className="font-medium text-slate-700">{student.parentName}</span>\n                  </div>\n                  <div className="flex justify-between text-xs">\n                    <span className="font-bold text-slate-400">Contact:</span>\n                    <span className="font-medium text-slate-700">{student.contactNumber}</span>\n                  </div>'
);

fs.writeFileSync('src/components/TeacherStudentsFlow.tsx', content);
