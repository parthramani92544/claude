const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetProfileStatus = `<div className="flex flex-wrap items-center gap-1.5 mt-2">
                            <span className="text-[8px] font-bold text-slate-400 uppercase">Status:</span>
                            <span className={\`px-2 py-0.5 rounded text-[8px] font-bold uppercase \${
                              student.promotionStatus === 'Awaiting Promotion' ? 'bg-amber-100 text-amber-800' 
                               : student.promotionStatus === 'Revision Pending' ? 'bg-orange-100 text-orange-800'
                              : student.promotionStatus === 'Promoted' ? 'bg-emerald-100 text-emerald-800' 
                               : 'bg-slate-100 text-slate-700'
                            }\`}>
                              {student.promotionStatus || 'Learning'}
                            </span>
                          </div>`;

const replacementProfileStatus = `<div className="flex flex-col gap-1.5 mt-3 pt-3 border-t border-slate-100">
                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Promotion Status:</span>
                            <div className="flex items-center gap-2">
                              {(!student.promotionStatus || student.promotionStatus === 'Learning') && (
                                <>
                                  <span className="text-sm">🟢</span>
                                  <div className="flex flex-col">
                                    <span className="text-xs font-black text-slate-800">Learning</span>
                                    <span className="text-[9px] text-slate-500 font-medium">Currently completing the syllabus.</span>
                                  </div>
                                </>
                              )}
                              {student.promotionStatus === 'Revision Pending' && (
                                <>
                                  <span className="text-sm">🟡</span>
                                  <div className="flex flex-col">
                                    <span className="text-xs font-black text-orange-800">Revision Stage</span>
                                    <span className="text-[9px] text-slate-500 font-medium">All Gathas approved. Revising with teacher.</span>
                                  </div>
                                </>
                              )}
                              {student.promotionStatus === 'Awaiting Promotion' && (
                                <>
                                  <span className="text-sm">🟠</span>
                                  <div className="flex flex-col">
                                    <span className="text-xs font-black text-amber-800">Awaiting Promotion</span>
                                    <span className="text-[9px] text-slate-500 font-medium">Teacher recommended. Waiting for Admin.</span>
                                  </div>
                                </>
                              )}
                              {student.promotionStatus === 'Promoted' && (
                                <>
                                  <span className="text-sm">🔵</span>
                                  <div className="flex flex-col">
                                    <span className="text-xs font-black text-emerald-800">Promoted</span>
                                    <span className="text-[9px] text-slate-500 font-medium">Promoted to the next level.</span>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>`;

// because of spaces in string, replace by finding bounds
const startIndex = content.indexOf('<div className="flex flex-wrap items-center gap-1.5 mt-2">');
const endIndexStr = '{student.promotionStatus || \'Learning\'}\n                            </span>\n                          </div>';
const endIndex = content.indexOf(endIndexStr) + endIndexStr.length;

if (startIndex !== -1 && endIndex !== -1) {
  content = content.substring(0, startIndex) + replacementProfileStatus + content.substring(endIndex);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Patched Profile Promotion Status successfully.");
} else {
  console.log("Could not find target bounds.");
}
