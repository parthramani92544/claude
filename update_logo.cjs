const fs = require('fs');
let content = fs.readFileSync('src/components/PathshalaLogo.tsx', 'utf8');

const newSvg = `<svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="logo-red-grad" cx="50%" cy="50%" r="70%">
        <stop offset="15%" stopColor="#f97316" />
        <stop offset="45%" stopColor="#be123c" />
        <stop offset="100%" stopColor="#4c0519" />
      </radialGradient>
      <radialGradient id="logo-yellow-grad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="60%" stopColor="#eab308" />
        <stop offset="100%" stopColor="#c2410c" />
      </radialGradient>
    </defs>
    
    <circle cx="50" cy="50" r="5" fill="url(#logo-yellow-grad)" />

    <g fill="url(#logo-red-grad)">
      {[0, 90, 180, 270].map(angle => (
        <g key={angle} transform={\`rotate(\${angle} 50 50)\`}>
          {/* Main arm */}
          <polygon points="38,0 46,0 46,42 38,34" />
          
          {/* Diagonal arm */}
          <polygon points="52,33 57.5,38.5 82.5,13.5 77,8" />
        </g>
      ))}
    </g>
  </svg>`;

content = content.replace(/<svg[\s\S]*<\/svg>/, newSvg);
fs.writeFileSync('src/components/PathshalaLogo.tsx', content);
console.log("Logo updated to exact geometric match.");
