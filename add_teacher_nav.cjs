const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = `              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}`;

const teacherNav = `              )}

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
          </div>
        </div>

      </div>
    </div>
  );
}`;

content = content.replace(targetStr, teacherNav);
fs.writeFileSync('src/App.tsx', content);
