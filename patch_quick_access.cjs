const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetQuickAccessStart = `                    {/* Quick Access Grid (2 columns as specified in visual prompt) */}
                    <div className="space-y-2.5">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-600">Quick Access</h4>
                        <span className="text-[11px] text-rose-900 font-medium">6 Quick Tools</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">`;

const targetQuickAccessEnd = `                      </div>
                    </div>

                    {/* Upcoming Live Class card */}`;

// Actually I'll just use a regex replace for this entire block to avoid mismatch.
// Or I can replace specifically.
