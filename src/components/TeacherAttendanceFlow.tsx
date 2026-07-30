import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Search, 
  Filter, 
  Check, 
  X, 
  Clock, 
  AlertCircle, 
  AlertTriangle, 
  CheckCircle2, 
  User, 
  Calendar, 
  Star, 
  BookOpen, 
  History, 
  MessageSquare, 
  Award,
  ChevronRight,
  Info,
  TrendingUp,
  Sliders,
  FileText,
  Activity
} from 'lucide-react';

interface AttendanceRecord {
  studentId: string;
  studentName: string;
  initials: string;
  status: 'Present' | 'Absent' | 'Joined Late';
  source: 'Automatically Recorded' | 'Teacher Corrected';
  remark?: string;
}

interface ClassSession {
  id: string;
  level: string;
  batch: string;
  time: string;
  date: string;
  totalStudents: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  isVerified: boolean;
  teacher: string;
  students: AttendanceRecord[];
}

interface SundayClassSession {
  id: string;
  title: string;
  level: string;
  date: string;
  presentStudents: { id: string; name: string; initials: string; bonusPoints: number }[];
  absentStudents: { id: string; name: string; initials: string }[];
}

interface TeacherAttendanceFlowProps {
  activeScreen: string;
  setActiveScreen: (screen: string) => void;
  currentLoggedInTeacher: any;
}

