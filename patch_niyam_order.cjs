const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetState = `  const [selectedNiyamDate, setSelectedNiyamDate] = useState(new Date().toISOString().split('T')[0]);
  const [niyamDays, setNiyamDays] = useState([
    {
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      label: '3 Days Ago',
      locked: true,
      submitted: true,
      pointsEarned: 35,
      niyams: [
        { id: 1, title: 'Navkar Mantra (5 times)', category: 'Devotion', points: 10, done: true },
        { id: 2, title: 'Night Pratikraman', category: 'Forgiveness', points: 20, done: true },
        { id: 3, title: 'Avoid eating root vegetables today (Chovihar)', category: 'Dietary', points: 15, done: false },
        { id: 4, title: 'Help parents with a chore', category: 'Seva', points: 5, done: true },
        { id: 5, title: 'Temple Visit', category: 'Devotion', points: 15, done: false }
      ]
    },
    {
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      label: '2 Days Ago',
      locked: true,
      submitted: true,
      pointsEarned: 45,
      niyams: [
        { id: 1, title: 'Navkar Mantra (5 times)', category: 'Devotion', points: 10, done: true },
        { id: 2, title: 'Night Pratikraman', category: 'Forgiveness', points: 20, done: true },
        { id: 3, title: 'Avoid eating root vegetables today (Chovihar)', category: 'Dietary', points: 15, done: true },
        { id: 4, title: 'Help parents with a chore', category: 'Seva', points: 5, done: false },
        { id: 5, title: 'Temple Visit', category: 'Devotion', points: 15, done: false }
      ]
    },
    {
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      label: 'Yesterday',
      locked: true,
      submitted: false,
      pointsEarned: 0,
      niyams: [
        { id: 1, title: 'Navkar Mantra (5 times)', category: 'Devotion', points: 10, done: false },
        { id: 2, title: 'Night Pratikraman', category: 'Forgiveness', points: 20, done: false },
        { id: 3, title: 'Avoid eating root vegetables today (Chovihar)', category: 'Dietary', points: 15, done: false },
        { id: 4, title: 'Help parents with a chore', category: 'Seva', points: 5, done: false },
        { id: 5, title: 'Temple Visit', category: 'Devotion', points: 15, done: false }
      ]
    },
    {
      date: new Date().toISOString().split('T')[0],
      label: 'Today',
      locked: false,
      submitted: false,
      pointsEarned: 0,
      niyams: [
        { id: 1, title: 'Navkar Mantra (5 times)', category: 'Devotion', points: 10, done: false },
        { id: 2, title: 'Night Pratikraman', category: 'Forgiveness', points: 20, done: false },
        { id: 3, title: 'Avoid eating root vegetables today (Chovihar)', category: 'Dietary', points: 15, done: false },
        { id: 4, title: 'Help parents with a chore', category: 'Seva', points: 5, done: false },
        { id: 5, title: 'Temple Visit', category: 'Devotion', points: 15, done: false }
      ]
    }
  ]);`;

const replacementState = `  const [selectedNiyamDate, setSelectedNiyamDate] = useState(new Date().toISOString().split('T')[0]);
  const [niyamDays, setNiyamDays] = useState([
    {
      date: new Date().toISOString().split('T')[0],
      label: 'Today',
      locked: false,
      submitted: false,
      pointsEarned: 0,
      niyams: [
        { id: 1, title: 'Navkar Mantra (5 times)', category: 'Devotion', points: 10, done: false },
        { id: 2, title: 'Night Pratikraman', category: 'Forgiveness', points: 20, done: false },
        { id: 3, title: 'Avoid eating root vegetables today (Chovihar)', category: 'Dietary', points: 15, done: false },
        { id: 4, title: 'Help parents with a chore', category: 'Seva', points: 5, done: false },
        { id: 5, title: 'Temple Visit', category: 'Devotion', points: 15, done: false }
      ]
    },
    {
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      label: 'Yesterday',
      locked: true,
      submitted: false,
      pointsEarned: 0,
      niyams: [
        { id: 1, title: 'Navkar Mantra (5 times)', category: 'Devotion', points: 10, done: false },
        { id: 2, title: 'Night Pratikraman', category: 'Forgiveness', points: 20, done: false },
        { id: 3, title: 'Avoid eating root vegetables today (Chovihar)', category: 'Dietary', points: 15, done: false },
        { id: 4, title: 'Help parents with a chore', category: 'Seva', points: 5, done: false },
        { id: 5, title: 'Temple Visit', category: 'Devotion', points: 15, done: false }
      ]
    },
    {
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      label: '2 Days Ago',
      locked: true,
      submitted: true,
      pointsEarned: 45,
      niyams: [
        { id: 1, title: 'Navkar Mantra (5 times)', category: 'Devotion', points: 10, done: true },
        { id: 2, title: 'Night Pratikraman', category: 'Forgiveness', points: 20, done: true },
        { id: 3, title: 'Avoid eating root vegetables today (Chovihar)', category: 'Dietary', points: 15, done: true },
        { id: 4, title: 'Help parents with a chore', category: 'Seva', points: 5, done: false },
        { id: 5, title: 'Temple Visit', category: 'Devotion', points: 15, done: false }
      ]
    },
    {
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      label: '3 Days Ago',
      locked: true,
      submitted: true,
      pointsEarned: 35,
      niyams: [
        { id: 1, title: 'Navkar Mantra (5 times)', category: 'Devotion', points: 10, done: true },
        { id: 2, title: 'Night Pratikraman', category: 'Forgiveness', points: 20, done: true },
        { id: 3, title: 'Avoid eating root vegetables today (Chovihar)', category: 'Dietary', points: 15, done: false },
        { id: 4, title: 'Help parents with a chore', category: 'Seva', points: 5, done: true },
        { id: 5, title: 'Temple Visit', category: 'Devotion', points: 15, done: false }
      ]
    }
  ]);`;

if (content.includes(targetState)) {
  content = content.replace(targetState, replacementState);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Updated Niyam states successfully.");
} else {
  console.log("Target Niyam states not found.");
}
