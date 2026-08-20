import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Search, 
  User, 
  BookOpen, 
  Download, 
  ChevronRight,
  Award,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Trophy,
  Sparkles,
  TrendingUp,
  Star,
  GraduationCap,
  Check,
  RotateCcw,
  FileText
} from 'lucide-react';

interface StudentData {
  id: string;
  name: string;
  avatarColor: string;
  level: string;
  batch: string;
  attendanceScore: string; // e.g. "92%"
  attendancePercent: number;
  gathaScore: string; // e.g. "8/10"
  gathaPercentage: number; // e.g. 80
  bonusPoints: number;
  overallProgress: 'Excellent' | 'Good' | 'Outstanding' | 'Average';
  promotionStatus: 'Active' | 'Revision Stage' | 'Awaiting Promotion';
  sutrasCompleted: string[];
}

interface TeacherReportsFlowProps {
  activeScreen: string;
  setActiveScreen: (screen: string) => void;
  currentLoggedInTeacher: any;
}

// Decorative Golden Lotus Divider component
function GoldenLotusDivider() {
  return (
    <div className="flex items-center justify-center gap-2 my-1.5">
      <div className="h-[1px] w-10 bg-[#D6C29E]" />
      <svg viewBox="0 0 24 16" className="w-3.5 h-2.5 text-[#C4883A]" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M 12 15 C 12 8 8 3 5 7 C 3 10 6 15 12 15 Z" />
        <path d="M 12 15 C 12 8 16 3 19 7 C 21 10 18 15 12 15 Z" />
        <path d="M 12 15 C 10 9 10 3 12 1 C 14 3 14 9 12 15 Z" />
      </svg>
      <div className="h-[1px] w-10 bg-[#D6C29E]" />
    </div>
  );
}

