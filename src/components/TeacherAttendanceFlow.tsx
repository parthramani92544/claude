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
  Award,
  ChevronRight,
  Info,
  SlidersHorizontal,
  Landmark,
  GraduationCap,
  Users,
  UserCheck,
  UserX,
  Globe,
  ShieldCheck,
  Flower2,
  Eye
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
  levelNumber: number;
  levelSubtitle: string;
  batch: string;
  startTime: string;
  endTime: string;
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

  // Two main tabs: 'Today', 'History'
  const [activeTab, setActiveTab] = useState<'Today' | 'History'>('Today');

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
      levelNumber: 1,
      levelSubtitle: 'Basic Sutras & Stories',
      batch: 'Batch A – Morning',
      startTime: '09:00 AM',
      endTime: '10:00 AM',
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
      levelNumber: 2,
      levelSubtitle: 'Jain Geography & Symbols',
      batch: 'Batch B – Afternoon',
      startTime: '04:00 PM',
      endTime: '05:00 PM',
      time: '04:00 PM - 05:00 PM',
      date: '2026-07-06',
      totalStudents: 3,
      presentCount: 2,
      absentCount: 1,
      lateCount: 0,
      isVerified: false,
      teacher: "Samani Pragya ji",
      students: [
        { studentId: 'STU003', studentName: 'Rohan Jain', initials: 'RJ', status: 'Present', source: 'Automatically Recorded' },
        { studentId: 'STU004', studentName: 'Kavya Doshi', initials: 'KD', status: 'Present', source: 'Automatically Recorded' },
        { studentId: 'STU006', studentName: 'Ananya Singhi', initials: 'AS', status: 'Absent', source: 'Automatically Recorded' }
      ]
    },
    // Past Sessions for History matching SS
    {
      id: 'SESS101',
      level: 'Level 1: Basic Sutras & Stories',
      levelNumber: 1,
      levelSubtitle: 'Basic Sutras & Stories',
      batch: 'Batch A – Morning',
      startTime: '09:00 AM',
      endTime: '10:00 AM',
      time: '09:00 AM - 10:00 AM',
      date: '2026-07-03',
      totalStudents: 3,
      presentCount: 2,
      absentCount: 1,
      lateCount: 0,
      isVerified: true,
      teacher: "Samani Pragya ji",
      students: [
        { studentId: 'STU001', studentName: 'Aarav Shah', initials: 'AS', status: 'Present', source: 'Automatically Recorded' },
        { studentId: 'STU002', studentName: 'Diya Patel', initials: 'DP', status: 'Present', source: 'Automatically Recorded' },
        { studentId: 'STU005', studentName: 'Siddharth Mehta', initials: 'SM', status: 'Absent', source: 'Automatically Recorded' }
      ]
    },
    {
      id: 'SESS102',
      level: 'Level 2: Jain Geography & Symbols',
      levelNumber: 2,
      levelSubtitle: 'Jain Geography & Symbols',
      batch: 'Batch B – Afternoon',
      startTime: '04:00 PM',
      endTime: '05:00 PM',
      time: '04:00 PM - 05:00 PM',
      date: '2026-07-03',
      totalStudents: 3,
      presentCount: 2,
      absentCount: 1,
      lateCount: 0,
      isVerified: true,
      teacher: "Samani Pragya ji",
      students: [
        { studentId: 'STU003', studentName: 'Rohan Jain', initials: 'RJ', status: 'Present', source: 'Automatically Recorded' },
        { studentId: 'STU004', studentName: 'Kavya Doshi', initials: 'KD', status: 'Present', source: 'Automatically Recorded' },
        { studentId: 'STU006', studentName: 'Ananya Singhi', initials: 'AS', status: 'Absent', source: 'Automatically Recorded' }
      ]
    },
    {
      id: 'SESS103',
      level: 'Level 3: Ethics & Values',
      levelNumber: 3,
      levelSubtitle: 'Ethics & Values',
      batch: 'Batch C – Evening',
      startTime: '06:00 PM',
      endTime: '07:00 PM',
      time: '06:00 PM - 07:00 PM',
      date: '2026-07-02',
      totalStudents: 3,
      presentCount: 2,
      absentCount: 1,
      lateCount: 0,
      isVerified: true,
      teacher: "Samani Pragya ji",
      students: [
        { studentId: 'STU007', studentName: 'Veer Gandhi', initials: 'VG', status: 'Present', source: 'Automatically Recorded' },
        { studentId: 'STU008', studentName: 'Moksh Vora', initials: 'MV', status: 'Present', source: 'Automatically Recorded' },
        { studentId: 'STU009', studentName: 'Prisha Kothari', initials: 'PK', status: 'Absent', source: 'Automatically Recorded' }
      ]
    },
    // For Pujya Samanji Dr. Shrutpragya ji
    {
      id: 'SESS201',
      level: 'Level 1: Basic Sutras & Stories',
      levelNumber: 1,
      levelSubtitle: 'Basic Sutras & Stories',
      batch: 'Batch A – Morning',
      startTime: '09:00 AM',
      endTime: '10:00 AM',
      time: '09:00 AM - 10:00 AM',
      date: '2026-07-06',
      totalStudents: 3,
      presentCount: 2,
      absentCount: 1,
      lateCount: 0,
      isVerified: false,
      teacher: "Pujya Samanji Dr. Shrutpragya ji",
      students: [
        { studentId: 'STU002', studentName: 'Diya Patel', initials: 'DP', status: 'Present', source: 'Automatically Recorded' },
        { studentId: 'STU005', studentName: 'Siddharth Mehta', initials: 'SM', status: 'Present', source: 'Automatically Recorded' },
        { studentId: 'STU007', studentName: 'Veer Gandhi', initials: 'VG', status: 'Absent', source: 'Automatically Recorded' }
      ]
    }
  ]);

  const levels = ['All', 'Level 1: Basic Sutras & Stories', 'Level 2: Jain Geography & Symbols'];
  const batches = ['All', 'Batch A – Morning', 'Batch B – Afternoon'];

  // Resolve current session object
  const currentSession = sessions.find(s => s.id === selectedSessionId);

  // Filters calculation for History Tab (without filter dropdowns)
  const filteredHistorySessions = sessions.filter(sess => {
    const isPast = sess.date !== '2026-07-06' || sess.isVerified;
    const matchesTeacher = sess.teacher === teacherName;
    const matchesSearch = !searchQuery || 
      sess.batch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sess.level.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sess.levelSubtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sess.date.includes(searchQuery);

    return isPast && matchesTeacher && matchesSearch;
  });

  // Today's active sessions for this teacher
  const todaysSessions = sessions.filter(sess => {
    return sess.date === '2026-07-06' && sess.teacher === teacherName;
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
  };

  // ==========================================
  // SCREEN 2: ATTENDANCE DETAILS VIEW (MATCHING SS)
  // ==========================================
  if (activeScreen === 'TeacherAttendanceDetails' && currentSession) {
    const displayBatch = currentSession.batch.replace('–', '•').replace('-', '•');

    return (
      <motion.div
        initial={{ opacity: 0, x: 15 }}
        animate={{ opacity: 1, x: 0 }}
        className="min-h-full bg-[#FCFAF7] pb-28 text-slate-800"
      >
        {/* Header */}
        <div className="bg-[#FCFAF7] px-5 pt-8 pb-3 border-b border-[#EEDBBD]/50 sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => { 
                  setActiveScreen('TeacherAttendance'); 
                  setSelectedSessionId(null);
                  setSearchQuery('');
                }} 
                className="p-2 hover:bg-black/5 rounded-full transition-colors active:scale-95 cursor-pointer text-slate-700"
              >
                <ArrowRight className="w-5 h-5 rotate-180" />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold font-serif text-[#1C4D36] tracking-tight">
                  Attendance Details
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                  {displayBatch}
                </p>
              </div>
            </div>

            {/* Status Pill */}
            <div className={`border rounded-2xl px-3.5 py-2 flex items-center gap-2 shadow-2xs ${
              currentSession.isVerified
                ? 'bg-[#EBF7EE] border-[#C8E6C9] text-[#1C4D36]'
                : 'bg-[#FEF7EC] border-[#FDE68A] text-[#B45309]'
            }`}>
              <ShieldCheck className={`w-5 h-5 ${currentSession.isVerified ? 'text-[#1C4D36]' : 'text-[#B45309]'}`} />
              <div className="text-left">
                <p className="text-[10px] font-extrabold uppercase leading-tight">
                  {currentSession.isVerified ? 'Verified' : 'Pending'}
                </p>
                <p className="text-[10px] font-extrabold uppercase leading-tight">
                  {currentSession.isVerified ? 'Locked' : 'Verification'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-5 space-y-4 max-w-lg mx-auto">
          {/* HORIZONTAL LINE SUMMARY: Time placed before Total, Present, and Absent counts */}
          <div className="bg-white rounded-2xl p-2.5 sm:p-3 border border-[#EDE8DE] shadow-xs flex items-center justify-between gap-1.5 text-xs overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {/* Time Block (Placed before counts) */}
            <div className="flex items-center gap-1.5 bg-[#FAF7F2] border border-[#EDE8DE] px-2.5 py-1.5 rounded-xl text-slate-800 font-bold whitespace-nowrap shrink-0">
              <Clock className="w-3.5 h-3.5 text-[#1C4D36] shrink-0" />
              <span>{currentSession.startTime} - {currentSession.endTime}</span>
            </div>

            {/* Counts in the horizontal line */}
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              <span className="bg-[#F6F4FC] text-[#7C3AED] border border-[#E9E3F7] px-2 py-1.5 rounded-xl font-bold whitespace-nowrap">
                Total: {currentSession.totalStudents}
              </span>
              <span className="bg-[#F0FAF3] text-[#1C4D36] border border-[#D1F0DC] px-2 py-1.5 rounded-xl font-bold whitespace-nowrap">
                Present: {currentSession.presentCount}
              </span>
              <span className="bg-[#FEF2F2] text-[#DC2626] border border-[#FED7D7] px-2 py-1.5 rounded-xl font-bold whitespace-nowrap">
                Absent: {currentSession.absentCount}
              </span>
            </div>
          </div>

          {/* Section Title */}
          <div className="pt-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
              STUDENT ATTENDANCE STATUSES
            </p>
          </div>

          {/* Student Cards List */}
          <div className="space-y-3">
            {currentSession.students.map((stu) => {
              const isPresent = stu.status === 'Present';

              return (
                <div 
                  key={stu.studentId}
                  className="bg-white border border-[#EDE8DE] rounded-[24px] p-3.5 sm:p-4 shadow-xs flex items-center justify-between gap-2.5 hover:border-[#D5EBDC] transition-all"
                >
                  {/* Left: Avatar, Name & ID */}
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-11 h-11 rounded-full bg-[#EBF5EE] text-[#1C4D36] font-bold text-sm flex items-center justify-center shrink-0 border border-[#D5EBDC]">
                      {stu.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm sm:text-base font-bold font-serif text-slate-900 leading-snug truncate">
                        {stu.studentName}
                      </h4>
                      <p className="text-[11px] font-mono text-slate-400 mt-0.5 tracking-wider">
                        ID: {stu.studentId}
                      </p>
                    </div>
                  </div>

                  {/* Right: Status Pill & Correct Button */}
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    {/* Status Pill */}
                    {isPresent ? (
                      <span className="bg-[#EBF7EE] text-[#1C4D36] px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1.5 whitespace-nowrap">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>
                        <span>PRESENT</span>
                      </span>
                    ) : (
                      <span className="bg-[#FEF2F2] text-[#DC2626] px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1.5 whitespace-nowrap">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]"></span>
                        <span>ABSENT</span>
                      </span>
                    )}

                    {/* Correct Attendance Button */}
                    {!currentSession.isVerified && (
                      <button
                        type="button"
                        onClick={() => {
                          setCorrectingStudentId(stu.studentId);
                          setCorrectionStatus(stu.status === 'Joined Late' ? 'Present' : stu.status);
                          setCorrectionRemark(stu.remark || '');
                        }}
                        className="bg-[#F4FAF6] hover:bg-[#E8F6ED] text-[#1C4D36] border border-[#D5EBDC] rounded-xl px-2.5 py-1 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors active:scale-95 whitespace-nowrap shadow-2xs"
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5 text-[#1C4D36] shrink-0" />
                        <span>Correct Attendance</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Full-Width Verify CTA */}
          {!currentSession.isVerified ? (
            <button
              type="button"
              onClick={handleVerifyAttendance}
              className="w-full bg-[#1C4D36] hover:bg-[#153B29] text-white font-medium text-sm sm:text-base py-3.5 px-5 rounded-2xl flex items-center justify-between active:scale-[0.98] transition-all cursor-pointer shadow-md mt-4"
            >
              <div className="flex items-center gap-2 mx-auto">
                <ShieldCheck className="w-5 h-5 text-white stroke-[2.2]" />
                <span>Verify & Lock Session Attendance</span>
              </div>
              <ChevronRight className="w-5 h-5 text-white shrink-0" />
            </button>
          ) : (
            <div className="bg-[#EBF7EE] border border-[#C8E6C9] rounded-2xl p-4 text-center mt-4">
              <p className="text-xs text-[#1C4D36] font-bold">
                ✓ Session attendance has been verified and locked.
              </p>
            </div>
          )}
        </div>

        {/* Correction Modal */}
        <AnimatePresence>
          {correctingStudentId && (() => {
            const stuObj = currentSession.students.find(s => s.studentId === correctingStudentId);
            return (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="bg-white rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-xl border border-[#EDE8DE]"
                >
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <h3 className="text-base font-bold font-serif text-[#1C4D36]">Edit Attendance</h3>
                    <button 
                      onClick={() => setCorrectingStudentId(null)}
                      className="p-1 hover:bg-slate-100 rounded-full cursor-pointer text-slate-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Student</p>
                    <p className="text-sm font-bold font-serif text-slate-800 mt-0.5">{stuObj?.studentName}</p>
                    <p className="text-xs font-mono text-slate-400">ID: {stuObj?.studentId}</p>
                  </div>

                  {/* Status Selection */}
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Status</p>
                    <div className="grid grid-cols-2 gap-2.5">
                      {(['Present', 'Absent'] as const).map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => setCorrectionStatus(st)}
                          className={`py-2 px-1 text-xs font-bold rounded-xl border text-center cursor-pointer transition-all ${
                            correctionStatus === st
                              ? st === 'Present' ? 'bg-[#EBF7EE] text-[#1C4D36] border-[#C8E6C9]' :
                                'bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]'
                              : 'bg-slate-50 border-slate-200 text-slate-600'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Remarks */}
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Reason / Remark</p>
                    <select
                      value={correctionRemark}
                      onChange={(e) => setCorrectionRemark(e.target.value)}
                      className="w-full bg-[#FAF7F0] border border-[#EADBBD] text-xs font-semibold text-slate-700 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#1C4D36]/20 cursor-pointer"
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
                      type="button"
                      onClick={() => setCorrectingStudentId(null)}
                      className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveCorrection}
                      className="py-2.5 bg-[#1C4D36] hover:bg-[#153B29] text-white font-bold text-xs rounded-xl cursor-pointer shadow-xs"
                    >
                      Save Changes
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

  // ==========================================
  // SCREEN 1: ATTENDANCE MAIN SCREEN (MATCHING SS)
  // ==========================================
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-full bg-[#FCFAF7] pb-28 text-slate-800"
    >
      {/* Header matching screenshot */}
      <div className="bg-[#FCFAF7] px-5 pt-8 pb-3 border-b border-[#EEDBBD]/50 sticky top-0 z-20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveScreen('TeacherDashboard')} 
              className="p-2 hover:bg-black/5 rounded-full transition-colors active:scale-95 cursor-pointer text-slate-700"
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold font-serif text-[#1C4D36] tracking-tight">
              Class Attendance
            </h1>
          </div>

          {/* Calendar button on the right matching SS */}
          <button 
            onClick={() => setActiveTab('Today')}
            className="p-2.5 bg-white border border-[#EDE8DE] hover:bg-[#FAF6ED] rounded-2xl text-slate-700 shadow-2xs transition-colors cursor-pointer"
          >
            <Calendar className="w-5 h-5 text-slate-700" />
          </button>
        </div>

        {/* 2 Main Tabs: Today's Class & History */}
        <div className="grid grid-cols-2 gap-2 bg-[#F2EDE4] p-1 rounded-2xl">
          {/* Tab 1: Today's Class */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('Today');
              setSearchQuery('');
              setFilterLevel('All');
              setFilterBatch('All');
            }}
            className={`py-2.5 px-3.5 rounded-xl flex items-center justify-center gap-1.5 font-bold text-xs cursor-pointer transition-all active:scale-95 ${
              activeTab === 'Today'
                ? 'bg-white text-[#1C4D36] border border-[#D5EBDC] shadow-2xs'
                : 'bg-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className={`w-4 h-4 ${activeTab === 'Today' ? 'text-[#1C4D36]' : 'text-slate-500'}`} />
            <span>Today's Class</span>
          </button>

          {/* Tab 2: History */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('History');
              setSearchQuery('');
              setFilterLevel('All');
              setFilterBatch('All');
            }}
            className={`py-2.5 px-3.5 rounded-xl flex items-center justify-center gap-1.5 font-bold text-xs cursor-pointer transition-all active:scale-95 ${
              activeTab === 'History'
                ? 'bg-white text-[#1C4D36] border border-[#D5EBDC] shadow-2xs'
                : 'bg-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <History className={`w-4 h-4 ${activeTab === 'History' ? 'text-[#1C4D36]' : 'text-slate-500'}`} />
            <span>History</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="p-4 sm:p-5 max-w-lg mx-auto space-y-4">
        
        {/* TODAY'S ATTENDANCE TAB */}
        {activeTab === 'Today' && (
          <div className="space-y-4">
            {/* Section Title with Cap icon and horizontal rule matching screenshot */}
            <div className="flex items-center gap-2.5 pt-1">
              <GraduationCap className="w-5 h-5 text-[#1C4D36] shrink-0" />
              <h2 className="text-base sm:text-lg font-bold font-serif text-slate-900 tracking-tight shrink-0">
                Today's Active Classes
              </h2>
              <div className="h-[1px] bg-slate-200 flex-1 ml-2" />
            </div>
            
            {todaysSessions.length === 0 ? (
              <div className="text-center py-12 bg-white border border-[#EDE8DE] rounded-3xl shadow-xs p-6">
                <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-sm font-bold font-serif text-slate-700">No classes scheduled today</p>
                <p className="text-xs text-slate-400 mt-1">There are no active classes scheduled for you today.</p>
              </div>
            ) : (
              todaysSessions.map((sess) => {
                const isL2 = sess.levelNumber === 2;

                // Left column and button colors based on Level 1 (Emerald/Mint) vs Level 2 (Lavender/Purple)
                const leftColBg = isL2 ? 'bg-[#F8F5FC]' : 'bg-[#F2FAF5]';
                const leftColBorder = isL2 ? 'border-r border-[#EBE4F7]' : 'border-r border-[#E2F0E7]';
                const iconCircleBg = isL2 ? 'bg-white/90 border border-[#DDD4F2] text-[#5B4E9B]' : 'bg-white/90 border border-[#D5EBDC] text-[#1C4D36]';
                const levelTextColor = isL2 ? 'text-[#5B4E9B]' : 'text-[#1C4D36]';
                const btnBg = isL2 
                  ? 'bg-[#5B4E9B] hover:bg-[#4C4085]' 
                  : 'bg-[#1C4D36] hover:bg-[#153B29]';

                return (
                  <div 
                    key={sess.id} 
                    className="bg-white rounded-[24px] border border-[#EDE8DE] shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex overflow-hidden hover:border-slate-300 transition-all"
                  >
                    {/* Left Column (Icon + Time Block) matching SS */}
                    <div className={`w-[105px] sm:w-[115px] shrink-0 p-3.5 flex flex-col items-center justify-center gap-3.5 text-center ${leftColBg} ${leftColBorder}`}>
                      {/* Icon Circle */}
                      <div className={`w-13 h-13 rounded-full flex items-center justify-center shadow-2xs ${iconCircleBg}`}>
                        {isL2 ? (
                          <Globe className="w-6 h-6" />
                        ) : (
                          <BookOpen className="w-6 h-6" />
                        )}
                      </div>

                      {/* Time stack with vertical line */}
                      <div className="flex flex-col items-center">
                        <span className="text-xs font-bold text-slate-800 font-sans tracking-tight">
                          {sess.startTime}
                        </span>
                        <div className="h-3.5 w-[1px] bg-slate-300 my-0.5" />
                        <span className="text-xs font-bold text-slate-800 font-sans tracking-tight">
                          {sess.endTime}
                        </span>
                      </div>
                    </div>

                    {/* Right Column (Batch details + CTA) */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                      {/* Level and Pending Tag */}
                      <div>
                        <div className="flex justify-between items-start gap-1">
                          <span className={`text-[10px] font-extrabold uppercase tracking-wider ${levelTextColor}`}>
                            LEVEL {sess.levelNumber}
                          </span>
                          <span className="bg-[#FEF7EC] text-[#B45309] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
                            {sess.isVerified ? 'VERIFIED' : 'PENDING'}
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold font-serif text-slate-900 mt-1 leading-tight">
                          {sess.batch}
                        </h3>
                      </div>

                      {/* CTA Action Button (View icon only) */}
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedSessionId(sess.id);
                          setActiveScreen('TeacherAttendanceDetails');
                        }}
                        className={`w-full text-white font-medium text-xs sm:text-sm py-2.5 px-4 rounded-xl flex items-center justify-center active:scale-[0.98] transition-all cursor-pointer shadow-xs mt-3 ${btnBg}`}
                        title="View Attendance Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* HISTORY TAB (MATCHING SS) */}
        {activeTab === 'History' && (
          <div className="space-y-4">
            {filteredHistorySessions.length === 0 ? (
              <div className="text-center py-12 bg-white border border-[#EDE8DE] rounded-3xl shadow-xs p-6">
                <History className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-sm font-bold font-serif text-slate-700">No past sessions found</p>
                <p className="text-xs text-slate-400 mt-1">There are no past attendance records found.</p>
              </div>
            ) : (
              filteredHistorySessions.map((sess) => {
                const isL1 = sess.levelNumber === 1;
                const isL2 = sess.levelNumber === 2;
                const isL3 = sess.levelNumber === 3;

                const leftColBg = isL1 
                  ? 'bg-[#F2FAF5]' 
                  : isL2 
                  ? 'bg-[#F8F5FC]' 
                  : 'bg-[#FFF9F0]';

                const leftColBorder = isL1 
                  ? 'border-r border-[#E2F0E7]' 
                  : isL2 
                  ? 'border-r border-[#EBE4F7]' 
                  : 'border-r border-[#FEEED1]';

                const iconCircleBg = isL1 
                  ? 'bg-white/90 border border-[#D5EBDC] text-[#1C4D36]' 
                  : isL2 
                  ? 'bg-white/90 border border-[#DDD4F2] text-[#5B4E9B]' 
                  : 'bg-white/90 border border-[#FDE6B8] text-[#D97706]';

                const levelBatchColor = isL1 
                  ? 'text-[#1C4D36]' 
                  : isL2 
                  ? 'text-[#5B4E9B]' 
                  : 'text-[#D97706]';

                // Extract Batch short identifier e.g. "Batch A"
                const batchShort = sess.batch.includes('–') 
                  ? sess.batch.split('–')[0].trim() 
                  : (sess.batch.includes('-') ? sess.batch.split('-')[0].trim() : sess.batch);

                return (
                  <div 
                    key={sess.id} 
                    className="bg-white rounded-[24px] border border-[#EDE8DE] shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex overflow-hidden hover:border-slate-300 transition-all"
                  >
                    {/* Left Column (Motif container) */}
                    <div className={`w-[95px] sm:w-[110px] shrink-0 p-3.5 flex items-center justify-center ${leftColBg} ${leftColBorder}`}>
                      <div className={`w-13 h-13 rounded-full flex items-center justify-center shadow-2xs ${iconCircleBg}`}>
                        {isL1 && <BookOpen className="w-6 h-6" />}
                        {isL2 && <Globe className="w-6 h-6" />}
                        {isL3 && <Flower2 className="w-6 h-6" />}
                      </div>
                    </div>

                    {/* Right Column (Details & View Icon CTA) */}
                    <div className="p-4 sm:p-5 flex-1 space-y-2.5 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        {/* Top Header Row: Level & Batch + Verified Pill */}
                        <div className="flex justify-between items-center">
                          <span className={`text-[10px] font-extrabold uppercase tracking-wider ${levelBatchColor}`}>
                            LEVEL {sess.levelNumber} • {batchShort.toUpperCase()}
                          </span>
                          <span className="bg-[#EBF7EE] text-[#1C4D36] border border-[#C8E6C9] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-[#1C4D36]" />
                            <span>VERIFIED</span>
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-base font-bold font-serif text-slate-900 leading-tight">
                          {sess.levelSubtitle}
                        </h3>

                        {/* Schedule Time */}
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-sans">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{sess.startTime} - {sess.endTime}</span>
                        </div>
                      </div>

                      {/* Action Button (View Icon only) */}
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedSessionId(sess.id);
                          setActiveScreen('TeacherAttendanceDetails');
                        }}
                        className="w-full bg-[#FAF7F2] hover:bg-[#F2ECE1] border border-[#EDE8DE] text-[#1C4D36] py-2.5 px-4 rounded-xl flex items-center justify-center transition-colors shadow-2xs active:scale-[0.99] cursor-pointer mt-1"
                        title="View Attendance Details"
                      >
                        <Eye className="w-5 h-5 text-[#1C4D36]" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

      </div>
    </motion.div>
  );
}
