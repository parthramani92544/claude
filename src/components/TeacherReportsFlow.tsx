import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Search, 
  Filter, 
  Calendar, 
  TrendingUp, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  AlertTriangle, 
  User, 
  Users, 
  BookOpen, 
  Clock, 
  Award, 
  Download, 
  Layers, 
  BarChart3, 
  ChevronRight, 
  Activity,
  Plus
} from 'lucide-react';

interface StudentData {
  id: string;
  name: string;
  level: string;
  batch: string;
  attendanceScore: string; // e.g. "92%"
  gathaScore: string; // e.g. "8/10"
  gathaPercentage: number; // e.g. 80
  bonusPoints: number;
  overallProgress: 'Excellent' | 'Good' | 'Outstanding' | 'Average';
  promotionStatus: 'Active' | 'Revision Stage' | 'Awaiting Promotion';
}

interface BatchSummary {
  name: string;
  level: string;
  teacher: string;
  totalStudents: number;
  attendanceRate: string;
  gathaRate: string;
  pendingReviews: number;
}

interface TimelineEvent {
  id: string;
  time: string;
  date: string;
  type: 'class' | 'attendance' | 'gatha_approve' | 'gatha_rework' | 'promotion';
  title: string;
  description: string;
}

interface TeacherReportsFlowProps {
  activeScreen: string;
  setActiveScreen: (screen: string) => void;
  currentLoggedInTeacher: any;
}

