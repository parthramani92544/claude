const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const target = `    ...initialStudent,
    batch: "Saturdays, 05:30 PM",
    attendance: 91, // Start at 91% so they can earn 94% on June 30th!
    quizHistory: [`;

const replacement = `    ...initialStudent,
    batch: "Batch A - Weekend",
    teacher: "Rajvi Shah",
    classTiming: "Saturdays, 05:30 PM",
    batchChangesRemaining: 5,
    lastBatchChangeMonth: new Date().toISOString().slice(0, 7),
    attendance: 91, // Start at 91% so they can earn 94% on June 30th!
    quizHistory: [`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Updated student initial state");
} else {
  console.log("Could not find target in App.tsx");
}
