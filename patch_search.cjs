const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetSearchStart = `                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setActiveScreen('Notifications')}
                          className="w-9 h-9 bg-cream-200 hover:bg-cream-300 rounded-full flex items-center justify-center relative active:scale-95 transition-all cursor-pointer"
                        >
                          <Bell className="w-4.5 h-4.5 text-navy-950" />
                          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full" />
                        </button>`;

const searchReplacement = `                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setActiveScreen('Search')}
                          className="w-9 h-9 bg-cream-200 hover:bg-cream-300 rounded-full flex items-center justify-center relative active:scale-95 transition-all cursor-pointer"
                        >
                          <Search className="w-4 h-4 text-navy-950" />
                        </button>
                        <button 
                          onClick={() => setActiveScreen('Notifications')}
                          className="w-9 h-9 bg-cream-200 hover:bg-cream-300 rounded-full flex items-center justify-center relative active:scale-95 transition-all cursor-pointer"
                        >
                          <Bell className="w-4.5 h-4.5 text-navy-950" />
                          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full" />
                        </button>`;

if (content.includes(targetSearchStart)) {
  content = content.replace(targetSearchStart, searchReplacement);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Search icon added");
} else {
  console.log("Search target not found");
}
