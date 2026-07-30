const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetStart = `  });
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);`;

const replacement = `  });

  const [niyams, setNiyams] = useState([
    { id: 1, title: 'Morning Navkar Mantra (5 times)', category: 'Devotion', points: 10, done: false },
    { id: 2, title: 'Night Pratikraman', category: 'Forgiveness', points: 20, done: false },
    { id: 3, title: 'Avoid eating root vegetables today (Chovihar)', category: 'Dietary', points: 15, done: false },
    { id: 4, title: 'Help parents with a chore', category: 'Seva', points: 5, done: false }
  ]);

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);`;

if (content.includes(targetStart)) {
  content = content.replace(targetStart, replacement);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Updated niyams state successfully.");
} else {
  console.log("Target state not found.");
}
