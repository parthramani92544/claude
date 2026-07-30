const fs = require('fs');
let content = fs.readFileSync('src/components/PathshalaLogo.tsx', 'utf8');

const newSvg = `<svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logo-red-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#831028" />
        <stop offset="100%" stopColor="#df262b" />
      </linearGradient>
      
      <linearGradient id="logo-red-grad-rev" x1="100%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#831028" />
        <stop offset="100%" stopColor="#df262b" />
      </linearGradient>

      <radialGradient id="logo-yellow-grad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fad745" />
        <stop offset="60%" stopColor="#f3a71b" />
        <stop offset="100%" stopColor="#e57614" />
      </radialGradient>
    </defs>
    
    <circle cx="50" cy="50" r="5" fill="url(#logo-yellow-grad)" />

    <g>
      {[0, 90, 180, 270].map(angle => (
        <g key={angle} transform={\`rotate(\${angle} 50 50)\`}>
          {/* Main arm */}
          <polygon points="36,0 44,0 44,38 36,30" fill="url(#logo-red-grad)" />
          
          {/* Diagonal arm */}
          <polygon points="48,32 53.6,37.6 77.6,13.6 72,8" fill="url(#logo-red-grad-rev)" />
        </g>
      ))}
    </g>
  </svg>`;

content = content.replace(/<svg[\s\S]*<\/svg>/, newSvg);
fs.writeFileSync('src/components/PathshalaLogo.tsx', content);
console.log("Logo updated to exact geometric match with correct gradients.");
