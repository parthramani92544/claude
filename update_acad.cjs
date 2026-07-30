const fs = require('fs');
let content = fs.readFileSync('src/components/TeacherStudentsFlow.tsx', 'utf8');

const target = `<div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Gatha Progress</p>
                    <p className="text-sm font-black text-slate-700 mt-0.5">{student.gathaProgress}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Attendance</p>
                    <p className="text-sm font-black text-slate-700 mt-0.5">{student.attendancePercentage}</p>
                  </div>
                </div>`;

const replacement = `<div className="grid grid-cols-3 gap-3 mb-4">
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

content = content.replace(target, replacement);

fs.writeFileSync('src/components/TeacherStudentsFlow.tsx', content);
