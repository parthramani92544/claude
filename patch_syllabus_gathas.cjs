const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const target1 = `                          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                            <span>Syllabus Progress</span>
                            <span>{completedTopics} / {totalTopics} Topics Done</span>
                          </div>`;

const replacement1 = `                          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                            <span>Syllabus Progress</span>
                            <span>{completedTopics} / {totalTopics} Gathas Done</span>
                          </div>`;

const target2 = `                          <div className="bg-slate-50/60 rounded-xl p-2.5 text-center border border-slate-150">
                            <span className="text-base font-mono font-black text-rose-900 block">{completedTopics}</span>
                            <span className="text-[8.5px] font-extrabold text-slate-400 uppercase tracking-wider">Completed</span>
                          </div>
                          <div className="bg-slate-50/60 rounded-xl p-2.5 text-center border border-slate-150">
                            <span className="text-base font-mono font-black text-rose-900 block">{remainingTopics}</span>
                            <span className="text-[8.5px] font-extrabold text-slate-400 uppercase tracking-wider">Remaining</span>
                          </div>`;

const replacement2 = `                          <div className="bg-slate-50/60 rounded-xl p-2.5 text-center border border-slate-150">
                            <span className="text-base font-mono font-black text-rose-900 block">{activeSyllabus.chapters.length}</span>
                            <span className="text-[8.5px] font-extrabold text-slate-400 uppercase tracking-wider">Completed Chapters</span>
                          </div>
                          <div className="bg-slate-50/60 rounded-xl p-2.5 text-center border border-slate-150">
                            <span className="text-base font-mono font-black text-rose-900 block">{completedTopics}</span>
                            <span className="text-[8.5px] font-extrabold text-slate-400 uppercase tracking-wider">Completed Gathas</span>
                          </div>
                          <div className="bg-slate-50/60 rounded-xl p-2.5 text-center border border-slate-150">
                            <span className="text-base font-mono font-black text-rose-900 block">{remainingTopics}</span>
                            <span className="text-[8.5px] font-extrabold text-slate-400 uppercase tracking-wider">Remaining Gathas</span>
                          </div>`;

const targetGrid = `<div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">`;
const replacementGrid = `<div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100">`;

let changed = false;
if (content.includes(target1) && content.includes(target2) && content.includes(targetGrid)) {
  content = content.replace(target1, replacement1);
  content = content.replace(target2, replacement2);
  content = content.replace(targetGrid, replacementGrid);
  fs.writeFileSync('src/App.tsx', content);
  changed = true;
  console.log("Patched Syllabus Gathas strings successfully.");
}

if (!changed) {
  console.log("Could not find targets.");
}
