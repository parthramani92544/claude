const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const target = `                {/* 17. DOWNLOADS */}
                {activeScreen === 'Downloads' && (`;

const block = `                {/* 16.5 PROFILE - BATCH CHANGE */}
                {activeScreen === 'ProfileBatchChange' && (() => {
                  const availableBatches = [
                    { id: 'batch_1', name: 'Batch A - Weekend', teacher: 'Rajvi Shah', days: 'Saturdays', time: '05:30 PM' },
                    { id: 'batch_2', name: 'Batch B - Weekend', teacher: 'Krupa Shah', days: 'Sundays', time: '10:00 AM' },
                    { id: 'batch_3', name: 'Batch C - Weekday', teacher: 'Sneha Doshi', days: 'Tuesdays', time: '06:00 PM' },
                    { id: 'batch_4', name: 'Batch D - Weekday', teacher: 'Amit Jain', days: 'Thursdays', time: '07:30 PM' },
                  ];

                  const currentMonth = new Date().toISOString().slice(0, 7);
                  
                  // Limit logic resets if we are in a new month
                  let changesLeft = student.batchChangesRemaining ?? 5;
                  let lastMonth = student.lastBatchChangeMonth || currentMonth;
                  if (lastMonth !== currentMonth) {
                     changesLeft = 5;
                  }

                  const noChangesLeft = changesLeft <= 0;

                  return (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="p-5 space-y-6 pb-24 max-w-2xl mx-auto"
                    >
                      {/* Header */}
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => setActiveScreen('Profile')} 
                          className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer shadow-sm hover:bg-slate-50 transition-all active:scale-95"
                        >
                          <ChevronLeft className="w-5 h-5 text-slate-700" />
                        </button>
                        <div>
                          <span className="text-[10px] font-bold text-rose-900 uppercase tracking-widest font-mono">Batch Management</span>
                          <h3 className="text-lg font-black text-slate-900">Change Batch</h3>
                        </div>
                      </div>

                      {/* Current Batch Info */}
                      <div className="bg-white border-2 border-rose-100 rounded-[20px] p-5 shadow-xs">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Current Assignment</h4>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-[9px] text-slate-400 uppercase font-bold block mb-1">Level</span>
                            <span className="text-sm font-black text-slate-800">{student.level}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-slate-400 uppercase font-bold block mb-1">Teacher</span>
                            <span className="text-sm font-black text-slate-800">{student.teacher}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-slate-400 uppercase font-bold block mb-1">Batch</span>
                            <span className="text-sm font-black text-rose-900">{student.batch}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-slate-400 uppercase font-bold block mb-1">Class Timing</span>
                            <span className="text-sm font-black text-slate-800">{student.classTiming}</span>
                          </div>
                        </div>
                      </div>

                      {/* Remaining Changes Indicator */}
                      <div className="bg-slate-50 border border-slate-200 rounded-[16px] p-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-slate-500" />
                          <span className="text-xs font-bold text-slate-700">Batch Changes Remaining:</span>
                        </div>
                        <span className={\`text-lg font-black \${noChangesLeft ? 'text-rose-600' : 'text-emerald-600'} font-mono\`}>
                          {changesLeft} / 5
                        </span>
                      </div>
                      
                      {noChangesLeft && (
                        <div className="bg-rose-50 text-rose-800 p-3 rounded-xl text-xs font-bold flex items-start gap-2 border border-rose-200">
                          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                          You have reached the monthly batch change limit.
                        </div>
                      )}

                      {/* Available Batches */}
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Available Batches ({student.level})</h4>
                        
                        <div className="space-y-3">
                          {availableBatches.filter(b => b.name !== student.batch).map(batch => (
                            <div key={batch.id} className="bg-white border border-slate-200 rounded-[20px] p-4 flex items-center justify-between shadow-xs">
                              <div className="space-y-1 text-left">
                                <h5 className="font-black text-sm text-slate-800">{batch.name}</h5>
                                <div className="text-[10px] text-slate-500 font-medium flex items-center gap-2">
                                  <span>{batch.teacher}</span>
                                  <span>•</span>
                                  <span>{batch.days}, {batch.time}</span>
                                </div>
                              </div>
                              
                              <button
                                disabled={noChangesLeft}
                                onClick={() => {
                                  if (noChangesLeft) return;
                                  
                                  setStudent(prev => ({
                                    ...prev,
                                    batch: batch.name,
                                    teacher: batch.teacher,
                                    classTiming: \`\${batch.days}, \${batch.time}\`,
                                    batchChangesRemaining: changesLeft - 1,
                                    lastBatchChangeMonth: currentMonth
                                  }));
                                  
                                  alert(\`Successfully changed batch to \${batch.name}!\`);
                                  setActiveScreen('Profile');
                                }}
                                className={\`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider transition-all \${
                                  noChangesLeft 
                                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                                    : 'bg-rose-900 text-white hover:bg-rose-950 active:scale-95 shadow-md shadow-rose-900/20 cursor-pointer'
                                }\`}
                              >
                                Select
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })()}

`;

if (content.includes(target)) {
  content = content.replace(target, block + target);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Inserted ProfileBatchChange screen");
} else {
  console.log("Could not find target to insert screen.");
}
