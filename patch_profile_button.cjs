const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetProfileTop = `                          <span className="font-mono text-[9px] text-slate-400 block uppercase tracking-wider">BATCH: Saturdays, 05:30 PM</span>`;

const replacementProfileTop = `                          <span className="font-mono text-[9px] text-slate-400 block uppercase tracking-wider">BATCH: {student.batch} • {student.teacher}</span>`;

const targetButtonPlace = `                      {/* 6. Offline Downloads Button */}
                      <button 
                        onClick={() => setActiveScreen('Downloads')}`;

const replacementButtonPlace = `                      {/* 5. Change Batch Button */}
                      <button 
                        onClick={() => setActiveScreen('ProfileBatchChange')}
                        className="w-full p-4 bg-white hover:bg-cream-50 border border-cream-300 rounded-2xl text-left flex items-center justify-between cursor-pointer transition-all active:scale-99 shadow-xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center">
                            <Users className="w-4 h-4 text-rose-900" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-[#0f172a]">Change Batch</h4>
                            <p className="text-[10px] text-slate-500 font-medium">View and switch class timings</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </button>
                      {/* 6. Offline Downloads Button */}
                      <button 
                        onClick={() => setActiveScreen('Downloads')}`;

if (content.includes(targetProfileTop) && content.includes(targetButtonPlace)) {
  content = content.replace(targetProfileTop, replacementProfileTop);
  content = content.replace(targetButtonPlace, replacementButtonPlace);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Patched Profile screen with button.");
} else {
  console.log("Could not find targets in Profile screen.");
}
