const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetSplash = `<div className="w-32 h-32 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden relative shadow-sm">
                        <img 
                          src="/official-logo.png" 
                          alt="Official Pathshala Logo" 
                          className="w-full h-full object-contain z-10"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                        <div className="hidden absolute inset-0 flex flex-col items-center justify-center text-center p-2">
                          <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider">Official<br/>Pathshala<br/>Logo</span>
                        </div>
                      </div>`;

const replacementSplash = `<div className="w-32 h-32 flex items-center justify-center bg-white border border-slate-100 rounded-3xl overflow-hidden relative shadow-sm p-4">
                        <PathshalaLogo />
                      </div>`;

if (content.includes(targetSplash)) {
  content = content.replace(targetSplash, replacementSplash);
  
  // also need to import PathshalaLogo
  const importTarget = `import { useState, useEffect } from 'react';`;
  const importReplacement = `import { useState, useEffect } from 'react';\nimport { PathshalaLogo } from './components/PathshalaLogo';`;
  
  if (content.includes(importTarget) && !content.includes('import { PathshalaLogo }')) {
    content = content.replace(importTarget, importReplacement);
  }
  
  fs.writeFileSync('src/App.tsx', content);
  console.log("Patched Splash Logo successfully.");
} else {
  console.log("Could not find Splash Logo target.");
}
