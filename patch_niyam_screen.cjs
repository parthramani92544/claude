const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const niyamScreen = `
                {/* DAILY NIYAM SCREEN */}
                {activeScreen === 'Niyam' && (
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
                            Log your daily niyams here. Consistency helps build a strong foundation of values. Earn points for each completed niyam.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {niyams.map((niyam) => (
                        <div 
                          key={niyam.id} 
                          onClick={() => handleToggleNiyam(niyam.id)}
                          className={\`p-4 rounded-[20px] border cursor-pointer transition-all active:scale-97 flex items-center justify-between \${
                            niyam.done 
                              ? 'bg-emerald-50 border-emerald-200 shadow-inner' 
                              : 'bg-white border-slate-200 shadow-sm hover:border-slate-300'
                          }\`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={\`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors \${
                              niyam.done 
                                ? 'bg-emerald-500 border-emerald-500 text-white' 
                                : 'border-slate-300'
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
                  </motion.div>
                )}
`;

const targetStart = `                 {/* 12. BONUS EVENT SCREEN */}`;

if (content.includes(targetStart)) {
  content = content.replace(targetStart, niyamScreen + targetStart);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Injected Niyam screen.");
} else {
  console.log("Could not find target string.");
}
