const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetSubmit = `                      {!currentDay.locked && (
                        <div className="pt-4 space-y-3">
                          <div className="flex gap-3">
                            <button
                              onClick={() => {
                                /* In this prototype, toggling already saves state. We just show a visual cue if needed */
                                console.log("Draft Saved!");
                              }}
                              className="w-full py-3.5 bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-full flex items-center justify-center gap-2 active:scale-95 transition-all"
                            >
                              Save Draft
                            </button>
                            <button
                              onClick={() => handleSubmitNiyamDay(currentDay.date)}
                              className="w-full py-3.5 bg-rose-900 hover:bg-rose-950 text-white font-black text-xs rounded-full flex items-center justify-center gap-2 shadow-lg shadow-rose-900/20 active:scale-95 transition-all"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Submit Today's Niyam
                            </button>
                          </div>
                          {currentDay.submitted && (
                            <div className="flex items-center justify-center gap-2 text-emerald-600 bg-emerald-50 py-2 rounded-full border border-emerald-100">
                              <CheckCircle className="w-4 h-4" />
                              <span className="text-xs font-bold">Submitted Successfully</span>
                            </div>
                          )}
                        </div>
                      )}`;

const replacementSubmit = `                      {(!currentDay.locked || currentDay.label === 'Yesterday') && (
                        <div className="pt-4 space-y-3">
                          <div className="flex gap-3">
                            <button
                              onClick={() => {
                                /* In this prototype, toggling already saves state. We just show a visual cue if needed */
                                console.log("Draft Saved!");
                              }}
                              className="w-full py-3.5 bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-full flex items-center justify-center gap-2 active:scale-95 transition-all"
                            >
                              Save Draft
                            </button>
                            <button
                              onClick={() => handleSubmitNiyamDay(currentDay.date)}
                              className="w-full py-3.5 bg-rose-900 hover:bg-rose-950 text-white font-black text-xs rounded-full flex items-center justify-center gap-2 shadow-lg shadow-rose-900/20 active:scale-95 transition-all"
                            >
                              <CheckCircle className="w-4 h-4" />
                              {currentDay.label === 'Yesterday' ? "Update Yesterday's Niyam" : "Submit Today's Niyam"}
                            </button>
                          </div>
                          {currentDay.submitted && (
                            <div className="flex items-center justify-center gap-2 text-emerald-600 bg-emerald-50 py-2 rounded-full border border-emerald-100">
                              <CheckCircle className="w-4 h-4" />
                              <span className="text-xs font-bold">Submitted Successfully</span>
                            </div>
                          )}
                        </div>
                      )}`;

if (content.includes(targetSubmit)) {
  content = content.replace(targetSubmit, replacementSubmit);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Updated Niyam submit button UI successfully.");
} else {
  console.log("Target Niyam submit button UI not found.");
}
