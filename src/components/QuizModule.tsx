import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  Search, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Check, 
  Sparkles, 
  ChevronRight, 
  Music, 
  ScrollText, 
  Trophy, 
  Award, 
  HelpCircle, 
  Flame, 
  ArrowRight, 
  Layers, 
  Star, 
  X, 
  Target,
  Lock,
  RotateCcw,
  History,
  AlertCircle,
  Eye
} from 'lucide-react';
import { AIQuiz, AIQuizQuestion, QuizHistoryRecord, QuizAnswerRecord, Student } from '../types';
import { PathshalaLogo } from './PathshalaLogo';

interface QuizModuleProps {
  student: Student;
  allQuizzes: AIQuiz[];
  onBackToHome: () => void;
  onSaveQuizResult?: (result: QuizHistoryRecord) => void;
  onUpdateStudentPoints?: (points: number) => void;
  initialQuizId?: string | null;
}

export const QuizModule: React.FC<QuizModuleProps> = ({
  student,
  allQuizzes,
  onBackToHome,
  onSaveQuizResult,
  onUpdateStudentPoints,
  initialQuizId = null,
}) => {
  // Main Tab: 'available' | 'attempted'
  const [mainTab, setMainTab] = useState<'available' | 'attempted'>('available');

  // Navigation screen states: 'list' | 'detail' | 'play' | 'result' | 'attempt_detail'
  const [viewState, setViewState] = useState<'list' | 'detail' | 'play' | 'result' | 'attempt_detail'>('list');
  
  // Selected Quiz for Detail / Play / Result
  const [selectedQuiz, setSelectedQuiz] = useState<AIQuiz | null>(() => {
    if (initialQuizId) {
      return allQuizzes.find(q => q.id === initialQuizId) || allQuizzes[0] || null;
    }
    return null;
  });

  // Selected Attempt record for detailed answer review
  const [selectedAttemptRecord, setSelectedAttemptRecord] = useState<QuizHistoryRecord | null>(null);

  // Filter and search states in list view
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<string>('All');

  // Active quiz play state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | string | null)[]>([]);
  const [quizScore, setQuizScore] = useState(0);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [completedToast, setCompletedToast] = useState<{ message: string; pts: number } | null>(null);
  
  // Timer State
  const [totalAllocatedSeconds, setTotalAllocatedSeconds] = useState<number>(120);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(120);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [timeSpentSeconds, setTimeSpentSeconds] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Local Quiz History Map
  const [quizHistoryMap, setQuizHistoryMap] = useState<Record<string, QuizHistoryRecord>>(() => {
    const map: Record<string, QuizHistoryRecord> = {};
    if (student.quizHistory && Array.isArray(student.quizHistory)) {
      student.quizHistory.forEach(h => {
        map[h.quizId] = h;
      });
    }
    return map;
  });

  // Keep quizHistoryMap updated if student prop updates
  useEffect(() => {
    if (student.quizHistory && Array.isArray(student.quizHistory)) {
      const map: Record<string, QuizHistoryRecord> = {};
      student.quizHistory.forEach(h => {
        map[h.quizId] = h;
      });
      setQuizHistoryMap(map);
    }
  }, [student.quizHistory]);

  // Set initial selected quiz if provided
  useEffect(() => {
    if (initialQuizId) {
      const q = allQuizzes.find(item => item.id === initialQuizId);
      if (q) {
        setSelectedQuiz(q);
        setViewState('detail');
      }
    }
  }, [initialQuizId, allQuizzes]);

  // Helper to determine student level number
  const studentLevelNum = useMemo(() => {
    const lvl = (student.level || '').toLowerCase();
    if (lvl.includes('level 1') || lvl.includes('prarambhik') || lvl.includes('bal')) return 1;
    if (lvl.includes('level 2') || lvl.includes('madhyam') || lvl.includes('kumar')) return 2;
    return 3;
  }, [student.level]);

  // Category counts
  const sutrasCount = useMemo(() => allQuizzes.filter(q => q.type === 'Sutra').length, [allQuizzes]);
  const stavansCount = useMemo(() => allQuizzes.filter(q => q.type === 'Stavan' || q.type === 'Stuti').length, [allQuizzes]);
  const gathasCount = useMemo(() => allQuizzes.filter(q => q.type === 'Gatha').length, [allQuizzes]);
  const storiesCount = useMemo(() => allQuizzes.filter(q => q.type === 'Jain Stories' || q.type === 'Bhagwan Stories').length, [allQuizzes]);

  // Categories configuration matching screenshot design
  const CATEGORIES = [
    { id: 'All', label: 'All Quizzes', icon: Layers, count: allQuizzes.length },
    { id: 'Sutra', label: 'Sutras', icon: BookOpen, count: sutrasCount },
    { id: 'Stavan', label: 'Stavan', icon: Music, count: stavansCount },
    ...(gathasCount > 0 ? [{ id: 'Gatha', label: 'Gathas', icon: ScrollText, count: gathasCount }] : []),
    ...(storiesCount > 0 ? [{ id: 'Stories', label: 'Stories', icon: Sparkles, count: storiesCount }] : []),
  ];

  // Helper for Category styling & icons
  const getCategoryMeta = (type: string) => {
    switch (type) {
      case 'Sutra':
        return {
          icon: BookOpen,
          bg: 'bg-slate-100 text-slate-700 border-slate-200/80',
          iconBg: 'bg-emerald-50 text-[#163E2B]',
          badge: 'Sutra Quiz',
          borderAccent: 'border-emerald-100',
        };
      case 'Stavan':
      case 'Stuti':
        return {
          icon: Music,
          bg: 'bg-slate-100 text-slate-700 border-slate-200/80',
          iconBg: 'bg-purple-50 text-purple-700',
          badge: 'Stavan Quiz',
          borderAccent: 'border-purple-100',
        };
      case 'Gatha':
        return {
          icon: ScrollText,
          bg: 'bg-slate-100 text-slate-700 border-slate-200/80',
          iconBg: 'bg-teal-50 text-teal-700',
          badge: 'Gatha Quiz',
          borderAccent: 'border-teal-100',
        };
      case 'Jain Stories':
      case 'Bhagwan Stories':
        return {
          icon: Sparkles,
          bg: 'bg-slate-100 text-slate-700 border-slate-200/80',
          iconBg: 'bg-amber-50 text-amber-700',
          badge: 'Story Quiz',
          borderAccent: 'border-amber-100',
        };
      default:
        return {
          icon: Trophy,
          bg: 'bg-slate-100 text-slate-700 border-slate-200/80',
          iconBg: 'bg-emerald-50 text-[#163E2B]',
          badge: 'Quiz',
          borderAccent: 'border-emerald-100',
        };
    }
  };

  // Helper for Difficulty indicator
  const getDifficultyMeta = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
        return { label: 'Beginner', color: 'text-emerald-800 bg-emerald-50 border-emerald-200', icon: Target };
      case 'advanced':
        return { label: 'Advanced', color: 'text-amber-800 bg-amber-50 border-amber-200', icon: Flame };
      default:
        return { label: 'Intermediate', color: 'text-blue-800 bg-blue-50 border-blue-200', icon: Sparkles };
    }
  };

  // Filtered Quizzes computation for available list
  const filteredQuizzes = useMemo(() => {
    return allQuizzes.filter(quiz => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = quiz.title.toLowerCase().includes(q);
        const matchSource = quiz.relatedContentName.toLowerCase().includes(q);
        const matchCategory = (quiz.category || '').toLowerCase().includes(q);
        if (!matchTitle && !matchSource && !matchCategory) return false;
      }

      // 2. Category Filter
      if (selectedCategory !== 'All') {
        if (selectedCategory === 'Sutra' && quiz.type !== 'Sutra') return false;
        if (selectedCategory === 'Stavan' && quiz.type !== 'Stavan' && quiz.type !== 'Stuti') return false;
        if (selectedCategory === 'Gatha' && quiz.type !== 'Gatha') return false;
        if (selectedCategory === 'Stories' && quiz.type !== 'Jain Stories' && quiz.type !== 'Bhagwan Stories') return false;
      }

      // 3. Level Filter
      if (selectedLevelFilter !== 'All') {
        if (quiz.level !== Number(selectedLevelFilter)) return false;
      }

      return true;
    });
  }, [allQuizzes, searchQuery, selectedCategory, selectedLevelFilter]);

  // Attempted Quizzes List
  const attemptedQuizzesList = useMemo(() => {
    const list: (QuizHistoryRecord & { quizDetails?: AIQuiz })[] = [];
    (Object.values(quizHistoryMap) as QuizHistoryRecord[]).forEach(historyRecord => {
      const matchQuiz = allQuizzes.find(q => q.id === historyRecord.quizId);
      list.push({
        ...historyRecord,
        quizDetails: matchQuiz
      });
    });
    return list;
  }, [quizHistoryMap, allQuizzes]);

  // Overall statistics
  const totalCompletedCount = useMemo(() => {
    return Object.keys(quizHistoryMap).length;
  }, [quizHistoryMap]);

  const progressPercentage = useMemo(() => {
    if (allQuizzes.length === 0) return 0;
    return Math.round((totalCompletedCount / allQuizzes.length) * 100);
  }, [totalCompletedCount, allQuizzes.length]);

  const totalPointsEarnedFromQuizzes = useMemo(() => {
    return (Object.values(quizHistoryMap) as QuizHistoryRecord[]).reduce((sum, h) => sum + (h.pointsEarned || h.score * 25), 0);
  }, [quizHistoryMap]);

  // Timer Tick Effect
  useEffect(() => {
    if (viewState === 'play' && isTimerActive) {
      timerRef.current = setInterval(() => {
        setSecondsRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current as NodeJS.Timeout);
            setIsTimerActive(false);
            // Time expired -> Auto-submit
            handleAutoSubmitOnTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [viewState, isTimerActive]);

  // Format seconds to MM:SS
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Handler to open Quiz Details
  const handleOpenDetail = (quiz: AIQuiz) => {
    setSelectedQuiz(quiz);
    setViewState('detail');
  };

  // Handler to start active Quiz attempt (if not already completed)
  const handleStartAttempt = (quiz: AIQuiz) => {
    // Check if already completed - second attempts are disabled
    if (quizHistoryMap[quiz.id]) {
      // Open attempt details instead
      handleOpenAttemptReview(quizHistoryMap[quiz.id]);
      return;
    }

    const qCount = quiz.questions.length;
    // Allocate 60 seconds per question (e.g. 2 questions = 120s, 3 questions = 180s)
    const allocated = qCount * 60;

    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setUserAnswers(new Array(qCount).fill(null));
    setQuizScore(0);
    setPointsEarned(0);
    setTotalAllocatedSeconds(allocated);
    setSecondsRemaining(allocated);
    setIsTimerActive(true);
    setViewState('play');
  };

  // Handler to record student answer
  const handleSelectAnswer = (answerVal: number | string) => {
    setUserAnswers(prev => {
      const next = [...prev];
      next[currentQuestionIndex] = answerVal;
      return next;
    });
  };

  // Auto-submit when timer runs out
  const handleAutoSubmitOnTimeout = () => {
    handleSubmitQuiz(true);
  };

  // Handler to submit active Quiz
  const handleSubmitQuiz = (isTimeout: boolean = false) => {
    if (!selectedQuiz) return;
    
    // Stop timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsTimerActive(false);

    const spent = Math.max(1, totalAllocatedSeconds - secondsRemaining);
    setTimeSpentSeconds(spent);

    let score = 0;
    const answersSummary: QuizAnswerRecord[] = selectedQuiz.questions.map((q, idx) => {
      const studentAns = userAnswers[idx];
      let isCorrect = false;
      if (q.type === 'mcq' || q.type === 'boolean') {
        if (studentAns === q.correctAnswer) {
          isCorrect = true;
          score += 1;
        }
      } else if (q.type === 'fill') {
        if (String(studentAns || '').trim().toLowerCase() === String(q.correctAnswer || '').trim().toLowerCase()) {
          isCorrect = true;
          score += 1;
        }
      }

      return {
        question: q.question,
        type: q.type,
        options: q.options,
        userAnswer: studentAns,
        correctAnswer: q.correctAnswer,
        isCorrect: isCorrect,
        explanation: q.explanation
      };
    });

    const totalQ = selectedQuiz.questions.length;
    const pct = Math.round((score / totalQ) * 100);
    const pts = score * 25;

    setQuizScore(score);
    setPointsEarned(pts);

    const historyRecord: QuizHistoryRecord = {
      quizId: selectedQuiz.id,
      quizTitle: selectedQuiz.title,
      category: selectedQuiz.category || selectedQuiz.type,
      difficulty: selectedQuiz.difficulty,
      level: selectedQuiz.level,
      score: score,
      totalQuestions: totalQ,
      percentage: pct,
      pointsEarned: pts,
      timeSpentSeconds: spent,
      completedAt: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      userAnswers: userAnswers,
      answersSummary: answersSummary
    };

    setQuizHistoryMap(prev => ({
      ...prev,
      [selectedQuiz.id]: historyRecord
    }));

    if (onSaveQuizResult) {
      onSaveQuizResult(historyRecord);
    }
    if (onUpdateStudentPoints) {
      onUpdateStudentPoints(pts);
    }

    // Show completion toast banner on list screen
    setCompletedToast({
      message: isTimeout 
        ? `⏱ Time's up! Quiz submitted: Scored ${score}/${totalQ} (${pct}%)` 
        : `🎉 Quiz completed! Scored ${score}/${totalQ} (${pct}%)`,
      pts: pts,
    });

    // Navigate to Result screen
    setViewState('result');
  };

  // Open Attempt Detailed Review
  const handleOpenAttemptReview = (historyRecord: QuizHistoryRecord) => {
    // If answersSummary is missing, generate it from allQuizzes
    let recordWithDetails = { ...historyRecord };
    if (!recordWithDetails.answersSummary || recordWithDetails.answersSummary.length === 0) {
      const matchQuiz = allQuizzes.find(q => q.id === historyRecord.quizId);
      if (matchQuiz) {
        const uAns = historyRecord.userAnswers || [];
        const summary: QuizAnswerRecord[] = matchQuiz.questions.map((q, idx) => {
          const studentAns = uAns[idx] !== undefined ? uAns[idx] : null;
          let isCorrect = false;
          if (q.type === 'mcq' || q.type === 'boolean') {
            isCorrect = studentAns === q.correctAnswer;
          } else if (q.type === 'fill') {
            isCorrect = String(studentAns || '').trim().toLowerCase() === String(q.correctAnswer || '').trim().toLowerCase();
          }

          return {
            question: q.question,
            type: q.type,
            options: q.options,
            userAnswer: studentAns,
            correctAnswer: q.correctAnswer,
            isCorrect: isCorrect,
            explanation: q.explanation
          };
        });
        recordWithDetails.answersSummary = summary;
      }
    }

    setSelectedAttemptRecord(recordWithDetails);
    setViewState('attempt_detail');
  };

  // ==========================================
  // VIEW 1: QUIZ HUB SCREEN (Available & Attempted Tabs)
  // ==========================================
  if (viewState === 'list') {
    return (
      <div id="quiz-module-container" className="absolute inset-0 bg-[#FAF8F5] flex flex-col overflow-hidden select-none z-10 text-slate-800">
        
        {/* Top Header Bar */}
        <div className="pt-2.5 px-4 pb-3 flex items-center justify-between border-b border-stone-200/80 bg-white shrink-0 z-20">
          <div className="flex items-center gap-3">
            <button 
              id="quiz-back-home-btn"
              onClick={onBackToHome}
              className="w-9 h-9 rounded-full bg-white hover:bg-stone-50 border border-slate-200 shadow-2xs flex items-center justify-center cursor-pointer transition-colors active:scale-95 text-slate-700"
              title="Back to Home"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
            </button>
            <div className="flex items-center gap-2.5">
              <PathshalaLogo size={32} />
              <div>
                <h1 className="text-[15px] sm:text-base font-extrabold tracking-tight text-slate-900 leading-tight">
                  Quizzes & Assessment
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Top Segmented Navigation Tabs: [ Available Quizzes | Attempted Quizzes ] */}
        <div className="px-4 pt-3 pb-1 bg-white border-b border-stone-200/60 shrink-0">
          <div className="flex bg-stone-100/90 p-1 rounded-2xl border border-stone-200/80 max-w-xl mx-auto">
            <button
              id="tab-available-quizzes"
              onClick={() => setMainTab('available')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                mainTab === 'available'
                  ? 'bg-white text-[#163E2B] shadow-xs ring-1 ring-black/5'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#163E2B]" />
              <span>Available Quizzes</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                mainTab === 'available' ? 'bg-emerald-100 text-[#163E2B]' : 'bg-slate-200 text-slate-600'
              }`}>
                {allQuizzes.length}
              </span>
            </button>

            <button
              id="tab-attempted-quizzes"
              onClick={() => setMainTab('attempted')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                mainTab === 'attempted'
                  ? 'bg-[#163E2B] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
              }`}
            >
              <History className="w-4 h-4" />
              <span>Attempted Quizzes</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                mainTab === 'attempted' ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-200 text-slate-600'
              }`}>
                {attemptedQuizzesList.length}
              </span>
            </button>
          </div>
        </div>

        {/* Scrollable Main Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4 pb-28 max-w-xl mx-auto w-full">
          
          {/* Success Toast Banner after Quiz Completion */}
          {completedToast && (
            <div className="p-3.5 bg-emerald-700 text-white rounded-2xl shadow-md border border-emerald-800 flex items-center justify-between gap-3 animate-fadeIn">
              <div className="flex items-center gap-2.5 min-w-0">
                <CheckCircle2 className="w-5 h-5 text-emerald-200 shrink-0" />
                <span className="text-xs font-bold leading-snug">{completedToast.message}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="px-2 py-0.5 bg-white/20 rounded-lg text-[11px] font-mono font-bold">
                  +{completedToast.pts} pts
                </span>
                <button
                  onClick={() => setCompletedToast(null)}
                  className="text-white/80 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB CONTENT A: AVAILABLE QUIZZES                        */}
          {/* ======================================================== */}
          {mainTab === 'available' && (
            <>
              {/* Daily Wisdom Challenge Banner */}
              <div className="bg-[#163E2B] rounded-[24px] p-4.5 sm:p-5 text-white shadow-[0_6px_20px_rgba(22,62,43,0.18)] flex items-center justify-between relative overflow-hidden border border-emerald-700/40">
                <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-emerald-400/10 rounded-full blur-xl pointer-events-none" />

                <div className="space-y-1 z-10 min-w-0 pr-2">
                  <h2 className="text-base sm:text-[17px] font-black tracking-tight text-white leading-tight">
                    Daily Wisdom Challenge
                  </h2>
                  <p className="text-xs text-emerald-100/90 font-medium">
                    Earn points. Grow wisdom.
                  </p>

                  {/* Progress bar */}
                  <div className="w-44 max-w-full bg-black/35 h-2 rounded-full mt-3.5 overflow-hidden ring-1 ring-white/10">
                    <div 
                      className="bg-gradient-to-r from-amber-400 to-amber-300 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(progressPercentage, totalCompletedCount > 0 ? 15 : 0)}%` }}
                    />
                  </div>

                  {/* Completed count */}
                  <p className="text-xs font-semibold text-emerald-100/90 pt-1 font-mono">
                    {totalCompletedCount} of {allQuizzes.length} completed
                  </p>
                </div>

                {/* Right Trophy Badge */}
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-white/10 border border-white/15 flex items-center justify-center relative shrink-0 z-10 shadow-inner">
                  <Trophy className="w-9 h-9 sm:w-10 sm:h-10 text-amber-300 fill-amber-300/20 drop-shadow-[0_2px_8px_rgba(245,158,11,0.5)]" />
                  <Star className="w-3 h-3 text-amber-200 fill-amber-200 absolute top-2 right-2 animate-pulse" />
                  <Star className="w-2.5 h-2.5 text-amber-300 fill-amber-300 absolute bottom-3 left-2" />
                </div>
              </div>

              {/* Available Quizzes Section */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between px-1">
                  <span className="text-sm font-black text-slate-900 tracking-tight">
                    All Quizzes ({filteredQuizzes.length})
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    {totalCompletedCount} Completed
                  </span>
                </div>

                {/* Quiz Cards List */}
                {filteredQuizzes.length === 0 ? (
                  <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-2.5 shadow-2xs">
                    <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
                    <h4 className="font-extrabold text-xs text-slate-800">No quizzes match your filter</h4>
                    <p className="text-[11px] text-slate-500">Try clearing your search query or selecting a different category.</p>
                  </div>
                ) : (
                  filteredQuizzes.map((quiz) => {
                    const meta = getCategoryMeta(quiz.type);
                    const diff = getDifficultyMeta(quiz.difficulty);
                    const CategoryIcon = meta.icon;
                    const isCompleted = Boolean(quizHistoryMap[quiz.id]);
                    const historyRecord = quizHistoryMap[quiz.id];

                    return (
                      <div
                        key={quiz.id}
                        id={`quiz-card-${quiz.id}`}
                        onClick={() => handleOpenDetail(quiz)}
                        className={`bg-white border rounded-[22px] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-xs transition-all space-y-3 cursor-pointer group active:scale-[0.99] ${
                          isCompleted ? 'border-emerald-300/80 bg-emerald-50/20' : 'border-slate-200/90 hover:border-emerald-300'
                        }`}
                      >
                        {/* Middle Row: Icon + Title + Status / Chevron */}
                        <div className="flex items-center gap-3.5">
                          <div className={`w-12 h-12 rounded-2xl ${meta.iconBg} border border-emerald-100 flex items-center justify-center text-[#163E2B] shrink-0 group-hover:scale-105 transition-transform`}>
                            <CategoryIcon className="w-5 h-5 stroke-[1.8]" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                                {quiz.type}
                              </span>
                              {isCompleted && (
                                <span className="px-2 py-0.2 bg-emerald-100 text-[#163E2B] rounded-full text-[9px] font-black font-mono flex items-center gap-1">
                                  <Check className="w-2.5 h-2.5 stroke-[3]" /> Completed
                                </span>
                              )}
                            </div>
                            <h3 className="font-extrabold text-sm sm:text-[14px] text-slate-900 leading-snug group-hover:text-[#163E2B] transition-colors">
                              {quiz.title}
                            </h3>
                          </div>

                          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all shrink-0" />
                        </div>

                        {/* Bottom Row: Points Reward & Difficulty & Duration Badge */}
                        <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 text-xs text-slate-500 font-medium">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5 text-slate-700 font-semibold font-mono">
                              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
                              <span>+{quiz.questions.length * 25} pts</span>
                            </div>

                            <div className="flex items-center gap-1 text-slate-400 font-mono text-[11px]">
                              <Clock className="w-3 h-3" />
                              <span>{quiz.estimatedTime || `${quiz.questions.length} mins`}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {isCompleted && historyRecord ? (
                              <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-black font-mono bg-emerald-100 text-emerald-800 border border-emerald-200">
                                Score: {historyRecord.score}/{historyRecord.totalQuestions} ({historyRecord.percentage}%)
                              </span>
                            ) : (
                              <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold font-mono border ${diff.color}`}>
                                {diff.label}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </>
          )}

          {/* ======================================================== */}
          {/* TAB CONTENT B: ATTEMPTED QUIZZES SCREEN                   */}
          {/* ======================================================== */}
          {mainTab === 'attempted' && (
            <div className="space-y-4">
              
              {/* Attempted Summary Metrics Bar */}
              <div className="bg-white border border-stone-200 rounded-[22px] p-4.5 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#163E2B]">
                      <Trophy className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-xs font-black text-slate-900">Your Assessment Portfolio</h3>
                      <p className="text-[10px] text-slate-500 font-medium">Review your submitted quizzes & answer history</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#163E2B] bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-100">
                    +{totalPointsEarnedFromQuizzes} pts
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-100">
                  <div className="p-2.5 bg-stone-50 rounded-xl text-center">
                    <span className="text-[9px] font-bold uppercase text-slate-400 font-mono block">Attempted</span>
                    <span className="text-sm font-black text-slate-900 font-mono">{attemptedQuizzesList.length}</span>
                  </div>
                  <div className="p-2.5 bg-stone-50 rounded-xl text-center">
                    <span className="text-[9px] font-bold uppercase text-slate-400 font-mono block">Accuracy</span>
                    <span className="text-sm font-black text-emerald-800 font-mono">
                      {attemptedQuizzesList.length > 0 
                        ? Math.round(attemptedQuizzesList.reduce((acc, cur) => acc + cur.percentage, 0) / attemptedQuizzesList.length)
                        : 0}%
                    </span>
                  </div>
                  <div className="p-2.5 bg-stone-50 rounded-xl text-center">
                    <span className="text-[9px] font-bold uppercase text-slate-400 font-mono block">Available</span>
                    <span className="text-sm font-black text-slate-900 font-mono">{allQuizzes.length - attemptedQuizzesList.length}</span>
                  </div>
                </div>
              </div>

              {/* Attempted Quizzes List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <span className="text-sm font-black text-slate-900 tracking-tight">
                    Completed Assessments ({attemptedQuizzesList.length})
                  </span>
                  <span className="text-[11px] text-slate-500">Tap to inspect your answers</span>
                </div>

                {attemptedQuizzesList.length === 0 ? (
                  <div className="bg-white border border-stone-200 rounded-[22px] p-8 text-center space-y-3 shadow-2xs">
                    <History className="w-10 h-10 text-slate-300 mx-auto" />
                    <div>
                      <h4 className="font-extrabold text-xs text-slate-900">No attempted quizzes yet</h4>
                      <p className="text-[11px] text-slate-500 max-w-xs mx-auto pt-1 leading-relaxed">
                        Start your first quiz from the "Available Quizzes" tab to practice your sacred knowledge and earn spiritual points.
                      </p>
                    </div>
                    <button
                      id="btn-go-to-available"
                      onClick={() => setMainTab('available')}
                      className="py-2.5 px-5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Browse Available Quizzes</span>
                    </button>
                  </div>
                ) : (
                  attemptedQuizzesList.map((record) => {
                    const meta = getCategoryMeta(record.category || 'Sutra');
                    const CategoryIcon = meta.icon;
                    const isHigh = record.percentage >= 70;

                    return (
                      <div
                        key={record.quizId}
                        id={`attempted-quiz-card-${record.quizId}`}
                        onClick={() => handleOpenAttemptReview(record)}
                        className="bg-white border border-stone-200 hover:border-emerald-400 rounded-[22px] p-4 shadow-2xs hover:shadow-xs transition-all space-y-3 cursor-pointer group active:scale-[0.99]"
                      >
                        <div className="flex items-start gap-3.5">
                          <div className={`w-12 h-12 rounded-2xl ${meta.iconBg} border border-emerald-100 flex items-center justify-center text-[#163E2B] shrink-0 mt-0.5`}>
                            <CategoryIcon className="w-5 h-5" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="px-2 py-0.2 bg-emerald-100 text-[#163E2B] rounded-full text-[9px] font-black font-mono flex items-center gap-1">
                                <Check className="w-2.5 h-2.5 stroke-[3]" /> Attempted
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono">
                                {record.completedAt}
                              </span>
                            </div>

                            <h3 className="font-extrabold text-sm text-slate-900 leading-snug group-hover:text-[#163E2B] transition-colors">
                              {record.quizTitle}
                            </h3>
                          </div>

                          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all shrink-0 mt-2" />
                        </div>

                        {/* Scores and Inspect Action */}
                        <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 text-xs">
                          <div className="flex items-center gap-3">
                            <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black font-mono border ${
                              isHigh 
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                                : 'bg-amber-50 text-amber-800 border-amber-200'
                            }`}>
                              Score: {record.score}/{record.totalQuestions} ({record.percentage}%)
                            </span>

                            <div className="flex items-center gap-1 text-slate-700 font-semibold font-mono text-[11px]">
                              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
                              <span>+{record.pointsEarned || record.score * 25} pts</span>
                            </div>
                          </div>

                          <button 
                            className="text-xs font-bold text-[#163E2B] hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenAttemptReview(record);
                            }}
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View Answers</span>
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: QUIZ DETAIL / OVERVIEW SCREEN
  // ==========================================
  if (viewState === 'detail' && selectedQuiz) {
    const meta = getCategoryMeta(selectedQuiz.type);
    const CategoryIcon = meta.icon;
    const isCompleted = Boolean(quizHistoryMap[selectedQuiz.id]);
    const historyRecord = quizHistoryMap[selectedQuiz.id];

    return (
      <div id="quiz-detail-screen" className="absolute inset-0 bg-[#FAF8F5] flex flex-col overflow-hidden select-none z-10 text-slate-800">
        
        {/* Top Header Bar */}
        <div className="pt-2.5 px-4 pb-3 flex items-center justify-between border-b border-stone-200/80 bg-white shrink-0 z-20">
          <div className="flex items-center gap-3">
            <button 
              id="quiz-detail-back-btn"
              onClick={() => setViewState('list')}
              className="w-9 h-9 rounded-full bg-white hover:bg-stone-50 border border-slate-200 shadow-2xs flex items-center justify-center cursor-pointer transition-colors active:scale-95 text-slate-700"
              title="Back to List"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
            </button>
            <div>
              <span className="text-[9px] font-extrabold text-[#163E2B] uppercase tracking-wider font-mono block">
                QUIZ OVERVIEW
              </span>
              <h1 className="text-sm font-black tracking-tight text-slate-900 truncate max-w-[260px]">
                {selectedQuiz.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4 pb-28 max-w-xl mx-auto w-full">
          
          {/* Main Hero Card */}
          <div className="bg-white border border-slate-200 rounded-[22px] p-4.5 space-y-4 shadow-2xs relative overflow-hidden">
            <CategoryIcon className="absolute -right-4 -bottom-4 w-32 h-32 text-stone-100/60 pointer-events-none" />

            <div className="space-y-3 relative z-10">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl ${meta.iconBg} border border-emerald-100 flex items-center justify-center shrink-0`}>
                  <CategoryIcon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                      {selectedQuiz.type}
                    </span>
                    {isCompleted && (
                      <span className="px-2 py-0.2 bg-emerald-100 text-[#163E2B] rounded-full text-[9px] font-black font-mono">
                        Attempted ✓
                      </span>
                    )}
                  </div>
                  <h2 className="text-sm sm:text-base font-black text-slate-950 leading-snug">
                    {selectedQuiz.title}
                  </h2>
                </div>
              </div>

              {/* Source Content Box */}
              <div className="p-3 bg-stone-50 border border-stone-200/80 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#163E2B]" />
                  <span className="text-xs font-semibold text-slate-600">Source Topic:</span>
                  <span className="text-xs font-black text-emerald-800">{selectedQuiz.relatedContentName}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 font-bold">Verified</span>
              </div>
            </div>
          </div>

          {/* Quiz Specifications Grid */}
          <div className="space-y-2">
            <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 font-mono block px-1">
              Assessment Specifications
            </span>

            <div className="grid grid-cols-2 gap-2.5">
              {/* Metric 1: Question Count */}
              <div className="bg-white border border-slate-200 rounded-2xl p-3.5 space-y-1 shadow-2xs">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#163E2B]">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-bold text-slate-400 uppercase font-mono block pt-1">
                  Questions
                </span>
                <span className="text-xs font-black text-slate-900 block">
                  {selectedQuiz.questions.length} Items (MCQ & Fill)
                </span>
              </div>

              {/* Metric 2: Estimated Time with live timer details */}
              <div className="bg-white border border-slate-200 rounded-2xl p-3.5 space-y-1 shadow-2xs">
                <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700">
                  <Clock className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-bold text-slate-400 uppercase font-mono block pt-1">
                  Timer Allocated
                </span>
                <span className="text-xs font-black text-slate-900 block">
                  {selectedQuiz.questions.length} Mins ({selectedQuiz.questions.length * 60}s Timer)
                </span>
              </div>
            </div>
          </div>

          {/* If already completed -> Show Attempt Status & Disable Retake */}
          {isCompleted && historyRecord ? (
            <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-emerald-900">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                <div>
                  <h4 className="text-xs font-extrabold">Quiz Already Attempted</h4>
                  <p className="text-[11px] text-emerald-700 leading-tight">
                    You scored {historyRecord.score}/{historyRecord.totalQuestions} ({historyRecord.percentage}%) on this quiz. Second attempts are disabled.
                  </p>
                </div>
              </div>

              <button
                id="btn-view-attempted-answers"
                onClick={() => handleOpenAttemptReview(historyRecord)}
                className="w-full py-3 px-4 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-extrabold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
              >
                <Eye className="w-4 h-4" />
                <span>View Your Attempted Answers</span>
              </button>
            </div>
          ) : (
            /* Start Quiz Action Card for unattempted quiz */
            <div className="pt-2">
              <button
                id="btn-start-quiz-cta"
                onClick={() => handleStartAttempt(selectedQuiz)}
                className="w-full py-4 px-6 bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] text-white font-extrabold text-sm rounded-2xl shadow-md flex items-center justify-center gap-2.5 cursor-pointer transition-all border border-emerald-800/40"
              >
                <Clock className="w-4.5 h-4.5" />
                <span>Start Quiz ({selectedQuiz.questions.length * 60}s Timer)</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </button>
            </div>
          )}
        </div>

        {/* Bottom Fixed Action Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-3.5 bg-white/95 backdrop-blur-md border-t border-slate-200 flex gap-2.5 z-30 shadow-lg max-w-xl mx-auto">
          <button
            onClick={() => setViewState('list')}
            className="px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs rounded-xl cursor-pointer transition-all active:scale-95"
          >
            Back
          </button>
          
          {isCompleted && historyRecord ? (
            <button
              onClick={() => handleOpenAttemptReview(historyRecord)}
              className="flex-1 py-3.5 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
            >
              <Eye className="w-4 h-4" />
              <span>View Attempted Answers</span>
            </button>
          ) : (
            <button
              id="btn-start-quiz-bottom"
              onClick={() => handleStartAttempt(selectedQuiz)}
              className="flex-1 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
            >
              <span>Start Quiz</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 3: ACTIVE QUIZ PLAY SCREEN (WITH TIMER & COMPLETE NAVIGATION)
  // ==========================================
  if (viewState === 'play' && selectedQuiz) {
    const question = selectedQuiz.questions[currentQuestionIndex];
    const totalQuestions = selectedQuiz.questions.length;
    const progressPct = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    const currentAnswer = userAnswers[currentQuestionIndex];
    const isAnswered = currentAnswer !== null && String(currentAnswer).trim() !== '';
    const isLowTime = secondsRemaining <= 20;

    return (
      <div id="quiz-play-screen" className="absolute inset-0 bg-[#FAF8F5] flex flex-col overflow-hidden select-none z-10 text-slate-800">
        
        {/* Top Header Bar with Timer & Question Progress */}
        <div className="pt-2.5 px-4 pb-3 border-b border-stone-200/80 bg-white shrink-0 z-20 space-y-2.5">
          <div className="flex items-center justify-between">
            <button
              id="quiz-play-exit-btn"
              onClick={() => {
                if (window.confirm("Are you sure you want to exit the quiz? Your current attempt will not be saved.")) {
                  if (timerRef.current) clearInterval(timerRef.current);
                  setIsTimerActive(false);
                  setViewState('detail');
                }
              }}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
              title="Exit Quiz"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Live Animated Countdown Timer Pill */}
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs font-black border transition-all ${
              isLowTime
                ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse'
                : 'bg-emerald-50 border-emerald-200 text-[#163E2B]'
            }`}>
              <Clock className={`w-3.5 h-3.5 ${isLowTime ? 'text-rose-600 animate-spin' : 'text-[#163E2B]'}`} />
              <span>{formatTime(secondsRemaining)}</span>
              {isLowTime && <span className="text-[9px] uppercase font-sans font-bold text-rose-600">Hurry!</span>}
            </div>

            <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-full font-mono text-[10px] font-bold text-amber-800">
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              <span>+25 pts / Q</span>
            </div>
          </div>

          {/* Progress Bar & Question Counter */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px] font-bold font-mono">
              <span className="text-[#163E2B] uppercase tracking-wider">
                QUESTION {currentQuestionIndex + 1} OF {totalQuestions}
              </span>
              <span className="text-slate-400 truncate max-w-[180px]">{selectedQuiz.title}</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#163E2B] rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4 pb-28 max-w-xl mx-auto w-full">
          
          {/* Question Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4.5 space-y-2.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-[#163E2B] font-bold font-mono text-[9px] rounded uppercase">
                {question.type === 'mcq' ? 'Multiple Choice' : question.type === 'boolean' ? 'True / False' : 'Fill in the Blank'}
              </span>
              <span className="text-[10px] font-mono text-slate-400 font-semibold">
                Item {currentQuestionIndex + 1}
              </span>
            </div>

            <h3 className="font-extrabold text-sm sm:text-[15px] text-slate-900 leading-relaxed pt-1">
              {question.question}
            </h3>
          </div>

          {/* Options Section */}
          <div className="space-y-2.5 pt-1">
            
            {/* MCQ or Boolean Options */}
            {(question.type === 'mcq' || question.type === 'boolean') && (
              <div className="space-y-2.5">
                {question.options.map((option, idx) => {
                  const isSelected = currentAnswer === idx;
                  const optionLetters = ['A', 'B', 'C', 'D'];

                  return (
                    <div
                      key={idx}
                      id={`option-choice-${idx}`}
                      onClick={() => handleSelectAnswer(idx)}
                      className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer active:scale-99 ${
                        isSelected
                          ? 'bg-emerald-50/80 border-[#163E2B] text-[#0F2D1F] shadow-xs ring-1 ring-[#163E2B]'
                          : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 shadow-2xs'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                          isSelected ? 'bg-[#163E2B] text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {question.type === 'boolean' ? (idx === 0 ? 'T' : 'F') : optionLetters[idx] || (idx + 1)}
                        </div>
                        <span className="text-xs font-bold leading-snug">{option}</span>
                      </div>

                      {isSelected ? (
                        <div className="w-5 h-5 rounded-full bg-[#163E2B] flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 text-white" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-slate-300 shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Fill-in-the-blank Option */}
            {question.type === 'fill' && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase font-mono block">
                    Your Written Answer
                  </label>
                  <input
                    id="quiz-fill-input"
                    type="text"
                    value={String(currentAnswer || '')}
                    onChange={(e) => handleSelectAnswer(e.target.value)}
                    placeholder="Type answer or tap word bank below..."
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-extrabold text-slate-900 focus:outline-none focus:border-[#163E2B] focus:ring-1 focus:ring-[#163E2B] shadow-2xs"
                  />
                </div>

                {/* Interactive Word Bank */}
                <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-3.5 space-y-2">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider font-mono block">
                    Tap to Choose from Word Bank:
                  </span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {question.options.map((word, wIdx) => {
                      const isWordSelected = String(currentAnswer || '').toLowerCase() === word.toLowerCase();
                      return (
                        <button
                          key={wIdx}
                          onClick={() => handleSelectAnswer(word)}
                          className={`py-1.5 px-3 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                            isWordSelected
                              ? 'bg-[#163E2B] border-[#163E2B] text-white shadow-xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {word}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* In-Card Next / Finish Action */}
            <div className="pt-3">
              {currentQuestionIndex < totalQuestions - 1 ? (
                <button
                  id="in-card-next-btn"
                  onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                  className="w-full py-3.5 px-4 bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] text-white font-extrabold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all border border-emerald-800/40"
                >
                  <span>Next Question</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  id="in-card-finish-btn"
                  onClick={() => handleSubmitQuiz(false)}
                  className="w-full py-3.5 px-4 bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] text-white font-extrabold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all border border-emerald-800/40"
                >
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Finish & Submit Assessment</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Navigation Buttons (Fixed Bar) */}
        <div className="absolute bottom-0 left-0 right-0 p-3.5 bg-white/95 backdrop-blur-md border-t border-slate-200 flex gap-2.5 z-30 shadow-lg max-w-xl mx-auto">
          <button
            id="quiz-bottom-prev-btn"
            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
            className="px-5 py-3.5 bg-stone-100 hover:bg-stone-200 disabled:opacity-40 text-stone-700 font-bold text-xs rounded-xl cursor-pointer transition-all active:scale-95 disabled:cursor-not-allowed text-center"
          >
            Previous
          </button>

          {currentQuestionIndex < totalQuestions - 1 ? (
            <button
              id="quiz-bottom-next-btn"
              onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
              className="flex-1 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-98"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              id="quiz-bottom-finish-btn"
              onClick={() => handleSubmitQuiz(false)}
              className="flex-1 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-98"
            >
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>Finish & Submit</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 4: QUIZ RESULT SCREEN (AFTER IMMEDIATE COMPLETION)
  // ==========================================
  if (viewState === 'result' && selectedQuiz) {
    const totalQ = selectedQuiz.questions.length;
    const percentage = Math.round((quizScore / totalQ) * 100);
    const isPassed = percentage >= 70;

    return (
      <div id="quiz-result-screen" className="absolute inset-0 bg-[#FAF8F5] flex flex-col overflow-hidden select-none z-10 text-slate-800">
        
        {/* Top Header Bar */}
        <div className="pt-2.5 px-4 pb-3 flex items-center justify-between border-b border-stone-200/80 bg-white shrink-0 z-20">
          <div className="flex items-center gap-3">
            <button 
              id="quiz-result-back-btn"
              onClick={() => {
                setMainTab('attempted');
                setViewState('list');
              }}
              className="w-9 h-9 rounded-full bg-white hover:bg-stone-50 border border-slate-200 shadow-2xs flex items-center justify-center cursor-pointer transition-colors active:scale-95 text-slate-700"
              title="Back to Quizzes"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
            </button>
            <div>
              <span className="text-[9px] font-extrabold text-[#163E2B] uppercase tracking-wider font-mono block">
                ASSESSMENT COMPLETE
              </span>
              <h1 className="text-sm font-black tracking-tight text-slate-900 truncate max-w-[220px]">
                {selectedQuiz.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-full font-mono text-[10px] font-bold text-amber-800">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>+{pointsEarned} pts</span>
          </div>
        </div>

        {/* Scrollable Result Overview */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4 pb-28 max-w-xl mx-auto w-full">
          
          {/* Result Score Banner */}
          <div className={`rounded-3xl p-5 text-center space-y-3 border ${
            isPassed 
              ? 'bg-gradient-to-b from-emerald-50 to-white border-emerald-200 text-emerald-950' 
              : 'bg-gradient-to-b from-amber-50 to-white border-amber-200 text-amber-950'
          }`}>
            <div className="w-16 h-16 mx-auto rounded-full bg-white shadow-sm border border-black/5 flex items-center justify-center">
              {isPassed ? (
                <Trophy className="w-8 h-8 text-emerald-600" />
              ) : (
                <Target className="w-8 h-8 text-amber-600" />
              )}
            </div>

            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Performance Evaluation
              </span>
              <h2 className="text-xl font-black text-slate-900 pt-0.5">
                {isPassed ? 'Excellent Spiritual Mastery! 🎉' : 'Good Effort! Keep Practicing 💪'}
              </h2>
              <p className="text-xs text-slate-500 max-w-xs mx-auto pt-1 leading-relaxed">
                {isPassed 
                  ? 'You answered the majority of questions correctly and strengthened your Jain foundation.'
                  : 'Review the question analysis below to learn the detailed spiritual meanings.'
                }
              </p>
            </div>

            {/* Score Ring / Bar */}
            <div className="flex items-center justify-center gap-6 pt-2">
              <div className="text-center">
                <span className="text-2xl font-black font-mono text-[#163E2B]">{quizScore}/{totalQ}</span>
                <span className="text-[10px] text-slate-400 font-bold block uppercase font-mono">Score</span>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div className="text-center">
                <span className="text-2xl font-black font-mono text-[#163E2B]">{percentage}%</span>
                <span className="text-[10px] text-slate-400 font-bold block uppercase font-mono">Accuracy</span>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div className="text-center">
                <span className="text-2xl font-black font-mono text-amber-600">+{pointsEarned}</span>
                <span className="text-[10px] text-slate-400 font-bold block uppercase font-mono">Points</span>
              </div>
            </div>
          </div>

          {/* Question-by-Question Detailed Breakdown */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500 font-mono block">
                Detailed Question Analysis ({totalQ})
              </span>
              <span className="text-[11px] text-slate-500">Your answers are saved below</span>
            </div>

            {selectedQuiz.questions.map((q, idx) => {
              const studentAns = userAnswers[idx];
              let isCorrect = false;

              if (q.type === 'mcq' || q.type === 'boolean') {
                isCorrect = studentAns === q.correctAnswer;
              } else if (q.type === 'fill') {
                isCorrect = String(studentAns || '').trim().toLowerCase() === String(q.correctAnswer || '').trim().toLowerCase();
              }

              return (
                <div
                  key={idx}
                  className={`bg-white rounded-2xl p-4 border space-y-2.5 shadow-2xs ${
                    isCorrect ? 'border-emerald-200' : 'border-rose-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                      Question {idx + 1}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full font-bold font-mono text-[9px] flex items-center gap-1 ${
                      isCorrect ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {isCorrect ? <CheckCircle2 className="w-3 h-3" /> : <X className="w-3 h-3" />}
                      {isCorrect ? 'Correct (+25 pts)' : 'Incorrect'}
                    </span>
                  </div>

                  <h4 className="font-extrabold text-xs text-slate-900 leading-snug">
                    {q.question}
                  </h4>

                  {/* Student vs Correct Answer */}
                  <div className="p-2.5 bg-stone-50 border border-stone-200/70 rounded-xl space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Your answer:</span>
                      <span className={`font-bold flex items-center gap-1 ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                        {q.type === 'mcq' || q.type === 'boolean'
                          ? (studentAns !== null && studentAns !== undefined ? q.options[Number(studentAns)] : 'Unanswered')
                          : String(studentAns || 'Unanswered')
                        }
                        {isCorrect ? ' ✓' : ' ✗'}
                      </span>
                    </div>

                    {!isCorrect && (
                      <div className="flex items-center justify-between pt-1 border-t border-stone-200/60">
                        <span className="text-slate-500 font-medium">Correct answer:</span>
                        <span className="font-bold text-emerald-800">
                          {q.type === 'mcq' || q.type === 'boolean'
                            ? q.options[Number(q.correctAnswer)]
                            : String(q.correctAnswer)
                          }
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Theological explanation */}
                  {q.explanation && (
                    <div className="pt-1 text-[11px] text-slate-600 bg-amber-50/50 p-2.5 rounded-xl border border-amber-200/60 leading-relaxed">
                      <strong className="text-amber-900 font-bold">💡 Context: </strong>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Actions (Retakes Disabled for Applicant) */}
        <div className="absolute bottom-0 left-0 right-0 p-3.5 bg-white/95 backdrop-blur-md border-t border-slate-200 flex gap-2.5 z-30 shadow-lg max-w-xl mx-auto">
          <button
            id="result-all-quizzes-btn"
            onClick={() => {
              setMainTab('available');
              setViewState('list');
            }}
            className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs rounded-xl cursor-pointer transition-all active:scale-95 text-center"
          >
            All Quizzes
          </button>

          <button
            id="result-view-attempted-btn"
            onClick={() => {
              setMainTab('attempted');
              setViewState('list');
            }}
            className="flex-1 py-3 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-98"
          >
            <History className="w-4 h-4" />
            <span>My Attempt History</span>
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 5: ATTEMPT DETAIL REVIEW SCREEN (DISPLAYING ALL CHOSEN & CORRECT ANSWERS)
  // ==========================================
  if (viewState === 'attempt_detail' && selectedAttemptRecord) {
    const record = selectedAttemptRecord;
    const isHigh = record.percentage >= 70;
    const meta = getCategoryMeta(record.category || 'Sutra');
    const CategoryIcon = meta.icon;

    return (
      <div id="attempt-detail-screen" className="absolute inset-0 bg-[#FAF8F5] flex flex-col overflow-hidden select-none z-10 text-slate-800">
        
        {/* Top Header Bar */}
        <div className="pt-2.5 px-4 pb-3 flex items-center justify-between border-b border-stone-200/80 bg-white shrink-0 z-20">
          <div className="flex items-center gap-3">
            <button 
              id="attempt-review-back-btn"
              onClick={() => {
                setMainTab('attempted');
                setViewState('list');
              }}
              className="w-9 h-9 rounded-full bg-white hover:bg-stone-50 border border-slate-200 shadow-2xs flex items-center justify-center cursor-pointer transition-colors active:scale-95 text-slate-700"
              title="Back to Attempted Quizzes"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
            </button>
            <div>
              <span className="text-[9px] font-extrabold text-[#163E2B] uppercase tracking-wider font-mono block">
                ATTEMPT REVIEW
              </span>
              <h1 className="text-sm font-black tracking-tight text-slate-900 truncate max-w-[220px]">
                {record.quizTitle}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-full font-mono text-[10px] font-bold text-emerald-800">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            <span>Completed</span>
          </div>
        </div>

        {/* Scrollable Attempt Details Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4 pb-28 max-w-xl mx-auto w-full">
          
          {/* Attempt Performance Banner */}
          <div className="bg-white border border-stone-200 rounded-[22px] p-4.5 space-y-3.5 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl ${meta.iconBg} border border-emerald-100 flex items-center justify-center text-[#163E2B] shrink-0`}>
                <CategoryIcon className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">
                    {record.category || 'Quiz'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    • {record.completedAt}
                  </span>
                </div>
                <h2 className="text-sm sm:text-base font-black text-slate-950 leading-snug">
                  {record.quizTitle}
                </h2>
              </div>
            </div>

            {/* Score & Points Grid */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
              <div className="p-2.5 bg-stone-50 rounded-xl">
                <span className="text-[9px] font-bold uppercase text-slate-400 font-mono block">Score</span>
                <span className="text-sm font-black text-slate-900 font-mono">{record.score} / {record.totalQuestions}</span>
              </div>
              <div className="p-2.5 bg-stone-50 rounded-xl">
                <span className="text-[9px] font-bold uppercase text-slate-400 font-mono block">Accuracy</span>
                <span className={`text-sm font-black font-mono ${isHigh ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {record.percentage}%
                </span>
              </div>
              <div className="p-2.5 bg-stone-50 rounded-xl">
                <span className="text-[9px] font-bold uppercase text-slate-400 font-mono block">Points</span>
                <span className="text-sm font-black text-amber-600 font-mono">+{record.pointsEarned || record.score * 25}</span>
              </div>
            </div>
          </div>

          {/* Detailed Question & Answer Breakdown */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500 font-mono block">
                Question & Answer Log ({record.answersSummary?.length || record.totalQuestions})
              </span>
              <span className="text-[11px] text-slate-500 font-medium">Your chosen answers</span>
            </div>

            {record.answersSummary && record.answersSummary.length > 0 ? (
              record.answersSummary.map((item, idx) => {
                const isCorrect = item.isCorrect;
                const userAns = item.userAnswer;
                const correctAns = item.correctAnswer;

                let userAnsText = 'Unanswered';
                if (item.type === 'mcq' || item.type === 'boolean') {
                  if (userAns !== null && userAns !== undefined && item.options[Number(userAns)]) {
                    userAnsText = item.options[Number(userAns)];
                  }
                } else {
                  userAnsText = String(userAns || 'Unanswered');
                }

                let correctAnsText = '';
                if (item.type === 'mcq' || item.type === 'boolean') {
                  correctAnsText = item.options[Number(correctAns)] || String(correctAns);
                } else {
                  correctAnsText = String(correctAns);
                }

                return (
                  <div
                    key={idx}
                    id={`attempt-review-q-${idx}`}
                    className={`bg-white rounded-2xl p-4 border space-y-3 shadow-2xs ${
                      isCorrect ? 'border-emerald-200' : 'border-rose-200'
                    }`}
                  >
                    {/* Item Header */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                        Question {idx + 1} • {item.type === 'mcq' ? 'MCQ' : item.type === 'boolean' ? 'True/False' : 'Fill'}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full font-bold font-mono text-[9px] flex items-center gap-1 ${
                        isCorrect ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {isCorrect ? <CheckCircle2 className="w-3 h-3" /> : <X className="w-3 h-3" />}
                        {isCorrect ? 'Correct (+25 pts)' : 'Incorrect'}
                      </span>
                    </div>

                    {/* Question Statement */}
                    <h4 className="font-extrabold text-xs text-slate-900 leading-snug">
                      {item.question}
                    </h4>

                    {/* User Answer vs Correct Answer Box */}
                    <div className="space-y-2 pt-1">
                      
                      {/* Your Answer Box */}
                      <div className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                        isCorrect 
                          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' 
                          : 'bg-rose-50/70 border-rose-200 text-rose-950'
                      }`}>
                        <div className="space-y-0.5">
                          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                            Your Added Answer:
                          </span>
                          <span className="font-extrabold block text-xs">
                            {userAnsText}
                          </span>
                        </div>
                        {isCorrect ? (
                          <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0">
                            <X className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>

                      {/* Correct Answer Box (if user was incorrect) */}
                      {!isCorrect && (
                        <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-950">
                          <div className="space-y-0.5">
                            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-700 block">
                              Correct Scripture Answer:
                            </span>
                            <span className="font-extrabold block text-xs text-emerald-900">
                              {correctAnsText}
                            </span>
                          </div>
                          <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Scriptural Context & Meaning */}
                    {item.explanation && (
                      <div className="text-[11px] text-slate-600 bg-amber-50/50 p-2.5 rounded-xl border border-amber-200/60 leading-relaxed">
                        <strong className="text-amber-900 font-bold">💡 Spiritual Meaning: </strong>
                        {item.explanation}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="p-4 bg-white border border-stone-200 rounded-2xl text-center text-xs text-slate-500">
                Summary details saved. Score: {record.score}/{record.totalQuestions}.
              </div>
            )}
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-3.5 bg-white/95 backdrop-blur-md border-t border-slate-200 flex gap-2.5 z-30 shadow-lg max-w-xl mx-auto">
          <button
            id="attempt-review-close-btn"
            onClick={() => {
              setMainTab('attempted');
              setViewState('list');
            }}
            className="flex-1 py-3.5 bg-stone-100 hover:bg-stone-200 text-slate-800 font-bold text-xs rounded-xl cursor-pointer transition-all active:scale-98 text-center"
          >
            Back to Attempted Quizzes
          </button>

          <button
            id="attempt-review-browse-btn"
            onClick={() => {
              setMainTab('available');
              setViewState('list');
            }}
            className="flex-1 py-3.5 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-98"
          >
            <BookOpen className="w-4 h-4" />
            <span>Browse More Quizzes</span>
          </button>
        </div>
      </div>
    );
  }

  return null;
};
