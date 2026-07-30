const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const target = `                        {/* Active Approval Queue Area */}`;

const replacement = `                        {/* Academic Promotion Area */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm mb-4">
                          <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono mb-2">Level Progression</h4>
                          {isEligibleForPromotion ? (
                            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex flex-col gap-2">
                              <div>
                                <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider block">Ready for Promotion</span>
                                <h5 className="text-sm font-black text-emerald-900 leading-tight mt-0.5">{student.name} has completed {activeSyllabus.levelName}</h5>
                                <p className="text-[10px] text-emerald-700 mt-1 leading-relaxed">
                                  All Gathas and topics are approved. Please conduct a final revision. Once satisfied, recommend the student for promotion to the next level.
                                </p>
                              </div>
                              <button
                                onClick={() => {
                                  if (student.promotionStatus !== 'Awaiting Promotion' && student.promotionStatus !== 'Promoted') {
                                    setStudent(prev => ({ ...prev, promotionStatus: 'Awaiting Promotion' }));
                                    alert(\`\${student.name} has been recommended for promotion! The request is now in the Admin Panel.\`);
                                  }
                                }}
                                disabled={student.promotionStatus === 'Awaiting Promotion' || student.promotionStatus === 'Promoted'}
                                className={\`py-2 px-3 rounded-lg text-xs font-bold transition-all \${
                                  student.promotionStatus === 'Awaiting Promotion' || student.promotionStatus === 'Promoted' 
                                  ? 'bg-emerald-200 text-emerald-600 cursor-not-allowed' 
                                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm cursor-pointer active:scale-95'
                                }\`}
                              >
                                {student.promotionStatus === 'Awaiting Promotion' ? 'Recommendation Sent ✓' : student.promotionStatus === 'Promoted' ? 'Already Promoted' : 'Recommend for Promotion ➔'}
                              </button>
                            </div>
                          ) : (
                            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Current Status</span>
                              <p className="text-[10px] text-slate-600 mt-1">Student is currently learning <b>{activeSyllabus.levelName}</b>. ({tcCompletedTopics}/{tcTotalTopics} Topics Approved). They are not yet eligible for promotion.</p>
                            </div>
                          )}
                        </div>

                        {/* Active Approval Queue Area */}`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync('src/App.tsx', content);
  console.log('Patched UI Teacher!');
} else {
  console.log('Target not found.');
}
