const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetSyllabusEnd = `                        </div>
                      </div>
                    </motion.div>
                  );
                })()}

                {/* 4. HOME DASHBOARD (Integrated tab 1) */}`;

const replacementSyllabusEnd = `                        </div>
                      </div>

                      {/* Locked Levels */}
                      <div className="space-y-3 pt-2">
                        {(() => {
                          const lvl = student.level ? student.level.toLowerCase() : '';
                          const showLevel2Lock = lvl.includes('level 1') || lvl.includes('bal shala');
                          const showLevel3Lock = showLevel2Lock || lvl.includes('level 2') || lvl.includes('kumar shala');
                          
                          return (
                            <>
                              {showLevel2Lock && (
                                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-center text-center opacity-80 shadow-xs">
                                  <div className="space-y-1">
                                    <div className="flex items-center justify-center gap-1.5 text-slate-500 font-black text-sm">
                                      <Lock className="w-4 h-4" />
                                      Level 2
                                    </div>
                                    <p className="text-[10px] text-slate-400 font-medium">Available after promotion.</p>
                                  </div>
                                </div>
                              )}
                              {showLevel3Lock && (
                                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-center text-center opacity-80 shadow-xs">
                                  <div className="space-y-1">
                                    <div className="flex items-center justify-center gap-1.5 text-slate-500 font-black text-sm">
                                      <Lock className="w-4 h-4" />
                                      Level 3
                                    </div>
                                    <p className="text-[10px] text-slate-400 font-medium">Available after promotion.</p>
                                  </div>
                                </div>
                              )}
                            </>
                          );
                        })()}
                      </div>

                      {/* Promotion Info Message */}
                      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 text-center mt-4">
                        <p className="text-xs text-blue-800 font-medium">
                          Promotion is granted after successful syllabus completion, revision, and teacher approval.
                        </p>
                      </div>

                    </motion.div>
                  );
                })()}

                {/* 4. HOME DASHBOARD (Integrated tab 1) */}`;

if (content.includes(targetSyllabusEnd)) {
  content = content.replace(targetSyllabusEnd, replacementSyllabusEnd);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Patched Syllabus locks successfully.");
} else {
  console.log("Could not find target Syllabus end.");
}
