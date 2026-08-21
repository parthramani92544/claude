import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Search, 
  Check, 
  X, 
  Clock, 
  AlertCircle, 
  AlertTriangle, 
  CheckCircle2, 
  User, 
  Calendar, 
  BookOpen, 
  History, 
  ChevronRight,
  GraduationCap,
  Users,
  SlidersHorizontal
} from 'lucide-react';

interface Submission {
  id: string;
  studentId: string;
  studentName: string;
  level: string;
  levelShort: string;
  batch: string;
  chapter: string;
  topic: string;
  submissionDate: string;
  status: 'Pending Review' | 'Approved' | 'Rework Required' | 'Rejected';
  pointsAwarded?: number;
  teacherRemarks?: string;
  reviewedDate?: string;
  history?: Array<{
    id: string;
    chapterName: string;
    topic: string;
    status: 'Pending Review' | 'Approved' | 'Rework Required' | 'Rejected';
    teacherRemarks: string;
    reviewedDate: string;
  }>;
}

interface TeacherGathaApprovalFlowProps {
  activeScreen: string;
  setActiveScreen: (screen: string) => void;
  currentLoggedInTeacher: any;
}

// Decorative Golden Lotus Divider component
function GoldenLotusDivider() {
  return (
    <div className="flex items-center justify-center gap-2.5 my-2">
      <div className="h-[1px] w-14 bg-[#D6C29E]" />
      <svg viewBox="0 0 24 16" className="w-5 h-4 text-[#C4883A]" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M 12 15 C 12 8 8 3 5 7 C 3 10 6 15 12 15 Z" />
        <path d="M 12 15 C 12 8 16 3 19 7 C 21 10 18 15 12 15 Z" />
        <path d="M 12 15 C 10 9 10 3 12 1 C 14 3 14 9 12 15 Z" />
      </svg>
      <div className="h-[1px] w-14 bg-[#D6C29E]" />
    </div>
  );
}

