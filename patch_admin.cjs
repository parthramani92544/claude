const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const target = `                {/* 22. TEACHER DASHBOARD - WORKFLOW QUEUE */}`;

const replacement = `                {/* 23. ADMIN PANEL - PROMOTION & MANAGEMENT */}
                {activeScreen === 'AdminPanel' && (() => {
                  const handleApprovePromotion = () => {
                    const currentLvl = student.level;
                    const completed = student.completedLevels ? [...student.completedLevels] : [];
                    if (!completed.includes(currentLvl)) {
                      completed.push(currentLvl);
                    }
                    
                    let nextLevel = "Level 3: Pratikraman & Advanced Vows"; // Default
                    if (currentLvl.includes("Level 1")) {
                      nextLevel = "Level 2: Jain Geography & Symbols";
                    } else if (currentLvl.includes("Level 2")) {
                      nextLevel = "Level 3: Pratikraman & Advanced Vows";
                    } else if (currentLvl.includes("Level 3")) {
                      nextLevel = "Level 4: Advanced Studies"; // Theoretical next level
                    }

                    setStudent(prev => ({
                      ...prev,
                      completedLevels: completed,
                      level: nextLevel,
                      promotionStatus: 'Learning'
                    }));
                    
                    alert(\`Promotion Approved! \${student.name} is now enrolled in \${nextLevel}.\`);
                  };

                  return (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-slate-50 min-h-full p-5 sm:p-6 space-y-5 pb-24"
                    >
                      <div className="flex items-center justify-between bg-white border border-slate-200/60 p-4 rounded-2xl shadow-xs">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => navigateBack()}
                            className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors"
                          >
                            <ChevronLeft className="w-5 h-5 text-slate-600" />
                          </button>
                          <div>
                            <span className="text-[10px] font-bold text-rose-900 uppercase tracking-widest font-mono">Administration</span>
                            <h3 className="text-base font-black text-slate-900 leading-none mt-0.5">Admin Panel</h3>
                          </div>
                        </div>
                        <Shield className="w-6 h-6 text-slate-300" />
                      </div>

                      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider font-mono">Promotion Requests</h4>
                        
                        {student.promotionStatus === 'Awaiting Promotion' ? (
                          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-col gap-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="px-2 py-0.5 bg-blue-200 text-blue-800 text-[9px] font-bold rounded uppercase tracking-wider">New Request</span>
                                <h5 className="text-sm font-extrabold text-blue-950 mt-1.5">{student.name}</h5>
                                <p className="text-[10px] text-blue-800 mt-0.5">Recommended for promotion from {student.level}</p>
                              </div>
                            </div>
                            
                            <div className="flex gap-2 mt-2">
                              <button
                                onClick={handleApprovePromotion}
                                className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] rounded-lg cursor-pointer transition-all active:scale-95 shadow-sm"
                              >
                                Approve Promotion
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-slate-50 rounded-xl p-6 text-center border border-slate-100">
                            <span className="text-[11px] text-slate-400 font-medium">No pending promotion requests.</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider font-mono">Student Records (Read Only)</h4>
                        <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex items-center justify-between">
                           <div>
                             <h5 className="text-xs font-bold text-slate-700">{student.name}</h5>
                             <p className="text-[10px] text-slate-500 mt-0.5">Current: {student.level}</p>
                           </div>
                           <span className="text-[10px] font-bold text-slate-400 uppercase">{student.promotionStatus}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                {/* 22. TEACHER DASHBOARD - WORKFLOW QUEUE */}`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync('src/App.tsx', content);
  console.log('Patched Admin Panel!');
} else {
  console.log('Target not found.');
}
