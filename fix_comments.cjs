const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

let lines = content.split('\n');
let fixedLines = lines.map(line => {
  if (line.includes('{/*') && !line.includes('*/}')) {
    // Check if the line has unclosed comment
    // we replaced " */}" with " "
    return line + "*/}";
  }
  return line;
});

fs.writeFileSync('src/App.tsx', fixedLines.join('\n'));
