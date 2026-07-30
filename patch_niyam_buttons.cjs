const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetButtons = `                      {!currentDay.locked && (
                        <div className="pt-4">
                          <button
                            onClick={() => handleSubmitNiyamDay(currentDay.date)}
                            className="w-full py-3.5 bg-rose-900 hover:bg-rose-950 text-white font-black text-xs rounded-full flex items-center justify-center gap-2 shadow-lg shadow-rose-900/20 active:scale-95 transition-all"
                          >
                            <CheckCircle className="w-5 h-5" />
                            {currentDay.submitted ? "Update Today's Niyams" : "Submit Today's Niyams"}
                          </button>
                        </div>
                      )}`;

const replacementButtons = `                      {!currentDay.locked && (
                        <div className="pt-4 space-y-3">
                          <div className="flex gap-3">
                            <button
                              onClick={() => {
                                /* In this prototype, toggling already saves state. We just show a visual cue if needed */
                                alert("Draft Saved!");
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

if (content.includes(targetButtons)) {
  content = content.replace(targetButtons, replacementButtons);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Updated buttons.");
} else {
  console.log("Could not find target buttons.");
}
