const fs = require('fs');
let content = fs.readFileSync('src/types.ts', 'utf8');

const target = `  promotionStatus?: 'Learning' | 'Revision Pending' | 'Awaiting Promotion' | 'Promoted';
}`;

const replacement = `  promotionStatus?: 'Learning' | 'Revision Pending' | 'Awaiting Promotion' | 'Promoted';
  batch?: string;
  teacher?: string;
  classTiming?: string;
  batchChangesRemaining?: number;
  lastBatchChangeMonth?: string;
}`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync('src/types.ts', content);
  console.log("Updated Student interface in types.ts");
} else {
  console.log("Could not find target in types.ts");
}
