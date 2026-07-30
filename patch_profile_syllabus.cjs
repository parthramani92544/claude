const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetProfileStatus = `<div className="flex flex-col gap-1.5 mt-3 pt-3 border-t border-slate-100">
                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Promotion Status:</span>`;

const replacementProfileStatus = `<div className="flex flex-col gap-1.5 mt-3 pt-3 border-t border-slate-100">
                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Current Syllabus Progress:</span>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-black text-slate-800">
                                {(() => {
                                  const lvl = student.level ? student.level.toLowerCase() : '';
                                  let key = "Level 3: Pratikraman & Advanced Vows";
                                  if (lvl.includes('level 1') || lvl.includes('bal shala')) key = "Level 1: Basic Sutras & Stories";
                                  else if (lvl.includes('level 2') || lvl.includes('kumar shala')) key = "Level 2: Jain Geography & Symbols";
                                  const syllabus = syllabusDataState[key] || syllabusDataState["Level 3: Pratikraman & Advanced Vows"];
                                  let comp = 0, tot = 0;
                                  syllabus.chapters.forEach(ch => ch.topics.forEach(t => { tot++; if (t.status === 'Approved') comp++; }));
                                  const pct = tot > 0 ? Math.round((comp / tot) * 100) : 0;
                                  return \`\${comp} / \${tot} Gathas (\${pct}%)\`;
                                })()}
                              </span>
                            </div>
                            
                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mt-2">Promotion Status:</span>`;

if (content.includes(targetProfileStatus)) {
  content = content.replace(targetProfileStatus, replacementProfileStatus);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Patched Profile Syllabus Progress successfully.");
} else {
  console.log("Could not find target Profile Syllabus Progress.");
}
