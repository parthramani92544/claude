const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetStart = `  const handleToggleNiyam = (id: number) => {
    setNiyams((prev) =>
      prev.map((n) => {
        if (n.id === id) {
          const updatedDone = !n.done;
          setStudent((s) => ({
            ...s
          }));
          return { ...n, done: updatedDone };
        }
        return n;
      })
    );
  };`;

const replacement = `  const handleToggleNiyam = (id: number) => {
    setNiyams((prev) =>
      prev.map((n) => {
        if (n.id === id) {
          const updatedDone = !n.done;
          setStudent((s) => ({
            ...s,
            points: s.points + (updatedDone ? n.points : -n.points)
          }));
          return { ...n, done: updatedDone };
        }
        return n;
      })
    );
  };`;

if (content.includes(targetStart)) {
  content = content.replace(targetStart, replacement);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Updated handleToggleNiyam successfully.");
} else {
  console.log("Target handleToggleNiyam not found.");
}