// Sprout / Leaf SVG Icon matching screenshot avatar badge
function SproutIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 20h10" />
      <path d="M12 20v-8" />
      <path d="M12 12c-3-2.5-6-1-6 2 3.5 0 5.5-1 6-2z" />
      <path d="M12 12c3-2.5 6-1 6 2-3.5 0-5.5-1-6-2z" />
      <path d="M12 12c0-4 3-7 6-7 0 4-3 7-6 7z" />
      <path d="M12 12c0-4-3-7-6-7 0 4 3 7 6 7z" />
    </svg>
  );
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
      levelShort: 'Level 1 · Basic',
      batch: 'Batch A – Morning',
      chapter: 'Sutra: Navkar Mantra',
      topic: 'Gatha 1–2 (Sanskrit Pronunciation)',
      submissionDate: '4 Jul 2026',
      status: 'Pending Review',
      history: [
        {
          id: 'H01',
          chapterName: 'Chattari Mangalam',
          topic: 'Gatha 3–4 (Siddha & Sāhu Refugees)',
          status: 'Approved',
          teacherRemarks: 'Excellent pronunciation and perfect speed rhythm!',
          reviewedDate: '29 Jun 2026'
        }
      ]
    },
    {
      id: 'SUB002',
      studentId: 'STU002',
      studentName: 'Diya Patel',
      level: 'Level 1: Basic Sutras & Stories',
      levelShort: 'Level 1 · Basic',
      batch: 'Batch A – Morning',
      chapter: 'Stavan: Maitri Bhavnu Pavitra',
      topic: 'Gatha 3–4 (Siddha & Sāhu Refugees)',
      submissionDate: '3 Jul 2026',
      status: 'Pending Review',
      history: [
        {
          id: 'H02',
          chapterName: 'Navkar Mantra',
          topic: 'Gatha 1–2 (Arihanta & Siddha Namaskara)',
          status: 'Approved',
          teacherRemarks: 'Devotional rendering and pure clear diction.',
          reviewedDate: '26 Jun 2026'
        }
      ]
    },
    {
      id: 'SUB003',
      studentId: 'STU003',
      studentName: 'Rohan Jain',
      level: 'Level 2: Jain Geography & Symbols',
      levelShort: 'Level 2 · Intermediate',
      batch: 'Batch B – Afternoon',
      chapter: 'Stuti: Chattari Mangalam',
      topic: 'Gatha 1–4 (Four Auspicious Refuges)',
      submissionDate: '2 Jul 2026',
      status: 'Pending Review',
      history: [
        {
          id: 'H03',
          chapterName: 'Logassa Sutra',
          topic: 'Gatha 1–2 (Kirtanam & Vandanam)',
          status: 'Approved',
          teacherRemarks: 'Remarkable dedication shown. Heartiest blessings!',
          reviewedDate: '25 Jun 2026'
        }
      ]
    },
    {
      id: 'SUB004',
      studentId: 'STU004',
      studentName: 'Kavya Doshi',
      level: 'Level 2: Jain Geography & Symbols',
      levelShort: 'Level 2 · Intermediate',
      batch: 'Batch B – Afternoon',
      chapter: 'Sutra: Logassa Sutra',
      topic: 'Gatha 1–5 (24 Tirthankara praises)',
      submissionDate: '1 Jul 2026',
      status: 'Approved',
      pointsAwarded: 50,
      teacherRemarks: 'Splendid tone and flawless pronunciation of all Tirthankara names.',
      reviewedDate: '2 Jul 2026',
      history: []
    },
    {
      id: 'SUB005',
      studentId: 'STU005',
      studentName: 'Siddharth Mehta',
      level: 'Level 1: Basic Sutras & Stories',
      levelShort: 'Level 1 · Basic',
      batch: 'Batch A – Morning',
      chapter: 'Sutra: Chattari Mangalam',
      topic: 'Gatha 1–2 (The Auspicious Four)',
      submissionDate: '30 Jun 2026',
      status: 'Rework Required',
      teacherRemarks: 'Make sure to pause correctly after each pada. Please record again in a quiet room.',
      reviewedDate: '1 Jul 2026',
      history: []
    },
    {
      id: 'SUB006',
      studentId: 'STU001',
      studentName: 'Aarav Shah',
      level: 'Level 1: Basic Sutras & Stories',
      levelShort: 'Level 1 · Basic',
      batch: 'Batch A – Morning',
      chapter: 'Sutra: Chattari Mangalam',
      topic: 'Gatha 3–4 (Siddha & Sahu Refuges)',
      submissionDate: '28 Jun 2026',
      status: 'Approved',
      pointsAwarded: 50,
      teacherRemarks: 'Excellent pronunciation and perfect speed rhythm!',
      reviewedDate: '29 Jun 2026',
      history: []
    }
  ]);

  // Active sub-tab inside Gatha Approval screen: 'Pending' | 'Reviewed' | 'All'
  const [activeTab, setActiveTab] = useState<'Pending' | 'Reviewed' | 'All'>('Pending');

  // Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Selected submission ID for the detail screen
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null);

  // Remarks draft state for reviewing
  const [remarksDraft, setRemarksDraft] = useState('');

  // Helper to resolve student teacher by matching mock student names with their known teacher
  const getStudentTeacher = (studentName: string): string => {
    if (['Aarav Shah', 'Diya Patel', 'Rohan Jain'].includes(studentName)) {
      return "Samani Pragya ji";
    }
    return "Pujya Samanji Dr. Shrutpragya ji";
  };

  // Filter submissions by teacher
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

  // Filter based on Search
  const finalFilteredSubmissions = tabFilteredSubmissions.filter(sub => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      sub.studentName.toLowerCase().includes(query) || 
      sub.studentId.toLowerCase().includes(query) ||
      sub.chapter.toLowerCase().includes(query) ||
      sub.topic.toLowerCase().includes(query)
    );
  });

  // Current viewed submission details object
  const currentSubmission = submissions.find(sub => sub.id === selectedSubmissionId) || submissions[0];

  // Status Badge UI helper matching screenshots
  const renderStatusBadge = (status: Submission['status']) => {
    switch (status) {
      case 'Pending Review':
        return (
          <div className="bg-[#FEF7EC] text-[#B45309] border border-[#FDE68A] rounded-full px-3 py-1 text-xs font-semibold flex items-center gap-1.5 shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-[#B45309]" />
            <span>Pending</span>
          </div>
        );
      case 'Approved':
        return (
          <div className="bg-[#EBF7EE] text-[#1C4D36] border border-[#C8E6C9] rounded-full px-3 py-1 text-xs font-semibold flex items-center gap-1.5 shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#1C4D36]" />
            <span>Approved</span>
          </div>
        );
      case 'Rework Required':
        return (
          <div className="bg-[#FFF7ED] text-[#EA580C] border border-[#FED7AA] rounded-full px-3 py-1 text-xs font-semibold flex items-center gap-1.5 shadow-2xs">
            <AlertTriangle className="w-3.5 h-3.5 text-[#EA580C]" />
            <span>Rework</span>
          </div>
        );
      case 'Rejected':
        return (
          <div className="bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA] rounded-full px-3 py-1 text-xs font-semibold flex items-center gap-1.5 shadow-2xs">
            <AlertCircle className="w-3.5 h-3.5 text-[#DC2626]" />
            <span>Rejected</span>
          </div>
        );
      default:
        return (
          <div className="bg-slate-50 text-slate-600 border border-slate-200 rounded-full px-3 py-1 text-xs font-semibold">
            {status}
          </div>
        );
    }
  };

  // Review action handler
  const handleReviewAction = (actionStatus: 'Approved' | 'Rework Required' | 'Rejected') => {
    if (!selectedSubmissionId) return;

    if ((actionStatus === 'Rework Required' || actionStatus === 'Rejected') && !remarksDraft.trim()) {
      alert(`Please write teacher remarks explaining why this submission requires ${actionStatus === 'Rework Required' ? 'rework' : 'rejection'}.`);
      return;
    }

    setSubmissions(prev => prev.map(sub => {
      if (sub.id === selectedSubmissionId) {
        const points = actionStatus === 'Approved' ? 50 : undefined;
        return {
          ...sub,
          status: actionStatus,
          teacherRemarks: remarksDraft.trim() || (actionStatus === 'Approved' ? 'Excellent pronunciation and blessed progress.' : undefined),
          pointsAwarded: points,
          reviewedDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
        };
      }
      return sub;
    }));

    setRemarksDraft('');
    setActiveScreen('TeacherGathaApprovals');
  };

  // Calculate counts for tabs
  const pendingCount = mySubmissions.filter(s => s.status === 'Pending Review').length;
  const reviewedCount = mySubmissions.filter(s => s.status !== 'Pending Review').length;
  const allCount = mySubmissions.length;

  // ==========================================
  // SCREEN 2: SUBMISSION DETAILS VIEW (SS 2 & 3)
  // ==========================================
  if (activeScreen === 'TeacherGathaSubmissionDetails' && currentSubmission) {
    const studentInitials = currentSubmission.studentName
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2);

    return (
      <motion.div
        initial={{ opacity: 0, x: 15 }}
        animate={{ opacity: 1, x: 0 }}
        className="h-full bg-[#FCFAF7] overflow-y-auto pb-28 text-slate-800"
      >
        {/* Header matching SS 2 & 3 */}
        <div className="bg-[#FCFAF7] px-5 pt-8 pb-3 border-b border-[#EEDBBD]/50 sticky top-0 z-20">
          <div className="relative flex items-center justify-center">
            <button 
              onClick={() => { 
                setActiveScreen('TeacherGathaApprovals'); 
                setRemarksDraft('');
              }} 
              className="absolute left-0 p-2 hover:bg-black/5 rounded-full transition-colors active:scale-95 cursor-pointer text-slate-700"
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
            </button>
            <div className="text-center">
              <h1 className="text-xl sm:text-2xl font-bold font-serif text-[#1C4D36] tracking-tight">
                Submission Details
              </h1>
              <p className="text-xs text-slate-500 font-mono tracking-wider mt-0.5">
                ID: {currentSubmission.id}
              </p>
            </div>
          </div>
          <GoldenLotusDivider />
        </div>

        <div className="p-4 sm:p-5 space-y-4 max-w-lg mx-auto">
          {/* Card 1: Current Status Card */}
          <div className="bg-[#FAF6ED] border border-[#EADBBD] rounded-2xl p-4 sm:p-5 flex items-center gap-4 shadow-xs">
            <div className="w-11 h-11 rounded-full bg-white/90 border border-[#F5E6CC] flex items-center justify-center text-[#B45309] shrink-0">
              <Clock className="w-6 h-6 text-[#B45309]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-600">Current Status</p>
              <p className="text-lg font-bold text-[#B45309] font-serif tracking-tight mt-0.5">
                {currentSubmission.status}
              </p>
            </div>
          </div>

          {/* Card 2: Student Information */}
          <div className="bg-white rounded-2xl p-5 border border-[#EDE8DE] shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-1">
              <User className="w-5 h-5 text-[#1C4D36]" />
              <h3 className="text-base font-serif font-bold text-[#1C4D36]">
                Student Information
              </h3>
            </div>
            <div className="h-[1px] bg-[#F2ECE1]" />

            {/* Profile Row */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#EBF5EE] text-[#1C4D36] font-bold text-base flex items-center justify-center shrink-0 border border-[#D5EBDC]">
                {studentInitials}
              </div>
              <div>
                <h4 className="text-lg font-bold font-serif text-slate-900 leading-tight">
                  {currentSubmission.studentName}
                </h4>
                <p className="text-xs font-mono text-slate-400 mt-0.5 tracking-wider">
                  ID: {currentSubmission.studentId}
                </p>
              </div>
            </div>

            {/* Level & Batch 2-Column Grid */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#F2ECE1]">
              <div className="text-center p-2">
                <div className="w-9 h-9 rounded-full bg-[#EBF5EE] text-[#1C4D36] flex items-center justify-center mx-auto mb-1.5">
                  <GraduationCap className="w-4.5 h-4.5" />
                </div>
                <p className="font-bold text-slate-800 text-sm">
                  {currentSubmission.level.split(':')[0]}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                  {currentSubmission.level.split(':')[1]?.trim() || 'Basic Sutras & Stories'}
                </p>
              </div>

              <div className="text-center p-2 border-l border-[#F2ECE1]">
                <div className="w-9 h-9 rounded-full bg-[#EBF5EE] text-[#1C4D36] flex items-center justify-center mx-auto mb-1.5">
                  <Users className="w-4.5 h-4.5" />
                </div>
                <p className="font-bold text-slate-800 text-sm">
                  {currentSubmission.batch.split('–')[0]?.trim() || 'Batch A'}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                  {currentSubmission.batch.split('–')[1]?.trim() || 'Morning'}
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Submitted Work */}
          <div className="bg-white rounded-2xl p-5 border border-[#EDE8DE] shadow-xs space-y-3.5">
            <div className="flex items-center gap-2 pb-1">
              <BookOpen className="w-5 h-5 text-[#1C4D36]" />
              <h3 className="text-base font-serif font-bold text-[#1C4D36]">
                Submitted Work
              </h3>
            </div>

            {/* Chapter Box */}
            <div>
              <p className="text-xs font-semibold text-slate-500 mb-1">Chapter</p>
              <div className="bg-[#F8FAF7] border border-[#E2EBE4] rounded-xl p-3.5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white text-[#1C4D36] border border-[#D5E4D8] flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold text-slate-800">
                  {currentSubmission.chapter}
                </span>
              </div>
            </div>

            {/* Topic Box */}
            <div>
              <p className="text-xs font-semibold text-slate-500 mb-1">Topic</p>
              <div className="bg-[#F8FAF7] border border-[#E2EBE4] rounded-xl p-3.5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white text-[#1C4D36] border border-[#D5E4D8] flex items-center justify-center shrink-0">
                  <SproutIcon className="w-4 h-4 text-[#1C4D36]" />
                </div>
                <span className="text-sm font-bold text-slate-800">
                  {currentSubmission.topic}
                </span>
              </div>
            </div>
          </div>

          {/* Card 4: Teacher Action (Screenshot 3) */}
          <div className="bg-white rounded-2xl p-5 border border-[#EDE8DE] shadow-xs space-y-3.5">
            <div className="flex items-center gap-2 pb-1">
              <User className="w-5 h-5 text-[#1C4D36]" />
              <h3 className="text-base font-serif font-bold text-[#1C4D36]">
                Teacher Action
              </h3>
            </div>

            {/* Remarks Textarea */}
            <div>
              <p className="text-xs font-semibold text-slate-500 mb-1">Remarks</p>
              <div className="relative">
                <textarea
                  value={remarksDraft}
                  onChange={(e) => setRemarksDraft(e.target.value)}
                  placeholder="Add guidance, pronunciation feedback, or blessings..."
                  className="w-full bg-[#FCFAF7] border border-[#EDE8DE] rounded-2xl p-3.5 text-sm min-h-[110px] focus:outline-none focus:ring-2 focus:ring-[#1C4D36]/20 focus:border-[#1C4D36] text-slate-800 placeholder:text-slate-400 resize-none font-medium pr-10"
                />
                {/* Subtle Leaf watermark in bottom-right */}
                <div className="absolute right-3.5 bottom-3.5 opacity-25 pointer-events-none text-[#1C4D36]">
                  <SproutIcon className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-start gap-1.5 mt-2 text-[11.5px] text-slate-500">
                <span className="text-slate-400 font-bold">ⓘ</span>
                <span>Remarks are optional for Approve, and required for Rework or Reject.</span>
              </div>
            </div>

            {/* Action Buttons Grid matching SS 3 */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {/* Reject */}
              <button
                type="button"
                onClick={() => handleReviewAction('Rejected')}
                className="bg-[#FFF5F5] border border-[#FED7D7] hover:bg-[#FFEAE8] rounded-2xl py-3 px-2 flex flex-col items-center justify-center gap-1.5 text-[#C53030] cursor-pointer transition-all active:scale-95 shadow-2xs"
              >
                <div className="w-6 h-6 rounded-full border-2 border-[#C53030] flex items-center justify-center">
                  <X className="w-3.5 h-3.5 text-[#C53030] stroke-[2.5]" />
                </div>
                <span className="font-bold text-xs sm:text-sm text-[#C53030]">Reject</span>
              </button>

              {/* Rework */}
              <button
                type="button"
                onClick={() => handleReviewAction('Rework Required')}
                className="bg-[#FFFBEB] border border-[#FDE68A] hover:bg-[#FEF3C7] rounded-2xl py-3 px-2 flex flex-col items-center justify-center gap-1.5 text-[#D97706] cursor-pointer transition-all active:scale-95 shadow-2xs"
              >
                <AlertTriangle className="w-6 h-6 text-[#D97706]" />
                <span className="font-bold text-xs sm:text-sm text-[#D97706]">Rework</span>
              </button>

              {/* Approve */}
              <button
                type="button"
                onClick={() => handleReviewAction('Approved')}
                className="bg-[#1C4D36] hover:bg-[#153B29] rounded-2xl py-3 px-2 flex flex-col items-center justify-center gap-1.5 text-white cursor-pointer transition-all active:scale-95 shadow-2xs"
              >
                <div className="w-6 h-6 rounded-full bg-white/20 border border-white flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                </div>
                <span className="font-bold text-xs sm:text-sm text-white">Approve</span>
              </button>
            </div>
          </div>

          {/* Card 5: Submission History */}
          <div className="bg-white rounded-2xl p-5 border border-[#EDE8DE] shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-1">
              <History className="w-5 h-5 text-[#1C4D36]" />
              <h3 className="text-base font-serif font-bold text-[#1C4D36]">
                Submission History
              </h3>
            </div>

            {currentSubmission.history && currentSubmission.history.length > 0 ? (
              currentSubmission.history.map((hist) => (
                <div 
                  key={hist.id}
                  className="bg-[#FCFAF7] border border-[#EDE8DE] rounded-2xl p-4 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#EBF5EE] text-[#1C4D36] border border-[#D5EBDC] flex items-center justify-center shrink-0">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <span className="font-serif font-bold text-slate-800 text-sm">
                        {hist.chapterName}
                      </span>
                    </div>
                    <span className="bg-[#E8F5E9] text-[#1C4D36] border border-[#C8E6C9] text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase font-mono tracking-wider">
                      {hist.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 font-medium pl-10.5">
                    Topic: {hist.topic}
                  </p>

                  {hist.teacherRemarks && (
                    <p className="text-xs text-slate-700 italic font-serif leading-relaxed pl-10.5">
                      "{hist.teacherRemarks}"
                    </p>
                  )}

                  <div className="h-[1px] bg-[#EDE8DE] mt-2" />

                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono pt-1">
                    <Calendar className="w-3.5 h-3.5 text-[#B45309]" />
                    <span>Reviewed: {hist.reviewedDate}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-[#FCFAF7] border border-[#EDE8DE] rounded-2xl p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#EBF5EE] text-[#1C4D36] border border-[#D5EBDC] flex items-center justify-center shrink-0">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <span className="font-serif font-bold text-slate-800 text-sm">
                      Chattari Mangalam
                    </span>
                  </div>
                  <span className="bg-[#E8F5E9] text-[#1C4D36] border border-[#C8E6C9] text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase font-mono tracking-wider">
                    APPROVED
                  </span>
                </div>

                <p className="text-xs text-slate-500 font-medium pl-10.5">
                  Topic: Gatha 3–4 (Siddha & Sāhu Refugees)
                </p>

                <p className="text-xs text-slate-700 italic font-serif leading-relaxed pl-10.5">
                  "Excellent pronunciation and perfect speed rhythm!"
                </p>

                <div className="h-[1px] bg-[#EDE8DE] mt-2" />

                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono pt-1">
                  <Calendar className="w-3.5 h-3.5 text-[#B45309]" />
                  <span>Reviewed: 29 Jun 2026</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // ==========================================
  // SCREEN 1: APPROVAL QUEUE LIST (SS 1)
  // ==========================================
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full bg-[#FCFAF7] overflow-y-auto pb-28 text-slate-800"
    >
      {/* Header and Controls */}
      <div className="bg-[#FCFAF7] px-5 pt-8 pb-3 border-b border-[#EEDBBD]/50 sticky top-0 z-20">
        <div className="relative flex items-center justify-center mb-1">
          <button 
            onClick={() => setActiveScreen('TeacherDashboard')} 
            className="absolute left-0 p-2 hover:bg-black/5 rounded-full transition-colors active:scale-95 cursor-pointer text-slate-700"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
          </button>
          <h1 className="text-xl sm:text-2xl font-bold font-serif text-[#1C4D36] tracking-tight text-center">
            Gatha Approvals
          </h1>
        </div>

        {/* Decorative Golden Lotus Divider */}
        <GoldenLotusDivider />

        {/* 3 Pills Sub-Tabs matching SS 1 */}
        <div className="flex items-center gap-2.5 my-3.5">
          {/* Tab 1: Pending */}
          <button
            type="button"
            onClick={() => setActiveTab('Pending')}
            className={`flex-1 py-2.5 px-3 rounded-2xl flex items-center justify-center gap-2 font-bold text-xs cursor-pointer transition-all active:scale-95 ${
              activeTab === 'Pending'
                ? 'bg-[#1C4D36] text-white shadow-xs'
                : 'bg-[#FAF6ED] text-[#332B22] border border-[#EADBBD]'
            }`}
          >
            <span>Pending</span>
            <span className={`text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center font-mono ${
              activeTab === 'Pending' ? 'bg-white text-[#1C4D36]' : 'bg-[#F1E8D9] text-[#554A3D]'
            }`}>
              {pendingCount}
            </span>
          </button>

          {/* Tab 2: Reviewed */}
          <button
            type="button"
            onClick={() => setActiveTab('Reviewed')}
            className={`flex-1 py-2.5 px-3 rounded-2xl flex items-center justify-center gap-2 font-bold text-xs cursor-pointer transition-all active:scale-95 ${
              activeTab === 'Reviewed'
                ? 'bg-[#1C4D36] text-white shadow-xs'
                : 'bg-[#FAF6ED] text-[#332B22] border border-[#EADBBD]'
            }`}
          >
            <span>Reviewed</span>
            <span className={`text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center font-mono ${
              activeTab === 'Reviewed' ? 'bg-white text-[#1C4D36]' : 'bg-[#F1E8D9] text-[#554A3D]'
            }`}>
              {reviewedCount}
            </span>
          </button>

          {/* Tab 3: All */}
          <button
            type="button"
            onClick={() => setActiveTab('All')}
            className={`flex-1 py-2.5 px-3 rounded-2xl flex items-center justify-center gap-2 font-bold text-xs cursor-pointer transition-all active:scale-95 ${
              activeTab === 'All'
                ? 'bg-[#1C4D36] text-white shadow-xs'
                : 'bg-[#FAF6ED] text-[#332B22] border border-[#EADBBD]'
            }`}
          >
            <span>All</span>
            <span className={`text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center font-mono ${
              activeTab === 'All' ? 'bg-white text-[#1C4D36]' : 'bg-[#F1E8D9] text-[#554A3D]'
            }`}>
              {allCount}
            </span>
          </button>
        </div>

        {/* Search Bar matching SS 1 */}
        <div className="relative mt-2 mb-1">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search student by name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#FAF7F0] border border-[#EADBBD] text-slate-900 text-sm font-medium rounded-full py-3.5 pl-11 pr-11 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1C4D36]/20 focus:border-[#1C4D36]"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none">
            <SlidersHorizontal className="w-4.5 h-4.5" />
          </div>
        </div>
      </div>

      {/* Submission Cards Grid matching SS 1 */}
      <div className="p-4 sm:p-5 space-y-4 max-w-lg mx-auto">
        {finalFilteredSubmissions.length === 0 ? (
          <div className="text-center py-12 bg-white border border-[#EDE8DE] rounded-2xl shadow-xs p-6">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-bold font-serif text-slate-700">No submissions found</p>
            <p className="text-xs text-slate-400 mt-1">There are no submissions matching your criteria.</p>
          </div>
        ) : (
          finalFilteredSubmissions.map((sub) => {
            return (
              <div 
                key={sub.id} 
                className="bg-white rounded-[24px] p-5 border border-[#EDE8DE] shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-3.5 hover:border-[#D5EBDC] transition-all"
              >
                {/* Top Section: Avatar, Student info & Status Pill */}
                <div className="flex justify-between items-start gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#EBF5EE] text-[#1C4D36] flex items-center justify-center shrink-0 border border-[#D5EBDC]">
                      <SproutIcon className="w-5 h-5 text-[#1C4D36]" />
                    </div>
                    <div>
                      <h3 className="text-base font-serif font-bold text-slate-900 leading-tight">
                        {sub.studentName}
                      </h3>
                      <p className="text-xs font-mono text-slate-400 mt-0.5 tracking-wider">
                        ID: {sub.studentId}
                      </p>
                    </div>
                  </div>

                  {renderStatusBadge(sub.status)}
                </div>

                {/* Metadata Section with horizontal rule */}
                <div className="border-t border-[#F2ECE1] pt-3.5 space-y-2.5">
                  {/* Row 1: Level & Batch */}
                  <div className="flex items-center gap-3 text-xs text-slate-700">
                    <div className="flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-[#1C4D36] shrink-0" />
                      <span className="font-medium">{sub.levelShort}</span>
                    </div>
                    <div className="h-3 w-[1px] bg-slate-200" />
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-[#1C4D36] shrink-0" />
                      <span className="font-medium">{sub.batch}</span>
                    </div>
                  </div>

                  {/* Row 2: Topic / Gatha Verse */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-800">
                    <BookOpen className="w-4 h-4 text-[#1C4D36] shrink-0" />
                    <span className="font-medium font-serif">{sub.topic}</span>
                  </div>

                  {/* Row 3: Submission Date */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Calendar className="w-4 h-4 text-[#B45309] shrink-0" />
                    <span>Submitted: {sub.submissionDate}</span>
                  </div>
                </div>

                {/* Review Button CTA */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSubmissionId(sub.id);
                    setActiveScreen('TeacherGathaSubmissionDetails');
                  }}
                  className="w-full bg-[#1C4D36] hover:bg-[#153B29] text-white font-medium text-sm py-3 rounded-xl flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all cursor-pointer shadow-xs mt-1"
                >
                  <span>Review</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            );
          })
        )}
      </div>
    </motion.div>
  );
}
