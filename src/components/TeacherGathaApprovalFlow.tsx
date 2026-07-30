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
  ChevronRight
} from 'lucide-react';

interface Submission {
  id: string;
  studentId: string;
  studentName: string;
  level: string;
  batch: string;
  chapter: string; // Sutra / Stavan / Stuti
  topic: string; // Gatha
  submissionDate: string;
  status: 'Pending Review' | 'Approved' | 'Rework Required' | 'Rejected';
  pointsAwarded?: number;
  teacherRemarks?: string;
  audioUrl?: string; // Optional simulated submission recording
  reviewedDate?: string;
  history?: Array<{
    date: string;
    status: 'Pending Review' | 'Approved' | 'Rework Required' | 'Rejected';
    teacherRemarks: string;
  }>;
}

interface TeacherGathaApprovalFlowProps {
  activeScreen: string;
  setActiveScreen: (screen: string) => void;
  currentLoggedInTeacher: any;
}

export function TeacherGathaApprovalFlow({
  activeScreen,
  setActiveScreen,
  currentLoggedInTeacher
}: TeacherGathaApprovalFlowProps) {
  const teacherName = currentLoggedInTeacher?.name || "Samani Pragya ji";

  // Initial Gatha submissions mock database
  const [submissions, setSubmissions] = useState<Submission[]>([
    {
      id: 'SUB001',
      studentId: 'STU001',
      studentName: 'Aarav Shah',
      level: 'Level 1: Basic Sutras & Stories',
      batch: 'Batch A - Morning',
      chapter: 'Sutra: Navkar Mantra',
      topic: 'Gatha 1-2 (Sanskrit Pronunciation)',
      submissionDate: '2026-07-04',
      status: 'Pending Review',
      history: [
        { date: '2026-06-15', status: 'Rework Required', teacherRemarks: 'Focus on pronouncing "Namaskara" and "Siddhanam" with proper retroflex sounds.' }
      ]
    },
    {
      id: 'SUB002',
      studentId: 'STU002',
      studentName: 'Diya Patel',
      level: 'Level 1: Basic Sutras & Stories',
      batch: 'Batch A - Morning',
      chapter: 'Stavan: Maitri Bhavnu Pavitra',
      topic: 'Gatha 3 (Compassion for all creatures)',
      submissionDate: '2026-07-05',
      status: 'Pending Review',
      history: []
    },
    {
      id: 'SUB003',
      studentId: 'STU003',
      studentName: 'Rohan Jain',
      level: 'Level 2: Jain Geography & Symbols',
      batch: 'Batch B - Afternoon',
      chapter: 'Stuti: Chattari Mangalam',
      topic: 'Gatha 1-4 (Four Auspicious Refuges)',
      submissionDate: '2026-07-05',
      status: 'Pending Review',
      history: [
        { date: '2026-06-20', status: 'Approved', teacherRemarks: 'Beautifully recited with precise pause timings!' }
      ]
    },
    // Submissions for STU004 & STU005 (Pujya Samanji Dr. Shrutpragya ji)
    {
      id: 'SUB004',
      studentId: 'STU004',
      studentName: 'Kavya Doshi',
      level: 'Level 2: Jain Geography & Symbols',
      batch: 'Batch B - Afternoon',
      chapter: 'Sutra: Logassa Sutra',
      topic: 'Gatha 1-5 (24 Tirthankara praises)',
      submissionDate: '2026-07-03',
      status: 'Pending Review',
      history: []
    },
    {
      id: 'SUB005',
      studentId: 'STU005',
      studentName: 'Siddharth Mehta',
      level: 'Level 1: Basic Sutras & Stories',
      batch: 'Batch A - Morning',
      chapter: 'Sutra: Chattari Mangalam',
      topic: 'Gatha 1-2 (The Auspicious Four)',
      submissionDate: '2026-07-04',
      status: 'Pending Review',
      history: [
        { date: '2026-06-12', status: 'Rework Required', teacherRemarks: 'Kindly record again as there was excessive background noise.' }
      ]
    },
    // Previously reviewed mock data for both teachers
    {
      id: 'SUB006',
      studentId: 'STU001',
      studentName: 'Aarav Shah',
      level: 'Level 1: Basic Sutras & Stories',
      batch: 'Batch A - Morning',
      chapter: 'Sutra: Chattari Mangalam',
      topic: 'Gatha 3-4 (Siddha & Sahu Refuges)',
      submissionDate: '2026-06-28',
      status: 'Approved',
      pointsAwarded: 50,
      teacherRemarks: 'Excellent pronunciation and perfect speed rhythm!',
      reviewedDate: '2026-06-29',
      history: []
    },
    {
      id: 'SUB007',
      studentId: 'STU002',
      studentName: 'Diya Patel',
      level: 'Level 1: Basic Sutras & Stories',
      batch: 'Batch A - Morning',
      chapter: 'Sutra: Navkar Mantra',
      topic: 'Gatha 3-5 (Arihantanam, Siddhanam, Ayariyanam)',
      submissionDate: '2026-06-25',
      status: 'Rework Required',
      teacherRemarks: 'Make sure to distinctively pronounce "Uvajjhayanam". Please resubmit with more clarity.',
      reviewedDate: '2026-06-26',
      history: []
    },
    {
      id: 'SUB008',
      studentId: 'STU003',
      studentName: 'Rohan Jain',
      level: 'Level 2: Jain Geography & Symbols',
      batch: 'Batch B - Afternoon',
      chapter: 'Sutra: Logassa Sutra',
      topic: 'Gatha 1-2 (Kirtanam & Vandanam)',
      submissionDate: '2026-06-24',
      status: 'Approved',
      pointsAwarded: 75,
      teacherRemarks: 'Remarkable dedication shown. Heartiest blessings!',
      reviewedDate: '2026-06-25',
      history: []
    },
    {
      id: 'SUB009',
      studentId: 'STU004',
      studentName: 'Kavya Doshi',
      level: 'Level 2: Jain Geography & Symbols',
      batch: 'Batch B - Afternoon',
      chapter: 'Sutra: Pratikraman Sutras',
      topic: 'Iryavahiyam Sutra (Seeking forgiveness)',
      submissionDate: '2026-06-30',
      status: 'Rejected',
      teacherRemarks: 'Please submit the correct recording for Level 2 Iryavahiyam. You uploaded Level 1 Navkar Mantra instead.',
      reviewedDate: '2026-07-01',
      history: []
    }
  ]);

  // Active sub-tab inside Gatha Approval screen
  const [activeTab, setActiveTab] = useState<'Pending' | 'Reviewed' | 'All'>('Pending');

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState('All');
  const [filterBatch, setFilterBatch] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  // Selected submission for the detail screen
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null);

  // Remarks draft state
  const [remarksDraft, setRemarksDraft] = useState('');

  // Level & Batch choices matching students database
  const levels = ['All', 'Level 1: Basic Sutras & Stories', 'Level 2: Jain Geography & Symbols'];
  const batches = ['All', 'Batch A - Morning', 'Batch B - Afternoon'];
  const statuses = ['All', 'Pending Review', 'Approved', 'Rework Required', 'Rejected'];

  // Helper to resolve student teacher by matching mock student names with their known teacher
  const getStudentTeacher = (studentName: string): string => {
    if (['Aarav Shah', 'Diya Patel', 'Rohan Jain'].includes(studentName)) {
      return "Samani Pragya ji";
    }
    return "Pujya Samanji Dr. Shrutpragya ji";
  };

  // 1. FILTER SUBMISSIONS BY LOGGED-IN TEACHER ONLY
  // Teachers should ONLY see submissions from students assigned to their own batches / themselves.
  // Teachers must NEVER access submissions from another teacher's students.
  const mySubmissions = submissions.filter(sub => {
    const studentTeacher = getStudentTeacher(sub.studentName);
    return studentTeacher === teacherName;
  });

  // Filter based on Tab selection
  const tabFilteredSubmissions = mySubmissions.filter(sub => {
    if (activeTab === 'Pending') {
      return sub.status === 'Pending Review';
    } else if (activeTab === 'Reviewed') {
      return sub.status !== 'Pending Review';
    }
    return true; // All
  });

  // Filter based on Search & Dropdowns
  const finalFilteredSubmissions = tabFilteredSubmissions.filter(sub => {
    const matchesSearch = 
      sub.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      sub.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = filterLevel === 'All' || sub.level === filterLevel;
    const matchesBatch = filterBatch === 'All' || sub.batch === filterBatch;
    const matchesStatus = filterStatus === 'All' || sub.status === filterStatus;

    return matchesSearch && matchesLevel && matchesBatch && matchesStatus;
  });

  // Current viewed submission details object
  const currentSubmission = submissions.find(sub => sub.id === selectedSubmissionId);

  // Status Style Helper
  const getStatusBadgeStyles = (status: Submission['status']) => {
    switch (status) {
      case 'Pending Review':
        return {
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
          dot: 'bg-amber-500',
          icon: Clock,
          label: '🟡 Pending Review'
        };
      case 'Approved':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dot: 'bg-emerald-500',
          icon: CheckCircle2,
          label: '🟢 Approved'
        };
      case 'Rework Required':
        return {
          bg: 'bg-orange-50 text-orange-700 border-orange-200',
          dot: 'bg-orange-500',
          icon: AlertTriangle,
          label: '🟠 Rework Required'
        };
      case 'Rejected':
        return {
          bg: 'bg-rose-50 text-rose-700 border-rose-200',
          dot: 'bg-rose-500',
          icon: AlertCircle,
          label: '🔴 Rejected'
        };
      default:
        return {
          bg: 'bg-slate-50 text-slate-700 border-slate-200',
          dot: 'bg-slate-500',
          icon: Clock,
          label: 'Pending'
        };
    }
  };

  // ACTION HANDLER
  const handleReviewAction = (actionStatus: 'Approved' | 'Rework Required' | 'Rejected') => {
    if (!selectedSubmissionId) return;

    // Validate if Rework or Reject has remarks filled (remarks are optional for Approve)
    if ((actionStatus === 'Rework Required' || actionStatus === 'Rejected') && !remarksDraft.trim()) {
      alert(`Please write a teacher remark explaining why this submission requires ${actionStatus === 'Rework Required' ? 'rework' : 'rejection'}.`);
      return;
    }

    setSubmissions(prev => prev.map(sub => {
      if (sub.id === selectedSubmissionId) {
        // Business Rules logic:
        // • Approved: status Approved, Gatha Points awarded (e.g. 50 bonus pts)
        // • Rework Required: status Rework Required, no points
        // • Rejected: status Rejected, no points
        const points = actionStatus === 'Approved' ? 50 : undefined;
        return {
          ...sub,
          status: actionStatus,
          teacherRemarks: remarksDraft.trim() || undefined,
          pointsAwarded: points,
          reviewedDate: new Date().toISOString().split('T')[0]
        };
      }
      return sub;
    }));

    alert(`Successfully saved submission as ${actionStatus}!`);
    setRemarksDraft('');
    setSelectedSubmissionId(null);
    setActiveScreen('TeacherGathaApprovals');
  };

  // SCREEN 2: SUBMISSION DETAILS VIEW
  if (activeScreen === 'TeacherGathaSubmissionDetails' && currentSubmission) {
    const badge = getStatusBadgeStyles(currentSubmission.status);
    const StatusIcon = badge.icon;
    
    // Look up other submissions by this student for decision history
    const previousDecisions = submissions.filter(
      sub => sub.studentId === currentSubmission.studentId && sub.id !== currentSubmission.id && sub.status !== 'Pending Review'
    );

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="h-full bg-slate-50 overflow-y-auto pb-24 text-slate-800"
      >
        {/* Header */}
        <div className="bg-white px-5 py-4 flex items-center gap-3 border-b border-slate-200 sticky top-0 z-20">
          <button 
            onClick={() => { 
              setActiveScreen('TeacherGathaApprovals'); 
              setRemarksDraft('');
            }} 
            className="p-2 hover:bg-slate-100 rounded-full transition-colors active:scale-95 cursor-pointer"
          >
            <ArrowRight className="w-5 h-5 text-slate-700 rotate-180" />
          </button>
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">Submission Details</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase font-mono mt-0.5">ID: {currentSubmission.id}</p>
          </div>
        </div>

        <div className="p-5 space-y-5">
          {/* Status Bar */}
          <div className={`border p-4 rounded-2xl flex items-center justify-between ${badge.bg}`}>
            <div className="flex items-center gap-2.5">
              <StatusIcon className="w-5 h-5" />
              <div>
                <p className="text-xs font-black uppercase tracking-wider">Current Status</p>
                <p className="text-sm font-bold mt-0.5">{currentSubmission.status}</p>
              </div>
            </div>
            {currentSubmission.pointsAwarded && (
              <div className="text-right bg-white/60 px-3 py-1 rounded-xl border border-emerald-200">
                <p className="text-[9px] font-black text-emerald-800 uppercase tracking-wider">Points Awarded</p>
                <p className="text-sm font-black text-emerald-950">+{currentSubmission.pointsAwarded} pts</p>
              </div>
            )}
          </div>

          {/* Student Info Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2 pb-2 border-b border-slate-100">
              <User className="w-4 h-4 text-blue-500" />
              Student Information
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 font-black text-base flex items-center justify-center border-2 border-white shadow-sm">
                {currentSubmission.studentName.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h4 className="text-base font-black text-slate-900">{currentSubmission.studentName}</h4>
                <p className="text-xs font-mono text-slate-500 mt-0.5">ID: {currentSubmission.studentId}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Assigned Level</p>
                <p className="text-xs font-bold text-slate-700 mt-0.5">{currentSubmission.level}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Assigned Batch</p>
                <p className="text-xs font-bold text-slate-700 mt-0.5">{currentSubmission.batch}</p>
              </div>
            </div>
          </div>

          {/* Submitted Work Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2 pb-2 border-b border-slate-100">
              <BookOpen className="w-4 h-4 text-indigo-500" />
              Submitted Work
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Chapter</p>
                <p className="text-sm font-bold text-slate-800 mt-0.5">{currentSubmission.chapter}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Topic / Gatha Verse</p>
                <p className="text-sm font-semibold text-indigo-900 bg-indigo-50/50 p-3 rounded-xl border border-indigo-100/50 mt-1">
                  {currentSubmission.topic}
                </p>
              </div>
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Submitted On</p>
                  <p className="text-xs font-bold text-slate-700 mt-0.5">{currentSubmission.submissionDate}</p>
                </div>
                {/* Simulated audio attachment badge */}
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping"></span>
                  Audio Included
                </span>
              </div>
            </div>
          </div>

          {/* Existing Remarks if reviewed previously */}
          {currentSubmission.teacherRemarks && (
            <div className="bg-slate-100 border border-slate-200 rounded-2xl p-5">
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center gap-2 mb-2">
                <MessageSquare className="w-4 h-4 text-slate-400" />
                Previous Teacher Remarks
              </h4>
              <p className="text-sm text-slate-700 italic">"{currentSubmission.teacherRemarks}"</p>
              {currentSubmission.reviewedDate && (
                <p className="text-[10px] font-mono text-slate-400 mt-2 text-right">Reviewed on: {currentSubmission.reviewedDate}</p>
              )}
            </div>
          )}

          {/* Teacher Review Actions Panel (Only if Pending Review) */}
          {currentSubmission.status === 'Pending Review' ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-100">
                <Award className="w-4 h-4 text-amber-500" />
                Teacher Action Control
              </h3>

              {/* Remarks Textarea */}
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">
                  Teacher Remarks
                </label>
                <textarea
                  value={remarksDraft}
                  onChange={(e) => setRemarksDraft(e.target.value)}
                  placeholder="Provide guidance, correct pronunciation flaws, or spell blessings here..."
                  className="w-full text-slate-800 text-sm font-medium border border-slate-200 rounded-xl p-3 h-24 focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400 resize-none"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  *Remarks are optional for approvals, but mandatory for "Rework Required" and "Reject" decisions.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-2.5 pt-2">
                {/* Reject */}
                <button
                  onClick={() => handleReviewAction('Rejected')}
                  className="py-3 px-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 transition-colors cursor-pointer flex flex-col items-center justify-center gap-1.5 active:scale-95"
                >
                  <X className="w-4 h-4 text-rose-500" />
                  ❌ Reject
                </button>

                {/* Rework Required */}
                <button
                  onClick={() => handleReviewAction('Rework Required')}
                  className="py-3 px-1.5 bg-orange-50 hover:bg-orange-100 text-orange-700 font-bold text-xs rounded-xl border border-orange-200 transition-colors cursor-pointer flex flex-col items-center justify-center gap-1.5 active:scale-95"
                >
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                  🟠 Rework
                </button>

                {/* Approve */}
                <button
                  onClick={() => handleReviewAction('Approved')}
                  className="py-3 px-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors shadow-sm cursor-pointer flex flex-col items-center justify-center gap-1.5 active:scale-95"
                >
                  <Check className="w-4 h-4 text-white" />
                  ✅ Approve
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <p className="text-xs text-slate-500 font-bold">This submission has already been processed.</p>
            </div>
          )}

          {/* Submission History Decision Tracker */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2 pb-2 border-b border-slate-100">
              <History className="w-4 h-4 text-slate-500" />
              Submission History
            </h3>
            {previousDecisions.length === 0 ? (
              <p className="text-xs text-slate-400 italic text-center py-2">No other decisions recorded for this student.</p>
            ) : (
              <div className="space-y-3.5">
                {previousDecisions.map((historyItem) => {
                  const hBadge = getStatusBadgeStyles(historyItem.status);
                  return (
                    <div key={historyItem.id} className="text-xs border border-slate-100 rounded-xl p-3 bg-slate-50/50 space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-700">{historyItem.chapter.split(': ')[1]}</span>
                        <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase ${hBadge.bg}`}>
                          {historyItem.status}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500">Topic: {historyItem.topic}</p>
                      {historyItem.teacherRemarks && (
                        <p className="text-slate-600 italic bg-white p-2 rounded border border-slate-100 mt-1">
                          "{historyItem.teacherRemarks}"
                        </p>
                      )}
                      <p className="text-[9px] font-mono text-slate-400 text-right">Reviewed: {historyItem.reviewedDate || historyItem.submissionDate}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // SCREEN 1: APPROVAL QUEUE LIST
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full bg-slate-50 overflow-y-auto pb-24 text-slate-800"
    >
      {/* Header and Controls */}
      <div className="bg-white px-5 pt-8 pb-4 border-b border-slate-200 sticky top-0 z-20">
        <div className="flex items-center gap-3 mb-4">
          <button 
            onClick={() => setActiveScreen('TeacherDashboard')} 
            className="p-2 hover:bg-slate-100 rounded-full transition-colors active:scale-95 cursor-pointer"
          >
            <ArrowRight className="w-5 h-5 text-slate-700 rotate-180" />
          </button>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Gatha Approvals</h1>
        </div>

        {/* Queue Sub-Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-4">
          {(['Pending', 'Reviewed', 'All'] as const).map((tab) => {
            const count = mySubmissions.filter(sub => {
              if (tab === 'Pending') return sub.status === 'Pending Review';
              if (tab === 'Reviewed') return sub.status !== 'Pending Review';
              return true;
            }).length;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 font-bold text-xs rounded-lg cursor-pointer transition-all ${
                  activeTab === tab
                    ? 'bg-white text-slate-800 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab} ({count})
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative mb-3">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search student by name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100 text-slate-900 text-sm font-medium rounded-xl py-3 pl-11 pr-4 border-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-500"
          />
        </div>

        {/* Interactive Filters Panel */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <div className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 rounded-lg text-slate-500 border border-slate-200 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span className="text-[10px] font-black uppercase">Filters</span>
          </div>

          {/* Level Filter */}
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="shrink-0 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-blue-500 cursor-pointer"
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
            className="shrink-0 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            {batches.map(batch => (
              <option key={batch} value={batch}>
                {batch === 'All' ? 'All Batches' : batch}
              </option>
            ))}
          </select>

          {/* Status Filter (Only visible in 'All' or 'Reviewed' Tab) */}
          {activeTab !== 'Pending' && (
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="shrink-0 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {statuses.map(st => (
                <option key={st} value={st}>
                  {st === 'All' ? 'All Statuses' : st}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Submission Cards Grid */}
      <div className="p-5 space-y-4">
        {finalFilteredSubmissions.length === 0 ? (
          <div className="text-center py-12 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-bold text-slate-600">No submissions found</p>
            <p className="text-xs text-slate-400 mt-1">There are no submissions matching your filters or search.</p>
          </div>
        ) : (
          finalFilteredSubmissions.map((sub) => {
            const badge = getStatusBadgeStyles(sub.status);
            return (
              <div 
                key={sub.id} 
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                {/* Top Section: Student & Status */}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-sm font-black text-slate-800 leading-tight">{sub.studentName}</h3>
                    <p className="text-[10px] font-mono text-slate-500 mt-0.5">ID: {sub.studentId}</p>
                  </div>
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded border uppercase tracking-wider ${badge.bg}`}>
                    {sub.status}
                  </span>
                </div>

                {/* Level & Batch Info */}
                <div className="space-y-1 text-xs mb-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className="flex justify-between">
                    <span className="font-bold text-slate-400 text-[10px] uppercase">Level:</span>
                    <span className="font-semibold text-slate-700 text-right">{sub.level.split(':')[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-slate-400 text-[10px] uppercase">Batch:</span>
                    <span className="font-semibold text-slate-700 text-right">{sub.batch}</span>
                  </div>
                </div>

                {/* Chapter & Topic */}
                <div className="mb-4">
                  <p className="text-[10px] font-black text-indigo-500 uppercase tracking-wider">{sub.chapter}</p>
                  <p className="text-xs font-bold text-slate-700 mt-0.5 truncate">{sub.topic}</p>
                  <p className="text-[9px] text-slate-400 mt-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Submitted: {sub.submissionDate}
                  </p>
                </div>

                {/* Action Button: View Details */}
                <button
                  onClick={() => {
                    setSelectedSubmissionId(sub.id);
                    setActiveScreen('TeacherGathaSubmissionDetails');
                  }}
                  className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition-colors cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
                >
                  View Submission details
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })
        )}
      </div>
    </motion.div>
  );
}
