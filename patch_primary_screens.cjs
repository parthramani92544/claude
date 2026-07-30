const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetStart = `    const primaryScreens = ['Splash', 'Language', 'Welcome', 'Login', 'Home', 'LiveClassList', 'SutraList', 'BonusEvent', 'Profile'];`;

const replacement = `    const primaryScreens = ['Splash', 'Language', 'Welcome', 'Login', 'Home', 'LiveClassList', 'SutraList', 'Niyam', 'BonusEvent', 'Profile'];`;

if (content.includes(targetStart)) {
  content = content.replace(targetStart, replacement);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Updated primaryScreens successfully.");
} else {
  console.log("Target primaryScreens not found.");
}
