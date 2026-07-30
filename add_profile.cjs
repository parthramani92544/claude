const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = "{/* 4. HOME DASHBOARD (Integrated tab 1) */}";

const profileStr = `
                {/* TEACHER PROFILE PLACEHOLDER */}
                {activeScreen === 'TeacherProfile' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="h-full bg-slate-50 overflow-y-auto pb-24"
                  >
                    <div className="bg-white px-5 pt-8 pb-4 border-b border-slate-200 sticky top-0 z-20">
                      <h1 className="text-xl font-black text-slate-900 tracking-tight">Profile</h1>
                    </div>
                    <div className="p-5 flex flex-col items-center justify-center text-center mt-10">
                      <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                        <User className="w-10 h-10" />
                      </div>
                      <h2 className="text-lg font-bold text-slate-900 mb-1">{currentLoggedInTeacher?.name || 'Teacher Profile'}</h2>
                      <p className="text-sm text-slate-500 mb-6">Profile module under development.</p>
                      
                      <button 
                        onClick={() => {
                          setCurrentLoggedInTeacher(null);
                          setActiveScreen('Login');
                          localStorage.removeItem('shalaSession');
                        }}
                        className="w-full bg-rose-50 text-rose-600 border border-rose-200 font-bold py-3 rounded-xl active:scale-95 transition-all shadow-sm flex justify-center items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* 4. HOME DASHBOARD (Integrated tab 1) */}`;

if (!content.includes('TeacherProfile placeholder')) {
  content = content.replace(targetStr, profileStr);
  fs.writeFileSync('src/App.tsx', content);
}

