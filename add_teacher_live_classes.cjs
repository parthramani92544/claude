const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const endOfTeacherDashboard = "                    </motion.div>\n                  );\n                })()}";
const insertIndex = content.indexOf(endOfTeacherDashboard) + endOfTeacherDashboard.length;

if (insertIndex > endOfTeacherDashboard.length) {
  const newScreen = `
                {/* 24. TEACHER LIVE CLASSES */}
                {activeScreen === 'TeacherLiveClasses' && (() => {
                  const [activeTab, setActiveTab] = React.useState<'today' | 'upcoming' | 'previous'>('today');
                  const [selectedClass, setSelectedClass] = React.useState<any>(null);
                  const [classStatus, setClassStatus] = React.useState<'scheduled' | 'in-progress' | 'ended'>('scheduled');

                  // Mock data for teacher classes
                  const teacherClasses = {
                    today: [
                      { id: 'c1', name: 'Sutra Pronunciation', level: 'Level 1: Basic Sutras & Stories', batch: 'Batch A - Morning', teacher: currentLoggedInTeacher?.name || 'Teacher', date: new Date().toLocaleDateString(), time: '09:00 AM', students: 15, status: 'Completed', subject: 'Navkar Mantra' },
                      { id: 'c2', name: 'Jain Principles', level: 'Level 2: Jain Geography & Symbols', batch: 'Batch B - Afternoon', teacher: currentLoggedInTeacher?.name || 'Teacher', date: new Date().toLocaleDateString(), time: '04:00 PM', students: 20, status: 'Upcoming', subject: 'Ahinsa Paramo Dharma' }
                    ],
                    upcoming: [
                      { id: 'c3', name: 'Advanced Vows', level: 'Level 3: Pratikraman & Advanced Vows', batch: 'Batch A - Evening', teacher: currentLoggedInTeacher?.name || 'Teacher', date: new Date(Date.now() + 86400000).toLocaleDateString(), time: '05:00 PM', students: 12, status: 'Scheduled', subject: 'Mahavratas' }
                    ],
                    previous: [
                      { id: 'c4', name: 'Basic Stories', level: 'Level 1: Basic Sutras & Stories', batch: 'Batch A - Morning', teacher: currentLoggedInTeacher?.name || 'Teacher', date: new Date(Date.now() - 86400000).toLocaleDateString(), time: '09:00 AM', students: 15, status: 'Completed', subject: 'Story of Mahavir Swami' }
                    ]
                  };

                  const currentClasses = teacherClasses[activeTab];

                  const handleStartClass = () => {
                    setClassStatus('in-progress');
                  };

                  const handleEndClass = () => {
                    setClassStatus('ended');
                  };

                  if (selectedClass) {
                    return (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="h-full bg-slate-50 overflow-y-auto pb-24"
                      >
                        {/* Header */}
                        <div className="bg-white px-5 py-4 flex items-center gap-3 border-b border-slate-200 sticky top-0 z-20">
                          <button onClick={() => { setSelectedClass(null); setClassStatus('scheduled'); }} className="p-2 hover:bg-slate-100 rounded-full transition-colors active:scale-95">
                            <ArrowRight className="w-5 h-5 text-slate-700 rotate-180" />
                          </button>
                          <div>
                            <h2 className="text-lg font-black text-slate-900 tracking-tight">{selectedClass.name}</h2>
                            <p className="text-xs font-medium text-slate-500">{selectedClass.date} • {selectedClass.time}</p>
                          </div>
                        </div>

                        <div className="p-5 space-y-5">
                          {/* Details Card */}
                          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider">{selectedClass.level.split(':')[0]}</span>
                                <h3 className="text-sm font-bold text-slate-800 mt-2">{selectedClass.batch}</h3>
                              </div>
                              <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                                <Users className="w-3.5 h-3.5" />
                                {selectedClass.students} Students
                              </span>
                            </div>
                            
                            <div className="pt-3 border-t border-slate-100">
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Subject / Chapter</p>
                              <p className="text-sm font-medium text-slate-700 mt-0.5">{selectedClass.subject}</p>
                            </div>

                            <div className="pt-3 border-t border-slate-100">
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Meeting Link</p>
                              <div className="flex items-center justify-between mt-1 p-2 bg-slate-50 rounded-lg border border-slate-100">
                                <span className="text-xs text-blue-600 font-mono truncate mr-2">https://meet.google.com/abc-defg-hij</span>
                                <button className="p-1.5 bg-white border border-slate-200 rounded text-slate-600 hover:bg-slate-100 transition-colors">
                                  <FileText className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          {classStatus === 'scheduled' && (
                            <div className="space-y-3">
                              <button onClick={handleStartClass} className="w-full py-3.5 bg-blue-600 text-white font-bold text-sm rounded-xl hover:bg-blue-700 transition-colors shadow-sm cursor-pointer active:scale-95 flex items-center justify-center gap-2">
                                <Play className="w-4 h-4" />
                                Start Class
                              </button>
                            </div>
                          )}

                          {classStatus === 'in-progress' && (
                            <div className="space-y-3">
                              <button className="w-full py-3.5 bg-emerald-600 text-white font-bold text-sm rounded-xl hover:bg-emerald-700 transition-colors shadow-sm cursor-pointer active:scale-95 flex items-center justify-center gap-2">
                                <Video className="w-4 h-4" />
                                Join Meeting
                              </button>
                              <button onClick={handleEndClass} className="w-full py-3.5 bg-white border border-rose-200 text-rose-600 font-bold text-sm rounded-xl hover:bg-rose-50 transition-colors cursor-pointer active:scale-95">
                                End Class
                              </button>
                            </div>
                          )}

                          {classStatus === 'ended' && (
                            <div className="space-y-4">
                              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                <div>
                                  <h4 className="text-sm font-bold text-emerald-800">Class Ended Successfully</h4>
                                  <p className="text-xs text-emerald-600 mt-1">Students can now submit their Gathas for approval. You can review them in the Approvals section.</p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Attendance Preview */}
                          <div>
                            <h2 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">Attendance Preview</h2>
                            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 space-y-4">
                              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                                <div>
                                  <p className="text-xs text-slate-500">Status</p>
                                  <p className="text-sm font-bold text-slate-800">{classStatus === 'ended' ? 'Pending Marking' : 'Not Started'}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-xs text-slate-500">Summary</p>
                                  <p className="text-sm font-bold text-slate-800">-- / {selectedClass.students}</p>
                                </div>
                              </div>
                              <div className="text-center py-2">
                                <p className="text-xs font-medium text-slate-400 italic">Detailed attendance marking will be available later.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="h-full bg-slate-50 overflow-y-auto pb-24"
                    >
                      {/* HEADER */}
                      <div className="bg-white px-5 pt-8 pb-4 border-b border-slate-200 sticky top-0 z-20">
                        <div className="flex items-center gap-3 mb-4">
                          <button onClick={() => setActiveScreen('TeacherDashboard')} className="p-2 hover:bg-slate-100 rounded-full transition-colors active:scale-95">
                            <ArrowRight className="w-5 h-5 text-slate-700 rotate-180" />
                          </button>
                          <h1 className="text-xl font-black text-slate-900 tracking-tight">Live Classes</h1>
                        </div>
                        
                        {/* Tabs */}
                        <div className="flex bg-slate-100 p-1 rounded-xl">
                          <button
                            onClick={() => setActiveTab('today')}
                            className={\`flex-1 py-2 text-[11px] font-bold rounded-lg transition-colors \${activeTab === 'today' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}\`}
                          >
                            Today
                          </button>
                          <button
                            onClick={() => setActiveTab('upcoming')}
                            className={\`flex-1 py-2 text-[11px] font-bold rounded-lg transition-colors \${activeTab === 'upcoming' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}\`}
                          >
                            Upcoming
                          </button>
                          <button
                            onClick={() => setActiveTab('previous')}
                            className={\`flex-1 py-2 text-[11px] font-bold rounded-lg transition-colors \${activeTab === 'previous' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}\`}
                          >
                            Previous
                          </button>
                        </div>
                      </div>

                      <div className="p-5 space-y-4">
                        {currentClasses.length === 0 ? (
                          <div className="text-center py-10 bg-white border border-slate-200 rounded-2xl shadow-sm">
                            <Video className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                            <p className="text-sm font-bold text-slate-600">No classes found</p>
                            <p className="text-xs text-slate-400 mt-1">There are no {activeTab} classes.</p>
                          </div>
                        ) : (
                          currentClasses.map((cls) => (
                            <div key={cls.id} onClick={() => setSelectedClass(cls)} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:border-blue-300 transition-colors cursor-pointer active:scale-98">
                              <div className="flex justify-between items-start mb-2">
                                <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider">{cls.level.split(':')[0]}</span>
                                <span className={\`text-[10px] font-bold px-2 py-0.5 rounded border \${
                                  cls.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                  cls.status === 'Scheduled' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                  'bg-amber-50 text-amber-700 border-amber-100'
                                }\`}>
                                  {cls.status}
                                </span>
                              </div>
                              <h3 className="text-sm font-bold text-slate-800">{cls.name}</h3>
                              <p className="text-xs font-medium text-slate-500 mt-1">{cls.batch}</p>
                              
                              <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100">
                                <div>
                                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Date & Time</p>
                                  <p className="text-xs font-medium text-slate-700 mt-0.5">{cls.date} • {cls.time}</p>
                                </div>
                                <div>
                                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Students</p>
                                  <p className="text-xs font-medium text-slate-700 mt-0.5">{cls.students} Enrolled</p>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  );
                })}
`;

  content = content.substring(0, insertIndex) + newScreen + content.substring(insertIndex);
  
  // Add TeacherLiveClasses to the bottom navigation inclusion list
  content = content.replace(
    /\]\.includes\(activeScreen\) && \(/,
    ", 'TeacherLiveClasses'].includes(activeScreen) && ("
  );

  fs.writeFileSync('src/App.tsx', content);
  console.log("TeacherLiveClasses module injected successfully!");
} else {
  console.log("Could not find the end of TeacherDashboard block");
}
