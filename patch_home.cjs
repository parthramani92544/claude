const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /\{\/\* Quick Access Grid \(2 columns as specified in visual prompt\) \*\/\}([\s\S]*?)Today's Motivation - Elegant Quote Block/g;

const match = regex.exec(content);
if (!match) {
  console.log("Could not find Quick access block");
  process.exit(1);
}

const replacement = `{/* Quick Access Grid */}
                    <div className="space-y-2.5">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-600">Quick Access</h4>
                        <span className="text-[11px] text-rose-900 font-medium">5 Quick Tools</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {/* Live Class */}
                        <div 
                          onClick={() => setActiveScreen('LiveClassList')}
                          className="bg-white border border-cream-300 hover:border-cream-400 rounded-[20px] p-3.5 flex flex-col justify-between h-[105px] shadow-sm cursor-pointer active:scale-97 transition-all group"
                        >
                          <div className="flex justify-between items-start">
                            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-900 flex items-center justify-center">
                              <Video className="w-4 h-4" />
                            </div>
                            <span className="px-1.5 py-0.5 bg-rose-100 text-rose-900 text-[8px] font-black font-mono rounded-md animate-pulse">LIVE</span>
                          </div>
                          <div>
                            <h5 className="font-extrabold text-xs text-[#0f172a] group-hover:text-rose-900">Live Class</h5>
                            <p className="text-[9px] text-slate-400 mt-0.5">Interact with Pujya Samanji</p>
                          </div>
                        </div>

                        {/* Sutra Path */}
                        <div 
                          onClick={() => setActiveScreen('SutraList')}
                          className="bg-white border border-cream-300 hover:border-cream-400 rounded-[20px] p-3.5 flex flex-col justify-between h-[105px] shadow-sm cursor-pointer active:scale-97 transition-all group"
                        >
                          <div className="flex justify-between items-start">
                            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-900 flex items-center justify-center">
                              <BookOpenCheck className="w-4 h-4" />
                            </div>
                            <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 text-[8px] font-bold font-mono rounded-md">8 LEVEL</span>
                          </div>
                          <div>
                            <h5 className="font-extrabold text-xs text-[#0f172a] group-hover:text-rose-900">Sutra</h5>
                            <p className="text-[9px] text-slate-400 mt-0.5">Pronunciation training</p>
                          </div>
                        </div>

                        {/* Devotional Prayers */}
                        <div 
                          onClick={() => setActiveScreen('StavanList')}
                          className="bg-white border border-cream-300 hover:border-cream-400 rounded-[20px] p-3.5 flex flex-col justify-between h-[105px] shadow-sm cursor-pointer active:scale-97 transition-all group"
                        >
                          <div className="flex justify-between items-start">
                            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-900 flex items-center justify-center">
                              <Volume2 className="w-4 h-4" />
                            </div>
                          </div>
                          <div>
                            <h5 className="font-extrabold text-xs text-[#0f172a] group-hover:text-rose-900">Stavan & Stuti</h5>
                            <p className="text-[9px] text-slate-400 mt-0.5">Sanskrit stotras audio</p>
                          </div>
                        </div>

                        {/* Trivia & Games */}
                        <div 
                          onClick={() => setActiveScreen('GamesHome')}
                          className="bg-white border border-cream-300 hover:border-cream-400 rounded-[20px] p-3.5 flex flex-col justify-between h-[105px] shadow-sm cursor-pointer active:scale-97 transition-all group"
                        >
                          <div className="flex justify-between items-start">
                            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-900 flex items-center justify-center">
                              <Gamepad2 className="w-4 h-4" />
                            </div>
                            <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 text-[8px] font-black font-mono rounded-md">NEW</span>
                          </div>
                          <div>
                            <h5 className="font-extrabold text-xs text-[#0f172a] group-hover:text-rose-900">Games</h5>
                            <p className="text-[9px] text-slate-400 mt-0.5">Cosmos puzzle & quiz</p>
                          </div>
                        </div>

                        {/* Academic Progress */}
                        <div 
                          onClick={() => setActiveScreen('Profile')}
                          className="bg-white border border-cream-300 hover:border-cream-400 rounded-[20px] p-3.5 flex flex-col justify-between h-[105px] shadow-sm cursor-pointer active:scale-97 transition-all group"
                        >
                          <div className="flex justify-between items-start">
                            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-900 flex items-center justify-center">
                              <User className="w-4 h-4" />
                            </div>
                          </div>
                          <div>
                            <h5 className="font-extrabold text-xs text-[#0f172a] group-hover:text-rose-900">Academic Progress</h5>
                            <p className="text-[9px] text-slate-400 mt-0.5">View your Profile</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Today's Motivation - Elegant Quote Block */}
`;

content = content.replace(regex, replacement);
fs.writeFileSync('src/App.tsx', content);
console.log("Replaced Quick access block successfully!");
