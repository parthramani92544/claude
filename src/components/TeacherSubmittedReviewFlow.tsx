import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  Search, 
  CheckCircle2, 
  BookOpen, 
  Calendar, 
  Volume2, 
  Play, 
  Pause, 
  Eye, 
  X, 
  Check, 
  Sparkles,
  GraduationCap,
  Clock,
  User,
  Award,
  ChevronRight,
  RotateCcw
} from 'lucide-react';

interface GathaReviewItem {
  id: string;
  studentId: string;
  studentName: string;
  avatarColor: string;
  initials: string;
  level: string;
  levelNumber: number;
  batch: string;
  gathaTitle: string;
  gathaSubtitle: string;
  gathaPrakritSnippet: string;
  submissionDate: string;
  reviewedDate: string;
  status: 'Approved' | 'Oral Verified' | 'Needs Revision';
  score: number;
  maxScore: number;
  teacherRemarks: string;
  pronunciationScore: number;
  speedRhythmScore: number;
  bhavBhaktiScore: number;
  audioDuration: string;
}

interface TeacherSubmittedReviewFlowProps {
  activeScreen: string;
  setActiveScreen: (screen: string) => void;
  currentLoggedInTeacher: any;
}

export function TeacherSubmittedReviewFlow({
  activeScreen,
  setActiveScreen,
  currentLoggedInTeacher
}: TeacherSubmittedReviewFlowProps) {
  const teacherName = currentLoggedInTeacher?.name || "Samani Pragya ji";
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReview, setSelectedReview] = useState<GathaReviewItem | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Mock Database of Teacher's Submitted Reviews
  const [submittedReviews] = useState<GathaReviewItem[]>([
    {
      id: 'REV-001',
      studentId: 'STU001',
      studentName: 'Aarav Shah',
      avatarColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      initials: 'AS',
      level: 'Level 1: Basic Sutras & Stories',
      levelNumber: 1,
      batch: 'Batch A – Morning',
      gathaTitle: 'Navkar Mantra',
      gathaSubtitle: 'Gatha 1–2 (Arihanta & Siddha Namaskara)',
      gathaPrakritSnippet: 'णमो अरिहंताणं, णमो सिद्धाणं, णमो आयरियाणं, णमो उवज्झायाणं, णमो लोए सव्वसाहूणं...',
      submissionDate: '4 Jul 2026, 09:30 AM',
      reviewedDate: '5 Jul 2026, 11:15 AM',
      status: 'Approved',
      score: 50,
      maxScore: 50,
      teacherRemarks: 'Flawless pronunciation with accurate pauses after each Pada. Outstanding devotion and clarity shown.',
      pronunciationScore: 20,
      speedRhythmScore: 15,
      bhavBhaktiScore: 15,
      audioDuration: '0:45'
    },
    {
      id: 'REV-002',
      studentId: 'STU002',
      studentName: 'Diya Patel',
      avatarColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      initials: 'DP',
      level: 'Level 1: Basic Sutras & Stories',
      levelNumber: 1,
      batch: 'Batch A – Morning',
      gathaTitle: 'Chattari Mangalam',
      gathaSubtitle: 'Gatha 1–4 (Four Auspicious Refuges)',
      gathaPrakritSnippet: 'चत्तारी मंगलं, अरिहंता मंगलं, सिद्धा मंगलं, साहू मंगलं, केवलिपन्नत्तो धम्मो मंगलं...',
      submissionDate: '3 Jul 2026, 10:15 AM',
      reviewedDate: '4 Jul 2026, 02:40 PM',
      status: 'Approved',
      score: 48,
      maxScore: 50,
      teacherRemarks: 'Clear and pure tone. Slight hesitation in the final Sāhu Pada, but passed with high honors.',
      pronunciationScore: 19,
      speedRhythmScore: 14,
      bhavBhaktiScore: 15,
      audioDuration: '0:38'
    },
    {
      id: 'REV-003',
      studentId: 'STU003',
      studentName: 'Rohan Jain',
      avatarColor: 'bg-amber-100 text-amber-900 border-amber-200',
      initials: 'RJ',
      level: 'Level 2: Jain Geography & Symbols',
      levelNumber: 2,
      batch: 'Batch B – Afternoon',
      gathaTitle: 'Logassa Sutra',
      gathaSubtitle: 'Gatha 1–3 (Namotthunam & 24 Jinas)',
      gathaPrakritSnippet: 'लोगस्स उज्जोअगरे, धम्मतित्थयरे जिणे। अरिहंते कित्तइस्सं, चउवीसं पि केवली॥',
      submissionDate: '2 Jul 2026, 04:20 PM',
      reviewedDate: '3 Jul 2026, 09:00 AM',
      status: 'Oral Verified',
      score: 50,
      maxScore: 50,
      teacherRemarks: 'Exceptional recitation speed and clear acoustic clarity for all 24 Tirthankara names.',
      pronunciationScore: 20,
      speedRhythmScore: 15,
      bhavBhaktiScore: 15,
      audioDuration: '1:12'
    },
    {
      id: 'REV-004',
      studentId: 'STU004',
      studentName: 'Kavya Doshi',
      avatarColor: 'bg-rose-100 text-rose-800 border-rose-200',
      initials: 'KD',
      level: 'Level 2: Jain Geography & Symbols',
      levelNumber: 2,
      batch: 'Batch B – Afternoon',
      gathaTitle: 'Uvasaggaharam Stotra',
      gathaSubtitle: 'Gatha 1–2 (Parshvanath Protection Vows)',
      gathaPrakritSnippet: 'उवसग्गहरं पासं, वंदामि कम्मघणमुक्कं। विसहरविसणिन्नासं, मंगलकल्लाणआवासं॥',
      submissionDate: '1 Jul 2026, 08:45 AM',
      reviewedDate: '2 Jul 2026, 12:30 PM',
      status: 'Approved',
      score: 49,
      maxScore: 50,
      teacherRemarks: 'Very melodious and accurate rhythm. Well prepared for annual festival recitation.',
      pronunciationScore: 19,
      speedRhythmScore: 15,
      bhavBhaktiScore: 15,
      audioDuration: '0:52'
    },
    {
      id: 'REV-005',
      studentId: 'STU005',
      studentName: 'Siddharth Mehta',
      avatarColor: 'bg-sky-100 text-sky-800 border-sky-200',
      initials: 'SM',
      level: 'Level 1: Basic Sutras & Stories',
      levelNumber: 1,
      batch: 'Batch A – Morning',
      gathaTitle: 'Iriyavahiyai Sutra',
      gathaSubtitle: 'Gatha 1–2 (Path Purification Vow)',
      gathaPrakritSnippet: 'इरियावहियाए वंदामि, पच्छित्तकरणेणं, वोसिरई...',
      submissionDate: '30 Jun 2026, 11:10 AM',
      reviewedDate: '1 Jul 2026, 03:15 PM',
      status: 'Needs Revision',
      score: 35,
      maxScore: 50,
      teacherRemarks: 'Make sure to pause correctly after each pada. Advised to re-record in quiet space.',
      pronunciationScore: 14,
      speedRhythmScore: 10,
      bhavBhaktiScore: 11,
      audioDuration: '0:34'
    },
    {
      id: 'REV-006',
      studentId: 'STU006',
      studentName: 'Ananya Singhi',
      avatarColor: 'bg-purple-100 text-purple-800 border-purple-200',
      initials: 'AS',
      level: 'Level 3: Jain Philosophy & Tattva',
      levelNumber: 3,
      batch: 'Batch C – Evening',
      gathaTitle: 'Tattvartha Sutra',
      gathaSubtitle: 'Chapter 1 · Sutra 1–4',
      gathaPrakritSnippet: 'सम्यग्दर्शनज्ञानचारित्राणि मोक्षमार्गः। तत्त्वार्थश्रद्धानं सम्यग्दर्शनम्॥',
      submissionDate: '29 Jun 2026, 05:00 PM',
      reviewedDate: '30 Jun 2026, 10:30 AM',
      status: 'Approved',
      score: 50,
      maxScore: 50,
      teacherRemarks: 'Profound understanding and flawless recitation of fundamental aphorisms.',
      pronunciationScore: 20,
      speedRhythmScore: 15,
      bhavBhaktiScore: 15,
      audioDuration: '0:58'
    }
  ]);

  // Search filter only (no dropdown filters)
  const filteredReviews = submittedReviews.filter(rev => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return rev.studentName.toLowerCase().includes(q);
  });

  // SCREEN 2: DEDICATED FULL DETAIL SCREEN (Not a popup)
  if (selectedReview) {
    const isApproved = selectedReview.status === 'Approved' || selectedReview.status === 'Oral Verified';

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
        className="min-h-screen bg-[#FAF8F5] pb-24 text-slate-800"
      >
        {/* Top Header */}
        <div className="bg-gradient-to-b from-[#163E2B] to-[#1C4D36] text-white pt-6 pb-6 px-5 rounded-b-[28px] shadow-sm">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => {
                setSelectedReview(null);
                setIsPlayingAudio(false);
              }}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all cursor-pointer active:scale-95 shadow-2xs"
              title="Back to Review List"
            >
              <ChevronLeft className="w-5 h-5 -ml-0.5" />
            </button>
            <div className="text-center">
              <span className="text-[10px] font-bold text-[#E5D29C] uppercase tracking-widest font-mono block">
                Submitted Evaluation
              </span>
              <h1 className="text-base font-serif font-bold text-white tracking-tight">
                Review Details
              </h1>
            </div>
            <div className="w-9 h-9" />
          </div>
        </div>

        {/* Detail Screen Content */}
        <div className="p-4 sm:p-5 space-y-4 max-w-lg mx-auto">
          {/* Student Profile Summary Card */}
          <div className="bg-white rounded-[22px] border border-[#EDE8DE] p-4 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className={`w-13 h-13 rounded-full font-serif font-bold text-base flex items-center justify-center shrink-0 border ${selectedReview.avatarColor}`}>
                {selectedReview.initials}
              </div>
              <div>
                <h2 className="font-serif font-bold text-slate-900 text-lg leading-tight">
                  {selectedReview.studentName}
                </h2>
                <p className="text-xs text-slate-500 font-sans mt-0.5">
                  ID: {selectedReview.studentId} • {selectedReview.batch}
                </p>
                <span className="inline-block mt-1 bg-emerald-50 text-[#163E2B] text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-100/80">
                  {selectedReview.level}
                </span>
              </div>
            </div>

            {/* Score Pill */}
            <div className="text-right">
              <span className="text-[9px] font-bold text-slate-400 uppercase font-mono block">Total Score</span>
              <span className="text-base font-bold text-[#163E2B] font-mono">
                {selectedReview.score}/{selectedReview.maxScore}
              </span>
            </div>
          </div>

          {/* Evaluated Gatha Card */}
          <div className="bg-white border border-[#EDE8DE] rounded-[22px] p-4.5 shadow-xs space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-[#163E2B] uppercase tracking-wider font-mono flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#163E2B]" />
                <span>EVALUATED GATHA</span>
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 ${
                isApproved 
                  ? 'bg-[#EBF7EE] text-[#163E2B] border border-[#C8E6C9]' 
                  : 'bg-[#FFF7ED] text-[#EA580C] border border-[#FED7AA]'
              }`}>
                <CheckCircle2 className="w-3 h-3" />
                <span>{selectedReview.status}</span>
              </span>
            </div>

            <div>
              <h3 className="font-serif font-bold text-base text-slate-900">
                {selectedReview.gathaTitle}
              </h3>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                {selectedReview.gathaSubtitle}
              </p>
            </div>

            <div className="bg-[#FAF7F2] border border-[#EDE8DE] p-3 rounded-xl text-xs font-serif text-slate-800 italic leading-relaxed">
              "{selectedReview.gathaPrakritSnippet}"
            </div>
          </div>

          {/* Evaluation Scorecard */}
          <div className="bg-white border border-[#EDE8DE] rounded-[22px] p-4.5 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                SCORECARD BREAKDOWN
              </span>
              <span className="text-[10px] font-bold text-slate-500 font-mono">
                Max 50 Pts
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="bg-[#F2FAF5] border border-[#E2F0E7] p-3 rounded-xl text-center">
                <span className="text-[9px] text-slate-500 uppercase font-bold block">Pronunciation</span>
                <span className="text-base font-bold text-[#163E2B] font-mono mt-0.5 block">{selectedReview.pronunciationScore}/20</span>
              </div>
              <div className="bg-[#FAF6ED] border border-[#EADBBD] p-3 rounded-xl text-center">
                <span className="text-[9px] text-slate-500 uppercase font-bold block">Rhythm / Speed</span>
                <span className="text-base font-bold text-[#C4883A] font-mono mt-0.5 block">{selectedReview.speedRhythmScore}/15</span>
              </div>
              <div className="bg-[#F6F4FC] border border-[#E9E3F7] p-3 rounded-xl text-center">
                <span className="text-[9px] text-slate-500 uppercase font-bold block">Bhav / Bhakti</span>
                <span className="text-base font-bold text-[#7C3AED] font-mono mt-0.5 block">{selectedReview.bhavBhaktiScore}/15</span>
              </div>
            </div>
          </div>

          {/* Teacher's Voice Feedback Player */}
          <div className="bg-white border border-[#EDE8DE] rounded-[22px] p-4 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="w-11 h-11 rounded-full bg-[#163E2B] hover:bg-[#0F2D1F] text-white flex items-center justify-center cursor-pointer transition-transform active:scale-95 shadow-xs shrink-0"
              >
                {isPlayingAudio ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>
              <div>
                <p className="text-xs font-bold text-slate-800">Teacher Voice Feedback</p>
                <p className="text-[10px] font-mono text-slate-400">{selectedReview.audioDuration} duration • Evaluated by {teacherName}</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-[#163E2B] bg-[#EBF7EE] border border-[#C8E6C9] px-2.5 py-1 rounded-lg">
              {isPlayingAudio ? "Playing..." : "Voice Note"}
            </span>
          </div>

          {/* Written Remarks */}
          <div className="bg-white border border-[#EDE8DE] rounded-[22px] p-4.5 shadow-xs space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono block">
              TEACHER REMARKS
            </span>
            <div className="bg-[#FAF7F2] border border-[#EDE8DE] p-3.5 rounded-xl text-xs text-slate-700 leading-relaxed font-medium">
              "{selectedReview.teacherRemarks}"
            </div>
          </div>

          {/* Timeline & Meta Information */}
          <div className="bg-white border border-[#EDE8DE] rounded-[22px] p-4 shadow-xs space-y-2 text-xs text-slate-500 font-mono">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                Submitted
              </span>
              <span className="text-slate-700 font-semibold">{selectedReview.submissionDate}</span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-slate-100">
              <span className="flex items-center gap-1.5 text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                Evaluated
              </span>
              <span className="text-slate-700 font-semibold">{selectedReview.reviewedDate}</span>
            </div>
          </div>

          {/* Return Button */}
          <button
            type="button"
            onClick={() => {
              setSelectedReview(null);
              setIsPlayingAudio(false);
            }}
            className="w-full bg-[#163E2B] hover:bg-[#0F2D1F] text-white py-3.5 rounded-2xl font-bold text-xs cursor-pointer shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Submitted List</span>
          </button>
        </div>
      </motion.div>
    );
  }

  // SCREEN 1: MINIMALIST LIST SCREEN (Only User Image, Name, and View Icon)
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#FAF8F5] pb-24 text-slate-800"
    >
      {/* Top Header Bar */}
      <div className="bg-gradient-to-b from-[#163E2B] to-[#1C4D36] text-white pt-6 pb-8 px-5 rounded-b-[32px] shadow-sm">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setActiveScreen('TeacherDashboard')}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all cursor-pointer active:scale-95"
            title="Back to Dashboard"
          >
            <ChevronLeft className="w-5 h-5 -ml-0.5" />
          </button>
          <div className="text-center">
            <span className="text-[10px] font-bold text-[#E5D29C] uppercase tracking-widest font-mono block">
              Teacher Portal
            </span>
            <h1 className="text-lg font-serif font-bold text-white tracking-tight">
              Submitted Reviews
            </h1>
          </div>
          <div className="w-9 h-9" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 sm:p-5 space-y-4 max-w-lg mx-auto -mt-4">
        {/* Search-Only Interface */}
        <div className="relative">
          <Search className="w-4.5 h-4.5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search student name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#EDE8DE] text-slate-900 text-sm font-medium rounded-full py-3.5 pl-11 pr-4 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#163E2B]/20 focus:border-[#163E2B] shadow-2xs"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between px-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
            STUDENTS ({filteredReviews.length})
          </p>
          <span className="text-[10px] font-bold text-[#163E2B] font-mono">
            Tap to view details
          </span>
        </div>

        {/* Minimalist Card List: ONLY User Image, Name, and View Icon */}
        <div className="space-y-2.5">
          {filteredReviews.map((rev) => (
            <div 
              key={rev.id}
              onClick={() => {
                setSelectedReview(rev);
                setIsPlayingAudio(false);
              }}
              className="bg-white rounded-[20px] border border-[#EDE8DE] p-3.5 px-4 shadow-2xs hover:border-[#C5A059]/40 hover:shadow-xs transition-all flex items-center justify-between cursor-pointer group active:scale-[0.99]"
            >
              {/* User Image / Avatar and User Name ONLY */}
              <div className="flex items-center gap-3.5">
                <div className={`w-11 h-11 rounded-full font-serif font-bold text-sm flex items-center justify-center shrink-0 border ${rev.avatarColor}`}>
                  {rev.initials}
                </div>
                <h3 className="font-serif font-bold text-slate-900 text-base leading-tight group-hover:text-[#163E2B] transition-colors">
                  {rev.studentName}
                </h3>
              </div>

              {/* View Icon Button ONLY */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedReview(rev);
                  setIsPlayingAudio(false);
                }}
                className="w-9 h-9 rounded-full bg-[#FAF7F2] group-hover:bg-[#163E2B] text-slate-500 group-hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-2xs shrink-0"
                title="View Details"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          ))}

          {filteredReviews.length === 0 && (
            <div className="bg-white border border-dashed border-[#EDE8DE] rounded-2xl p-8 text-center space-y-2">
              <p className="text-xs text-slate-400 font-medium">No students found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