export function TeacherReportsFlow({
  activeScreen,
  setActiveScreen,
  currentLoggedInTeacher
}: TeacherReportsFlowProps) {
  const teacherName = currentLoggedInTeacher?.name || "Samani Pragya ji";

  // Navigation State inside Reports: 'home' | 'gatha' | 'student'
  const [reportSubScreen, setReportSubScreen] = useState<'home' | 'gatha' | 'student'>('home');

  // Interactive Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Students database mapped to specific teachers
  const allStudents: StudentData[] = [
    {
      id: 'STU001',
      name: 'Aarav Shah',
      avatarColor: 'bg-[#1C4D36]',
      level: 'Level 1: Basic Sutras',
      batch: 'Batch A - Morning',
      attendanceScore: '92%',
      attendancePercent: 92,
      gathaScore: '8/10',
      gathaPercentage: 80,
      bonusPoints: 120,
      overallProgress: 'Excellent',
      promotionStatus: 'Active',
      sutrasCompleted: ['Navkar Mantra', 'Mangal Path', 'Khamasamanu']
    },
    {
      id: 'STU002',
      name: 'Diya Patel',
      avatarColor: 'bg-[#C4883A]',
      level: 'Level 1: Basic Sutras',
      batch: 'Batch A - Morning',
      attendanceScore: '85%',
      attendancePercent: 85,
      gathaScore: '5/10',
      gathaPercentage: 50,
      bonusPoints: 85,
      overallProgress: 'Good',
      promotionStatus: 'Active',
      sutrasCompleted: ['Navkar Mantra', 'Mangal Path']
    },
    {
      id: 'STU003',
      name: 'Rohan Jain',
      avatarColor: 'bg-[#2563EB]',
      level: 'Level 2: Jain Geography',
      batch: 'Batch B - Afternoon',
      attendanceScore: '98%',
      attendancePercent: 98,
      gathaScore: '12/15',
      gathaPercentage: 80,
      bonusPoints: 210,
      overallProgress: 'Outstanding',
      promotionStatus: 'Revision Stage',
      sutrasCompleted: ['Iryavahiya Sutra', 'Logassa Gatha', 'Karemi Bhante']
    },
    {
      id: 'STU004',
      name: 'Kavya Doshi',
      avatarColor: 'bg-[#7C3AED]',
      level: 'Level 2: Jain Geography',
      batch: 'Batch B - Afternoon',
      attendanceScore: '100%',
      attendancePercent: 100,
      gathaScore: '10/10',
      gathaPercentage: 100,
      bonusPoints: 320,
      overallProgress: 'Outstanding',
      promotionStatus: 'Awaiting Promotion',
      sutrasCompleted: ['All 10 Sutras Verified']
    },
    {
      id: 'STU005',
      name: 'Siddharth Mehta',
      avatarColor: 'bg-[#0D9488]',
      level: 'Level 1: Basic Sutras',
      batch: 'Batch A - Morning',
      attendanceScore: '90%',
      attendancePercent: 90,
      gathaScore: '7/10',
      gathaPercentage: 70,
      bonusPoints: 110,
      overallProgress: 'Excellent',
      promotionStatus: 'Active',
      sutrasCompleted: ['Navkar Mantra', 'Logassa']
    }
  ];

  // Map student name to teacher
  const getStudentTeacher = (studentName: string): string => {
    if (['Aarav Shah', 'Diya Patel', 'Rohan Jain'].includes(studentName)) {
      return "Samani Pragya ji";
    }
    return "Pujya Samanji Dr. Shrutpragya ji";
  };

  // Filter students by current teacher
  const teacherStudents = allStudents.filter(s => getStudentTeacher(s.name) === teacherName);

  // Filtered list for search query
  const filteredStudents = teacherStudents.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      student.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  // Calculate high-level summary metrics
  const totalGathasCompleted = teacherStudents.reduce((acc, s) => acc + parseInt(s.gathaScore.split('/')[0] || '0'), 0);
  const totalGathasTarget = teacherStudents.reduce((acc, s) => acc + parseInt(s.gathaScore.split('/')[1] || '10'), 0);
  const avgGathaPercentage = teacherStudents.length > 0
    ? Math.round(teacherStudents.reduce((acc, s) => acc + s.gathaPercentage, 0) / teacherStudents.length)
    : 0;

  const avgAttendance = teacherStudents.length > 0
    ? Math.round(teacherStudents.reduce((acc, s) => acc + s.attendancePercent, 0) / teacherStudents.length)
    : 0;

  const totalPoints = teacherStudents.reduce((acc, s) => acc + s.bonusPoints, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full bg-[#FCFAF7] overflow-y-auto pb-28 text-slate-800"
    >
      {/* -------------------- HEADER SECTION -------------------- */}
      <div className="bg-[#FCFAF7] px-5 pt-8 pb-3 border-b border-[#EEDBBD]/60 sticky top-0 z-20">
        <div className="relative flex items-center justify-center">
          <button 
            onClick={() => {
              if (reportSubScreen !== 'home') {
                setReportSubScreen('home');
                setSearchQuery('');
              } else {
                setActiveScreen('TeacherDashboard');
              }
            }} 
            className="absolute left-0 p-2 hover:bg-black/5 rounded-full transition-colors active:scale-95 cursor-pointer text-slate-700"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
          </button>
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-bold font-serif text-[#1C4D36] tracking-tight">
              {reportSubScreen === 'home' ? 'Academic Reports' : 
               reportSubScreen === 'gatha' ? 'Gatha Progress' : 
               'Student Performance'}
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {reportSubScreen === 'home' ? 'Overview & Analytics' : teacherName}
            </p>
          </div>
        </div>
        <GoldenLotusDivider />
      </div>

      {/* -------------------- MAIN REPORTS HOME SCREEN -------------------- */}
      {reportSubScreen === 'home' && (
        <div className="p-4 sm:p-5 space-y-4 max-w-lg mx-auto">
          {/* Summary Banner */}
          <div className="bg-[#FAF6ED] border border-[#EADBBD] rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">Academic Scope</p>
              <h2 className="text-lg font-bold font-serif text-[#1C4D36] mt-0.5">{teacherName}</h2>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-[#1C4D36] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  {teacherStudents.length} Students
                </span>
                <span className="bg-[#FAF6ED] border border-[#EADBBD] text-[#C4883A] text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  2 Batches
                </span>
              </div>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white border border-[#EADBBD] flex items-center justify-center text-[#1C4D36] shadow-xs">
              <GraduationCap className="w-8 h-8 text-[#1C4D36]" />
            </div>
          </div>

          {/* Category Cards */}
          <div className="space-y-3 pt-1">
            {/* 1. Gatha Progress Report */}
            <button 
              onClick={() => setReportSubScreen('gatha')}
              className="w-full bg-white border border-[#EDE8DE] hover:border-[#1C4D36]/40 rounded-2xl p-4 sm:p-5 shadow-xs transition-all text-left flex items-center justify-between cursor-pointer active:scale-98"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#EBF5EE] border border-[#D5EBDC] text-[#1C4D36] flex items-center justify-center shadow-2xs shrink-0">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-serif text-[#1C4D36]">Gatha Progress</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-bold text-slate-600 font-mono">{avgGathaPercentage}% Completed</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span className="text-xs text-slate-500 font-medium">Sutra Masteries</span>
                  </div>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#FAF6ED] border border-[#EADBBD] flex items-center justify-center text-slate-400">
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>

            {/* 2. Student Performance Report */}
            <button 
              onClick={() => setReportSubScreen('student')}
              className="w-full bg-white border border-[#EDE8DE] hover:border-[#1C4D36]/40 rounded-2xl p-4 sm:p-5 shadow-xs transition-all text-left flex items-center justify-between cursor-pointer active:scale-98"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FEF3C7] border border-[#FDE68A] text-[#B45309] flex items-center justify-center shadow-2xs shrink-0">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-serif text-[#1C4D36]">Student Performance</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-bold text-[#B45309] font-mono">{totalPoints} Merit Pts</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span className="text-xs text-slate-500 font-medium">Attendance & Levels</span>
                  </div>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#FAF6ED] border border-[#EADBBD] flex items-center justify-center text-slate-400">
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      )}

      {/* -------------------- 1. GATHA PROGRESS REPORT SCREEN -------------------- */}
      {reportSubScreen === 'gatha' && (
        <div className="p-4 sm:p-5 space-y-4 max-w-lg mx-auto">
          {/* Quick Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search student..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-slate-800 text-xs font-medium border border-[#EDE8DE] rounded-xl py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-[#1C4D36] focus:border-[#1C4D36] outline-none shadow-2xs placeholder:text-slate-400"
            />
          </div>

          {/* Hero Visual Metrics Card */}
          <div className="bg-[#FAF6ED] border border-[#EADBBD] rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Class Mastery</p>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-2xl font-bold font-serif text-[#1C4D36]">{avgGathaPercentage}%</span>
                  <span className="text-xs text-slate-500 font-medium">overall completed</span>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-white border border-[#EADBBD] px-3 py-1.5 rounded-full shadow-2xs">
                <BookOpen className="w-4 h-4 text-[#C4883A]" />
                <span className="text-xs font-bold text-[#1C4D36] font-mono">
                  {totalGathasCompleted}/{totalGathasTarget} Gathas
                </span>
              </div>
            </div>

            {/* Visual Multi-Segment Progress Bar */}
            <div className="w-full bg-white rounded-full h-2.5 overflow-hidden border border-[#EADBBD] flex">
              <div className="bg-[#1C4D36] h-full transition-all" style={{ width: `${avgGathaPercentage}%` }} />
              <div className="bg-[#C4883A] h-full transition-all" style={{ width: `15%` }} />
              <div className="bg-slate-200 h-full flex-1" />
            </div>

            {/* 4 Mini Stat Badges */}
            <div className="grid grid-cols-4 gap-2 pt-1">
              <div className="bg-white p-2 rounded-xl border border-[#EDE8DE] text-center shadow-2xs">
                <span className="text-base font-bold text-[#1C4D36] font-mono block">12</span>
                <span className="text-[9px] font-bold text-slate-500 uppercase block mt-0.5">Approved</span>
              </div>
              <div className="bg-white p-2 rounded-xl border border-[#EDE8DE] text-center shadow-2xs">
                <span className="text-base font-bold text-[#D97706] font-mono block">3</span>
                <span className="text-[9px] font-bold text-slate-500 uppercase block mt-0.5">Pending</span>
              </div>
              <div className="bg-white p-2 rounded-xl border border-[#EDE8DE] text-center shadow-2xs">
                <span className="text-base font-bold text-[#EA580C] font-mono block">2</span>
                <span className="text-[9px] font-bold text-slate-500 uppercase block mt-0.5">Rework</span>
              </div>
              <div className="bg-white p-2 rounded-xl border border-[#EDE8DE] text-center shadow-2xs">
                <span className="text-base font-bold text-slate-700 font-mono block">{teacherStudents.length}</span>
                <span className="text-[9px] font-bold text-slate-500 uppercase block mt-0.5">Students</span>
              </div>
            </div>
          </div>

          {/* Student Gatha Cards List */}
          <div className="space-y-3 pt-1">
            {filteredStudents.length === 0 ? (
              <div className="text-center py-8 bg-white rounded-2xl border border-[#EDE8DE]">
                <p className="text-xs text-slate-400 font-medium">No students found.</p>
              </div>
            ) : (
              filteredStudents.map((student) => (
                <div 
                  key={student.id} 
                  className="bg-white rounded-2xl p-4 border border-[#EDE8DE] shadow-xs space-y-3"
                >
                  {/* Student Top Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full ${student.avatarColor} text-white flex items-center justify-center font-bold text-xs font-mono shadow-xs`}>
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold font-serif text-[#1C4D36] leading-tight">
                          {student.name}
                        </h4>
                        <span className="text-[10px] text-slate-500 font-medium">
                          {student.level.split(':')[0]}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-bold font-serif text-[#1C4D36] block">
                        {student.gathaPercentage}%
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 font-mono">
                        {student.gathaScore} Gathas
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-[#FAF6ED] rounded-full h-2 overflow-hidden border border-[#EADBBD]/50">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        student.gathaPercentage === 100 ? 'bg-[#1C4D36]' :
                        student.gathaPercentage >= 70 ? 'bg-[#2563EB]' : 'bg-[#C4883A]'
                      }`}
                      style={{ width: `${student.gathaPercentage}%` }}
                    />
                  </div>

                  {/* Micro Sutra Tag Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {student.sutrasCompleted.map((sutra, idx) => (
                      <span 
                        key={idx} 
                        className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50/80 border border-emerald-200/60 px-2 py-0.5 rounded-md"
                      >
                        <Check className="w-2.5 h-2.5 text-emerald-600 stroke-[3]" />
                        {sutra}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* -------------------- 2. STUDENT PERFORMANCE REPORT SCREEN -------------------- */}
      {reportSubScreen === 'student' && (
        <div className="p-4 sm:p-5 space-y-4 max-w-lg mx-auto">
          {/* Quick Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search student..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-slate-800 text-xs font-medium border border-[#EDE8DE] rounded-xl py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-[#1C4D36] focus:border-[#1C4D36] outline-none shadow-2xs placeholder:text-slate-400"
            />
          </div>

          {/* Hero Visual Performance Stats Card */}
          <div className="bg-[#FAF6ED] border border-[#EADBBD] rounded-2xl p-4 sm:p-5 shadow-xs">
            <div className="grid grid-cols-3 gap-2 text-center divide-x divide-[#EADBBD]">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Attendance</p>
                <p className="text-xl font-bold font-serif text-[#1C4D36] mt-1">{avgAttendance}%</p>
                <span className="text-[9px] text-slate-400 font-medium">class avg</span>
              </div>
              <div className="pl-2">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Gathas</p>
                <p className="text-xl font-bold font-serif text-[#C4883A] mt-1">{avgGathaPercentage}%</p>
                <span className="text-[9px] text-slate-400 font-medium">mastery</span>
              </div>
              <div className="pl-2">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Merit</p>
                <p className="text-xl font-bold font-serif text-[#B45309] mt-1">{totalPoints}</p>
                <span className="text-[9px] text-slate-400 font-medium">total points</span>
              </div>
            </div>
          </div>

          {/* Student Performance Cards List */}
          <div className="space-y-3 pt-1">
            {filteredStudents.length === 0 ? (
              <div className="text-center py-8 bg-white rounded-2xl border border-[#EDE8DE]">
                <p className="text-xs text-slate-400 font-medium">No students found.</p>
              </div>
            ) : (
              filteredStudents.map((student) => (
                <div 
                  key={student.id} 
                  className="bg-white rounded-2xl p-4 border border-[#EDE8DE] shadow-xs space-y-3.5"
                >
                  {/* Student Top Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${student.avatarColor} text-white flex items-center justify-center font-bold text-xs font-mono shadow-xs`}>
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold font-serif text-[#1C4D36] leading-tight">
                          {student.name}
                        </h4>
                        <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                          ID: {student.id}
                        </p>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                      student.promotionStatus === 'Awaiting Promotion' ? 'bg-amber-50 text-[#B45309] border-amber-200' :
                      student.promotionStatus === 'Revision Stage' ? 'bg-orange-50 text-orange-800 border-orange-200' :
                      'bg-emerald-50 text-[#1C4D36] border-emerald-200'
                    }`}>
                      {student.promotionStatus === 'Awaiting Promotion' ? 'Ready for Next Level' : student.promotionStatus}
                    </span>
                  </div>

                  {/* 3 Visual Metric Gauges */}
                  <div className="grid grid-cols-3 gap-2 bg-[#FCFAF7] p-2.5 rounded-xl border border-[#EDE8DE] text-center">
                    {/* Attendance */}
                    <div className="space-y-1">
                      <span className="text-[9.5px] font-bold text-slate-400 uppercase block">Attendance</span>
                      <span className="text-xs font-bold text-[#1C4D36] font-mono block">{student.attendanceScore}</span>
                      <div className="w-full bg-slate-200 rounded-full h-1 overflow-hidden">
                        <div className="bg-[#1C4D36] h-full rounded-full" style={{ width: `${student.attendancePercent}%` }} />
                      </div>
                    </div>

                    {/* Gathas */}
                    <div className="space-y-1">
                      <span className="text-[9.5px] font-bold text-slate-400 uppercase block">Gathas</span>
                      <span className="text-xs font-bold text-[#2563EB] font-mono block">{student.gathaScore}</span>
                      <div className="w-full bg-slate-200 rounded-full h-1 overflow-hidden">
                        <div className="bg-[#2563EB] h-full rounded-full" style={{ width: `${student.gathaPercentage}%` }} />
                      </div>
                    </div>

                    {/* Merit Points */}
                    <div className="space-y-1">
                      <span className="text-[9.5px] font-bold text-slate-400 uppercase block">Points</span>
                      <div className="flex items-center justify-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#C4883A]" />
                        <span className="text-xs font-bold text-[#C4883A] font-mono">{student.bonusPoints}</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1 overflow-hidden">
                        <div className="bg-[#C4883A] h-full rounded-full" style={{ width: `${Math.min(100, (student.bonusPoints / 300) * 100)}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

    </motion.div>
  );
}
