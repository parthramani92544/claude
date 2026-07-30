const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const target = `<span className="text-base font-mono font-black text-rose-900 block">{activeSyllabus.chapters.length}</span>
                            <span className="text-[8.5px] font-extrabold text-slate-400 uppercase tracking-wider">Completed Chapters</span>`;

const replacement = `<span className="text-base font-mono font-black text-rose-900 block">{activeSyllabus.chapters.filter(ch => ch.topics.length > 0 && ch.topics.every(t => t.status === 'Approved')).length}</span>
                            <span className="text-[8.5px] font-extrabold text-slate-400 uppercase tracking-wider">Completed Chapters</span>`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Patched completed chapters calculation successfully.");
} else {
  console.log("Could not find target completed chapters block.");
}
