const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const endOfTeacherLiveClasses = "                    </motion.div>\n                  );\n                })}";
const insertIndex = content.indexOf(endOfTeacherLiveClasses) + endOfTeacherLiveClasses.length;

if (content.includes("TEACHER LIVE CLASS DETAILS")) {
  console.log("Already added");
} else if (insertIndex > endOfTeacherLiveClasses.length) {
  const newScreen = `
                {/* 25. TEACHER LIVE CLASS DETAILS */}
                {activeScreen === 'TeacherLiveClassDetails' && teacherSelectedLiveClass && (() => {
                  const [classStatus, setClassStatus] = React.useState<'scheduled' | 'in-progress' | 'ended'>(teacherSelectedLiveClass.status === 'Completed' ? 'ended' : 'scheduled');
                  
                  // Mock student list
                  const mockStudents = Array.from({ length: teacherSelectedLiveClass.students }, (_, i) => ({
                    id: i,
                    name: \`Student \${i + 1}\`,
                    initials: \`S\${i + 1}\`,
                    attendance: i % 5 === 0 ? 'Absent' : 'Present',
                    gathaStatus: classStatus === 'ended' ? (i % 3 === 0 ? 'Pending' : 'Submitted') : 'Not Started'
                  }));

                  const presentCount = mockStudents.filter(s => s.attendance === 'Present').length;
                  const absentCount = mockStudents.filter(s => s.attendance === 'Absent').length;

                  return (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="h-full bg-slate-50 overflow-y-auto pb-24"
                    >
                      {/* Header */}
                      <div className="bg-white px-5 py-4 flex items-center gap-3 border-b border-slate-200 sticky top-0 z-20">
                        <button onClick={() => { setActiveScreen('TeacherDashboard'); setTeacherSelectedLiveClass(null); }} className="p-2 hover:bg-slate-100 rounded-full transition-colors active:scale-95">
                          <ArrowRight className="w-5 h-5 text-slate-700 rotate-180" />
                        </button>
                        <div>
                          <h2 className="text-lg font-black text-slate-900 tracking-tight">Live Class Details</h2>
                        </div>
                      </div>

                      <div className="p-5 space-y-5">
                        {/* Class Info */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                          <div>
                            <h3 className="text-sm font-bold text-slate-800">{teacherSelectedLiveClass.name}</h3>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">{teacherSelectedLiveClass.level}</p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Batch Name</p>
                              <p className="text-xs font-medium text-slate-700 mt-1">{teacherSelectedLiveClass.batch}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Teacher</p>
                              <p className="text-xs font-medium text-slate-700 mt-1">{teacherSelectedLiveClass.teacher}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date</p>
                              <p className="text-xs font-medium text-slate-700 mt-1">{teacherSelectedLiveClass.date}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Time</p>
                              <p className="text-xs font-medium text-slate-700 mt-1">{teacherSelectedLiveClass.time}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Duration</p>
                              <p className="text-xs font-medium text-slate-700 mt-1">{teacherSelectedLiveClass.duration || '60 mins'}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Students</p>
                              <p className="text-xs font-medium text-slate-700 mt-1">{teacherSelectedLiveClass.students}</p>
                            </div>
                          </div>
                        </div>

                        {/* Meeting Information */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                            <Video className="w-4 h-4 text-blue-500" />
                            Meeting Information
                          </h3>
                          
                          <div className="grid grid-cols-2 gap-4 pt-2">
                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Platform</p>
                              <p className="text-xs font-medium text-slate-700 mt-1 flex items-center gap-1">Zoom</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Meeting ID</p>
                              <p className="text-xs font-mono text-slate-700 mt-1">892 4531 8890</p>
                            </div>
                            <div className="col-span-2">
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Meeting Link</p>
                              <p className="text-xs text-blue-600 font-mono mt-1 break-all">https://zoom.us/j/89245318890?pwd=abc</p>
                            </div>
                            <div className="col-span-2">
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Scheduled Time</p>
                              <p className="text-xs font-medium text-slate-700 mt-1">{teacherSelectedLiveClass.date} • {teacherSelectedLiveClass.time}</p>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-slate-100 flex gap-2">
                            {classStatus === 'scheduled' && (
                              <button onClick={() => setClassStatus('in-progress')} className="flex-1 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition-colors shadow-sm cursor-pointer active:scale-95 flex items-center justify-center gap-2">
                                <Play className="w-3.5 h-3.5" />
                                Start Class
                              </button>
                            )}
                            
                            {classStatus === 'in-progress' && (
                              <>
                                <button className="flex-1 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 transition-colors shadow-sm cursor-pointer active:scale-95 flex items-center justify-center gap-2">
                                  Join Meeting
                                </button>
                                <button onClick={() => setClassStatus('ended')} className="flex-1 py-2.5 bg-white border border-rose-200 text-rose-600 font-bold text-xs rounded-xl hover:bg-rose-50 transition-colors cursor-pointer active:scale-95">
                                  End Class
                                </button>
                              </>
                            )}

                            {classStatus === 'ended' && (
                              <button disabled className="w-full py-2.5 bg-slate-100 text-slate-400 font-bold text-xs rounded-xl flex items-center justify-center gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Class Ended
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Attendance Preview */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-4">
                            <Users className="w-4 h-4 text-emerald-500" />
                            Attendance Preview
                          </h3>
                          <div className="flex gap-4 mb-4">
                            <div className="flex-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total</p>
                              <p className="text-lg font-black text-slate-800">{teacherSelectedLiveClass.students}</p>
                            </div>
                            <div className="flex-1 bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Present</p>
                              <p className="text-lg font-black text-emerald-700">{classStatus === 'ended' ? presentCount : '--'}</p>
                            </div>
                            <div className="flex-1 bg-rose-50 p-3 rounded-xl border border-rose-100">
                              <p className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">Absent</p>
                              <p className="text-lg font-black text-rose-700">{classStatus === 'ended' ? absentCount : '--'}</p>
                            </div>
                          </div>
                          <p className="text-xs text-slate-400 italic text-center">Read-only. Attendance marking will be implemented later.</p>
                        </div>

                        {/* Students List */}
                        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                          <div className="p-4 border-b border-slate-100 bg-slate-50">
                            <h3 className="text-sm font-bold text-slate-800">Students ({teacherSelectedLiveClass.students})</h3>
                          </div>
                          <div className="divide-y divide-slate-100 max-h-[300px] overflow-y-auto">
                            {mockStudents.map((student) => (
                              <div key={student.id} className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center shrink-0 border border-slate-200">
                                    {student.initials}
                                  </div>
                                  <span className="text-sm font-bold text-slate-700">{student.name}</span>
                                </div>
                                <div className="text-right">
                                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Status</p>
                                  <div className="flex items-center gap-2">
                                    <span className={\`text-[9px] font-bold px-1.5 py-0.5 rounded \${
                                      classStatus === 'ended' 
                                        ? (student.attendance === 'Present' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600')
                                        : 'bg-slate-100 text-slate-500'
                                    }\`}>
                                      {classStatus === 'ended' ? student.attendance : 'Pending'}
                                    </span>
                                    <span className={\`text-[9px] font-bold px-1.5 py-0.5 rounded \${
                                      student.gathaStatus === 'Submitted' ? 'bg-blue-50 text-blue-600' :
                                      student.gathaStatus === 'Pending' ? 'bg-amber-50 text-amber-600' :
                                      'bg-slate-100 text-slate-500'
                                    }\`}>
                                      {student.gathaStatus === 'Not Started' ? 'Gatha Pending' : student.gathaStatus}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Pending Gatha Reminder */}
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                          <div>
                            <h4 className="text-sm font-bold text-amber-800">Gatha Submissions</h4>
                            <p className="text-xs text-amber-700 mt-1 leading-relaxed">Once this class ends, students will be able to submit the assigned Gathas from their syllabus. Submitted Gathas will appear in the Teacher Approval Queue.</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })()}
`;

  content = content.substring(0, insertIndex) + newScreen + content.substring(insertIndex);
  
  // Add TeacherLiveClassDetails to the bottom navigation inclusion list
  content = content.replace(
    /\]\.includes\(activeScreen\) && \(/,
    ", 'TeacherLiveClassDetails'].includes(activeScreen) && ("
  );

  fs.writeFileSync('src/App.tsx', content);
  console.log("TeacherLiveClassDetails module injected successfully!");
} else {
  console.log("Could not find the insertion point");
}
