const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');
const target = "import UnifiedAudioPlayer from './components/UnifiedAudioPlayer';";
const replacement = "import UnifiedAudioPlayer from './components/UnifiedAudioPlayer';\nimport { PathshalaLogo } from './components/PathshalaLogo';";

if (content.includes(target) && !content.includes("import { PathshalaLogo }")) {
  content = content.replace(target, replacement);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Fixed import");
}
