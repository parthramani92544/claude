const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace("{/* Today's Motivation - Elegant Quote Block */} */} ", "{/* Today's Motivation - Elegant Quote Block */} ");
fs.writeFileSync('src/App.tsx', content);