export function TeacherReportsFlow({
  activeScreen,
  setActiveScreen,
  currentLoggedInTeacher
}: TeacherReportsFlowProps) {
  const teacherName = currentLoggedInTeacher?.name || "Samani Pragya ji";

  // Navigation State inside Reports
  // 'home' means list of report categories
  // 'attendance' | 'gatha' | 'student' | 'batch' | 'daily'
  const [reportSubScreen, setReportSubScreen] = useState<'home' | 'attendance' | 'gatha' | 'student' | 'batch' | 'daily'>('home');

  // Interactive Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState('All');
  const [filterBatch, setFilterBatch] = useState('All');
  const [filterDate, setFilterDate] = useState('');
  const [dateRangeStart, setDateRangeStart] = useState('');
  const [dateRangeEnd, setDateRangeEnd] = useState('');

  // 1. DATASETS (Partitioned strictly for the logged-in teacher)
  const isPragya = teacherName === "Samani Pragya ji";

  // Students mock database mapped to specific teachers
  const allStudents: StudentData[] = [
    {
      id: 'STU001',
      name: 'Aarav Shah',
      level: 'Level 1: Basic Sutras & Stories',
      batch: 'Batch A - Morning',
      attendanceScore: '92%',
      gathaScore: '8/10',
      gathaPercentage: 80,
      bonusPoints: 120,
      overallProgress: 'Excellent',
      promotionStatus: 'Active'
    },
    {
      id: 'STU002',
      name: 'Diya Patel',
      level: 'Level 1: Basic Sutras & Stories',
      batch: 'Batch A - Morning',
      attendanceScore: '85%',
      gathaScore: '5/10',
      gathaPercentage: 50,
      bonusPoints: 85,
      overallProgress: 'Good',
      promotionStatus: 'Active'
    },
    {
      id: 'STU003',
      name: 'Rohan Jain',
      level: 'Level 2: Jain Geography & Symbols',
      batch: 'Batch B - Afternoon',
      attendanceScore: '98%',
      gathaScore: '12/15',
      gathaPercentage: 80,
      bonusPoints: 210,
      overallProgress: 'Outstanding',
      promotionStatus: 'Revision Stage'
    },
    {
      id: 'STU004',
      name: 'Kavya Doshi',
      level: 'Level 2: Jain Geography & Symbols',
      batch: 'Batch B - Afternoon',
      attendanceScore: '100%',
      gathaScore: '10/10',
      gathaPercentage: 100,
      bonusPoints: 320,
      overallProgress: 'Outstanding',
      promotionStatus: 'Awaiting Promotion'
    },
    {
      id: 'STU005',
      name: 'Siddharth Mehta',
      level: 'Level 1: Basic Sutras & Stories',
      batch: 'Batch A - Morning',
      attendanceScore: '90%',
      gathaScore: '7/10',
      gathaPercentage: 70,
      bonusPoints: 110,
      overallProgress: 'Excellent',
      promotionStatus: 'Active'
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

  // Batch Summaries Database
  const allBatches: BatchSummary[] = [
    {
      name: 'Batch A - Morning',
      level: 'Level 1: Basic Sutras & Stories',
      teacher: 'Samani Pragya ji',
      totalStudents: 2, // Aarav, Diya
      attendanceRate: '88.5%',
      gathaRate: '65%',
      pendingReviews: 2
    },
    {
      name: 'Batch B - Afternoon',
      level: 'Level 2: Jain Geography & Symbols',
      teacher: 'Samani Pragya ji',
      totalStudents: 1, // Rohan
      attendanceRate: '98%',
      gathaRate: '80%',
      pendingReviews: 1
    },
    {
      name: 'Batch C - Evening',
      level: 'Level 2: Jain Geography & Symbols',
      teacher: 'Pujya Samanji Dr. Shrutpragya ji',
      totalStudents: 2, // Kavya, Siddharth
      attendanceRate: '95%',
      gathaRate: '85%',
      pendingReviews: 2
    }
  ];

  const teacherBatches = allBatches.filter(b => b.teacher === teacherName);

  // Daily Activity Log chronological timeline
  const allTimelineEvents: TimelineEvent[] = [
    {
      id: 'EVT001',
      time: '09:00 AM',
      date: '2026-07-06',
      type: 'class',
      title: 'Class Conducted',
      description: 'Navkar Mantra recitation session for Batch A - Morning.'
    },
    {
      id: 'EVT002',
      time: '10:15 AM',
      date: '2026-07-06',
      type: 'attendance',
      title: 'Attendance Verified',
      description: 'Locked attendance records for Level 1: Basic Sutras & Stories (Batch A).'
    },
    {
      id: 'EVT003',
      time: '11:00 AM',
      date: '2026-07-06',
      type: 'gatha_approve',
      title: 'Gatha Approved',
      description: 'Approved "Navkar Mantra Gatha 1-2" recited by Aarav Shah. +50 Gatha Points awarded.'
    },
    {
      id: 'EVT004',
      time: '02:30 PM',
      date: '2026-07-05',
      type: 'gatha_rework',
      title: 'Rework Requested',
      description: 'Sent feedback to Diya Patel for "Logassa Sutra". Remarks: Clarify retroflex consonants.'
    },
    {
      id: 'EVT005',
      time: '04:00 PM',
      date: '2026-07-04',
      type: 'promotion',
      title: 'Eligible for Promotion',
      description: 'Kavya Doshi completed Level 2 requirements. Status updated to Awaiting Promotion.'
    }
  ];

  // We can filter timeline events slightly for a realistic chronological display
  // In a professional system, we present these chronologically. Let's filter them nicely.
  const timelineEvents = allTimelineEvents; 

  const levels = ['All', 'Level 1: Basic Sutras & Stories', 'Level 2: Jain Geography & Symbols'];
  const batchesList = ['All', 'Batch A - Morning', 'Batch B - Afternoon'];

  // Global filtered list of students for Search & Filters in sub-screens
  const filteredStudents = teacherStudents.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      student.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = filterLevel === 'All' || student.level === filterLevel;
    const matchesBatch = filterBatch === 'All' || student.batch === filterBatch;
    
    return matchesSearch && matchesLevel && matchesBatch;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full bg-slate-50 overflow-y-auto pb-24 text-slate-800"
    >
      {/* -------------------- HEADER SECTION -------------------- */}
      <div className="bg-white px-5 pt-8 pb-4 border-b border-slate-200 sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              if (reportSubScreen !== 'home') {
                setReportSubScreen('home');
                setSearchQuery('');
                setFilterLevel('All');
                setFilterBatch('All');
                setFilterDate('');
                setDateRangeStart('');
                setDateRangeEnd('');
              } else {
                setActiveScreen('TeacherDashboard');
              }
            }} 
            className="p-2 hover:bg-slate-100 rounded-full transition-colors active:scale-95 cursor-pointer"
          >
            <ArrowRight className="w-5 h-5 text-slate-700 rotate-180" />
          </button>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              {reportSubScreen === 'home' ? 'Teacher Reports' : 
               reportSubScreen === 'attendance' ? 'Attendance Report' : 
               reportSubScreen === 'gatha' ? 'Gatha Progress Report' : 
               reportSubScreen === 'student' ? 'Student Performance' : 
               reportSubScreen === 'batch' ? 'Batch Summary Report' : 
               'Daily Activity Timeline'}
            </h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">
              {reportSubScreen === 'home' ? 'Academic Insights & Metrics' : 'Reports Detail'}
            </p>
          </div>
        </div>
      </div>

      {/* -------------------- MAIN REPORTS HOME PANEL -------------------- */}
      {reportSubScreen === 'home' && (
        <div className="p-5 space-y-5">
          {/* Dashboard Summary Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">Academic Scope Summary</h2>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100/50">
                <p className="text-2xl font-black text-blue-900">{teacherStudents.length}</p>
                <p className="text-[9px] font-bold text-slate-500 uppercase mt-1">My Students</p>
              </div>
              <div className="bg-indigo-50/50 p-3 rounded-xl border border-indigo-100/50">
                <p className="text-2xl font-black text-indigo-900">{teacherBatches.length}</p>
                <p className="text-[9px] font-bold text-slate-500 uppercase mt-1">My Batches</p>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 mt-3 text-center font-medium">
              Reports are locked to **{teacherName}** and assigned academic scopes.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider ml-1">Available Report Categories</h3>
            
            {/* Category Cards */}
            <div className="grid gap-3.5">
              {/* 1. Attendance Report Category */}
              <button 
                onClick={() => setReportSubScreen('attendance')}
                className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:border-slate-300 transition-all text-left flex items-center justify-between cursor-pointer active:scale-98"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shadow-sm">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-800">1. Attendance Report</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Verified vs. absent rates, attendance history charts.</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300" />
              </button>

              {/* 2. Gatha Progress Report Category */}
              <button 
                onClick={() => setReportSubScreen('gatha')}
                className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:border-slate-300 transition-all text-left flex items-center justify-between cursor-pointer active:scale-98"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center shadow-sm">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-800">2. Gatha Progress Report</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Approved, pending, and rework metrics for Sutras.</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300" />
              </button>

              {/* 3. Student Performance Report Category */}
              <button 
                onClick={() => setReportSubScreen('student')}
                className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:border-slate-300 transition-all text-left flex items-center justify-between cursor-pointer active:scale-98"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shadow-sm">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-800">3. Student Performance Report</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Bonus points, grades, academic progress, and promotions.</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300" />
              </button>

              {/* 4. Batch Summary Report Category */}
              <button 
                onClick={() => setReportSubScreen('batch')}
                className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:border-slate-300 transition-all text-left flex items-center justify-between cursor-pointer active:scale-98"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center shadow-sm">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-800">4. Batch Summary Report</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Cohort averages, size distributions, and pending reviews.</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300" />
              </button>

              {/* 5. Daily Activity Report Category */}
              <button 
                onClick={() => setReportSubScreen('daily')}
                className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:border-slate-300 transition-all text-left flex items-center justify-between cursor-pointer active:scale-98"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center shadow-sm">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-800">5. Daily Activity Report</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Chronological timeline of classes, approvals, and reviews.</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------- REPORT EXPORTS COMMON COMPONENT -------------------- */}
      {reportSubScreen !== 'home' && (
        <div className="px-5 pt-4">
          <div className="bg-slate-100 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-xs">
            <div>
              <p className="text-xs font-bold text-slate-700">Export Report Data (Prototype Only)</p>
              <p className="text-[10px] text-slate-400">Download formatted files containing verified logs.</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button 
                onClick={() => alert("PDF Report generation is a prototype feature. File will be processed in production.")}
                className="flex items-center justify-center gap-1.5 py-1.5 px-3 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-rose-500" />
                Export PDF
              </button>
              <button 
                onClick={() => alert("Excel Spreadsheet generation is a prototype feature. File will be processed in production.")}
                className="flex items-center justify-center gap-1.5 py-1.5 px-3 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-emerald-500" />
                Export Excel
              </button>
            </div>
          </div>
        </div>
      )}


      {/* -------------------- 1. ATTENDANCE REPORT SCREEN -------------------- */}
      {reportSubScreen === 'attendance' && (
        <div className="p-5 space-y-5">
          {/* Filters Panel */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-100">
              <Filter className="w-4 h-4 text-slate-400" />
              Interactive Filters
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Select Level</label>
                <select
                  value={filterLevel}
                  onChange={(e) => setFilterLevel(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-xs font-bold rounded-lg p-2 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  {levels.map(l => (
                    <option key={l} value={l}>{l === 'All' ? 'All Levels' : l.split(':')[0]}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Select Batch</label>
                <select
                  value={filterBatch}
                  onChange={(e) => setFilterBatch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-xs font-bold rounded-lg p-2 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  {batchesList.map(b => (
                    <option key={b} value={b}>{b === 'All' ? 'All Batches' : b}</option>
                  ))}
                </select>
              </div>

              <div className="col-span-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Select Session Date</label>
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-xs font-bold rounded-lg p-2 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Key Summary Metrics Cards */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">Attendance Breakdown</h3>
            
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-blue-50/40 p-3 rounded-xl border border-blue-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Total Students</p>
                <p className="text-2xl font-black text-blue-900 mt-1">{filteredStudents.length}</p>
              </div>
              <div className="bg-emerald-50/40 p-3 rounded-xl border border-emerald-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Attendance %</p>
                <p className="text-2xl font-black text-emerald-900 mt-1">
                  {filteredStudents.length > 0 
                    ? `${Math.round(filteredStudents.reduce((acc, s) => acc + parseInt(s.attendanceScore), 0) / filteredStudents.length)}%` 
                    : '0%'}
                </p>
              </div>
            </div>

            {/* Simulated bar chart or breakdown */}
            <div className="space-y-3 pt-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Interactive Visual Meter</p>
              
              <div className="space-y-2">
                {filteredStudents.map(student => {
                  const scoreNum = parseInt(student.attendanceScore);
                  return (
                    <div key={student.id} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-700">{student.name}</span>
                        <span className="text-slate-500 font-mono">{student.attendanceScore}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            scoreNum >= 90 ? 'bg-emerald-500' : scoreNum >= 80 ? 'bg-blue-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${scoreNum}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}


      {/* -------------------- 2. GATHA PROGRESS REPORT SCREEN -------------------- */}
      {reportSubScreen === 'gatha' && (
        <div className="p-5 space-y-5">
          {/* Filters Panel */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-100">
              <Filter className="w-4 h-4 text-slate-400" />
              Report Filters
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Level</label>
                  <select
                    value={filterLevel}
                    onChange={(e) => setFilterLevel(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-xs font-bold rounded-lg p-2 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    {levels.map(l => (
                      <option key={l} value={l}>{l === 'All' ? 'All Levels' : l.split(':')[0]}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Batch</label>
                  <select
                    value={filterBatch}
                    onChange={(e) => setFilterBatch(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-xs font-bold rounded-lg p-2 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    {batchesList.map(b => (
                      <option key={b} value={b}>{b === 'All' ? 'All Batches' : b}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Search Student Name</label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Type to filter..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 text-slate-900 text-xs font-semibold border border-slate-200 rounded-xl py-2.5 pl-9 pr-4 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Decision Gatha Statistics Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">Gatha Submissions Overview</h3>

            <div className="grid grid-cols-4 gap-2.5 text-center text-xs">
              <div className="bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                <span className="font-bold text-emerald-800 text-base block">12</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase mt-0.5 block">Approved</span>
              </div>
              <div className="bg-amber-50/50 p-2.5 rounded-xl border border-amber-100">
                <span className="font-bold text-amber-800 text-base block">3</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase mt-0.5 block">Pending</span>
              </div>
              <div className="bg-orange-50/50 p-2.5 rounded-xl border border-orange-100">
                <span className="font-bold text-orange-800 text-base block">2</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase mt-0.5 block">Rework</span>
              </div>
              <div className="bg-rose-50/50 p-2.5 rounded-xl border border-rose-100">
                <span className="font-bold text-rose-800 text-base block">1</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase mt-0.5 block">Rejected</span>
              </div>
            </div>

            <div className="space-y-3.5 pt-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Student Gatha Completion Progress</p>
              <div className="space-y-3">
                {filteredStudents.map(student => (
                  <div key={student.id} className="flex justify-between items-center text-xs bg-slate-55 p-3 rounded-xl border border-slate-100">
                    <div>
                      <span className="font-bold text-slate-800">{student.name}</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Completion: {student.gathaScore}</span>
                    </div>
                    {/* Progress Bar Badge */}
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${student.gathaPercentage}%` }}></div>
                      </div>
                      <span className="font-black text-slate-700 text-[11px] font-mono">{student.gathaPercentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}


      {/* -------------------- 3. STUDENT PERFORMANCE REPORT SCREEN -------------------- */}
      {reportSubScreen === 'student' && (
        <div className="p-5 space-y-5">
          {/* Quick Search Controls */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search student by name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-slate-900 text-sm font-medium border border-slate-200 rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-blue-500 placeholder:text-slate-500"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider ml-1">Student Performance Table</h3>
            
            {filteredStudents.length === 0 ? (
              <p className="text-xs text-slate-400 italic text-center py-6 bg-white rounded-2xl border border-slate-200">No matching students found.</p>
            ) : (
              <div className="space-y-4">
                {filteredStudents.map((student) => (
                  <div key={student.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3.5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-black text-slate-900 leading-tight">{student.name}</h4>
                        <p className="text-[10px] font-mono text-slate-500 mt-0.5">Student ID: {student.id}</p>
                      </div>
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded border uppercase tracking-wider ${
                        student.promotionStatus === 'Awaiting Promotion' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
                        student.promotionStatus === 'Revision Stage' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                        'bg-slate-50 text-slate-700 border-slate-100'
                      }`}>
                        {student.promotionStatus}
                      </span>
                    </div>

                    {/* Breakdown table list */}
                    <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                      <div className="flex justify-between">
                        <span className="font-bold text-slate-400">Attendance Score:</span>
                        <span className="font-bold text-slate-700">{student.attendanceScore}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold text-slate-400">Gathas Progress:</span>
                        <span className="font-bold text-slate-700">{student.gathaScore}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold text-slate-400">Bonus Points:</span>
                        <span className="font-black text-amber-700">{student.bonusPoints} pts</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold text-slate-400">Academic Status:</span>
                        <span className="font-bold text-emerald-700">{student.overallProgress}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}


      {/* -------------------- 4. BATCH SUMMARY REPORT SCREEN -------------------- */}
      {reportSubScreen === 'batch' && (
        <div className="p-5 space-y-5">
          <div className="space-y-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider ml-1">Batch Cohort Performance</h3>

            {teacherBatches.length === 0 ? (
              <p className="text-xs text-slate-400 italic text-center py-6 bg-white rounded-2xl border border-slate-200">No batches assigned to your profile.</p>
            ) : (
              <div className="space-y-4">
                {teacherBatches.map((b, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                    <div>
                      <p className="text-[10px] font-black text-blue-500 uppercase tracking-wider">{b.level}</p>
                      <h4 className="text-base font-black text-slate-800 mt-0.5">{b.name}</h4>
                      <p className="text-xs text-slate-400 mt-1">Teacher: {b.teacher}</p>
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-center text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <div>
                        <span className="text-[9px] text-slate-400 font-bold block">Size</span>
                        <span className="font-bold text-slate-700">{b.totalStudents}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-emerald-500 font-bold block">Attend. %</span>
                        <span className="font-bold text-emerald-700">{b.attendanceRate}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-indigo-500 font-bold block">Gatha Comp.</span>
                        <span className="font-bold text-indigo-700">{b.gathaRate}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-amber-500 font-bold block">Pending Rev</span>
                        <span className="font-bold text-amber-700">{b.pendingReviews}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}


      {/* -------------------- 5. DAILY ACTIVITY TIMELINE SCREEN -------------------- */}
      {reportSubScreen === 'daily' && (
        <div className="p-5 space-y-5">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider ml-1">Chronological Log</h3>

          <div className="relative border-l-2 border-slate-200 pl-5 ml-2.5 space-y-6">
            {timelineEvents.map((evt) => (
              <div key={evt.id} className="relative">
                {/* Timeline dot */}
                <div className={`absolute -left-[27px] top-1 w-3 h-3 rounded-full border-2 border-white ${
                  evt.type === 'class' ? 'bg-blue-500' :
                  evt.type === 'attendance' ? 'bg-emerald-500' :
                  evt.type === 'gatha_approve' ? 'bg-indigo-500' :
                  evt.type === 'gatha_rework' ? 'bg-orange-500' :
                  'bg-amber-500'
                }`}></div>

                <div>
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                    <span>{evt.date} • {evt.time}</span>
                    <span className="font-mono">{evt.id}</span>
                  </div>
                  <h4 className="text-sm font-black text-slate-800 mt-1">{evt.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed bg-white border border-slate-200 p-2.5 rounded-xl shadow-xs mt-1.5">
                    {evt.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </motion.div>
  );
}
