const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const target = `                          <h4 className="font-extrabold text-base text-navy-950 leading-none">{student.name}</h4>
                          <span className="font-medium text-rose-800 text-xs block">{student.level}</span>
                          <span className="font-mono text-[9px] text-slate-400 block uppercase tracking-wider">BATCH: Saturdays, 05:30 PM</span>
                        </div>
                      </div>`;

const replacement = `                          <h4 className="font-extrabold text-base text-navy-950 leading-none">{student.name}</h4>
                          <span className="font-medium text-rose-800 text-xs block">{student.level}</span>
                          <span className="font-mono text-[9px] text-slate-400 block uppercase tracking-wider">BATCH: Saturdays, 05:30 PM</span>
                          
                          <div className="flex flex-wrap items-center gap-1.5 mt-2">
                            <span className="text-[8px] font-bold text-slate-400 uppercase">Status:</span>
                            <span className={\`px-2 py-0.5 rounded text-[8px] font-bold uppercase \${
                              student.promotionStatus === 'Awaiting Promotion' ? 'bg-amber-100 text-amber-800' 
                              : student.promotionStatus === 'Revision Pending' ? 'bg-orange-100 text-orange-800'
                              : student.promotionStatus === 'Promoted' ? 'bg-emerald-100 text-emerald-800' 
                              : 'bg-slate-100 text-slate-700'
                            }\`}>
                              {student.promotionStatus || 'Learning'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {student.completedLevels && student.completedLevels.length > 0 && (
                        <div className="pt-1">
                          <span className="text-[8.5px] font-bold text-slate-400 uppercase block tracking-wider mb-1">Completed Levels</span>
                          <div className="flex flex-wrap gap-1.5">
                            {student.completedLevels.map((lvl, idx) => (
                              <span key={idx} className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-1 rounded-md text-[9px] font-semibold">
                                ✓ {lvl}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync('src/App.tsx', content);
  console.log('Patched Profile!');
} else {
  console.log('Target not found.');
}
