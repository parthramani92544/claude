const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetUI = `                      <div className="space-y-3">
                        {currentDay.niyams.map((niyam) => (
                          <div 
                            key={niyam.id} 
                            onClick={() => {
                              if (!currentDay.locked) {
                                handleToggleNiyam(currentDay.date, niyam.id);
                              }
                            }}
                            className={\`p-4 rounded-[20px] border transition-all flex items-center justify-between \${
                              !currentDay.locked ? 'cursor-pointer active:scale-97' : 'cursor-default'
                            } \${`;

const replacementUI = `                      <div className="space-y-3">
                        {currentDay.niyams.map((niyam) => {
                          const isYesterday = currentDay.date === new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
                          const canEdit = !currentDay.locked || (isYesterday && !niyam.done);
                          return (
                          <div 
                            key={niyam.id} 
                            onClick={() => {
                              if (canEdit) {
                                handleToggleNiyam(currentDay.date, niyam.id);
                              }
                            }}
                            className={\`p-4 rounded-[20px] border transition-all flex items-center justify-between \${
                              canEdit ? 'cursor-pointer active:scale-97' : 'cursor-default opacity-80'
                            } \${`;

if (content.includes(targetUI)) {
  content = content.replace(targetUI, replacementUI);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Updated Niyam UI click successfully.");
} else {
  console.log("Target Niyam UI click not found.");
}
