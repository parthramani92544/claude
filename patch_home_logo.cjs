const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetHomeLogo = `<div className="w-10 h-10 bg-rose-900 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-950/15">
                          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C11.5 5 9 8.5 6 11.5c-3 3-4 6.5-2 8.5s5.5 1 8.5-2c3 3 6.5 4 8.5 2s1-5.5-2-8.5C15 8.5 12.5 5 12 2z" />
                          </svg>
                        </div>`;

const replacementHomeLogo = `<div className="w-11 h-11 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-lg shadow-slate-200/50 p-1.5 shrink-0">
                          <PathshalaLogo />
                        </div>`;

if (content.includes(targetHomeLogo)) {
  content = content.replace(targetHomeLogo, replacementHomeLogo);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Patched Home Logo successfully.");
} else {
  console.log("Could not find Home Logo target.");
}
