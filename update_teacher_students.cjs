const fs = require('fs');
let content = fs.readFileSync('src/components/TeacherStudentsFlow.tsx', 'utf8');

// Fix 1: Summary cards in TeacherStudentProfile
const oldSummary = `<div className="grid grid-cols-2 gap-3">
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-center">
              <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-2 text-indigo-500">
                <FileText className="w-5 h-5" />
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Gatha Progress</p>
              <p className="text-lg font-black text-slate-800">{selectedStudent.gathaProgress}</p>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-center">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2 text-blue-500">
                <TrendingUp className="w-5 h-5" />
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Attendance</p>
              <p className="text-lg font-black text-slate-800">{selectedStudent.attendancePercentage}</p>
            </div>
            
            <div className="col-span-2 bg-amber-50 border border-amber-200 rounded-2xl p-4 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-amber-500 shadow-sm border border-amber-100">
                  <Star className="w-5 h-5 fill-amber-500" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Bonus Points</p>
                  <p className="text-lg font-black text-amber-900">{selectedStudent.bonusPoints} pts</p>
                </div>
              </div>
            </div>
          </div>`;

const newSummary = `<div className="grid grid-cols-2 gap-3">
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-center">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2 text-blue-500">
                <TrendingUp className="w-5 h-5" />
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Attendance</p>
              <p className="text-lg font-black text-slate-800">{selectedStudent.attendancePercentage}</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-center">
              <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-2 text-indigo-500">
                <FileText className="w-5 h-5" />
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Gatha Progress</p>
              <p className="text-lg font-black text-slate-800">{selectedStudent.gathaProgress}</p>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-center">
              <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-2 text-amber-500">
                <Star className="w-5 h-5 fill-amber-500" />
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Bonus Points</p>
              <p className="text-lg font-black text-slate-800">{selectedStudent.bonusPoints} pts</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-center">
              <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-2 text-emerald-500">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Academic Progress</p>
              <p className="text-lg font-black text-slate-800 truncate px-1">{selectedStudent.academicStatus}</p>
            </div>
          </div>`;

content = content.replace(oldSummary, newSummary);

// Fix 2: Student Card Academic Summary
const oldCardStats = `<div className="grid grid-cols-3 gap-3 mb-4">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Gatha</p>
                    <p className="text-sm font-black text-slate-700 mt-0.5">{student.gathaProgress}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Attend.</p>
                    <p className="text-sm font-black text-slate-700 mt-0.5">{student.attendancePercentage}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Academic</p>
                    <p className="text-sm font-black text-slate-700 mt-0.5 truncate">{student.academicStatus}</p>
                  </div>
                </div>`;

const newCardStats = `<div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Attendance %</p>
                    <p className="text-sm font-black text-slate-700 mt-0.5">{student.attendancePercentage}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Gathas Completed</p>
                    <p className="text-sm font-black text-slate-700 mt-0.5">{student.gathaProgress}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Pending Gathas</p>
                    <p className="text-sm font-black text-slate-700 mt-0.5">{student.pendingGathas?.length || 0}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Current Status</p>
                    <p className="text-sm font-black text-slate-700 mt-0.5">{student.status}</p>
                  </div>
                </div>`;

content = content.replace(oldCardStats, newCardStats);

fs.writeFileSync('src/components/TeacherStudentsFlow.tsx', content);
