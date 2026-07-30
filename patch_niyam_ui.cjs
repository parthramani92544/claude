const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /\{\/\* DAILY NIYAM SCREEN \*\/\}([\s\S]*?)\{\/\* 12\. BONUS EVENT SCREEN \*\/\}/;

const match = regex.exec(content);
if (!match) {
  console.log("Could not find Niyam UI block");
  process.exit(1);
}

const replacementUI = `{/* DAILY NIYAM SCREEN */}
                {activeScreen === 'Niyam' && (() => {
                  const currentDay = niyamDays.find(d => d.date === selectedNiyamDate) || niyamDays[niyamDays.length - 1];
                  
                  return (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="p-6 space-y-6 max-w-2xl mx-auto bg-slate-50 min-h-screen pb-24"
                    >
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => navigateBack()}
                          className="w-9 h-9 rounded-full bg-white hover:bg-slate-100 flex items-center justify-center border border-slate-200 transition-colors shadow-sm cursor-pointer"
                        >
                          <ChevronLeft className="w-5 h-5 text-slate-700" />
                        </button>
                        <div>
                          <span className="text-[9px] font-bold text-rose-900 uppercase tracking-widest font-mono block">Daily Track</span>
                          <h3 className="text-sm font-black text-[#0f172a]">Daily Spiritual Niyams</h3>
                        </div>
                      </div>

                      <div className="bg-white border border-rose-200 rounded-[24px] p-5 shadow-sm space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-900 shrink-0">
                            <Star className="w-6 h-6 fill-rose-500" />
                          </div>
                          <div>
                            <h4 className="text-xs font-black text-slate-900">Spiritual Commitments</h4>
                            <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                              Log your daily niyams here. Today's entries remain editable until the day ends. You can review up to 3 days of past submissions.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Date Selector */}
                      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {niyamDays.map((day) => (
                          <button
                            key={day.date}
                            onClick={() => setSelectedNiyamDate(day.date)}
                            className={\`px-4 py-2.5 rounded-[16px] text-[10px] font-bold whitespace-nowrap transition-all border shadow-xs flex-col flex gap-1 \${
                              selectedNiyamDate === day.date
                                ? 'bg-rose-900 text-white border-rose-950'
                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                            }\`}
                          >
                            <span>{day.label}</span>
                            <div className="flex items-center gap-1 opacity-80 text-[8px] font-mono">
                              {day.locked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                              <span>{day.locked ? 'Locked' : 'Open'}</span>
                            </div>
                          </button>
                        ))}
                      </div>

                      {/* Current Day Stats */}
                      <div className="flex items-center justify-between px-2">
                        <div>
                          <h4 className="text-sm font-black text-slate-900">{currentDay.label}</h4>
                          <span className="text-[10px] font-medium text-slate-500">{new Date(currentDay.date).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric'})}</span>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 justify-end">
                            {currentDay.locked && <Lock className="w-3 h-3 text-slate-400" />}
                            <span className={\`text-[10px] font-bold uppercase tracking-wider \${currentDay.submitted ? 'text-emerald-600' : 'text-amber-600'}\`}>
                              {currentDay.submitted ? 'Submitted' : 'Pending'}
                            </span>
                          </div>
                          <span className="text-[11px] font-bold text-slate-900">
                            Earned: <span className="text-rose-900">{currentDay.pointsEarned} pts</span>
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
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
                            } \${
                              niyam.done 
                                ? 'bg-emerald-50 border-emerald-200 shadow-inner' 
                                : 'bg-white border-slate-200 shadow-sm hover:border-slate-300'
                            }\`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={\`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors \${
                                niyam.done 
                                  ? 'bg-emerald-500 border-emerald-500 text-white' 
                                  : 'border-slate-300 bg-slate-50'
                              }\`}>
                                {niyam.done && <Check className="w-4 h-4" />}
                              </div>
                              <div>
                                <h5 className={\`text-xs font-bold transition-colors \${niyam.done ? 'text-emerald-900 line-through opacity-80' : 'text-slate-800'}\`}>
                                  {niyam.title}
                                </h5>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-[9px] font-medium text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                                    {niyam.category}
                                  </span>
                                  <span className="text-[9px] font-bold text-amber-600 flex items-center gap-0.5">
                                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                                    +{niyam.points} pts
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {!currentDay.locked && (
                        <div className="pt-4">
                          <button
                            onClick={() => handleSubmitNiyamDay(currentDay.date)}
                            className="w-full py-3.5 bg-rose-900 hover:bg-rose-950 text-white font-black text-xs rounded-full flex items-center justify-center gap-2 shadow-lg shadow-rose-900/20 active:scale-95 transition-all"
                          >
                            <CheckCircle className="w-5 h-5" />
                            {currentDay.submitted ? "Update Today's Niyams" : "Submit Today's Niyams"}
                          </button>
                        </div>
                      )}

                    </motion.div>
                  );
                })}
                 {/* 12. BONUS EVENT SCREEN */}`;

content = content.replace(regex, replacementUI);
fs.writeFileSync('src/App.tsx', content);
console.log("Injected Niyam UI successfully.");
