const fs = require('fs');
let content = fs.readFileSync('src/components/TeacherStudentsFlow.tsx', 'utf8');

const targetMock = `    {
      id: 'STU003',
      name: 'Rohan Jain',
      initials: 'RJ',
      level: 'Level 2: Jain Geography & Symbols',
      batch: 'Batch B - Afternoon',
      parentName: 'Vikram Jain',
      contactNumber: '+1 (555) 246-8135',
      gathaProgress: '12/15',
      attendancePercentage: '98%',
      status: 'Active',
      academicStatus: 'Outstanding',
      bonusPoints: 210,
      teacher: currentLoggedInTeacher?.name || 'Teacher',
      pendingGathas: []
    }`;

const newMock = `    {
      id: 'STU003',
      name: 'Rohan Jain',
      initials: 'RJ',
      level: 'Level 2: Jain Geography & Symbols',
      batch: 'Batch B - Afternoon',
      parentName: 'Vikram Jain',
      contactNumber: '+1 (555) 246-8135',
      gathaProgress: '12/15',
      attendancePercentage: '98%',
      status: 'Revision Stage',
      academicStatus: 'Outstanding',
      bonusPoints: 210,
      teacher: currentLoggedInTeacher?.name || 'Teacher',
      pendingGathas: []
    },
    {
      id: 'STU004',
      name: 'Kavya Doshi',
      initials: 'KD',
      level: 'Level 3: Pratikraman & Advanced Vows',
      batch: 'Batch C - Evening',
      parentName: 'Priya Doshi',
      contactNumber: '+1 (555) 369-2580',
      gathaProgress: '10/10',
      attendancePercentage: '100%',
      status: 'Awaiting Promotion',
      academicStatus: 'Exceptional',
      bonusPoints: 320,
      teacher: currentLoggedInTeacher?.name || 'Teacher',
      pendingGathas: []
    }`;

content = content.replace(targetMock, newMock);
fs.writeFileSync('src/components/TeacherStudentsFlow.tsx', content);