export function TeacherAttendanceFlow({
  activeScreen,
  setActiveScreen,
  currentLoggedInTeacher
}: TeacherAttendanceFlowProps) {
  const teacherName = currentLoggedInTeacher?.name || "Samani Pragya ji";

  // Three main tabs: 'Today', 'History', 'Sunday'
  const [activeTab, setActiveTab] = useState<'Today' | 'History' | 'Sunday'>('Today');

  // Interactive filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState('All');
  const [filterBatch, setFilterBatch] = useState('All');
  const [filterDate, setFilterDate] = useState('');

  // Selected Session for View Details Screen
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  // Correction Modal State
  const [correctingStudentId, setCorrectingStudentId] = useState<string | null>(null);
  const [correctionStatus, setCorrectionStatus] = useState<'Present' | 'Absent' | 'Joined Late'>('Present');
  const [correctionRemark, setCorrectionRemark] = useState('');

  // Pre-loaded historical and active session mock database
  const [sessions, setSessions] = useState<ClassSession[]>([
    {
      id: 'SESS001',
      level: 'Level 1: Basic Sutras & Stories',
      batch: 'Batch A - Morning',
      time: '09:00 AM - 10:00 AM',
      date: '2026-07-06',
      totalStudents: 3,
      presentCount: 2,
      absentCount: 1,
      lateCount: 0,
      isVerified: false,
      teacher: "Samani Pragya ji",
      students: [
        { studentId: 'STU001', studentName: 'Aarav Shah', initials: 'AS', status: 'Present', source: 'Automatically Recorded' },
        { studentId: 'STU002', studentName: 'Diya Patel', initials: 'DP', status: 'Present', source: 'Automatically Recorded' },
        { studentId: 'STU005', studentName: 'Siddharth Mehta', initials: 'SM', status: 'Absent', source: 'Automatically Recorded' }
      ]
    },
    {
      id: 'SESS002',
      level: 'Level 2: Jain Geography & Symbols',
      batch: 'Batch B - Afternoon',
      time: '04:00 PM - 05:00 PM',
      date: '2026-07-06',
      totalStudents: 2,
      presentCount: 1,
      absentCount: 0,
      lateCount: 1,
      isVerified: false,
      teacher: "Samani Pragya ji",
      students: [
        { studentId: 'STU003', studentName: 'Rohan Jain', initials: 'RJ', status: 'Present', source: 'Automatically Recorded' },
        { studentId: 'STU004', studentName: 'Kavya Doshi', initials: 'KD', status: 'Joined Late', source: 'Automatically Recorded', remark: 'Student Joined Late' }
      ]
    },
    // Past Sessions for History
    {
      id: 'SESS101',
      level: 'Level 1: Basic Sutras & Stories',
      batch: 'Batch A - Morning',
      time: '09:00 AM - 10:00 AM',
      date: '2026-07-03',
      totalStudents: 3,
      presentCount: 3,
      absentCount: 0,
      lateCount: 0,
      isVerified: true,
      teacher: "Samani Pragya ji",
      students: [
        { studentId: 'STU001', studentName: 'Aarav Shah', initials: 'AS', status: 'Present', source: 'Automatically Recorded' },
        { studentId: 'STU002', studentName: 'Diya Patel', initials: 'DP', status: 'Present', source: 'Automatically Recorded' },
        { studentId: 'STU005', studentName: 'Siddharth Mehta', initials: 'SM', status: 'Present', source: 'Teacher Corrected', remark: 'Network Issue resolved' }
      ]
    },
    {
      id: 'SESS102',
      level: 'Level 2: Jain Geography & Symbols',
      batch: 'Batch B - Afternoon',
      time: '04:00 PM - 05:00 PM',
      date: '2026-07-03',
      totalStudents: 2,
      presentCount: 1,
      absentCount: 1,
      lateCount: 0,
      isVerified: true,
      teacher: "Samani Pragya ji",
      students: [
        { studentId: 'STU003', studentName: 'Rohan Jain', initials: 'RJ', status: 'Present', source: 'Automatically Recorded' },
        { studentId: 'STU004', studentName: 'Kavya Doshi', initials: 'KD', status: 'Absent', source: 'Automatically Recorded' }
      ]
    },
    // For Pujya Samanji Dr. Shrutpragya ji
    {
      id: 'SESS201',
      level: 'Level 1: Basic Sutras & Stories',
      batch: 'Batch A - Morning',
      time: '09:00 AM - 10:00 AM',
      date: '2026-07-06',
      totalStudents: 2,
      presentCount: 2,
      absentCount: 0,
      lateCount: 0,
      isVerified: false,
      teacher: "Pujya Samanji Dr. Shrutpragya ji",
      students: [
        { studentId: 'STU002', studentName: 'Diya Patel', initials: 'DP', status: 'Present', source: 'Automatically Recorded' },
        { studentId: 'STU005', studentName: 'Siddharth Mehta', initials: 'SM', status: 'Present', source: 'Automatically Recorded' }
      ]
    }
  ]);

  // Sunday Classes database
  const sundayClasses: SundayClassSession[] = [
    {
      id: 'SUN001',
      title: 'Sunday Pratikraman & Values Special',
      level: 'Level 1: Basic Sutras & Stories',
      date: '2026-07-05',
      presentStudents: [
        { id: 'STU001', name: 'Aarav Shah', initials: 'AS', bonusPoints: 20 },
        { id: 'STU002', name: 'Diya Patel', initials: 'DP', bonusPoints: 20 }
      ],
      absentStudents: [
        { id: 'STU005', name: 'Siddharth Mehta', initials: 'SM' }
      ]
    },
    {
      id: 'SUN002',
      title: 'Jain Philosophy & Karma Theory Sunday Circle',
      level: 'Level 2: Jain Geography & Symbols',
      date: '2026-07-05',
      presentStudents: [
        { id: 'STU003', name: 'Rohan Jain', initials: 'RJ', bonusPoints: 30 }
      ],
      absentStudents: [
        { id: 'STU004', name: 'Kavya Doshi', initials: 'KD' }
      ]
    }
  ];

  const levels = ['All', 'Level 1: Basic Sutras & Stories', 'Level 2: Jain Geography & Symbols'];
  const batches = ['All', 'Batch A - Morning', 'Batch B - Afternoon'];

  // Resolve current session object
  const currentSession = sessions.find(s => s.id === selectedSessionId);

  // Filters calculation for History Tab
  const filteredHistorySessions = sessions.filter(sess => {
    // History only shows sessions with dates in the past, or marked as verified
    const isPast = sess.date !== '2026-07-06' || sess.isVerified;
    const matchesLevel = filterLevel === 'All' || sess.level === filterLevel;
    const matchesBatch = filterBatch === 'All' || sess.batch === filterBatch;
    const matchesDate = !filterDate || sess.date === filterDate;
    const matchesTeacher = sess.teacher === teacherName;

    return isPast && matchesLevel && matchesBatch && matchesDate && matchesTeacher;
  });

  // Today's active sessions for this teacher
  const todaysSessions = sessions.filter(sess => {
    return sess.date === '2026-07-06' && sess.teacher === teacherName;
  });

  // Filter Sunday Classes
  const filteredSundayClasses = sundayClasses.filter(sc => {
    // Only show classes matching teacher's students levels
    const isL1Teacher = teacherName === "Samani Pragya ji";
    if (isL1Teacher && sc.level.includes('Level 1')) return true;
    if (!isL1Teacher && sc.level.includes('Level 2')) return true;
    return true;
  });

  // Handle Verify Attendance
  const handleVerifyAttendance = () => {
    if (!selectedSessionId) return;
    setSessions(prev => prev.map(s => {
      if (s.id === selectedSessionId) {
        return { ...s, isVerified: true };
      }
      return s;
    }));
    alert("Attendance list verified and locked successfully!");
    setSelectedSessionId(null);
  };

  // Handle correcting attendance for a student
  const handleSaveCorrection = () => {
    if (!selectedSessionId || !correctingStudentId) return;

    setSessions(prev => prev.map(sess => {
      if (sess.id === selectedSessionId) {
        let updatedStudents = sess.students.map(stu => {
          if (stu.studentId === correctingStudentId) {
            return {
              ...stu,
              status: correctionStatus,
              source: 'Teacher Corrected' as const,
              remark: correctionRemark || 'Teacher Corrected'
            };
          }
          return stu;
        });

        // Recalculate present / absent / late counters
        const present = updatedStudents.filter(s => s.status === 'Present').length;
        const absent = updatedStudents.filter(s => s.status === 'Absent').length;
        const late = updatedStudents.filter(s => s.status === 'Joined Late').length;

        return {
          ...sess,
          students: updatedStudents,
          presentCount: present,
          absentCount: absent,
          lateCount: late
        };
      }
      return sess;
    }));

    setCorrectingStudentId(null);
    setCorrectionRemark('');
    alert("Student attendance correction successfully saved!");
  };

  // ATTENDANCE DETAILS VIEW
  if (activeScreen === 'TeacherAttendanceDetails' && currentSession) {
    // Filter students inside session by search query
    const filteredStudents = currentSession.students.filter(stu => {
      return stu.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || 
             stu.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="h-full bg-slate-50 overflow-y-auto pb-24 text-slate-800"
      >
        {/* Sticky Header */}
        <div className="bg-white px-5 py-4 flex items-center justify-between border-b border-slate-200 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => { 
                setActiveScreen('TeacherAttendance'); 
                setSelectedSessionId(null);
                setSearchQuery('');
              }} 
              className="p-2 hover:bg-slate-100 rounded-full transition-colors active:scale-95 cursor-pointer"
            >
              <ArrowRight className="w-5 h-5 text-slate-700 rotate-180" />
            </button>
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight">Attendance Details</h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase font-mono mt-0.5">{currentSession.batch}</p>
            </div>
          </div>
          <span className={`text-[9px] font-black px-2 py-1 rounded border uppercase ${
            currentSession.isVerified 
              ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
              : 'bg-amber-50 text-amber-700 border-amber-100'
          }`}>
            {currentSession.isVerified ? '✓ Verified' : 'Pending Verification'}
          </span>
        </div>

        <div className="p-5 space-y-5">
          {/* Class Session Stats Banner */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <div>
                <p className="text-[10px] text-slate-400 font-black uppercase">Session Level</p>
                <p className="text-sm font-bold text-slate-800 mt-0.5">{currentSession.level}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400 font-black uppercase">Schedule</p>
                <p className="text-xs font-mono font-bold text-slate-700 mt-0.5">{currentSession.time}</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400">Total</p>
                <p className="text-lg font-black text-slate-800 mt-0.5">{currentSession.totalStudents}</p>
              </div>
              <div className="bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100/50">
                <p className="text-[10px] font-bold text-emerald-600">Present</p>
                <p className="text-lg font-black text-emerald-800 mt-0.5">{currentSession.presentCount}</p>
              </div>
              <div className="bg-rose-50/50 p-2.5 rounded-xl border border-rose-100/50">
                <p className="text-[10px] font-bold text-rose-600">Absent</p>
                <p className="text-lg font-black text-rose-800 mt-0.5">{currentSession.absentCount}</p>
              </div>
              <div className="bg-amber-50/50 p-2.5 rounded-xl border border-amber-100/50">
                <p className="text-[10px] font-bold text-amber-600">Late</p>
                <p className="text-lg font-black text-amber-800 mt-0.5">{currentSession.lateCount}</p>
              </div>
            </div>
          </div>

          {/* Quick Notice about Automation */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 shadow-sm flex gap-3">
            <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-800 leading-relaxed">
              <strong>Attendance is Automatically Generated</strong> after the live class based on student login/participation. You only need to verify and apply manual corrections if a student had tech issues or informed you beforehand.
            </p>
          </div>

          {/* Search bar inside details */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search student inside batch..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-slate-900 text-xs font-semibold border border-slate-200 rounded-xl py-2.5 pl-9 pr-4 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Student Attendance List */}
          <div className="space-y-3">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider ml-1">Student Attendance Statuses</h3>

            {filteredStudents.length === 0 ? (
              <p className="text-xs text-slate-400 italic text-center py-4">No matching students found in this batch.</p>
            ) : (
              filteredStudents.map((stu) => {
                const isCorrected = stu.source === 'Teacher Corrected';
                return (
                  <div key={stu.studentId} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                    <div className="flex justify-between items-start">
                      {/* Photo/Initials + Name */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center border border-slate-100 shrink-0">
                          {stu.initials}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-800">{stu.studentName}</h4>
                          <p className="text-[10px] font-mono text-slate-500 mt-0.5">ID: {stu.studentId}</p>
                        </div>
                      </div>

                      {/* Status Badges */}
                      <div className="text-right space-y-1.5">
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded border uppercase tracking-wider ${
                          stu.status === 'Present' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                          stu.status === 'Absent' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                          'bg-amber-50 text-amber-700 border-amber-100'
                        }`}>
                          {stu.status === 'Present' ? '🟢 Present' : 
                           stu.status === 'Absent' ? '🔴 Absent' : 
                           '🟡 Joined Late'}
                        </span>
                        
                        <div className="flex items-center justify-end gap-1">
                          <span className={`text-[8px] font-bold uppercase tracking-wider px-1 py-0.5 rounded ${
                            isCorrected ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {stu.source}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Display Teacher remark if exists */}
                    {stu.remark && (
                      <div className="mt-3 bg-slate-50 border border-slate-100 p-2 rounded-lg text-[11px] text-slate-600 flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                        <span className="italic">"Remark: {stu.remark}"</span>
                      </div>
                    )}

                    {/* Quick Correct Action */}
                    {!currentSession.isVerified && (
                      <div className="mt-3.5 pt-3.5 border-t border-slate-100 flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setCorrectingStudentId(stu.studentId);
                            setCorrectionStatus(stu.status);
                            setCorrectionRemark(stu.remark || '');
                          }}
                          className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-[10px] rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Sliders className="w-3 h-3 text-slate-500" />
                          Correct Attendance
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Verification Lock Controls */}
          {!currentSession.isVerified && (
            <div className="pt-4">
              <button
                onClick={handleVerifyAttendance}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Verify & Lock Session Attendance</span>
              </button>
              <p className="text-[10px] text-slate-400 text-center mt-2 font-medium">
                *Once verified, records will be synchronized with the Student Academic Portal and cannot be changed.
              </p>
            </div>
          )}
        </div>

        {/* Correction Dialog / Overlay Popup */}
        <AnimatePresence>
          {correctingStudentId && (() => {
            const stuObj = currentSession.students.find(s => s.studentId === correctingStudentId);
            return (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-slate-900/60 flex items-center justify-center p-5 z-50 text-slate-800"
              >
                <motion.div 
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.95 }}
                  className="bg-white rounded-3xl p-5 w-full max-w-sm border border-slate-200 shadow-xl space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-base font-black text-slate-900">Correct Attendance</h3>
                    <button 
                      onClick={() => setCorrectingStudentId(null)}
                      className="p-1.5 hover:bg-slate-100 rounded-full cursor-pointer"
                    >
                      <X className="w-4 h-4 text-slate-500" />
                    </button>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Correcting For</p>
                    <p className="text-sm font-bold text-slate-700 mt-0.5">{stuObj?.studentName}</p>
                    <p className="text-[10px] font-mono text-slate-400">ID: {stuObj?.studentId}</p>
                  </div>

                  {/* Radio Choice Status Selection */}
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Select Status</p>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Present', 'Absent', 'Joined Late'] as const).map((st) => (
                        <button
                          key={st}
                          onClick={() => setCorrectionStatus(st)}
                          className={`py-2 px-1 text-xs font-bold rounded-lg border text-center cursor-pointer transition-colors ${
                            correctionStatus === st
                              ? st === 'Present' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                                st === 'Absent' ? 'bg-rose-50 text-rose-800 border-rose-300' :
                                'bg-amber-50 text-amber-800 border-amber-300'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-600'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Preset Remarks selection dropdown */}
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Attendance Remark</p>
                    <select
                      value={correctionRemark}
                      onChange={(e) => setCorrectionRemark(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    >
                      <option value="">-- No Remark --</option>
                      <option value="Network Issue">Network Issue</option>
                      <option value="Student Joined Late">Student Joined Late</option>
                      <option value="Technical Issue">Technical Issue</option>
                      <option value="Medical Leave">Medical Leave</option>
                      <option value="Informed Absence">Informed Absence</option>
                    </select>
                  </div>

                  {/* Submit buttons */}
                  <div className="grid grid-cols-2 gap-2.5 pt-2">
                    <button
                      onClick={() => setCorrectingStudentId(null)}
                      className="py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 font-bold text-xs rounded-xl cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveCorrection}
                      className="py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer shadow-xs"
                    >
                      Save Correction
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </motion.div>
    );
  }

  // ATTENDANCE MAIN SCREEN
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full bg-slate-50 overflow-y-auto pb-24 text-slate-800"
    >
      {/* Header */}
      <div className="bg-white px-5 pt-8 pb-4 border-b border-slate-200 sticky top-0 z-20">
        <div className="flex items-center gap-3 mb-4">
          <button 
            onClick={() => setActiveScreen('TeacherDashboard')} 
            className="p-2 hover:bg-slate-100 rounded-full transition-colors active:scale-95 cursor-pointer"
          >
            <ArrowRight className="w-5 h-5 text-slate-700 rotate-180" />
          </button>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Class Attendance</h1>
        </div>

        {/* 3 Main Tabs: Today's Attendance, Attendance History, Sunday Classes */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-4">
          {(['Today', 'History', 'Sunday'] as const).map((tab) => {
            let label = "Today's Class";
            if (tab === 'History') label = "History";
            if (tab === 'Sunday') label = "Sunday Classes";

            return (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setSearchQuery('');
                  setFilterLevel('All');
                  setFilterBatch('All');
                }}
                className={`flex-1 py-2.5 font-bold text-xs rounded-lg cursor-pointer transition-all ${
                  activeTab === tab
                    ? 'bg-white text-slate-800 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Search & Filters for History Tab */}
        {activeTab === 'History' && (
          <div className="space-y-3">
            {/* Search Bar */}
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search history by student name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100 text-slate-900 text-sm font-medium rounded-xl py-3 pl-11 pr-4 border-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-500"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
              <div className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 rounded-lg text-slate-500 border border-slate-200 shrink-0">
                <Filter className="w-3.5 h-3.5" />
                <span className="text-[10px] font-black uppercase">Filters</span>
              </div>

              {/* Date Filter */}
              <input 
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="shrink-0 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-lg px-2.5 py-1 focus:ring-2 focus:ring-blue-500 cursor-pointer h-7"
              />

              {/* Level Filter */}
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="shrink-0 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-lg px-2.5 py-1 focus:ring-2 focus:ring-blue-500 cursor-pointer h-7"
              >
                {levels.map(level => (
                  <option key={level} value={level}>
                    {level === 'All' ? 'All Levels' : level.split(':')[0]}
                  </option>
                ))}
              </select>

              {/* Batch Filter */}
              <select
                value={filterBatch}
                onChange={(e) => setFilterBatch(e.target.value)}
                className="shrink-0 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-lg px-2.5 py-1 focus:ring-2 focus:ring-blue-500 cursor-pointer h-7"
              >
                {batches.map(batch => (
                  <option key={batch} value={batch}>
                    {batch === 'All' ? 'All Batches' : batch}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Main Tab Contents */}
      <div className="p-5">
        
        {/* TODAY'S ATTENDANCE TAB */}
        {activeTab === 'Today' && (
          <div className="space-y-4">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-wider ml-1">Today's Active Classes</h2>
            
            {todaysSessions.length === 0 ? (
              <div className="text-center py-12 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-sm font-bold text-slate-600">No classes scheduled today</p>
                <p className="text-xs text-slate-400 mt-1">There are no classes scheduled for you today.</p>
              </div>
            ) : (
              todaysSessions.map((sess) => (
                <div key={sess.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] font-black text-blue-500 uppercase tracking-wider">{sess.level}</p>
                      <h3 className="text-base font-black text-slate-800 mt-0.5">{sess.batch}</h3>
                      <p className="text-xs text-slate-400 font-bold mt-1 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {sess.time}
                      </p>
                    </div>
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded border uppercase tracking-wider ${
                      sess.isVerified 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                        : 'bg-amber-50 text-amber-700 border-amber-100'
                    }`}>
                      {sess.isVerified ? '✓ Verified' : 'Pending'}
                    </span>
                  </div>

                  {/* Summary grid */}
                  <div className="grid grid-cols-3 gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Total Students</p>
                      <p className="text-sm font-black text-slate-700 mt-0.5">{sess.totalStudents}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-emerald-500 uppercase">Present</p>
                      <p className="text-sm font-black text-emerald-800 mt-0.5">{sess.presentCount}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-rose-500 uppercase">Absent</p>
                      <p className="text-sm font-black text-rose-800 mt-0.5">{sess.absentCount}</p>
                    </div>
                  </div>

                  {/* Action view details */}
                  <button
                    onClick={() => {
                      setSelectedSessionId(sess.id);
                      setActiveScreen('TeacherAttendanceDetails');
                    }}
                    className="w-full py-2.5 bg-white text-slate-700 border border-slate-200 font-bold text-xs rounded-xl hover:bg-slate-50 transition-colors cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    View Attendance
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {/* ATTENDANCE HISTORY TAB */}
        {activeTab === 'History' && (
          <div className="space-y-4">
            <div className="flex justify-between items-end ml-1">
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-wider">Past Verification Records</h2>
              <span className="text-xs font-bold text-slate-500">{filteredHistorySessions.length} Records</span>
            </div>

            {filteredHistorySessions.length === 0 ? (
              <div className="text-center py-12 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <History className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-sm font-bold text-slate-600">No historical records found</p>
                <p className="text-xs text-slate-400 mt-1">Try adjusting filters or checking other dates.</p>
              </div>
            ) : (
              filteredHistorySessions.map((sess) => (
                <div key={sess.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3 hover:border-slate-300 transition-all">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] font-mono text-slate-400 font-bold">{sess.date}</p>
                      <h3 className="text-sm font-black text-slate-800 mt-0.5">{sess.batch}</h3>
                      <p className="text-[10px] font-bold text-slate-500 mt-1">{sess.level.split(':')[0]}</p>
                    </div>
                    <span className="text-[9px] font-black px-2 py-0.5 rounded border uppercase tracking-wider bg-slate-50 text-slate-500 border-slate-200">
                      Archive Locked
                    </span>
                  </div>

                  {/* Class performance statistics */}
                  <div className="grid grid-cols-4 gap-2 text-center text-xs bg-slate-50/50 p-2 rounded-xl border border-slate-100">
                    <div>
                      <span className="text-[9px] text-slate-400 font-bold block">Size</span>
                      <span className="font-bold text-slate-700">{sess.totalStudents}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-emerald-500 font-bold block">Pres.</span>
                      <span className="font-bold text-emerald-700">{sess.presentCount}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-rose-500 font-bold block">Abs.</span>
                      <span className="font-bold text-rose-700">{sess.absentCount}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-amber-500 font-bold block">Late</span>
                      <span className="font-bold text-amber-700">{sess.lateCount}</span>
                    </div>
                  </div>

                  {/* Action details */}
                  <button
                    onClick={() => {
                      setSelectedSessionId(sess.id);
                      setActiveScreen('TeacherAttendanceDetails');
                    }}
                    className="w-full py-2 bg-slate-50 text-slate-700 border border-slate-150 font-bold text-xs rounded-xl hover:bg-slate-100 transition-colors cursor-pointer active:scale-95 flex items-center justify-center gap-1"
                  >
                    View History List
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {/* SUNDAY CLASSES TAB */}
        {activeTab === 'Sunday' && (
          <div className="space-y-5">
            {/* Sunday Notice Alert */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 shadow-sm flex gap-3">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500 shrink-0 mt-0.5 animate-spin" style={{ animationDuration: '6s' }} />
              <div>
                <h4 className="text-xs font-black text-amber-900 uppercase tracking-wide">Sunday Class Notice</h4>
                <p className="text-[11px] text-amber-800 leading-relaxed mt-1">
                  Sunday attendance is **completely optional** for students. Students attending receive **Bonus Points** only. Absent students are **NOT marked absent** and Sunday classes will **NEVER affect their overall Attendance Percentage**.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-wider ml-1">Special Sunday Sessions</h2>

              {filteredSundayClasses.map((sc) => (
                <div key={sc.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                  <div>
                    <span className="text-[9px] font-mono text-slate-400 font-bold">{sc.date}</span>
                    <h3 className="text-base font-black text-slate-900 mt-0.5">{sc.title}</h3>
                    <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-wide">{sc.level}</p>
                  </div>

                  {/* Sunday lists */}
                  <div className="space-y-3.5">
                    {/* Present list */}
                    <div>
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5" />
                        Present Students (+Bonus Points awarded)
                      </p>
                      <div className="space-y-2">
                        {sc.presentStudents.map(stu => (
                          <div key={stu.id} className="flex justify-between items-center text-xs bg-emerald-50/35 border border-emerald-100 p-2.5 rounded-xl">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0">
                                {stu.initials}
                              </div>
                              <div>
                                <span className="font-bold text-slate-800">{stu.name}</span>
                                <span className="text-[9px] font-mono text-slate-400 block">ID: {stu.id}</span>
                              </div>
                            </div>
                            <span className="text-[10px] font-black text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                              +{stu.bonusPoints} PTS
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Absent list */}
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5 text-slate-400" />
                        Students Absent (No Penalty / Not Marked)
                      </p>
                      <div className="space-y-2">
                        {sc.absentStudents.map(stu => (
                          <div key={stu.id} className="flex items-center gap-2 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                            <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 font-bold flex items-center justify-center shrink-0">
                              {stu.initials}
                            </div>
                            <div>
                              <span className="font-bold text-slate-500">{stu.name}</span>
                              <span className="text-[9px] font-mono text-slate-400 block">ID: {stu.id}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
