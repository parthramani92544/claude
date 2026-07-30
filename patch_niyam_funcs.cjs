const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetFunc = `  const handleToggleNiyam = (id: number) => {
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

const replacementFunc = `  const handleToggleNiyam = (dayDate: string, id: number) => {
    setNiyamDays((prev) => 
      prev.map(day => {
        if (day.date === dayDate && !day.locked) {
          return {
            ...day,
            niyams: day.niyams.map(n => 
              n.id === id ? { ...n, done: !n.done } : n
            )
          };
        }
        return day;
      })
    );
  };

  const handleSubmitNiyamDay = (dayDate: string) => {
    setNiyamDays(prev => {
      let pointsDiff = 0;
      const updatedDays = prev.map(day => {
        if (day.date === dayDate && !day.locked) {
          const currentPoints = day.niyams.reduce((sum, n) => n.done ? sum + n.points : sum, 0);
          pointsDiff = currentPoints - day.pointsEarned;
          return { ...day, submitted: true, pointsEarned: currentPoints };
        }
        return day;
      });
      if (pointsDiff !== 0) {
        setStudent(s => ({ ...s, points: s.points + pointsDiff }));
      }
      return updatedDays;
    });
  };`;

if (content.includes(targetFunc)) {
  content = content.replace(targetFunc, replacementFunc);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Updated Niyam functions successfully.");
} else {
  console.log("Target Niyam functions not found.");
}
