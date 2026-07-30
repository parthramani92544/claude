const fs = require('fs');
let content = fs.readFileSync('src/components/TeacherStudentsFlow.tsx', 'utf8');
content = content.replace(
  "const statuses = ['All', 'Active', 'Inactive'];",
  "const statuses = ['All', 'Active', 'Revision Stage', 'Awaiting Promotion', 'Inactive'];"
);
fs.writeFileSync('src/components/TeacherStudentsFlow.tsx', content);
