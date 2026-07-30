const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const target = `                    </motion.div>
                  );
                })}
                 {/* 12. BONUS EVENT SCREEN */}`;

const replacement = `                    </motion.div>
                  );
                })()}
                 {/* 12. BONUS EVENT SCREEN */}`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Fixed IIFE.");
} else {
  console.log("Could not find target.");
}
