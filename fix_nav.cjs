const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// First, fix the student navigation so it doesn't show for teacher screens
content = content.replace(
  /'TeacherLiveClasses', 'TeacherLiveClassDetails'\]\.includes/,
  "']\.includes"
);
content = content.replace(
  /'Search', 'TeacherLiveClasses', 'TeacherLiveClassDetails'\]\.includes/,
  "'Search']\.includes"
);

// Then insert Teacher Bottom Navigation right below the Student one
const targetNav = `                </div>
              )}
            </div>
          </div>`;

const teacherNav = `                </div>
              )}

              {/* TEACHER BOTTOM NAVIGATION */}
              {['TeacherDashboard', 'TeacherLiveClasses', 'TeacherLiveClassDetails', 'TeacherStudents', 'TeacherStudentProfile', 'TeacherProfile'].includes(activeScreen) && (
                <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-2 flex justify-between items-center z-40 shadow-xs shrink-0">
                  {[
                    { id: 'TeacherDashboard', icon: LayoutDashboard, label: 'Dashboard' },
                    { id: 'TeacherLiveClasses', icon: Video, label: 'Live Classes' },
                    { id: 'TeacherStudents', icon: Users, label: 'Students' },
                    { id: 'TeacherProfile', icon: User, label: 'Profile' },
                  ].map((nav) => {
                    const isCurrent = activeScreen === nav.id || 
                                      (nav.id === 'TeacherLiveClasses' && activeScreen === 'TeacherLiveClassDetails') ||
                                      (nav.id === 'TeacherStudents' && activeScreen === 'TeacherStudentProfile');
                    return (
                      <button
                        key={nav.id}
                        onClick={() => setActiveScreen(nav.id)}
                        className="flex flex-col items-center gap-1 cursor-pointer py-1 px-2 rounded-xl active:scale-95 transition-all text-center shrink-0 min-w-[50px]"
                      >
                        <nav.icon className={\`w-5 h-5 transition-all \${isCurrent ? 'text-blue-700 scale-110' : 'text-slate-400 hover:text-slate-600'}\`} />
                        <span className={\`text-[9px] font-black tracking-wide \${isCurrent ? 'text-blue-700 font-extrabold' : 'text-slate-400'}\`}>
                          {nav.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>`;

content = content.replace(targetNav, teacherNav);

fs.writeFileSync('src/App.tsx', content);
