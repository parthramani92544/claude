const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const target = `                              setRegisteredStudentsList(prev => [...prev, lastChild]);
                              setIsSimulatedApproved(true);
                              setIsGurujiApproved(true);
                              setActiveScreen('RegisterMoreQuestion');
                            }}
                            className="w-full py-4 bg-rose-900 hover:bg-rose-950 text-white font-black text-sm rounded-full shadow-lg shadow-rose-950/15 flex items-center justify-center gap-2 cursor-pointer transition-all"`;

const replacement = `                              setRegisteredStudentsList(prev => [...prev, lastChild]);
                              
                              setStudent({
                                name: \`\${lastChild.firstName} \${lastChild.surname}\`,
                                level: lastChild.level,
                                batch: lastChild.batch || "Saturdays, 05:30 PM",
                                attendanceScore: 200,
                                gathaScore: 250,
                                bonusPoints: 0,
                                attendance: 91,
                                gathasCount: 36,
                                rank: "Top 5%",
                                badge: "Star Reciter",
                                profileImage: lastChild.photo,
                                quizHistory: []
                              });
                              setIsGurujiApproved(true);
                              localStorage.setItem('shalaSession', 'active');
                              setActiveScreen('Home');
                            }}
                            className="w-full py-4 bg-rose-900 hover:bg-rose-950 text-white font-black text-sm rounded-full shadow-lg shadow-rose-950/15 flex items-center justify-center gap-2 cursor-pointer transition-all"`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync('src/App.tsx', content);
  console.log('Patched step 3 submit!');
} else {
  console.log('Target not found.');
}
